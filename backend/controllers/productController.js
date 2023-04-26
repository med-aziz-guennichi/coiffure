import Product from "../models/productModel.js";

// create Product

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all Products

export const getAllProduct = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

// get one Product

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  product ? res.send(product) : res.status(404).json("Product not found");
};

// get count Product

export const countProducts = async (req, res) => {
  try {
    const countAllProducts = await Product.countDocuments();
    res.status(200).json({ count: countProducts });
  } catch (error) {
    res.status(500).json(error);
  }
};

// update Product

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.body._id);

  if (product) {
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.secPrice = req.body.secPrice || product.secPrice;
    const updatedProduct = await product.save();
    res.send({
      _id: updatedProduct._id,
      title: updatedProduct.title,
      price: updatedProduct.price,
      secPrice: updatedProduct.secPrice,
    });
  } else {
    res.status(404).json("Product not found");
  }
};

// update Image
export const updateImages = async (req, res) => {
  if (req.body.productId === req.params.id) {
    try {
      await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Images has been updated");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Error!");
  }
};
