const express = require("express");
const schedule = require("node-schedule");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to be pinged
app.get("/ping", (req, res) => {
  console.log("Ping received at " + new Date().toISOString());
  res.send("Pong");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // Schedule a job to ping `/ping` every 5 minutes
  schedule.scheduleJob("*/5 * * * *", function () {
    console.log("Sending ping to self...");
    axios
      .get(`http://localhost:${port}/ping`)
      .then((response) => console.log("Self ping successful:", response.data))
      .catch((error) => console.log("Error pinging self:", error));
  });
});
