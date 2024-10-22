const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userData = {
  temperature: temperature,
  condition: condition,
}; //sta ovdje trebam dalje

fs.writeFile(
  "weatherDataJson.json",
  JSON.stringify(userData, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Data saved to weatherDataJson.json");
    rl.close();
  }
);
