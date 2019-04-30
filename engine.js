function run() {
  var bodyElem = document.querySelector('body');
  bodyElem.innerHTML = bodyElem.innerHTML.split('\n').map(l => `<p>${l}</p>`).join('\n');
}

run();
