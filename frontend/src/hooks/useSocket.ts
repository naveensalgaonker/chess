import { useEffect, useState } from "react";
import { message } from "../models/models";

export const useSocket=()=>{
  const [socket, setSocket] = useState<null|WebSocket>(null);

  useEffect(() => {
    if(socket){
      return;
    }
    console.log("Establishing socket");
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to server");
      setSocket(ws);
    };

    // ws.onmessage = (event) => {
    //   console.log("Message received from server", event);
    // };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setSocket(null);
    };
  }, []);

  const send = (payload:unknown)=>{
    if(socket){
      socket.send(JSON.stringify(payload));
    }else{
      console.log("Socket not connected");
    }
  }

  const recievedMessage = (callback: (payload:message)=>void) => {
    if (socket) {
      socket.onmessage = (event) => {
        callback(JSON.parse(event.data));
      };
    }
  };

  return {
    socket,
    send,
    recievedMessage
  };
}