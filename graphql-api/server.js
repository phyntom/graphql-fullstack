const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { RootMutationType } = require("./mutations");
const { RootQueryType } = require("./query");
const cors = require("cors");

const app = express();
const PORT = process.env.port || 3000;

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`server started from port ${PORT} ...`);
});
