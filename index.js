
import { ApolloServer } from '@apollo/server' 
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import  db from "./db.js"


const resolvers = {
    Query: {
        games: () => {
            return db.games
        },

        game(_,gms){
            return db.games.find((game)=>game.id === gms.id)
        },

        authors: () => {
            return db.authors
        },

        author(_,ath){
            return db.authors.find((aut)=>aut.id === ath.id)
        },

        reviews: () => {
            return db.reviews
        },

        review(_,args){
            return db.reviews.find((review)=> review.id === args.id)
        },
        
    },

    Game:{
        reviews(parent){
            return db.reviews.filter((pr=>  pr.game_id === parent.id))
        }
    },

    Author:{
        review(parent){
            return db.reviews.filter((auth=>  parent.id === auth.id ))
        }
    },

    Review:{
        author(parent){
            return db.reviews.filter((r)=> parent.id === r.auth_id)
        }
    }    
        
}



const server = new ApolloServer({
    typeDefs,
    resolvers

})

const { url } = await startStandaloneServer(server, {

    listen: { port: 4000 }

})

console.log("server ready to start", )  