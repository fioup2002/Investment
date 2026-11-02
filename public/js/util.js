const util = {
  init() {
    const setRem = () => {
      const width = window.innerWidth;
      if (width >= 1200 && width <= 1920) {
        document.documentElement.style.fontSize = width / 19.2 + "px";
      } else if (width <= 750) {
        document.documentElement.style.fontSize = width / 7.5 + "px";
      } else {
        document.documentElement.style.fontSize = "100px";
      }
    };
    setRem();
    window.addEventListener("resize", setRem);
    window.addEventListener("load", () => {
      setTimeout(() => {
        $("body").show();
      }, 500);
    });
  },
  numberToString(val, digit = 2) {
    let res = "";
    let zero = "";
    for (let i = 0; i < digit; i++) {
      zero += "0";
    }
    res = `${zero}${val.toString()}`;
    res = res.substring(res.length - digit, res.length);
    return res;
  },
  formatDate(timestamp, formate = "YYYY-MM-DD hh:mm:ss") {
    let res = formate;
    const time = new Date(Number(timestamp));
    res = res.replace(/YYYY/g, time.getFullYear());
    res = res.replace(/MM/g, this.numberToString(time.getMonth() + 1));
    res = res.replace(/DD/g, this.numberToString(time.getDate()));
    res = res.replace(/hh/g, this.numberToString(time.getHours()));
    res = res.replace(/mm/g, this.numberToString(time.getMinutes()));
    res = res.replace(/ss/g, this.numberToString(time.getSeconds()));
    return res;
  },
};
util.init();
