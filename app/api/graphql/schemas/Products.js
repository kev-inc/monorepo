import DB from "../../../db/database"

export const ProductSchema = `
  type Query {
    products: [Product]
    product(_id: ID): Product
  }

  type Mutation {
    createProduct(title: String, description: String, price: Float, rating: Float, category: String, thumbnail: String): ID
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

const fetchAllProducts = async () => {
  try {
    return DB.read(COLLECTION_NAME)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const fetchSingleProduct = async id => {
  try {
    return DB.readOne(COLLECTION_NAME, id)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const createProduct = async product => {
    try {
        return DB.create(COLLECTION_NAME, product).then(resp => resp.insertedId)
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export const ProductResolver = {
  Query: {
    products: async () => fetchAllProducts(),
    product: async (_, {_id}) => fetchSingleProduct(_id)
  },
  Mutation: {
    createProduct: async (_, data) => createProduct(data)
  }
}