import React from 'react'
import { Skeleton, Card } from 'antd'

function TweetsSkeleton() {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((s, i) => (
          <div key={i} style={{ paddingTop: 10 }}>
            <Card
              style={{
                margin: 0,
                padding: 0,
                width: '100%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.12)'
              }}>
              <Skeleton active style={{ margin: 0, padding: 0 }} />
            </Card>
          </div>
        ))}
    </>
  )
}

export default TweetsSkeleton
