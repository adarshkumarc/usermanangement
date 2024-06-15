const UserModel = require("../models/user.models");
const { userRegistrationValidation } = require("../validation");
const { loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const utils = require("../lib/utils");

exports.createUser = async (req, res) => {
  try {
    //* const firstName =req.body.firstName
    // const lastName = req.body.lastName
    // const email = req.body.email
    // const password = req.body.password
    // if(!firstName || !lastName || !email || !password){
    //     return res.status(200).json({
    //         code: 200,
    //         success: false,
    //         status: "Bad request",
    //         message: "pls Fill all field",

    //       });
    //* }

    const body = req.body;
    const { error } = userRegistrationValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }
    const checkEmail = await UserModel.findOne({
      email: req.body.email,
    });
    if (checkEmail) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "email already available",
      });
    }
    console.log(req.body);
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    //token create
    const token = utils.generateAuthToken(user);
    console.log("success");
    if (!user) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not success",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        token: token.token,
        expireIn: token.expires,
        data: token.sub,
        message: "user created successfuly",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const body = req.body;
    const { error } = loginValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({
      email,
    }).select("+password");
    if (!user) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not valied user",
      });
    }
    const token = utils.generateAuthToken(user);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password //110,111,112,113 line ask
    );
    if (!validPassword) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: `invalied password with this email:${email}`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        token: token.token,
        expireIn: token.expires,
        data: token.sub,
        message: "user found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.jwt.sub.id);
    const users = await UserModel.find();
    if (!users) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not valied user",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "user found",
        data: users,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await UserModel.findByIdAndUpdate(id, newUser, { new: true });
    if (user) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "User Updated",
        data: user,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "Invalied user id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "User deleted",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "Invalied user id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not valied user",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "user found",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};