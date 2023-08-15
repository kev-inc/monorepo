import { fetchSingleUser } from "./Users"

export const PostSchema = `
  type Query {
    posts: [Post]
    searchPost(keyword:String):[Post]
  }

  type Post {
    id: ID
    title: String
    body: String
    user: User
  }
`

const URL_API = 'https://dummyjson.com/posts'

const fetchAllPosts = async () => {
  try {
    const response = await fetch(URL_API)
    const data = await response.json()

    return data.posts.map(u => {
      return {
        id: u.id,
        title: u.title,
        body: u.body,
        user: u.userId
      }
    })
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const fetchSinglePost = async id => {
  try {
    const response = await fetch(`${URL_API}/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const searchPosts = async keyword => {
  try {
    const response = await fetch(`${URL_API}/search?q=${keyword}`)
    const data = await response.json()

    return data.posts.map(u => {
      return {
        id: u.id,
        title: u.title,
        body: u.body,
        userId: u.userId
      }
    })
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const PostResolver = {
  Query: {
    posts: () => fetchAllPosts(),
    searchPost: async (_, { keyword }) => searchPosts(keyword)
  },
  Post: {
    user: async ({user}) => fetchSingleUser(user)
  }
  
}