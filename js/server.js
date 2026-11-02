const server = {
  ws: null,
  cb: null,
  init(cb) {
    const express = require("express");
    const path = require("path");
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "../public")));
    const server = app.listen(8888);
    const SocketServer = require("ws").Server;
    this.ws = new SocketServer({ server });
    this.ws.on("connection", (ws) => {
      ws.on("message", (message) => {
        this.receive(message);
      });
    });
    this.cb = cb;
  },
  receive(message) {
    const data = JSON.parse(message.toString());
    const { cmd, codes } = data;
    switch (cmd) {
      case "updateCodes": {
        this.cb("updateCodes", codes);
        break;
      }
    }
  },
  send(cmd, array) {
    const obj = new Object();
    obj.cmd = cmd;
    obj.array = array;
    this.ws.clients.forEach((client) => {
      client.send(JSON.stringify(obj));
    });
  },
};
module.exports = server;
