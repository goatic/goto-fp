const Identity = a =>
  ({
    map: fn =>
      Identity(fn(a)),
    chain: fn =>
      fn(a)
  })

Identity.of = Identity

const IO = execute =>
  ({
    execute,
    map: fun =>
      IO(() =>
        fun(execute())),
    chain: fun =>
      IO(() =>
        fun(execute()).execute())
  })

IO.of = a =>
  IO(() =>
    a)

const Future = fork =>
  ({
    fork,
    map: fun =>
      Future(resolve =>
        fork(a =>
          resolve(fun(a)))),
    chain: fun =>
      Future(resolve =>
        fork(a =>
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
