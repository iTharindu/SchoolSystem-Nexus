let mongoose = require('mongoose');

let paymentSchema = mongoose.Schema({
    student:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    amount:{
        type: Number,
        required: true
    },


});


var Payment= module.exports= mongoose.model('Payment', paymentSchema);