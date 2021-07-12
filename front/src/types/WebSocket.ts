import { IWorkspace } from "./Workspace";

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
