import React, { Component } from "react";
const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAtQvzbGky208PJ33h6rKaMAfekTYtM1C8",
  authDomain: "firelogin-965ad.firebaseapp.com",
  databaseURL: "https://firelogin-965ad.firebaseio.com",
  projectId: "firelogin-965ad",
  storageBucket: "firelogin-965ad.appspot.com",
  messagingSenderId: "746759384569"
};
firebase.initializeApp(config);

class Authen extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    //TODO: handle login promise
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({ err: err });
    });
  }

  signup() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise.then(user => {
      var err = "Welcome " + user.email;
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          email: user.email
        });
      console.log(user);
      this.setState({ err: err });
    });
    promise.catch(e => {
      var err = e.message;
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
