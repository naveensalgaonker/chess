import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE, sendMessage } from "./enums";
import { Message } from "./Models";
import { sendMessageToUser } from "../utils";

export class GameManager {
  private games: Game[];
  private users: WebSocket[] = [];
  private pendingUser: WebSocket | null = null;

  constructor() {
    this.games = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.handleMessage(socket);
  }

  removeUser(socket: WebSocket) {
    this.users.splice(this.users.indexOf(socket), 1);
  }

  private handleMessage(socket: WebSocket) {
    socket.on("message", (data: Message) => {
      let message = JSON.parse(data.toString());
      this.messageHandler(message, socket);
    });
  }

  private messageHandler(message: Message, socket: WebSocket) {
    const { action, data } = message;

    // Debug: Check the incoming message
    console.log("Received Message:", message);

    if (action === undefined) {
      console.log("Invalid Message: Action is undefined");
      sendMessageToUser([socket] , "INVALID_ACTION");
      return;
    }

    if (action === INIT_GAME) {
      if (!this.pendingUser) {
        this.pendingUser = socket;
        sendMessageToUser([socket] , "WAITING")
        return;
      } else {
        let newGame = new Game(this.pendingUser, socket);
        this.games.push(newGame);
        this.pendingUser = null;
        // sendMessageToUser(newGame.players , "GAME_STARTED")
        return;
      }
    }

    if (action === MOVE) {
      let curr_game = this.games.find(
        (game:Game) => game.isCurrentPlayer(socket)
      );
      if (curr_game) {
        curr_game.makeMove(data , socket);
      } else {
        console.log("No game found for this player");
      }
      return;
    }

    // Debug: Unhandled action
    console.log("Unhandled action:", action);
  }
}
