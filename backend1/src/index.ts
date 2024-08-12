import { WebSocketServer } from "ws";
import { GameManager } from "./models/GameManager";

const wss = new WebSocketServer({ port: 8080 });

const gm = new GameManager();

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


// TODO 1: My very own chess game!
    // TODO A: Validate a players move, return the state of game (check, checkmate, stalemate, etc.)
    // TODO B: Print the current state of the board
    // TODO C: Play the recap of the game
// TODO 2: Play a game against bot ( Game mode: Easy, Medium, Hard )
