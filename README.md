# SocketToSMPP

Contains 3 parts:

## 1. SMS SMPP Receiver
````messageCenter.js````. This will listet on 2017 port for SMPP connections and send SMS,

## 2. Socket Lister and SMPP Sender
````socketToSms.js````. This will lister on 4592 port for raw TCP socket connections and will forward it to SMPP Server on 2017 port.

## 3. Socket Client
````client.js````. This will send a JSON to 4592 port.
