export const ProductSchema = `
  type Query {
    products: [Product]
    searchProduct(keyword:String):[Product]
  }

  type Product {
    id: ID
    title: String
    description: String
    price: Float
    rating: Float
    category: String
    thumbnail: String
  }
`

const URL_API = 'https://dummyjson.com/products'

const fetchAllProducts = async () => {
  try {
    const response = await fetch(URL_API)
    const data = await response.json()
    return data.products
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const searchProducts = async keyword => {
  try {
    const response = await fetch(`${URL_API}/search?q=${keyword}`)
    const data = await response.json()
    return data.products
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const ProductResolver = {
  Query: {
    products: async () => fetchAllProducts(),
    searchProduct: async (_, { keyword }) => searchProducts(keyword)
  }
}