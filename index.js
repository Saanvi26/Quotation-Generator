const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");
const ejs=require("ejs");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(request, resp){
    var url = "https://quote-garden.onrender.com/api/v3/quotes/random";
    var quote,quote1;
    https.get(url, function (response) {
        response.on("data", function (data) {
             quote +=data;
        })
        response.on("end", function () {
           quote1=quote.slice(9);
           quote1=JSON.parse(quote1);
           var qt=(quote1.data[0].quoteText);
           var auth= (quote1.data[0].quoteAuthor);
           resp.render("index.ejs",{quote:qt,writer:auth});
       })
    });
})
app.get("/", function (req, resp) {
    resp.sendFile("index.ejs");
})
app.listen(4000, () => {
    console.log("Server running !");
})