import express from "express";
import { createServer } from "http2";
import cors from "cors";
import router from "./routes/auth";
import transport from "./utils/nodemialer";
import connectToDb from "./db";
const app = express();
app.use(express.json());
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
connectToDb();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/auth", router);
