import React, { Component } from "react";
import { API_URL } from "./API";
import Axios from "axios";
import "../App.css";
import MainLayout from "./Layout";
import {
  Carousel,
  Spin,
  Layout,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Card,
  Rate
} from "antd";
import "./Details.css";

export default class DetailsPage extends Component {
  state = {
    products: [],
    isLoading: true,
    visible: false
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = () => {
    let id = this.props.match.params.id;
    Axios.get(API_URL + "/product/" + id)
      .then(response => {
        console.log(response);
        if (response.data && response.data.success && response.data.message) {
          this.setState({
            products: response.data.message,
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getImageUrl = images => {
    return API_URL + images[0];
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    Axios.post(API_URL + "/order", {
      name: this.state.name,
      quantity: this.state.quantity,
      productName: this.state.products.name,
      serialNumber: this.state.products.serialNumber,
      phoneNumber: this.state.phoneNumber
    })
      .then(response => {
        if (response && response.data && response.data.success)
          this.setState({
            visible: false
          });
        notification.success({
          message: "Order Received",
          description: response.data.message
        });
      })
      .catch(error => {
        notification.error({
          message: "Error",
          description: error.data.message
        });
      });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleComment = () => {
    Axios.post(API_URL + "/rating/" + this.state.products._id, {
      name: this.state.commentName,
      rating: this.state.rating,
      comment: this.state.commentUser
    })
      .then(response => {
        if (response && response.data && response.data.success) {
          this.setState({
            visible: false
          });
          notification.success({
            message: "Success",
            description: "Your feedback has been collected. Thank you. ❤️"
          });
          this.fetchProduct();
        }
      })
      .catch(error => {
        notification.error({
          message: "Error",
          description: error.data.message
        });
      });
  };

  getAverageRate = () => {
    let sum = 0;
    this.state.products.rating.map(item => {
      sum = sum + item.rating ? item.rating : 0;
    });
    sum = sum / this.state.products.rating.length;
    return sum;
  };
  render() {
    return (
      <MainLayout>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <React.Fragment>
            <Row>
              <Col span={8}>
                <Carousel>
                  {this.state.products.images.map(item => {
                    return (
                      <div>
                        <img
                          src={API_URL + item}
                          alt=""
                          className="carousel-image-container"
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </Col>
              <Col span={16}>
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      backgroundColor: "#E8E8E8",
                      borderRadius: 10,
                      padding: 20
                    }}
                  >
                    <div>
                      <h1
                        style={{
                          color: "#6c757d"
                        }}
                      >
                        {this.state.products.name}
                      </h1>
                    </div>
                    <h4
                      style={{
                        color: "#6c757d"
                      }}
                    >
                      {this.state.products.description}
                    </h4>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#6c757d",
                        marginTop: 20
                      }}
                    >
                      PKR: {this.state.products.price}
                    </h3>
                    <Rate value={this.getAverageRate()} disabled />
                  </div>
                  <div>
                    <Button
                      type="default"
                      style={{
                        float: "right",
                        backgroundColor: "#6c757d",
                        borderColor: "#6c757d",
                        color: "white"
                      }}
                      onClick={
                        this.showModal
                        // let id = this.props.match.params.id;
                        // Axios.post(API_URL + "/order")
                        //   .then(response => {
                        //     console.log(response);
                        //     if (response.data && response.data.success && response.data.message) {
                        //       this.setState({
                        //         products: response.data.message,
                        //         isLoading: false
                        //       });
                        //     }
                        //   })
                        //   .catch(error => {
                        //     console.log(error);
                        //   });
                      }
                    >
                      ORDER
                    </Button>
                  </div>
                  <Modal
                    title="Order Form"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <label>Name</label>
                    <Input
                      placeholder="Name"
                      onChange={event => {
                        this.setState({ name: event.target.value });
                      }}
                    />
                    <label className="mt-3">Email</label>
                    <Input
                      placeholder="Email"
                      onChange={event => {
                        this.setState({ email: event.target.value });
                      }}
                    />
                    <label className="mt-3">Quantity</label>
                    <Input
                      placeholder="Quantity"
                      onChange={event => {
                        this.setState({ quantity: event.target.value });
                      }}
                    />
                    <label className="mt-3">Phone Number</label>
                    <Input
                      placeholder="Phone Number"
                      onChange={event => {
                        this.setState({ phoneNumber: event.target.value });
                      }}
                    />
                  </Modal>
                </div>
              </Col>
            </Row>
            <div>
              {this.state.products.rating.map(item => {
                return (
                  <Card
                    size="small"
                    key={item._id}
                    className="mt-4"
                    title={item.name}
                    extra={
                      <Rate
                        style={{
                          paddingLeft: 30
                        }}
                        disabled
                        value={item.rating}
                      />
                    }
                    style={{ width: "100%", padding: 20 }}
                  >
                    <p>{item.comment}</p>
                  </Card>
                );
              })}
            </div>
            <div>
              <Card
                size="small"
                className="mt-4"
                title={"Submit Your Rating"}
                extra={
                  <Rate
                    value={this.state.rating}
                    onChange={value => this.setState({ rating: value })}
                  />
                }
                style={{ width: "100%", padding: 20 }}
              >
                <label>Your Name</label>
                <Input
                  onChange={value =>
                    this.setState({ commentName: value.target.value })
                  }
                />
                <label className="mb-3 mt-3">Your Comment</label>
                <Input.TextArea
                  rows={5}
                  onChange={value =>
                    this.setState({ commentUser: value.target.value })
                  }
                />
                <Button
                  type="primary"
                  className="float-right mt-4"
                  onClick={() => this.handleComment()}
                >
                  Submit
                </Button>
              </Card>
            </div>
          </React.Fragment>
        )}
      </MainLayout>
    );
  }
}
