const express = require('express');
const {registerUser, signInUser, dashboard, logout} = require('../controllers/auth');
const  authenticateToken  = require('../middleware/authMiddleware');
const router = express.Router();

//Registration route
router.post('/register', registerUser);

//Sign in route
router.post('/login', signInUser);

//logout
router.get('/logout',logout);

//dashbord route
router.get('/dashboard',authenticateToken,dashboard)





module.exports = router;

