const server = require("./js/server.js");
const stock = require("./stock.js");
const main = {
  count: 2,
  records: new Map(),
  send() {},
  parseData(array) {
    const { records, count } = this;
    array.forEach((item) => {
      const { code, price, time } = item;
      if (records.get(code) == undefined) {
        const info = JSON.parse(JSON.stringify(item));
        info.price = [price];
        info.status = "";
        records.set(code, info);
      } else {
        const info = records.get(code);
        info.time = time;
        info.price.push(price);
        if (info.price.length > count + 1) {
          info.price = info.price.slice(1);
        }
        if (info.price.length == count + 1) {
          const result = {
            sell: 0,
            buy: 0,
          };
          const isBuy = stock.codes.get(code) != 0;
          info.price.forEach((value, i) => {
            if (isBuy) {
              if (i != 0) {
                if (value < info.price[i - 1]) {
                  result.sell++;
                }
              }
            } else {
              if (i < info.price.length - 1) {
                if (value < info.price[i + 1]) {
                  result.buy++;
                }
              }
            }
          });
          if (result.buy >= count) {
            info.status = "buy";
          }
          if (result.sell >= count) {
            info.status = "sell`";
          }
        }
        records.set(code, info);
      }
    });
    const res = [];
    records.forEach((value) => {
      const obj = JSON.parse(JSON.stringify(value));
      obj.price = obj.price.pop();
      obj.buyPrice = stock.codes.get(obj.code);
      res.push(obj);
    });
    server.send("updateProduct", res);
  },
  init() {
    server.init((cmd, codes) => {
      switch (cmd) {
        case "updateCodes": {
          stock.codes = new Map(Object.entries(codes));
        }
      }
    });
    stock.init((data) => {
      this.parseData(data);
    });
  },
};

main.init();
