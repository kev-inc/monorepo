import CRUD from '../utils/crud'

export const LinkSchema = `
  input LinkInput {
    alias: String
    url: String
  }

  type Query {
    links: [Link]
    link(_id: ID): Link 
  }

  type Mutation {
    createLink(input: LinkInput): ID
    updateLink(_id: ID, input: LinkInput): Boolean
    deleteLink(_id: ID): Boolean
  }

  type Link {
    _id: ID
    alias: String
    url: String
  }
`

const COLLECTION_NAME = "links"

export const LinkResolver = {
  Query: {
    links: async () => CRUD.fetchAll(COLLECTION_NAME),
    link: async (_, {_id}) => CRUD.fetchOne(COLLECTION_NAME, _id)
  },
  Mutation: {
    createLink: async (_, {input}) => CRUD.createOne(COLLECTION_NAME, input),
    updateLink: async (_, {_id, input}) => CRUD.updateOne(COLLECTION_NAME, _id, input),
    deleteLink: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)

  }
}