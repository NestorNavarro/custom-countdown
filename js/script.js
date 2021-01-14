const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElemetns = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Todat's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take Values from Form Input
const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    console.log(savedCountdown)
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check for valid date
    if (countdownDate === ''){
        alert('Please select a date for the coutdown.');
    } else {
        // Get number version of curent Date, uptdateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(() =>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;
        
        //If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            //Else, show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElemetns[0].textContent = `${days}`;
            timeElemetns[1].textContent = `${hours}`;
            timeElemetns[2].textContent = `${minutes}`;
            timeElemetns[3].textContent = `${seconds}`;
            inputContainer.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

// Reset All Values
const reset = () => {
    // Hide Countdowns, show Inputs
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}


const retorePreviousCountdown = () => {
    // Get countdown from localStorage if aviable
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        coutdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//On Load
retorePreviousCountdown();