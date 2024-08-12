import { WebSocket } from "ws";
import { sendMessage } from "./enums";

export interface Move{
  from: string;
  to: string;
  promotion?: string;
}

export interface Message {
  action: string;
  data: any;
}

export enum Color{
  'w',
  'b',
}