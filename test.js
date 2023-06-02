const Riichi = require("./index")

const riichi = new Riichi("56m22s+555m345p2222s+7m")

//riichi.agari = '2m'
//riichi.isTsumo = true
//riichi.bakaze = 1
//riichi.jikaze = 2

//riichi.enableLocalYaku("大車輪");
//riichi.enableLocalYaku("大竹林");
//riichi.enableLocalYaku("大数隣");
console.log(riichi.calc())
