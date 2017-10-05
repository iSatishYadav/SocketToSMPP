var smpp = require("smpp");
var auth = require("./auth.js");
var server = smpp.createServer(function (session) {
    console.log("Creating Server.");
    session.on("bind_transceiver", function (pdu) {
        console.log("Transceiver bound: ");
        console.log("Pausing for auth.");
        session.pause();
        auth.checkUserCredentialsAsync(pdu.system_id, pdu.password, function (error) {
            if(error){
                console.log(error);
                session.send(pdu.response({
                    command_status : smpp.ESMS_RBINDFAIL
                }));
                session.close();
                return;
            }
            console.log("Auth success.");
            console.log("Sending PDU response.");
            session.send(pdu.response());
            console.log("PDU response sent.");
            console.log("Resuming...");
            session.resume();
            console.log("connected.");
        });
    });
    session.on("submit_sm", function (pdu) {
        console.log("Sending '" + pdu.short_message.message + "' to " + pdu.destination_addr + ".");
        // console.log("PDU Command: ", pdu.command);
        //TODO: Generate a message id     
        var messageId = new Date().getUTCMilliseconds().toString();
        session.send(pdu.response({
            message_id:messageId
        }));        
    });
    session.on("error", function (error) {        
    });
});
server.listen(2017);