import React from 'react'
import { Row, Col, Card, Button, Icon, Input } from 'antd'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import useUserData from './hooks'

function NavBar() {
  const data = useUserData()
  console.log.log(data)

  return (
    <Card>
      <Row type="flex" justify="space-between">
        <Col span={1} />
        <Col span={5}>Home/etc</Col>
        <Col span={10} style={{ display: 'flex', justifyContent: 'center' }}>
          <Icon type="twitter" style={{ fontSize: '32px', color: '#08c' }} />
        </Col>
        <Col span={5}>
          <Row type="flex" justify="end">
            <Col>
              <Input prefix={<Icon type="search" />} placeholder="search" />
            </Col>
            <Col>
              <Input prefix={<Icon type="search" />} placeholder="search" />
            </Col>
            <Col>
              <Button type="primary">Tweet</Button>
            </Col>
          </Row>
        </Col>
        <Col span={1} />
      </Row>
    </Card>
  )
}

export default NavBar
