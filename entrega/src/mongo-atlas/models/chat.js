const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: { type: String, required: true, max: 100 },
    text: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    datetime: { type: Date, required: true}
});

const Chat = mongoose.model('chat', schema);

module.exports = Chat;