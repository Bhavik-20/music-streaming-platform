const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken, getUserFromToken} = require('../utils/helpers');

router.put('/update-profile', async (req, res) => {
    const {email, firstName, lastName, username} = req.body.profile;
    // console.log("Update Profile called: ", req.body.profile);
    const user = await UserModel.findOne({email: email});
    if(user) {
        if(user.username != username){
            const usernameExist = await UserModel.findOne({username: username});
            if(usernameExist)
            {
                return res.status(403).json({err: "This Username already exists"});
            }
        }
        
        const newUserData =  {email: email, firstName: firstName, lastName: lastName, username: username};
        const newUser = await UserModel.findOneAndUpdate({email: email}, newUserData);

        const userToReturn = newUser.toJSON(); 
        return res.status(200).json(userToReturn);
        
    } else {
        return res.status(403).json({err: "User does not exist"});
    }
});

router.post('/getProfile', async (req, res) => {
    
    const {token} = req.body;
    // console.log("Getting Profile called 1: ", req.body);

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