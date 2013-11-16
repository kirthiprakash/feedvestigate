var utils = require('./utils/utils');

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
	nextDate = date + 86400;
	var url = '/me/feed?until=' + nextDate + '&since=' + date;
	req.facebook.api(url, function(err, resp) {
		var data = resp.data;
		var simpleData = utils.simplify(data, "658578183");
		var treeData = utils.treenify(simpleData);
		res.writeHead(200, {
			'Content-Type' : 'text/plain'
		});
		res.end('url: ' + url + ' ERROR: ' + err + ' Resp: ' + treeData);
	});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
