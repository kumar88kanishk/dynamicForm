import helper from "../helper/helper";
export default class abstractState {
  constructor() {
    this.helper = new helper();
  }
  // responsible for building default propeties of an element with received properties through API
  // OR
  // building elements with default values
  //label: Label for the field
  // type: Type of field
  // value: Values for that field
  // default: Value to select, if multiple values are specified
  // isOptional: If it is optional to specify a value for the field
  // isHidden: Specifies if the field should be hidden in the form
  stateBuilder = response => {
    return response.map(e => {
      var o = Object.assign({});
      o.label = e.label || e.type;
      o.type = e.type;
      o.inputType =
        e.type === "radio" || e.type === "select" ? e.type : "input";
      o.currentValue = e.default || "";
      o.value = e.value || "";
      o.othrAttr = {
        required: e.isOptional === false ? "required" : "",
        hidden: e.isHidden || false
      };
      o.key = this.helper.camelize(o.label);
      o.isValid = false;
      return o;
    });
  };
}
