var xtend = require('xtend');
var util = require('util');
utils = {

	messageStrip : function(text) {
		text = text.toLowerCase();
		text = text.trim();
		text = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
		text = text.trim();
		return text;
	},

	simplify : function(feedArr, meId) {
		// var feedArr = this.fbresp.feed.data;
		// var meId = this.fbresp.id;
		var postFromMap = {};
		for (index in feedArr) {
			var post = feedArr[index];
			var fromId = post.from.id;
			if (meId != fromId) {
				var from = post.from.name;
				var message = post.message;
				message = this.messageStrip(message);
				if (postFromMap.hasOwnProperty(message)) {
					postFromMap[message].push(from);
				} else {
					var fromArr = [from];
					postFromMap[message] = fromArr;
				}
			}
		}
		// console.log(postFromMap);
		return postFromMap;
	},

	buildNew : function(words_arr, value) {
		if (words_arr.length == 0) {
			return null;
		}
		var retVal = {};
		if (words_arr.length == 1) {
			retVal[words_arr[0].trim()] = value;
			return retVal;
		}
		retVal[words_arr[0].trim()] = [this.buildNew(words_arr.slice(1), value)];
		return retVal;
	},

	bfs : function(wordsArr, treeArr, value) {
		var foundIndex = -1;
		for (var index in treeArr) {
			var subtreeobj = treeArr[index];
			if (subtreeobj.hasOwnProperty(wordsArr[0])) {
				foundIndex = index;
				break;
			}
		}
		if (foundIndex != -1) {
			var subtreeobj = treeArr[foundIndex];
			this.bfs(wordsArr.splice(1), subtreeobj[wordsArr[0]], value);
		} else {
			if (wordsArr.length > 0) {
				treeArr.push(this.buildNew(wordsArr, value));
			}
		}
	},

	treenify : function(dict) {
		var treeArr = [];
		for (var key in dict) {
			var wordsArr = key.split(' ');
			var value = dict[key];
			this.bfs(wordsArr, treeArr, value);
		}
		return JSON.stringify(treeArr);
	},

	d3fy : function(dictArr) {
		if ( dictArr instanceof Array) {
			var nodeNameArr = [];
			for (var index in dictArr) {
				var name = dictArr[index];
				if ( typeof (name) === 'string') {
					nodeName = {
						'name' : name,
						size : 999
					};
					nodeNameArr.push(nodeName);
				} else {
					var tempArr = [];
					for (var key in name) {
						var value = name[key];
						tempArr.push({
							'name' : key,
							'children' : this.d3fy(value)
						});
					}
					nodeNameArr = nodeNameArr.concat(tempArr);
				}
			}
			return nodeNameArr;
		}
		childrenArr = [];
		for (var key in dictArr) {
			var nodeWish = {
				"name" : key
			};
			nodeWish["children"] = this.d3fy(dictArr[key]);
			childrenArr.push(nodeWish);
		}
		return childrenArr;
	},

	fbresp : [{
		"happy" : [{
			"bday" : [{
				"keerthi" : ["Vinayak Rajshekhar"]
			}, {
				"kpppppppppppp" : ["Deepthi Karnam"]
			}, {
				"baldiesd" : ["Vijay Raj"]
			}, {
				"maga" : ["Srikanth Kashyap"]
			}, {
				"kirthi" : ["Sindhu Ravindra", {
					"prakash" : [{
						"have" : [{
							"a" : [{
								"blast" : ["Valmiki Jansi", "Valmiki Jansi"]
							}]
						}]
					}]
				}, {
					"enjoy" : ["Niveditha S Gowda"]
				}]
			}, {
				"kp" : ["Aparna Amaresh"]
			}, {
				"dude" : [{
					"have" : [{
						"a" : [{
							"gr88" : [{
								"day" : ["Raja Sravan Sargu"]
							}]
						}]
					}]
				}]
			}]
		}, {
			"birthday" : [{
				"maga" : ["Chethan MP", "Jitendra Prabhakara", "Avinash Maheswarappa", "Nitin Lakkur"]
			}, {
				"mand" : ["Mukesh Agarwal"]
			}, {
				"kirthi" : ["Raghu Shivaram", "Pradeep Penchala", "Pranay Airan", "Prathibha Iyengar", "Karthik Kadam", "Ramesh Ramakrishnan", "Siddharth Chaurasia", "Deepthi Gota Vishwanath", {
					"maja" : [{
						"maadi" : ["Namitha Rajan"]
					}]
				}, {
					"ve" : [{
						"fun" : ["Priyanka Manjunath"]
					}]
				}]
			}, {
				"and" : [{
					"many" : [{
						"many" : [{
							"happy" : [{
								"returns" : [{
									"of" : [{
										"the" : [{
											"day" : [{
												"kp" : [{
													"hows" : [{
														"everything" : [{
															"going" : ["Mehul Sheth"]
														}]
													}]
												}]
											}]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}, {
				"to" : [{
					"you" : [{
						"cr" : ["Puja Rao"]
					}]
				}]
			}, {
				"dude" : ["Chetan Chetu", "Vamshi Krishna Reddy", "Mohan Kumar", "Abhay Joshi"]
			}, {
				"kp" : [{
					"m" : ["Dileep Reddy Nannore"]
				}, {
					"hav" : [{
						"a" : [{
							"great" : [{
								"year" : [{
									"ahead" : ["Karteek Majety"]
								}]
							}]
						}]
					}]
				}]
			}, {
				"mr" : [{
					"absent" : [{
						"minded" : [{
							"brat" : ["Manjunath Ramachandra"]
						}]
					}]
				}]
			}, {
				"kirti" : ["Anand Bellur", {
					"simply" : [{
						"rock" : [{
							"maadi" : ["Ajay Krishnamurthy"]
						}]
					}]
				}]
			}, {
				"master" : [{
					"d" : [{
						"d" : ["Gabru Mittal"]
					}]
				}]
			}, {
				"god" : [{
					"bless" : [{
						"u" : [{
							"alwazz" : ["Manuj Rastogi"]
						}]
					}]
				}]
			}, {
				"man" : ["Arvind Ragiphani"]
			}, {
				"bro" : ["Sowkoor Nischal Shetty"]
			}, {
				"macha" : ["Bharath Shree Ram"]
			}, {
				"caam" : ["Naveen Mallesh"]
			}]
		}, {
			"b" : [{
				"day" : ["Dimple Satish"]
			}]
		}]
	}, {
		"huttu" : [{
			"habbada" : [{
				"haardhika" : [{
					"shubhashaya" : ["Nagabhushan Hegde"]
				}]
			}, {
				"sakkath" : [{
					"shubhashaya" : [{
						"kirthi" : ["à²¨à²°à²¸à²¿à²‚à²¹ à²•à³Œà²¶à²¿à²•à³"]
					}]
				}]
			}]
		}]
	}, {
		"many" : [{
			"more" : [{
				"returns" : [{
					"of" : [{
						"the" : [{
							"day" : ["Madhu Sachidananda"]
						}]
					}]
				}]
			}, {
				"happy" : [{
					"returns" : [{
						"of" : [{
							"the" : [{
								"day" : ["Amith Charles", "Lokesh Reddy Naredla"]
							}]
						}]
					}]
				}]
			}]
		}, {
			"many" : [{
				"happy" : [{
					"returns" : [{
						"of" : [{
							"the" : [{
								"day" : [{
									"kirthi" : ["Sowmya Rachamadugu"]
								}, {
									"dude" : ["Manoj Shukla", "Srikanth B G Srikanth"]
								}, {
									"god" : [{
										"bless" : [{
											"you" : ["GC Swamy"]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}, {
			"happy" : [{
				"returns" : [{
					"of" : [{
						"the" : [{
							"day" : ["Navya Gc"]
						}]
					}]
				}]
			}]
		}]
	}, {
		"hi" : [{
			"happy" : [{
				"birthday" : ["Swetha S Kulkarni"]
			}]
		}, {
			"kp" : [{
				"happy" : [{
					"bday" : [{
						"will" : [{
							"call" : [{
								"u" : [{
									"magga" : ["Anup Ravikumar"]
								}]
							}]
						}]
					}]
				}]
			}]
		}]
	}, {
		"very" : [{
			"happy" : [{
				"bdayenjoy" : ["Gaurav Kaushik"]
			}]
		}]
	}, {
		"hey" : [{
			"maga" : [{
				"wish" : [{
					"u" : [{
						"a" : [{
							"very" : [{
								"happy" : [{
									"birthday" : ["Nikhil Kaushik"]
								}]
							}]
						}]
					}]
				}]
			}]
		}]
	}, {
		"wish" : [{
			"u" : [{
				"many" : [{
					"many" : [{
						"happy" : [{
							"returns" : [{
								"of" : [{
									"the" : [{
										"day" : ["Meghana Bav"]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}, {
			"you" : [{
				"many" : [{
					"many" : [{
						"happy" : [{
							"returns" : [{
								"of" : [{
									"the" : [{
										"day" : [{
											"keerthi" : ["Madhu Sudhan"]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}, {
				"happy" : [{
					"bday" : ["Shiva Kumar"]
				}]
			}]
		}]
	}, {
		"wishing" : [{
			"you" : [{
				"many" : [{
					"many" : [{
						"hapy" : [{
							"returns" : [{
								"of" : [{
									"the" : [{
										"day" : ["Bratati Mohapatra"]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}]
	}, {
		"bday" : [{
			"greets" : [{
				"maga" : ["Anargha Biswas"]
			}]
		}]
	}, {
		"hbd" : ["Mamatha Dakshina Murthy"]
	}, {
		"yo" : [{
			"happy" : [{
				"birthday" : ["Prateek Varshney"]
			}]
		}]
	}, {
		"kp" : [{
			"many" : [{
				"many" : [{
					"happy" : [{
						"returns" : [{
							"of" : [{
								"the" : [{
									"day" : [{
										"have" : [{
											"a" : [{
												"superb" : [{
													"day" : ["Madhurima Malla"]
												}]
											}]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}]
	}]

};


	// var simple = utils.simplify();
	// var treee = utils.treenify(simple);
	// console.log(util.inspect(treee, false, null));
	// var dtree = utils.d3fy(treee);
	// var d3dic = {
	// "name" : "2013 bday wishes on fb",
	// 'children' : dtree
	// };
	// console.log(util.inspect(d3dic, false, null));
	// console.log(JSON.stringify(d3dic));

exports.parse = utils;
