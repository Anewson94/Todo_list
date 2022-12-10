"Express";
const express = require("express");
const app = express();

("Body Parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

("EJS");
const ejs = require("ejs");
app.set("view engine", "ejs");

const port = 3000;

let items = [];
let workItems = []

const date = require(__dirname + "/date.js")
let day = date()

app.get("/", function (req, res) {
  // console.log(day)
  let item = req.body.newItem;
  res.render("list", {
    kindOfDay: day,
    typeList: day,
    newListItems: items,
  });
});


app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(req.body)
    if (req.body.list == "Work List") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
     }

  
});

app.post("/work", function(req, res) {
    let item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
    
})

app.get("/work", function(req,res) {
    res.render("list", {kindOfDay: day, typeList: "Work List", newListItems: workItems})
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function () {
  console.log("Listening on port " + port);
});
