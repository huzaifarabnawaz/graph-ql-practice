const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./user/user");
const { authenticateToken } = require("./authintication/isauth");

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const authheaders = req.headers.authorization || "";

    if (authheaders) {
      const token = authheaders.split(" ")[1];
    
    try{

      const user=authenticateToken(token)

      // return{
      //   name:user.name,
      //   email:user.email,
      //   password:user.password
      // }

    }
    catch(error){
      console.log("token",error)
      throw error
    }
    
    
    }
  
  },

});

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },

      context:async({req,res})=>({token:req.headers.authorization, cookie:res})

    });
    console.log(`Server is running at ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();











// import "dotenv/config"

// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { resolvers } from "./graphql/resolvers.js";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { cookie } from "express-validator";

// const PORT = process.env.PORT || 4000



// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// })

// const { url } = await startStandaloneServer(server, {
//     context: async ({ req, res }) => ({ token: req.headers.authorization, cookies: res }),
//     listen: { port: PORT } 
// })

// console.log(`Running at ${url}`)