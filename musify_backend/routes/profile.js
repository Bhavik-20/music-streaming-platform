const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken, getUserFromToken} = require('../utils/helpers');

router.put('/edit-profile', async (req, res) => {
    const {email, role, firstName, lastName, username} = req.body;

    const user = await UserModel.findOne({email: email});
    if(user && user.username != username) {
        const usernameExist = await UserModel.findOne({username: username});
        if(usernameExist)
        {
            return res.status(403).json({err: "Username already exists"});
        } else {
            const newUserData =  {email, firstName, lastName, username, role};
            const newUser = await UserModel.create(newUserData);

            const token = await getToken(email, newUser);

            const userToReturn = {...newUser.toJSON(), token}; 
            return res.status(200).json(userToReturn);
        }  
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData =  {email, password: hashedPassword, firstName, lastName, username};
    const newUser = await UserModel.create(newUserData);

    const token = await getToken(email, newUser);

    const userToReturn = {...newUser.toJSON(), token}; 
    delete userToReturn.password; 
    return res.status(200).json(userToReturn);
});

router.post('/getProfile', async (req, res) => {
    
    const {token} = req.body;
    console.log("Getting Profile called 1: ", req.body);

    const user_id = await getUserFromToken(token);
    // console.log("Getting Profile called 2");

    const user = await UserModel.findOne({_id: user_id});
    // console.log("Getting Profile called 3");

    if(!user) {
        console.log("backend error");
        return res.status(403).json({err: "User does not exist"});
    }
    return res.status(200).json(user);
});

module.exports = router;