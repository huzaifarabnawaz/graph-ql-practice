const {jwtsecretkey}=require("../constent")
const knexdb=require("../dbconnection/dbconnection")

export const authenticateToken = async (token) => {
    if (token) {
        try {

            const decodedToken = jwt.verify(token,jwtsecretkey);

            const {id}=decodedToken

            const user=await knexdb("users")
            .where("id",id)
            .first()


            if (!user) {
                return{
                    error:{
                        message:"this is invalid user"
                    }
                }
            }


            return{
                name:user.name,
                email:user.email,
                password:user.password
            }



        } catch (error) {
            console.log('Token verification failed:', error.message);
            throw new Error('Authentication failed');
        }
    }
    throw new Error('No token provided');
};

module.exports={authenticateToken}