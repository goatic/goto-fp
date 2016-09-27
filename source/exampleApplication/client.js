/*
  highly reusable
*/

const pipe = (...functions) =>
  functions.length === 0
    ? compose
    : functions.length === 1
      ? functions[0]
      : (...args) =>
        functions[functions.length - 1](pipe(...functions.slice(0, functions.length - 1))(...args))

const property = (...keys) =>
  keys.length === 0
    ? object => object
    : object =>
      keys.length === 1
        ? object[keys[0]]
        : property(...keys.slice(1))(object[keys[0]])

const map = mapper =>
  array =>
    array.length < 1
      ? []
      : array.length === 1
        ? [mapper(array[0])]
        : [mapper(array[0]), ...map(mapper)(array.slice(1))]

const debounce = timeout =>
  fun => {
    let pending
    return (...args) => {
      clearTimeout(pending)
      return pending = setTimeout(() => fun(...args), timeout)
    }
  }

const then = fun =>
  promise =>
    promise.then(fun)

/*
  app specific
*/

const shortDebounce = debounce(2000)

const createQueryUrl = query =>
  `https://api.github.com/search/repositories?q=${query}`

const sendRequest = url =>
  fetch(url)

const parseJson = response =>
  response.json()

const renderOwner = owner =>
    ` <div>
        <p>created by
          <a href="${owner.html_url}">${owner.login}</a>
        </p>
        <img
          style="height:150px;width:150px;"
          src="${owner.avatar_url}"
        ></img>
      </div>
    `

const renderRepository = repo =>
    ` <div style="display:inline-block; background:whitesmoke">
        <h3><a href="${repo.html_url}">${repo.name}</a></h3>
        <h4>${repo.description}</h4>
        <h5>written in ${repo.language}</h5>
        <p>created ${repo.created_at}</p>
        <p>${repo.stargazers_count} stars</p>
        ${renderOwner(repo.owner)}
      </div>
    `

const render = id =>
  html =>
    document
      .getElementById(id)
      .innerHTML = html

document
  .getElementById('search')
  .oninput = shortDebounce(pipe(
    property('target', 'value'),
    createQueryUrl,
    sendRequest,
    then(parseJson),
    then(pipe(
      property('items'),
      map(renderRepository),
      render('repositories')))))