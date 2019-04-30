function run() {
  var bodyElem = document.querySelector('body');
  if (bodyElen) {
    bodyElem.innerHTML = bodyElem.innerHTML.split('\n').map(l => `<p>${l}</p>`).join('\n'); 
  }
}

window.onload = function() {
  run(); 
}
