var fs = require("fs");
var data = require("./data.json");

/* Exibição 1 */
console.log(data.name);

/* Exibição 2 */
fs.readFile("./data.json", "utf-8", (err, data) => {
  var data = JSON.parse(data);
  console.log(data.name);
});
