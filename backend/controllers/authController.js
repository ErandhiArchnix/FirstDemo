import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConfig } from "../database/dbConfig.mjs";
import { createError } from "../utils/errors.js";
import validator from "validator";
// import crypto from "crypto";

const salt = 10;

export const getUsers = async (req, res) => {
  const sql = "SELECT * FROM user";
  dbConfig.connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const signup = async (req, res, next) => {
  try {
    //validation
    if (!req.body.user_name || !req.body.email || !req.body.password) {
      return next(createError(400, "Please fill in all the required fields."));
    }

    //check whether the email is a valid one
    if (!validator.isEmail(req.body.email)) {
      return next(createError(400, "Email is not valid"));
    }

    //check whether the password is strong enough
    if (!validator.isStrongPassword(req.body.password)) {
      return next(createError(400, "Password not strong enough"));
    }

    // Hash the password
    const hash = await bcrypt.hash(req.body.password.toString(), salt);

    const emailCheckQuery = "SELECT * FROM user WHERE email = ?";
    const usernameCheckQuery = "SELECT * FROM user WHERE user_name = ?";

    console.log("Email check query:", emailCheckQuery);
    console.log("Email:", req.body.email);

    console.log("Username check query:", usernameCheckQuery);
    console.log("Username:", req.body.user_name);

    dbConfig.connection.query(
      emailCheckQuery,
      [req.body.email],
      (emailErr, emailResults) => {
        if (emailErr) {
          console.error("Error checking email existence:", emailErr);
          return next(createError(500, "Error checking email existence"));
        }
        if (emailResults.length > 0) {
          return next(createError(400, "Email already in use."));
        }

        // Email doesn't exist, check for username
        dbConfig.connection.query(
          usernameCheckQuery,
          [req.body.user_name],
          (usernameErr, usernameResults) => {
            if (usernameErr) {
              console.error("Error checking username existence:", usernameErr);
              return next(createError(500, "Error checking username existence"));
            }
            if (usernameResults.length > 0) {
              return next(createError(400, "Username already in use."));
            }

            // Insert user data into the database
            const sql =
              "INSERT INTO user (`user_name`, `email`, `password`) VALUES (?)";
            const values = [req.body.user_name, req.body.email, hash];
            dbConfig.connection.query(sql, [values], (err, result) => {
              if (err) return res.json(err);
              console.log("Success");
              return res.status(200).json({ Status: "Success" });
            });
          }
        );
      }
    );
  } catch (err) {
    next(err);
  }
};
