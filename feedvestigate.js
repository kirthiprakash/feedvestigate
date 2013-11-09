var Facebook = require('facebook-node-sdk')
function home(req, res){
	res.sendfile('views/index.html');
}

function feedvestigate(req, res){
	res.facebook.api('me?fields=feed&since='+req.query.date, function(err, resp){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end(JSON.stringify(resp));
});
}

exports.home = home;
exports.feedvestigate = feedvestigate;
