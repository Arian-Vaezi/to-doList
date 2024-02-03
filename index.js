import express from "express";
import connectLiveReload from "connect-livereload";
import livereload from "livereload";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());

let tasks = [];
let workItem=[]
const currentDate = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
const day = currentDate.toLocaleDateString("en-US", options);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  let data = {
    activePage:'ordinary',
    title: day,
    tasks: tasks,
  };
  res.render("index.ejs", data);
});
app.post('/',(req,res)=>{
  console.log(req.body)
  const addedTaks=req.body.newItem;
  if(req.body.list==='work'){
    workItem.push(addedTaks)
    res.redirect('/work')
  }else{
    tasks.push(addedTaks)
    res.redirect('/')
  }
})
app.get("/work", (req, res) => {
  let data = {
    activePage:'work',
    title: 'work',
    tasks: workItem,
  };
  res.render("index.ejs", data);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
