import express from "express";
import multer from "multer";
import {
  exportdata,
  finduser,
  getsingleuser,
  importdata,
  login,
  register,
  showimportdata,
  updateuser,
} from "../controllers/userController.js";
// import { isAdmin } from "../middlewares/webtoken.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/usersData", finduser);

router.get("/register", (req, res) => {
  res.render("register");
});





let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let myfile = `${file.fieldname + Date.now() + file.originalname}`;
    cb(null, myfile);
  },
});
let upload = multer({ storage: storage }).single("image");

router.post("/register", upload, register);






router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", login);

router.get("/edituser/:id", getsingleuser);
router.post("/edituser/:id", upload, updateuser);

router.get("/exportdata", exportdata);

router.get("/importusers", (req, res) => {
  res.render("importusers");
});

router.post("/importusers", upload, importdata);

router.get("/showimportdata", showimportdata);

export default router;
