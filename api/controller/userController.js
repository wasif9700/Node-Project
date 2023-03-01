const jwt = require("jsonwebtoken");
const skey = "wwaassiiff";
const User = require("../models/user.model");
const path = require("path");

// SIGNUP //

const signup = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already Exists",
      });
    } else {
      // console.log(req.file.path);
      // if (req.file) {
      //   req.body.image = req.file.path;
      // }

      const newUser = new User(req.body);
      await newUser.save();
      // const token = jwt.sign({ email }, skey);
      return res.status(200).json({
        message: "User Created : " + email
      });
      // return res.status(200).json({
      //   message: "Signup successful",
      // });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while signing up",
    });
  }
};

// LOGIN //

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ email }, skey);
      // res.cookie('token',token,{
      //   expires : new Date(Date.now() + 25892000000),
      //   httpOnly : true
      // })
      return res.status(200).json({
        message: "User Login : " + email,
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "Not Login Check Username and Password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error logging in user",
    });
  }
};

// Show All USER //
const showusers = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const users = await User.find(req.body);
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Show one User//
const showuser = async (req, res) => {
  const users = await User.findOne({email:req.email});
  console.log(users);
  try {
    res.send(users);
  } catch (error) {
    res.status(404).json({
      message:"Token Missing",
      error
    });
  }
};
/// Update User //
const updateuser = (req, res) => {
  const { email, password,firstName,lastName,mobile } = req.body;
  const filter = {
    email: req.email,
  };
  User.updateOne(
    filter,
    { $set: { email: email, password: password,firstName:firstName,lastName:lastName,mobile:mobile } },
    (err, response) => {
      if (err) {
        return res.status(404).json({
          message: "Not updated",
        });
      } else {
        const token = jwt.sign({ email }, skey);
        return res.status(200).json({
          message: "sucessfully updated",
          token,
        });
      }
    }
  );
};

// Delete User //

const deleteuser = (req, res) => {
  const filter = {
    email: req.email,
  };
  User.deleteOne(filter, (err, response) => {
    if (err) {
      return res.status(404).json({
        message: "Not Deleted",
      });
    } else {
      return res.status(200).json({
        message: "sucessfully Deleted",
      });
    }
  });
};

//Upload Image //

const uploadimg = async (req, res) => {
  if (req.body.file === "") {
    return res.status(404).json({
      message: "Please Add Image",
    });
  } else {
    User.findOne({ email: req.email }, (err, user) => {
      if (err) {
        return res.status(404).json({
          message:"Error",
          err
        });
      } else if (!user) {
        return "user not found";
      } else {
        user.image = req.file.path;
        user.save((err) => {
          if (err) {
            return res.status(404).json({
              message:"Error",
              err
            });
          } else {
            return res.status(200).json({
              message: "image uploded",
            });
          }
        });
      }
    });
  }
};

module.exports = {
  login,
  signup,
  showusers,
  updateuser,
  showuser,
  deleteuser,
  uploadimg,
};
