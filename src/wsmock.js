/**
 * 
 */



/**
 * Mock settings template
 * const wsm = require('wsmock')
 * wsm.mock({
 *    url: 'ws://some.mock.url',
 *    receiver (data) {},
 *    sender () {
 *      // Write your mock data
 *      this.response = {
 *        success: true,
 *        msg: null,
 *        data: {
 *          text: 'A msg from mock WebSocket!',
 *        },
 *      }
 *    },
 * })
 */

if (!window.WebSocket) {
  throw new Error('Your browser does not support WebSocket.')
}

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
    if (!(type in this.listeners) || !(typeof index !== 'number')) {
      return
    }
    const stack = this.listeners[type]
    stack[index] = newHandler
  }

  removeAllListeners (type) {
    if (!(type in this.listeners)) return
    this.listeners[type] = []
  }
}

const _eventBus = new _EventTarget()

const _WebSocket = window.WebSocket

let mockSocketUrls = []
let mockSocketSettings = []

// Override native
class WebSocket extends _EventTarget {
  constructor (url, protocols) {
    super()
    for (let i = 0; i < mockSocketUrls.length; i++) {
      if (mockSocketUrls[i] === url) {
        this._defineFields()
        this._observeProps()
        this.url = url
        this.protocol = protocols
        
        this._index = i
        this._attachEvents()
        setTimeout(() => {
          this.readyState = WebSocket.OPEN
        }, WsMock.settings.CONNECTING_TIME)
        return
      }
    }
    console.log(`%cMock setting for url '${url}' not found, native WebSocket will be invoked.`, 'color: blue;')
    return new _WebSocket(url, protocols)
  }

  send (data) {
    if (this.readyState !== WebSocket.OPEN) return
    const settings = mockSocketSettings[this._index]
    const waitingTime = (WsMock.settings.TOTAL_BUFFER_SIZE / WsMock.settings.SEND_RATE) * 1000
    setTimeout(() => {
      settings.map((setting) => {
        const receiver = setting.receiver
        receiver && receiver.call(setting, data)
      })
    }, waitingTime)
  }

  close (code = 1000, reason) {
    this.readyState = WebSocket.CLOSING
    setTimeout(() => {
      this._closeEventDict.code = code
      reason && (this._closeEventDict.reason = reason)
      this.removeAllListeners('message')
      this.readyState = WebSocket.CLOSED
    }, WsMock.settings.CLOSING_TIME)
  }

  _defineFields () {
    // window.WebSocket fields
    this.binaryType = 'blob'
    // Don't know how to calculate it.
    this.bufferedAmount = 0
    this.extensions = ''
    this.onclose = null
    this.onerror = null
    this.onmessage = null
    this.onopen = null
    this.protocol = ''
    this.readyState = WebSocket.CONNECTING
    this.url = null
  
    // Custom fields
    this._index = -1
    this._closeEventDict = {
      code: 1000,
      reason: `Connection of mock WebSocket with url '${this.url}' is closed because you are so ugly.`,
      wasClean: true,
    }
  }

  _attachEvents () {
    _eventBus.addEventListener('_message', this._dispatchMessageEvent.bind(this))
  }

  _dispatchMessageEvent (event) {
    if (event.url !== this.url) return
    this.dispatchEvent(new MessageEvent('message', Object.assign({
      data: null,
      origin: '',
      lastEventId: '',
      source: null,
      ports: [],
    }, event.messageEventDict)))
  }

  _observeProps () {
    this._observeBinaryType()
    this._observeOnEvents()
    this._observeReadyState()
  }

  _observeBinaryType () {
    const validEnum = ['blob', 'arraybuffer']
    let binaryTypeValue = 'blob'
    Object.defineProperty(this, 'binaryType', {
      configurable: true,
      enumerable: true,
      get () {
        return binaryTypeValue
      },
      set (val) {
        if (validEnum.indexOf(val) > -1) {
          binaryTypeValue = val
        } else {
          console.warn(`The provided value '${val}' is not a valid enum value of type BinaryType.`)
        }
      },
    })
  }

  _observeOnEvents () {
    const onEvents = ['close', 'error', 'message', 'open']
    onEvents.map((event) => {
      let eventIndex, handler = null
      Object.defineProperty(this, `on${event}`, {
        configurable: true,
        enumerable: true,
        get () {
          return handler
        },
        set (val) {
          if (!handler) {
            eventIndex = this.addEventListener(event, val)
          } else {
            this.modifyHandler(event, eventIndex, val)
          }
        },
      })
    })
  }

  _observeReadyState () {
    let readyStateValue = WebSocket.CONNECTING
    Object.defineProperty(this, 'readyState', {
      configurable: true,
      enumerable: true,
      get () {
        return readyStateValue
      },
      set (val) {
        readyStateValue = val
        switch (val) {
          case WebSocket.OPEN:
            this.dispatchEvent(new CustomEvent('open'))
            break
          case WebSocket.CLOSED:
            this.dispatchEvent(new CloseEvent('close', {
              code: this._closeEventDict.code,
              reason: this._closeEventDict.reason,
              wasClean: this._closeEventDict.wasClean
            }))
            break
          default:
            break
        }
      },
    })
  }
}

WebSocket.prototype.CONNECTING = 0
WebSocket.CONNECTING = 0
WebSocket.prototype.OPEN = 1
WebSocket.OPEN = 1
WebSocket.prototype.CLOSING = 2
WebSocket.CLOSING = 2
WebSocket.prototype.CLOSED = 3
WebSocket.CLOSED = 3

const _storeMock = (settings) => {
  let existIndex = -1
  if (mockSocketUrls.some((url, index) => {
    if (url === settings.url) {
      existIndex = index
      return true
    }
    return false
  })) {
    mockSocketSettings[existIndex].push(settings)
  } else {
    mockSocketUrls.push(settings.url)
    mockSocketSettings.push([settings])
  }
}

const _attachSender = (settings) => {
  if (typeof settings.sendInterval === 'number') {
    settings._intervalId = setInterval(() => {
      settings.sender.call(settings)
      if (!settings.response) {
        console.warn(`Please specify response data for url '${settings.url}'.`)
        return
      }
      _eventBus.dispatchEvent({
        type: '_message',
        url: settings.url,
        messageEventDict: {
          data: settings.response,
        },
      })
    }, settings.sendInterval)
  }
}

// Class to be exported
class WsMock {
  static config (opt) {
    Object.assign(WsMock.settings, opt)
  }

  static mock (settings) {
    if (!settings.url) {
      console.error('Url must be specified.')
      return
    }
    _storeMock(settings)
    _attachSender(settings)
  }
}

WsMock.settings = {
  CONNECTING_TIME: 100,
  CLOSING_TIME: 100,
  // Bytes per second
  SEND_RATE: 1 * 1024 * 1024,
  // Default: 300ms to finish sending
  TOTAL_BUFFER_SIZE: (1 * 1024 * 1024 / 1000) * 300,
}

window.WebSocket = WebSocket
export default WsMock
