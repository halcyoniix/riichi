/*
 * Copyright (C) https://github.com/takayama-lily/riichi
 */
'use strict';
const assert = require('assert');
const agari = require('./agari');
const MPSZ = ['m', 'p', 's', 'z'];
const checkAllowed = (o, allowed) => {
	for (let v of o.hai)
		if (!allowed.includes(v)) return false;
	for (let v of o.furo)
		for (let vv of v)
			if (!allowed.includes(vv)) return false;
	return true;
};
const checkChanta = (o, allow) => {
	let hasJyuntsu = false;
	for (let v of o.currentPattern) {
		if (typeof v === 'string') {
			if (!allow.includes(v)) return false;
		} else if (v.length <= 2 || v[0] === v[1]) {
			if (!allow.includes(v[0])) return false;
		} else {
			hasJyuntsu = true;
			let add = parseInt(v[0]) + parseInt(v[1]) + parseInt(v[2]);
			if (add > 6 && add < 24) return false;
		}
	}
	return hasJyuntsu;
};
const checkYakuhai = (o, pos) => {
	for (let v of o.currentPattern) {
		if (typeof v !== 'string' && v[0] === pos + 'z') return true;
	}
	return false;
};
const YAKU = {
	'junseiKokushiMusou': {
		'yakuman': 2,
		'isMenzenOnly': true,
		'en': 'Thirteen Orphans (13-Sided Wait)',
		'jp': '国士無双１３面待ち',
		'ro': 'Junsei Kokushi Musou',
		'check': (o) => {
			return agari.check13(o.haiArray) && o.hai.reduce((total, v) => {
				return v === o.agari ? ++total : total
			}, 0) === 2
		}
	},
	'kokushiMusou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'en': 'Thirteen Orphans',
		'jp': '国士無双',
		'ro': 'Kokushi Musou',
		'check': (o) => {
			return agari.check13(o.haiArray) && o.hai.reduce((total, v) => {
				return v === o.agari ? ++total : total
			}, 0) === 1
		}
	},
	'junseiChuurenPoutou': {
		'yakuman': 2,
		'isMenzenOnly': true,
		'en': 'Pure Nine Gates',
		'jp': '純正九蓮宝燈',
		'ro': 'Junsei Chuuren Poutou',
		'check': (o) => {
			let i = MPSZ.indexOf(o.agari[1])
			let arr = o.haiArray[i].concat()
			if (arr[0] < 3 || arr[8] < 3 || arr.includes(0))
				return false
			return [2, 4].includes(arr[parseInt(o.agari) - 1])
		}
	},
	'chuurenPoutou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'en': 'Nine Gates',
		'jp': '九連宝燈',
		'ro': 'Chuuren Poutou',
		'check': (o) => {
			let i = MPSZ.indexOf(o.agari[1])
			let arr = o.haiArray[i].concat()
			if (arr[0] < 3 || arr[8] < 3 || arr.includes(0))
				return false
			return [1, 3].includes(arr[parseInt(o.agari) - 1])
		}
	},
	'suuankouTanki': {
		'yakuman': 2,
		'isMenzenOnly': true,
		'en': 'Four Concealed Triplets (Pair Wait)',
		'jp': '四暗刻単騎',
		'ro': 'Suuankou Tanki',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'string' && v !== o.agari)
					return false
				if (typeof v !== 'string' && v.length <= 2)
					res++
			}
			return res === 4
		}
	},
	'suuankou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'en': 'Four Concealed Triplets',
		'jp': '四暗刻',
		'ro': 'Suuankou',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'string' && v === o.agari)
					return false
				if (typeof v !== 'string' && v.length <= 2)
					res++
			}
			return res === 4
		}
	},
	'daisuushii': {
		'yakuman': 2,
		'en': 'Big Four Winds',
		'jp': '大四喜',
		'ro': 'Daisuushii',
		'check': (o) => {
			let need = ['1z', '2z', '3z', '4z']
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'object' && need.includes(v[0]))
					res++
			}
			return res === 4
		}
	},
	'shousuushii': {
		'yakuman': 1,
		'en': 'Little Four Winds',
		'jp': '小四喜',
		'ro': 'Shousuushii',
		'check': (o) => {
			let need = ['1z', '2z', '3z', '4z']
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'string' && !need.includes(v))
					return false
				if (typeof v === 'object' && need.includes(v[0]))
					res++
			}
			return res === 3
		}
	},
	'daisangen': {
		'en': 'Big Three Dragons',
		'jp': '大三元',
		'yakuman': 1,
		'ro': 'Daisangen',
		'check': (o) => {
			let need = ['5z', '6z', '7z']
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'object' && need.includes(v[0]))
					res++
			}
			return res === 3
		}
	},
	'tsuuiisou': {
		'yakuman': 1,
		'en': 'All Honors',
		'jp': '字一色',
		'ro': 'Tsuuiisou',
		'check': (o) => {
			let allow = ['1z', '2z', '3z', '4z', '5z', '6z', '7z']
			return checkAllowed(o, allow)
		}
	},
	'ryuuiisou': {
		'yakuman': 1,
		'en': 'All Green',
		'jp': '緑一色',
		'ro': 'Ryuuiisou',
		'check': (o) => {
			let allow = ['2s', '3s', '4s', '6s', '8s', '6z']
			return checkAllowed(o, allow)
		}
	},
	'chinroutou': {
		'yakuman': 1,
		'en': 'All Terminals',
		'jp': '清老頭',
		'ro': 'Chinroutou',
		'check': (o) => {
			let allow = ['1m', '9m', '1p', '9p', '1s', '9s']
			return checkAllowed(o, allow)
		}
	},
	'suukantsu': {
		'yakuman': 1,
		'en': 'Four Quads',
		'jp': '四槓子',
		'ro': 'Suukantsu',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern)
				if (typeof v !== 'string' && (v.length === 2 || v.length === 4))
					res++
			return res === 4
		}
	},
	'tenhou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'en': 'Blessing of Heaven',
		'jp': '天和',
		'ro': 'Tenhou',
		'check': (o) => {
			return o.extra.includes('t') && o.isTsumo && o.isOya && !o.furo.length
		}
	},
	'chiihou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'en': 'Blessing of Earth',
		'jp': '地和',
		'ro': 'Chiihou',
		'check': (o) => {
			return o.extra.includes('t') && o.isTsumo && !o.isOya && !o.furo.length
		}
	},
	'renhou': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'isLocal': true,
		'en': 'Hand of Man',
		'jp': '人和',
		'ro': 'Renhou',
		'check': (o) => {
			return o.extra.includes('t') && !o.isTsumo && !o.isOya && !o.furo.length
		}
	},
	'daichisei': {
		'yakuman': 1,
		'isMenzenOnly': true,
		'isLocal': true,
		'en': 'Big Seven Stars',
		'jp': '大七星',
		'ro': 'Daichisei',
		'check': (o) => {
			let allow = ['1z', '2z', '3z', '4z', '5z', '6z', '7z']
			return checkAllowed(o, allow) && YAKU['chiitoi'].check(o)
		}
	},
	'chinitsu': {
		'han': 6,
		'isFuroMinus': true,
		'en': 'Full Flush',
		'jp': '清一色',
		'ro': 'Chinitsu',
		'check': (o) => {
			let must = o.agari[1]
			let allow = []
			for (let i = 1; i <= 9; i++)
				allow.push(i + must)
			return checkAllowed(o, allow)
		}
	},
	'honitsu': {
		'han': 3,
		'isFuroMinus': true,
		'en': 'Half Flush',
		'jp': '混一色',
		'ro': 'Honitsu',
		'check': (o) => {
			let allow = ['1z', '2z', '3z', '4z', '5z', '6z', '7z']
			let d = ''
			for (let v of o.hai) {
				if (['m', 'p', 's'].includes(v[1])) {
					d = v[1]
					break
				}
			}
			if (!d) {
				for (let v of o.furo) {
					for (let vv of v) {
						if (['m', 'p', 's'].includes(vv[1])) {
							d = vv[1]
							break
						}
					}
				}
			}
			if (!d)
				return false
			for (let i = 1; i <= 9; i++)
				allow.push(i + d)
			return checkAllowed(o, allow) && !YAKU['chinitsu'].check(o)
		}
	},
	'ryanpeikou': {
		'han': 3,
		'isMenzenOnly': true,
		'en': 'Twice Pure Double Sequence',
		'jp': '二盃口',
		'ro': 'Ryanpeikou',
		'check': (o) => {
			let arr = []
			for (let v of o.currentPattern) {
				if (typeof v === 'string')
					continue
				if (v.length !== 3 || v[0] === v[1])
					return false
				arr.push(v[0])
			}
			return arr[0] + arr[2] === arr[1] + arr[3]
		}
	},
	'junchan': {
		'han': 3,
		'isFuroMinus': true,
		'en': 'Fully Outside Hand',
		'jp': '純全帯么九',
		'ro': 'Junchan',
		'check': (o) => {
			let allow = ['1m', '9m', '1p', '9p', '1s', '9s']
			return checkChanta(o, allow)
		}
	},
	'chanta': {
		'han': 2,
		'isFuroMinus': true,
		'en': 'Half Outside Hand',
		'jp': '全帯',
		'ro': 'Chanta',
		'check': (o) => {
			let allow = ['1m', '9m', '1p', '9p', '1s', '9s', '1z', '2z', '3z', '4z', '5z', '6z', '7z']
			return checkChanta(o, allow) && !YAKU['junchan'].check(o)
		}
	},
	'toitoi': {
		'han': 2,
		'en': 'All Triplets',
		'jp': '対々和',
		'ro': 'Toitoi',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern)
				if (v.length === 1 || v[0] === v[1])
					res++
			return res === 4
		}
	},
	'honroutou': {
		'han': 2,
		'en': 'All Terminals and Honors',
		'jp': '混老頭',
		'ro': 'Honroutou',
		'check': (o) => {
			let allow = ['1m', '9m', '1p', '9p', '1s', '9s', '1z', '2z', '3z', '4z', '5z', '6z', '7z']
			return checkAllowed(o, allow)
		}
	},
	'sankantsu': {
		'han': 2,
		'en': 'Three Quads',
		'jp': '三槓子',
		'ro': 'Sankantsu',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern)
				if (typeof v !== 'string' && (v.length === 2 || v.length === 4))
					res++
			return res === 3
		}
	},
	'shousangen': {
		'han': 2,
		'en': 'Little Three Dragons',
		'jp': '小三元',
		'ro': 'Shousangen',
		'check': (o) => {
			let need = ['5z', '6z', '7z']
			let res = 0
			for (let v of o.currentPattern) {
				if (typeof v === 'string' && !need.includes(v))
					return false
				if (typeof v === 'object' && need.includes(v[0]))
					res++
			}
			return res === 2
		}
	},
	'sanshokuDoukou': {
		'han': 2,
		'en': 'Triple Triplets',
		'jp': '三色同刻',
		'ro': 'Sanshoku Doukou',
		'check': (o) => {
			let res = [0, 0, 0, 0, 0, 0, 0, 0, 0]
			for (let v of o.currentPattern) {
				if ((v.length === 1 || v[0] === v[1]) && !v[0].includes('z'))
					res[parseInt(v[0]) - 1]++
				else
					continue
			}
			return res.includes(3)
		}
	},
	'sanankou': {
		'han': 2,
		'en': 'Three Concealed Triplets',
		'jp': '三暗刻',
		'ro': 'Sanankou',
		'check': (o) => {
			let res = 0
			for (let v of o.currentPattern)
				if (typeof v !== 'string' && v.length <= 2)
					res++
			return res === 3
		}
	},
	'chiitoi': {
		'han': 2,
		'en': 'Seven Pairs',
		'jp': '七対子',
		'ro': 'Chiitoi',
		'isMenzenOnly': true,
		'check': (o) => {
			return agari.check7(o.haiArray) && !YAKU['ryanpeikou'].check(o)
		}
	},
	'doubleRiichi': {
		'han': 2,
		'isMenzenOnly': true,
		'en': 'Double Riichi',
		'jp': '両立直',
		'ro': 'Daburu Riichi',
		'check': (o) => {
			return o.extra.includes('w') && !o.furo.length
		}
	},
	'ittsu': {
		'han': 2,
		'isFuroMinus': true,
		'en': 'Pure Straight',
		'jp': '一通',
		'ro': 'Ittsu',
		'check': (o) => {
			let res = [0, 0, 0, 0, 0, 0, 0, 0, 0]
			for (let v of o.currentPattern) {
				if (v.length <= 2 || v[0] === v[1])
					continue
				if ([1, 4, 7].includes(parseInt(v[0]))) {
					let i = MPSZ.indexOf(v[0][1]) * 3 + (parseInt(v[0]) - 1) / 3
					res[i]++
				}
			}
			return (res[0] && res[1] && res[2]) || (res[3] && res[4] && res[5]) || (res[6] && res[7] && res[8])
		}
	},
	'sanshokuDoujun': {
		'han': 2,
		'isFuroMinus': true,
		'en': 'Mixed Triple Sequence',
		'jp': '三色同順',
		'ro': 'Sanshoku Doujun',
		'check': (o) => {
			let res = [];
			for (let v of o.currentPattern) {
				if (v.length <= 2 || v[0] === v[1] || v[0].includes('z')) continue;

				let value = parseInt(v[0]);
				res[value] = res[value] ? res[value] : new Set();
				res[value].add(v[0][1]);
			}
			return res.some((value) => value.size === 3);
		}
	},
	'tanyao': {
		'han': 1,
		'en': 'All Simples',
		'jp': '断么九',
		'ro': 'Tanyao',
		'check': (o) => {
			for (let v of o.furo)
				if (!o.allowKuitan && v.length !== 2)
					return false
			let allow = ['2m', '3m', '4m', '5m', '6m', '7m', '8m', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '2s', '3s', '4s', '5s', '6s', '7s', '8s']
			return checkAllowed(o, allow)
		}
	},
	'pinfu': {
		'han': 1,
		'isMenzenOnly': true,
		'en': 'All Sequences',
		'jp': '平和',
		'ro': 'Pinfu',
		'check': (o) => {
			let hasAgariFu = true
			for (let v of o.currentPattern) {
				if (typeof v === 'string') {
					if (v.includes('z') && [o.bakaze, o.jikaze, 5, 6, 7].includes(parseInt(v)))
						return false
				} else if (v.length !== 3 || v[0] === v[1]) {
					return false
				} else if ((v[0] === o.agari && parseInt(v[2]) !== 9) || (v[2] === o.agari && parseInt(v[0]) !== 1)) {
					hasAgariFu = false
				}
			}
			return !hasAgariFu
		}
	},
	'iipeikou': {
		'han': 1,
		'isMenzenOnly': true,
		'en': 'Pure Double Sequence',
		'jp': '一盃口',
		'ro': 'Iipeikou',
		'check': (o) => {
			if (YAKU['ryanpeikou'].check(o))
				return false
			for (let i in o.currentPattern) {
				i = parseInt(i)
				let v = o.currentPattern[i]
				if (v.length === 3 && v[0] != v[1]) {
					while (i < 4) {
						i++
						try {
							assert.deepStrictEqual(v, o.currentPattern[i])
							return true
						} catch (e) {}
					}
				}
			}
			return false
		}
	},
	'menzenTsumo': {
		'han': 1,
		'isMenzenOnly': true,
		'en': 'Self Draw',
		'jp': 'ツモ',
		'ro': 'Tsumo',
		'check': (o) => {
			return o.isTsumo
		}
	},
	'riichi': {
		'han': 1,
		'isMenzenOnly': true,
		'en': 'Riichi',
		'jp': '立直',
		'ro': 'Riichi',
		'check': (o) => {
			return (YAKU['ippatsu'].check(o) || (o.extra.includes('r') || o.extra.includes('l'))) && !YAKU['doubleRiichi'].check(o)
		}
	},
	'ippatsu': {
		'han': 1,
		'isMenzenOnly': true,
		'en': 'Ippatsu',
		'jp': '一発',
		'ro': 'Ippatsu',
		'check': (o) => {
			return o.extra.includes('i') || o.extra.includes('y')
		}
	},
	'rinshanKaihou': {
		'han': 1,
		'en': 'After a Kan',
		'jp': '嶺上開花',
		'ro': 'Rinshan Kaihou',
		'check': (o) => {
			let hasKantsu = false
			for (let v of o.furo) {
				if (v.length === 2 || v.length === 4) {
					hasKantsu = true
					break
				}
			}
			return hasKantsu && o.extra.includes('k') && !o.extra.includes('h') && o.isTsumo && !YAKU['ippatsu'].check(o)
		}
	},
	'chankan': {
		'han': 1,
		'en': 'Robbing a Kan',
		'jp': '搶槓',
		'ro': 'Chankan',
		'check': (o) => {
			return o.extra.includes('k') && !o.extra.includes('h') && !o.isTsumo
		}
	},
	'haiteiRaoyue': {
		'han': 1,
		'en': 'Under the Sea',
		'jp': '海底撈月',
		'ro': 'Haitei Raoyue',
		'check': (o) => {
			return o.extra.includes('h') && o.isTsumo
		}
	},
	'houteiRaoyui': {
		'han': 1,
		'en': 'Under the River',
		'jp': '河底撈魚',
		'ro': 'Houtei Raoyui',
		'check': (o) => {
			return o.extra.includes('h') && !o.isTsumo && !YAKU['ippatsu'].check(o)
		}
	},
	'prevalentEast': {
		'han': 1,
		'en': 'Prevalent Wind',
		'jp': '場風 東',
		'ro': 'Bakaze Ton',
		'check': (o) => {
			return o.bakaze === 1 && checkYakuhai(o, 1)
		}
	},
	'prevalentSouth': {
		'han': 1,
		'en': 'Prevalent Wind',
		'jp': '場風 南',
		'ro': 'Bakaze Nan',
		'check': (o) => {
			return o.bakaze === 2 && checkYakuhai(o, 2)
		}
	},
	'prevalentWest': {
		'han': 1,
		'en': 'Prevalent Wind',
		'jp': '場風 西',
		'ro': 'Bakaze Shaa',
		'check': (o) => {
			return o.bakaze === 3 && checkYakuhai(o, 3)
		}
	},
	'prevalentNorth': {
		'han': 1,
		'en': 'Prevalent Wind',
		'jp': '場風 北',
		'ro': 'Bakaze Pei',
		'check': (o) => {
			return o.bakaze === 4 && checkYakuhai(o, 4)
		}
	},
	'seatEast': {
		'han': 1,
		'en': 'Seat Wind',
		'jp': '自風 東',
		'ro': 'Jikaze Ton',
		'check': (o) => {
			return o.jikaze === 1 && checkYakuhai(o, 1)
		}
	},
	'seatSouth': {
		'han': 1,
		'en': 'Seat Wind',
		'jp': '自風 南',
		'ro': 'Jikaze Nan',
		'check': (o) => {
			return o.jikaze === 2 && checkYakuhai(o, 2)
		}
	},
	'seatWest': {
		'han': 1,
		'en': 'Seat Wind',
		'jp': '自風 西',
		'ro': 'Jikaze Shaa',
		'check': (o) => {
			return o.jikaze === 3 && checkYakuhai(o, 3)
		}
	},
	'seatNorth': {
		'han': 1,
		'en': 'Seat Wind',
		'jp': '自風 北',
		'ro': 'Jikaze Pei',
		'check': (o) => {
			return o.jikaze === 4 && checkYakuhai(o, 4)
		}
	},
	'whiteDragon': {
		'han': 1,
		'en': 'White Dragon',
		'jp': '役牌 白',
		'ro': 'Yakuhai Haku',
		'check': (o) => {
			return checkYakuhai(o, 5)
		}
	},
	'greenDragon': {
		'han': 1,
		'en': 'Green Dragon',
		'jp': '役牌 發',
		'ro': 'Yakuhai Hatsu',
		'check': (o) => {
			return checkYakuhai(o, 6)
		}
	},
	'redDragon': {
		'han': 1,
		'en': 'Red Dragon',
		'jp': '役牌 中',
		'ro': 'Yakuhai Chun',
		'check': (o) => {
			return checkYakuhai(o, 7)
		}
	},
};
module.exports = YAKU;