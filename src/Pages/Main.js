import React, { Component } from "react";
import { Layout, Menu, Card, List } from "antd";
import { API_URL } from "./API";
import Axios from "axios";
import "../App.css";
import history from "../service";

import MainLayout from "./Layout";
export default class MainPage extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    Axios.get(API_URL + "/product")
      .then(response => {
        if (response.data && response.data.success && response.data.message) {
          this.setState({
            products: response.data.message
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getImageUrl = images => {
    return API_URL + images[0];
  };

  render() {
    return (
      <MainLayout>
        <List
          grid={{ gutter: 10, column: 4 }}
          dataSource={this.state.products}
          style={{ alignSelf: "center" }}
          renderItem={item => (
            <List.Item>
              <Card
                onClick={() => history.push("/details/" + item._id)}
                hoverable
                style={{ width: 400, height: 570, borderRadius: 5 }}
                cover={
                  <img
                    alt="example"
                    src={this.getImageUrl(item.images)}
                    style={{ width: "100%", height: 350 }}
                  />
                }
              >
                <Card.Meta
                  title={item.name}
                  description={
                    <div>
                      {item.description.substring(0, 100) + "..."}
                      <div
                        style={{
                          fontSize: 25,
                          color: "#46185f",
                          position: "absolute",
                          bottom: 15,
                          left: 20
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.price}</span>{" "}
                        PKR
                      </div>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </MainLayout>
    );
  }
}
