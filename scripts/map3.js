//Medium Hard: Single Road with houses either side
var map3 = [{
		type : "house",
		x : 486,
		y : 93,
		width : 90,
		height : 50,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 489,
		y : 169,
		width : 50,
		height : 70,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 507,
		y : 420,
		width : 60,
		height : 80,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 510,
		y : 302,
		width : 90,
		height : 50,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 507,
		y : 569,
		width : 50,
		height : 50,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 321,
		y : 50,
		width : 60,
		height : 50,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 353,
		y : 153,
		width : 70,
		height : 80,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 340,
		y : 290,
		width : 80,
		height : 90,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 320,
		y : 432,
		width : 90,
		height : 50,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 297,
		y : 526,
		width : 60,
		height : 60,
		health : 100,
		burning : 0
	}, {
		type : "house",
		x : 614,
		y : 59,
		width : 90,
		height : 100,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 747,
		y : 95,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 761,
		y : 197,
		radius : 9,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 682,
		y : 207,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 586,
		y : 201,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 589,
		y : 248,
		radius : 19,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 651,
		y : 257,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 739,
		y : 267,
		radius : 18,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 687,
		y : 323,
		radius : 13,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 643,
		y : 357,
		radius : 18,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 744,
		y : 147,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 661,
		y : 399,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 606,
		y : 440,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 620,
		y : 498,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 625,
		y : 581,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 674,
		y : 550,
		radius : 19,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 698,
		y : 469,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 716,
		y : 398,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 742,
		y : 355,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 765,
		y : 419,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 739,
		y : 479,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 741,
		y : 510,
		radius : 8,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 748,
		y : 545,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 716,
		y : 567,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 775,
		y : 493,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 766,
		y : 572,
		radius : 7,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 696,
		y : 510,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 650,
		y : 467,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 674,
		y : 422,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 711,
		y : 438,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 601,
		y : 382,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 539,
		y : 382,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 271,
		y : 68,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 261,
		y : 116,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 257,
		y : 177,
		radius : 18,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 251,
		y : 260,
		radius : 9,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 248,
		y : 339,
		radius : 9,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 242,
		y : 436,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 232,
		y : 462,
		radius : 19,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 183,
		y : 59,
		radius : 13,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 113,
		y : 61,
		radius : 13,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 88,
		y : 93,
		radius : 20,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 157,
		y : 199,
		radius : 11,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 183,
		y : 221,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 81,
		y : 170,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 195,
		y : 109,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 135,
		y : 181,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 163,
		y : 121,
		radius : 13,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 192,
		y : 159,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 153,
		y : 258,
		radius : 9,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 105,
		y : 236,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 67,
		y : 281,
		radius : 20,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 167,
		y : 265,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 177,
		y : 331,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 85,
		y : 346,
		radius : 13,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 77,
		y : 408,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 124,
		y : 399,
		radius : 11,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 193,
		y : 376,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 175,
		y : 423,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 161,
		y : 465,
		radius : 18,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 182,
		y : 499,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 230,
		y : 568,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 119,
		y : 551,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 101,
		y : 446,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 38,
		y : 437,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 52,
		y : 500,
		radius : 11,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 44,
		y : 550,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 176,
		y : 549,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 292,
		y : 238,
		radius : 14,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 333,
		y : 254,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 382,
		y : 262,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 283,
		y : 384,
		radius : 10,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 346,
		y : 403,
		radius : 9,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 390,
		y : 403,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 294,
		y : 304,
		radius : 12,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 321,
		y : 180,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 300,
		y : 106,
		radius : 17,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 555,
		y : 52,
		radius : 11,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 514,
		y : 59,
		radius : 16,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 697,
		y : 31,
		radius : 15,
		health : 100,
		burning : 0
	}, {
		type : "tree",
		x : 759,
		y : 39,
		radius : 10,
		health : 100,
		burning : 0
	}, ];
