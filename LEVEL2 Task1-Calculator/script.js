// Selecting the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

// Initial state
let currentInput = '';
let previousInput = '';
let operator = null;
let isOperatorPressed = false;

// Event listeners for number and decimal buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // If the operator was just pressed, reset the currentInput for new number
        if (isOperatorPressed) {
            currentInput = '';
            isOperatorPressed = false;
        }

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.innerText = previousInput + " " + (operator ? operator : '') + " " + currentInput;
        }
    });
});

// Event listener for operator buttons
document.querySelectorAll('.operator').forEach(opButton => {
    opButton.addEventListener('click', () => {
        if (currentInput !== '') {
            if (previousInput !== '' && operator !== null) {
                currentInput = evaluateExpression(previousInput, currentInput, operator);
                previousInput = currentInput;
                currentInput = '';
            } else {
                previousInput = currentInput;
            }
            operator = opButton.getAttribute('data-value');
            isOperatorPressed = true;
            
            display.innerText = previousInput + " " + operator;
        }
    });
});

// Event listener for equals button
equals.addEventListener('click', () => {
    if (currentInput !== '' && previousInput !== '' && operator !== null) {
        currentInput = evaluateExpression(previousInput, currentInput, operator);
        display.innerText = currentInput;
        operator = null;
        previousInput = '';
        isOperatorPressed = false;
    }
});

// Event listener for clear button
clear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.innerText = '';
    isOperatorPressed = false;
});

// Function to evaluate the expression
function evaluateExpression(num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (a / b).toString();
        default:
            return '';
    }
}
