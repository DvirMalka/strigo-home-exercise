import { IWorkspace } from "./Workspace";
import WebSocket from "ws";
export enum ClientMessageTypes {
  REGISTER = "register",
  UNREGISTER = "unregister",
}

export type ServerMessage = {
  data: IWorkspace[] | string;
};

export type ClientMessage = {
  type: ClientMessageTypes;
  eventId: string;
};

export interface IWebsocketWithId {
  ws: WebSocket;
  id: string;
}
