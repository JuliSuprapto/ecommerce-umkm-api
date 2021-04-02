"use strict";
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userController = require("../controller/user_controller");
var config = require("../config/config.json");
const fs = require("fs");
const uploadUtil = require("../utilities/uploadImg");
const fotoUser = uploadUtil.upload.single("fotoProfile")
const { requestResponse } = require("../setup");
const reqResponse = require("../setup");

module.exports = (router) => {
  router.get("/", (req, res) => res.end("Market Api!"));

  router.post("/users/signin", (req, res) => {
    try {
      userController
        .loginUser(req.body.username, req.body.password)
        .then((result) => {
          let username = result.message;
          userController
            .getProfile(username)
            .then((result) => {
              res.json(result);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    } catch (err) {
      console.log(err)
    }
  });


  router.post("/users/signup", (req, res) => {
    // const userProfile = req.files['user_photo']
    // if (userProfile !== undefined) {
    // 	Object.assign(req.body, {
    // 		user_photo: userProfile[0].filename
    // 	})
    // }
    // console.log(nik,nama,no_hp,role,password,token,user_photo,ktp_photo,kk_photo)
    userController
      .registerUser(req.body)
      .then((result) => {
        // if (userProfile !== undefined) {
        // 	ftp.sendToFtp(userProfile[0].path, 'user', userProfile[0].filename)
        // }
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put("/users/updateprofile/:id", fotoUser, (req, res) => {
    let id = req.params.id
    let data = req.body
    data.fotoProfile = req.file.filename;
    // console.log(data)
    userController
      .updateProfile(id, data)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  });

  router.post("/users/checkToken", (req, res) => {
    const email = req.body.email;
    const token = req.headers["x-access-token"];
    userController
      .checkToken(email, token)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.json(err));
  });

  router.get("/users/:key", (req, res) => {
    let key = req.params.key
    userController
      .getAllUSer(key)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  });

};
