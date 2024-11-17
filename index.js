const express = require("express");
const axios = require("axios");
const schedule = require("node-schedule");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
// Array of websites to call
const websites = [
  "https://porfolio-new-dabd3275f18f.herokuapp.com/ping",
  "http://localhost:8800/ping",
];

// Function to call a website
async function callWebsite(url) {
  //please send schedulerUrl === PORT
  try {
    const response = await axios.post(url, {
      schedulerUrl: "https://cofeine-af492e410cef.herokuapp.com/ping",
    });
    console.log(`Successfully called ${url}: Status ${response.status}`);
  } catch (error) {
    console.error(`Error calling ${url}: ${error}`);
  }
}

// Schedule the job to call each website every 1 minutes
const job = schedule.scheduleJob("*/10 * * * * *", async function () {
  console.log("Scheduled job executed at:", new Date());
  for (const url of websites) {
    await callWebsite(url);
  }
  // Attempt to reset or call another endpoint after all websites have been called
  try {
    await axios.get("https://cofeine-af492e410cef.herokuapp.com/ping");
    console.log("Successfully reset my clock");
  } catch (error) {
    console.error("Error resetting clock:", error);
  }
});

app.get("/ping", (req, res) => {
  res.send("pinged");
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
