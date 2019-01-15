import React from 'react'
import { Row, Col, Card } from 'antd'
import NavBar from './components/NavBar'

function AppLayout({ feed }) {
  return (
    <>
      <NavBar />
      <Row type="flex" justify="center" gutter={8}>
        <Col lg={5} md={6} style={{ paddingTop: 10 }}>
          <Card />
        </Col>
        <Col lg={10} md={13}>
          {feed}
        </Col>
        <Col lg={5} md={0} style={{ paddingTop: 10 }}>
          <Card />
        </Col>
      </Row>
    </>
  )
}

export default AppLayout
