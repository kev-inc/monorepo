import { createSchema, createYoga } from 'graphql-yoga'
import { PostResolver, PostSchema } from './schemas/Posts'
import { ProductResolver, ProductSchema } from './schemas/Products'
import { UserResolver, UserSchema } from './schemas/Users'

const combineSchemas = (schemaArr) => {
  return schemaArr.join()
}

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: combineSchemas([
      UserSchema, 
      ProductSchema,
      PostSchema
    ]),
    resolvers: {
      Query: {
        ...UserResolver, 
        ...ProductResolver,
        ...PostResolver
      }
    }
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})
 
export { handleRequest as GET, handleRequest as POST }