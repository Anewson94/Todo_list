"Express"
const express = require("express")
const app = express()

"Body Parser"
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

"EJS"
const ejs = require("ejs")
app.set("view engine", "ejs")

const port = 3000


let items = []

app.get("/", function(req, res) {
    let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    let today = new Date()
    let day = today.toLocaleDateString("en-US", dateOptions)
    console.log(day)
    let item = req.body.newItem
    res.render("list", {
        kindOfDay: day,
        newListItems: items
    })

})

app.post("/", function(req, res) {
    let item = req.body.newItem
    items.push(item)
    res.redirect("/")
})

app.listen(port, function() {
    console.log("Listening on port " + port)
})