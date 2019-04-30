function run() {
  var bodyElem = document.querySelector('body')
  if (bodyElem) {
    bodyElem.
    bodyElem.innerHTML = bodyElem.innerHTML
      .split('\n')
      .map(line => `<p class="line">${line}</p>`).join('\n')
  }
}

window.onload = function() {
  run()
}
