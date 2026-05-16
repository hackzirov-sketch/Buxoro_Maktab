const { execSync } = require("child_process");
const fs = require("fs");

// Get the old version with conversation flow
const oldContent = execSync("git show c9d732f:server/index.js", { cwd: ".." }).toString();

// Find the conversation code section
const startMarker = "// ==================== BOT ORQALI ARIZA TOPSHIRISH ====================";
const endMarker = "// ==================== KEYBOARD (doimiy pastki tugmalar) ====================";

const startIdx = oldContent.indexOf(startMarker);
const endIdx = oldContent.indexOf(endMarker);
const conversationCode = oldContent.substring(startIdx, endIdx);

// Read current file
const currentContent = fs.readFileSync("index.js", "utf8");

// Insert conversation code before the KEYBOARD section
const keyboardIdx = currentContent.indexOf(endMarker);
const newContent = currentContent.substring(0, keyboardIdx) + conversationCode + currentContent.substring(keyboardIdx);

fs.writeFileSync("index.js", newContent);
console.log("Conversation code inserted successfully");
