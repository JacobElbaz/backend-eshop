const jwt = require("jsonwebtoken");
const clientModel = require("../models/client.model");

module.exports.checkClient = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.client = null;
          // res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let client = await clientModel.findById(decodedToken.id);
          res.locals.client = client;
          next();
        }
      });
    } else {
      res.locals.client = null;
      next();
    }
  };


  module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } else {
      console.log('No token');
    }
  };
  