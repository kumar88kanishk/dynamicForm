export default class helper {
  camelize(str) {
    // responsible for creating camel Case string for key and various purposes
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, "");
  }
  isValid(fj) {
    // responsible for checking if the data entered is valid or not
    return new Promise((resolve, reject) => {
      switch (fj["type"]) {
        case "email":
          resolve(/(.+)@(.+){2,}\.(.+){2,}/.test(fj["currentValue"]));
          break;
        case "telephone":
          resolve(/^\d{10}$/.test(fj["currentValue"]));
          break;
        default:
          resolve(
            (fj["othrAttr"]["required"] === "" && fj["currentValue"] === "") ||
              false
          );
      }
    });
  }
}
