const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandling");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);
const nodemailer = require("nodemailer");

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({ errors: firstError });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ errors: "Email is already taken." });
    }

    // Generate a JWT token for account activation
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '30m' }
    );

    // Create a transporter object using Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
      },
    });

    // Email data to send the activation link
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account Activation Link',
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p><a href="${process.env.CLIENT_URL}/auth/activate/${token}">Activate Account</a></p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    // Send the email with the defined transport object
    await transporter.sendMail(emailData);

    return res.json({
      message: `Email has been sent to ${email}. Please follow the link to activate your account.`,
    });

  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({
      errors: "Internal server error. Please try again.",
    });
  }
};

exports.activationController = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ errors: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err.message);
      return res.status(401).json({ errors: "Invalid or expired activation link." });
    }

    const { name, email, password } = decoded;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return res.status(400).json({ errors: "User already exists or account is already activated." });
      }

      // Create new user
      const newUser = new User({ name, email, password });

      await newUser.save();  // Save the user
      return res.status(201).json({ success: true, message: "Account activated successfully!" });

    } catch (saveErr) {
      console.log("Save error:", errorHandler(saveErr));
      return res.status(500).json({ errors: "Error saving user." });
    }
  });
};


exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist. Please signup",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "Email and password do not match",
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    });
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied.",
      });
    }

    req.profile = user;
    next();
  });
};
