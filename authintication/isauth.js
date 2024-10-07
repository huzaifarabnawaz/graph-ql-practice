const jwt = require('jsonwebtoken');
const { jwtsecretkey, password } = require("../constent"); 
const knexdb = require("../dbconnection/dbconnection");

const authenticateToken =async (token) => {

  try {
    if(token){
      const splittoken=token.split(" ")[1]

      console.log(splittoken)

    const decoded = jwt.verify(splittoken,jwtsecretkey);
    
    // console.log("this is decoded",decoded)

    const{id}=decoded

    const user = await knexdb("users")
    .where("id",id)
    .first();

    // console.log("isauth user",user)  

    if (!user) {
        console.log("check the user data")

      return{

        error:{

          message:"user not found"
        }

      }

    }

    return{
      name:user.name,
      email:user.email,
      password:user.password
    }

  }
  return{message: "token not found"}
    

  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    throw new Error("Authentication failed");

};
}

module.exports = { authenticateToken };



