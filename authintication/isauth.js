// const jwttoken=require("jsonwebtoken")
const {jwtsecretkey}=require("../constent")
const knexdb=require("../dbconnection/dbconnection")

export const authenticateToken = async (token) => {
    if (token) {
        try {
            // Verify the token with your secret key

            const decodedToken = jwt.verify(token,jwtsecretkey);

            const {id} =decodedToken
        
            const user = await knexdb("users")
            .where('id',id)
            .first()

            if(!user){
                return{
                    error:{
                        message:"user is not exitst"
                    }
                }
            }
            
                req.user = user

           return user 


        } catch (error) {
            console.log('Token verification failed:', error.message);
            throw new Error('Authentication failed');
        }
    }
    // If no token is provided, throw an authentication error
    throw new Error('No token provided');
};