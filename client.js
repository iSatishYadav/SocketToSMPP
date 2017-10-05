var net = require('net');
var client = new net.Socket();
client.connect(4592, 'localhost', function() {
	console.log('Connected');
	var str = JSON.stringify({mobile: "9167005157", text : "This is a test OTP."});
	client.write(str);
});