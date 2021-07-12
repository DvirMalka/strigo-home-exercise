import axios from "axios";
import { IWorkspace } from "../types/Workspace";
import { IEvent } from "../types/Event";

const url = process.env.REACT_APP_SERVER_URL || "localhost";
const serverPort = process.env.REACT_APP_SERVER_PORT || 5000;

const apiBaseUrl = `http://${url}:${serverPort}`;

export const getWorkspaces = async (
  eventId?: string
): Promise<IWorkspace[]> => {
  const response = await axios.get(`${apiBaseUrl}/workspaces/${eventId||''}`, {
    method: "get",
    responseType: "json",
  });
  const data: {
    workspaces: IWorkspace[];
  } = response.data;

  return data?.workspaces;
};

export const getEvents = async (): Promise<IEvent[]> => {
  const response = await axios.get(`${apiBaseUrl}/events`, {
    method: "get",
    responseType: "json",
  });
  const data: {
    events: IEvent[];
  } = response.data;

  return data?.events;
};