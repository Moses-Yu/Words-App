const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const crawling = require("./crawling");

app.use(express.static("public"));

// cors 설정
app.use(cors());

app.get("/", (req, res) => {
  console.log("get");
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/server/word/:word", (req, res) => {
  const { word } = req.params.word;
  console.log(word);
  res.send({
    word: "apple is yammi"
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
