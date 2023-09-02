import CRUD from "../utils/crud"

export const PageSchema = `
  input PageInput {
    title: String
    body: String
  }

  type Query {
    pages: [Page]
    page(_id: ID): Page
  }

  type Mutation {
    createPage(input: PageInput): ID
    updatePage(_id: ID, input: PageInput): Boolean
    deletePage(_id: ID): Boolean
  }
  
  type Page {
    _id: ID
    title: String
    body: String
  }
`

const COLLECTION_NAME = 'pages'

export const PageResolver = {
  Query: {
    pages: async () => CRUD.fetchAll(COLLECTION_NAME),
    page: async (_, {_id}) => CRUD.fetchOneById(COLLECTION_NAME, _id)
  },
  Mutation: {
    createPage: async (_, {input}) => CRUD.createOne(COLLECTION_NAME, input),
    updatePage: async (_, {_id, input}) => CRUD.updateOne(COLLECTION_NAME, _id, input),
    deletePage: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)
  }
}