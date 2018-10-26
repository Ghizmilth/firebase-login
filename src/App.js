import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Authen from "./Authen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Login with Firebase</h2>
        </div>
        <Authen />
      </div>
    );
  }
}

export default App;
