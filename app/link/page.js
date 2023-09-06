'use client'

import { useQuery, gql, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

const CREATE_LINK = gql`
    mutation CreateLink($alias: String!, $url: String!) {
        createLink(input: {alias: $alias, url: $url})
    }
`

const NewLinkPage = () => {

    const [createLink, {data, loading, error}] = useMutation(CREATE_LINK)

    const [payload, setPayload] = useState({
        alias: "",
        url: ""
    })

    const submitLink = () => {
        if (payload['alias'] == "" || payload['url'] == "") {
            alert("Please provide an alias and url.")
            return
        }
        createLink({variables: payload})
    }

    return (
        <div>
            <h1>Links</h1>

            <div>
                <label>Alias</label><br/>
                <input type="text" value={payload.alias} onChange={e => setPayload({...payload, alias: e.target.value})}/>
            </div>

            <div>
                <label>URL</label><br/>
                <input type="text" value={payload.url} onChange={e => setPayload({...payload, url: e.target.value})}/>
            </div>

            <div>
                <button onClick={submitLink}>Create Link</button>
            </div>

            {loading && <div>Creating ...</div>}
            {data && (
                data['createLink'] ? <div>The link /link/{payload['alias']} has been created!</div> : <div>The alias is not available, please try another.</div>
            )}

        </div>
    )
}

export default NewLinkPage