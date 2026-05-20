<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Faqat POST sorov qabul qilinadi'], 405);
}

$config = load_config();
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = trim((string)($config['ALLOWED_ORIGIN'] ?? ''));

if ($allowedOrigin !== '' && $origin !== '' && !hash_equals($allowedOrigin, $origin)) {
    json_response(['error' => 'Bu domendan sorov qabul qilinmaydi'], 403);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    json_response(['error' => 'JSON malumot notogri'], 400);
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

$clean['firstName'] = limit_text($clean['firstName'], 50);
$clean['lastName'] = limit_text($clean['lastName'], 50);
$clean['childFirstName'] = limit_text($clean['childFirstName'], 50);
$clean['childLastName'] = limit_text($clean['childLastName'], 50);
$clean['currentSchool'] = limit_text($clean['currentSchool'], 100);
$clean['region'] = limit_text($clean['region'], 100);

if (!preg_match('/^\+998\d{9}$/', $clean['phone'])) {
    json_response(['error' => 'Telefon +998xxxxxxxxx formatida bolishi kerak'], 400);
}

if (!preg_match('/^(0|1|2|3|4|5|6|7|8|9|10|11)$/', $clean['graduatedClass'])) {
    json_response(['error' => 'Tugatgan sinf notogri'], 400);
}

if (!preg_match('/^(0|1|2|3|4|5|6|7|8|9|10|11)$/', $clean['applyingClass'])) {
    json_response(['error' => 'Qabul sinfi notogri'], 400);
}

$application = array_merge([
    'id' => (int)round(microtime(true) * 1000),
    'createdAt' => tashkent_now(),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
], $clean);

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true)) {
    json_response(['error' => 'Serverda data papka yaratilmadi'], 500);
}

$storageFile = $dataDir . DIRECTORY_SEPARATOR . 'applications.json';
$all = [];
if (is_file($storageFile)) {
    $existing = json_decode((string)file_get_contents($storageFile), true);
    if (is_array($existing)) {
        $all = $existing;
    }
}

$all[] = $application;
file_put_contents($storageFile, json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

$telegramResult = send_telegram($config, $application, count($all));
if (!$telegramResult['ok']) {
    json_response([
        'error' => 'Ariza saqlandi, lekin Telegramga yuborilmadi. BOT_TOKEN va CHAT_ID ni tekshiring.',
        'details' => $telegramResult['error'],
    ], 500);
}

json_response(['success' => true, 'id' => $application['id']]);

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

    foreach (['BOT_TOKEN', 'CHAT_ID', 'ALLOWED_ORIGIN'] as $key) {
        $envValue = getenv($key);
        if ($envValue !== false && $envValue !== '') {
            $config[$key] = $envValue;
        }
    }

    return $config;
}

function send_telegram(array $config, array $application, int $count): array
{
    $token = trim((string)($config['BOT_TOKEN'] ?? ''));
    $chatId = trim((string)($config['CHAT_ID'] ?? ''));

    if ($token === '' || $chatId === '') {
        return ['ok' => false, 'error' => 'BOT_TOKEN yoki CHAT_ID kiritilmagan'];
    }

    $text = '<b>Yangi ariza #' . $count . "</b>\n\n"
        . '<b>Ota-ona:</b> ' . h($application['firstName'] . ' ' . $application['lastName']) . "\n"
        . '<b>Telefon:</b> ' . h($application['phone']) . "\n"
        . '<b>Bola:</b> ' . h($application['childFirstName'] . ' ' . $application['childLastName']) . "\n"
        . '<b>Hozirgi maktab:</b> ' . h($application['currentSchool']) . "\n"
        . '<b>Tugatgan sinf:</b> ' . h($application['graduatedClass']) . "-sinf\n"
        . '<b>Qabul sinfi:</b> ' . h($application['applyingClass']) . "-sinf\n"
        . '<b>Hudud:</b> ' . h($application['region']) . "\n"
        . '<b>Vaqt:</b> ' . h($application['createdAt']);

    $url = 'https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
    ], JSON_UNESCAPED_UNICODE);

    if (!function_exists('curl_init')) {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => 15,
            ],
        ]);
        $response = @file_get_contents($url, false, $context);
    } else {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
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
