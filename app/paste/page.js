'use client'

import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { redirect } from "next/navigation"

const CREATE_PASTE = gql`
    mutation CreatePaste($alias: String!, $body: String!) {
        createPaste(input: {alias: $alias, body: $body})
    }
`

const NewPastePage = () => {

    const [createPaste, {data, loading, error}] = useMutation(CREATE_PASTE)

    const [payload, setPayload] = useState({
        alias: "",
        body: ""
    })

    const submitPaste = () => {
        if (payload['alias'] == "" || payload['body'] == "") {
            alert("Please provide a title and body.")
            return
        }
        createPaste({variables: payload})
    }

    if (data && data['createPaste'] != null) {
        redirect(`/paste/${payload['alias']}`)
    }

    return (
        <div>
            <h1>Pastes</h1>

            <div>
                <label>Title</label><br/>
                <input type="text" value={payload.alias} onChange={e => setPayload({...payload, alias: e.target.value})}/>
            </div>

            <div>
                <label>Body</label><br/>
                <textarea value={payload.body} onChange={e => setPayload({...payload, body: e.target.value})}/>
            </div>

            <div>
                <button onClick={submitPaste}>Create Paste</button>
            </div>

            {loading && <div>Creating ...</div>}
            {data && (
                data['createPaste'] ? <div>{data['createPaste']}</div> : <div>The title is not available, please try another.</div>
            )}
        </div>
    )
}

export default NewPastePage