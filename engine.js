const SITE_MAP = [
  {
    title: 'begin',
    src: '1'
  },
  {
    title: 'transend',
    src: '2'
  },
  {
    title: 'solace',
    src: '3'
  },
  {
    title: 'brisk',
    src: '4'
  }
]
const CHAPTER_DIR = './ch'
const FILE_EXTENSION = '.html'


// utils
const compose = (...fns) => (x) => fns.reduce((g, f) => f(g), x)
const pretty = elem => {
  elem.innerHTML = elem.innerHTML
    .split('\n')
    .map(line => `
      <p class="line">${line}</p>
    `)
    .join('\n')
  
  return elem
}

const imageToBackground = elem => {
  elem
    .querySelectorAll('.full-image')
    .forEach((el) => {
      const src = el.getAttribute('data-src')
      el.setAttribute('style', `
        background: url(${src}) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: contain;
        height: 100%;
        width: 100%;
      `)
    })

  return elem
}
const currentPageIndex = () => {
  let fileName = window.location.pathname.match(/.*.html$/)[0]
  if (fileName) {
    const parts = fileName.split('/')
    fileName = parts[parts.length-1].replace('.html', '')
  }
  return SITE_MAP.findIndex(s => s.src === fileName) || 0
}
const currentPage = () => SITE_MAP[currentPageIndex()]

// renders
const renderTitleText = index => `${index+1}<sup>${SITE_MAP[index].title}</sup>`
const renderIndex = (elem) => {
  let html = `
    <h1 class="site-title">dru</h1>
    ${SITE_MAP.reduce((aggr, link, index) => aggr += `
      <div class="title">
        <a href="${CHAPTER_DIR}/${link.src}${FILE_EXTENSION}"><h3>${renderTitleText(index)}</h3></a>
      </div>
    `, '')}
  `

  elem.innerHTML = html
}

const renderTitle = () => {
  return `<h3 class="title ch-title">${renderTitleText(currentPageIndex())}</h3>`
}

const renderChapter = (elem) => {
  const elemDx = compose(
    pretty,
    imageToBackground
  )(elem)
  
  elem.innerHTML = `
    ${renderTitle()}
    ${elemDx.innerHTML}
    ${renderFooter()}
  `
}

const renderNextLink = () => {
  const nextPageIdx = currentPageIndex()+1

  if (nextPageIdx >= SITE_MAP.length) {
    nextLink = `<a class="line" href="${`${'.'.repeat(CHAPTER_DIR.split('/').length)}/index.html`}"><h3>return</h3></a>`
  } else {
    nextLink = `<a class="line" href="${SITE_MAP[nextPageIdx].src}${FILE_EXTENSION}"><h3>${renderTitleText(nextPageIdx)}</h3></a>`
  }

  return nextLink
}

const renderFooter = () => {
  return `
    <div class="footer">
      ${renderNextLink()}
    </div>
  `
}

// run
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
      break
  }
}

window.onload = function() {
  run()
}
