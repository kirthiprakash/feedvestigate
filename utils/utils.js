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
		console.log('entered d3fy');
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
		console.log('exiting d3fy');
		console.log(childrenArr);
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

exports.parse = utils;
