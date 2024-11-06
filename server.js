import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import loggingMiddleware from "./src/middlewares/logging.js";
import AuthRoute from "./src/routes/Auth.js";
import FrontendRoute from "./src/routes/Frontend.js";
import './utils/websocket/websocket.js'
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
app.use("/frontend", FrontendRoute);

app.get("/", (req, res) => {
  res.render("index", { title: "renko home page :D" });
});

app.get("/1", (req, res) => {
  res.render("index1");
});

app.get('/filter' , async(req , res)=>{
  const data  = [
    {
      id:1,
      name:"h1",
      title:"idk fucking know y"
    },
    {
      id:2,
      name:"h2",
      title:"idk fucking know y1"
    },
  ]

  data.push({
    id:3,
    name:"h3",
    title:"idk fucking know y1"
  },)

  return res.json({
    data:data.map(item => {
      return {
       ...item,
        title:item.title.toUpperCase(),
      };
    }),
  })
})

app.get('/testarr' , (req , res)=>{
  const data = [
    {
     id:1,
     name:"h1",
     title:"idk fucking know y"
    }
  ]

  let datas = []
  for(const item of data){
    datas = item
  }
  return res.json({
    data:datas,
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
