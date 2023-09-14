import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
    const activityType = req.body.type;
    const noOfParticipants = req.body.participants;    
    const activityDisplayed = "";

    if (activityType === "random" && noOfParticipants === "any") {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const activityDisplayed = response.data.activity;
    } else {
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${noOfParticipants}`);
        const activityDisplayed = response.data[Math.floor(Math.random()*response.data.length)].activity;
    }    
    res.render("index.ejs", { activityType: activityType, activityDisplayed: activityDisplayed, noOfParticipants: noOfParticipants});
});

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});