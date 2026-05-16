const fs = require('fs');
let c = fs.readFileSync('index.js', 'utf8');

c = c.replace(
  /`barcha_arizalar_\${new Date\(\)\.toISOString\(\)\.slice\(0, 10\)}`/g,
  '"barcha_arizalar_" + new Date().toISOString().slice(0, 10)'
);

c = c.replace(
  /`kunlik_\${new Date\(\)\.toISOString\(\)\.slice\(0, 10\)}`/g,
  '"kunlik_" + new Date().toISOString().slice(0, 10)'
);

c = c.replace(
  /`📊 Barcha arizalar \(\${allData\.length} ta\)`/g,
  '"📊 Barcha arizalar (" + allData.length + " ta)"'
);

c = c.replace(
  /`📅 Bugungi hisobot — \${todayData\.length} ta ariza`/g,
  '"📅 Bugungi hisobot — " + todayData.length + " ta ariza"'
);

fs.writeFileSync('index.js', c);
console.log('Done - fixed template literals');
