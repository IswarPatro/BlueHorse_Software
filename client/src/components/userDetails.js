import React, { Component } from "react";
import Logo from "./images/logo.png";
import Users from "./User";
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand">
            <img src={Logo} alt="" />
            <span>BlueHorse Software Solutions Pvt Ltd</span>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <div className="user-name">
                  Hello {this.state.userData.fname}
                </div>
              </li>
              <li className="logout">
                <button onClick={this.logOut} className="btn btn-primary">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <Users />
      </>
    );
  }
}
