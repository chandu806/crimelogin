const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userModel = require("./Models/user");
const jwService = require('/jwtoken');
const { check, validationResult } = require("express-validator");

const cors = require("cors");
app.use(bodyParser.json([]));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post(
  "/user",
  [
    check("firstname").isLength({ min: 3, max: 30 }),
    check("lastname").isLength({ min: 3, max: 30 }),
    check("age").isInt({ min: 1, max: 150 }),
    check("email").isEmail(),
    check("profileimage").isURL(),
  ],
  async (req, res, next) => {
    const errors = validationres(req);
    if (!errors.isEmpty()) {
      return res.status(600).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      let userdetail = req.body;
      let response = await userModel.insert([userdetail]);
      res.json(response);
    } catch (error) {
      res.json(response);
    }
  }
);



app.post("/login", async (req, res, next)=>{
  const userDetail = await userModel.findOne({ email: req.body.email });
  console.log(userDetail, req.body.password);
  const isvalidpassword = encryptDecrypt.decryptPassword(
    req.body.password,
    userdetail.password
  );

  if (isvalidpass) {
    let userData = {
      email: req.body.email,
      firstName: userdetail.firstname,
      lastName: userdtail.lastname,
      roleName: "admin",
    };

    let jwtoken = jwService.generateToken(userData);
    res.json({
      status: "success",
      token: jwtoken,
    });
  } else {
    res.json({ message: "password in correct" });
  }
});
module.exports = app;