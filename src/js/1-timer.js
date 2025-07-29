import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
let intervalId = null;

refs.startBtn.disabled = true;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (selected <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      selectedTime = selected;
      refs.startBtn.disabled = false;
    }
  },
});

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    const diff = selectedTime - now;

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    refs.days.textContent = padZero(days);
    refs.hours.textContent = padZero(hours);
    refs.minutes.textContent = padZero(minutes);
    refs.seconds.textContent = padZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const sec = 1000;
  const min = sec * 60;
  const hr = min * 60;
  const day = hr * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hr);
  const minutes = Math.floor((ms % hr) / min);
  const seconds = Math.floor((ms % min) / sec);
  return { days, hours, minutes, seconds };
}

function padZero(value) {
  return String(value).padStart(2, '0');
}
