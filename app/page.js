'use client'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import GET_USERS from '@/app/graphql/queries/getUsers.gql'

export default function Home() {

  const { data, loading, error } = useQuery(GET_USERS)

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  const renderUsers = () => {
    if (loading) return 'Loading...'
    return <div>
      {data.users.map((user, index) => (
        <div key={index}>
          <h3>{user.firstName} {user.lastName}</h3>
          <h5>{user.email}</h5>
          <h5>@{user.username}</h5>
        </div>
      ))}
    </div>
  }

  return (
    <main>
      <div>
        {renderUsers()}
      </div>
    </main>
  )
}
