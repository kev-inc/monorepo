import CRUD from "../utils/crud"

export const ProductSchema = `
  input ProductInput {
    title: String
    description: String
    price: Float
    rating: Float
    category: String
    thumbnail: String
  }

  type Query {
    products: [Product]
    product(_id: ID): Product
  }

  type Mutation {
    createProduct(input: ProductInput): ID
    updateProduct(_id: ID, input: ProductInput): Boolean
    deleteProduct(_id: ID): Boolean
  }

  type Product {
    _id: ID
    title: String
    description: String
    price: Float
    rating: Float
    category: String
    thumbnail: String
  }
`

const COLLECTION_NAME = 'products'

export const ProductResolver = {
  Query: {
    products: async () => CRUD.fetchAll(COLLECTION_NAME),
    product: async (_, {_id}) => CRUD.fetchOneById(COLLECTION_NAME, _id)
  },
  Mutation: {
    createProduct: async (_, {input}) => CRUD.create(COLLECTION_NAME, input),
    updateProduct: async (_, {_id, input}) => CRUD.updateOne(COLLECTION_NAME, _id, input),
    deleteProduct: async (_, {_id}) => CRUD.deleteOne(COLLECTION_NAME, _id)
  }
}