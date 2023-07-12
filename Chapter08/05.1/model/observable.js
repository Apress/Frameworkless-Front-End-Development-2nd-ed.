const freeze = state => Object.freeze(window.structuredClone(state))

export default (initialState) => {
  let listeners = []

  const proxy = new Proxy(window.structuredClone(initialState), {
    set: (target, name, value) => {
      target[name] = value
      listeners.forEach(l => l(freeze(proxy)))
      return true
    }
  })

  proxy.addChangeListener = cb => {
    listeners.push(cb)
    cb(freeze(proxy))
    return () => {
      listeners = listeners.filter(element => element !== cb)
    }
  }

  return proxy
}
