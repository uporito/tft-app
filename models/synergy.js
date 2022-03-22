const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const synergySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    champions : {
        type : Array,
        required : true
    }
}, { timestamps : true });

const Synergy = mongoose.model('Synergy', synergySchema);

module.exports = Synergy;