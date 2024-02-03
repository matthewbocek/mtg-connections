const cards = ['fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466','fc9a7c57-bc83-4965-b670-144a0019b466'];

const buttonComponent = '<button><img src="CARD_ID.jpg"></button>';

function component() {
  const element = document.getElementsByClassName('cards')[0];
  
  cards.forEach(c => {
    element.append(buttonComponent.replace("CARD_ID",c));
  })

}

component();