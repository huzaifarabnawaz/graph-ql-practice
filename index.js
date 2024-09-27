
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from "./db.js"


const resolvers = {
    Query: {
        games: () => {
            return db.games
        },

        game(_, gms) {
            return db.games.find((game) => game.id === gms.id)
        },

        authors: () => {
            return db.authors
        },

        author(_, ath) {
            return db.authors.find((aut) => aut.id === ath.id)
        },

        reviews: () => {
            return db.reviews
        },

        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        },

    },

    Game: {
        reviews(parent) {
            return db.reviews.filter((pr => pr.game_id === parent.id))
        }
    },

    Author: {
        review(parent) {
            return db.reviews.filter((auth => parent.id === auth.id))
        }
    },

    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.id)
        },

        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }

    },

    Mutation:{
        deletegame(_,args){
            db.games= db.games.filter((r)=> r.id !== args.id)
            return db.games
        },

        addgame(_,args){
            let game={
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)
            return game
        },

        updategame(_,args){  
            db.games=db.games.map((g)=>{
                if(args.id=== g.id){
                    console.log(args.id === g.id)
                    return {...g, ...args.edit}
                }
                return g
            })
            return args.edit
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


console.log("server ready to start",)  