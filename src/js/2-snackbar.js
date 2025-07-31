import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value; // 'fulfilled' veya 'rejected'

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Başarılı',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'bottomCenter',
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.error({
        title: 'Hata',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'bottomCenter',
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
});

/**
 * Verilen gecikme ve duruma göre Promise üreten fonksiyon
 * @param {number} delay - ms cinsinden gecikme süresi
 * @param {'fulfilled'|'rejected'} state - Promise durumu
 * @returns {Promise<number>} delay ile resolve veya reject olan promise
 */
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
