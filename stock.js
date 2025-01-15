const stock = {
  init() {
    console.log("Stock Initial");
  },
};
module.exports = stock;
// const spawn = require("child_process").spawn;
// const fs = require("fs");
// const rimraf = require("rimraf");
// const path = require("path");
// const archiver = require("archiver");
// const dest = "./dist";
// const htmlPdfNode = require("html-pdf-node");
// const indexPath = "/public/web/template/index.html";
// const HTMLParser = require("node-html-parser");
// const upload = {
//   cmdLine: "",
//   table: {
//     S89: { name: "hxfxglobal.com", "10.170.21.100": ["myid", "inc"], "10.141.101.70": ["mkt", "www", "m", "images", "hd", "app", "twmkt", "inc", "trade"] },
//     S86: { name: "hxfx.com", "10.170.31.42": ["deal"], "10.141.22.14": ["www", "images", "inc", "hd", "app", "trade", "xz"], "10.141.22.12": ["m", "myid", "tg", "inc"] },
//     S25: { name: "ihorse100.com", "10.170.20.70": ["deal"], "10.141.22.14": ["www", "images", "inc", "hd", "app", "trade", "xz"], "10.141.22.12": ["m", "myid", "tg", "inc"] },
//     N95: { name: "hx9999.com", "10.141.21.17": ["www", "images", "inc", "hd", "app", "trade", "download"], "10.141.21.77": ["m", "myid", "tg", "home", "plan", "inc"], "10.170.20.70": ["deal"] },
//     B16: { name: "8bx.com", "10.170.20.70": ["deal"], "10.141.21.17": ["www", "images", "inc", "hd", "h5", "app", "ad"], "10.141.21.77": ["m", "myid", "inc", "tg"] },
//     B18: { name: "jtfx.com", "10.170.20.70": ["deal"], "10.141.21.17": ["www", "images", "inc", "hd", "h5", "app"], "10.141.21.77": ["m", "myid", "inc"] },
//     "B18-sky": { name: "jtfx-sky.com", "10.170.20.70": ["deal"], "10.141.21.17": ["www", "images", "inc", "hd", "h5", "app"], "10.141.21.77": ["m", "myid", "inc"] },
//     S85: { name: "bgcfd.com", "10.170.21.100": ["myid", "inc"], "10.141.101.70": ["mkt", "www", "m", "images", "hd", "app", "twmkt", "inc", "trade"] },
//     totb: {
//       name: "totb",
//       "10.141.101.70": ["www"],
//     },
//     HY: { name: "hy", "10.170.20.70": ["www"] },
//     : { name: "cometechs", "10.170.20.70": ["mkt"] },
//   },
//   version: "1030",
//   project: [],
//   pdf: [],
//   success: [],
//   sendToClient: null,
//   lastPackageTime: null,
//   isNeedPacket10Day: false,
//   init(cb) {
//     this.sendToClient = cb;
//     this.success = [];
//     this.deleteFolder(dest, true);
//     this.start();
//   },
//   createHtml() {
//     if (this.project.length != 0) {
//       // 讀html
//       const html = HTMLParser.parse(fs.readFileSync(`.${indexPath}`));
//       html.querySelector("#date").innerHTML = this.addTime(true);
//       html.querySelector("#product").innerHTML = this.addProduct();
//       html.querySelector("#version").innerHTML = this.addVersion();
//       html.querySelector("#list").innerHTML = this.addList();
//       // 最後寫入回去
//       fs.writeFileSync(`.${indexPath}`, html.innerHTML);
//       this.htmlToPdf();
//     }
//   },
//   addTime(isNeedDash) {
//     let res = "";
//     const time = new Date().toISOString().split("T")[0];
//     if (isNeedDash) {
//       res = time;
//     } else {
//       const reg = new RegExp("-", "g");
//       res = time.replace(reg, "");
//     }
//     return res;
//   },
//   addProduct() {
//     let res = ``;
//     this.project.forEach((obj, i) => {
//       const name = this.getProductName(obj);
//       res += `程序包名稱-${name}`;
//       if (i < this.project.length - 1) {
//         res += "<br>";
//       }
//     });
//     return res;
//   },
//   addVersion() {
//     let res = ``;
//     this.project.forEach((obj, i) => {
//       const name = this.getProductName(obj);
//       res += `${name}-${this.addTime(false)}${this.version}`;
//       if (i < this.project.length - 1) {
//         res += "<br>";
//       }
//     });
//     return res;
//   },
//   addList() {
//     let res = ``;
//     this.project.forEach((obj, i) => {
//       const name = this.getProductName(obj);
//       res += `
//       ${name}版本號：${name}-${this.addTime(false)}${this.version}<br>
//       ${this.getRestart(obj)}，服務器：${this.getProductSever(obj)}${this.getProductUpdate(obj)}
//       `;
//       if (i < this.project.length - 1) {
//         res += "<br>";
//       }
//     });
//     return res;
//   },
//   getRestart(obj) {
//     const business = obj[0];
//     const name = obj[1];
//     let res = "不需重啟";
//     if (business == "B16" && name == "m") {
//       res = "需重啟";
//     }
//     return res;
//   },
//   getProductName(obj) {
//     const business = obj[0];
//     const name = obj[1];
//     let res = `${name}.${this.table[business].name}`;
//     if ((business == "S86" && name == "deal") || (business == "B16" && name == "deal") || (business == "N95" && name == "deal") || business == "totb") {
//       res = `${name}.${business.toLowerCase()}`;
//     } else if (business == "B18-sky" && name == "deal") {
//       res = `${name}.b18`;
//     } else if (business == "N95" && name == "images") {
//       res = `${name}.${this.table[business].name}_new`;
//     } else if (business == "B18-sky") {
//       res = `${name}-sky.8bx.com`;
//     }
//     return res;
//   },
//   getProductSever(obj) {
//     const business = obj[0];
//     const name = obj[1];
//     const keys = Object.keys(this.table[business]);
//     let res = "";
//     keys.forEach((key) => {
//       if (key != "name") {
//         const list = this.table[business][key];
//         list.forEach((text) => {
//           if (text == name) {
//             if (res.length != 0) {
//               res += "，";
//             }
//             res += key;
//           }
//         });
//       }
//     });
//     return res;
//   },
//   getProductUpdate(obj) {
//     const business = obj[0];
//     const name = obj[1];
//     let res = "";
//     if (business == "S86" || business == "S25" || business == "B16" || business == "B18") {
//       if (name != "deal") {
//         res = "，需要升級52.209";
//       }
//     }
//     res = "";
//     return res;
//   },
//   htmlToPdf() {
//     const reg = new RegExp("-", "g");
//     let options = {
//       format: "A4",
//       path: `${dest}/升級申請_${this.addTime(false)}${this.version}.pdf`,
//     };
//     let file = { url: `http://172.20.114.194:9999${indexPath.replace("/public/web", "")}` };
//     htmlPdfNode.generatePdf(file, options).then((res) => {
//       this.sendToClient("Compressing", "", `PDF製作完成`);
//       this.zipDistFolder();
//     });
//   },
//   start() {
//     if (this.project.length != 0) {
//       this.gitPull(this.project[0]);
//     } else {
//       this.project = JSON.parse(JSON.stringify(this.pdf));
//       this.lastPackageTime = new Date().getTime();
//       this.sendToClient("Compressing", "", `專案壓縮完成`);
//       this.createHtml();
//     }
//   },
//   gitPull(project) {
//     const source = this.getPath(project);
//     this.sendToClient("Compressing", "", `路徑:${source}`);
//     // 先git pull
//     const cmdArray = ["D:", `cd ${source}`, "git pull"];
//     this.cmdLine = "";
//     cmdArray.forEach((cmd, i) => {
//       this.cmdLine = `${this.cmdLine}${cmd}`;
//       if (i < cmdArray.length - 1) {
//         this.cmdLine += " && ";
//       }
//     });
//     const child = spawn(this.cmdLine, { shell: true });
//     child.on("close", (code) => {
//       if (code == 0) {
//         this.copyFolderRecursiveSync(source, dest);
//         this.zipFolder(project);
//       } else {
//         this.sendToClient("Error", "", `${JSON.stringify(project)}`);
//       }
//     });
//     child.stderr.on("data", (data) => {
//       this.parseGit(data);
//     });
//     child.stdout.on("data", (data) => {
//       this.parseGit(data);
//     });
//   },
//   zipFolder(project) {
//     const source = this.getPath(project, dest);
//     const archive = archiver("zip");
//     const output = fs.createWriteStream(`${source}.zip`);
//     archive.on("error", (err) => {
//       throw err;
//     });
//     archive.pipe(output);
//     archive.directory(source, false);
//     archive.finalize();
//     output.on("close", () => {
//       this.deleteFolder(source, false);
//       this.project.splice(0, 1);
//       this.start();
//     });
//   },
//   copyFolderRecursiveSync(source, target) {
//     const targetFolder = path.join(target, path.basename(source));
//     if (fs.lstatSync(source).isDirectory()) {
//       const files = fs.readdirSync(source);
//       files.forEach((file) => {
//         // 先將git拿掉
//         if (file != ".git") {
//           const curSource = path.join(source, file);
//           if (fs.lstatSync(curSource).isDirectory()) {
//             this.copyFolderRecursiveSync(curSource, targetFolder);
//           } else {
//             this.copyFileSync(curSource, targetFolder);
//           }
//         }
//       });
//     }
//   },
//   copyFileSync(source, target) {
//     const lastModifyTime = fs.statSync(source).mtime.getTime();
//     const reg = new RegExp(".php");
//     const now = new Date().getTime();
//     // 打包10天內的檔案
//     const isIn10Days = now - lastModifyTime <= 60 * 60 * 24 * 10 * 1000;
//     // 確認不是PHP檔
//     const isNotPHPFile = source.match(reg) == null;
//     // 確認大於最後一次打包時間
//     const isOverLastPacketTime = lastModifyTime >= this.lastPackageTime;
//     // 一小時內可重複打包
//     const isLastPacketTimeIn1Hour = now - this.lastPackageTime <= 60 * 60 * 1 * 1000;
//     if (isIn10Days && isNotPHPFile && (isOverLastPacketTime || isLastPacketTimeIn1Hour || this.isNeedPacket10Day)) {
//       this.createFolder(target);
//       let targetFile = target;
//       if (fs.existsSync(target)) {
//         if (fs.lstatSync(target).isDirectory()) {
//           targetFile = path.join(target, path.basename(source));
//         }
//       }
//       fs.writeFileSync(targetFile, fs.readFileSync(source));
//     }
//   },
//   createFolder(source) {
//     const array = source.split("\\");
//     let str = "";
//     array.forEach((text) => {
//       str += `${text}\\`;
//       if (!fs.existsSync(str)) {
//         fs.mkdirSync(str);
//       }
//     });
//   },
//   deleteFolder(source, isNeedCreate) {
//     rimraf.sync(source);
//     if (isNeedCreate) {
//       fs.mkdirSync(source);
//     }
//   },
//   addProject(type, project) {
//     const array = project.split(" ");
//     array.forEach((name) => {
//       if (name.length != 0) {
//         this.project.push([type, name]);
//         this.pdf.push([type, name]);
//       }
//     });
//   },
//   getPath(project, dest) {
//     const business = project[0];
//     const name = project[1];
//     let res = "";
//     if (dest == undefined) {
//       // 確認是不是deal的專案
//       if ((business == "S86" && name == "deal") || business == "totb") {
//         res = `D:/htdocs/${business}/master/${name}.${business}`;
//       }
//       else if(business == "cometechs"){
//         res = `D:/htdocs/${business}/master/${name}`;
//       }
//       else {
//         res = `D:/htdocs/${business}/master/${name}.${this.table[business].name}`;
//       }
//     } else {
//       // 確認是不是deal的專案
//       if ((business == "S86" && name == "deal") || business == "totb") {
//         res = `${dest}/${name}.${business}`;
//       } else {
//         res = `${dest}/${name}.${this.table[business].name}`;
//       }
//     }
//     return res;
//   },
//   zipDistFolder() {
//     const archive = archiver("zip");
//     const output = fs.createWriteStream(`./public/web/dist.zip`);
//     archive.pipe(output);
//     archive.directory(dest, false);
//     archive.finalize();
//     output.on("close", () => {
//       this.sendToClient("Success", "", "成功壓縮");
//     });
//   },
//   parseGit(data) {
//     let str = "";
//     data.forEach((char) => {
//       if (char == 10) {
//         if (str.length != 0) {
//           this.sendToClient("Compressing", "", `${str}`);
//           str = "";
//         }
//       } else {
//         str += String.fromCharCode(char);
//       }
//     });
//   },
// };
