import AsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";
//@desc Create new product
//@route // POST api/v1/users/products
//access private/Admin
export const createProduct = AsyncHandler(async (req, res) => {
  const { name, decription, brand, category, sizes, colors, price, totalQty } =
    req.body;
  const files = req.files.map(file => file.path);
  const productexist = await Product.findOne({ name });
  if (productexist) throw new Error("Product already exists");
  const product = new Product({
    name,
    decription,
    brand: brand.toLowerCase(),
    category: category.toLowerCase(),
    sizes,
    colors,
    user: req.userAuthId,
    images : files,
    price,
    totalQty,
  });

  const categoryFound = await Category.findOne({
    name: category.toLowerCase(),
  });
  if (!categoryFound)
    throw new Error("Your shop does not have category " + category);
  else
    await Category.updateOne(
      { name: category.toLowerCase() },
      { $push: { products: product } }
    );

  const brandFound = await Brand.findOne({ name: brand.toLowerCase() });
  if (!brandFound) throw new Error("Your shop does not have brand " + brand);
  else
   await Brand.updateOne(
      { name: brand.toLowerCase() },
      { $push: { products: product } }
    );
    product.save();
  res.status(201).json({
    status: "success",
    msg: "Product created successfully",
    product,
  });
});
//@desc get all products or filter
//@route // GET api/v1/users/products
//access public
export const getAllProduct = async (req, res) => {
  //search by price
  let productQuery = Product.find();
  if (req.query.price) {
    productQuery = productQuery.find({
      price: {
        $gte: req.query.price.split("-")[0],
        $lte: req.query.price.split("-")[1],
      },
    });
  }
  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  //search by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  //search by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  //search by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  //search by color
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }
  //pagination
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  productQuery = productQuery.skip(startIndex).limit(limit);
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  const products = await productQuery.populate("reviews");
  res.status(200).json({
    status: "success",
    total,
    results: products.length,
    pagination,
    msg: "Product fetch successfully",
    products,
  });
};
//@desc get one product
//@route // GET api/v1/users/products/:id
//access public
export const getOneProduct = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("reviews");;
  if (!product) throw new Error("Product not found");
  else {
    res.status(200).json({
      status: "success",
      product,
      msg: "Product fetch successfully",
    });
  }
});
//@desc update product
//@route // PUT api/v1/users/products/:id
//access private/admin
export const updateProduct = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, decription, brand, category, sizes, colors, price, totalQty } =
    req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, decription, brand, category, sizes, colors, price, totalQty },
    { new: true }
  );
  if (!product) throw new Error("Product not found");
  else {
    res.status(200).json({
      status: "success",
      product,
      msg: "update product successfully",
    });
  }
});
//@desc delete product
//@route // delete api/v1/users/products/:id
//access private/admin

export const deleteProduct = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id)
    const category = await Category.findOne({name : product.category})
    const brand = await Brand.findOne({name : product.brand})
    if(category || brand) {
     const indexC =  category?.products?.indexOf(id);
     const indexB =  brand?.products?.indexOf(id);
     category?.products?.splice(indexC, 1);
     brand?.products?.splice(indexB, 1);
     const cate = await category?.save();
     const brand1 = await brand?.save();
    }
    res.status(200).json({
      status: "success",
      msg: "Delete successfully",
    });
  } catch (error) {
    throw error;
  }
});
