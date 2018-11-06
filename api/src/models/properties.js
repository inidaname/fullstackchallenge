const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
    trim: true
  },
  propertyType: {
    type: String,
    trim: true,
    required: true
  },
  propertyStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  },

}, {
  autoIndex: true
});

module.exports = mongoose.model("Properties", propertySchema, "Properties");
