import { Calculator } from "./calculator.js";

const calc = new Calculator();

const allowedOperator = ["+", "-", "*", "/", "%"];
function firstStringCharIsOperator(str, key) {
  return str === "" && allowedOperator.includes(key);
}
function hasConsecutiveOperators(str) {
  return allowedOperator.includes(str[str.length - 1]);
}

function hasPeriodInEachOperand(str) {
  const operator = allowedOperator.find((el) => str.includes(el));
  const strArr = str.split(operator);
  if (strArr.length === 1) {
    return strArr[0].includes(".");
  }
  return strArr[1].includes(".");
}
function hasPeriodBeforeOperator(str) {
  return str.at(-1) === ".";
}
function replaceLastOperator(str, key) {
  console.log(key, key);
  return `${str.substring(0, str.length - 1)}${key}`;
}
// function allowedToPerformCalculation(str) {
//   // this function check a operation should perform or not
//   // to do that we every time user click on a operation remove the last operation and
//   // check for each string again the operating arr to find which operation we have to perform
//   // than check if the array size is of three and than perform the operation
//   const operator = allowedOperator.find((el) => str.includes(el));

//   const strArr = str.split(operator);
//   if (strArr.length < 2) {
//     return false;
//   }
//   return calc.methods[operator](+strArr[0], +strArr[1]);
// }

function allowedToPerformCalculation(str) {
  // this function check a operation should perform or not
  // to do that we every time user click on a operation remove the last operation and
  // check for each string again the operating arr to find which operation we have to perform
  // than check if the array size is of three and than perform the operation
  const operator = allowedOperator.find((el) => str.includes(el));
  const strArr = str.trim().split(operator);

  if (strArr.at(-1) === "" || strArr.length < 2) {
    return false;
  }
  return true;
}

function performCalculation(str) {
  const operator = allowedOperator.find((el) => str.includes(el));
  const strArr = str.split(operator);
  return calc.methods[operator](+strArr[0], +strArr[1]);
}
function init() {
  const calcScreenInputEl = document.querySelector("[data-calc-screen]");

  document.addEventListener("keyup", (e) => {
    console.log(e.key);
    if (Number.isInteger(+e.key)) {
      if (
        calcScreenInputEl.value === "ERROR" ||
        calcScreenInputEl.value === "INFINITY"
      ) {
        return (calcScreenInputEl.value = "");
      }

      calcScreenInputEl.value += +e.key;
    }
    if (e.key === ".") {
      if (hasPeriodInEachOperand(calcScreenInputEl.value)) {
        return;
      }
      calcScreenInputEl.value += e.key;
    }
    if (
      e.key === "=" &&
      !hasPeriodBeforeOperator(calcScreenInputEl.value) &&
      allowedToPerformCalculation(calcScreenInputEl.value)
    ) {
      return (calcScreenInputEl.value = performCalculation(
        calcScreenInputEl.value
      ));
    }
    if (e.key === "Escape") {
      return (calcScreenInputEl.value = "");
    }
    if (e.key == "Backspace") {
      const strLength = calcScreenInputEl.value.length;
      const newCalcValue = calcScreenInputEl.value.substring(0, strLength - 1);
      calcScreenInputEl.value = newCalcValue;
    }
    if (
      allowedOperator.includes(e.key) &&
      !firstStringCharIsOperator(calcScreenInputEl.value, e.key)
    ) {
      if (
        calcScreenInputEl.value === "ERROR" ||
        calcScreenInputEl.value === "INFINITY"
      ) {
        return (calcScreenInputEl.value = "");
      }
      // check if the user enter period and then operator (1.+) than convert it to 1.0 +
      if (hasPeriodBeforeOperator(calcScreenInputEl.value)) {
        calcScreenInputEl.value += 0;
      }

      // check if input el is empty and user enter operator then do nothing

      //

      if (hasConsecutiveOperators(calcScreenInputEl.value)) {
        return (calcScreenInputEl.value = replaceLastOperator(
          calcScreenInputEl.value,
          e.key
        ));

        //

        // return;
      }
      // this allowedToPerformCalculation allowed us to perform calculation when second operator appears
      // or when we have string in operand operator operant form (1+3)
      if (allowedToPerformCalculation(calcScreenInputEl.value) === false) {
        calcScreenInputEl.value += e.key;
      } else {
        if (
          performCalculation(calcScreenInputEl.value) === "ERROR" ||
          performCalculation(calcScreenInputEl.value) === "INFINITY"
        ) {
          return (calcScreenInputEl.value = performCalculation(
            calcScreenInputEl.value
          ));
        }
        calcScreenInputEl.value =
          performCalculation(calcScreenInputEl.value) + e.key;
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-calc-button]")) {
      return;
    }
    calcScreenInputEl.value += e.target.dataset.calcButton;
  });
}

document.addEventListener("DOMContentLoaded", init);
