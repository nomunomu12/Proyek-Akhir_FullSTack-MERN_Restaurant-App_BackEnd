const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("./utils/db/index");

const app = express();
const port = 8082;

const Pesanan = require("./models/pesanan/index");
const { urlencoded } = require("express");

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://127.0.0.1:27017";
const dbName = "Pesanan";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) return console.log("error");
});

app.get("/pesanan", async (req, res) => {
  const dataPesanan = await Pesanan.find();
  res.send(dataPesanan);
});

app.post("/pesanan", async (req, res) => {
  try {
    await Pesanan.create(req.body);
    res.status(200).send(req.body);
  } catch (error) {
    res.status(400).send("Pesanan gagal!!");
  }
});
app.delete("/pesanan/:id", async (req, res) => {
  try {
    await Pesanan.deleteOne({ "_id" : req.params.id });
    res.status(200).send("berhasil");
  } catch (error) {
    res.status(400).send("Pesanan gagal hapus!!");
  }
});
app.get("/pesanan/:id", async (req, res) => {
  try {
   const data =  await Pesanan.findOne({ "_id" : req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Pesanan gagal didapat!!");
  }
});

app.post("/pesanan/edit", async (req, res) => {
  try {
   const data = await Pesanan.updateOne({ "_id" : req.body._id }, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Pesanan gagal edit!!");
  }
});

app.post("/pesanan/checked/:id", async (req, res) => {
  try {
    await Pesanan.findOneAndUpdate({ _id: req.params.id },{isChecked: req.body.isChecked});
    res.status(200).send("berhasil");
  } catch (error) {
    res.status(400).send("Pesanan gagal hapus!!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
