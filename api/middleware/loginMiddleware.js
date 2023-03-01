const jwt = require("jsonwebtoken");
const skey = "wwaassiiff";

exports.isLogin = (req, res, next) => {
  if (req.headers && req.headers.token) {
    let decoded = jwt.verify(req.headers.token, skey);
    req.email = decoded.email;
    console.log(req.email);
    next();
  } else {
    res.status(404).json({
      message: "Not Entered Check Token",
    });
  }
};
