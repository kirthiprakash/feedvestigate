var xtend = require('xtend');
var util = require('util');
utils = {

	messageStrip : function(text) {
		if (text) {
			text = text.toLowerCase();
			text = text.trim();
			text = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
			text = text.trim();
			return text;
		} else {
			return '';
		}
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
				if (!message) {
					continue;
				}
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
		return treeArr;
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
// tt =  [{"many":[{"many":[{"happy":[{"returns":[{"of":[{"the":[{"day":[{"maga":["Narendra Kumar D N","Chandru Shekar"]},{"kirthi":["Koteswar Rao Mandapati"]},{"keerthihappy":[{"birthday":["Deepak Srinivasan"]}]},{"kp":[{"njoy":[{"ur":[{"day":["Valmiki Jansi"]}]}]}]},{"god":[{"bless":["Prajval Kundur"]}]}]}]}]}]}]}]},{"more":[{"happy":[{"returns":[{"of":[{"the":[{"day":[{"happy":[{"birthday":["Prakash Hegade"]}]},{"kano":[{"huduga":["Geetha Ramachandra"]}]}]}]}]}]}]}]},{"happy":[{"returns":[{"of":[{"the":[{"day":[{"kp":["Saswati Devi"]},{"kirthi":[{"ve":[{"fun":["Priyanka Manjunath"]}]}]}]}]}]}]}]}]},{"happy":[{"bday":[{"kphave":[{"a":[{"good":[{"one":["Yashaswi S Kumar"]}]}]}]},{"kirthi":["Puja Rao",{"enjoy":[{"madi":["Shitanshu Bhushan"]}]}]},{"maga":["Ajinkya Atul Alekar"]},{"have":[{"a":[{"gr8":[{"yr":[{"ahead":["Madhumitha Ramakrishnan"]}]}]}]}]},{"kppppppppppppppppppp":["Deepthi Karnam"]},{"dude":[{"have":[{"a":[{"good":[{"one":["Omswarup Shourie"]}]}]}]}]},{"bro":["Amit Jain"]},{"kp":["Shashank Chaturvedi","Shashank Chaturvedi"]}]},{"birthday":["Mallik Arjun","Amrutha Iyengar","Lokesh Reddy Naredla","Avinash Maheswarappa","Prathibha Iyengar","Anmol Prakash Gautam","Vindhya Mahadev","Partha Sarkar","Suhas Hegde","Kavitha Narayan","Shivapriya Bj","Siddharth Shanbhogue","Ramya Pradeep","Rashmi Rangaswamy","Divya BV","Divya BV","Shweta Vishal","Divya BV","Divya BV","Smitha Lakshmesha","Vikram Balisavira","Deepthi Gota Vishwanath","Nagaraj Siddi","Kiran Shastry","Hariharan Balakrishnan","Shreyas Parthasararthy","Karthikeyan Venugopal",{"honey":["Anand Rath","Anand Rath","Anand Rath","Anand Rath"]},{"have":[{"a":[{"gr8":[{"year":[{"ahead":["Jayanth Avarur"]}]}]}]}]},{"maga":["Jitendra Prabhakara","Sunag Jainar","Swastik Narayan",{"have":[{"a":[{"great":[{"day":["Shree Vishnu"]}]}]}]}]},{"kirithi":["Adarsh Sharath"]},{"kp":["Ramakrishna Reddy","Dileep Reddy Nannore","Dileep Reddy Nannore","Rashmi R Rao",{"d":["Mukesh Agarwal"]}]},{"kirthi":["Bhavya Gowda","Arvind Ragiphani","Pradeep Penchala"]},{"dude":["Sowkoor Nischal Shetty"]},{"to":[{"you":["Krishna Chandu"]}]},{"god":[{"bless":["Sd Kulkarni"]}]},{"and":[{"many":[{"many":[{"happy":[{"returns":[{"of":[{"the":[{"day":[{"kp":["Mehul Sheth"]}]}]}]}]}]}]}]}]},{"cr":["Naveen Kumar Sadananda","Naveen Kumar Sadananda","Nuthan Santharam"]},{"caam":["Naveen Mallesh"]},{"buddy":["Mohan Kumar"]},{"magaenjoy":[{"maadi":["Vamshi Krishna Reddy"]}]}]},{"bdaykp":["Amitesh Kumar"]},{"birthdays":[{"kirthi":[{"have":[{"a":[{"blast":["Shilpa Somashekar"]}]}]}]}]}]},{"hi":[{"happy":[{"birthday":["Vijetha Shivanna"]}]},{"kirthi":[{"happy":[{"birthday":[{"kano":[{"en":[{"special":[{"ivathu":["Navya Gc"]}]}]}]}]}]}]},{"kirthiwish":[{"you":[{"a":[{"very":[{"happy":[{"bdaygod":[{"blessgood":[{"luck":["Rohini Mallesh"]}]}]}]}]}]}]}]}]},{"huttu":[{"habbada":[{"shubhashayagalu":["Shashi Kanth","Pavan Gururaj"]},{"subhashayagalu":[{"maga":["Nitin Lakkur"]}]}]}]},{"birthday":[{"greetings":[{"kp":["Anargha Biswas"]}]}]},{"hapy":[{"bday":["Prateek Rao"]}]},{"":["ರೇ ಣು"]},{"kp":[{"once":[{"again":[{"happy":[{"bday":["Anup Ravikumar"]}]}]}]}]},{"hey":[{"kirthi":[{"happy":[{"birthday":["Prasanna Naik"]}]}]}]},{"wish":[{"you":[{"many":[{"many":[{"happy":[{"returns":[{"of":[{"the":[{"day":[{"dude":["Nithin Shubhanand"]}]}]}]}]}]}]}]}]}]},{"hello":[{"happy":[{"birthday":[{"dude":["Siddharth Chaurasia"]}]}]}]}];
// dd = utils.d3fy(tt);
// console.log(JSON.stringify(dd));
exports.parse = utils;
