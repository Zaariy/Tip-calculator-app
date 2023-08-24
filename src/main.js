// data
let data = {
  bill: 0,
  tip: 0,
  people: 0,
  tipHtmlElement: 0,
};
// public varibles
const bill = document.getElementById("bill");
const people = document.getElementById("numberPeople");
const customTip = document.getElementById("customTip");
const resetButton = document.getElementById("reset");
const errorMessage = document.getElementById("error-message");
//

function checkValue(value) {
  if (Number(value) !== 0) {
    return true;
  }
  return false;
}

function getValueTip(tip, element) {
  if (checkValue(tip)) {
    data.tip = Number(tip);
    data.tipHtmlElement = element;
    element.classList.add("selected-tip");
    caluclateTip();
  }
}

function CollectData() {
  // bill
  bill.addEventListener("mouseout", (e) => {
    if (checkValue(e.target.value)) {
      data.bill = Number(e.target.value);
      changeStateOfResetBotton();
      caluclateTip();
    }
  });

  bill.addEventListener("focusout", (e) => {
    if (checkValue(e.target.value)) {
      data.bill = Number(e.target.value);

      caluclateTip();
      changeStateOfResetBotton();
    }
  });

  // customTip
  customTip.addEventListener("mouseout", (e) => {
    if (checkValue(e.target.value)) {
      data.tip = Number(e.target.value);
      caluclateTip();
      changeStateOfResetBotton();
    }
  });
  customTip.addEventListener("focusout", (e) => {
    if (checkValue(e.target.value)) {
      data.tip = Number(e.target.value);
      changeStateOfResetBotton();

      caluclateTip();
    }
  });

  // people
  people.addEventListener("mouseout", (e) => {
    if (checkValue(e.target.value)) {
      people.classList.remove("error-border");
      errorMessage.style.display = "none";
      data.people = Number(e.target.value);
      changeStateOfResetBotton();
      caluclateTip();
    } else {
      people.classList.add("error-border");
      errorMessage.style.display = "block";
    }
  });

  people.addEventListener("focusout", (e) => {
    if (checkValue(e.target.value)) {
      data.people = Number(e.target.value);
      changeStateOfResetBotton();
    }
    caluclateTip();
  });
}

function caluclateTip() {
  if (data.bill !== 0 && data.people !== 0 && data.tip !== 0) {
    const tip = (data.tip * data.bill) / (100 * data.people);
    const total = data.bill / data.people + tip;

    // set Data on DOM
    setDataOnDOM(tip.toFixed(2), total.toFixed(2));
  }
}

function setDataOnDOM(tip, total) {
  document.getElementById("tip").textContent = `$${tip}`;
  document.getElementById("total").textContent = `$${total}`;
}

function reset() {
  if (data.bill !== 0 || data.people !== 0 || data.tip !== 0) {
    // Reset data
    data = { ...data, tip: 0, bill: 0, people: 0 };
    //Reset
    setDataOnDOM(0, 0);
    //Reset inputs {bill , tip , people}
    document.getElementById("bill").value = "0";
    document.getElementById("numberPeople").value = "0";
    document.getElementById("customTip").value = "0";
    // reset tip
    data.tipHtmlElement.classList.remove("selected-tip");
    // Reset button
    resetButton.style.cursor = "not-allowed";
    resetButton.classList.remove("active-reset-button");
  }
}

function changeStateOfResetBotton() {
  resetButton.classList.add("active-reset-button");
  resetButton.style.cursor = "pointer";
}
CollectData();

document.getElementById("reset").addEventListener("click", reset);
