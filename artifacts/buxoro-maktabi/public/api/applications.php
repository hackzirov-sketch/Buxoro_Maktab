<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
@set_time_limit(20);
ignore_user_abort(true);
ini_set('default_socket_timeout', '6');

if (($_GET['health'] ?? '') === '1') {
    $healthConfig = load_config();
    $healthDataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
    $payload = [
        'ok' => true,
        'php' => PHP_VERSION,
        'time' => tashkent_now(),
        'config' => is_file(__DIR__ . DIRECTORY_SEPARATOR . 'config.php') ? 'found' : 'missing',
        'telegramConfigured' => telegram_configured($healthConfig),
        'dataDir' => is_dir($healthDataDir) ? 'found' : 'will_create',
        'dataWritable' => is_dir($healthDataDir) ? is_writable($healthDataDir) : is_writable(dirname(__DIR__)),
        'curl' => function_exists('curl_init') ? 'enabled' : 'missing',
        'allowUrlFopen' => (bool)ini_get('allow_url_fopen'),
    ];

    if (($_GET['telegram'] ?? '') === '1') {
        $payload['telegramTest'] = send_telegram_raw(
            $healthConfig,
            '<b>Buxoro Maktabi API test</b>' . "\n" . 'Vaqt: ' . h(tashkent_now())
        );
    }

    json_response($payload);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$config = load_config();

if (($_GET['excel'] ?? '') === '1') {
    require_admin($config);
    export_applications_csv();
}

if (($_GET['list'] ?? '') === '1') {
    require_admin($config);
    json_response([
        'success' => true,
        'items' => read_applications(),
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Faqat POST sorov qabul qilinadi'], 405);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = normalize_allowed_origins($config['ALLOWED_ORIGIN'] ?? '');

if (count($allowedOrigins) > 0 && $origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    json_response(['error' => 'Bu domendan sorov qabul qilinmaydi'], 403);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    json_response(['error' => 'JSON malumot notogri'], 400);
}

if (trim((string)($data['website'] ?? '')) !== '') {
    json_response(['success' => true, 'ignored' => true]);
}

$required = [
    'firstName',
    'lastName',
    'phone',
    'childFirstName',
    'childLastName',
    'currentSchool',
    'graduatedClass',
    'applyingClass',
    'region',
];

$clean = [];
foreach ($required as $field) {
    $value = trim((string)($data[$field] ?? ''));
    if ($value === '') {
        json_response(['error' => $field . ' toldirilmagan'], 400);
    }
    $clean[$field] = $value;
}
$clean['applicationType'] = trim((string)($data['applicationType'] ?? 'study'));

if (!in_array($clean['applicationType'], ['study', 'grant'], true)) {
    json_response(['error' => 'Ariza turi notogri'], 400);
}

$clean['firstName'] = limit_text($clean['firstName'], 50);
$clean['lastName'] = limit_text($clean['lastName'], 50);
$clean['childFirstName'] = limit_text($clean['childFirstName'], 50);
$clean['childLastName'] = limit_text($clean['childLastName'], 50);
$clean['currentSchool'] = limit_text($clean['currentSchool'], 100);
$clean['region'] = limit_text($clean['region'], 100);

if (is_buxoro_maktabi($clean['currentSchool'])) {
    json_response(['error' => 'Hozirgi maktab sifatida Buxoro Maktabi yozilmasin'], 400);
}

if (!preg_match('/^\+998\d{9}$/', $clean['phone'])) {
    json_response(['error' => 'Telefon +998xxxxxxxxx formatida bolishi kerak'], 400);
}

if (!preg_match('/^(0|1|2|3|4|5|6|7|8|9|10|11)$/', $clean['graduatedClass'])) {
    json_response(['error' => 'Tugatgan sinf notogri'], 400);
}

if (!preg_match('/^(0|1|2|3|4|5|6|7|8|9|10|11)$/', $clean['applyingClass'])) {
    json_response(['error' => 'Qabul sinfi notogri'], 400);
}

$applicationId = make_application_id($clean['applicationType']);
$application = array_merge([
    'id' => $applicationId,
    'numericId' => (int)round(microtime(true) * 1000),
    'type' => 'study',
    'applicationType' => $clean['applicationType'],
    'applicationTypeLabel' => application_type_label($clean['applicationType']),
    'source' => 'website',
    'createdAt' => tashkent_now(),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
], $clean);

try {
    $saveResult = save_application($application);
} catch (InvalidArgumentException $error) {
    write_log('Ariza rad qilindi: ' . $error->getMessage());
    json_response(['error' => $error->getMessage()], 429);
} catch (Throwable $error) {
    write_log('Ariza saqlanmadi: ' . $error->getMessage());
    json_response(['error' => 'Ariza saqlanmadi. Server yozish ruxsatini tekshiring'], 500);
}

$telegramResult = send_telegram($config, $application, $saveResult['count']);
if (!$telegramResult['ok']) {
    write_log('Telegram yuborilmadi: ' . $telegramResult['error']);
}

json_response([
    'success' => true,
    'id' => $application['id'],
    'telegramSent' => $telegramResult['ok'],
]);

function load_config(): array
{
    $configPath = __DIR__ . DIRECTORY_SEPARATOR . 'config.php';
    $config = [];
    if (is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    foreach (['BOT_TOKEN', 'CHAT_ID', 'CHAT_IDS', 'ALLOWED_ORIGIN', 'ADMIN_PASSWORD'] as $key) {
        $envValue = getenv($key);
        if ($envValue !== false && $envValue !== '') {
            $config[$key] = $envValue;
        }
    }

    return $config;
}

function normalize_allowed_origins($value): array
{
    if (is_array($value)) {
        return array_values(array_filter(array_map('trim', $value)));
    }

    return array_values(array_filter(array_map('trim', explode(',', (string)$value))));
}

function application_type_label(string $type): string
{
    return $type === 'grant' ? 'Grantga qatnashish' : 'O\'qishga qabul';
}

function make_application_id(string $type): string
{
    $prefix = $type === 'grant' ? 'BMG' : 'BMQ';
    return $prefix . '-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
}

function normalize_school_name(string $value): string
{
    $value = strtolower($value);
    $value = str_replace(['x', ' ', '-', '_', '.', "'", '`', '‘', '’'], ['h', '', '', '', '', '', '', '', ''], $value);
    return $value;
}

function is_buxoro_maktabi(string $value): bool
{
    return strpos(normalize_school_name($value), 'buhoromaktabi') !== false;
}

function telegram_configured(array $config): bool
{
    $token = trim((string)($config['BOT_TOKEN'] ?? ''));
    $chatIds = $config['CHAT_IDS'] ?? ($config['CHAT_ID'] ?? '');
    if (!is_array($chatIds)) {
        $chatIds = array_filter(array_map('trim', explode(',', (string)$chatIds)));
    }

    return $token !== '' && count($chatIds) > 0;
}

function save_application(array $application): array
{
    $dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
    if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true)) {
        throw new RuntimeException('Data papka yaratilmadi: ' . $dataDir);
    }

    $storageFile = $dataDir . DIRECTORY_SEPARATOR . 'applications.json';
    $lockFile = $dataDir . DIRECTORY_SEPARATOR . 'applications.lock';
    $lockHandle = fopen($lockFile, 'c');
    if ($lockHandle === false) {
        throw new RuntimeException('Lock fayl ochilmadi: ' . $lockFile);
    }

    try {
        if (!flock($lockHandle, LOCK_EX)) {
            throw new RuntimeException('Lock olinmadi: ' . $lockFile);
        }

        $all = [];
        if (is_file($storageFile)) {
            $raw = (string)file_get_contents($storageFile);
            $existing = json_decode($raw, true);
            if (is_array($existing)) {
                $all = $existing;
            } elseif (trim($raw) !== '') {
                @copy($storageFile, $storageFile . '.broken-' . date('Ymd-His'));
                write_log('applications.json buzilgan, zaxira nusxa yaratildi');
            }
        }

        enforce_submission_limits($all, $application);

        $all[] = $application;
        $json = json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new RuntimeException('JSON yaratilmadi');
        }

        $tempFile = $storageFile . '.tmp-' . bin2hex(random_bytes(6));
        if (file_put_contents($tempFile, $json, LOCK_EX) === false) {
            throw new RuntimeException('Vaqtinchalik fayl yozilmadi: ' . $tempFile);
        }

        if (!rename($tempFile, $storageFile)) {
            @unlink($tempFile);
            throw new RuntimeException('Saqlash fayli almashtirilmadi: ' . $storageFile);
        }

        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);

        return ['count' => count($all), 'file' => $storageFile];
    } catch (Throwable $error) {
        @flock($lockHandle, LOCK_UN);
        @fclose($lockHandle);
        throw $error;
    }
}

function require_admin(array $config): void
{
    $expected = trim((string)($config['ADMIN_PASSWORD'] ?? ''));
    $given = trim((string)($_GET['key'] ?? ''));
    if ($expected !== '' && !hash_equals($expected, $given)) {
        json_response(['error' => 'Admin parol noto\'g\'ri'], 403);
    }
}

function export_applications_csv(): void
{
    $rows = read_applications();

    $filename = 'oqish_grant_arizalari_' . date('Y-m-d_H-i') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    echo "\xEF\xBB\xBF";

    $out = fopen('php://output', 'w');
    fputcsv($out, [
        '#',
        'Ariza ID',
        'Sana',
        'Ariza turi',
        'Manba',
        'Vasiy ism',
        'Vasiy familiya',
        'Telefon',
        'Bola ismi',
        'Bola familiyasi',
        'Hozirgi maktab',
        'Tugatgan sinf',
        'Qabul sinfi',
        'Hudud',
    ]);

    foreach ($rows as $index => $row) {
        fputcsv($out, [
            $index + 1,
            $row['id'] ?? '',
            $row['createdAt'] ?? '',
            $row['applicationTypeLabel'] ?? application_type_label((string)($row['applicationType'] ?? 'study')),
            $row['source'] ?? '',
            $row['firstName'] ?? '',
            $row['lastName'] ?? '',
            $row['phone'] ?? '',
            $row['childFirstName'] ?? '',
            $row['childLastName'] ?? '',
            $row['currentSchool'] ?? '',
            isset($row['graduatedClass']) ? $row['graduatedClass'] . '-sinf' : '',
            isset($row['applyingClass']) ? $row['applyingClass'] . '-sinf' : '',
            $row['region'] ?? '',
        ]);
    }

    fclose($out);
    exit;
}

function read_applications(): array
{
    $storageFile = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'applications.json';
    if (!is_file($storageFile)) {
        return [];
    }

    $decoded = json_decode((string)file_get_contents($storageFile), true);
    if (!is_array($decoded)) {
        return [];
    }

    usort($decoded, static function ($a, $b) {
        return strcmp((string)($b['createdAt'] ?? ''), (string)($a['createdAt'] ?? ''));
    });

    return $decoded;
}

function enforce_submission_limits(array $rows, array $application): void
{
    $now = time();
    $ip = (string)($application['ip'] ?? '');
    $recentFromIp = 0;
    $today = date('Y-m-d');
    $phone = (string)($application['phone'] ?? '');
    $childKey = normalize_school_name((string)($application['childFirstName'] ?? '') . (string)($application['childLastName'] ?? ''));
    $applicationType = (string)($application['applicationType'] ?? 'study');

    foreach ($rows as $row) {
      $created = strtotime((string)($row['createdAt'] ?? '')) ?: 0;
      if ($ip !== '' && ($row['ip'] ?? '') === $ip && $created > 0 && ($now - $created) <= 600) {
          $recentFromIp++;
      }

      $rowChildKey = normalize_school_name((string)($row['childFirstName'] ?? '') . (string)($row['childLastName'] ?? ''));
      $rowDay = substr((string)($row['createdAt'] ?? ''), 0, 10);
      $rowType = (string)($row['applicationType'] ?? 'study');
      if (($row['phone'] ?? '') === $phone && $rowChildKey === $childKey && $rowDay === $today && $rowType === $applicationType) {
          throw new InvalidArgumentException('Bu telefon va bola uchun bugun shu turdagi ariza allaqachon qabul qilingan');
      }
    }

    if ($recentFromIp >= 5) {
        throw new InvalidArgumentException('Juda ko\'p ariza yuborildi. Iltimos, 10 daqiqadan keyin urinib ko\'ring');
    }
}

function send_telegram(array $config, array $application, int $count): array
{
    $text = '<b>Yangi ariza ' . h((string)($application['id'] ?? ('#' . $count))) . "</b>\n\n"
        . '<b>Manba:</b> website' . "\n"
        . '<b>Ariza turi:</b> ' . h($application['applicationTypeLabel'] ?? application_type_label((string)($application['applicationType'] ?? 'study'))) . "\n"
        . '<b>Ota-ona:</b> ' . h($application['firstName'] . ' ' . $application['lastName']) . "\n"
        . '<b>Telefon:</b> ' . h($application['phone']) . "\n"
        . '<b>Bola:</b> ' . h($application['childFirstName'] . ' ' . $application['childLastName']) . "\n"
        . '<b>Hozirgi maktab:</b> ' . h($application['currentSchool']) . "\n"
        . '<b>Tugatgan sinf:</b> ' . h($application['graduatedClass']) . "-sinf\n"
        . '<b>Qabul sinfi:</b> ' . h($application['applyingClass']) . "-sinf\n"
        . '<b>Hudud:</b> ' . h($application['region']) . "\n"
        . '<b>Vaqt:</b> ' . h($application['createdAt']);

    $host = $_SERVER['HTTP_HOST'] ?? '';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $adminUrl = $host !== '' ? $scheme . '://' . $host . '/admin.html' : '';
    $keyboard = [];
    if ($adminUrl !== '') {
        $keyboard[] = [
            ['text' => 'Admin panel', 'url' => $adminUrl],
        ];
    }

    return send_telegram_raw($config, $text, $keyboard);
}

function send_telegram_raw(array $config, string $text, array $keyboard = []): array
{
    $token = trim((string)($config['BOT_TOKEN'] ?? ''));
    $chatIds = $config['CHAT_IDS'] ?? ($config['CHAT_ID'] ?? '');
    if (!is_array($chatIds)) {
        $chatIds = array_filter(array_map('trim', explode(',', (string)$chatIds)));
    }

    if ($token === '' || count($chatIds) === 0) {
        return ['ok' => false, 'error' => 'BOT_TOKEN yoki CHAT_ID/CHAT_IDS kiritilmagan'];
    }

    $errors = [];
    foreach ($chatIds as $chatId) {
        $result = send_telegram_message($token, (string)$chatId, $text, $keyboard);
        if (!$result['ok']) {
            $errors[] = $chatId . ': ' . $result['error'];
        }
    }

    if (count($errors) > 0) {
        return ['ok' => false, 'error' => implode('; ', $errors)];
    }

    return ['ok' => true, 'error' => ''];
}

function send_telegram_message(string $token, string $chatId, string $text, array $keyboard = []): array
{
    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $message = [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
    ];
    if (count($keyboard) > 0) {
        $message['reply_markup'] = ['inline_keyboard' => $keyboard];
    }
    $payload = json_encode($message, JSON_UNESCAPED_UNICODE);

    if (!function_exists('curl_init')) {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => 6,
            ],
        ]);
        $response = @file_get_contents($url, false, $context);
        if ($response === false) {
            return ['ok' => false, 'error' => 'Telegramga ulanishda xato. Hostingda curl yoki allow_url_fopen ni tekshiring'];
        }
    } else {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => 6,
        ]);
        $response = curl_exec($ch);
        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return ['ok' => false, 'error' => $error];
        }
        curl_close($ch);
    }

    $decoded = json_decode((string)$response, true);
    if (!is_array($decoded) || empty($decoded['ok'])) {
        return ['ok' => false, 'error' => (string)$response];
    }

    return ['ok' => true, 'error' => ''];
}

function tashkent_now(): string
{
    $date = new DateTime('now', new DateTimeZone('Asia/Tashkent'));
    return $date->format('Y-m-d H:i:s');
}

function limit_text(string $value, int $limit): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $limit, 'UTF-8');
    }

    return substr($value, 0, $limit);
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function json_response_and_continue(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);

    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
        return;
    }

    @ob_flush();
    @flush();
}

function write_log(string $message): void
{
    $dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0755, true);
    }

    $line = '[' . tashkent_now() . '] ' . $message . PHP_EOL;
    @file_put_contents($dataDir . DIRECTORY_SEPARATOR . 'server.log', $line, FILE_APPEND | LOCK_EX);
}
