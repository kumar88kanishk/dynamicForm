import React, { Component } from "react";
import Form from "./components/buildForm";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Dynamic form</h2>
          <p className="lead">
            Below is an example form built entirely with API Call & Bootstrap's
            form controls.
          </p>
        </div>
        <div className="row">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
