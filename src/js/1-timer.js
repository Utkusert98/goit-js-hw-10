// DOM elemanlarını seçiyoruz
const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownInterval = null;
let selectedDate = null;

// Flatpickr'ı başlatıyoruz (flatpickr global olarak CDN'den yüklendi)
flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      alert('Lütfen gelecekte bir tarih seçin.');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = selectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateDisplay(0, 0, 0, 0);
      alert('Geri sayım tamamlandı!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function updateDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}
