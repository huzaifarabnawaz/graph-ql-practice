export const typeDefs=`#graphql
type Game{
    id:ID!
    title:String!
    platform:[String!]!
    reviews:[Review!]!
}

type Review{
    id:ID!
    rating:Int! 
    content:String!
    game:Game!
    author:Author!
}

type Author{
    id:ID!
    name:String!
    verified:Boolean!
    review:[Review!]    
}

type Query{
    reviews:[Review]
    review(id:ID!):Review
    games:[Game]
    game(id:ID!):Game
    author(id:ID):Author
    authors:[Author]
}

type Mutation{
    addgame(game: addgameinput!):Game
    deletegame(id:ID!):[Game]
    updategame(id:ID!,edit:updategamesinput!):Game
}

input addgameinput{
    title:String!
    platform:[String!]!
}

input updategamesinput{
    title:String!
    platform:[String!]!
}



`