import './style.css';
// import './assets/icon.jpg'
const imageContext = require.context('./assets', false, /\.(jpg|jpeg|png)$/);
const cards = ['fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466'];

const buttonComponent = '<button><img src="CARD_ID.jpg"></button>';

function component() {
  const cardGrid = document.getElementsByClassName('cards')[0];
  
  cards.forEach(c => {
    const btn = document.createElement('button');
    const img = document.createElement('img');
    img.src = imageContext(`./${c}.jpg`);
    btn.appendChild(img);
    cardGrid.appendChild(btn);
  })

}

component();