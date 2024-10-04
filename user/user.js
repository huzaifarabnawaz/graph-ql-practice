const bcrypt = require("bcrypt");
const knexdb = require("../dbconnection/dbconnection");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const {jwtsecretkey} = require("../constent");

const resolvers = {
  Mutation: {
    
    signup: async (_, args) => {
      try {
        const { name, email, password } = args.input;

        console.log(name, email, password);

        
        const checkUser = await knexdb("users").where("email", email);

        if (checkUser.length > 0) {
          return {
            error: {
              message: "User already exists",
              code: 400,
              badrequest: "User already in database"
            }
          };
        }

        
        const passwordHash = await bcrypt.hash(password, 10);

        const [newUser] = await knexdb("users")
          .insert({
            id: uuid.v4(),
            name: name,
            email: email,
            password: passwordHash,
          })
          .returning(["id", "name", "email"]);

        
        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password:newUser.password
        };

      } catch (error) {
        console.error("Error occurred:", error);
        throw new Error("Internal server error");
      }
    },

    
    login: async (_, args) => {
      try {
        const { email, password } = args.input;

        
        const user = await knexdb("users")
        .where("email", email)
        .first();

        if (!user) {
          return {
            error: {
              message: "User not found in database"
            }
          };
        }

    
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return {
            error: {
              message: "Password not matched"
            }
          };
        }

        
        const token = jwt.sign({ id: user.id }, jwtsecretkey);

        console.log(user)
        return {
            token,
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password
        };

      } catch (error) {
        console.log("Error occurred:", error);
        throw new Error("Internal server error");
      }
    }
  }
};

module.exports = { resolvers };
