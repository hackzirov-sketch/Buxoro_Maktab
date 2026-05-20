require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const ExcelJS = require("exceljs");

const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const DATA_FILE = path.join(__dirname, "applications.json");
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://buxoromaktabi.uz";

// Security middleware
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ALLOWED_ORIGIN, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "10kb" }));

// Rate limit: POST /api/applications — 5 ta/daqiqa/IP
const appLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Ko'p so'rov. Birozdan so'ng urinib ko'ring." },
});
app.use("/api/applications", appLimiter);

// HTML escapelash — Telegram xabarlari uchun
function esc(str) {
  if (typeof str !== "string") return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Frontend dist papkasini serv qilish
const distPath = path.join(__dirname, "..", "artifacts", "buxoro-maktabi", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log("✅ Frontend static fayllar serv qilinmoqda");
} else {
  console.log("⚠️ Frontend dist topilmadi, faqat API ishlaydi");
}

app.use(express.json());

// ==================== MA'LUMOTLARNI SAQLASH ====================
function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
  catch { return []; }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// ==================== TELEGRAM FUNKSIYALAR ====================
async function tg(method, payload) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error("Telegram xatosi:", err.message);
    return { ok: false };
  }
}

async function tgDoc(filePath, caption) {
  try {
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const form = new FormData();
    form.append("chat_id", CHAT_ID);
    form.append("document", blob, path.basename(filePath));
    form.append("caption", caption);
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: form,
    });
    const result = await res.json();
    if (!result.ok) console.error("Telegram fayl xatosi:", JSON.stringify(result));
  } catch (err) {
    console.error("Telegram fayl xatosi:", err.message);
  }
}

function getApplicationType(row) {
  return row?.type === "job" ? "job" : "study";
}

function getTodayKey() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tashkent" });
}

function isSameTashkentDay(row, dayKey = getTodayKey()) {
  if (!row?.createdAt) return false;
  if (row.createdAt.startsWith(dayKey)) return true;
  const parsed = new Date(row.createdAt);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toLocaleDateString("sv-SE", { timeZone: "Asia/Tashkent" }) === dayKey;
}

function filterApplications(data, type = "all", dayKey) {
  return data.filter(row => {
    const typeOk = type === "all" || getApplicationType(row) === type;
    const dayOk = !dayKey || isSameTashkentDay(row, dayKey);
    return typeOk && dayOk;
  });
}

function getStats(data, dayKey = getTodayKey()) {
  const todayStudy = filterApplications(data, "study", dayKey);
  const todayJob = filterApplications(data, "job", dayKey);
  return {
    total: data.length,
    study: filterApplications(data, "study").length,
    job: filterApplications(data, "job").length,
    today: todayStudy.length + todayJob.length,
    todayStudy: todayStudy.length,
    todayJob: todayJob.length,
  };
}

function getExcelColumns(type) {
  if (type === "job") {
    return [
      { header: "#", key: "id", width: 5 },
      { header: "Sana", key: "date", width: 22 },
      { header: "Manba", key: "source", width: 14 },
      { header: "Ism familiya", key: "fullName", width: 24 },
      { header: "Tug'ilgan sana", key: "birthDate", width: 18 },
      { header: "Ma'lumoti", key: "education", width: 22 },
      { header: "OTM", key: "university", width: 35 },
      { header: "Mutaxassislik", key: "specialty", width: 25 },
      { header: "Ish tajribasi", key: "experience", width: 35 },
      { header: "Oxirgi ish joyi", key: "lastWorkplace", width: 40 },
      { header: "Malaka toifasi", key: "qualification", width: 18 },
      { header: "Munosib lavozim", key: "desiredPosition", width: 25 },
      { header: "Yaxshi o'qituvchi", key: "goodTeacher", width: 45 },
      { header: "Zamonaviy maktab 3 jihat", key: "modernSchool", width: 45 },
      { header: "O'zi haqida", key: "about", width: 55 },
      { header: "Telefon", key: "phone", width: 20 },
    ];
  }

  return [
    { header: "#", key: "id", width: 5 },
    { header: "Sana", key: "date", width: 22 },
    { header: "Manba", key: "source", width: 14 },
    { header: "Vasiy Ism", key: "firstName", width: 18 },
    { header: "Vasiy Familiya", key: "lastName", width: 18 },
    { header: "Telefon", key: "phone", width: 20 },
    { header: "Bola ismi", key: "childFirstName", width: 18 },
    { header: "Bola familiyasi", key: "childLastName", width: 18 },
    { header: "Hozirgi maktab", key: "currentSchool", width: 28 },
    { header: "Tugatgan sinf", key: "graduatedClass", width: 16 },
    { header: "Qabul sinfi", key: "applyingClass", width: 16 },
    { header: "Hudud", key: "region", width: 18 },
  ];
}

function toExcelRow(row, i, type) {
  if (type === "job") {
    return {
      id: i + 1,
      date: row.createdAt,
      source: row.source || "telegram",
      fullName: row.fullName,
      birthDate: row.birthDate,
      education: row.education,
      university: row.university,
      specialty: row.specialty,
      experience: row.experience,
      lastWorkplace: row.lastWorkplace,
      qualification: row.qualification,
      desiredPosition: row.desiredPosition,
      goodTeacher: row.goodTeacher,
      modernSchool: row.modernSchool,
      about: row.about,
      phone: row.phone,
    };
  }

  return {
    id: i + 1,
    date: row.createdAt,
    source: row.source || "telegram",
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    childFirstName: row.childFirstName,
    childLastName: row.childLastName,
    currentSchool: row.currentSchool,
    graduatedClass: row.graduatedClass ? row.graduatedClass + "-sinf" : "",
    applyingClass: row.applyingClass ? row.applyingClass + "-sinf" : "",
    region: row.region,
  };
}

// ==================== EXCEL YARATISH ====================
async function createExcel(data, title, type = "study") {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Buxoro Maktabi";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(type === "job" ? "Ish arizalari" : "O'qish arizalari");

  // Ustunlar — widths bilan, birlashib ketmasligi uchun
  const colDefs = getExcelColumns(type);
  sheet.columns = colDefs;

  // Sarlavha
  const hRow = sheet.getRow(1);
  hRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11, name: "Arial" };
  hRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF059669" } };
  hRow.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  hRow.height = 28;
  // Sarlavhaga border
  hRow.eachCell(cell => {
    cell.border = {
      top: { style: "thin", color: { argb: "FF047857" } },
      bottom: { style: "thin", color: { argb: "FF047857" } },
      left: { style: "thin", color: { argb: "FF047857" } },
      right: { style: "thin", color: { argb: "FF047857" } },
    };
  });

  // Ma'lumotlar
  data.forEach((row, i) => {
    const r = sheet.addRow(toExcelRow(row, i, type));
    r.height = type === "job" ? 42 : 22;
    r.alignment = { vertical: "middle", wrapText: type === "job" };

    // Border har bir katakka
    r.eachCell(cell => {
      cell.border = {
        top: { style: "thin", color: { argb: "FFE2E8F0" } },
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFE2E8F0" } },
        right: { style: "thin", color: { argb: "FFE2E8F0" } },
      };
    });

    // Juft qatorlar uchun fon
    if (i % 2 === 0) {
      r.eachCell(cell => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF0FDF4" } };
      });
    }
  });

  // Muzlatilgan sarlavha (scroll qilganda sarlavha yuqorida qoladi)
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  // Avtofiltr
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: data.length + 1, column: colDefs.length },
  };

  // Telefon ustunidagi matn formatini matn sifatida saqlash
  const phoneColumn = colDefs.findIndex(col => col.key === "phone") + 1;
  if (phoneColumn > 0) sheet.getColumn(phoneColumn).numFmt = "@";

  const filePath = path.join(__dirname, `${title}.xlsx`);
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

async function sendExcelReport(type, data, title, caption) {
  if (data.length === 0) return false;
  const filePath = await createExcel(data, title, type);
  await tgDoc(filePath, caption);
  try { fs.unlinkSync(filePath); } catch {}
  return true;
}

async function sendDailyExcelReports(dayKey = getTodayKey()) {
  const allData = loadData();
  const studyData = filterApplications(allData, "study", dayKey);
  const jobData = filterApplications(allData, "job", dayKey);

  await tg("sendMessage", {
    chat_id: CHAT_ID,
    text: `📊 <b>Kunlik hisobot (${dayKey})</b>\n\n📚 O'qish arizalari: <b>${studyData.length}</b>\n💼 Ish arizalari: <b>${jobData.length}</b>`,
    parse_mode: "HTML",
    reply_markup: getKeyboard(true),
  });

  await sendExcelReport("study", studyData, `oqish_arizalari_${dayKey}`, `📚 O'qish arizalari — ${dayKey} (${studyData.length} ta)`);
  await sendExcelReport("job", jobData, `ish_arizalari_${dayKey}`, `💼 Ish arizalari — ${dayKey} (${jobData.length} ta)`);

  if (studyData.length === 0 && jobData.length === 0) {
    await tg("sendMessage", { chat_id: CHAT_ID, text: "Bugun yangi o'qish yoki ish arizasi kelmadi.", reply_markup: getKeyboard(true) });
  }
}

// ==================== BOT ORQALI ARIZA TOPSHIRISH ====================
const studyQuestions = [
  { key: "firstName", question: "👤 Vasiy Ismini kiriting:", validate: v => v.length >= 2 && v.length <= 50, error: "Ism 2-50 belgi orasida bo'lishi kerak" },
  { key: "lastName", question: "👤 Vasiy Familiyasini kiriting:", validate: v => v.length >= 2 && v.length <= 50, error: "Familiya 2-50 belgi orasida bo'lishi kerak" },
  { key: "phone", question: "📞 Telefon raqamingizni kiriting (+998xxxxxxxxx):", validate: v => /^\+998\d{9}$/.test(v), error: "❌ Noto'g'ri format. +998xxxxxxxxx" },
  { key: "childFirstName", question: "👶 Bolaning ismini kiriting:", validate: v => v.length >= 2 && v.length <= 50, error: "Bola ismi 2-50 belgi" },
  { key: "childLastName", question: "👶 Bolaning familiyasini kiriting:", validate: v => v.length >= 2 && v.length <= 50, error: "Bola familiyasi 2-50 belgi" },
  { key: "currentSchool", question: "🏫 Hozirgi o'qish joyini (maktab) kiriting:", validate: v => v.length >= 2 && v.length <= 100, error: "Maktab nomi 2-100 belgi" },
  { key: "graduatedClass", question: "📚 Tugatgan sinfini tanlang:", validate: v => !isNaN(parseInt(v)) && parseInt(v) >= 0 && parseInt(v) <= 11, error: "0-11 orasida son kiriting", isClass: true },
  { key: "applyingClass", question: "📚 Qabul qilinadigan sinfini tanlang:", validate: v => !isNaN(parseInt(v)) && parseInt(v) >= 0 && parseInt(v) <= 11, error: "0-11 orasida son kiriting", isClass: true },
  { key: "region", question: "📍 Hududni kiriting (masalan: Bekobod shahar):", validate: v => v.length >= 3 && v.length <= 100, error: "Hudud 3-100 belgi" },
];

const jobQuestions = [
  { key: "fullName", question: "👤 Ism, familiyangizni kiriting:", validate: v => v.length >= 3 && v.length <= 100, error: "Ism va familiya 3-100 belgi orasida bo'lishi kerak" },
  { key: "birthDate", question: "🎂 Tug'ilgan yil, oy va sanangizni kiriting (masalan: 1995-05-21):", validate: v => v.length >= 6 && v.length <= 40, error: "Tug'ilgan sanani kiriting" },
  { key: "education", question: "🎓 Ma'lumotingizni yozing:", validate: v => v.length >= 3 && v.length <= 200, error: "Ma'lumotingizni to'liqroq yozing" },
  { key: "university", question: "🏛 O'qigan oliy o'quv yurtingizni yozing (nomi, tamomlagan yili):", validate: v => v.length >= 5 && v.length <= 250, error: "Oliy o'quv yurti nomi va yilini yozing" },
  { key: "specialty", question: "📚 Mutaxassisligingizni yozing:", validate: v => v.length >= 3 && v.length <= 150, error: "Mutaxassisligingizni yozing" },
  { key: "experience", question: "💼 Ish tajribangizni yozing:", validate: v => v.length >= 2 && v.length <= 500, error: "Ish tajribangizni yozing. Tajribangiz bo'lmasa, 'yo'q' deb yozing" },
  { key: "lastWorkplace", question: "🏢 Hozirgi va/yoki oxirgi ish joyingiz haqida yozing (joy nomi, lavozim, ishlagan yillar):", validate: v => v.length >= 3 && v.length <= 600, error: "Ish joyi, lavozim va yillarni yozing" },
  { key: "qualification", question: "🏅 Malaka toifangizni tanlang:", validate: v => QUALIFICATION_OPTIONS.includes(v), error: "Malaka toifasini tugmalardan tanlang", isQualification: true },
  { key: "desiredPosition", question: "🎯 O'zingizni qaysi lavozimga munosib ko'rasiz?", validate: v => v.length >= 3 && v.length <= 200, error: "Lavozimni yozing" },
  { key: "goodTeacher", question: "👩‍🏫 Siz uchun yaxshi o'qituvchi qanday bo'lishi kerak?", validate: v => v.length >= 20 && v.length <= 600, error: "20-600 belgi orasida fikringizni yozing" },
  { key: "modernSchool", question: "🏫 Sizningcha, zamonaviy maktabda eng muhim 3 ta jihat nima?", validate: v => v.length >= 20 && v.length <= 600, error: "20-600 belgi orasida eng muhim 3 ta jihatni yozing" },
  { key: "about", question: "📝 O'zingiz haqingizda ma'lumot qoldiring (100 ta so'zdan kam bo'lmasin):", validate: v => v.trim().split(/\s+/).filter(Boolean).length >= 100 && v.length <= 1800, error: "Bu javob 100 ta so'zdan kam bo'lmasin va 1800 belgidan oshmasin" },
  { key: "phone", question: "📞 Telefon raqamingizni kiriting (+998xxxxxxxxx):", validate: v => /^\+998\d{9}$/.test(v), error: "❌ Noto'g'ri format. +998xxxxxxxxx" },
];

const APPLICATION_TYPES = {
  study: { label: "O'qish uchun", title: "O'qish uchun ariza", questions: studyQuestions },
  job: { label: "Ishga kirish uchun", title: "Ishga kirish uchun ariza", questions: jobQuestions },
};
const QUALIFICATION_OPTIONS = ["Mutaxassis", "2 - toifa", "1 - toifa", "Oliy"];
const REGION_OPTIONS = ["Bekobod shahar", "Shirin shahar", "Juma", "Xos", "Zafar"];

const userSessions = {};
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 daqiqa

function getUserSession(chatId) {
  const now = Date.now();
  if (userSessions[chatId]) {
    if (now - userSessions[chatId].startedAt > SESSION_TIMEOUT) {
      delete userSessions[chatId];
      return null;
    }
    userSessions[chatId].startedAt = now;
  }
  return userSessions[chatId] || null;
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const chatId in userSessions) {
    if (now - userSessions[chatId].startedAt > SESSION_TIMEOUT) {
      delete userSessions[chatId];
    }
  }
}
setInterval(cleanupExpiredSessions, 60000);

function getApplicationConfig(sessionOrType) {
  const type = typeof sessionOrType === "string" ? sessionOrType : sessionOrType?.type;
  return APPLICATION_TYPES[type] || APPLICATION_TYPES.study;
}

function getQuestions(sessionOrType) {
  return getApplicationConfig(sessionOrType).questions;
}

function getTotalSteps(sessionOrType) {
  return getQuestions(sessionOrType).length;
}

function applicationTypeKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "📚 O'qish uchun", callback_data: "application_type_study" }],
      [{ text: "💼 Ishga kirish uchun", callback_data: "application_type_job" }],
    ],
  };
}

function classKeyboard(selected) {
  const rows = [];
  for (let i = 0; i < 12; i += 4) {
    rows.push(Array.from({ length: Math.min(4, 12 - i) }, (_, j) => {
      const v = (i + j).toString();
      return { text: v === selected ? "✅ " + v : v, callback_data: "class_" + v };
    }));
  }
  rows.push([
    { text: "⬅️ Orqaga", callback_data: "back_application" },
    { text: "❌ Bekor qilish", callback_data: "cancel_application" },
  ]);
  return { inline_keyboard: rows };
}

function applicationReplyKeyboard(question) {
  if (question?.isQualification) {
    return {
      keyboard: [
        ...QUALIFICATION_OPTIONS.map(text => [{ text }]),
        [{ text: "⬅️ Orqaga" }, { text: "❌ Bekor qilish" }],
      ],
      resize_keyboard: true,
      is_persistent: true,
    };
  }

  if (question?.key === "region") {
    const regionRows = [];
    for (let i = 0; i < REGION_OPTIONS.length; i += 2) {
      regionRows.push(REGION_OPTIONS.slice(i, i + 2).map(text => ({ text })));
    }
    regionRows.push([{ text: "⬅️ Orqaga" }, { text: "❌ Bekor qilish" }]);

    return {
      keyboard: regionRows,
      resize_keyboard: true,
      is_persistent: true,
    };
  }

  return {
    keyboard: [
      [{ text: "⬅️ Orqaga" }, { text: "❌ Bekor qilish" }],
    ],
    resize_keyboard: true,
    is_persistent: true,
  };
}

function confirmationKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "✅ Tasdiqlash", callback_data: "submit_application" },
        { text: "❌ Bekor qilish", callback_data: "cancel_application" },
      ],
      [{ text: "⬅️ Orqaga", callback_data: "back_application" }],
    ],
  };
}

function isCompleteApplication(session) {
  const questions = getQuestions(session);
  return Boolean(
    session &&
    session.data &&
    questions.every(q => {
      const value = session.data[q.key];
      return value !== undefined && value !== null && value.toString().trim() !== "";
    })
  );
}

function isCancelText(text) {
  return text === "/cancel" || text.includes("Bekor");
}

function isBackText(text) {
  return text === "/back" || text.includes("Orqaga");
}

function isStartApplicationText(text) {
  return text === "/start" || text.includes("Ariza topshirish");
}

function applicationSummary(session) {
  const config = getApplicationConfig(session);
  const questions = getQuestions(session);
  return (
    `📝 *${config.title}*\n\nArizangizni tekshiring:\n\n` +
    questions.map((q, i) => {
      const val = session.data[q.key] || "";
      return `*${i + 1}. ${q.question.replace(/[:].*/, "")}:* ${formatSummaryValue(q.isClass ? val + "-sinf" : val)}`;
    }).join("\n") +
    "\n\n✅ Tasdiqlash uchun pastdagi tugmani bosing.\n❌ Bekor qilish uchun bekor qilish tugmasini bosing."
  );
}

function formatSummaryValue(value) {
  const text = value.toString();
  return text.length > 500 ? text.slice(0, 500) + "..." : text;
}

function buildAdminApplicationMessage(application, count) {
  if (application.type === "job") {
    return `
📩 <b>Yangi ish arizasi #${count}</b>

📌 <b>Manba:</b> ${esc(application.source || "telegram")}
👤 <b>Nomzod:</b> ${esc(application.fullName)}
🎂 <b>Tug'ilgan sana:</b> ${esc(application.birthDate)}
🎓 <b>Ma'lumoti:</b> ${esc(application.education)}
🏛 <b>OTM:</b> ${esc(application.university)}
📚 <b>Mutaxassisligi:</b> ${esc(application.specialty)}
💼 <b>Ish tajribasi:</b> ${esc(application.experience)}
🏢 <b>Oxirgi ish joyi:</b> ${esc(application.lastWorkplace)}
🏅 <b>Malaka toifasi:</b> ${esc(application.qualification)}
🎯 <b>Munosib lavozim:</b> ${esc(application.desiredPosition)}
👩‍🏫 <b>Yaxshi o'qituvchi:</b> ${esc(application.goodTeacher)}
🏫 <b>Zamonaviy maktabdagi 3 jihat:</b> ${esc(application.modernSchool)}
📝 <b>O'zi haqida:</b> ${esc(application.about)}
📞 <b>Telefon:</b> ${esc(application.phone)}
🕐 <b>Vaqt:</b> ${application.createdAt}
    `.trim();
  }

  return `
📩 <b>Yangi o'qish arizasi #${count}</b>

📌 <b>Manba:</b> ${esc(application.source || "telegram")}
👤 <b>Ota-ona:</b> ${esc(application.firstName)} ${esc(application.lastName)}
📞 <b>Telefon:</b> ${esc(application.phone)}
👶 <b>Bola:</b> ${esc(application.childFirstName)} ${esc(application.childLastName)}
🏫 <b>Hozirgi maktab:</b> ${esc(application.currentSchool)}
📚 <b>Tugatgan sinf:</b> ${esc(application.graduatedClass)}-sinf
🎯 <b>Qabul sinfi:</b> ${esc(application.applyingClass)}-sinf
📍 <b>Hudud:</b> ${esc(application.region)}
🕐 <b>Vaqt:</b> ${application.createdAt}
  `.trim();
}

async function sendApplicationSummary(chatId, session, editMessageId) {
  session.step = getTotalSteps(session);
  const payload = {
    chat_id: chatId,
    text: applicationSummary(session),
    parse_mode: "Markdown",
    reply_markup: confirmationKeyboard(),
  };

  if (editMessageId) {
    await tg("editMessageText", { ...payload, message_id: editMessageId });
    return;
  }

  await tg("sendMessage", payload);
}

async function goBackApplication(chatId) {
  const session = getUserSession(chatId);
  if (!session) {
    await tg("sendMessage", { chat_id: chatId, text: "Sessiya topilmadi. Qaytadan /start yozing." });
    return;
  }

  if (session.step <= 0) {
    await tg("sendMessage", { chat_id: chatId, text: "Siz birinchi savoldasiz. Bekor qilish uchun /cancel yozing." });
    return;
  }

  const totalSteps = getTotalSteps(session);
  const questions = getQuestions(session);
  session.step = session.step >= totalSteps ? totalSteps - 1 : session.step - 1;
  const q = questions[session.step];
  delete session.data[q.key];
  await sendCurrentQuestion(chatId);
}

async function startApplication(chatId) {
  delete userSessions[chatId];
  await tg("sendMessage", {
    chat_id: chatId,
    text: "📝 Qaysi turdagi ariza topshirmoqchisiz?",
    reply_markup: applicationTypeKeyboard(),
  });
}

async function startApplicationType(chatId, type) {
  const safeType = APPLICATION_TYPES[type] ? type : "study";
  const config = getApplicationConfig(safeType);
  userSessions[chatId] = { type: safeType, step: 0, data: {}, startedAt: Date.now() };
  const questions = getQuestions(safeType);
  const q = questions[0];
  const extra = q.isClass ? { reply_markup: classKeyboard() } : { reply_markup: applicationReplyKeyboard(q) };
  await tg("sendMessage", {
    chat_id: chatId,
    text: `📝 *${config.title}*\n\nQuyidagi savollarga javob bering.\n/back — oldingi savolga qaytish\n/cancel — bekor qilish\n\n1/${questions.length}. ${q.question}`,
    parse_mode: "Markdown",
    ...extra,
  });
}

async function sendCurrentQuestion(chatId) {
  const session = getUserSession(chatId);
  if (!session) return;
  const step = session.step;
  const questions = getQuestions(session);
  const q = questions[step];
  const extra = q.isClass ? { reply_markup: classKeyboard(session.data[q.key]) } : { reply_markup: applicationReplyKeyboard(q) };
  await tg("sendMessage", {
    chat_id: chatId,
    text: (step + 1) + "/" + questions.length + ". " + q.question,
    parse_mode: "Markdown",
    ...extra,
  });
}

async function handleApplicationStep(chatId, text) {
  const session = getUserSession(chatId);
  if (!session) {
    await tg("sendMessage", { chat_id: chatId, text: "⏳ Vaqt tugadi. Qaytadan /start yozing.", reply_markup: getKeyboard(Number(chatId) === Number(CHAT_ID)) });
    return;
  }

  const step = session.step;
  const questions = getQuestions(session);
  if (step >= questions.length) return;

  const q = questions[step];
  let value = text.trim();

  // Telefon uchun raqamlarni tozalash
  if (q.key === "phone") {
    value = text.replace(/[^\d+]/g, "");
  }

  // Validatsiya
  if (!q.validate(value)) {
    await tg("sendMessage", { chat_id: chatId, text: "❌ " + q.error + ". Qayta kiriting:", reply_markup: q.isClass ? classKeyboard(session.data[q.key]) : applicationReplyKeyboard(q) });
    return;
  }

  session.data[q.key] = q.key === "graduatedClass" || q.key === "applyingClass" ? parseInt(value).toString() : value;
  session.step++;

  // Keyingi savol
  if (session.step < questions.length) {
    const nextQ = questions[session.step];
    const extra = nextQ.isClass ? { reply_markup: classKeyboard() } : { reply_markup: applicationReplyKeyboard(nextQ) };
    await tg("sendMessage", {
      chat_id: chatId,
      text: (session.step + 1) + "/" + questions.length + ". " + nextQ.question,
      parse_mode: "Markdown",
      ...extra,
    });
    return;
  }

  // Barcha savollar tugadi — tasdiqlash
  await sendApplicationSummary(chatId, session);
}

async function submitApplication(chatId) {
  const session = getUserSession(chatId);
  if (!isCompleteApplication(session)) {
    await tg("sendMessage", { chat_id: chatId, text: "Ariza to'liq emas. Iltimos, /cancel qilib qaytadan boshlang." });
    return;
  }

  if (session.submitting) {
    await tg("sendMessage", { chat_id: chatId, text: "Arizangiz yuborilmoqda, iltimos biroz kuting." });
    return;
  }
  session.submitting = true;

  try {
    const application = {
      id: Date.now(),
      type: session.type || "study",
      source: "telegram",
      ...session.data,
      createdAt: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
    };

    const allData = loadData();
    allData.push(application);
    saveData(allData);
    const config = getApplicationConfig(session);

    await tg("sendMessage", {
      chat_id: chatId,
      text: `✅ *${config.title} qabul qilindi!*\n\nOperatorlarimiz tez orada siz bilan bog'lanishadi.\n\nRahmat! 🙏`,
      parse_mode: "Markdown",
      reply_markup: getKeyboard(false),
    });

    const msg = buildAdminApplicationMessage(application, allData.length);
    const adminResult = await tg("sendMessage", { chat_id: CHAT_ID, text: msg, parse_mode: "HTML", reply_markup: getKeyboard(true) });
    if (!adminResult.ok) {
      console.error("Admin xabar yuborilmadi:", JSON.stringify(adminResult));
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Ariza saqlandi, lekin operatorga Telegram xabari yetib bormagan bo'lishi mumkin. Iltimos, telefon orqali ham bog'laning: +998 94 835 66 66",
        reply_markup: getKeyboard(false),
      });
    }

    delete userSessions[chatId];
  } catch (err) {
    session.submitting = false;
    console.error("Ariza yuborishda xato:", err.message);
    await tg("sendMessage", {
      chat_id: chatId,
      text: "Serverda vaqtinchalik xatolik bo'ldi. Iltimos, yana bir marta Tasdiqlash tugmasini bosing yoki /cancel qilib qaytadan boshlang.",
      reply_markup: confirmationKeyboard(),
    });
  }
}

// ==================== KEYBOARD (doimiy pastki tugmalar) ====================
function getKeyboard(isAdmin) {
  return {
    keyboard: isAdmin
      ? [
          [{ text: "📊 Statistika" }, { text: "📥 O'qish Excel" }],
          [{ text: "💼 Ish Excel" }, { text: "📅 Bugungi hisobot" }],
          [{ text: "📝 Ariza topshirish" }],
          [{ text: "🔄 Yangilash" }],
        ]
      : [
          [{ text: "📝 Ariza topshirish" }],
        ],
    resize_keyboard: true,
    is_persistent: true,
  };
}

// ==================== BOT MENU ====================
async function sendMainMenu(chatId, editMsgId) {
  const allData = loadData();
  const dayKey = getTodayKey();
  const stats = getStats(allData, dayKey);
  const regions = [...new Set(filterApplications(allData, "study").map(a => a.region).filter(Boolean))];
  const isAdmin = Number(chatId) === Number(CHAT_ID);

  const msg = `
📊 <b>Buxoro Maktabi — Statistika</b>

👥 <b>Jami:</b> ${stats.total} ta
📚 <b>O'qish:</b> ${stats.study} ta | bugun ${stats.todayStudy} ta
💼 <b>Ish:</b> ${stats.job} ta | bugun ${stats.todayJob} ta
📅 <b>Bugun jami:</b> ${stats.today} ta
📍 <b>O'qish hududlari:</b> ${regions.map(r => `\n  • ${r}: ${filterApplications(allData, "study").filter(a => a.region === r).length} ta`).join("") || " yo'q"}
🕐 <b>So'nggi yangilanish:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔄 Yangilash", callback_data: "refresh" },
        { text: "📚 O'qish Excel", callback_data: "get_excel_study" },
      ],
      [{ text: "💼 Ish Excel", callback_data: "get_excel_job" }],
      [
        { text: "📅 Bugungi hisobot", callback_data: "today_report" },
        { text: "📊 Umumiy statistika", callback_data: "full_stats" },
      ],
    ],
  };

  if (editMsgId) {
    await tg("editMessageText", { chat_id: chatId, message_id: editMsgId, text: msg, parse_mode: "HTML", reply_markup: keyboard });
  } else {
    await tg("sendMessage", { chat_id: chatId, text: msg, parse_mode: "HTML", reply_markup: keyboard });
  }
}

// ==================== TELEGRAM XABARLARINI QAYTA ISHLASH ====================
async function handleUpdate(update) {
  const msg = update.message;
  const cb = update.callback_query;

  if (msg) {
    const txt = msg.text || "";
    const chatId = msg.chat.id;
    const session = userSessions[chatId];

    // Ariza jarayoni buyruqlari
    if (session) {
      const questions = getQuestions(session);
      const totalSteps = questions.length;
      const isClassQuestion = session.step < totalSteps && questions[session.step].isClass;

      if (isStartApplicationText(txt)) {
        await startApplication(chatId);
        return;
      }

      if (isCancelText(txt)) {
        delete userSessions[chatId];
        await tg("sendMessage", { chat_id: chatId, text: "❌ Ariza bekor qilindi.", reply_markup: getKeyboard(Number(chatId) === Number(CHAT_ID)) });
        return;
      }

      if (isBackText(txt)) {
        await goBackApplication(chatId);
        return;
      }

      if (txt === "/submit" && session.step === totalSteps) {
        await submitApplication(chatId);
        return;
      }

      // Sinfni inline keyboard bilan tanlash kerak
      if (isClassQuestion) {
        await tg("sendMessage", { chat_id: chatId, text: "Iltimos, quyidagi tugmalardan sinfni tanlang:", reply_markup: classKeyboard() });
        return;
      }

      // Oddiy matnli javob
      if (session.step < totalSteps) {
        await handleApplicationStep(chatId, txt);
        return;
      }

      // Submit kutish holati
      if (session.step === totalSteps) {
        await sendApplicationSummary(chatId, session);
        return;
      }
      return;
    }

    if (txt === "/start") {
      if (Number(chatId) === Number(CHAT_ID)) {
        await tg("sendMessage", { chat_id: chatId, text: "Admin panel tayyor.", reply_markup: getKeyboard(true) });
        await sendMainMenu(chatId);
      } else {
        await tg("sendMessage", { chat_id: chatId, text: "🤖 *Buxoro Maktabi botiga xush kelibsiz!*\n\nAriza topshirish uchun quyidagi tugmani bosing:", parse_mode: "Markdown", reply_markup: getKeyboard(false) });
      }
    } else if (txt === "/menu" || txt === "🔄 Yangilash" || txt === "📊 Statistika") {
      if (Number(chatId) !== Number(CHAT_ID)) return;
      await sendMainMenu(chatId);
    } else if (txt === "/excel" || txt === "📥 O'qish Excel") {
      if (Number(chatId) !== Number(CHAT_ID)) return;
      const studyData = filterApplications(loadData(), "study");
      if (studyData.length === 0) return await tg("sendMessage", { chat_id: chatId, text: "❌ O'qish arizalari yo'q" });
      await tg("sendMessage", { chat_id: chatId, text: "⏳ Fayl tayyorlanmoqda..." });
      await sendExcelReport("study", studyData, `oqish_arizalari_${getTodayKey()}`, `📚 Barcha o'qish arizalari (${studyData.length} ta)`);
    } else if (txt === "💼 Ish Excel") {
      if (Number(chatId) !== Number(CHAT_ID)) return;
      const jobData = filterApplications(loadData(), "job");
      if (jobData.length === 0) return await tg("sendMessage", { chat_id: chatId, text: "❌ Ish arizalari yo'q" });
      await tg("sendMessage", { chat_id: chatId, text: "⏳ Fayl tayyorlanmoqda..." });
      await sendExcelReport("job", jobData, `ish_arizalari_${getTodayKey()}`, `💼 Barcha ish arizalari (${jobData.length} ta)`);
    } else if (txt === "📅 Bugungi hisobot") {
      if (Number(chatId) !== Number(CHAT_ID)) return;
      await tg("sendMessage", { chat_id: chatId, text: "⏳ Hisobot tayyorlanmoqda..." });
      await sendDailyExcelReports(getTodayKey());
    } else if (isStartApplicationText(txt)) {
      await startApplication(chatId);
    } else if (isCancelText(txt)) {
      if (userSessions[chatId]) {
        delete userSessions[chatId];
        await tg("sendMessage", { chat_id: chatId, text: "❌ Ariza bekor qilindi.", reply_markup: getKeyboard(Number(chatId) === Number(CHAT_ID)) });
      }
    }
    return;
  }

  if (!cb) return;
  const chatId = cb.message.chat.id;
  const msgId = cb.message.message_id;
  const data = cb.data;

  if (data.startsWith("application_type_")) {
    const type = data.replace("application_type_", "");
    await tg("answerCallbackQuery", { callback_query_id: cb.id });
    await startApplicationType(chatId, type);
    return;
  }

  if (data === "submit_application") {
    await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Yuborilmoqda..." });
    await submitApplication(chatId);
    return;
  }

  if (data === "cancel_application") {
    delete userSessions[chatId];
    await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Bekor qilindi" });
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: msgId,
      text: "❌ Ariza bekor qilindi. Qaytadan boshlash uchun /start yozing.",
    });
    return;
  }

  if (data === "back_application") {
    await tg("answerCallbackQuery", { callback_query_id: cb.id });
    await goBackApplication(chatId);
    return;
  }

  // Sinf tanlash — ariza jarayonida
  if (data.startsWith("class_")) {
    const classVal = data.replace("class_", "");
    const session = getUserSession(chatId);
    const questions = getQuestions(session);
    if (session && session.step < questions.length && questions[session.step].isClass) {
      session.data[questions[session.step].key] = classVal;
      session.step++;

      if (session.step < questions.length) {
        const nextQ = questions[session.step];
        const extra = nextQ.isClass ? { reply_markup: classKeyboard() } : { reply_markup: applicationReplyKeyboard(nextQ) };
        await tg("editMessageText", {
          chat_id: chatId,
          message_id: msgId,
          text: "✅ " + classVal + "-sinf tanlandi.\n\n" + (session.step + 1) + "/" + questions.length + ". " + nextQ.question,
          parse_mode: "Markdown",
          ...extra,
        });
      } else {
        // Barcha savollar tugadi
        await sendApplicationSummary(chatId, session, msgId);
      }
    }
    await tg("answerCallbackQuery", { callback_query_id: cb.id });
    return;
  }

  if (data === "refresh") {
    await sendMainMenu(chatId, msgId);
  } else if (data === "get_excel_study" || data === "get_excel") {
    const studyData = filterApplications(loadData(), "study");
    if (studyData.length === 0) {
      return await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "❌ O'qish arizalari yo'q!", show_alert: true });
    }
    await tg("editMessageText", { chat_id: chatId, message_id: msgId, text: "⏳ Excel fayl tayyorlanmoqda...", parse_mode: "HTML" });
    await sendExcelReport("study", studyData, `oqish_arizalari_${getTodayKey()}`, `📚 Barcha o'qish arizalari (${studyData.length} ta)`);
    await sendMainMenu(chatId, msgId);
  } else if (data === "get_excel_job") {
    const jobData = filterApplications(loadData(), "job");
    if (jobData.length === 0) {
      return await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "❌ Ish arizalari yo'q!", show_alert: true });
    }
    await tg("editMessageText", { chat_id: chatId, message_id: msgId, text: "⏳ Excel fayl tayyorlanmoqda...", parse_mode: "HTML" });
    await sendExcelReport("job", jobData, `ish_arizalari_${getTodayKey()}`, `💼 Barcha ish arizalari (${jobData.length} ta)`);
    await sendMainMenu(chatId, msgId);
  } else if (data === "today_report") {
    const stats = getStats(loadData());
    if (stats.today === 0) {
      return await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "📅 Bugun ariza yo'q!", show_alert: true });
    }
    await tg("editMessageText", { chat_id: chatId, message_id: msgId, text: "⏳ Hisobot tayyorlanmoqda...", parse_mode: "HTML" });
    await sendDailyExcelReports(getTodayKey());
    await sendMainMenu(chatId, msgId);
  } else if (data === "full_stats") {
    const allData = loadData();
    const stats = getStats(allData);
    const regions = [...new Set(filterApplications(allData, "study").map(a => a.region).filter(Boolean))];
    const msg = `
📊 <b>UMUMIY STATISTIKA</b>
━━━━━━━━━━━━━━━━
👥 <b>Jami:</b> ${stats.total} ta
📚 <b>O'qish:</b> ${stats.study} ta
💼 <b>Ish:</b> ${stats.job} ta
📅 <b>Bugun:</b> ${stats.today} ta
  • O'qish: ${stats.todayStudy} ta
  • Ish: ${stats.todayJob} ta
📆 <b>Kunlik o'rtacha:</b> ${allData.length > 0 ? Math.round(allData.length / Math.max(1, (Date.now() - new Date(allData[0]?.createdAt).getTime()) / 86400000)) : 0} ta
━━━━━━━━━━━━━━━━
📍 <b>O'qish hududlari bo'yicha:</b>
${regions.map(r => `  • ${r}: ${filterApplications(allData, "study").filter(a => a.region === r).length} ta`).join("\n") || "  Ma'lumot yo'q"}
    `.trim();
    await tg("sendMessage", { chat_id: chatId, text: msg, parse_mode: "HTML" });
  }

  await tg("answerCallbackQuery", { callback_query_id: cb.id });
}

// ==================== WEBHOOK (Telegram dan to'g'ridan-to'g'ri) ====================
app.post(`/webhook`, async (req, res) => {
  try {
    await handleUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook xatosi:", err.message);
    res.sendStatus(200);
  }
});

// ==================== POLLING (zaxira) ====================
async function startPolling() {
  const offsetFile = path.join(__dirname, "polling_offset.txt");
  let offset = 0;
  try { offset = parseInt(fs.readFileSync(offsetFile, "utf8")) || 0; } catch {}

  // Eski kutilayotgan xabarlarni tozalash
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1`);
  console.log("🤖 Telegram polling ishga tushdi...");

  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=15`);
      const data = await res.json();
      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          if (update.update_id < offset) continue; // eski xabarlarni o'tkazib yuborish
          await handleUpdate(update);
          offset = update.update_id + 1;
          fs.writeFileSync(offsetFile, offset.toString(), "utf8");
        }
      }
    } catch (err) {
      console.error("Polling xatosi:", err.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

(async () => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("BOT_TOKEN yoki CHAT_ID yo'q. Telegram bot va bildirishnomalar ishlamaydi.");
    return;
  }
  // Avval webhook ni o'chirish (polling bilan konflikt bo'lmasligi uchun)
  await tg("deleteWebhook", { drop_pending_updates: true });
  startPolling();
})();

// ==================== API: ARIZA QABUL QILISH ====================
app.post("/api/applications", async (req, res) => {
  try {
    const data = req.body;
    const required = ["firstName","lastName","phone","childFirstName","childLastName","currentSchool","graduatedClass","applyingClass","region"];
    for (const field of required) {
      const val = data[field];
      if (!val || val.toString().trim().length === 0) {
        return res.status(400).json({ error: field + " noto'g'ri" });
      }
    }
    if (!/^\+998\d{9}$/.test(data.phone.toString().trim())) {
      return res.status(400).json({ error: "Telefon +998xxxxxxxxx formatida bo'lishi kerak" });
    }

    const application = {
      id: Date.now(),
      type: "study",
      source: "website",
      firstName: data.firstName.trim().slice(0, 50),
      lastName: data.lastName.trim().slice(0, 50),
      phone: data.phone.trim(),
      childFirstName: data.childFirstName.trim().slice(0, 50),
      childLastName: data.childLastName.trim().slice(0, 50),
      currentSchool: data.currentSchool.trim().slice(0, 100),
      graduatedClass: data.graduatedClass.toString().trim(),
      applyingClass: data.applyingClass.toString().trim(),
      region: data.region.trim().slice(0, 100),
      createdAt: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
    };

    const allData = loadData();
    allData.push(application);
    saveData(allData);

    const msg = buildAdminApplicationMessage(application, allData.length);

    await tg("sendMessage", { chat_id: CHAT_ID, text: msg, parse_mode: "HTML", reply_markup: getKeyboard(true) });
    res.json({ success: true, id: application.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// ==================== API: EXCEL ====================
app.get("/api/applications/excel", async (req, res) => {
  try {
    const allData = loadData();
    const type = req.query.type === "job" ? "job" : "study";
    const rows = filterApplications(allData, type);
    if (rows.length === 0) return res.status(404).json({ error: "Ma'lumot yo'q" });
    const filePath = await createExcel(rows, `${type === "job" ? "ish" : "oqish"}_arizalari_${getTodayKey()}`, type);
    res.download(filePath, (err) => { if (!err) fs.unlinkSync(filePath); });
  } catch (err) {
    res.status(500).json({ error: "Excel xatosi" });
  }
});

app.get("/api/applications/today", (req, res) => {
  const allData = loadData();
  const stats = getStats(allData);
  res.json({ count: stats.today, study: stats.todayStudy, job: stats.todayJob });
});

app.get("/api/applications/stats", (req, res) => {
  const allData = loadData();
  res.json(getStats(allData));
});

// ==================== HEALTH CHECK ====================
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== SPA FALLBACK ====================
app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/webhook") || req.path.includes(".")) return next();
  const indexFile = path.join(distPath, "index.html");
  if (fs.existsSync(indexFile)) res.sendFile(indexFile);
  else next();
});

// ==================== AUTO-HISOBOT (soat 21:00) ====================
let lastReportDate = "";
cron.schedule("0 21 * * *", async () => {
  const today = getTodayKey();

  if (lastReportDate === today) {
    return console.log("⏭ Yangi ariza yo'q, hisobot tashlanmadi");
  }

  await sendDailyExcelReports(today);
  lastReportDate = today;
  console.log(`✅ Kunlik hisobot yuborildi: ${today}`);
});

// ==================== SERVERNI ISHGA TUSHIRISH ====================
app.listen(PORT, () => {
  console.log(`\n✅ Buxoro Maktabi Server ishga tushdi`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📩 POST /api/applications — ariza qabul qilish`);
  console.log(`📊 GET  /api/applications/excel — Excel yuklab olish`);
  console.log(`📋 GET  /api/applications/stats — statistika`);
  console.log(`📅 GET  /api/applications/today — bugungi arizalar`);
  console.log(`💚 GET  /api/healthz — sog'liqni tekshirish`);
  console.log(`🤖 Bot: @BuxoroMaktabi_EDU777_bot`);
  console.log(`⏰ Kunlik hisobot: soat 21:00`);

  if (BOT_TOKEN && CHAT_ID) {
    tg("sendMessage", {
      chat_id: CHAT_ID,
      text: `✅ <b>Server ishga tushdi</b>\n\n🌐 Port: ${PORT}\n📚 O'qish arizalari va 💼 ish arizalari alohida saqlanadi.\n📊 Kunlik Excel hisobot: 21:00`,
      parse_mode: "HTML",
      reply_markup: getKeyboard(true),
    });
  }
});

// ==================== XATOLIKLARNI USHLASH ====================
process.on("uncaughtException", (err) => {
  console.error("Critical error:", err.message);
  if (BOT_TOKEN && CHAT_ID) {
    tg("sendMessage", { chat_id: CHAT_ID, text: `🚨 Server xatosi: ${esc(err.message)}`, parse_mode: "HTML" });
  }
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  if (BOT_TOKEN && CHAT_ID) {
    tg("sendMessage", { chat_id: CHAT_ID, text: `🚨 Promise xatosi: ${esc(err?.message || String(err))}`, parse_mode: "HTML" });
  }
});

// Har 10 daqiqada JSON fayl zaxirasi
setInterval(() => {
  const backupDir = path.join(__dirname, "backups");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  if (fs.existsSync(DATA_FILE)) {
    fs.copyFileSync(DATA_FILE, path.join(backupDir, `applications_${new Date().toISOString().slice(0, 16).replace("T", "_")}.json`));
  }
  // 7 kundan eski backup larni o'chirish
  fs.readdirSync(backupDir).forEach(f => {
    const fp = path.join(backupDir, f);
    if (Date.now() - fs.statSync(fp).mtimeMs > 7 * 86400000) fs.unlinkSync(fp);
  });
}, 600000);

module.exports = app;
