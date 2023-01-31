import Notiflix from 'notiflix';

import 'notiflix/dist/notiflix-3.2.6.min.css';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const submitHandler = event => {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delay_current = parseInt(delay.value);

  for (let position = 1; position <= amount.value; position++) {
    console.log(position);
    console.log(delay_current);

    createPromise(position, delay_current)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );

    delay_current += parseInt(step.value);
  }
};

const form = document.querySelector('.form');

form.addEventListener('submit', submitHandler);
