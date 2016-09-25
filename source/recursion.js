// fold :: (a -> a -> b) -> b -> [a] -> b
const fold = folder =>
  initial =>
    array =>
      array.length < 1
        ? initial
        : array.length === 1
          ? folder(initial)(array[0])
          : fold(folder)(folder(initial)(array[0]))(array.slice(1))

// alias
const reduce = fold

// map :: (a -> b) -> [a] -> [b]
const map = mapper =>
  array =>
    array.length < 1
      ? []
      : array.length === 1
        ? [mapper(array[0])]
        : [mapper(array[0]), ...map(mapper)(array.slice(1))]

// compose :: (a -> b) -> (b -> c) -> (a -> c)
const compose = (...functions) =>
  argument =>
    functions.length < 1
      ? argument
      : functions.length === 1
        ? functions[0](argument)
        : functions[0](compose(...functions.slice(1))(argument))

// every :: (a -> Boolean) -> [a] -> Boolean
const every = tester =>
  array =>
    array.length < 1
      ? false
      : array.length === 1
        ? tester(array[0])
        : tester(array[0]) && every(tester)(array.slice(1))

// any :: (a -> Boolean) -> [a] -> Boolean
const any = tester =>
  array =>
    array.length < 1
      ? false
      : array.length === 1
        ? tester(array[0])
        : tester(array[0]) || any(tester)(array.slice(1))

// find :: (a -> Boolean) -> [a] -> Maybe a
const find = finder =>
  array =>
    array.length < 1
      ? undefined
      : finder(array[0])
        ? array[0]
        : array.length === 1
          ? undefined
          : find(finder)(array.slice(1))

// indexOf :: a -> Number -> [a] -> Number
const indexOf = a =>
  index =>
    array =>
      array.length < 1
        ? -1
        : array.length === 1
          ? a === array[0]
            ? index
            : indexOf(a)(index + 1)(array.slice(1))
