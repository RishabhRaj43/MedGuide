import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import env from "./src/Config/Env/env.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.listen(env.PORT, () => {
  console.log("Example app listening on port 8021!");
});
