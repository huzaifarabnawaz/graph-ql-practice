const typeDefs = `#graphql

# signup 

type User {  
  id: ID!
  name: String!
  email: String!
  password: String!
}

type ErrorType {
  message: String
  code: String
  badrequest: String
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

# logging users 

type loginUsers {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type loginRes {
  id: ID
  name: String
  email: String
  password: String
  token: String!
  error: ErrorType
}

input userlogin {
  name: String!
  email: String!
  password: String!
}

type authpayload {
  token: String!
  loginuse: loginUsers
}

type Mutation {
  signup(input: AddUser!): signUpRes!
  login(input: userlogin!): loginRes!
}

type Query {  
  users: [User] 
  user(id: ID!): User
  usersLogin: [loginUsers]
  login(input: userlogin!): authpayload!
  me:[loginRes]
}
`;  

module.exports = { typeDefs };
