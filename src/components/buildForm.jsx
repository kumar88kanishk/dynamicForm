import React, { Component } from "react";
import AbstractState from "../middleware/abstractState";
import axios from "axios";
import TextBox from "./buildTextBox";
import RadioButton from "./buildRadioButton";
import SelectBox from "./buildSelectBox";
import helper from "../helper/helper";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formJson: []
    };
    this.helper = new helper();
    this.sanatizedState = new AbstractState();
  }
  componentWillMount() {
    // reach out for form API for the first and only time and get the values
    // then build State with set of all attributes we need for calculation, ie: Below
    // then set state
    axios
      .get("/form")
      .then(response => {
        console.log("response 200==>", response.data);
        return response.data;
      })
      .then(data => this.sanatizedState.stateBuilder(data))
      .then(formJson => {
        this.setState({ formJson });
      })
      .catch(error => {
        console.log("Caught an error", error);
        if (error.response) {
          if (error.response.status === 404) {
            return error;
          }
        }
      });
  }

  findElementFromState(e, key) {
    // find active element that has been changed from list of elements we maintain in state
    return new Promise((resolve, reject) => {
      let el = {};
      el = this.state.formJson.find(e => {
        return e.key === key;
      });
      resolve({ data: e.target.value, element: el });
    });
  }
  prepareNewState(active) {
    // returns a resolve with new State for active changed element
    let data = active.data;
    let tempJson = [...this.state.formJson];
    if (
      !(
        Object.keys(active.element).length === 0 &&
        active.element.constructor === Object
      )
    ) {
      active.element["currentValue"] = data;
      return new Promise((resolve, reject) => {
        //check for valid currentValue as per type and hidden and required paramater
        // then update the result
        this.helper
          .isValid(active.element)
          .then(isValid => {
            active.element["isValid"] = isValid;
            return active.element;
          })
          .then(active => {
            // replace the  new state of active element with old state of element
            let t = tempJson.map(e => {
              if (e.key === active.key) {
                return active;
              } else {
                return e;
              }
            });
            resolve(t);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
  onChange = (e, key) => {
    //update the state on live basis , avoiding the loop and iteration of elements after submission
    //find elemen
    // then prepare its new State
    // update State
    this.findElementFromState(e, key)
      .then(result => this.prepareNewState(result))
      .then(formJson => {
        return this.setState({ formJson });
      });
  };
  handleSubmit = event => {
    console.log("Result ===> ", this.buildResult());
    event.preventDefault();
  };

  buildResult() {
    // responsible showing just the elements from state
    // no calculation of data is required as we have already dealt with it earlier during on change
    let showResult = [...this.state.formJson];
    return showResult.map(e => {
      return {
        label: e.label,
        value: e.currentValue,
        isValid: e.isValid
      };
    });
  }
  render() {
    return (
      <React.Fragment>
        <form className="container card" onSubmit={this.handleSubmit}>
          <TextBox
            textBoxes={this.state.formJson.filter(e => e.inputType === "input")}
            onChange={this.onChange}
          />
          <RadioButton
            radioButtons={this.state.formJson.filter(
              e => e.inputType === "radio"
            )}
            onChange={this.onChange}
          />
          <SelectBox
            selectBoxes={this.state.formJson.filter(
              e => e.inputType === "select"
            )}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
