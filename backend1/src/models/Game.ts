import { WebSocket } from "ws";
import { Move } from "./Models";
import { Chess } from 'chess.js'
import { sendMessageToUser } from "../utils";

export class Game {
	private player1: WebSocket;
	private player2: WebSocket;
	private startTime: Date;
	// board: string[][];
	// moves: Move[];
	// private _boardSize: number = 8;
	public board:Chess;
	private moveCount:number = 0;

	constructor(player1: WebSocket, player2: WebSocket) {
		this.player1 = player1;
		this.player2 = player2;
		// this.board = new Array(this._boardSize).fill(
		// 	new Array(this._boardSize).fill("")
		// );
		// this.moves = [];
		console.log(">>>>>>Game Started<<<<<<");
		this.board = new Chess();
		this.startTime = new Date();

		this.players.forEach((player,idx) => {
			sendMessageToUser([player] , 'GAME_STARTED',`You have been assigned as ${idx===0?'WHITE' : 'BLACK'} player`);
		});
	}

	makeMove(move: Move, socket: WebSocket) {
		if(this.invalidPlayerTurnCheck(socket)){
			sendMessageToUser([socket] , "OTHERS_TURN")
			return;
		}
		console.log(">>>> Correct Player Turn <<<<");
		
		try {
			this.board.move(move);
			console.log(">>>> player move made <<<<");
			console.log(this.board.ascii());
			this.moveCount++
		}catch(e){
			console.log(e);
			sendMessageToUser([socket] , "INVALID_MOVE")
		}

		if(this.board.isGameOver()){
			this.players.forEach(player => {
				let res = player===socket? "YOU_WIN" : "YOU_LOSE"
				sendMessageToUser([player] , res)
			});
		}else{
			this.players.forEach(player => {
				if(player!==socket){
					sendMessageToUser([player] , "YOUR_TURN",'',move)
				}
				// let res = player===socket? "OTHERS_TURN" : "YOUR_TURN"
				// sendMessageToUser([player] , res,'',{
				// 	...move,
				// 	board: this.board.ascii()
				// })
			});
			// sendMessageToUser([this.player1, this.player2] , "GAME_IN_PROGRESS")
		}
	}

	get players(){
		return [this.player1, this.player2];
	}

	isCurrentPlayer(socket : WebSocket): boolean {
		return this.player1 === socket || this.player2 === socket
	}

	invalidPlayerTurnCheck(socket : WebSocket): boolean {
		if(this.moveCount % 2 === 0 && socket !== this.player1){
			return true;
		}
		if(this.moveCount % 2 === 1 && socket !== this.player2){
			return true;
		}

		return false
	}

	// colors
	// export const WHITE = 'w'
	// export const BLACK = 'b'

	// pieces
	// export const PAWN = 'p'
	// export const KNIGHT = 'n'
	// export const BISHOP = 'b'
	// export const ROOK = 'r'
	// export const QUEEN = 'q'
	// export const KING = 'k'


	// chess.isCheckmate()
	// chess.isDraw()
	// chess.isGameOver()
	// chess.move({ from: 'g2', to: 'g3' })
	// chess.turn() -->
	// chess.ascii()
	// -> '   +------------------------+
	//      8 | r  n  b  q  k  b  n  r |
	//      7 | p  p  p  p  .  p  p  p |
	//      6 | .  .  .  .  .  .  .  . |
	//      5 | .  .  .  .  p  .  .  . |
	//      4 | .  .  .  .  P  P  .  . |
	//      3 | .  .  .  .  .  .  .  . |
	//      2 | P  P  P  P  .  .  P  P |
	//      1 | R  N  B  Q  K  B  N  R |
	//        +------------------------+
	//          a  b  c  d  e  f  g  h'
}
