let display = document.getElementById("display");
let currentInput = "";
let operator = null;
let firstOperand = null;
let resetNext = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return "Nope.";
    return a / b;
}

function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

function updateDisplay() {
    display.textContent = currentInput || "0";
}

document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        if (resetNext) {
            currentInput = "";
            resetNext = false;
        }
        if (currentInput === "0") currentInput = "";
        currentInput += button.textContent;
        updateDisplay();
    });
});

document.getElementById("decimal").addEventListener("click", () => {
    if (resetNext) {
        currentInput = "0";
        resetNext = false;
    }
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        if (operator && currentInput !== "") {
            currentInput = operate(operator, firstOperand, currentInput);
            if (currentInput === "Nope.") {
                resetCalculator();
                display.textContent = currentInput;
                return;
            }
            currentInput = String(Math.round(parseFloat(currentInput) * 1000) / 1000);
        }
        operator = button.dataset.operator;
        firstOperand = currentInput;
        resetNext = true;
    });
});

document.getElementById("equals").addEventListener("click", () => {
    if (!operator || currentInput === "") return;
    currentInput = operate(operator, firstOperand, currentInput);
    if (currentInput === "Nope.") {
        resetCalculator();
        display.textContent = currentInput;
        return;
    }
    currentInput = String(Math.round(parseFloat(currentInput) * 1000) / 1000);
    updateDisplay();
    operator = null;
    firstOperand = null;
    resetNext = true;
});

document.getElementById("clear").addEventListener("click", () => {
    resetCalculator();
});

function resetCalculator() {
    currentInput = "";
    operator = null;
    firstOperand = null;
    resetNext = false;
    updateDisplay();
}

document.getElementById("backspace").addEventListener("click", () => {
    if (!resetNext) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
});

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) document.querySelector(`.digit:contains('${e.key}')`)?.click();
    if (["+", "-", "*", "/"].includes(e.key)) document.querySelector(`.operator[data-operator='${e.key}']`)?.click();
    if (e.key === ".") document.getElementById("decimal").click();
    if (e.key === "Enter" || e.key === "=") document.getElementById("equals").click();
    if (e.key === "Backspace") document.getElementById("backspace").click();
    if (e.key.toLowerCase() === "c") document.getElementById("clear").click();
});
