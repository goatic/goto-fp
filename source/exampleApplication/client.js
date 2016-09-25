const getElementById = document.getElementById.bind(document)
const logMessage = console.log.bind(console)
const logError = console.error.bind(console)

const inspect = a => {
  console.log(a)
  return a
}

const property = (...keys) =>
  keys.length === 0
    ? property
    : object =>
      keys.length === 1
        ? object[keys[0]]
        : property(...keys.slice(1))(object[keys[0]])

const pipe = (...functions) =>
  functions.length === 0
    ? pipe
    : (...arguments) =>
      functions.length === 1
        ? functions[functions.length - 1](...arguments)
        : functions[functions.length - 1](pipe(...functions.slice(0, functions.length - 1))(...arguments))

const debounce = fun => {
  let pending
  return (...args) => {
    clearTimeout(pending)
    pending = setTimeout(() => fun(...args), 1500)
  }
}

const pThen = fun =>
  promise =>
    promise.then(fun)

const pCatch = fun =>
  promise =>
    promise.catch(fun)

const sendRequest = url =>
  fetch(url)

const parseJson = response =>
  response.json()

const createQueryUrl = query =>
  `https://api.github.com/search/repositories?q=${query}`

const setContent = element =>
  content =>
    element.innerHTML = content

const map = fun =>
  functor =>
    functor.map(fun)

const toDateString = a =>
  new Date(a).toDateString()

const renderOwner = ({
    login,
    avatar_url,
    html_url
  }) =>
    ` <div>
        <p>created by
          <a href="${html_url}">${login}</a>
        </p>
        <img
          style="height:150px;width:150px;"
          src="${avatar_url}"
        ></img>
      </div>
    `

const renderRepository = ({
    name,
    description,
    created_at,
    html_url,
    language,
    stargazers_count,
    owner
  }) =>
    ` <div style="display:inline-block; background:whitesmoke">
        <h3><a href="${html_url}">${name}</a></h3>
        <h4>${description}</h4>
        <h5>written in ${language}</h5>
        <p>created ${toDateString(created_at)}</p>
        <p>${stargazers_count} stars</p>
        ${renderOwner(owner)}
      </div>
    `

getElementById('search').oninput = debounce(pipe(
  property('target', 'value'),
  createQueryUrl,
  sendRequest,
  pThen(parseJson),
  pThen(property('items')),
  pThen(map(renderRepository)),
  pThen(setContent(getElementById('repositories'))),
  pCatch(logError)
))