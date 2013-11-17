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
	nextDate = date + 86400;
	var patt = /^.*until=(.*)$/;
	var dataArr = [];
	var url = '/me/feed?until=' + nextDate + '&since=' + date + '&limit=100';
	var fbDataArrLength = 9999;

	async.whilst(function() {
		console.log('condition: ' + fbDataArrLength < 1);
		return fbDataArrLength > 1;
	}, function(next) {
		req.facebook.api(url, function(err, resp) {
			console.log('error info on fb req: ' + err);
			console.log('length of fb arr: ' + resp.data.length);
			console.log('length of data arr: ' + dataArr.length);
			var fbDataArr = resp.data;
			fbDataArrLength = fbDataArr.length;
			dataArr = dataArr.concat(fbDataArr);
			console.log(dataArr.length);
			url = resp.paging.next + '&since=' + date;
		});
		next();
	}, function(err) {
		if (!err) {
			var id = "658578183";
			var simpleData = utils.parse.simplify(dataArr, id);
			var treeData = utils.parse.treenify(simpleData);
			res.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			res.end('url: ' + url + ' ERROR: ' + err + ' Resp: ' + treeData);
		} else {
			console.log(err);
		}
	});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
