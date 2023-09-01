'use client'

import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

export default function Home() {

    const { data, loading, error } = useQuery(gql`
    query getLinks {
        links {
            _id
            alias
            url
        }
    }
   `)

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    const renderLinks = () => {
        if (loading) return 'Loading...'
        return <table>
            <thead>
                <tr>
                    <th>Alias</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>

            {data.links.map((link, index) => (
                <tr key={index}>
                    <td>{link.alias}</td>
                    <td>{link.url}</td>
                </tr>
            ))}
            </tbody>
        </table>
    }

    return (
        <main>
            <div>
                {renderLinks()}
            </div>
        </main>
    )
}
