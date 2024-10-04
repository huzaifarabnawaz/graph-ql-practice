require('dotenv').config()

module.exports={
    localhost:process.env.MY_LOCALHOST,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    username:process.env.DATABASE_NAME,
    jwtsecretkey:process.env.JWT_SECRETKEY
}