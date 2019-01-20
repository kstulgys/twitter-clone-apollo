import React from 'react'
import { Row, Col, Card } from 'antd'
import Feed from './Feed'
import NavBar from './NavBar'

function AppLayout() {
  return (
    <>
      <NavBar />
      <Row type='flex' justify='center' gutter={8}>
        <Col lg={5} md={6} sm={0} xs={0} style={{ paddingTop: 10 }}>
          <Card>Sidebar Left</Card>
        </Col>
        <Col lg={10} md={13} sm={20} xs={23}>
          <Feed />
        </Col>
        <Col lg={5} md={0} sm={0} xs={0} style={{ paddingTop: 10 }}>
          <Card>Sidebar Right</Card>
        </Col>
      </Row>
    </>
  )
}

export default AppLayout
