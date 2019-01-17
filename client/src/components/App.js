import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AppLayout from '../AppLayout'
import Feed from './Feed'
import { useAuthUser } from '../context/authUserContext'
import Spinner from './Spinner'

function App() {
  const { user, loadingUser } = useAuthUser()

  if (loadingUser) return <Spinner />
  return !loadingUser && user && <AppLayout feed={<Feed />} />
}

export default App
