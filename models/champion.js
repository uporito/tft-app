const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const championSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    synergies : {
        type : Array,
        required : true
    },
    cost : {
        type : Number,
        required : true
    }
}, { timestamps : true });

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;