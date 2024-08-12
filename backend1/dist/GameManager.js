"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const enums_1 = require("./enums");
class GameManager {
    constructor() {
        this.users = [];
        this.pendingUser = null;
        this.games = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }
    removeUser(socket) {
        this.users.splice(this.users.indexOf(socket), 1);
    }
    handleMessage(socket) {
        socket.on("message", (data) => {
            let message = JSON.parse(data.toString());
            this.messageHandler(message, socket);
        });
    }
    messageHandler(message, socket) {
        const { action, data } = message;
        // Debug: Check the incoming message
        console.log("Received Message:", message);
        if (action === undefined) {
            console.log("Invalid Message: Action is undefined");
            return;
        }
        if (action === enums_1.INIT_GAME) {
            if (!this.pendingUser) {
                this.pendingUser = socket;
                this.sendMessageToUser([socket], "WAITING");
                return;
            }
            else {
                let newGame = new Game_1.Game(this.pendingUser, socket);
                this.games.push(newGame);
                this.pendingUser = null;
                this.sendMessageToUser(newGame.players, "GAME_STARTED");
                return;
            }
        }
        if (action === enums_1.MOVE) {
            let curr_game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
            if (curr_game) {
                console.log("Processing Move for Game");
                curr_game.makeMove(data);
            }
            else {
                console.log("No game found for this player");
            }
            return;
        }
        // Debug: Unhandled action
        console.log("Unhandled action:", action);
    }
    sendMessageToUser(players, state) {
        for (let player of players) {
            player.send(JSON.stringify({ state, message: enums_1.sendMessage[state] }));
        }
    }
}
exports.GameManager = GameManager;
