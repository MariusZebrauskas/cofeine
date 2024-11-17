const express = require("express");
const axios = require("axios");
const schedule = require("node-schedule");
const app = express();
const PORT = process.env.PORT || 3000;

// Array of websites to call
const websites = [
  "https://porfolio-new-dabd3275f18f.herokuapp.com/ping",
  "http://localhost:8800/ping",
];

// Function to call a website
async function callWebsite(url) {
  //please send schedulerUrl === PORT
  try {
    const response = await axios.get(url, {
      schedulerUrl: "https://cofeine-af492e410cef.herokuapp.com/ping",
    });
    console.log(`Successfully called ${url}: Status ${response.status}`);
  } catch (error) {
    console.error(`Error calling ${url}: ${error}`);
  }
}

// Schedule the job to call each website every 1 minutes
const job = schedule.scheduleJob("*/01 * * * *", function () {
  console.log("Scheduled job executed at:", new Date());
  websites.forEach((url) => callWebsite(url));
});

app.get("/ping", (req, res) => {
  res.send("pinged");
  res.status(200).send("Pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
