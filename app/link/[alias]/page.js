'use client'

import { useQuery, gql } from "@apollo/client"
import { redirect } from "next/navigation"

const GET_LINK = gql`
    query GetLink($alias: String!) {
        fetchUrlFromAlias(alias: $alias)
    }
`

const LinkRedirectPage = ({params}) => {
    const alias = params['alias']
    const {data, loading, error} = useQuery(GET_LINK, {variables: {alias}})
    if (loading) return <div>Loading ...</div>

    if (data) {
        if (data['fetchUrlFromAlias'] == null) {
            redirect('/link')
        } else {
            redirect(data['fetchUrlFromAlias'])
        }
    }
    return <div></div>

}

export default LinkRedirectPage