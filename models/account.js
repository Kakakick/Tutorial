const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/bookstore');

const accountSchema = new mongoose.Schema({
    username: String,
    password: String
}, {
    collection: 'accounts'
})

const AccountModel = mongoose.model('account', accountSchema);


module.exports = AccountModel;