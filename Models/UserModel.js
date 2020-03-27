const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newuser = new Schema({
    username: { type: String, isrequired: true },
    email: { type: String, isrequired: true ,unique:true},
    password: { type: String, isrequired: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", isrequired: true },
}, { timstramp: true }
);
module.exports = Users = mongoose.model('Users', newuser);