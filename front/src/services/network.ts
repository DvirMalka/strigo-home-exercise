import axios from "axios";
import { IWorkspace } from "../types/Workspace";
const url = process.env.REACT_APP_SERVER_URL || "localhost";
const serverPort = process.env.REACT_APP_SERVER_PORT || 5000;
const wsPort = process.env.REACT_APP_WS_PORT || 8080;

const apiBaseUrl = `http://${url}:${serverPort}`;
const websocketUrl = `ws://${url}:${wsPort}`;
export const ws = new WebSocket(websocketUrl);

export const getWorkspaces = async (): Promise<IWorkspace[]> => {
  const response = await axios.get(`${apiBaseUrl}/workspaces`, {
    method: "get",
    responseType: "json",
  });
  const data: {
    workspaces: IWorkspace[];
  } = response.data;

  return data?.workspaces;
};

export const getWorkspacesForEvent = async (
  eventId: string
): Promise<IWorkspace[]> => {
  const response = await axios.get(`${apiBaseUrl}/workspaces/${eventId}`, {
    method: "get",
    responseType: "json",
  });
  const data: {
    workspaces: IWorkspace[];
  } = response.data;

  return data?.workspaces;
};
