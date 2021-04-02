"use strict";
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userController = require("../controller/user_controller");
const toko = require("../controller/toko_controller");
const barang = require("../controller/barang_controller");
var config = require("../config/config.json");
const fs = require("fs");
const uploadConf = require("../utilities/uploadImg");
const { requestResponse } = require("../setup");
const reqResponse = require("../setup");
const e = require("express");
const fields = uploadConf.upload.single('fotoBarang');
module.exports = (router) => {

  router.get("/", (req, res) => res.end("Market Api!"))

  router.post("/barang/addbarang", fields, (req, res) => {
    let data = req.body
    data.fotoBarang = req.file.filename;
    barang
      .addBarang(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put("/barang/update/:id", fields, (req, res) => {
    let id = req.params.id
    let data = req.body
    data.fotoBarang = req.file.filename;
    barang
      .updateBarang(id, data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.delete("/barang/deletebyid/:id", (req, res) => {
    barang
      .deleteBarang(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/barang/cekbarang/:id", (req, res) => {
    barang
      .hasBarang(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/barang/getbarangbyid/:id", (req, res) => {
    barang
      .getBarangById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

}