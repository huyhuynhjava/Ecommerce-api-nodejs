import AsyncHandler from "express-async-handler";
import Category from "../model/Category.js";

//@desc create a new category
//@route // GET api/v1/categories
//access private
export const createCategory = AsyncHandler(async (req, res) => {
  const { name} = req.body;
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    throw new Error("Category  already exists");
  } else {
    const category = await Category.create({
      name: name.toLowerCase(),
      image : req.file.path,
      user: req.userAuthId,
    });
    res.status(201).json({
      status: "success",
      msg: "Category created successfully",
      category,
    });
  }
});
//@desc get all categories
//@route // GET api/v1/categories
//access public
export const getAllCategory = AsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      categories,
      msg: "Categories fetched successfully",
    });
  } catch (error) {
    throw error;
  }
});
//@desc get one category
//@route // GET api/v1/categories
//access public
export const getcategory = AsyncHandler(async (req, res) => {
  const id = req.params.id;
    const category = await Category.findById(id);
    if(category){
      res.status(200).json({
        status: "success",
        category,
        msg: "Category fetched successfully",
      });
    }else throw new Error("category not found")
   

});
//@desc update category
//@route // GET api/v1/categories
//access private
export const updateCategory = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, image } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, image },
    { new: true }
  );
  if (!category) throw new Error("Category not found");
  else {
    res.status(200).json({
      status: "success",
      category,
      msg: "update category successfully",
    });
  }
});
//@desc delete category
//@route // GET api/v1/categories
//access private
export const deletecategory = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      msg: "Category deleted successfully",
    });
  } catch (error) {
    throw error;
  }
});
