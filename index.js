
const express = require('express');
const app = express();
const port = 3000;
const { ApolloServer, gql } = require('apollo-server');

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

const typeDefs = gql`
    type Book {
    title: String
    author: String
    comments: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
        books: async () => await Books.find(),
    },
};

app.get('/', (req, res) => {
    res.send('server connected')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});