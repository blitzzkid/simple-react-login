import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kittens: [],
      owners: [],
      isLoggedIn: false
    };
  }
  fetchKittens = () => {
    const url = "http://localhost:5000/kittens/";
    axios
      .get(url)
      .then(res => this.setState({ kittens: res.data }))
      .catch(err => {
        console.error(err);
        this.setState({ kittens: [] });
      });
  };
  fetchOwners = () => {
    const url = "http://localhost:5000/owners/Derrick";
    axios
      .get(url, { withCredentials: true })
      .then(res => this.setState({ owners: res.data }))
      .catch(err => {
        console.error(err);
        this.setState({ owners: [] });
      });
  };
  loginHandler = () => {
    const url = "http://localhost:5000/owners/login";
    axios
      .post(
        url,
        { username: "user123", password: "test321" },
        { withCredentials: true }
      )
      .then(res => {
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoggedIn: false });
      });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.loginHandler}>Login</button>
        <p>You are logged {this.state.isLoggedIn ? "in" : "out"}</p>
        <button onClick={this.fetchOwners}>
          Get me all the owner by name (protected)
        </button>
        {this.state.owners.map(owner => {
          return (
            <p key={owner._id}>The owner's username is {owner.username}</p>
          );
        })}
        <button onClick={this.fetchKittens}>Get me all the kittens</button>
        {this.state.kittens.map(kitten => {
          return (
            <p key={kitten._id}>
              {kitten.name} is a {kitten.sex} kitten and it is {kitten.age}
              years old.
            </p>
          );
        })}
      </div>
    );
  }
}

export default App;
