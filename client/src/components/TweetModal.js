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

  const handleOk = mutate => {
    setLoading(true)
    mutate()
  }

  const handleCancel = e => {
    setVisible(false)
  }

  return Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {}
  })

  // <div>
  //   <Button type='primary' onClick={showModal}>
  //     Tweet
  //   </Button>
  //   <Mutation
  //     mutation={CREATE_TWEET_MUTATION}
  //     variables={{ text: TweetInput }}
  //     update={(store, { data: { createTweet } }) => {
  //       const data = store.readQuery({ query: GET_TWEETS })
  //       if (!data.getTweets.find(t => t._id === createTweet._id)) {
  //         store.writeQuery({
  //           query: GET_TWEETS,
  //           data: { getTweets: [{ ...createTweet }, ...data.getTweets] }
  //         })
  //       }
  //     }}
  //     onCompleted={() => {
  //       setLoading(false)
  //       setTweetInput('')
  //       setVisible(false)
  //     }}
  //   >
  //     {mutate => (

  //       <Modal
  //         title={
  //           <div
  //             style={{
  //               width: '100%',
  //               display: 'flex',
  //               justifyContent: 'center'
  //             }}
  //           >
  //             <p style={{ alignSelf: 'flex-end' }}>Compose your new Tweet</p>
  //           </div>
  //         }
  //         visible={visible}
  //         onCancel={handleCancel}
  //         footer={[
  //           <Button
  //             key='submit'
  //             type='primary'
  //             loading={loading}
  //             onClick={() => handleOk(mutate)}
  //           >
  //             Tweet
  //           </Button>
  //         ]}
  //       >
  //         <TextArea
  //           value={TweetInput}
  //           rows={4}
  //           onChange={e => setTweetInput(e.target.value)}
  //         />
  //       </Modal>
  //     )}
  //   </Mutation>
  // </div>
}

export default TweetModal
