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
};
util.init();
