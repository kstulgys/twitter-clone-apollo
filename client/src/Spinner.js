import React from 'react'
import { Row, Col, Card, Spin, Icon, Input } from 'antd'

function Spinner() {
  return (
    <Card>
      <Row type="flex" justify="center" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    </Card>
  )
}

export default Spinner
