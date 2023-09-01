import { createSchema, createYoga } from 'graphql-yoga'
import { PostResolver, PostSchema } from './schemas/Posts'
import { ProductResolver, ProductSchema } from './schemas/Products'
import { UserResolver, UserSchema } from './schemas/Users'
import { LinkSchema, LinkResolver } from './schemas/Links'
import { PageSchema, PageResolver } from './schemas/Pages'

const combineSchemas = (schemaArr) => {
    return schemaArr.join()
}

const combineResolvers = (resolverArr) => {
    let resolvers = { Query: {}, Mutation: {} }
    for (const resolver of resolverArr) {
        // Append resolver query
        resolvers.Query = {
            ...resolvers.Query, ...resolver.Query
        }
        // Append resolver mutation
        resolvers.Mutation = {
            ...resolvers.Mutation, ...resolver.Mutation
        }
        delete resolver.Query
        delete resolver.Mutation
        // Append remaining types
        resolvers = {
            ...resolvers, ...resolver
        }
    }
    return resolvers
}

const { handleRequest } = createYoga({
    schema: createSchema({
        typeDefs: combineSchemas([
            LinkSchema,
            PageSchema,
            ProductSchema,
            PostSchema,
            UserSchema
        ]),
        resolvers: combineResolvers([
            LinkResolver,
            PageResolver,
            PostResolver,
            ProductResolver,
            UserResolver,
        ])
    }),
    graphqlEndpoint: '/api/graphql',
    fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST }