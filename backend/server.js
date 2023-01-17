const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB = process.env.MONGODB;
const PORT = process.env.PORT || 5000;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb sucessfully");
    return server.listen({ port: PORT }).then((res) => {
      console.log(`server running at ${res.url}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
