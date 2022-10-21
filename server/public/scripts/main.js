const text = ["Welcome", "I'm David"];
let counter = 0;
let index = 0;
let currentTxt = '';
let letter = '';
const typing = document.querySelector('.typing');

(function type(){
    //if(counter === text.length){
      //  counter = 0;
    //}
    
    currentTxt = text[counter];
    letter = currentTxt.slice(0, ++index);
    
    typing.textContent = letter;
    
    if (letter.length == currentTxt.length) {
        counter++;
        index =0; 
    }
    if(letter.length == currentTxt.length && counter == text.length) return 0
    setTimeout(type, 400);
}());


// active nav styling
window.onload = (event) =>{
  // const path = /\w+/.exec(location.pathname);
  document.querySelectorAll(".link").forEach((n, i) => {
    if(location.pathname === n.getAttribute('href')){
      n.classList.add('selected');
    }
  })
}