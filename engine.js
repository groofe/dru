const SITE_MAP = [
  {
    title: 'begin',
    src: '1'
  },
  {
    title: 'transend',
    src: '2'
  }
]
const CHAPTER_DIR = './ch'
const FILE_EXTENSION = '.html'

const pretty = function(html) {
  return html
    .split('\n')
    .map(line => `<p class="line">${line}</p>`).join('\n')
}

const renderIndex = function(elem) {
  let html = ''
  for (const link of SITE_MAP) {
    html += `
      <div class="ch">
        <a class="ch" href="${CHAPTER_DIR}/${link.src}${FILE_EXTENSION}">${link.title}</a>
      </div>
    `
  }

  elem.innerHTML = html
}

const renderChapter = function(elem) {
  elem.innerHTML = pretty(elem.innerHTML)
}

const renderFooter = function(elem) {
  let fileName = window.location.pathname.match(/.*.html$/)[0]
  if (fileName) {
    const parts = fileName.split('/')
    fileName = parts[parts.length-1].replace('.html', '')
  }
  let currPos = SITE_MAP.findIndex(function(s) {
    return s.src === fileName
  }) || 0
  const nextPage = SITE_MAP[currPos+1]

  let nextLink;
  if (nextPage) {
    nextLink = `<a class="line" href="${nextPage.src}${FILE_EXTENSION}">>></a>`
  }
  const indexLink = `<a class="line" href="${`${'.'.repeat(CHAPTER_DIR.split('/').length)}/index.html`}">return</a>`

  elem.innerHTML = elem.innerHTML.concat(`
    <div class="footer">
      ${nextPage ? nextLink : indexLink}
    </div>
  `)
}

function run() {
  const bodyElem = document.querySelector('body')
  if (!bodyElem) {
    return
  }

  switch (bodyElem.id) {
    case 'index': 
      renderIndex(bodyElem)
      break
    default:
      renderChapter(bodyElem)
      renderFooter(bodyElem)
      break
  }
}

window.onload = function() {
  run()
}
