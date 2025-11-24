let bill = 0;
let people = 1;
let tipPercent = 0;

let billInput = document.getElementById('bill');
let peopleInput = document.getElementById('people');
let customTipInput = document.getElementById('customTip');

window.onload = function() {
    if(localStorage.getItem('savedPeople')) {
        peopleInput.value = localStorage.getItem('savedPeople');
        people = Number(peopleInput.value);
    }
    if(localStorage.getItem('savedTip')) {
        customTipInput.value = localStorage.getItem('savedTip');
        tipPercent = Number(customTipInput.value);
    }
    calculate();
};

function setTip(val) {
    tipPercent = val;
    customTipInput.value = val;
    checkAndCalc();
}

billInput.oninput = function() {
    checkAndCalc();
}

peopleInput.oninput = function() {
    checkAndCalc();
}

customTipInput.oninput = function() {
    tipPercent = Number(customTipInput.value);
    checkAndCalc();
}

function checkAndCalc() {
    let valid = true;

    document.getElementById('bill-error').innerText = "";
    document.getElementById('people-error').innerText = "";
    document.getElementById('tip-error').innerText = "";

    bill = Number(billInput.value);
    people = Number(peopleInput.value);
    
    if (bill < 0) {
        document.getElementById('bill-error').innerText = "Не може бути мінусовим";
        valid = false;
    }

    if (people < 1) {
        document.getElementById('people-error').innerText = "Має бути 1 або більше";
        valid = false;
    }

    if (tipPercent < 0) {
        document.getElementById('tip-error').innerText = "Не може бути мінусовим";
        valid = false;
    }

    if (valid) {
        calculate();
        saveData();
    }
}

function calculate() {
    if (people < 1) return;

    let totalTip = bill * (tipPercent / 100);
    let totalSum = bill + totalTip;

    let tipPerPerson = totalTip / people;
    let totalPerPerson = totalSum / people;

    document.getElementById('tip-per-person').innerText = tipPerPerson.toFixed(2);
    document.getElementById('total-per-person').innerText = totalPerPerson.toFixed(2);
}

function saveData() {
    localStorage.setItem('savedPeople', people);
    localStorage.setItem('savedTip', tipPercent);
}

function resetCalc() {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    
    document.getElementById('tip-per-person').innerText = "0.00";
    document.getElementById('total-per-person').innerText = "0.00";
    
    localStorage.clear();
}