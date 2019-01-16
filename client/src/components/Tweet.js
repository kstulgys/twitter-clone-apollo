import React from 'react'
import { Mutation, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, Icon, Avatar, Row, Col, Tooltip } from 'antd'
import { distanceInWordsToNow } from 'date-fns'
const { Meta } = Card

const FAVORITE_TWEET_MUTATION = gql`
  mutation favoriteTweet($_id: ID!) {
    favoriteTweet(_id: $_id) {
      isFavorited
      favoriteCount
      _id
    }
  }
`

function TweetCard({
  text,
  user,
  createdAt,
  _id,
  favoriteCount,
  favorite,
  isFavorited,
  placeholder
}) {
  return (
    <div style={{ paddingTop: 10 }}>
      <Card
        style={{
          width: '100%',
          boxShadow: '0 1px 2px rgba(0,0,0,0.12)'
        }}
        actions={[
          <Tooltip placement="top" title="work in progress">
            <Icon type="message" />
          </Tooltip>,
          <Mutation
            mutation={FAVORITE_TWEET_MUTATION}
            variables={{ _id }}
            optimisticResponse={{
              __typename: 'Mutation',
              favoriteTweet: {
                __typename: 'Tweet',
                _id: _id,
                favoriteCount: isFavorited
                  ? favoriteCount - 1
                  : favoriteCount + 1,
                isFavorited: !isFavorited
              }
            }}>
            {mutate => (
              <Row style={{ padding: 0 }} type="flex" align="middle">
                <Col>
                  <Icon
                    type="heart"
                    theme={isFavorited && 'twoTone'}
                    onClick={mutate}
                  />
                </Col>
                <Col style={{ paddingLeft: 5 }}>{favoriteCount || 0}</Col>
              </Row>
            )}
          </Mutation>
        ]}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={`@${user.username}`}
          description={`${distanceInWordsToNow(Number(createdAt))} ago`}
        />
        <p>{text}</p>
      </Card>
    </div>
  )
}

TweetCard.fragments = {
  tweet: gql`
    fragment TweetCard on Tweet {
      text
      _id
      createdAt
      isFavorited
      favoriteCount
      user {
        username
        # avatar
        # lastName
        # firstName
      }
    }
  `
}

export default TweetCard
