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

const LOG_IN = gql`
  mutation signup($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

// export default function SignUp() {
// const { signupOrLoginUser } = useAuthUser()
// const [loginForm, setLogin] = useState(true)

//   return (
//     <Mutation
//       mutation={loginForm ? LOG_IN : SIGN_UP}
//       onCompleted={
//         loginForm
//           ? ({ login: { token } }) => signupOrLoginUser(token)
//           : ({ signup: { token } }) => signupOrLoginUser(token)
//       }>
//       {(mutate, { loading, error }) => {
//         return (
//           <SignUpForm
//             mutate={mutate}
//             loginForm={loginForm}
//             setLogin={setLogin}
//             error={error}
//             loading={loading}
//           />
//         )
//       }}
//     </Mutation>
//   )
// }

function AuthUserForm() {
  const { signupOrLoginUser } = useAuthUser()
  const [loginForm, setLogin] = useState(true)
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleChange = e => {
    setState({ ...state, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (event, mutate) => {
    event.preventDefault()
    const { username, email, password } = state
    if (loginForm) {
      await mutate({ variables: { email, password } })
    }
    await mutate({ variables: { username, email, password } })
  }

  const onMutationCompleted = token => {
    signupOrLoginUser(token)
    setState({
      username: '',
      email: '',
      password: ''
    })
    loginForm(true)
  }

  return (
    <Mutation
      mutation={loginForm ? LOG_IN : SIGN_UP}
      onCompleted={
        loginForm
          ? ({ login: { token } }) => onMutationCompleted(token)
          : ({ signup: { token } }) => onMutationCompleted(token)
      }>
      {(mutate, { loading, error }) => {
        return (
          <Row type="flex" justify="center" style={{ marginTop: 150 }}>
            <Col span={6}>
              <Form>
                <Form.Item
                  validateStatus={error && 'error'}
                  help={error && error.message}
                />
                {!loginForm && (
                  <Form.Item>
                    <Input
                      prefix={<Icon type="user" />}
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                    />
                  </Form.Item>
                )}
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
                  {loginForm ? (
                    <Row type="flex" align="middle">
                      <Button
                        onClick={e => handleSubmit(e, mutate)}
                        loading={loading}
                        type="primary"
                        htmlType="submit">
                        Log in
                      </Button>
                      <span style={{ marginLeft: 10 }}>or</span>
                      <a
                        style={{ marginLeft: 10 }}
                        onClick={() => setLogin(false)}>
                        Sign up
                      </a>
                    </Row>
                  ) : (
                    <Row type="flex" align="middle">
                      <Button
                        onClick={e => handleSubmit(e, mutate)}
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 10 }}
                        loading={loading}>
                        Sign up
                      </Button>
                      <span style={{ marginRight: 10 }}>or</span>
                      <a onClick={() => setLogin(true)}>Log in</a>
                    </Row>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )
      }}
    </Mutation>
  )
}

export default AuthUserForm
