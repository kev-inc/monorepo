import CRUD from "../utils/crud"

export const PasteSchema = `
  input PasteInput {
    alias: String
    body: String
  }

  type Query {
    pastes: [Paste]
    paste(_id: ID): Paste
    fetchByAlias(alias: String): Paste
  }

  type Mutation {
    createPaste(input: PasteInput): ID
    updatePaste(_id: ID, input: PasteInput): Boolean
    deletePaste(_id: ID): Boolean
  }

  type Paste {
    _id: ID
    alias: String
    body: String
  }
`

const COLLECTION_NAME = 'pastes'

export const PasteResolver = {
  Query: {
    pastes: async () => CRUD.fetchAll(COLLECTION_NAME),
    paste: async (_, {_id}) => CRUD.fetchOneById(COLLECTION_NAME, _id),
    fetchByAlias: async (_, {alias}) => {
        return CRUD.fetchOneByFilter(COLLECTION_NAME, {alias: alias})
    }
  },
  Mutation: {
    createPaste: async (_, {input}) => {
        if (input['alias'] && await CRUD.fetchOneByFilter(COLLECTION_NAME, {alias: input['alias']})) {
            return null
        }
        return CRUD.createOne(COLLECTION_NAME, input)
    },
    updatePaste: async (_, {_id, input}) => {
        if (input['alias'] && await CRUD.fetchOneByFilter(COLLECTION_NAME, {alias: input['alias']})) {
            return false
        }
        return CRUD.updateOne(COLLECTION_NAME, _id, input)
    },
    deletePaste: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)
  }
}