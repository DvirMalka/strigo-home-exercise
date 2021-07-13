import WebSocket from "ws";
// import { WebSocketIncoming } from "./types/WebSocket";
import logger from "./services/logger";
import getMap from "./services/wsMapper";
import { EventId } from "./types/Event";
import { ClientMessageTypes, IWebsocketWithId } from "./types/WebSocket";
import { v4 as uuid } from "uuid";
import { ClientMessage, ServerMessage } from "./types/WebSocket";

const map = getMap();

let wss: WebSocket.Server;

const init = (): WebSocket.Server => {
  wss = new WebSocket.Server({
    port: Number(process.env.WS_PORT || 8080),
  });

  wss.on("connection", (ws: any) => {
    logger.info("New WS connection");
    const id = uuid();
    ws.id = id;
    ws.on("message", (message: string) => {
      logger.info("Client Message", { message });
      const { eventId, type } = JSON.parse(message) as ClientMessage;
      if (!eventId) return;
      const mappedWs = map.get(eventId);
      switch (type) {
        case ClientMessageTypes.REGISTER:
          map.set(eventId, [...(mappedWs || []), ws]);
          break;

        case ClientMessageTypes.UNREGISTER:
          map.set(
            eventId,
            mappedWs?.filter((mapped: any) => mapped.id !== ws.id) || []
          );
          break;

        default:
          break;
      }
    });
    ws.on("close", () => {
      logger.info("Closing connection - removing WS")
      for (let [key, value] of map.entries()) {
        map.set(key, value?.filter((mapped: any) => mapped.id !== ws.id) || []);
      }
    });
  });

  logger.info(`WebSocketServer running - port ${process.env.WS_PORT}`);
  return wss;
};

const getWss = (): WebSocket.Server => {
  if (!wss) {
    init();
  }
  return wss;
};

// Broadcast message - sending data to all connected users
// const broadcast = (data: ServerMessage): void =>
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(data));
//   });

// Update only registered users
const updateRegisteredUsers = async (
  data: ServerMessage,
  eventId: string
): Promise<void> => {
  const map = getMap();
  const registeredWs = map.get(eventId);
  if (!registeredWs) return;
  for (let ws of registeredWs) {
    ws.send(JSON.stringify(data));
  }
};

export { init, getWss, updateRegisteredUsers };
