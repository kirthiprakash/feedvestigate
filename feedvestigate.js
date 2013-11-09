function home(req, res){
	res.sendfile('views/index.html');
}

function feedvestigate(req, res){
	var date = req.query.date;
	console.log(date);
	req.facebook.api('/me/feed?limit=25&until='+date', function(err, resp){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end(JSON.stringify(resp));
});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
