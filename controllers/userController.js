import userModel from "../model/userModel.js";
import importUsers from "../model/importUsers.js";
import { hashpassword, comparePassword } from "../utils/password.js";
import fs from "fs";
import JWT from "jsonwebtoken";
import json2csv from "json2csv";
const CsvParser = json2csv.Parser;
import csv from "csvtojson";






export const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.send({
        message: "Already Register please login",
      });
    }
    const hashedPassword = await hashpassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      image: req.file.filename,
    }).save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};









export const finduser = async (req, res) => {
  try {
    let data = await userModel.find();
    res.render("usersData", { users: data });
  } catch (error) {
    console.log(error.message);
  }
};








export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        message: "invalid credentials",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        message: "Email is not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
        message: "password not matched",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });
    // console.log(token);
    res.redirect("/usersData");
  } catch (error) {
    console.log(error);
  }
};





export const getsingleuser = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await userModel.findById({ _id: id });
    res.render("edituser", { user: data });
  } catch (err) {
    console.log(err.message);
  }
};




export const updateuser = async (req, res) => {
  try {
    let id = req.params.id;
    let { name, email } = req.body;
    let latestimage = req.file.filename;
    await userModel.findByIdAndUpdate(
      { _id: id },
      { name, email, image: latestimage }
    );
    res.redirect("/usersData");
  } catch (err) {
    console.log(err.message);
  }
};





export const exportdata = async (req, res) => {
  try {
    let users = [];
    let user = await userModel.find({});
    user.forEach((user) => {
      const { id, name, email } = user;
      users.push({ id, name, email });
    });
    let csvfields = ["id", "name", "email"];
    const csvparser = new CsvParser({ csvfields });
    const csvData = csvparser.parse(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment:filename=usersdata.csv");
    res.send(csvData);
  } catch (err) {
    console.log(err.message);
  }
};






export const importdata = async (req, res) => {
  try {
    var userdata = [];
    csv()
      .fromFile(req.file.path)
      .then(async (resp) => {
        // console.log(resp)
        for (let i = 0; i < resp.length; i++) {
          userdata.push({
            name: resp[i].name,
            email: resp[i].email,
          });
        }
        await importUsers.insertMany(userdata);
      });
    res.redirect("/showimportdata");
  } catch (err) {
    console.log(err.message);
  }
};






export const showimportdata = async (req, res) => {
  try {
    let data = await importUsers.find();
    res.render("showimportdata", { users: data });
  } catch (error) {
    console.log(error.message);
  }
};
