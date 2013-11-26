require('newrelic');
var utils = require('./utils/utils');
var async = require('async');

function home(req, res) {
	res.sendfile('views/index.html');
}

function feedvestigate(req, res) {
	var dateStr = req.query.date;
	console.log(date);
	var date = new Date(Number(dateStr));
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	date = date.getTime() / 1000;
	// 86400sec -> 1 day
	nextDate = date + (3 * 86400);
	data = date - 86400;
	var patt = /^.*until=(.*)$/;
	var pageUrlPatt = /^https:\/\/graph.facebook.com\/(\d*)\/feed.*$/;
	var dataArr = [];
	var meId = null;
	var fbUntil = date + 999;
	var url = '/me/feed?until=' + nextDate + '&since=' + date + '&limit=100';
	var fbDataArrLength = 9999;

	async.whilst(function() {
		console.log('condition');
		console.log(fbDataArrLength > 1);
		return fbDataArrLength > 1;
	}, function(next) {
		console.log(url);
		req.facebook.api(url, function(err, resp) {
			console.log('-----------start--------');
			console.log('error info on fb req: ' + err);
			console.log('length of fb arr: ' + resp.data.length);
			console.log('length of data arr: ' + dataArr.length);
			console.log('----------end---------');
			var fbDataArr = resp.data;
			fbDataArrLength = fbDataArr.length;
			dataArr = dataArr.concat(fbDataArr);
			if (resp.hasOwnProperty('paging')) {
				url = resp.paging.next;
				var regexResult = pageUrlPatt.exec(url);
				if (regexResult && regexResult.length > 1) {
					meId = regexResult[1];
				}
				url = url + '&since=' + date;
			}
			next();
		});
	}, function(err) {
		if (!err) {
			var simpleData = utils.parse.simplify(dataArr, meId);
			var treeData = utils.parse.treenify(simpleData);
			var dtree = utils.parse.d3fy(treeData);
			var d3dic = {
				"name" : "Facebook birthday wishes",
				'children' : dtree
			};
			fbJsonStr = {
				'fbJsonToken' : d3dic
			};
			res.render('visualize.ejs', fbJsonStr);

			// res.writeHead(200, {
			// 'Content-Type' : 'text/plain'
			// });
			// res.end('url: ' + url + ' ERROR: ' + err + ' Resp: ' + treeData);

		} else {
			console.log(err);
		}
	});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
