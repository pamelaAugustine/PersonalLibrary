const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    }

})

const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel;