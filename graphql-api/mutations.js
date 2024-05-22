const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const { BookType, books } = require("./data");

// create root type for performing mutation ( add, delete, update)
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Adding  a single book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_parent, args) => {
        const foundBookIdx = books.findIndex((book) => book.id === args.id);
        books[foundBookIdx] = { ...args };
        return books[foundBookIdx];
      },
    },
    removeBook: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_parent, args) => {
        const bookIndex = books.findIndex((book) => book.id === args.id);
        const deletedBook = books.splice(bookIndex, 1);
        return deletedBook;
      },
    },
  }),
});

module.exports = {
  RootMutationType,
};
