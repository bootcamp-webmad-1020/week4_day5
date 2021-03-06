// models/book.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    description: String,
    rating: Number,
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'Author'       // nombre del modelo asociado
    }]
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
