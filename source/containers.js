const Identity = a =>
  ({
    map: fn =>
      Identity(fn(a)),
    chain: fn =>
      fn(a)
  })

Identity.of = Identity

const IO = fn =>
  ({
    execute: fn, 
    map: fun =>
      IO(() =>
        fun(fn())),
    chain: fun =>
      IO(() =>
        fun(fn()).execute())
  })

IO.of = a =>
  IO(() =>
    a)

const Future = fn =>
  ({
    fork: fn,
    map: fun =>
      Future(resolve =>
        fn(a =>
          resolve(fun(a)))),
    chain: fun =>
      Future(resolve =>
        fn(a =>
          fun(a).fork(resolve)))
  })

Future.of = a =>
  Future(fn =>
    fn(a))

const Nothing = ({
  map: () =>
    Nothing,
  chain: () =>
    Nothing
})

const Just = a =>
  ({
    map: fn =>
      Just(fn(a)),
    chain: fn =>
      fn(a)
  })

const Maybe = { Just, Nothing }

Maybe.of = Just

module.exports = {
  Identity,
  IO,
  Future,
  Nothing,
  Maybe
}
