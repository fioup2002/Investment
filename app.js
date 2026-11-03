const server = require("./js/server.js");
const stock = require("./stock.js");
const main = {
  count: 2,
  buyPrices: new Map(),
  records: new Map(),
  parseData(data) {
    const { records, count } = this;
    const { code } = data;
    if (records.get(code) == undefined) {
      records.set(code, { code, list: [], status: "", time: 0 });
    }
    const info = records.get(code);
    info.status = "";
    info.list.push(data);
    info.time = data.time;
    if (info.list.length > count + 1) {
      info.list = info.list.slice(1);
    }
    if (info.list.length == count + 1) {
      const result = {
        sell: 0,
        buy: 0,
      };
      const buyPrice = Number(this.buyPrices.get(code));
      info.list.forEach((item, i) => {
        const value = Number(item.price);
        if (buyPrice != 0) {
          if (value <= buyPrice) {
            result.sell++;
          } else {
            if (i != 0) {
              if (value < info.list[i - 1]) {
                result.sell++;
              }
            }
          }
        } else {
          if (i < info.list.length - 1) {
            if (value < info.list[i + 1]) {
              result.buy++;
            }
          }
        }
      });
      if (result.buy >= count) {
        info.status = "buy";
      }
      if (result.sell >= count) {
        info.status = "sell";
      }
    }
    records.set(code, info);
    const res = [];
    records.forEach((value) => {
      const obj = JSON.parse(JSON.stringify(value));
      obj.price = obj.list.pop().price;
      obj.buyPrice = Number(this.buyPrices.get(obj.code));
      obj.time = obj.time / 1000;
      res.push(obj);
    });
    server.send("updateProduct", res);
  },
  init() {
    server.init((cmd, code, buyPrice) => {
      switch (cmd) {
        case "addCode": {
          stock.add(code);
          this.buyPrices.set(code, buyPrice);
          break;
        }
        case "deleteCode": {
          stock.remove(code);
          this.buyPrices.delete(code);
          this.records.delete(code);
          if (this.buyPrices.size == 0) {
            server.send("updateProduct", []);
          }
          break;
        }
      }
    });
    stock.init((data) => {
      this.parseData(data);
    });
  },
};

main.init();
