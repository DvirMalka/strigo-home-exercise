import WebSocket from "ws";
let map: Map<string, WebSocket[]>;

const getMap = (): Map<string, WebSocket[]> => {
  if (!map) {
    map = new Map();
  }
  return map;
};

export default getMap;
