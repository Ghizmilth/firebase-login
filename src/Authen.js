import React, { Component } from "react";
const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAlohvuOvwFJYzyuYtYS_aGA8BhAiZBrHs",
  authDomain: "fir-78979.firebaseapp.com",
  databaseURL: "https://fir-78979.firebaseio.com",
  projectId: "fir-78979",
  storageBucket: "fir-78979.appspot.com",
  messagingSenderId: "561194369947"
};
firebase.initializeApp(config);

class Authen extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById("logout");

      let err = `Welcome ${user.email}`;
      this.setState({ err: err });
      lout.classList.remove("hide");
    });
    promise.catch(e => {
      var err = e.message;

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
        let err = `Welcome ${user.email}`;
        firebase
          .database()
          .ref("/users" + user.uid)
          .set({
            email: user.email
          });
        this.setState({ err: err });
      })
      .catch(e => {
        let err = e.message;
        console.log(err);
        this.setState({ err: err });
      });
  }

  logout() {
    firebase.auth().signOut();
    var lout = document.getElementById("logout");
    lout.classList.add("hide");
  }

  google() {
    console.log("I am a google method");
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then(result => {
      var user = result.user;
      console.log(result);
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          email: user.email,
          name: user.displayName
        });
    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      err: ""
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
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
        <button onClick={this.logout} id="logout" className="hide">
          Log Out
        </button>
        <br />
        <button onClick={this.google} id="google" className="google">
          Sign in with Google
        </button>
      </div>
    );
  }
}

export default Authen;
