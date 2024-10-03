require("dotenv").config()
/**
//  @type { Object.<string, import("knex").Knex.Config> }
 */

const knexConfig = {

  development: {
    client: 'postgresql',
    connection: {
      database:process.env.DATABASE_NAME,
      user:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
    
  },

};



module.exports=knexConfig
