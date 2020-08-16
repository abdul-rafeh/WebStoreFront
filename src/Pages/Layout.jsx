import React, { Component } from "react";
import { Layout, Menu, Card, List } from "antd";
import { API_URL } from "./API";
import Axios from "axios";
import "../App.css";

const { Header, Footer, Content } = Layout;

export default class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <Header
          style={{ position: "fixed", zIndex: 1, width: "100%", opacity: 0.7 }}
        >
          <span>
            <img
              src={require("./logo.png")}
              style={{ width: 80, height: 60, marginTop: -5 }}
            />{" "}
            <span style={{ fontSize: 30, color: "#fff" }}>Vanadium</span>
          </span>
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
            className="float-right"
          >
            <Menu.Item key="1">Products</Menu.Item>
          </Menu> */}
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: 500,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            {this.props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Store by Abdul Rafeh
        </Footer>
      </Layout>
    );
  }
}
