const fs = require("fs");
let c = fs.readFileSync("index.js", "utf8");
let count = 0;

// Replace all backtick template literals with string concatenation
// Pattern: `some text ${expression} more text`

const replacements = [
  {
    from: /`barcha_arizalar_\${new Date\(\)\.toISOString\(\)\.slice\(0, 10\)}`/g,
    to: '"barcha_arizalar_" + new Date().toISOString().slice(0, 10)',
  },
  {
    from: /`kunlik_\${new Date\(\)\.toISOString\(\)\.slice\(0, 10\)}`/g,
    to: '"kunlik_" + new Date().toISOString().slice(0, 10)',
  },
  {
    from: /`Barcha arizalar \(\${allData\.length} ta\)`/g,
    to: '"Barcha arizalar (" + allData.length + " ta)"',
  },
  {
    from: /`Bugungi hisobot \u2014 \${todayData\.length} ta ariza`/g,
    to: '"Bugungi hisobot \u2014 " + todayData.length + " ta ariza"',
  },
];

for (const r of replacements) {
  const newC = c.replace(r.from, r.to);
  if (newC !== c) count++;
  c = newC;
}

// Remove the emoji prefix from the replacement strings since regex doesn't match emoji well
c = c.replace(/`📊 Barcha arizalar \(\$\{allData\.length\} ta\)`/g, '"📊 Barcha arizalar (" + allData.length + " ta)"');
c = c.replace(/`📅 Bugungi hisobot — \$\{todayData\.length\} ta ariza`/g, '"📅 Bugungi hisobot — " + todayData.length + " ta ariza"');

fs.writeFileSync("index.js", c);
console.log("Fixed " + count + " template literals");
