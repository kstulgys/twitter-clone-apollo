import React, { useState } from 'react'
import { Menu, Icon, Button, Input, Avatar, Dropdown, Row, Col } from 'antd'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import TweetModal from './TweetModal'

import { useAuthUser } from '../context/authUserContext'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const Search = Input.Search

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
)

function NavBar() {
  const { me, loading } = useAuthUser()
  const [current, setCurrent] = useState('home')
  return (
    <>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ backgroundColor: 'white' }}>
        <Col lg={2} md={2} sm={0} />
        <Col lg={20} md={19} sm={23} xs={24}>
          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <Menu
                onClick={setCurrent}
                selectedKeys={[current]}
                mode="horizontal">
                <Menu.Item key="home">
                  <Icon type="home" />
                  Home
                </Menu.Item>
                <Menu.Item key="mail">
                  <Icon type="mail" />
                  Message
                </Menu.Item>
              </Menu>
            </Col>
            <Col style={{ display: 'flex' }}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200, marginRight: 15 }}
              />
              <Dropdown overlay={menu}>
                <Avatar
                  style={{ marginRight: 15 }}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Dropdown>
              <TweetModal />
            </Col>
          </Row>
        </Col>
        <Col lg={2} md={2} sm={0} xs={0} />
      </Row>
    </>
  )
}

// <Menu onClick={setCurrent} selectedKeys={[current]} mode="horizontal">
//   <Menu.Item key="home">
//     <Icon type="home" />
//     Home
//   </Menu.Item>
//   <Menu.Item key="app">
//     <Icon type="appstore" />
//     Navigation Two
//   </Menu.Item>
// </Menu>

export default NavBar
