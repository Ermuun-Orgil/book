const mongoose = require('mongoose');

const { Schema } = mongoose;

const url = 'mongodb+srv://ermuun:animemanga10@cluster0.8befs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url);

const blogSchema = new Schema({
    title: String,
    author: String,
    comments: String,
});

const Books = mongoose.model('Books', blogSchema);

const newBook = new Books({
    title: 'Harry Potter',
    author: 'J. K. Rowling',
    comments: 'Good book',
});
newBook.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
});