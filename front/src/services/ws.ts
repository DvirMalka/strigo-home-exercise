const url = process.env.REACT_APP_SERVER_URL || "localhost";
const wsPort = process.env.REACT_APP_WS_PORT || 8080;

const websocketUrl = `ws://${url}:${wsPort}`;
const ws = new WebSocket(websocketUrl);

ws.onopen = () => {
  console.log("websocket connection established");
};

ws.onclose = () => {
  console.log("websocket disconnected");
};

export default ws;
