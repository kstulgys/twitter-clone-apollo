import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
const { TextArea } = Input

const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      text
      _id
      createdAt
      favoriteCount
      user {
        username
        email
      }
    }
  }
`

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
      createdAt
      favoriteCount
      user {
        username
      }
    }
  }
`
function TweetModal() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [TweetInput, setTweetInput] = useState('')

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = async (e, mutate) => {
    setLoading(true)
    mutate()
  }

  const handleCancel = e => {
    setVisible(false)
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Tweet
      </Button>
      <Mutation
        mutation={CREATE_TWEET_MUTATION}
        variables={{ text: TweetInput }}
        update={(store, { data: { createTweet } }) => {
          const data = store.readQuery({ query: GET_TWEETS })
          store.writeQuery({
            query: GET_TWEETS,
            data: { getTweets: [{ ...createTweet }, ...data.getTweets] }
          })
        }}
        onCompleted={() => {
          setLoading(false)
          setVisible(false)
          setTweetInput('')
        }}>
        {mutate => (
          <Modal
            title="Compose new Tweet"
            visible={visible}
            onCancel={handleCancel}
            footer={[
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={e => handleOk(e, mutate)}>
                Tweet
              </Button>
            ]}>
            <TextArea rows={4} onChange={e => setTweetInput(e.target.value)} />
          </Modal>
        )}
      </Mutation>
    </div>
  )
}

export default TweetModal
