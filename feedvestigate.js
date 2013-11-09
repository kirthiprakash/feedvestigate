function home(req, res){
	res.sendfile('views/index.html');
}

function feedvestigate(req, res){
	var date = req.query.date;
	console.log(date);
	var url = 'me/feed?limit=25&until=1379433307';
	req.facebook.api(url, function(err, resp){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('url: '+url+' ERROR: '+err+' Resp: '+JSON.stringify(resp));
});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
