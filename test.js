const Riichi = require("./index");
const option = {};
option.sanma = true;
option.tsumozon = false;
const riichi = new Riichi("234567m4567s1111z+d2z+12", option);

riichi.enableLocalYaku("大車輪");
riichi.enableLocalYaku("大竹林");
riichi.enableLocalYaku("大数隣");
console.log(JSON.stringify(riichi.calc(), null, 2));
