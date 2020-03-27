const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newrole = new Schema({
    role: { type: String, isrequired: true ,unique:true}
}, { timstramp: true }
)

module.exports = Roles = mongoose.model("Roles", newrole);