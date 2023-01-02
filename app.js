// "Express";
const express = require("express");
const app = express();

// ("Body Parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname +"/public"));

// ("EJS");
const ejs = require("ejs");
app.set("view engine", "ejs");

// Mongoose database
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
main().catch(err => console.log(err))
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB')
  
}
// Mongoose
const todolistSchema = new mongoose.Schema({
  name: String,
})

const Item = mongoose.model("Item",todolistSchema )

  const item1 = new Item({
    name: "Welcome to your To-do list."
  })
  const item2 = new Item({
    name: "Hit the + button to add new item to the list."
  })
  const item3 = new Item({
    name: "<-- press check to delete item."
  })

const defaultItems = [item1, item2, item3]

// Item.insertMany(defaultItems, function(err) {
//   if (err) {
//     console.log(err);
//   } else console.log("Succesfully added Items")
// });



// Mongoose

const port = 3000;


const date = require(__dirname + "/date.js");
let day = date();
let typeList = "List"

app.get("/", function (req, res) {

  Item.find({}, function(err, foundItems) {
    if (foundItems === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
        console.log(err);
        } else console.log("Succesfully added Items")
      });
      res.redirect("/")
    } else {
      res.render("list", {
        kindOfDay: day,
        typeList: typeList,
        newListItems: foundItems,
      });
    };
    
  })

  
  // console.log(day)
  let item = req.body.newItem;
  
});


app.post("/", function (req, res) {
    let postNewItem = req.body.newItem;
    const item = new Item({
      name: postNewItem
    }); 
    item.save();
    res.redirect("/") ; 
});

app.post("/delete", function(req, res) {
  let deleteBox = req.body.deleteBox
  let deleteBoxID = req.body.deleteBox;
  Item.findByIdAndRemove(deleteBoxID.trim(), function(err){
    if (err) {
      console.log(err)
    } else {console.log("Item Deleted"), res.redirect("/");}
  })
  
})

app.post("/work", function(req, res) {
    let item = req.body.newItem
    
    res.redirect("/work");
    
});

app.get("/work", function(req,res) {
    res.render("list", {kindOfDay: day, typeList: "Work List", newListItems: workItems})
});

app.get("/about", function(req, res) {
    res.render("about")
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
