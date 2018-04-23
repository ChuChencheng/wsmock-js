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
        this._url = url
        this._protocol = protocols
        
        this._index = i
        this._attachEvents()
        setTimeout(() => {
          this._readyState = WebSocket.OPEN
        }, WsMock.settings.CONNECTING_TIME)
        return
      }
    }
    console.log(`%cMock setting for url '${url}' not found, native WebSocket will be invoked.`, 'color: blue;')
    return new _WebSocket(url, protocols)
  }

  send (data) {
    if (this._readyState !== WebSocket.OPEN) return
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
    this._readyState = WebSocket.CLOSING
    setTimeout(() => {
      this._closeEventDict.code = code
      reason && (this._closeEventDict.reason = reason)
      this.removeAllListeners('message')
      this._readyState = WebSocket.CLOSED
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

    // 'Invisible' WebSocket fields
    this._bufferedAmount = 0
    this._extensions = ''
    this._protocol = ''
    this._readyState = WebSocket.CONNECTING
    this._url = null
  
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
    this._observeBufferedAmount()
    this._observeExtensions()
    this._observeProtocol()
    this._observeOnEvents()
    this._observeReadyState()
    this._observeUrl()
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

  _observeBufferedAmount () {
    this._observeReadOnlyProps('bufferedAmount', 0)
  }

  _observeExtensions () {
    this._observeReadOnlyProps('extensions', '')
  }

  _observeProtocol () {
    this._observeReadOnlyProps('protocol', '')
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
    this._observeReadOnlyProps('readyState', WebSocket.CONNECTING, (val) => {
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
    })
  }

  _observeUrl () {
    this._observeReadOnlyProps('url', null)
  }

  _observeReadOnlyProps (propName, defaultValue, setterCallback) {
    let propValue = defaultValue
    Object.defineProperty(this, `_${propName}`, {
      configurable: true,
      enumerable: false,
      get () {
        return propValue
      },
      set (val) {
        propValue = val
        setterCallback && (typeof setterCallback === 'function') && setterCallback.call(this, val)
        Object.defineProperty(this, propName, {
          value: propValue,
          configurable: true,
          enumerable: true,
          writable: false,
        })
      },
    })
    this[`_${propName}`] = defaultValue
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
