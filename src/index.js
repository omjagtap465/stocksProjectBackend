import express from "express";
import bodyParser from "body-parser";
import { appRouter } from "./routes/index.js";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", appRouter);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});