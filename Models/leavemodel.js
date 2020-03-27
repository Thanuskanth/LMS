const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newleave = new Schema(
     {
        startdate: { type: Date},
        enddate: { type: Date },
        reson: { type: String, isrequired: true },
        status: { type: String, default:"Pending" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", isrequired: true },
    },
{timstramp:true}
);
module.exports = Leaves = mongoose.model('Leaves', newleave);