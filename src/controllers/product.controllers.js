const ProductModel = require('../models/product.model');
const ClientModel = require('../models/client.model');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getProducts = async (req, res) => {
  const match = {};
  
  if(req.query.category){
    match.category = {$regex: req.query.category, $options: 'i'};
  }
  if(req.query.genre){
    match.genre = {$regex: req.query.genre, $options: 'i'};
  }
  if(req.query.keyword){
    match.name = {$regex: req.query.keyword, $options: 'i'};
  }
  if(req.query.sort){
    switch(req.query.sort){
      case 'az': match.sort = {name: 1};
      break;
      case 'za': match.sort = {name: -1};
      break;
      case 'low-high': match.sort = {price: 1};
      break;
      case 'high-low': match.sort = {price: -1};
      break;
      case 'best-sales': match.sort = {sales: -1};
      break;
      case 'newest': match.sort = {releaseDate: -1};
      break;
      case 'oldest': match.sort = {releaseDate: 1};
      break;
      default: match.sort = {...match, $sort: 1};
      break;
    }
  }
  const products = await ProductModel.find({...match}).sort(match.sort);
  res.send(products);
}

module.exports.allProduct = async (req, res) => {
  const products = await ProductModel.find();
  res.send(products);
}

module.exports.getLatestProduct = async (req, res) => {
  const products = await ProductModel.find({})
  .sort({releaseDate: -1})
  .limit(4)
  if (!products) {
    res.status(404);
    throw new Error('Latest products not found');
  }
  res.send(products);
}

module.exports.getBestSeller = async (req, res) => {
  const products = await ProductModel.find({})
  .sort({sales: -1})
  .limit(4)
  if (!products) {
    res.status(404);
    throw new Error('Best-seller products not found');
  }
  res.send(products);
}

module.exports.getBestSellerManager = async (req, res) => {
  const products = await ProductModel.find({})
  .sort({sales: -1})
  .limit(10)
  if (!products) {
    res.status(404);
    throw new Error('Best-seller products not found');
  }
  res.send(products);
}



module.exports.getTrend = async (req, res) => {
  const products = await ProductModel.find({})
  .sort({sales: -1})
  .limit(4)
  if (!products) {
    res.status(404);
    throw new Error('Trending products not found');
  }
  res.send(products);
}

module.exports.getDeals = async (req, res) => {
  const products = await ProductModel.find({price: {$lte: 10}})
  .sort({price: 0})
  .limit(4)
  if (!products) {
    res.status(404);
    throw new Error('Big Deals products not found');
  }
  res.send(products);
}

module.exports.getProduct = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  
  ProductModel.findById(
    req.params.id,
    (err, docs) => {
      if(!err) res.send(docs);
      else console.log(err);
    }
  )
}

module.exports.createProduct = async (req, res) => {
  const newProduct = new ProductModel({
    user: req.body.user,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    genre: req.body.genre,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    releaseDate: new Date().toISOString(),
  });
  try {
    const product = await newProduct.save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).send(err);
  }
  
};

module.exports.updateProduct = async (req, res) => {
    const {
      name,
      image,
      category,
      genre,
      description,
      price,
      countInStock,
    } = req.body;
    const bb = req.body;

    const product = await ProductModel.findById(req.params.id);

    if(!product){
      res.status(400);
      throw new Error("Product not found");
    }

    product.name = name;
    product.image = image;
    product.category = category;
    product.genre = genre;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    await product.save();

    res.send(product);
  };

module.exports.deleteProduct = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  
  ProductModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if(!err) res.send(docs);
      else console.log(err);
    }
  )
};

module.exports.updateRateProduct = async (req, res) => {
  const id = req.body.productId;
  const rate_ = req.body.rate;
  const product = await ProductModel.findById(id);
  product.rating.push(rate_);
  await product.save();
}