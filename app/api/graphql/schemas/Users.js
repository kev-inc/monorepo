import DB from "../../../db/database"

export const UserSchema = `
  type Query {
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    createUser(firstName: String, lastName: String, email: String, username: String, image: String): ID
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

const fetchAllUsers = async () => {
  try {
    return DB.read(COLLECTION_NAME)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const fetchSingleUser = async id => {
  try {
    return DB.readOne(COLLECTION_NAME, id)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const createUser = async user => {
    try {
        return DB.create(COLLECTION_NAME, post).then(resp => resp.insertedId)
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export const UserResolver = {
  Query: {
    users: async () => fetchAllUsers(),
    user: async (_, {_id}) => fetchSingleUser(_id)
  },
  Mutation: {
    createUser: async (_, data) => createUser(data)
  }
}