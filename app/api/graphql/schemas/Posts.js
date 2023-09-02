import CRUD from "../utils/crud"

export const PostSchema = `
  input PostInput {
    title: String
    body: String
    userId: ID
  }

  type Query {
    posts: [Post]
    post(_id: ID): Post
  }

  type Mutation {
    createPost(input: PostInput): ID
    updatePost(_id: ID, input: PostInput): Boolean
    deletePost(_id: ID): Boolean
  }

  type Post {
    _id: ID
    title: String
    body: String
    user: User
  }
`

const COLLECTION_NAME = 'posts'

export const PostResolver = {
  Query: {
    posts: () => CRUD.fetchAll(COLLECTION_NAME),
    post: async (_, {_id}) => CRUD.fetchOneById(COLLECTION_NAME, _id)
  },
  Mutation: {
    createPost: async (_, {input}) => CRUD.create(COLLECTION_NAME, input),
    updatePost: async (_, {_id, input}) => CRUD.updateOne(COLLECTION_NAME, _id, input),
    deletePost: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)
  },
  Post: {
    user: async ({userId}) => CRUD.fetchOne("users", userId) // to convert userId to user
  }
}