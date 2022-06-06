// const schedule = require("node-schedule");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Agenda = require("agenda");

mongoose.connect("mongodb://localhost:27017/JobTest", {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// app.post("/scheduletask", async (req, res) => {
//   // console.log("this is me body ", req.body);
//   try {
//     agenda.define(
//       "Tesasdst",
//       { priority: "high", concurrency: 10 },
//       async (job) => {
//         console.log("job data", job.attrs);
//       }
//     );

//     (async function () {
//       await agenda.start();
//       await agenda.every("*/1 * * * *", ["Test"]);
//     })();
//     const date = new Date(req.body.value);
//     console.log("date", date);
//     res.json({ status: "ok", data: req.body });
//   } catch (error) {
//     res.json({ status: "error", error: "not executed" });
//   }
// });

const mongoConnectionString = "mongodb://localhost:27017/JobTest";

const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "jobs" },
});

// Or override the default collection name:
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

// or pass additional connection options:
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// or pass in an existing mongodb-native MongoClient instance
// const agenda = new Agenda({mongo: myMongoClient});

// agenda.define("delete old users", async (job) => {
//   console.log("job", job.attrs);
//   //   await User.remove({ lastLogIn: { $lt: twoDaysAgo } });
// });

// (async function () {
//   // IIFE to give access to async/await
//   await agenda.start();

//   await agenda.every("3 minutes - test", "delete old users");

//   // Alternatively, you could also do:
//   await agenda.every("*/3 * * * *", "delete old users");
// })();

// agenda.define("Test2", { priority: "high", concurrency: 10 }, async (job) => {
//   console.log("job data", job.attrs);
// });

// ------------>>>>>>>>>>>>>>

agenda.define("Test", async (job) => {
  console.log("job data", job.attrs);
});


agenda.start();

// (async function () {
//   await agenda.start();
//   await agenda.every("0 * * * *", ["Test", "Test2"]);
// })();

app.post("/scheduletask", async (req, res) => {
  console.log("this is me body ", req.body);
  const jobType =req.body.jobType;
  const allowedJobs = Object.keys(agenda._definitions);
  if (!jobType) {
    return res.send("Must pass a jobType in the query params.");
  }
  // if (!allowedJobs.includes(jobType)) {
  //   return res.send(
  //     `${jobType} is not supported. Must pass one of ${allowedJobs.join(
  //       ", or "
  //     )} as jobType in the query params.`
  //   );
  // }
  console.log("allowed job")

  if (jobType === "instantJob") {
    console.log("inside ")
    agenda.now(jobType, req.body);
  }

  if (jobType === "delayedJob") {
    agenda.schedule(
      dayjs().add(5, "seconds").format(),
      jobType,
      req.body
    );
  }

  res.send("Job added to queue!");
  // try {
  //   const date = new Date(req.body.value);
  //   console.log("date", date);
  //   res.json({ status: "ok", data: req.body });
  // } catch (error) {
  //   res.json({ status: "error", error: "not executed" });
  // }
});

// 8080 PoRT to listen APP ------------------------------------------------>
app.listen(8080, () => {
  console.log("server started at 8080");
});
