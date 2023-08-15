import { createSchema, createYoga } from 'graphql-yoga'
import { PostResolver, PostSchema } from './schemas/Posts'
import { ProductResolver, ProductSchema } from './schemas/Products'
import { User, UserResolver, UserSchema } from './schemas/Users'

const combineSchemas = (schemaArr) => {
  return schemaArr.join()
}

const combineResolvers = (resolverArr) => {
  let resolvers = {Query: {}}
  for (const resolver of resolverArr) {
    resolvers.Query = {
      ...resolvers.Query, ...resolver.Query
    }
    delete resolver.Query
    resolvers = {
      ...resolvers, ...resolver
    }
  }
  return resolvers
}

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: combineSchemas([
      UserSchema, 
      ProductSchema,
      PostSchema
    ]),
    resolvers: combineResolvers([
      UserResolver,
      PostResolver,
      ProductResolver
    ])
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})
 
export { handleRequest as GET, handleRequest as POST }