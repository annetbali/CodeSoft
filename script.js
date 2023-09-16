// Get references to HTML elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// Initialize variables for input and calculations
let currentInput = "";
let operator = "";
let prevValue = "";

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (buttonText === "C") {
      clear();
    } else if (buttonText >= "0" && buttonText <= "9" || buttonText === ".") {
      handleNumber(buttonText);
    } else if (buttonText === "+" || buttonText === "-" || buttonText === "*" || buttonText === "/" || buttonText === "%") {
      handleOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    }
  });
});

// Clear the calculator
function clear() {
  currentInput = "";
  operator = "";
  prevValue = "";
  display.value = "";
}

// Handle number inputs
function handleNumber(number) {
  currentInput += number;
  display.value = currentInput;
}

function handleOperator(op) {
  if (currentInput !== "") {
    operator = op;
    prevValue = currentInput;
    currentInput = "";
  }
}
// Handle bracket inputs
function handleBracket(bracket) {
  currentInput += bracket;
  display.value = currentInput;
}
// Perform calculations
function calculate() {
  if (operator && prevValue !== "" && currentInput !== "") {
    expression += prevValue + operator + currentInput;
    prevValue = "";
    currentInput = "";
  }

  try {
    const result = eval(expression);
    display.value = result;
    expression = ""; // Clear the expression for future calculations
  } catch (error) {
    display.value = "Error"; // Handle calculation errors
  }
}
// Perform calculations
function calculate() {
  if (operator && prevValue !== "" && currentInput !== "") {
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(prevValue) + parseFloat(currentInput);
        break;
      case "-":
        result = parseFloat(prevValue) - parseFloat(currentInput);
        break;
      case "*":
        result = parseFloat(prevValue) * parseFloat(currentInput);
        break;
      case "/":
        if (currentInput === "0") {
          display.value = "Error"; // Handle division by zero error
          return;
        }
        result = parseFloat(prevValue) / parseFloat(currentInput);
        break;
      case "%":
        result = parseFloat(prevValue) % parseFloat(currentInput);
        break;
    }
    display.value = result;
    currentInput = result.toString();
    prevValue = "";
    operator = "";
  }
}
