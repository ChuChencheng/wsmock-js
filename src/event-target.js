/**
 * Simple event dispatching system
 * See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Example
 */
class _EventTarget {
  constructor () {
    this.listeners = {}
  }

  addEventListener (type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    const stack = this.listeners[type]
    stack.push(callback)
    // Return index
    return stack.length - 1
  }

  removeEventListener (type, callback) {
    if (!(type in this.listeners)) return
    const stack = this.listeners[type]
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

  dispatchEvent (event) {
    if (!(event.type in this.listeners)) {
      return true
    }
    const stack = this.listeners[event.type]
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
    }
    return !event.defaultPrevented
  }

  modifyHandler (type, index, newHandler) {
    if (!(type in this.listeners) || (typeof index !== 'number')) {
      return
    }
    const stack = this.listeners[type]
    stack[index] = newHandler
  }

  removeAllListeners () {
    this.listeners = {}
  }
}

export default _EventTarget
