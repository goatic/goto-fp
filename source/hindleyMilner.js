// log :: a -> ()
const log = console.log.bind(console)

// compose :: (a -> b) -> (b -> c) -> (a -> c)
const compose = fn =>
  fun =>
    arg =>
      fn(fun(arg))

// isLowerCase :: String -> Boolean
const isLowerCase = a =>
  a === a.toLowerCase()

// isCapitalized :: String -> Boolean
const isCapitalized = a =>
  a === a.toUpperCase()

// slice :: Int -> [a] -> [a]
const slice = index =>
  array =>
    array.slice(index)

// charAt :: String -> String
const charAt = index =>
  string =>
    string.charAt(index)

// isHeadUpperCase :: String -> Boolean
const isHeadUpperCase = compose(isCapitalized, charAt(0))

// isTailLowerCase :: String -> Boolean
const isTailLowerCase = compose(isLowerCase, slice(1))

// isNameSegment :: String -> Boolean
const isNameSegment = name =>
  isHeadUpperCase(name) &&
  isTailLowerCase(name)

// isName :: String -> Boolean
const isName = name =>
  name
    .split(' ')
    .every(isNameSegment)

// String -> ()
log(isName('Asger Nielsen'))
