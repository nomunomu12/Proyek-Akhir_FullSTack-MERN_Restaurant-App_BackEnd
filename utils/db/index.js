const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Pesanan", (err) => {
  if (err) console.log("GAGAL TERHUBUNG KE DATABASE");
});
