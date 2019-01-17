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
  const userToken = localStorage.getItem('token') || ''
  const [user, setUser] = useState(null)
  const [loadingUser, setLoading] = useState(true)

  const getUserData = async () => {
    const {
      data: { me }
    } = await client.query({ query: GET_ME })
    // console.log('userData', userData)
    if (userToken && me) {
      setUser(me)
      setLoading(false)
    }
    setLoading(false)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    // client.resetStore()
    client.writeData({ data: { isLoggedIn: false } })
    setUser(null)
    setLoading(true)
  }

  useEffect(() => {
    getUserData()
    // clean up
    return () => {
      setUser(null)
      setLoading(true)
    }
  }, [])
  // console.log(loadingUser)

  const ctx = {
    user,
    loadingUser,
    logoutUser
  }

  return (
    <AuthUserContext.Provider value={ctx}>{children}</AuthUserContext.Provider>
  )
}

export default AuthUserProvider
