// const schedule = require("node-schedule");
const mongoose = require("mongoose");
const FeatureList = require("./modal/modal.featureList");
const ScheduleList = require("./modal/modal.scheduleList");
const express = require("express");
const app = express();
const cron = require("node-cron");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

mongoose.connect("mongodb://localhost:27017/JobTest", {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// QUEue to store process timing in UTC
let jobList = [];
let index = 0;
let ProcessIndex = 0;

const ScheduleID = 2342342342;
const OrganizationID = 3453453234;
const UserID = 3453453;
const Feature = "Test feature";

app.post("/scheduletask", async (req, res) => {
  // console.log("this is me body ", req.body);
  try {
    const date = new Date(req.body.value);
    console.log("date", date);
    jobList[index] = date;
    index++;
    res.json({ status: "ok", data: req.body });
  } catch (error) {
    res.json({ status: "error", error: "not executed" });
  }
});

async function test(value) {
  try {
    // console.log("value" , value );
    const date = new Date(value);
    try {
      console.log("date", date);
      const year = date.getFullYear();
      const Month = date.getUTCMonth();
      const Day = date.getDay();
      const todayDate = date.getUTCDate();

      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      console.log(
        year,
        " -",
        Month,
        " -",
        todayDate,
        " -",
        Day,
        " -",
        hour,
        " -",
        minute,
        " -",
        second
      );
      // console.log("DaTE", req.body.Time);
      // console.log(`${todayDate}-${Month}-${year}`);

      console.log(
        second,
        " -",
        minute,
        " -",
        hour,
        " -",
        todayDate,
        " -",
        year
      );
       const job = cron.schedule(
        `${second} ${minute} ${hour} ${todayDate} * ${Day}`,
        async () => {
          //   await FeatureList.create({
          //     FeatureID: req.body.FeatureID,
          //     FeatureName: req.body.FeatureName,
          //     Status: req.body.Status,
          //   });
          //   console.log("success Fully Submitted FeatureList");
           ScheduleList.create({
            ScheduleID: ScheduleID,
            OrganizationID: OrganizationID,
            UserID: UserID,
            Feature: Feature,
            Time: date,
          });
          ProcessIndex++;
          console.log("inside processIndex", ProcessIndex);
          console.log("success Fully Submitted schedule task");
          
      job.stop();
          
        }
      );
      // console.log("executed");
      // console.log(mongoose.connection.readyState);
      // res.json({ status: "ok", data: req.body });
    } catch (error) {
      // res.json({ status: "error", error: "not executed" });
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

setInterval(async () => {
  console.log("after every 3 second ");
  if (jobList != []) {
    console.log(jobList.length);
    console.log(jobList[ProcessIndex]);
    await test(jobList[ProcessIndex]);
    console.log("ProcessIndex", ProcessIndex);
  }
}, 3000);

if (index > 0) {
  for (let i = 0; i < index; i++) {
    console.log("Job list", jobList[i]);
  }
}
// 8080 PoRT to listen APP ------------------------------------------------>
app.listen(8080, () => {
  console.log("server started at 8080");
});
