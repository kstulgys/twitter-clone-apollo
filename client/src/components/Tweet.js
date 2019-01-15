import React from 'react'
import { Card, Icon, Avatar } from 'antd'
import { distanceInWordsToNow } from 'date-fns'

// import { timeDifferenceForDate } from './utils'

const { Meta } = Card

function Tweet({ tweet }) {
  return (
    <div style={{ paddingTop: 10 }}>
      <Card
        style={{
          width: '100%',
          boxShadow: '0 1px 2px rgba(0,0,0,0.12)'
        }}
        //   cover={
        //     <img
        //       alt="example"
        //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //     />
        //   }
        actions={[
          <Icon type="message" />,
          <Icon type="retweet" />,
          <Icon type="heart" />
        ]}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={tweet.user.username}
          description={`${distanceInWordsToNow(Number(tweet.createdAt))} ago`}
        />
        <p>{tweet.text}</p>
      </Card>
    </div>
  )
}

export default Tweet
