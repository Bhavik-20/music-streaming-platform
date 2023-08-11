const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/helpers');

router.get('/users', async (req, res) => {
    
    const user_list = await UserModel.find();
    return res.status(200).json(user_list);
});

module.exports = router;