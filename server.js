import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var activityDisplayed = "";
var activityType = "";
var noOfParticipants = 0;

// Get Data for the random Selection
app.post("/getData", async (req, res) => {
    activityType = req.body.type; 
    noOfParticipants = req.body.participants ;
    if (activityType === "random" && noOfParticipants === "any") {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        activityDisplayed = response.data.activity;
    } else {
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${noOfParticipants}`);
        activityDisplayed = response.data[Math.floor(Math.random()*response.data.length)].activity;
    }
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render("index.ejs", { activityDisplayed: activityDisplayed, activityType: activityType, noOfParticipants: noOfParticipants });
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});