function home(req, res){
	res.sendfile('views/index.html');
}

function feedvestigate(req, res){
	var dateStr = req.query.date;
	console.log(date);
	var date = new Date(dateStr);
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	date = date.getTime()/1000;
	nextDate = date + 86400;
	var url = '/me/feed?limit=25&until='+nextDate+'&since='+date;
	req.facebook.api(url, function(err, resp){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('url: '+url+' ERROR: '+err+' Resp: '+JSON.stringify(resp));
});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
