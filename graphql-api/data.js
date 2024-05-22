const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represent a book written by author",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent the author of the book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const books = [
  { id: 1, name: "The Martian", authorId: 1 },
  { id: 2, name: "Artemis", authorId: 1 },
  { id: 3, name: "The Silent Patient", authorId: 2 },
  { id: 4, name: "The Guest List", authorId: 2 },
  { id: 5, name: "A Promised Land", authorId: 3 },
  { id: 6, name: "Dreams from My Father", authorId: 3 },
  { id: 7, name: "Atomic Habits", authorId: 4 },
  { id: 8, name: "The Power of Habit", authorId: 4 },
  { id: 9, name: "Educated", authorId: 5 },
  { id: 10, name: "The Glass Castle", authorId: 5 },
];

const authors = [
  { id: 1, name: "Andy Weir" },
  { id: 2, name: "Alex Michaelides" },
  { id: 3, name: "Barack Obama" },
  { id: 4, name: "James Clear" },
  { id: 5, name: "Tara Westover" },
];

module.exports = {
  books,
  BookType,
  authors,
  AuthorType,
};
