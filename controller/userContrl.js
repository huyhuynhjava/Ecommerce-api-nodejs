import User from "../model/User.js";
import bcrypt from "bcryptjs";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import verifyToken from "../utils/verifyToken.js";

//@desc Regiter user
//@route // POST api/v1/users/register
//access Private/Admin ? public note
export const registerUserCtrl = AsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  //check user exists
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    throw new Error("User already exists");
  } else {
    //hash
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //create user
    const user = await User.create({ fullname, email, password: hashpassword });
    res.status(201).json({
      status: "success",
      msg: "User registerted successfully",
      data: user,
    });
  }
});

//@desc Login user
//@route // POST api/v1/users/login
//access public

export const loginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: "success",
      msg: "User login successfully",
      data: userFound,
      token: generateToken(userFound?.id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});
//@desc profile
//@route // Get api/v1/users/profile
//access private
export const getUserProfileCtrl = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate("orders");
  res.status(200).json({
    status: "success",
    user,
    msg: "User profile fetched successfully",
  })
  
});

//@desc update shipping address
//@route // Get api/v1/users/update/shipping
//access private

export const updateShippingAddressCtrl = AsyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, country } =
    req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.userAuthId,
      {
        ShippingAddress: {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          country,
        },
        hasShippingAddress: true,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      user: user,
      msg: "Shipping address updated successfully",
    });
  } catch (error) {
    throw error;
  }
});
