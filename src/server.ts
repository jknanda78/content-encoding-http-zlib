import express from "express";
import compression from "compression";
import path from "path";
import zlib from "node:zlib";

const app = express();
const PORT = 3000;
const jsonData = require("./data.json");

// Enable compression for all responses
/*
app.use(
  compression({
    threshold: 0,
    filter: (req, res) => compression.filter(req, res),
  })
);
*/

app.get("/bigData", (req, res) => {
  try {
    const compressedData = zlib.gzipSync(JSON.stringify(jsonData));
    res.set("Content-Type", "application/json");
    res.set("Content-Encoding", "gzip");
    res.send(compressedData);
  } catch (err) {
    res.status(500).send("Error compressing data");
  }
});

app.get("/", (req, res, next) => {
  const _retfile = path.join(__dirname, "test.html");
  res.sendFile(_retfile);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
