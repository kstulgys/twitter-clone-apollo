import React, { useState, useEffect } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import Spinner from './Spinner'
import { useAuthUser } from '../context/authUserContext'

const SIGN_UP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export default function SignUp() {
  const { loginUser } = useAuthUser()

  //   const handleOnComplete = (signup, client) => {
  //     loginUser({ signup })
  //     // client.writeData({ data: { isLoggedIn: true } })
  //     // window.location.reload()
  //   }

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={SIGN_UP}
          onCompleted={({ signup: { token } }) => loginUser(token)}
        >
          {(signup, { loading, error }) => {
            return (
              <SignUpForm error={error} loading={loading} signup={signup} />
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

function SignUpForm({ signup, error, loading }) {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleChange = e => {
    setState({ ...state, [e.target.id]: e.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { username, email, password } = state
    // console.log(signup, username, email, password)
    await signup({ variables: { username, email, password } })
    // console.log(data)
    setState({
      username: '',
      email: '',
      password: ''
    })
  }
  return (
    <Row type='flex' justify='center' style={{ marginTop: 150 }}>
      <Col span={6}>
        <Form>
          <Form.Item
            validateStatus={error && 'error'}
            help={error && error.message}
          >
            <Input
              prefix={<Icon type='user' />}
              placeholder='Username'
              id='username'
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='mail' />}
              placeholder='Email'
              id='email'
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' />}
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Row type='flex' justify='space-between'>
              <Button
                loading={loading}
                type='primary'
                htmlType='submit'
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
// <Checkbox>Remember me</Checkbox>
// <a href="#">Forgot password</a>
