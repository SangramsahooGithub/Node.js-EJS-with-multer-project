import bcrypt from "bcrypt";

//for hash the password
export const hashpassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedpassword = await bcrypt.hash(password, saltRound);
    return hashedpassword;
  } catch (err) {
    console.log(err);
  }
};




//for compare the password
export const comparePassword = async (password, hashedpassword) => {
  try {
    return bcrypt.compare(password, hashedpassword);
  } catch (err) {
    console.log(err);
  }
};
