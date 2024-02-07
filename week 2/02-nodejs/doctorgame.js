// setting up the requirements
const express = require("express");

// intantiating a object for express.
const app = express();

// defining the port to listen for the data.
const PORT = 3000;

app.use(express.json());

// making an in memory representation of user data.
var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

// calling in a get request to check user kidney data
app.get("/", (req, res) => {
  const kidneyCount = users[0].kidneys.length;
  let healthyKidneyCount = 0;
  for (let i = 0; i < kidneyCount; i++) {
    if (users[0].kidneys[i].healthy) {
      healthyKidneyCount += 1;
    }
  }
  let unhealthyKidneyCount = kidneyCount - healthyKidneyCount;
  res.json({
    kidneyCount,
    healthyKidneyCount,
    unhealthyKidneyCount,
  });
});

// calling in a post request to add in extra kidneyy information.
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({ status: "completed" });
});

// calling put to update the unhealthy kidney data.
app.put("/", (rep, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({ status: "completed" });
});

// deleting the kidney's that are unhealthy.
app.delete("/", (req, res) => {
  let newKidney = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidney.push(users[0].kidneys[i]);
    }
  }
  users[0].kidneys = newKidney;
  res.json({ status: "completed" });
});

// listening onto the port
app.listen(PORT);
