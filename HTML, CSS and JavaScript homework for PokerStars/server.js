const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("static"));

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
