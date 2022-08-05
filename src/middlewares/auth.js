const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const profilrModel = require("../models/profieModel");


exports.authenticated = function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    console.log(token);
    if (!token)
      return res.status(400).send({ status: false, msg: "Please enter token" });
    let token1 = token.split(" ").pop();
    console.log(token1);
    let decodedToken = jwt.verify(token1, "ahsjkjskgkjashuh2j2nmsnc");
    console.log(decodedToken);
    if (!decodedToken)
      return res
        .status(401)
        .send({ status: false, msg: "Please enter valid Token " });
    req.dtoken = decodedToken.userId;

   
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: err.message,
    });
  }
  next();
};
exports.authorization = async (req, res, next) => {
  try {
    let userId = req.params.userId
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "User id not valid" })
    const checkUser = await profilrModel.findOne({userId:userId})
    if (!checkUser) return res.status(404).send({ status: false, message: "User not found" })
    req.checkUser = checkUser
    if(userId!=req.dtoken) return res.status(403).send({ status: false, message: "user not authorized" })
    next();

  
  } catch (error) { //hardcoded them
      return res.status(500).send({ status: false, message: error.message })
  }
}



