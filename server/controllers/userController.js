const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secretKey = 'MyTe$ting$ecritKey';
const SALT_ROUNDS = 6; // tell bcrypt how many times to randomize the generation of salt. usually 6 is enough.


//Creating A User
const postUser = async (req, res, next) => {
    try {
      const id = req.body.id;
      let savedUser = null;
      if (!req.body.email || !req.body.password) {
        res.status(400).json('Missing Field Needed!');
        return;
      }
      if (!id) {
        // Create New User
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          googleId: req.body.googleId,
        });
        savedUser = await newUser.save();
      }
      if (id) {
        // Update User
        const updateUser = await User.findById(id);
  
        if (!updateUser) {
          res.status(400).json('No User Found!!');
          return;
        }
  
        updateUser.firstName = req.body.firstName;
        updateUser.lastName = req.body.lastName;
        updateUser.email = req.body.email;
  
        savedUser = await updateUser.save();
      }
  
      const user = await User.findById(savedUser._id)
        .select('firstName lastName _id')
        .lean();
  
      const token = jwt.sign({ user }, secretKey, { expiresIn: '24h' });
      // send a response to the front end
      res.status(200).json(token);
    } catch (err) {
      console.log(err);
      res.status(400).json('Something went Wrong!');
    }
  };
  
  // Login a User
  const getLogIn = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email || !password) {
        res.status(400).json('Email or Password is Invalid!!');
        return;
      }
  
      // Find the user and select necessary fields
      const user = await User.findOne({ email })
        .select('firstName lastName email password')
        .lean();
  
      if (!user) {
        res.status(400).json('Email or Password is Invalid!!');
        return;
      }
  
      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json('Email or Password is Invalid!!');
        return;
      }
  
      const loggedUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
  
      const token = jwt.sign({ user: loggedUser }, secretKey, {
        expiresIn: '24h',
      });
      // send a response to the front end
      res.status(200).json(token);
    } catch (error) {
      console.log(error);
      res.status(400).json('Something went Wrong!!');
    }
  };


  module.exports = {
    postUser,
    getLogIn
  }