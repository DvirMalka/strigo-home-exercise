import WebSocket from "ws";
import { WebsocketMessage } from "./types/WebSocket";
import logger from "./services/logger";

let wsServer: WebSocket.Server;

const init = function (): WebSocket.Server {
  wsServer = new WebSocket.Server({
    port: Number(process.env.WS_PORT || 8080),
  });
  logger.info(`Webserver running - port ${process.env.WS_PORT}`);
  return wsServer;
};

const getWsServer = function (): WebSocket.Server {
  if (!wsServer) {
    init();
  }
  return wsServer;
};

// Broadcast message - sending data to all connected users
const broadcast = (data: WebsocketMessage): void =>
  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });

export { init, getWsServer, broadcast };
