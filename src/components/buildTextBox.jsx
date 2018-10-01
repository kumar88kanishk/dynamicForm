import React, { Component } from "react";

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // render all the textboxes in the API
    let model = this.props.textBoxes;
    let formUI = model.map(m => {
      let props = m.othrAttr;
      let key = m.key;
      let inputType = m.inputType;
      let currentValue = m.currentValue;
      let textBoxDiv = (
        <div key={"g" + key} className="form-group" {...props}>
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          <input
            {...props}
            className="form-control"
            type={inputType}
            key={key}
            name={key}
            value={currentValue}
            onChange={e => {
              this.props.onChange(e, key);
            }}
          />
        </div>
      );

      return textBoxDiv;
    });
    return <React.Fragment>{formUI}</React.Fragment>;
  }
}

export default TextBox;
