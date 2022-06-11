const express = require("express");
const app = express();
const port = 3001;

const crawling = require("./crawling");

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("get");
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
