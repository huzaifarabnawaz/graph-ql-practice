
const typeDefs = `#graphql

type User {  
  id: ID!
  name: String!
  email: String!
  password: String!
}

type ErrorType {
  message: String
  code: String
  badrequest:String
}


type signUpRes {  
  id: ID
  name: String
  email: String
  password: String
  error: ErrorType
}



input AddUser {  
  name: String!
  email: String!
  password: String!
}

type Mutation {
  signup(input:AddUser!):signUpRes
}

type Query {  
  users: [User] 
  user(id: ID!):User
}
`

module.exports = { typeDefs };
