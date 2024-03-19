import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConfig } from "../database/dbConfig.mjs";
import { createError } from "../utils/errors.js";
import validator from "validator";
import nodemailer from "nodemailer";
// import crypto from "crypto";

const salt = 10;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const getUsers = async (req, res) => {
  const sql = "SELECT * FROM user";
  dbConfig.connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Please Login" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token" });
      } else {
        req.user_type = decoded.user_type;
        next();
      }
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { user_name } = jwt.verify(
      req.params.token,
      process.env.EMAIL_SECRET
    );
    const sql = "UPDATE user SET is_verified = ? WHERE user_name = ?";
    dbConfig.connection.query(sql, [true, user_name], (err, result) => {
      if (err) {
        console.log("Error updating user:", err);
        return res.status(400).json({ error: "Error updating user" });
      }
      console.log("User confirmed:", result);
      return res.json({ Status: "User Confirmed. Please Login" });
      // return res.redirect("http://localhost:3000/login");
    });
  } catch (err) {
    console.log("Error confirming email:", err);
    return res.status(400).json({ error: "Error confirming email" });
  }
};

export const getToken = async (req, res) => {
  return res.json({ Status: "Success", user_type: req.user_type });
};

export const signup = async (req, res, next) => {
  try {
    //validation
    //check for requires fields
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
              return next(
                createError(500, "Error checking username existence")
              );
            }
            if (usernameResults.length > 0) {
              return next(createError(400, "Username already in use."));
            }

            const user_name = req.body.user_name;
            const token = jwt.sign(
              {
                user_name,
              },
              process.env.EMAIL_SECRET,
              { expiresIn: "1d" }
            );
            if (!token) {
              console.log("Error generating token");
              return res.status(400).jason({ error: "Error generating token" });
            } else {
              const url = `http://localhost:3000/confirmation/${token}`;
              transporter.sendMail(
                {
                  to: req.body.email,
                  subject: "Confirm Email",
                  html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
                },
                (err, info) => {
                  if (err) {
                    console.log("Error sending confirmation email:", err);
                    return res
                      .status(400)
                      .jason({ error: "Error sending confirmation email" });
                  } else {
                    console.log("Confirmation email sent:", info);
                    return res
                      .status(200)
                      .jason({ error: "Confirmation email sent" });
                  }
                }
              );
            }

            // Update user data into the database
            const sql =
              "INSERT INTO user (user_name, email, password, gender, phone_number, region, user_type) VALUES (?)";
            const values = [
              req.body.user_name,
              req.body.email,
              hash,
              req.body.gender,
              req.body.phone_number,
              req.body.region,
              req.body.user_type,
            ];

            dbConfig.connection.query(sql, [values], (err, result) => {
              if (err) return res.json(err);
              console.log("Created user");
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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please add email and password."));
    }

    const user = "SELECT * FROM user WHERE email =?";

    dbConfig.connection.query(user, email, (err, data) => {
      if (err)
        return res.status(500).json({ message: "Internal server error." });

      if (data.length > 0) {
        bcrypt.compare(password.toString(), data[0].password, (err, result) => {
          if (err) return res.json(err);
          if (result) {
            if (data[0].is_verified === 1) {
              const id = data[0].user_id;
              const user_type = data[0].user_type;
              const token = jwt.sign(
                {
                  id,
                  user_type,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              res.cookie("token", token);
              console.log("Login successful");
              return res.status(200).json({ Status: "Login successful" });
            } else {
              return res
                .status(400)
                .json({
                  message: "Email not verified. Please check you mailbox.",
                });
            }
          } else {
            return res.status(400).json({ message: "Incorrect password" });
          }
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};
