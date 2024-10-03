const bcrypt = require("bcrypt");
const knexdb = require("../dbconnection/dbconnection");
const uuid = require("uuid");


const resolvers = {
    Query: {
        // users: async () => {
        //     const allUsers = await knexdb('users').select();
        //     return allUsers;
        // },
        // user: async (_, id) => {
        //     const checkUser = await knexdb("users").where(id).first();
        //     console.log(id)
        //     return checkUser;
        // },
    },

    Mutation: {
        signup: async (_, args) => {
            try {
              const { name, email, password } = args.input;
          
              console.log(name, email, password);
          
              const checkUser = await knexdb("users")
                .where("email", email);
          
              console.log(checkUser);
          
              if (checkUser.length > 0) {
                console.log('inside if');
                return {
                  error: {
                    message: "User already exists",
                    code : 400,
                    badrequest:"user al ready in data base "
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
          }



          
    },
};






module.exports = { resolvers };
