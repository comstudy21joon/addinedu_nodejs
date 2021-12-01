const http = require("http");
const express = require("express");
const app = express();
const router = express.Router();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// app.get("/", (req, res) => {
//   res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
//   res.end("<h1>안녕하세요</h1>");
// });

router.route("/").get((req, res) => {
  res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node.js Server</h1>");
  res.write("<h3>오신것을 환영합니다!</h3>");
  res.write("<p>Node와 React를 연동하는 실습</p>");
  res.end();
});

router.route("/main").get((req, res) => {
  console.log("GET - /main");
  var objdata = { title: "main page", name: "홍길동" };
  req.app.render("main", objdata, (err, html) => {
    res.end(html);
  });
});

const car_list = [
  { no: 1, name: "Sonata", price: 2500, company: "HYUNDAI", year: 2020 },
  { no: 2, name: "Grandeur", price: 3500, company: "HYUNDAI", year: 2019 },
  { no: 3, name: "BMW", price: 5500, company: "BMW", year: 2021 },
];
router.route("/car_list").get((req, res) => {
  console.log("GET - /car_list");
  var carData = { title: "Car List", car_list: car_list };
  req.app.render("car_list", carData, (err, html) => {
    res.end(html);
  });
});

app.use("/", router);
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("서버 실행 중 : http://localhost:3000");
});

// nodemon : 수정 할때마다 매번 서버를 재실행 하지 않아도 된다.
// npm install nodemon --save-dev
// package.json 파일에서 script 부분 수정
