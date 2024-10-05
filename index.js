
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./user/user");
const { authenticateToken } = require("./authintication/isauth");

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    let user = null;

    if (token) {
      try {
        
        user = await authenticateToken(token.split(" ")[1]);
        console.log(user)
      } catch (error) {
        console.log(error);
        console.log("Authentication failed");
        throw error;
      }
    }

    return {
      name:user.name,
      email:user.email,
      password:user.password
    };  
  },
});

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`Server is running at ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
