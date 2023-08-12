const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const {getToken} = require('../utils/helpers');


router.get('/search', async (req, res) => {
    const searchTerm = req.query.searchTerm || "";
    console.log("searchTerm: ", searchTerm);   

    const users = await UserModel.find({username: {$regex: searchTerm, $options: "i"}});

    return res.json(users);
});

module.exports = router;
