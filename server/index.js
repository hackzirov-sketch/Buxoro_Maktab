const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const ExcelJS = require("exceljs");

const app = express();
const BOT_TOKEN = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";
const CHAT_ID = process.env.CHAT_ID || "YOUR_CHAT_ID_HERE";
const DATA_FILE = path.join(__dirname, "applications.json");

app.use(cors());
app.use(express.json());

// -------------------- MA'LUMOTLARNI SAQLASH --------------------
function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
  catch { return []; }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// -------------------- TELEGRAMGA HABAR YUBORISH --------------------
async function sendTelegram(message) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Telegram xatosi:", err.message);
  }
}

async function sendTelegramExcel(filePath, caption) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
    const FormData = (await import("form-data")).default;
    const form = new FormData();
    form.append("chat_id", CHAT_ID);
    form.append("document", fs.createReadStream(filePath));
    form.append("caption", caption);
    await fetch(url, { method: "POST", body: form });
  } catch (err) {
    console.error("Telegram fayl xatosi:", err.message);
  }
}

// -------------------- EXCEL YARATISH --------------------
async function createExcel(data, title) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Arizalar");

  sheet.columns = [
    { header: "#", key: "id", width: 5 },
    { header: "Sana", key: "date", width: 20 },
    { header: "Ism", key: "firstName", width: 15 },
    { header: "Familiya", key: "lastName", width: 15 },
    { header: "Telefon", key: "phone", width: 18 },
    { header: "Bola ismi", key: "childFirstName", width: 15 },
    { header: "Bola familiyasi", key: "childLastName", width: 15 },
    { header: "Hozirgi maktab", key: "currentSchool", width: 20 },
    { header: "Tugatgan sinf", key: "graduatedClass", width: 15 },
    { header: "Qabul sinfi", key: "applyingClass", width: 15 },
    { header: "Hudud", key: "region", width: 15 },
  ];

  data.forEach((row, i) => {
    sheet.addRow({
      id: i + 1, date: row.createdAt,
      firstName: row.firstName, lastName: row.lastName,
      phone: row.phone,
      childFirstName: row.childFirstName, childLastName: row.childLastName,
      currentSchool: row.currentSchool,
      graduatedClass: row.graduatedClass, applyingClass: row.applyingClass,
      region: row.region,
    });
  });

  sheet.getRow(1).font = { bold: true };
  const filePath = path.join(__dirname, `${title}.xlsx`);
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

// -------------------- API: ARIZA QABUL QILISH --------------------
app.post("/api/applications", async (req, res) => {
  try {
    const data = req.body;

    // Validatsiya
    const required = ["firstName","lastName","phone","childFirstName","childLastName","currentSchool","graduatedClass","applyingClass","region"];
    for (const field of required) {
      if (!data[field] || data[field].trim().length < (field === "phone" ? 12 : 1)) {
        return res.status(400).json({ error: `${field} maydoni noto'g'ri` });
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

    // Telegramga yuborish
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

    await sendTelegram(msg);

    res.json({ success: true, id: application.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// -------------------- API: EXCEL YUKLAB OLISH --------------------
app.get("/api/applications/excel", async (req, res) => {
  try {
    const allData = loadData();
    if (allData.length === 0) return res.status(404).json({ error: "Ma'lumot yo'q" });

    const filePath = await createExcel(allData, `barcha_arizalar_${new Date().toISOString().slice(0,10)}`);
    res.download(filePath, (err) => {
      if (!err) fs.unlinkSync(filePath);
    });
  } catch (err) {
    res.status(500).json({ error: "Excel yaratishda xatolik" });
  }
});

// -------------------- API: BUGUNGI ARIZALAR --------------------
app.get("/api/applications/today", (req, res) => {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0,10)));
  res.json({ count: todayData.length, data: todayData });
});

// -------------------- API: STATISTIKA --------------------
app.get("/api/applications/stats", (req, res) => {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const todayCount = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0,10))).length;

  res.json({
    total: allData.length,
    today: todayCount,
    regions: [...new Set(allData.map(a => a.region))].map(r => ({
      name: r, count: allData.filter(a => a.region === r).length
    })),
  });
});

// -------------------- KUNLIK AVTOMAT HISOBOT (soat 21:00) --------------------
cron.schedule("0 21 * * *", async () => {
  const allData = loadData();
  const today = new Date().toLocaleDateString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const todayData = allData.filter(a => a.createdAt && a.createdAt.startsWith(today.slice(0,10)));

  if (todayData.length === 0) {
    await sendTelegram(`📊 <b>Kunlik hisobot</b>\n\nBugun hech qanday ariza kelmadi.`);
    return;
  }

  // Excel yaratib yuborish
  const filePath = await createExcel(todayData, `kunlik_${new Date().toISOString().slice(0,10)}`);
  await sendTelegramExcel(filePath, `📊 <b>Kunlik hisobot</b>\n\nBugun ${todayData.length} ta ariza keldi.`);
  fs.unlinkSync(filePath);
});

// -------------------- SERVERNI ISHGA TUSHIRISH --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`📩 Arizalar: POST /api/applications`);
  console.log(`📊 Excel: GET /api/applications/excel`);
  console.log(`📋 Statistika: GET /api/applications/stats`);
  console.log(`⏰ Kunlik hisobot: har kuni soat 21:00`);
});
