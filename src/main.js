/*

  /===>  Steps  <===/

  1 : Get all inputs that we have. and put them into variables
  2 : Collect all inputs data 
  3 : Check if  there any  Errors
  4 : Calculate data 
  5 : Add results on screen  / [DOM]
  6 : Run main() function 
  7 : We are finshed

*/

// Data input
let inputData = {
  bill: 0,
  tip: 0,
  people: 0,
  tipHtmlElement: 0,
};

// Data output
let outputData = {
  tip: 0,
  total: 0,
};

//  variables
const bill = document.getElementById("bill");
const people = document.getElementById("numberPeople");
const customTip = document.getElementById("customTip");
const resetButton = document.getElementById("reset");
const errorMessage = document.getElementById("error-message");
const tipsPercentage = document.getElementById("tipsPercentage");

// output varibles
const total = document.getElementById("total");
const tip = document.getElementById("tip");

//First checkValueFunction(data) => check if the value !== 0 and not equal a NaN
function checkValueFunction(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value === 0) {
    return false;
  }
  if (value.length == 0) {
    return false;
  }

  return true;
}

// CollectDataFunction () => data Ready To use
function CollectDataFunction() {
  // take bill input
  if (checkValueFunction(bill.value)) {
    inputData.bill = Number(bill.value);
  }

  //take tip data
  tipsPercentage.addEventListener("click", (element) => {
    var elementSelected = element.target.value;
    if (checkValueFunction(elementSelected)) {
      inputData.tip = elementSelected;
      // add style to the selected tip
      element.target.classList.add("selected-tip");

      // store the element
      inputData.tipHtmlElement = element.target;
    }
  });

  // take number of people
  if (checkValueFunction(people.value)) {
    inputData.people = Number(people.value);
  }

  // take custom tip
  if (checkValueFunction(customTip.value)) {
    inputData.tip = Number(customTip.value);
  }
}
// calc result
function caluclateTip(bill, tip, people) {
  if (bill !== 0 && people !== 0 && tip !== 0) {
    const tipOutput = (tip * bill) / (100 * people);
    const total = bill / people + tipOutput;

    outputData.tip = tipOutput.toFixed(2);
    outputData.total = total.toFixed(2);
  }
}
// push result of caluclation in DOM
function addResultToDOM() {
  tip.textContent = `$${outputData.tip}`;
  total.textContent = `$${outputData.total}`;
}

function checkErrorsFunction() {
  // inputData people
  if (checkValueFunction(inputData.people) === false) {
    errorMessage.style.display = "block";
  }
}

function reset() {
  if (inputData.bill !== 0 || inputData.people !== 0 || inputData.tip !== 0) {
    // Reset data
    inputData = { ...inputData, tip: 0, bill: 0, people: 0 };
    //Reset
    total.textContent = "$0";
    tip.textContent = "$0";
    //Reset inputs {bill , tip , people}
    bill.value = "";
    people.value = "";
    customTip.value = "";
    // reset tip
    inputData.tipHtmlElement.classList.remove("selected-tip");
    // Reset button
    resetButton.style.cursor = "not-allowed";
    resetButton.classList.remove("active-reset-button");
  }
}

function changeStateOfResetBotton() {
  resetButton.classList.add("active-reset-button");
  resetButton.style.cursor = "pointer";
}

function main() {
  CollectDataFunction();
  // callc data
  people.addEventListener("change", () => {
    //collect all Data
    CollectDataFunction();
    // check if any Errors
    checkErrorsFunction();
    // calculate data
    caluclateTip(inputData.bill, inputData.tip, inputData.people);
    // add data on DOM
    addResultToDOM();
    // button
    changeStateOfResetBotton();
  });

  document.getElementById("reset").addEventListener("click", reset);
}

// Run
main();
