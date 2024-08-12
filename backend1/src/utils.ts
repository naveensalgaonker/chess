import { sendMessage } from "./models/enums";

export function sendMessageToUser(players: any[] , state: string, message: string = "", payload:any = null) {
  if(!message){
    message = sendMessage[state];
  }
  for (let player of players) {
    player.send(JSON.stringify({ state , message , payload }));
  }
}