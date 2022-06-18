const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const controller = require("./controller");

app.use(express.static("public"));
// body json 파싱
app.use(express.json());

// cors 설정
app.use(cors());

app.get("/", (req, res) => {
  console.log("get");
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.post("/server/login", controller.login);

app.get("/server/word/:word", controller.searchWord);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
