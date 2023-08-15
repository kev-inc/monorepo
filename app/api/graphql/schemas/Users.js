export const UserSchema = `
  type Query {
    users: [User]
    user(id:ID): User
    searchUser(keyword:String): [User]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    image: String
  }
`

const URL_API = 'https://dummyjson.com/users'

const fetchAllUsers = async () => {

  try {
    const response = await fetch(URL_API)
    const data = await response.json()
    return data.users
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const fetchSingleUser = async id => {
  try {
    const response = await fetch(`${URL_API}/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const searchUsers = async (keyword) => {
  try {
    const response = await fetch(`${URL_API}/search?q=${keyword}`)
    const data = await response.json()
    return data.users
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const UserResolver = {
  Query: {
    users: async () => fetchAllUsers(),
    searchUser: async (_, { keyword }) => searchUsers(keyword)
  }
}