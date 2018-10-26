import React, { Component } from "react";
const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAlohvuOvwFJYzyuYtYS_aGA8BhAiZBrHs",
  authDomain: "fir-78979.firebaseapp.com",
  databaseURL: "https://fir-78979.firebaseio.com",
  projectId: "fir-78979",
  storageBucket: "",
  messagingSenderId: "561194369947"
};
firebase.initializeApp(config);

class Authen extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise
      .then(user => {
        console.log(user);
        let lout = document.getElementById("logout");
        let message = `Welcome ${user.user.email}`;
        this.setState({ err: message });

        lout.classList.remove("hide");
      })
      .catch(e => {
        let err = e.message;
        console.log(err);
        this.setState({ err: err });
      });
  }
  signup() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(user => {
        let err = `Welcome ${user.user.email}`;
        console.log(user);
        console.log(user.user.uid);
        firebase
          .database()
          .ref("/users" + user.user.uid)
          .set({
            email: user.user.email
          });
        console.log(user);
        this.setState({ err: err });
      })
      .catch(e => {
        let err = e.message;
        console.log(err);
        this.setState({ err: err });
      });
  }

  constructor(props) {
    super(props);

    this.state = {
      err: ""
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  render() {
    return (
      <div>
        <input
          id="email"
          ref="email"
          type="email"
          placeholder="Enter your email"
        />
        <br />
        <input
          id="pass"
          ref="password"
          type="password"
          placeholder="Enter your password"
        />
        <br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button>Log Out</button>
      </div>
    );
  }
}

export default Authen;
