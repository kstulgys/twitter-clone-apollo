import React from 'react'
import { Row, Col } from 'antd'
import NavBar from './NavBar'

function AppLayout({ feed }) {
  return (
    <>
      <NavBar />
      <Row type="flex" justify="center" gutter={32}>
        <Col span={5} style={{ backgroundColor: 'coral' }} />
        <Col span={10}>{feed}</Col>
        <Col span={5} style={{ backgroundColor: 'teal' }} />
      </Row>
    </>
  )
}

export default AppLayout
