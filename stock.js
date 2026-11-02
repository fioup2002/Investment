const request = require("request");
const stock = {
  cb: null,
  codes: new Map(),
  parseResopnse(response) {
    const res = [];
    const { msgArray: array } = response;
    array.forEach((item) => {
      const obj = new Object();
      obj.name = item.n;
      obj.code = item.c;
      obj.time = item.tlong;
      obj.price = item.pz;
      res.push(obj);
    });
    this.cb(res);
  },
  getInfo() {
    let url = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
    this.codes.keys().forEach((name, i) => {
      url += `tse_${name}.tw`;
      if (i < this.codes.length - 1) {
        url += "|";
      }
    });
    request(url, (error, response, body) => {
      this.parseResopnse(JSON.parse(body));
    });
  },
  init(cb) {
    this.cb = cb;
    setInterval(() => {
      if (this.codes.size != 0) {
        this.getInfo();
      }
      // cb([
      //   {
      //     name: "復華台灣科技優息",
      //     code: "00929",
      //     time: "1793341800000",
      //     price: "27.6600",
      //   },
      //   {
      //     name: "台積電",
      //     code: "2330",
      //     time: "1793341800000",
      //     price: "2370.0000",
      //   },
      //   {
      //     name: "元大台灣50",
      //     code: "0050",
      //     time: "1793341800000",
      //     price: "104.9500",
      //   },
      // ]);
    }, 1000 * 5);
  },
};
module.exports = stock;
