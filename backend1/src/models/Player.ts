import { sendMessage } from "./enums";
import { Color } from "./Models";

export class Player {
  socket: WebSocket;
  name: any;
  color: Color | null = null;
  id: Number;

  constructor(socket: WebSocket, name: String) {
    this.socket = socket;
    this.name = name;
    this.id = Math.floor(Math.random() * 100000000000)
  }

  setColor(color: Color) {
    this.color = color;
  }
  
  sendMessage(state: any , message: string = '') {
    if(message === '') message = sendMessage[state];
    this.socket.send(JSON.stringify({ state , message }));
  }
}