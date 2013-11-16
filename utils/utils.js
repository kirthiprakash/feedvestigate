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

	dfs : function(wordsArr, treeArr, value) {
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
			this.dfs(wordsArr.splice(1), subtreeobj[wordsArr[0]], value);
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
			this.dfs(wordsArr, treeArr, value);
		}
		return JSON.stringify(treeArr);
	},

	fbresp : {
		"id" : "658578183",
		"feed" : {
			"data" : [{
				"id" : "658578183_10151873432368184",
				"from" : {
					"name" : "Kirthi Prakash",
					"id" : "658578183"
				},
				"to" : {
					"data" : [{
						"name" : "Mehul Sheth",
						"id" : "1621002434"
					}, {
						"name" : "Mamatha Dakshina Murthy",
						"id" : "1529597084"
					}, {
						"name" : "ನರಸಿಂಹ ಕೌಶಿಕ್",
						"id" : "100000053594824"
					}, {
						"name" : "Nagabhushan Hegde",
						"id" : "100001692849185"
					}, {
						"name" : "Gaurav Kaushik",
						"id" : "1571584491"
					}]
				},
				"message" : "Thanks for all your wishes ppl!\nThis time I got this crazy idea of visualizing all you wishes and trust me, I enjoyed each bit of making it. :D\nI have stripped off all the smileys, exclamations etc. from each message, otherwise this graph would have been twice the size of the current one.\nI squeezed the whole visualization into a picture and coz of that the font is very small.\nYou can get a better quality in HTML, here: http://kirthiprakashr.appspot.com/visualize.html\nAnd the more detailed one here: http://kirthiprakashr.appspot.com/visualize-detail.html\nHere are some stats:\nMost repeated wish: \"Happy Birthday\", repeated 22 times out of 104\nMost lengthiest wish: Mehul Sheth, 84 characters\nMost shortest wish:  Mamatha Dakshina Murthy, 3 characters :D\nKannada wishes: 2, N Narasimha Kaushik & Nagabhushan Hegde\nMost weirdest wish: \"reported 1 error(s) and 0 warning(s):\" by Gaurav Kaushik. Actually I scrapped this data from my mail and in that I got this weird wish but I can't find that on my wall. May be some facebook bug or something :D",
				"message_tags" : {
					"671" : [{
						"id" : "1621002434",
						"name" : "Mehul Sheth",
						"type" : "user",
						"offset" : 671,
						"length" : 11
					}],
					"719" : [{
						"id" : "1529597084",
						"name" : "Mamatha Dakshina Murthy",
						"type" : "user",
						"offset" : 719,
						"length" : 23
					}],
					"779" : [{
						"id" : "100000053594824",
						"name" : "N Narasimha Kaushik",
						"type" : "user",
						"offset" : 779,
						"length" : 19
					}],
					"801" : [{
						"id" : "100001692849185",
						"name" : "Nagabhushan Hegde",
						"type" : "user",
						"offset" : 801,
						"length" : 17
					}],
					"882" : [{
						"id" : "1571584491",
						"name" : "Gaurav Kaushik",
						"type" : "user",
						"offset" : 882,
						"length" : 14
					}]
				},
				"picture" : "https://fbcdn-photos-e-a.akamaihd.net/hphotos-ak-ash3/1231277_10151873401993184_432232314_s.jpg",
				"link" : "https://www.facebook.com/photo.php?fbid=10151873401993184&set=pcb.10151873432368184&type=1&relevant_count=2",
				"icon" : "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yz/r/StEh3RhPvjk.gif",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151873432368184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151873432368184"
				}],
				"privacy" : {
					"description" : "Public",
					"value" : "EVERYONE",
					"friends" : "",
					"networks" : "",
					"allow" : "",
					"deny" : ""
				},
				"type" : "photo",
				"status_type" : "mobile_status_update",
				"object_id" : "10151873401993184",
				"created_time" : "2013-09-22T03:41:21+0000",
				"updated_time" : "2013-10-19T17:53:02+0000",
				"likes" : {
					"data" : [{
						"id" : "100001958975553",
						"name" : "Anand Bellur"
					}, {
						"id" : "1796832785",
						"name" : "Shru Pinku"
					}, {
						"id" : "100000164506257",
						"name" : "Sandeep Sreenath"
					}, {
						"id" : "100001248642480",
						"name" : "Madhan Mohan"
					}, {
						"id" : "665061924",
						"name" : "Bharath Renuka"
					}, {
						"id" : "760222639",
						"name" : "Avinash Mehta"
					}, {
						"id" : "1222377023",
						"name" : "Nitin Lakkur"
					}, {
						"id" : "100001881976809",
						"name" : "Manjunath B Raj"
					}, {
						"id" : "1251499291",
						"name" : "Deepak N R Gowda"
					}, {
						"id" : "1626025704",
						"name" : "Chethan Kumar"
					}, {
						"id" : "100000530138805",
						"name" : "Ani Sha S M"
					}, {
						"id" : "1038050144",
						"name" : "Vikram Balisavira"
					}, {
						"id" : "100000334645422",
						"name" : "Sujithra Sriganesh"
					}, {
						"id" : "1037450161",
						"name" : "Namitha Rajan"
					}, {
						"id" : "1570201099",
						"name" : "Amith Charles"
					}, {
						"id" : "1075371364",
						"name" : "Vijay Raj"
					}, {
						"id" : "100001881345498",
						"name" : "Ramya Pradeep"
					}, {
						"id" : "1078881353",
						"name" : "Prathibha Iyengar"
					}, {
						"id" : "1123863490",
						"name" : "Dheeraj Kumar"
					}, {
						"id" : "715251407",
						"name" : "Pradeep Penchala"
					}, {
						"id" : "645513426",
						"name" : "Soujanya S Purohit"
					}, {
						"id" : "535684215",
						"name" : "Udaya Kumar Karnam"
					}, {
						"id" : "1811742520",
						"name" : "Naveen Mallesh"
					}, {
						"id" : "1454707515",
						"name" : "Vipin Malla"
					}, {
						"id" : "1081850748",
						"name" : "Priyanka Manjunath"
					}],
					"paging" : {
						"cursors" : {
							"after" : "MTA4MTg1MDc0OA==",
							"before" : "MTAwMDAxOTU4OTc1NTUz"
						},
						"next" : "https://graph.facebook.com/658578183_10151873432368184/likes?limit=25&after=MTA4MTg1MDc0OA=="
					}
				},
				"comments" : {
					"data" : [{
						"id" : "10151873432368184_27329270",
						"from" : {
							"name" : "Raja Sravan Sargu",
							"id" : "100000501358265"
						},
						"message" : "this is cool stuff.. :)",
						"can_remove" : true,
						"created_time" : "2013-09-22T03:44:45+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329279",
						"from" : {
							"name" : "Mamatha Dakshina Murthy",
							"id" : "1529597084"
						},
						"message" : "Me I really meant those 3 letters !!",
						"can_remove" : true,
						"created_time" : "2013-09-22T03:47:41+0000",
						"like_count" : 3,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329313",
						"from" : {
							"name" : "Nagabhushan Hegde",
							"id" : "100001692849185"
						},
						"message" : "Sakkat bidu maga :) very impressed :)",
						"can_remove" : true,
						"created_time" : "2013-09-22T03:54:52+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329331",
						"from" : {
							"name" : "Madhurima Malla",
							"id" : "1034174392"
						},
						"message" : "Idu super aagidde Kp¡ ;-) \nBest 'Thank you' I've received.",
						"can_remove" : true,
						"created_time" : "2013-09-22T03:57:50+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329383",
						"from" : {
							"name" : "ನರಸಿಂಹ ಕೌಶಿಕ್",
							"id" : "100000053594824"
						},
						"message" : "wow!!",
						"can_remove" : true,
						"created_time" : "2013-09-22T04:07:31+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329649",
						"from" : {
							"name" : "Bharath C",
							"id" : "753017148"
						},
						"message" : "We all will make sure we wish you in Mandarin next time, just to make sure that you cant reuse your code :)",
						"can_remove" : true,
						"created_time" : "2013-09-22T05:05:48+0000",
						"like_count" : 4,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329746",
						"from" : {
							"name" : "Sindhu Ravindra",
							"id" : "1813022267"
						},
						"message" : "hey nice stuff kirthi !! :)",
						"can_remove" : true,
						"created_time" : "2013-09-22T05:31:36+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329752",
						"from" : {
							"name" : "Vamshi Krishna Reddy",
							"id" : "770268489"
						},
						"message" : "Gaurav Kaushik wished you some errors and warnings!!! :o :o :p",
						"can_remove" : true,
						"created_time" : "2013-09-22T05:32:45+0000",
						"like_count" : 3,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27329953",
						"from" : {
							"name" : "Ajay Krishnamurthy",
							"id" : "100000772242207"
						},
						"message" : "Sooooper maga...take a bow",
						"can_remove" : true,
						"created_time" : "2013-09-22T06:34:16+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27329966",
						"from" : {
							"name" : "Manjunath Ramachandra",
							"id" : "100000140612899"
						},
						"message" : "Excellent Mr.KP....",
						"can_remove" : true,
						"created_time" : "2013-09-22T06:37:37+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27330063",
						"from" : {
							"name" : "Niveditha S Gowda",
							"id" : "100002134649152"
						},
						"message" : "This is too good! Creativity at its best.",
						"can_remove" : true,
						"created_time" : "2013-09-22T06:59:26+0000",
						"like_count" : 1,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27330495",
						"from" : {
							"name" : "Kirthi Prakash",
							"id" : "658578183"
						},
						"message" : "Vamshi Krishna Reddy hehe.. thats what has come in my fb email notification.. But on the my wall nothing of that sort is present..",
						"message_tags" : [{
							"id" : "770268489",
							"name" : "Vamshi Krishna Reddy",
							"type" : "user",
							"offset" : 0,
							"length" : 20
						}],
						"can_remove" : true,
						"created_time" : "2013-09-22T08:24:59+0000",
						"like_count" : 0,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27330524",
						"from" : {
							"name" : "Vamshi Krishna Reddy",
							"id" : "770268489"
						},
						"message" : "Bug in Fb... Log it n win ur birthday gift :D",
						"can_remove" : true,
						"created_time" : "2013-09-22T08:30:56+0000",
						"like_count" : 0,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27331616",
						"from" : {
							"name" : "Gaurav Kaushik",
							"id" : "1571584491"
						},
						"message" : "hehehe @all this is not fb bug...I copied earlier birthday wish in my clipboard but that copy attempt got failed and what ever data i copied earlier got pasted....I deleted my comment immediately and wrote my fresh wishes for Kirthi Prakash :-) :-)",
						"message_tags" : [{
							"id" : "658578183",
							"name" : "Kirthi Prakash",
							"type" : "user",
							"offset" : 226,
							"length" : 14
						}],
						"can_remove" : true,
						"created_time" : "2013-09-22T11:42:28+0000",
						"like_count" : 0,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27331796",
						"from" : {
							"name" : "Naveen Mallesh",
							"id" : "1811742520"
						},
						"message" : "Sexy le :) time elli siktu maga ivella maadoke ;) btw ishtond ottige nenpengittu ninge :P",
						"can_remove" : true,
						"created_time" : "2013-09-22T12:07:09+0000",
						"like_count" : 2,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27334430",
						"from" : {
							"name" : "Vijay Raj",
							"id" : "1075371364"
						},
						"message" : "U shud sell this idea to facebook!!... Nd i shud get my commission for tellin u this..:P..",
						"can_remove" : true,
						"created_time" : "2013-09-22T17:06:23+0000",
						"like_count" : 4,
						"user_likes" : true
					}, {
						"id" : "10151873432368184_27340534",
						"from" : {
							"name" : "Deepak N R Gowda",
							"id" : "1251499291"
						},
						"message" : "good work.. :)",
						"can_remove" : true,
						"created_time" : "2013-09-23T04:36:18+0000",
						"like_count" : 0,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27360336",
						"from" : {
							"name" : "Shru Pinku",
							"id" : "1796832785"
						},
						"message" : "Wow nice :)",
						"can_remove" : true,
						"created_time" : "2013-09-24T19:50:15+0000",
						"like_count" : 0,
						"user_likes" : false
					}, {
						"id" : "10151873432368184_27642623",
						"from" : {
							"name" : "Kiran Kumaran",
							"id" : "100000724645612"
						},
						"message" : "Talent Kirthi ! :)",
						"can_remove" : true,
						"created_time" : "2013-10-19T17:53:02+0000",
						"like_count" : 0,
						"user_likes" : false
					}],
					"paging" : {
						"cursors" : {
							"after" : "MTk=",
							"before" : "MQ=="
						}
					}
				}
			}, {
				"id" : "658578183_10151865022373184",
				"from" : {
					"name" : "Manju Manu",
					"id" : "1043068124"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "belated wishes dear. bless with many happy returns....",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151865022373184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151865022373184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-19T02:46:15+0000",
				"updated_time" : "2013-09-19T02:46:15+0000"
			}, {
				"id" : "658578183_10151863488628184",
				"from" : {
					"name" : "Nikhil Javagal",
					"id" : "747578061"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Belated happy birthday dude...!!",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151863488628184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151863488628184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"application" : {
					"name" : "Facebook for Android",
					"namespace" : "fbandroid",
					"id" : "350685531728"
				},
				"created_time" : "2013-09-18T10:59:18+0000",
				"updated_time" : "2013-09-18T10:59:18+0000"
			}, {
				"id" : "658578183_10151862845173184",
				"from" : {
					"name" : "Shivapriya Bj",
					"id" : "711262597"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy Birthday :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151862845173184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151862845173184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-18T03:09:39+0000",
				"updated_time" : "2013-09-18T03:09:39+0000"
			}, {
				"id" : "658578183_10151862670163184",
				"from" : {
					"name" : "Sujithra Sriganesh",
					"id" : "100000334645422"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy bday!!! ve fun:):)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151862670163184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151862670163184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-18T00:57:29+0000",
				"updated_time" : "2013-09-18T00:57:29+0000"
			}, {
				"id" : "658578183_10151862633478184",
				"from" : {
					"name" : "Neha Gayal",
					"id" : "100001199057087"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy bday kirthi.. :) ",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151862633478184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151862633478184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-18T00:29:32+0000",
				"updated_time" : "2013-09-18T00:29:32+0000"
			}, {
				"id" : "658578183_10151862454773184",
				"from" : {
					"name" : "Vinayak Rajshekhar",
					"id" : "100000250438189"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "HAPPY BDAY KEERTHI !!",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151862454773184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151862454773184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T22:19:28+0000",
				"updated_time" : "2013-09-17T22:19:28+0000"
			}, {
				"id" : "658578183_10151861979688184",
				"from" : {
					"name" : "Nagabhushan Hegde",
					"id" : "100001692849185"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "huttu habbada haardhika shubhashaya :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861979688184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861979688184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T19:23:02+0000",
				"updated_time" : "2013-09-17T19:23:02+0000"
			}, {
				"id" : "658578183_10151861977053184",
				"from" : {
					"name" : "Chethan MP",
					"id" : "1272000315"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy birthday maga ....",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861977053184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861977053184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T19:21:59+0000",
				"updated_time" : "2013-09-17T19:21:59+0000"
			}, {
				"id" : "658578183_10151861845198184",
				"from" : {
					"name" : "Mukesh Agarwal",
					"id" : "1061149929"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy birthday man...:D",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861845198184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861845198184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T18:21:28+0000",
				"updated_time" : "2013-09-17T18:21:28+0000"
			}, {
				"id" : "658578183_10151861819563184",
				"from" : {
					"name" : "Raghu Shivaram",
					"id" : "666085270"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy Birthday Kirthi. :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861819563184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861819563184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T18:10:17+0000",
				"updated_time" : "2013-09-17T18:10:17+0000"
			}, {
				"id" : "658578183_10151861813543184",
				"from" : {
					"name" : "Jitendra Prabhakara",
					"id" : "100000727972482"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy Birthday maga :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861813543184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861813543184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T18:06:53+0000",
				"updated_time" : "2013-09-17T18:06:53+0000"
			}, {
				"id" : "658578183_10151861801033184",
				"from" : {
					"name" : "Deepthi Karnam",
					"id" : "1412052600"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy bday kpppppppppppp",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861801033184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861801033184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T18:01:16+0000",
				"updated_time" : "2013-09-17T18:01:16+0000"
			}, {
				"id" : "658578183_10151861790008184",
				"from" : {
					"name" : "Pradeep Penchala",
					"id" : "715251407"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy birthday Kirthi !!! ",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861790008184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861790008184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T17:56:29+0000",
				"updated_time" : "2013-09-17T17:56:29+0000"
			}, {
				"id" : "658578183_10151861772238184",
				"from" : {
					"name" : "Yashaswi S Kumar",
					"id" : "660169668"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy b'day!",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861772238184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861772238184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T17:47:37+0000",
				"updated_time" : "2013-09-17T17:47:37+0000"
			}, {
				"id" : "658578183_10151861741523184",
				"from" : {
					"name" : "Mehul Sheth",
					"id" : "1621002434"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy Birthday and Many Many Happy Returns Of The Day KP... :) Hows everything going?",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861741523184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861741523184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T17:32:08+0000",
				"updated_time" : "2013-09-17T17:32:08+0000"
			}, {
				"id" : "658578183_10151861731418184",
				"from" : {
					"name" : "Vijay Raj",
					"id" : "1075371364"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy bday baldies!!...:D..",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861731418184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861731418184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T17:26:33+0000",
				"updated_time" : "2013-09-17T17:26:33+0000"
			}, {
				"id" : "658578183_10151861715348184",
				"from" : {
					"name" : "Srikanth Kashyap",
					"id" : "100000387635180"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy bday maga",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861715348184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861715348184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T17:18:01+0000",
				"updated_time" : "2013-09-17T17:18:01+0000"
			}, {
				"id" : "658578183_10151861696028184",
				"from" : {
					"name" : "Chandana Hatti",
					"id" : "1042136571"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy bday :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861696028184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861696028184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"application" : {
					"name" : "Facebook for Android",
					"namespace" : "fbandroid",
					"id" : "350685531728"
				},
				"created_time" : "2013-09-17T17:06:03+0000",
				"updated_time" : "2013-09-17T17:06:03+0000"
			}, {
				"id" : "658578183_10151861670408184",
				"from" : {
					"name" : "Madhu Sachidananda",
					"id" : "1076296317"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Many more returns of the day.",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861670408184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861670408184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"application" : {
					"name" : "Facebook for iPhone",
					"namespace" : "fbiphone",
					"id" : "6628568379"
				},
				"created_time" : "2013-09-17T16:50:25+0000",
				"updated_time" : "2013-09-17T16:50:25+0000"
			}, {
				"id" : "658578183_10151861664813184",
				"from" : {
					"name" : "Gajendra Kundapur",
					"id" : "591020215"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy B'day...",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861664813184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861664813184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T16:47:07+0000",
				"updated_time" : "2013-09-17T16:47:07+0000"
			}, {
				"id" : "658578183_10151861663238184",
				"from" : {
					"name" : "Ramya Pradeep",
					"id" : "100001881345498"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Happy birthday....!",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861663238184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861663238184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T16:46:11+0000",
				"updated_time" : "2013-09-17T16:46:11+0000"
			}, {
				"id" : "658578183_10151861625423184",
				"from" : {
					"name" : "Swetha S Kulkarni",
					"id" : "859174900"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Hi, Happy Birthday !!!! :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861625423184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861625423184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T16:27:21+0000",
				"updated_time" : "2013-09-17T16:27:21+0000"
			}, {
				"id" : "658578183_10151861592068184",
				"from" : {
					"name" : "ನರಸಿಂಹ ಕೌಶಿಕ್",
					"id" : "100000053594824"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "Huttu habbada sakkath shubhashaya Kirthi! :) :) :)",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861592068184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861592068184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T16:08:46+0000",
				"updated_time" : "2013-09-17T16:08:46+0000"
			}, {
				"id" : "658578183_10151861567198184",
				"from" : {
					"name" : "Pranay Airan",
					"id" : "684237866"
				},
				"to" : {
					"data" : [{
						"name" : "Kirthi Prakash",
						"id" : "658578183"
					}]
				},
				"message" : "happy birthday Kirthi",
				"actions" : [{
					"name" : "Comment",
					"link" : "https://www.facebook.com/658578183/posts/10151861567198184"
				}, {
					"name" : "Like",
					"link" : "https://www.facebook.com/658578183/posts/10151861567198184"
				}],
				"privacy" : {
					"value" : ""
				},
				"type" : "status",
				"created_time" : "2013-09-17T15:55:08+0000",
				"updated_time" : "2013-09-17T15:55:08+0000"
			}],
			"paging" : {
				"previous" : "https://graph.facebook.com/658578183/feed?limit=25&since=1379821281",
				"next" : "https://graph.facebook.com/658578183/feed?limit=25&until=1379433307"
			}
		}
	}

};

// var simple = utils.simplify();
// utils.treenify(simple);
exports.simplify = utils.simplify;
exports.treenify = utils.treenify;
