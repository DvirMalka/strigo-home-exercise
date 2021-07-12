import { IWorkspace } from "./Workspace";

type WebsocketMessage = {
  data: IWorkspace[] | string;
};

export { WebsocketMessage };
