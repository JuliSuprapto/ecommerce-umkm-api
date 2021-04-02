const user = require("../model/user_model")
const toko = require("../model/toko_model")
const barang = require("../model/barang_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.addBarang = (data) =>
  new Promise((resolve, reject) => {
    barang
      .create(data)
      .then(() => {
        barang
          .find({ idUser: data.idUser })
          .then((res) => {
            let respMsg = Object.assign(requestResponse.common_success);
            respMsg["result"] = res;
            resolve(respMsg);
            console.log(respMsg)
          })
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.updateBarang = (id, data) =>
  new Promise((resolve, reject) => {
    barang
      .updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      ).then(() => {
        let respMsg = Object.assign(requestResponse.common_success);
        resolve(respMsg);
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.deleteBarang = (id) =>
  new Promise((resolve, reject) => {
    try {
      barang
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          let respMsg = Object.assign(requestResponse.common_success);
          resolve(respMsg);
        })
        .catch(() => {
          reject(requestResponse.common_error)
        })
    } catch (err) {
      console.log(err)
    }
  })

exports.hasBarang = (id) =>
  new Promise((resolve, reject) => {
    console.log(id)
    barang
      .find({ idUser: id })
      .then(datas => {
        if (datas.length > 0) {
          datanya = {
            status: true,
            rc: '0000',
            message: 'Ada Barang!'
          }
          let respMsg = Object.assign(datanya);
          respMsg["result"] = datas;
          resolve(respMsg);
          // console.log(respMsg)
        } else {
          reject({
            status: false,
            rc: '0000',
            message: 'Belum Ada Barang!'
          })
        }
      })
      .catch(err => reject(requestResponse.common_error))
  })

exports.getBarangById = (id) =>
  new Promise((resolve, reject) => {
    console.log(id)
    barang
      .find({ idUser: id })
      .then(datas => {
        if (datas.length > 0) {
          let respMsg = Object.assign(requestResponse.common_success);
          respMsg["result"] = datas;
          resolve(respMsg);
          console.log(respMsg)
        } else {
          reject(requestResponse.common_nodata)
        }
      })
      .catch(err => reject(requestResponse.common_error))
  })