import DB from "../../../db/database"
import { fetchSingleUser } from "./Users"

export const PostSchema = `
  type Query {
    posts: [Post]
    post(_id: ID): Post
  }

  type Mutation {
    createPost(title: String, body: String, userId: ID): ID
  }

  type Post {
    _id: ID
    title: String
    body: String
    user: User
  }
`

const COLLECTION_NAME = 'posts'

const fetchAllPosts = async () => {
  try {
    return DB.read(COLLECTION_NAME)
  } catch (error) {
    throw new Error(error)
  }
}

const fetchSinglePost = async id => {
  try {
    return DB.readOne(COLLECTION_NAME, id)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const createPost = async post => {
    try {
        return DB.create(COLLECTION_NAME, post).then(resp => resp.insertedId)
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export const PostResolver = {
  Query: {
    posts: () => fetchAllPosts(),
    post: async (_, {_id}) => fetchSinglePost(_id)
  },
  Mutation: {
    createPost: async (_, data) => createPost(data)
  },
  Post: {
    user: async ({userId}) => fetchSingleUser(userId) // to convert userId to user
  }
}