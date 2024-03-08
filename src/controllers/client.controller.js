const ClientModel = require('../models/client.model');
const Product = require('../models/product.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const clients = await ClientModel.find().select('-password');
  res.status(200).json(clients);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  ClientModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID unknown : ' + err);
  }).select('-password');
};

module.exports.updateWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  
  const client = await ClientModel.findById(userId);
  
  if (client) {
    const alreadyExisted = client.wishlist.find(
      (wish) => wish._id.toString() === productId
    );
    if (!alreadyExisted) {
      const product = await Product.findById(productId);
      client.wishlist.push(product);
    } else {
      client.wishlist = client.wishlist.filter((wish) => {
        return wish._id.toString() !== productId;
      });
    }
    
    await client.save();
    

    res.send(client.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
module.exports.addWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  
  const client = await ClientModel.findById(userId);
  
  if (client) {
      const product = await Product.findById(productId);
      const productObj = product.toObject();
      client.wishlist.push({productObj});
    await client.save();
    

    res.send(client.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports.removeWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  
  const client = await ClientModel.findById(userId);
  
  if (client) {
      client.wishlist = client.wishlist.filter((wish) => {
        return wish._id.toString() !== productId;
      });
    await client.save();
    

    res.send(client.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports.updateUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await ClientModel.findOne({ email });

    if (user && password !== 'e') {
      user.username = username || user.username;
      user.password = password || user.password;

      const updateUser = await user.save();

      res.send({ name: updateUser.name });
    } else if (user && password !== 'e') {
      user.username = username || user.username;
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports.updatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await ClientModel.findOne({ email });
    if (user) {
      user.password = password || user.password;

      const updateUser = await user.save();

      res.send({ name: updateUser.name });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports.updateUsername = async (req, res) => {
  const { email, username } = req.body;
  console.log(email);
  try {
    const user = await ClientModel.findOne({ email });
    console.log(user);
    if (user) {
      user.username = username || user.username;

      const updateUser = await user.save();

      res.send({ name: updateUser.name });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  ClientModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log(err);
  });
};
