const body = document.querySelector('body');
const start_button = document.querySelector('[data-start]');
const stop_button = document.querySelector('[data-stop]');
let colorChangerID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColor = () => {
  body.style.backgroundColor = getRandomHexColor();
  console.log('Color Changed');
};

const handleStart = () => {
  console.log('Click');
  colorChangerID = setInterval(changeColor, 1000);
  start_button.disabled = true;
};

const handleStop = () => {
  clearInterval(colorChangerID);
  console.log('Color Change Stopped');
  start_button.disabled = false;
};

start_button.addEventListener('click', handleStart);
stop_button.addEventListener('click', handleStop);
