const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const stock = {
  cb: null,
  codes: new Map(),
  parseResopnse(response) {
    const res = [];
    const array = response;
    array.forEach((item) => {
      const obj = new Object();
      obj.code = item.symbol;
      obj.time = item.regularMarketTime;
      obj.price = item.bid;
      obj.high = item.regularMarketDayHigh;
      obj.low = item.regularMarketDayLow;
      res.push(obj);
    });
    this.cb(res);
  },
  async getInfo() {
    const codes = [];
    this.codes.keys().forEach((name) => {
      codes.push(`${name}.TW`);
    });
    const quotes = await yahooFinance.quote(codes);
    this.parseResopnse(quotes)
  },
  init(cb) {
    this.cb = cb;
    setInterval(() => {
      if (this.codes.size != 0) {
        this.getInfo();
      }
    }, 1000 * 5);
  },
};
module.exports = stock;
