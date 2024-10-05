const jwt = require('jsonwebtoken');
const { jwtsecretkey } = require("../constent"); 
const knexdb = require("../dbconnection/dbconnection");

const authenticateToken =async (token) => {
  try {
    
    const decoded =jwt.verify(token,jwtsecretkey);
    
    const{id}=decoded
    console.log(id)

    const user = await knexdb("users")
    .where("id",id)
    .first();
    
    console.log(user)

    if (!user) {
        console.log("check the user data")
      throw new Error("Invalid user");
    }

    return user;  

  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    throw new Error("Authentication failed");
  }
};

module.exports = { authenticateToken };



