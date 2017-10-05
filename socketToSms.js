var smpp = require("smpp");
var session = smpp.connect("smpp://localhost:2017", function (error) {
    console.log(error);
});
session.bind_transceiver({
    system_id: process.env.SMPP_SystemId,
    password: process.env.SMPP_Password
}, function (pdu) {    
    if(pdu.command_status == 0){
        console.log("Bound transceiver");
        //TODO: Get SMS requests and send messages
        // var smsList = [{mobile: "9167005157", text : "Hello World"}];
        // for (var index = 0; index < smsList.length; index++) {
        //     var sms = smsList[index];
        //     console.log("Operating on", sms);
        //     session.submit_sm({
        //         destination_addr: sms.mobile,
        //         short_message: sms.text
        //     }, function (pdu) {
        //         //submit_sm_resp
        //         console.log("That's PDU", pdu);
        //         if(pdu.command_status == 0){
        //             console.log("Message sent to Server. Message Id: ", pdu.message_id);
        //             //TODO: do something with the message id                   
        //         }
        //         else{
        //             console.log("Couldn't send SMS to: ", sms.mobile);
        //         }
        //     });
        // }        
    }
    else {
        console.log("Couldn't connect to server.PDU status: ", pdu.command_status);        
    }
});

//TODO: Create a socket and listen for incoming messages, then 
var net = require("net");

var socketReceiver = net.createServer(function (socket) {   
    socket.write("Welcome "); 
    socket.on("error", function (error) {        
    });
    socket.on("data", function (data) {
        console.log("data: ", data); 
        var messageJson = JSON.parse(data);       
        session.submit_sm({
            destination_addr: messageJson.mobile,
            short_message: messageJson.text
        }, function (pdu) {
            //submit_sm_resp
            console.log("That's PDU", pdu);
            if(pdu.command_status == 0){
                console.log("Message sent to Server. Message Id: ", pdu.message_id);
                //TODO: do something with the message id                   
            }
            else{
                console.log("Couldn't send SMS to: ", data);
            }
        });
    });
});

socketReceiver.listen(4592, "localhost", 100);