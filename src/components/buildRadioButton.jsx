import React, { Component } from "react";
class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // render all the radio buttons in the API
    let model = this.props.radioButtons;
    let formUI = model.map(m => {
      let props = m.othrAttr;
      let key = m.key;
      let inputType = m.inputType;
      let currentValue = m.currentValue;

      let radio = m.value.map(o => {
        let checked = o === currentValue;
        return (
          <div key={"radio" + o} className="form-check">
            <input
              {...props}
              className="form-check-input"
              type={inputType}
              key={o}
              name={key}
              value={o}
              checked={checked}
              onChange={e => {
                this.props.onChange(e, key);
              }}
            />

            <label key={"ll" + o} className="form-check-label">
              {o}
            </label>
          </div>
        );
      });
      return (
        <div key={"g" + key} className="form-group" {...props}>
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          {radio}
        </div>
      );
    });
    return <React.Fragment>{formUI}</React.Fragment>;
  }
}

export default RadioButton;
