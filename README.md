# **Riichi**

麻雀飜符手役点数計算  
Riichi mahjong hand calculation. Originally by [takayama-lily](https://github.com/takayama-lily/riichi).

This fork is mainly for loose translations and personal convention, based on another fork by [HinanoAira](https://github.com/HinanoAira/riichi/) for sanma support.

**Install original with npm:**

```
$ npm i riichi
```
**This will install [the original repo](https://github.com/takayama-lily/riichi) that's on node, not this one.**

---
## Usage

```js
const Riichi = require("riichi");
const riichi = new Riichi("234m234678s234p44z");
console.log(riichi.calc());
```
### Output:
```js
{
	isAgari: true,
	yakuman: 0,
	yaku: {
		sanshokuDoujun: {
			han: 2,
			isFuroMinus: true,
			en: 'Mixed Triple Sequence',
			jp: '三色同順',
			ro: 'Sanshoku Doujun'
		},
		menzenTsumo: {
			han: 1,
			isMenzenOnly: true,
			en: 'Self Draw',
			jp: 'ツモ',
			ro: 'Tsumo'
		}
	},
	han: 3,
	fu: 30,
	honba: 0,
	ten: 4000,
	name: '',
	text: '4000 Points (2000,1000)',
	round: 'E',
	seat: 'S',
	winType: 'Tsumo',
	oya: [ 2000, 2000, 2000 ],
	ko: [ 2000, 1000, 1000 ],
	error: false
}
```
---
### Suits
| ID | Suit |
| - | - |
| m | Manzu (萬子) |
| p | Pinzu (筒子) |
| s | Souzu (索子) |
| z | Honor (風牌) |

### Honor Tiles

| ID | Tile |
| - | - |
| 1z | East (東) |
| 2z | South (南) |
| 3z | West (西) |
| 4z | North (北) |
| 5z | White Dragon (白) |
| 6z | Green Dragon (發) |
| 7z | Red Dragon (中) |

---

## Ron & Tsumo

You can specify if the hand was won with a ron or tsumo by using specific flags in the riichi string or by setting the riichi object's attributes.

### Using [string flags](#string-flags):
```js
new Riichi("34m234678s234p44z+2m"); //ron with the 2 man
new Riichi("34m234678s234p44z2m"); //tsumo with the 2 man
```
### Using [attributes](#attributes):
```js
// ron with the 2 man
const riichi = new Riichi("234m234678s234p44z");
riichi.isTsumo = false
riichi.agari = "2m"

// tsumo with the 2 man
const riichi = new Riichi("234m234678s234p44z");
riichi.isTsumo = true
riichi.agari = "2m"
```
---
## String Flags

```js
new Riichi("1s+1s+123m55z666z7777z+d12s+trihk22"); // append modifier flags at the end. refer to table below
```

| Option | Definition |
| - | - |
| t | Tenhou / Chiihou / Renhou |
| r, l | Riichi |
| i, y | Ippatsu |
| w | Double Riichi |
| h | Haitei / Hotei |
| k | Chankan / Rinshan |
| o | Use local yaku |
| ## | Represent prevalent wind and seat wind. Defaults to `12`. Example: `24` (South round, North seat) |

### Calls

```js
// closed tiles: 56m, 22s
// called tiles: 5m pon, 345p chii, 2s kan
// winning with the 7m
new Riichi("56m22s+555m345p2222s+7m");
```

### Dora & Aka Dora

```js
new Riichi("112233456789m1s1s+d12s"); //Dora: 1s 2s
new Riichi("112233406789m1s1s"); //Aka Dora: 0m
```
### Seats
```js
new Riichi("112233456789m1s1s+1"); //East Seat
new Riichi("112233456789m1s1s+21"); //South round, East seat
new Riichi("112233456789m1s1s+43"); //North round, West seat ???
// prevalant wind and seat wind defaults to East and South respectively.
```
---
## Attributes
| Attribute | Definition |
| --- | --- |
| riichi.furo `array` | Called tiles. Example: `[["1m", "1m", "1m"], ["2m", "2m"], ["3m", "4m", "5m"], ["6m", "6m", "6m", "6m"]]` |
| riichi.agari `string` | The winning tile. Example: `"2s"` |
| riichi.dora `array` | Dora tiles. Example: `["4z", "7p"]`|
| riichi.honba `int` | Honba amount. |
| riichi.extra `string` | Modifier flags to appended to the riichi string. Example: `"ri13"`|
| riichi.isTsumo `bool` | If the win was a Tsumo or Ron. Defaults to `true`. |
| riichi.isOya `bool` | If the win was in the dealer seat. Defaults to `false`. |
| riichi.bakaze `int` | The prevalent wind. |
| riichi.jikaze `int` | The seat wind. |
| riichi.aka `int` | The amount of red fives in the hand. |
| riichi.allLocalEnabled `bool` | Enable local yaku. Defaults to `false`. |
| riichi.localEnabled `array` | Enable specific local yaku. Example: `["Renhou"]` |
| riichi.disabled `array` | Disables specific yaku. Example: `["Chankan", "Tanyao"]` |
| riichi.allowWyakuman `bool` | Allows double yakuman. Defaults to `true`. |
| riichi.allowKuitan `bool` | Allows open tanyao. Defaults to `true`. |
| riichi.allowAka `bool` | Allows red fives to be calculated. Defaults to `true`. |
| riichi.hairi `bool` | Returns shanten calculations if the hand provided is not in tenpai. Defaults to `true`. |
| riichi.sanma `bool` | Calculate hand for sanma. Defaults to `false`. |
| riichi.tsumozon `bool` | Consider tsumo loss for sanma calculations. Defaults to `true`. Used in conjunction with `riichi.sanma`. |


## Modifier Functions
Alternatively, some attributes have functional counterparts that can be called from the riichi object.
| Function | Equivalant |
| --- | --- |
| riichi.disableWyakuman() | `riichi.allowWyakuman = false` |
| riichi.disableKuitan() | `riichi.allowKuitan = false` |
| riichi.disableAka() | `riichi.allowAka = false` |
| riichi.enabledLocalYaku(`string`) | `riichi.localEnabled = [<string>]` |
| riichi.disableYaku(`string`) | `riichi.disabled = [<string>]` |
---
## Supported Local Yaku
| Name | Value |
| --- | --- |
| Daichisei | Yakuman |
| Renhou | Yakuman |


<!-- 
# 向聴数牌理計算 [lib](https://github.com/takayama-lily/syanten)

```js
console.log(new Riichi("111222333m11p123z").calc());
```

**Output**

```js
{
  ...
  hairi: {
    now: 1, //現在向聴数
    '1m': {},
    '2m': {},
    '3m': {},
    '1p': {},
    '1z': { '1p': 2, '2z': 3, '3z': 3 }, //打1z 待1p二枚 2z三枚 3z三枚
    '2z': { '1p': 2, '1z': 3, '3z': 3 }, //打2z 待1p二枚 1z三枚 3z三枚
    '3z': { '1p': 2, '1z': 3, '2z': 3 }  //打3z 待1p二枚 1z三枚 2z三枚
  }
}
```
 -->