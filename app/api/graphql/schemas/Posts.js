export const PostSchema = `
  type Query {
    posts: [Post]
    searchPost(keyword:String):[Post]
  }

  type Post {
    id: ID
    title: String
    body: String
    userId: String
  }
`

const URL_API = 'https://dummyjson.com/posts'

export const PostResolver = {
  posts: async () => {
    try {
      const response = await fetch(URL_API)
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
  },
  searchPost: async (_, { keyword }) => {
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
}