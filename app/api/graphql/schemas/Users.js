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

export const UserResolver = {
  users: async () => {
    try {
      const response = await fetch(URL_API)
      const data = await response.json()

      return data.users.map(u => {
        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          username: u.username,
          image: u.image
        }
      })
    } catch (error) {
      throw new Error("Something went wrong")
    }
  },
  user: async(_, { id }) => {
    try {
      const response = await fetch(`${URL_API}/${id}`)
      const u = await response.json()

      return {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        username: u.username,
        image: u.image
      }
    } catch (error) {
      throw new Error("Something went wrong")
    }
  },
  searchUser: async (_, { keyword }) => {
    try {
      const response = await fetch(`${URL_API}/search?q=${keyword}`)
      const data = await response.json()

      return data.users.map(u => {
        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          username: u.username,
          image: u.image
        }
      })
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }
}