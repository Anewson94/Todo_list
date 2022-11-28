"Express"
const express = require("express")
const app = express()

"Body Parser"
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

"EJS"
const ejs = require("ejs")
app.set("view engine", "ejs")

const port = 3000


app.get("/", function(req, res) {
    
    let today = new Date()
    let todayDate = today.getDay()
    let currDay = today.getDate()

    let day = ""

    if (todayDate <= 5) {
        day = "weekday"
    } else {
        day = "weekend"
    }  

    res.render("list", {kindOfDay: day})
})

app.listen(port, function() {
    console.log("Listening on port " + port)
})