const mongoose = require("mongoose");

const ScheduleList = new mongoose.Schema(
  {
    ScheduleID: { type: Number },
    OrganizationID: { type: Number },
    UserID: { type: Number },
    Feature:{type : String},
    Time : {type: Date}
  },
  { collection: "ScheduleList" }
);

const ModalScheduleList = mongoose.model("ScheduleList" , ScheduleList);
module.exports = ModalScheduleList;