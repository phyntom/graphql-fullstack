const { GraphQLObjectType, GraphQLInt, GraphQLList } = require("graphql");
const { BookType, books, AuthorType } = require("./data");

// creating root query type for querying the graph
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_parent, args) => {
        return books.find((book) => book.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "This represent all the authors",
      resolve: () => authors,
    },
  }),
});

module.exports = {
  RootQueryType,
};
