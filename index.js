const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "100data.csv");
let data;
const threshold = 1000;
try {
  data = fs.readFileSync(filePath, "utf8");
  //console.log(data);
} catch (error) {
  console.error("Error reading the CSV file:", error);
}
const rows = data.trim().split("\n");
//console.log(rows);
const productData = rows.slice(1).map(solve1);
function solve1(row) {
  const values = row.split(",");
  return {
    name: values[0].trim(),
    category: values[1].trim(),
    price: Number(values[2]),
    sales: Number(values[3]),
  };
}
//console.log(productData);
const filteredData = productData.filter(solve2);
console.log(filteredData);
//console.log(filteredData);

function solve2(item) {
  return item.price >= threshold;
}

const groupedData = {};
for (const item of filteredData) {
  if (!groupedData[item.category]) {
    groupedData[item.category] = [];
  }
  groupedData[item.category].push(item);
}

//console.log(groupedData);
const totalsalesByCategory = {};
for (const category in groupedData) 
{
  let totalSales = 0;
  for (const item of groupedData[category]) {
    totalSales += item.sales;
  }
  totalsalesByCategory[category] = totalSales; // store total
}
console.log(totalsalesByCategory);
