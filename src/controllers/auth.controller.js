const ClientModel = require('../models/client.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');


const maxAge = 200 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};


module.exports.signUp = async (req, res) => {
  const { username, email, password, manager } = req.body;

  try {
    const user = await ClientModel.create({ username, email, password, manager, wishlist: [] });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors })
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await ClientModel.login(email, password);

    const token = createToken(client._id);
    console.log(client);
    console.log(token);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ client: client._id });
  } catch (err) {
    console.log(err);
    res.status(404).send({ err });
  }
};



module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/');

}

module.exports.forgot_password = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await ClientModel.findOne({email});
    if (user) {

      user.password = password || user.password;
  
      const updateUser = await user.save();
  
      res.send({name: updateUser.name,});
    } else {
      res.status(404);
      throw new Error('User not found');
    }

  }catch (err){
    res.status(404);
    throw new Error('User not found');
  }

}

module.exports.updateUsername = async (req, res) => {
  const {email, username} = req.body;
  try{
    const user = await ClientModel.findOne({email});
    if (user) {

      user.username = username || user.username;
  
      const updateUser = await user.save();
  
      res.send({name: updateUser.name,});
    } else {
      res.status(404);
      throw new Error('User not found');
    }

  }catch (err){
    res.status(404);
    throw new Error('User not found');
  }

}

module.exports.updateUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await ClientModel.findOne({ email });

    if (user && password !== 'e') {
      user.username = username || user.username;
      user.password = password || user.password;

      const updateUser = await user.save();

      res.send({ name: updateUser.name });
    } else if (user && password === 'e') {
      user.username = username || user.username;
      await user.save();
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch {
    res.status(404);
    throw new Error('User not found');
  }
};



