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
    const url = "https://kitten-home.herokuapp.com/kittens";
    axios
      .get(url)
      .then(res => this.setState({ kittens: res.data }))
      .catch(err => {
        console.error(err);
        this.setState({ kittens: [] });
      });
  };
  fetchOwners = () => {
    const url = "https://kitten-home.herokuapp.com/owners/Agustin";
    axios
      .get(url, { withCredentials: true })
      .then(res => this.setState({ owners: res.data }))
      .catch(err => {
        console.error(err);
        this.setState({ owners: [] });
      });
  };
  adoptKitten = id => {
    const url = "https://kitten-home.herokuapp.com/kittens/delete/" + id;
    axios
      .delete(url, { withCredentials: true })
      .then(res => {
        console.log(res);
        this.fetchKittens();
      })
      .catch(err => {
        console.error(err);
      });
  };
  loginHandler = () => {
    const url = "https://kitten-home.herokuapp.com/owners/login";
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
  logoutHandler = () => {
    const url = "https://kitten-home.herokuapp.com/owners/logout";
    axios
      .post(url, {}, { withCredentials: true })
      .then(res => {
        this.setState({ isLoggedIn: false });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.loginHandler}>Login</button>
        <button onClick={this.logoutHandler}>Logout</button>
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
              <button onClick={() => this.adoptKitten(kitten._id)}>
                Adopt
              </button>
            </p>
          );
        })}
      </div>
    );
  }
}

export default App;
