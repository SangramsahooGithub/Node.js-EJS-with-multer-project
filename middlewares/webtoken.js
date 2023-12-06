import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const auth = async (req, res, next) => {
  const token = req.cookie.jwt;
  const verify = JWT.verify(token, process.env.process.env.JWT_SECRET);
  console.log(verify);
  req.user = verify;
  next();
};

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.find();
//     if (user.role !== 1) {
//       return res.send("Admin access allow Only");
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
