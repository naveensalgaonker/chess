import { WebSocket } from "ws";
import { sendMessage } from "./enums";

export interface Move{
  from: string;
  to: string;
  promotion?: string;
}

export interface Message {
  state: string;
  data: any;
}

export enum Color{
  'w',
  'b',
}