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

app.use(cors());
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

// ==================== EXCEL YARATISH ====================
async function createExcel(data, title) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Buxoro Maktabi";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Arizalar");

  // Ustunlar — widths bilan, birlashib ketmasligi uchun
  const colDefs = [
    { header: "#", key: "id", width: 5 },
    { header: "Sana", key: "date", width: 22 },
    { header: "Ism", key: "firstName", width: 18 },
    { header: "Familiya", key: "lastName", width: 18 },
    { header: "Telefon", key: "phone", width: 20 },
    { header: "Bola ismi", key: "childFirstName", width: 18 },
    { header: "Bola familiyasi", key: "childLastName", width: 18 },
    { header: "Hozirgi maktab", key: "currentSchool", width: 28 },
    { header: "Tugatgan sinf", key: "graduatedClass", width: 16 },
    { header: "Qabul sinfi", key: "applyingClass", width: 16 },
    { header: "Hudud", key: "region", width: 18 },
  ];
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
    const r = sheet.addRow({
      id: i + 1,
      date: row.createdAt,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      childFirstName: row.childFirstName,
      childLastName: row.childLastName,
      currentSchool: row.currentSchool,
      graduatedClass: row.graduatedClass + "-sinf",
      applyingClass: row.applyingClass + "-sinf",
      region: row.region,
    });
    r.height = 22;
    r.alignment = { vertical: "middle", wrapText: false };

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
  sheet.getColumn(5).numFmt = "@";

  const filePath = path.join(__dirname, `${title}.xlsx`);
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

// ==================== BOT MENU ====================
async function sendMainMenu(chatId, editMsgId) {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0, 10)));
  const regions = [...new Set(allData.map(a => a.region))];

  const msg = `
📊 <b>Buxoro Maktabi — Statistika</b>

👥 <b>Jami arizalar:</b> ${allData.length}
📅 <b>Bugun:</b> ${todayData.length} ta
📍 <b>Hududlar:</b> ${regions.map(r => `\n  • ${r}: ${allData.filter(a => a.region === r).length} ta`).join("") || " yo'q"}
🕐 <b>So'nggi yangilanish:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔄 Yangilash", callback_data: "refresh" },
        { text: "📥 Excel", callback_data: "get_excel" },
      ],
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
    if (msg.text === "/start" || msg.text === "/menu") await sendMainMenu(msg.chat.id);
    if (msg.text === "/stats") {
      const allData = loadData();
      await tg("sendMessage", { chat_id: msg.chat.id, text: `📊 Jami arizalar: ${allData.length} ta`, parse_mode: "HTML" });
    }
    if (msg.text === "/excel") {
      const allData = loadData();
      if (allData.length === 0) return await tg("sendMessage", { chat_id: msg.chat.id, text: "❌ Ma'lumot yo'q" });
      await tg("sendMessage", { chat_id: msg.chat.id, text: "⏳ Fayl tayyorlanmoqda..." });
      const filePath = await createExcel(allData, `barcha_arizalar_${new Date().toISOString().slice(0, 10)}`);
      await tgDoc(filePath, `📊 Barcha arizalar (${allData.length} ta)`);
      fs.unlinkSync(filePath);
    }
    return;
  }

  if (!cb) return;
  const chatId = cb.message.chat.id;
  const msgId = cb.message.message_id;
  const data = cb.data;

  if (data === "refresh") {
    await sendMainMenu(chatId, msgId);
  } else if (data === "get_excel") {
    const allData = loadData();
    if (allData.length === 0) {
      return await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "❌ Ma'lumot yo'q!", show_alert: true });
    }
    await tg("editMessageText", { chat_id: chatId, message_id: msgId, text: "⏳ Excel fayl tayyorlanmoqda...", parse_mode: "HTML" });
    const filePath = await createExcel(allData, `barcha_arizalar_${new Date().toISOString().slice(0, 10)}`);
    await tgDoc(filePath, `📊 Barcha arizalar (${allData.length} ta)`);
    fs.unlinkSync(filePath);
    await sendMainMenu(chatId, msgId);
  } else if (data === "today_report") {
    const allData = loadData();
    const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
    const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0, 10)));
    if (todayData.length === 0) {
      return await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "📅 Bugun ariza yo'q!", show_alert: true });
    }
    await tg("editMessageText", { chat_id: chatId, message_id: msgId, text: "⏳ Hisobot tayyorlanmoqda...", parse_mode: "HTML" });
    const filePath = await createExcel(todayData, `kunlik_${new Date().toISOString().slice(0, 10)}`);
    await tgDoc(filePath, `📅 Bugungi hisobot — ${todayData.length} ta ariza`);
    fs.unlinkSync(filePath);
    await sendMainMenu(chatId, msgId);
  } else if (data === "full_stats") {
    const allData = loadData();
    const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
    const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0, 10)));
    const regions = [...new Set(allData.map(a => a.region))];
    const msg = `
📊 <b>UMUMIY STATISTIKA</b>
━━━━━━━━━━━━━━━━
👥 <b>Jami:</b> ${allData.length} ta
📅 <b>Bugun:</b> ${todayData.length} ta
📆 <b>Kunlik o'rtacha:</b> ${allData.length > 0 ? Math.round(allData.length / Math.max(1, (Date.now() - new Date(allData[0]?.createdAt).getTime()) / 86400000)) : 0} ta
━━━━━━━━━━━━━━━━
📍 <b>Hududlar bo'yicha:</b>
${regions.map(r => `  • ${r}: ${allData.filter(a => a.region === r).length} ta`).join("\n") || "  Ma'lumot yo'q"}
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
  let offset = 0;
  console.log("🤖 Telegram polling ishga tushdi...");
  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=15`);
      const data = await res.json();
      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          await handleUpdate(update);
          offset = update.update_id + 1;
        }
      }
    } catch (err) {
      console.error("Polling xatosi:", err.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

(async () => {
  // Webhook ni o'rnatish
  const webhookUrl = `https://localhost:${PORT}/webhook`;
  const wh = await tg("setWebhook", { url: webhookUrl, drop_pending_updates: true });
  if (wh.ok) {
    console.log("✅ Webhook o'rnatildi");
  } else {
    console.log("⚠️ Webhook o'rnatilmadi, polling ishlatiladi");
    startPolling();
  }
})();

// ==================== API: ARIZA QABUL QILISH ====================
app.post("/api/applications", async (req, res) => {
  try {
    const data = req.body;
    const required = ["firstName","lastName","phone","childFirstName","childLastName","currentSchool","graduatedClass","applyingClass","region"];
    for (const field of required) {
      if (!data[field] || data[field].trim().length < (field === "phone" ? 12 : 1)) {
        return res.status(400).json({ error: `${field} noto'g'ri` });
      }
    }

    const application = {
      id: Date.now(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      childFirstName: data.childFirstName.trim(),
      childLastName: data.childLastName.trim(),
      currentSchool: data.currentSchool.trim(),
      graduatedClass: data.graduatedClass,
      applyingClass: data.applyingClass,
      region: data.region,
      createdAt: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
    };

    const allData = loadData();
    allData.push(application);
    saveData(allData);

    const msg = `
📩 <b>Yangi ariza #${allData.length}</b>

👤 <b>Ota-ona:</b> ${application.firstName} ${application.lastName}
📞 <b>Telefon:</b> ${application.phone}
👶 <b>Bola:</b> ${application.childFirstName} ${application.childLastName}
🏫 <b>Hozirgi maktab:</b> ${application.currentSchool}
📚 <b>Tugatgan sinf:</b> ${application.graduatedClass}-sinf
🎯 <b>Qabul sinfi:</b> ${application.applyingClass}-sinf
📍 <b>Hudud:</b> ${application.region}
🕐 <b>Vaqt:</b> ${application.createdAt}
    `.trim();

    await tg("sendMessage", { chat_id: CHAT_ID, text: msg, parse_mode: "HTML" });
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
    if (allData.length === 0) return res.status(404).json({ error: "Ma'lumot yo'q" });
    const filePath = await createExcel(allData, `barcha_arizalar_${new Date().toISOString().slice(0, 10)}`);
    res.download(filePath, (err) => { if (!err) fs.unlinkSync(filePath); });
  } catch (err) {
    res.status(500).json({ error: "Excel xatosi" });
  }
});

app.get("/api/applications/today", (req, res) => {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  res.json({ count: allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0, 10))).length });
});

app.get("/api/applications/stats", (req, res) => {
  const allData = loadData();
  res.json({
    total: allData.length,
    today: allData.filter(a => a.createdAt && a.createdAt.startsWith(new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" }).slice(0, 10))).length,
  });
});

// ==================== AUTO-HISOBOT (soat 21:00) ====================
let lastReportDate = "";
cron.schedule("0 21 * * *", async () => {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0, 10)));

  if (todayData.length === 0 && lastReportDate === today) {
    return console.log("⏭ Yangi ariza yo'q, hisobot tashlanmadi");
  }

  if (todayData.length === 0) {
    await tg("sendMessage", { chat_id: CHAT_ID, text: `📊 <b>Kunlik hisobot</b>\n\nBugun hech qanday ariza kelmadi.`, parse_mode: "HTML" });
    lastReportDate = today;
    return;
  }

  const filePath = await createExcel(todayData, `kunlik_${new Date().toISOString().slice(0, 10)}`);
  await tgDoc(filePath, `📊 <b>Kunlik hisobot</b>\n\nBugun ${todayData.length} ta ariza keldi.`);
  fs.unlinkSync(filePath);
  lastReportDate = today;
  console.log(`✅ Kunlik hisobot yuborildi: ${todayData.length} ta ariza`);
});

// ==================== SERVERNI ISHGA TUSHIRISH ====================
app.listen(PORT, () => {
  console.log(`\n✅ Buxoro Maktabi Server ishga tushdi`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📩 POST /api/applications — ariza qabul qilish`);
  console.log(`📊 GET  /api/applications/excel — Excel yuklab olish`);
  console.log(`📋 GET  /api/applications/stats — statistika`);
  console.log(`📅 GET  /api/applications/today — bugungi arizalar`);
  console.log(`🤖 Bot: @BuxoroMaktabi_EDU777_bot`);
  console.log(`⏰ Kunlik hisobot: soat 21:00`);
});

// ==================== XATOLIKLARNI USHLASH ====================
process.on("uncaughtException", (err) => {
  console.error("Critical error:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
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
