import React, { useContext, useEffect, useState } from 'react'
import gql from 'graphql-tag'

const GET_ME = gql`
  query me {
    me {
      username
      email
    }
  }
`

const AuthUserContext = React.createContext(null)

export const useAuthUser = () => useContext(AuthUserContext)

function AuthUserProvider({ children, client }) {
  const [me, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    const {
      data: { me }
    } = await client.query({ query: GET_ME })
    setUser(me)
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setLoading(true)
    client.resetStore()
  }

  useEffect(() => {
    getUserData()
    // clean up
    return () => {
      setUser(null)
      setLoading(true)
    }
  }, [])

  // console.log(user, loading)
  const ctx = {
    me,
    loading,
    logout
  }

  return (
    <AuthUserContext.Provider value={ctx}>{children}</AuthUserContext.Provider>
  )
}

export default AuthUserProvider
