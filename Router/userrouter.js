const express = require('express');
const {signup,signin,getuser} = require('../controller/controller.js');
const jwtAuth = require("../middleware/jwtauth.js")
const router = express.Router();

router.post('/sign', signup);
router.post('/signin',signin);
router.get('/user',jwtAuth,getuser)

module.exports = router;