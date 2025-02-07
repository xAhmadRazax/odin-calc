import { Calculator } from "./calculator.js";

const calc = new Calculator();

const validOperators = calc.validOperators;
function firstStringCharIsOperator(str, key) {
  // checking if first array element is - than allowed user to add number after it
  //  as we are not adding operator if they appear as first char
  if (key === "-") {
    return false;
  }
  return str === "" && validOperators.includes(key);
}
// function firstStringCar/
function hasConsecutiveOperators(str) {
  return validOperators.includes(str[str.length - 1]);
}

function hasPeriodInEachOperand(str) {
  const operator = validOperators.find((el) => str.includes(el));
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
  return `${str.substring(0, str.length - 1)}${key}`;
}

function allowedToPerformCalculation(str) {
  // this function check a operation should perform or not
  // to do that we every time user click on a operation remove the last operation and
  // check for each string again the operating arr to find which operation we have to perform
  // than check if the array size is of three and than perform the operation
  const operator = validOperators.find((el, index) => {
    if (index === 1 && el === "-") {
      return false;
    }
    return str.includes(el);
  });

  console.log(operator, str);
  const strArr = str
    .trim()
    .split(operator)
    .filter((el) => el !== "");
  console.log(strArr);
  if (strArr.length < 2) {
    return false;
  }
  return true;
}

function performCalculation(str) {
  const operator = validOperators.find((el, index) => {
    if (index === 1 && el === "-") {
      return false;
    }
    return str.includes(el);
  });
  const strArr = str.split(operator).filter((el) => el !== "");
  console.log(operator, strArr);
  //  since split would remove all the operator even - with first num
  // so we are checking if str at first has - than add it to the str in arr element
  if (str[0] === "-" && !strArr[0].startsWith("-")) {
    strArr[0] = "-" + strArr.at(0);
  }
  console.log("i will perform my duties");
  return calc.methods[operator](+strArr[0], +strArr[1]);
}

function decimalPointInputHandler(calcScreenInputEl, inputValue) {
  if (inputValue === ".") {
    if (hasPeriodInEachOperand(calcScreenInputEl.value)) {
      return;
    }
    calcScreenInputEl.value += inputValue;
  }
}
function equalsInputHandler(calcScreenInputEl, inputValue) {
  if (
    inputValue === "=" &&
    !hasPeriodBeforeOperator(calcScreenInputEl.value) &&
    allowedToPerformCalculation(calcScreenInputEl.value)
  ) {
    console.log("performing calculation");
    return (calcScreenInputEl.value = performCalculation(
      calcScreenInputEl.value
    ));
  }
}
function integerInputHandler(calcScreenInputEl, inputValue) {
  if (Number.isInteger(+inputValue)) {
    if (
      calcScreenInputEl.value === "ERROR" ||
      calcScreenInputEl.value === "INFINITY"
    ) {
      return (calcScreenInputEl.value = "");
    }

    return (calcScreenInputEl.value += +inputValue);
  }
}
function operatorInputHandler(calcScreenInputEl, inputValue) {
  if (
    validOperators.includes(inputValue) &&
    !firstStringCharIsOperator(calcScreenInputEl.value, inputValue)
  ) {
    if (calcScreenInputEl.value === "-" && inputValue !== "-") {
      return (calcScreenInputEl.value = "");
    }
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
        inputValue
      ));

      //

      // return;
    }
    // this allowedToPerformCalculation allowed us to perform calculation when second operator appears
    // or when we have string in operand operator operant form (1+3)
    if (allowedToPerformCalculation(calcScreenInputEl.value) === false) {
      calcScreenInputEl.value += inputValue;
    } else {
      console.log("IM HEREEEE");
      if (
        performCalculation(calcScreenInputEl.value) === "ERROR" ||
        performCalculation(calcScreenInputEl.value) === "INFINITY"
      ) {
        return (calcScreenInputEl.value = performCalculation(
          calcScreenInputEl.value
        ));
      }
      calcScreenInputEl.value =
        performCalculation(calcScreenInputEl.value) + inputValue;
    }
  }
}
function clearScreenInputHandler(calcScreenInputEl, inputValue) {
  if (inputValue === "Escape" || inputValue === "clear") {
    return (calcScreenInputEl.value = "");
  }
}
function deleteLastCharFromInput(calcScreenInputEl, inputValue) {
  if (inputValue == "Backspace" || inputValue === "del") {
    const strLength = calcScreenInputEl.value.length;
    const newInputValue = calcScreenInputEl.value.substring(0, strLength - 1);
    return (calcScreenInputEl.value = newInputValue);
  }
}
function init() {
  const calcScreenInputEl = document.querySelector("[data-calc-screen]");

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    integerInputHandler(calcScreenInputEl, e.key);
    decimalPointInputHandler(calcScreenInputEl, e.key);
    equalsInputHandler(calcScreenInputEl, e.key);
    clearScreenInputHandler(calcScreenInputEl, e.key);
    deleteLastCharFromInput(calcScreenInputEl, e.key);
    operatorInputHandler(calcScreenInputEl, e.key);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-calc-button]")) {
      return;
    }
    const calcButtonValue =
      e.target.closest("[data-calc-button]").dataset.calcButton;
    integerInputHandler(calcScreenInputEl, calcButtonValue);
    decimalPointInputHandler(calcScreenInputEl, calcButtonValue);
    equalsInputHandler(calcScreenInputEl, calcButtonValue);
    clearScreenInputHandler(calcScreenInputEl, calcButtonValue);
    deleteLastCharFromInput(calcScreenInputEl, calcButtonValue);
    operatorInputHandler(calcScreenInputEl, calcButtonValue);
  });
}

document.addEventListener("DOMContentLoaded", init);
