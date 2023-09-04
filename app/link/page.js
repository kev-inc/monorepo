'use client'

import { useQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

const LinksPage = () => {
    
    const searchParams = useSearchParams()
    const alias = searchParams.get('alias')
    const {data, loading, error} = useQuery(gql`
        query GetLink {
            fetchUrlFromAlias(alias: "${alias}")
        }
    `)

    const [resp, setResp] = useState({
        url: null,
        success: false
    })

    useEffect(() => {
        if (data) {
            setResp({
                url: data['fetchUrlFromAlias'],
                success: data['fetchUrlFromAlias'] != null
            })
        }
    }, [data])

    useEffect(() => {
        if (resp['url']) window.location.href = resp['url']
    }, [resp])

    if (loading) {
        return <div>Checking link...</div>
    } else {
        if (resp['success']) {
            return <div>Navigating to &apos;{resp['url']}&apos;</div> 
        } else {
            return <div>Invalid alias</div>
        }
    }
}

export default LinksPage