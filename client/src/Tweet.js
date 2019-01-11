import React from 'react'
import { Card, Icon, Avatar } from 'antd'
const { Meta } = Card

function Tweet({ text }) {
  return (
    <Card
      style={{ width: 500 }}
      //   cover={
      //     <img
      //       alt="example"
      //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //     />
      //   }
      actions={[
        <Icon type="setting" />,
        <Icon type="edit" />,
        <Icon type="ellipsis" />
      ]}>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Card title"
        description="This is the description"
      />
      <p>{text}</p>
    </Card>
  )
}

export default Tweet
