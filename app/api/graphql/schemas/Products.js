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

export const ProductResolver = {
  products: async () => {
    try {
      const response = await fetch(URL_API)
      const data = await response.json()

      return data.products.map(u => {
        return {
          id: u.id,
          title: u.title,
          description: u.description,
          price: u.price,
          rating: u.rating,
          category: u.category,
          thumbnail: u.thumbnail
        }
      })
    } catch (error) {
      throw new Error("Something went wrong")
    }
  },
  searchProduct: async (_, { keyword }) => {
    try {
      const response = await fetch(`${URL_API}/search?q=${keyword}`)
      const data = await response.json()

      return data.products.map(u => {
        return {
          id: u.id,
          title: u.title,
          description: u.description,
          price: u.price,
          rating: u.rating,
          category: u.category,
          thumbnail: u.thumbnail
        }
      })
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }
}