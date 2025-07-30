import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/styles-timer.css"; 



import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");


const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let timerId = null;
let userSelectedDate = null;

startBtn.disabled = true;
// datePicker.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  locale: {
    weekdays: {
      shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      longhand: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
    }
  },

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future!',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    // iconUrl: 'https://cdn-icons-png.flaticon.com/512/463/463612.png',
    position: 'topRight',
//     padding: '20px',
// width: '302px',
// height: '64px',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);



startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      datePicker.disabled = false;
      return;
    }

    updateTimerDisplay(diff);
  }, 1000);
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// iziToast.error({
//     title: 'Error',
//     message: '"Please choose a date in the future"!',
//     backgroundColor: '#ef4040;',
//     messageColor: '#fff',
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/463/463612.png',
//     position: 'bottomRight',
//     border-bottom: '2px solid #ffbebe',
//     border-radius: '4px', 
//     position: `bottomRight`,
//   });