const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema({
    username: String,
    password: Number
})

module.exports = mongoose.model('account', accountSchema);


