import WebSocket from "ws";
let map: Map<string, WebSocket[]>;

const getMap = function () {
  if (!map) {
    map = new Map();
  }
  return map;
};

export default getMap;
