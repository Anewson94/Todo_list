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

// lodash
let _ = require("lodash")

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

const listSchema = new mongoose.Schema({
  name: String,
  items: [todolistSchema]
})

const List = mongoose.model("List", listSchema)

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
    let postListName = req.body.list.trim()
    const item = new Item({
      name: postNewItem
    }); 
    if (postListName == "List") {
      console.log(postListName)
      item.save();
      console.log("item has been saved");
      res.redirect("/") ; 
    } else {
      List.find({name: postListName}, function(err, foundList) {
        
        if (err) {
          console.log(err);
          console.log(foundList)
        } if (!foundList) {
          console.log("list not found")

        } else {
          foundList[0].items.push(item)
          foundList[0].save()
          res.redirect("/" + postListName)
          
        }
      })
    }
    
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

app.get("/:listID", function(req, res) {
  const listID = req.params.listID

  List.findOne({name: listID}, function(err, listName) {
    console.log(listName)
      if (!listName) {
        console.log("doesnt exist")
        console.log("list saved")
        const list = new List({
          name: listID,
          items: defaultItems
        })
        list.save()
        res.redirect("/" + listID)
        
      } else { 
        console.log("exists")
        res.render("list", {
          kindOfDay: day,
          typeList: listName.name,
          newListItems: listName.items,
        })
      } 
  })
})


app.get("/about", function(req, res) {
    res.render("about")
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
