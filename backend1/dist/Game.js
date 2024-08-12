"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this._boardSize = 8;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Array(this._boardSize).fill(new Array(this._boardSize).fill(""));
        this.moves = [];
        console.log(">>>>>>Game Started<<<<<<");
    }
    makeMove(data) { }
    get players() {
        return [this.player1, this.player2];
    }
}
exports.Game = Game;
