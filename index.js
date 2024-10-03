// server.js
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./user/user");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 }
    });
    console.log(`Server is running at ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
