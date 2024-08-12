"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gm = new GameManager_1.GameManager();
wss.on("connection", function connection(ws) {
    gm.addUser(ws);
    ws.on("error", console.error);
    // ws.on("message", function message(data) {
    //     console.log("received: %s", data);
    // });
    ws.on("close", function close() {
        gm.removeUser(ws);
    });
    // ws.send("something");
});
