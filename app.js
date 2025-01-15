const request = require("request");
const main = {
  ws: null,
  init() {
    const initServer = () => {
      const express = require("express");
      const path = require("path");
      const SocketServer = require("ws").Server;
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use(express.static(path.join(__dirname, "./public")));
      const server = app.listen(8888);
      this.ws = new SocketServer({ server });
      this.ws.on("connection", (ws) => {
        ws.on("message", (message) => {
          this.parse(message);
        });
      });
    };
    initServer();
  },
  parse(message) {
    const data = JSON.parse(message.toString());
    const { cmd } = data;
    if (cmd == "getStock") {
      request(data.url, (error, response, body) => {
        this.sendToClient(cmd, body);
      });
    }
  },
  sendToClient(cmd, result) {
    const obj = new Object();
    obj.cmd = cmd;
    obj.result = result;
    this.ws.clients.forEach((client) => {
      client.send(JSON.stringify(obj));
    });
  },
};

main.init();
