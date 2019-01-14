import React, { useState } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import Spinner from './Spinner'

const SIGN_UP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export default function SignUp() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={SIGN_UP}
          onCompleted={({ signup }) => {
            console.log(signup)
            localStorage.setItem('token', signup.token)
            client.writeData({ data: { isLoggedIn: true } })
          }}>
          {(signup, { loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <h1>Loading...</h1>
            if (error) return <p>An error occurred</p>

            return <SignUpForm signup={signup} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

function SignUpForm({ signup }) {
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
    const data = await signup({ variables: { username, email, password } })
    console.log(data)
    setState({
      username: '',
      email: '',
      password: ''
    })
  }
  return (
    <Row type="flex" justify="center" style={{ marginTop: 150 }}>
      <Col span={6}>
        <Form>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Row type="flex" justify="space-between">
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Sign up
              </Button>
              <Checkbox>Remember me</Checkbox>
              <a href="">Forgot password</a>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

// <pre>{JSON.stringify(state, null, 4)}</pre>
// <Row type="flex" justify="center" style={{ marginTop: 150 }}>
// <Col span={8}>
//   <Form>
//     <Form.Item>
//       <Input prefix={<Icon type="user" />} placeholder="Username" />
//     </Form.Item>
//     <Form.Item>
//       <Input
//         prefix={<Icon type="lock" />}
//         type="password"
//         placeholder="Password"
//       />
//     </Form.Item>
//     <Form.Item>
//       <Row type="flex" justify="space-between">
//         <Button type="primary" htmlType="submit">
//           Log in
//         </Button>
//         <Checkbox>Remember me</Checkbox>
//         <a href="">Forgot password</a>
//       </Row>
//     </Form.Item>
//   </Form>
// </Col>
// </Row>
