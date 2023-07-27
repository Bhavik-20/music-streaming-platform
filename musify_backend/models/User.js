const mangoose = require('mongoose');

const UserSchema = mangoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:false
    },
    likedSongs: {
        type: String,
        default: "",
    },
    subscribedArtists: {
        type: String,
        default: "",
    },
});

const UserModel = mangoose.model('User', UserSchema);

module.exports = UserModel;