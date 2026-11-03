const { WebSocketClient } = require("@fugle/marketdata");
const stock = {
  cb: null,
  ws: null,
  subscribeMap: new Map(),
  parseResopnse(response) {
    const { event, data } = response;
    switch (event) {
      case "unsubscribed":
      case "authenticated":
      case "heartbeat": {
        break;
      }
      case "subscribed": {
        const { id, symbol } = data;
        this.subscribeMap.set(symbol, id);
        break;
      }
      case "snapshot": {
        const { symbol: code } = data;
        const obj = new Object();
        obj.code = code;
        obj.time = data.time;
        obj.price = data.bid;
        this.cb(obj);
        break;
      }
      default: {
        console.log(event, data);
        break;
      }
    }
  },
  add(code) {
    this.ws.subscribe({ channel: "trades", symbol: code });
  },
  remove(code) {
    const id = this.subscribeMap.get(code);
    if (id != undefined) {
      this.ws.unsubscribe({ id });
      this.subscribeMap.delete(code);
    }
  },
  init(cb) {
    this.cb = cb;
    const client = new WebSocketClient({ apiKey: "NDZhYjY4OWItNzk0MC00ZDliLWEwZjYtMDFjNDQ4ZjI5MDJmIDY1NjNkNjg4LTcxNjgtNDQ3Yi1iNWE3LTliZWFlYzg4MTcxOA==" });
    this.ws = client.stock;
    this.ws.connect();
    this.ws.on("message", (message) => {
      const data = JSON.parse(message);
      this.parseResopnse(data);
    });
  },
};
module.exports = stock;
