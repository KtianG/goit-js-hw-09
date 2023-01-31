import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let selected_date = null;
let timerIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const current_date = new Date();
    if (selectedDates[0] - current_date > 0) {
      start_button.disabled = false;
      selected_date = selectedDates[0];
      console.log(selected_date);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      start_button.disabled = true;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  padded_value = value.toString().padStart(2, '0');
  return padded_value;
}

const refresh_timer = () => {
  const this_moment = new Date();
  const ms_left = selected_date - this_moment;

  if (ms_left > 0) {
    const { days, hours, minutes, seconds } = convertMs(ms_left);
    console.log(addLeadingZero(days), hours, minutes, seconds);
    counter_days.innerHTML = addLeadingZero(days);
    counter_hours.innerHTML = addLeadingZero(hours);
    counter_minutes.innerHTML = addLeadingZero(minutes);
    counter_seconds.innerHTML = addLeadingZero(seconds);
  } else {
    clearInterval(timerIntervalId);
  }
};

// Handling click on start button
const startHandler = () => {
  if (!timerIntervalId) {
    timerIntervalId = setInterval(refresh_timer, 1000);
    dateInput.disabled = true;
  }
};

// Setting up all Selectors
const dateInput = document.querySelector('input#datetime-picker');
const start_button = document.querySelector('[data-start]');
const counter_days = document.querySelector('[data-days]');
const counter_hours = document.querySelector('[data-hours]');
const counter_minutes = document.querySelector('[data-minutes]');
const counter_seconds = document.querySelector('[data-seconds]');

// Disabling Start Button at page loading
start_button.disabled = true;

// Initializing flatpickr
flatpickr(dateInput, options);

start_button.addEventListener('click', startHandler);
