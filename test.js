const Riichi = require("./index")
const option = {}
option.sanma = false
option.honba = 0
const riichi = new Riichi("234m55567s789p111z", option)
riichi.agari = '2m'
riichi.isTsumo = true
riichi.bakaze = 1
riichi.jikaze = 2
//riichi.enableLocalYaku("大車輪");
//riichi.enableLocalYaku("大竹林");
//riichi.enableLocalYaku("大数隣");
console.log(JSON.stringify(riichi.calc(), null, 2))
