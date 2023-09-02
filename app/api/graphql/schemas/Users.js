import CRUD from "../utils/crud"

export const UserSchema = `
  input UserInput {
    firstName: String
    lastName: String
    email: String
    username: String
    image: String
  }
  type Query {
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    createUser(input: UserInput): ID
    updateUser(_id: ID, input: UserInput): Boolean
    deleteUser(_id: ID): Boolean
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    image: String
  }
`

const COLLECTION_NAME = 'users'

export const UserResolver = {
  Query: {
    users: async () => CRUD.fetchAll(COLLECTION_NAME),
    user: async (_, {_id}) => CRUD.fetchOneById(COLLECTION_NAME, _id)
  },
  Mutation: {
    createUser: async (_, {input}) => CRUD.create(COLLECTION_NAME, input),
    updateUser: async (_, {_id, input}) => CRUD.updateOne(COLLECTION_NAME, _id, input),
    deleteUser: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)
  }
}