const mongoose = require("mongoose");

const FeatureList = new mongoose.Schema(
  {
    FeatureID: { type: Number },
    FeatureName: { type: String },
    Status: { type: String },
  },
  { collection: "FeatureList" }
);

const ModalFeatureList = mongoose.model("FeatureList" , FeatureList);
module.exports = ModalFeatureList;