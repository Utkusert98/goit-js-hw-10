import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  const selectedState = Array.from(stateInputs).find(input => input.checked)?.value;

  if (!selectedState) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state (Fulfilled or Rejected)',
    });
    return;
  }

  new Promise((resolve, reject) => {
    setTimeout(() => {
      selectedState === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Promise fulfilled in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Promise rejected in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});
