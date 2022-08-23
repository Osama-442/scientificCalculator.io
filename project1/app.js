"use strict";

// Buttons Data

const operations = [
  { id: "clear", display: "C" },
  
  { id: "pi", display: "π" },
  { id: "euler", display: "e" },
  { id: "backspace", display: "X" },
  { id: "cosin", display: "cos" },
  { id: "sin", display: "sin" },
  { id: "tangent", display: "tan" },
  { id: "divide", display: "/" },
  { id: "number", display: 7 },
  { id: "number", display: 8 },
  { id: "number", display: 9 },
  { id: "multiply", display: "*" },
  { id: "number", display: 4 },
  { id: "number", display: 5 },
  { id: "number", display: 6 },
  { id: "addition", display: "+" },
  { id: "number", display: 1 },
  { id: "number", display: 2 },
  { id: "number", display: 3 },
  { id: "minus", display: "-" },
  { id: "point", display: "." },
  { id: "number", display: 0 },
  { id: "exponent", display: "^" },
  { id: "root", display: "√" },
  { id: "percentage", display: "%" },
  { id: "parenthesis", display: "(" },
  { id: "parenthesis", display: ")" },
  { id: "equals", display: "=" },
];
// Display buttons

const btnSection = document.querySelector(".calc");
let addedBtns = 0;
operations.forEach((btns) => {
  addedBtns++;

  btnSection.insertAdjacentHTML(
    "beforeend",
    `<button id= ${btns.id} class="btn-inputs">${btns.display}</button>`
  );
});

//Selectors
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const buttonInputs = document.querySelectorAll(".btn-inputs");
const manualInputs = document.querySelector(".manualInput");
const numbers = document.querySelector("#numbers");
const equals = document.querySelector("#equals");
const historyElem = document.querySelector("#history");
const outputHistory = document.querySelector(".historyDisplay");
const historyItem = document.querySelector(".history_item");

buttonInputs.forEach((items) => {
  items.addEventListener("click", (e) => {
    let btnInputs = e.target.innerText;
    if (btnInputs === "x") {
      btnInputs = "*";
    }
    if (btnInputs === "X") {
      btnInputs = "";
    }
    if (btnInputs === "=") {
      btnInputs = "";
    }
    if (btnInputs === "%") {
      btnInputs = "";
    }
    if (btnInputs === "√") {
      btnInputs = "sqr";
    }
    if (btnInputs === "^") {
      btnInputs = "**";
    }
    display.innerText += btnInputs;
  });
});



let historyDisplay = [];
const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const π = Math.PI;
const sqr = Math.sqrt;
const e = Math.E;


//Clear inputs 

clear.addEventListener("click", (e) => {
  display.innerText = "";
});

// Backspace function // WORKS

backspace.addEventListener("click", (e) => {
  const values = display.innerText.split("");
  const removedValue = values.slice(0, -1);
  display.innerText = removedValue.join("");
});

// Percentage
percentage.addEventListener("click", () => {
  display.innerText = Number(eval(display.innerText + "/100"));
});

// Calculation with '=' button
equals.addEventListener("click", (e) => {
  result();
 
});


// For Keyboard inputs
manualInputs.addEventListener("keyup", (e) => {
  display.innerText = e.target.value;
  if (e.key === "Enter") {
    result();
    e.target.value = "";
  }
});


// Calculation function

const result = () => {

  try{
    const values = display.innerText.split("");
    console.log(values);
    let leftPara = values.indexOf("(");
    let rightPara = values.indexOf(")");
  
    if (leftPara !== -1 && !values.includes("c") && !values.includes("s") && !values.includes("t") ) {
      values[leftPara] = "*";
      values[rightPara] = "*";
      console.log(values);
    }
  
    if ( rightPara === values.length - 1 && !values.includes("c") && !values.includes("s") && !values.includes("t")
    ) {
      values[leftPara] = "*";
      values[rightPara] = "";
      console.log(values);
    }
  
  
    const joined = values.join("").trim();
    display.innerText = Number(eval(joined));
    return history(joined);
  }
  catch(error){
    console.log(error.name , error.message)

  }

  
 
};






//history
function history(history) {
  const newHistory = document.createElement("small");
  
  const line = document.createElement("hr");

  newHistory.classList.add("history_item");
 
  
  historyDisplay.push(history + "=" + Number(eval(history)).toFixed(2));

  historyDisplay.forEach((items) => {
    newHistory.innerText = items;
  });
  outputHistory.appendChild(newHistory);
  
  outputHistory.appendChild(line);
  eval(history);
}
