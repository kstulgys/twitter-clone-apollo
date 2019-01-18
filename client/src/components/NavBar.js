import React, { useState } from 'react'
import { Menu, Icon, Button, Input, Avatar, Dropdown, Row, Col } from 'antd'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import TweetModal from './TweetModal'
import logo from '../logo.svg'
import { useAuthUser } from '../context/authUserContext'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const Search = Input.Search

function MenuToRender() {
  const { user, logoutUser } = useAuthUser()

  return (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={logoutUser}>Logout</a>
      </Menu.Item>
    </Menu>
  )
}

function NavBar() {
  // const { user, logoutUser } = useAuthUser()
  const [current, setCurrent] = useState('home')
  return (
    <>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ backgroundColor: 'white' }}>
        <Col lg={2} md={2} sm={1} xs={0} />
        <Col lg={20} md={19} sm={20} xs={23}>
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
              </Menu>
            </Col>
            <img src={logo} className="App-logo" alt="logo" />
            <Col style={{ display: 'flex' }}>
              <Dropdown overlay={<MenuToRender />}>
                <Avatar
                  style={{ marginRight: 15 }}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Dropdown>
              <TweetModal />
            </Col>
          </Row>
        </Col>
        <Col lg={2} md={2} sm={1} xs={0} />
      </Row>
    </>
  )
}

export default NavBar

// <Menu.Item key="mail">
// <Icon type="mail" />
// Message
// </Menu.Item>

// <Search
//   placeholder="input search text"
//   onSearch={value => console.log(value)}
//   style={{ width: 200, marginRight: 15 }}
// />

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
