import React from 'react'
import { Row, Col } from 'antd'

function AppLayout({ feed }) {
  return (
    <Row type="flex" justify="center">
      <Col span={10} style={{ backgroundColor: 'coral' }} />
      <Col span={10}>{feed}</Col>
    </Row>
  )
}

export default AppLayout
