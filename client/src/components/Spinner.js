import React from 'react'
import { Row, Col, Card, Spin, Icon, Input } from 'antd'

function Spinner() {
  return (
    <Row type="flex" justify="center" align="middle" style={{ height: '50vh' }}>
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  )
}

export default Spinner
