const mongoose = require("mongoose");

const Pesanan = mongoose.model("pesanans", {
  name: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

module.exports = Pesanan;
