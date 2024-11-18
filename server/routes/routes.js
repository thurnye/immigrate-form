const router = require('express').Router()
const formController = require('../controllers/formController')
const permission = require('../middlewares/auth');
const userController = require('../controllers/userController');


//SignUp User
router.post('/api/user', userController.postUser);

// Login User
router.post('/api/user/login', userController.getLogIn);


// save form route
router.post('/api/forms/save', permission.isAuth, formController.postForm);


// Retrieve all forms
router.post('/api/forms/list', formController.getFormList);


// Retrieve a form by its Id
router.get('/api/forms/:id', formController.getFormById);


// update a form by its id
router.post('/api/forms/update/:id',permission.isAuth, formController.updateForm);

module.exports = router;
