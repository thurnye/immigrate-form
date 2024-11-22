const Form = require('../models/formModel');
const jwt = require('jsonwebtoken');
const validate = require('validate.js');

const secretKey = 'MyTe$ting$ecritKey';

const constraints = {
  name: {
    presence: { allowEmpty: false },
    length: {
      minimum: 5,
      message: 'must be at least 5 characters',
    },
  },
  email: { presence: { allowEmpty: false }, email: true },
  phone: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^\+?[1-9]\d{1,14}$/, //  phone number format (E.164)
      message: 'must be a valid phone number',
    },
  },
};

// Save Form
const postForm = async (req, res) => {
  try {
    console.log(req.body)
    const { formName, formData } = req.body;
    const errors = validate(formData, constraints);

    // will adjust the error handling later
    // if (!formName || errors) {
    //   return res
    //     .status(400)
    //     .json({ errors: errors ? errors : 'Missing form Data' });
    // }


    // console.log(req.body)

    // const newForm = new Form({
    //   formName,
    //   formData: formData,
    // });

    // savedForm = await newForm.save();

    // const token = jwt.sign({ savedForm }, secretKey, { expiresIn: '24h' });

    // res.status(200).json(savedForm);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// List Forms
const getFormList = async (req, res) => {
  try {
    console.log(req.body);
    const count = await Form.find().countDocuments();
    const perPage = req.body.perPage || 9;
    const page = req.body.currentPage || 1;

    const forms = await Form.find()
    .select('formName createdAt').lean()
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const data = {
      forms,
      count: Math.ceil(count / perPage),
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get Forms by ID
const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const formData = await Form.findById(formId);

    if (!formData) {
      res.status(404).json({
        message: 'Data not Found!',
      });
    }

    res.status(200).json(formData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// update Form
const updateForm = async (req, res) => {
  try {
    const formId = req.params.id;

    const { formName, formData } = req.body;
    const existingData = await Form.findById(formId);

    if (!existingData) {
      return res.status(404).json({
        message: 'Data not Found!',
      });
    }

    // Perform validation on formData (use validate.js or any other library)
    const errors = validate(formData, constraints);

    if (!formName || errors) {
      return res.status(400).json({ errors: errors || 'Missing form Data' });
    }

    existingData.formName = formName;
    existingData.formData = formData;

    const updatedFormData = await existingData.save();
    return res.status(200).json(updatedFormData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  postForm,
  getFormList,
  getFormById,
  updateForm,
};
