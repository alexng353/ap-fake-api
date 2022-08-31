import logger from "./utils/logger";

import fetch from "node-fetch";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  const { m, q } = req.query;
  logger.info(`m: ${m}, q: ${q}`);

  const url = "https://animepahe.com/api?m=search&q=";
  if (!m || !q) {
    const response = {
      error: "Missing query parameters",
    };
    res.status(400).json(response);
    return;
  }

  fetch(url + q)
    .then((res) => res.json())
    .then((json) => {
      res.json(json);
    });
});

// const url = "https://animepahe.com/api?m=search&q=";
// const search = "naruto";
// const searchUrl = url + search;x

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
