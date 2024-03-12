import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from 'mysql';
import dotenv from 'dotenv';

// import validator from "validator";
// import crypto from "crypto";

const salt = 10;

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASE,
    database: process.env.DB_NAME
});

export const signup = async (req, res, next) => {
   try {
      const sql = "INSERT INTO user (`user_name`, `email`, `password`) VALUES (?)";
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({Error: "Error for hasing password"});
        const values = [
            req.body.user_name,
            req.body.email,
            req.body.password
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json(err);
            return res.json({Status: "Success"});
        })
      })

    //   //validation
    //   if (!username || !email || !password) {
    //      return next(
    //         createError(400, "Please fill in all the required fields.")
    //      );
    //   }

    //   //check whether the email is a valid one
    //   if (!validator.isEmail(email)) {
    //      return next(createError(400, "Email is not valid"));
    //   }

    //   //check whether the password is strong enough
    //   if (!validator.isStrongPassword(password)) {
    //      return next(createError(400, "Password not strong enough"));
    //   }

    //   //check if user exists
    //   const userEmailExists = await User.findOne({ email });
    //   const userNameExists = await User.findOne({ username });

    //   if (userEmailExists) {
    //      return next(createError(400, "Email already in use."));
    //   }
    //   if (userNameExists) {
    //      return next(createError(400, "Name already in use."));
    //   }

      

    //   const token = jwt.sign(
    //      {
    //         id: user._id,
    //         isAdmin: user.isAdmin,
    //         isTeacher: user.isTeacher,
    //      },
    //      process.env.JWT_SECRET,
    //      { expiresIn: "1d" }
    //   );
   } catch (err) {
      next(err);
   }
};