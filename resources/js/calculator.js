export function Calculator() {
  const MAX_ALLOW_DIGITS_AFTER_DECIMALS = 5;

  function roundResult(value) {
    return +value.toFixed(MAX_ALLOW_DIGITS_AFTER_DECIMALS);
  }

  this.validOperators = ["+", "-", "*", "/", "%"];

  this.methods = {
    "+": function (a, b) {
      return roundResult(a + b);
    },
    "-": function (a, b) {
      // return roundResult(a - b);
      // const bb = -5;
      console.log(a, b);
      console.log(a - b);
      return a - b;
    },
    "*": function (a, b) {
      return roundResult(a * b);
    },
    "%": function (a, b) {
      if (a === 0 || b === 0) {
        return 0;
      }
      return roundResult((a / 100) * b);
    },

    "/": function (a, b) {
      if (a === 0 && b === 0) {
        return "ERROR";
      }

      if (b === 0) {
        return "INFINITY";
      }
      return roundResult(a / b);
    },
  };

  this.addMethod = function (name, def) {
    this.validOperators.push(name);
    this.methods[name] = def;
  };
}

// export let calc = new Calculator();
