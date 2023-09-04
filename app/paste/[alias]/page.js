'use client'

import { redirect } from 'next/navigation'
import { useQuery, gql } from "@apollo/client"
import { useEffect } from 'react'

const GET_PASTE = gql`
    query GetPaste($alias: String!) {
        fetchByAlias(alias: $alias) {
            alias
            body
        }
    }
`

const PastePage = ({params}) => {
    const alias = params['alias']
    const {data, loading, error} = useQuery(GET_PASTE, {variables: {alias}})
    if (loading) {
        return <div>Loading ...</div>
    }

    if (data && data['fetchByAlias'] == null) {
        redirect('/paste')
    }
    return <div>
        <h1>Pastes</h1>

        <div>
            <label>Title (Optional)</label><br/>
            <input readOnly type="text" value={data['fetchByAlias'].alias} />
        </div>

        <div>
            <label>Body</label><br/>
            <textarea readOnly value={data['fetchByAlias'].body} />
        </div>
    </div>
}

export default PastePage