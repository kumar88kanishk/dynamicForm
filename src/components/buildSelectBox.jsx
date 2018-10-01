import React, { Component } from "react";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // render all the select boxes in the API
    let model = this.props.selectBoxes;
    let formUI = model.map(m => {
      let props = m.othrAttr;
      let key = m.key;
      let currentValue = m.currentValue;

      let select = m.value.map(o => {
        return (
          <option {...props} className="form-control" key={o} value={o}>
            {o}
          </option>
        );
      });
      select = (
        <select
          value={currentValue}
          className="form-control"
          name={key}
          onChange={e => {
            this.props.onChange(e, key);
          }}
        >
          {select}
        </select>
      );
      return (
        <div key={"g" + key} className="form-group" {...props}>
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          {select}
        </div>
      );
    });
    return <React.Fragment>{formUI}</React.Fragment>;
  }
}

export default SelectBox;
