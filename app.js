const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000


app.get("/", function(req, res) {
    res.send("/index.html")
})

app.listen(port, function(res, req) {
    console.log("Listening on port " + port)
})