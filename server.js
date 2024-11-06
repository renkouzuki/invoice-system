import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import loggingMiddleware from "./src/middlewares/logging.js";
import AuthRoute from "./src/routes/Auth.js";
import './utils/websocket/websocket.js'
import BackendRoute from "./src/routes/Bakcend.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(loggingMiddleware);

app.use("/api", AuthRoute);
app.use("/api", BackendRoute);

app.get("/", (req, res) => {
  res.render("index", { title: "renko home page :D" });
});

app.get("/1", (req, res) => {
  res.render("index1");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
