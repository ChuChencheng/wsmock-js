/**
 * How Webkit implements WebSocket.
 * WebSocket.h  -https://github.com/WebKit/webkit/blob/5ba65e3c7d14bc3230381f786534e50bb5f3c593/Source/WebCore/Modules/websockets/WebSocket.h
 * WebSocket.cpp  -https://github.com/WebKit/webkit/blob/5ba65e3c7d14bc3230381f786534e50bb5f3c593/Source/WebCore/Modules/websockets/WebSocket.cpp
 */

import { procSentData, isValidUrl } from './utils'
import _EventTarget from './event-target'
import _eventBus from './event-bus'
import WsMock from './wsmock'
import { mockSocketUrls, mockSocketSettings } from './mock-store'

const _WebSocket = window.WebSocket

// Override native
class WebSocket extends _EventTarget {
  constructor (url, protocols) {
    if (arguments.length < 1) {
      throw TypeError(`Failed to construct 'WebSocket': 1 argument required, but only 0 present.`)
      return
    }
    super()
    for (let i = 0; i < mockSocketUrls.length; i++) {
      if (mockSocketUrls[i] === url) {
        const urlValidationResult = isValidUrl(url)
        if (typeof urlValidationResult === 'string') {
          throw new DOMException(`Failed to construct 'WebSocket': ${urlValidationResult}`)
          return
        }
        this._defineFields()
        this._observeProps()
        this._url = url
        this._protocol = protocols
        
        this._closeEventDict = {
          code: 1000,
          reason: `Connection of mock WebSocket with url '${this.url}' is closed because you are so ugly.`,
          wasClean: true,
        }
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
    if (arguments.length < 1) {
      throw new TypeError(`Failed to execute 'send' on 'WebSocket': 1 argument required, but only 0 present.`)
      return
    }
    if (this._readyState === WebSocket.CONNECTING) {
      throw new DOMException(`Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.`, 'InvalidStateError')
      return
    } else if (this._readyState !== WebSocket.OPEN) {
      console.error('WebSocket is already in CLOSING or CLOSED state.')
      return
    }
    const validData = procSentData(data)
    const dataSize = validData.dataSize
    const dataToBeSent = validData.dataToBeSent
    this._bufferedAmount += dataSize
    const settings = mockSocketSettings[this._index]
    const waitingTime = (this.bufferedAmount / WsMock.settings.SEND_RATE) * 1000
    setTimeout(() => {
      settings.map((setting) => {
        const receiver = setting.receiver
        receiver && receiver.call(setting, dataToBeSent)
        _eventBus.dispatchEvent({
          type: '_receive',
          url: setting.url,
          _id: setting._id,
        })
        this._bufferedAmount = 0
      })
    }, waitingTime)
  }

  close (code = 1000, reason) {
    code = Number(code)
    code = (isNaN(code) || code < 0) ? 0 : (code > 65535 ? 65535 : code)
    // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
    if (code !== 1000 && (code < 3000 || code > 4999)) {
      throw new DOMException(`Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. ${code} is neither.`, 'InvalidAccessError')
      return
    }
    this._readyState = WebSocket.CLOSING
    setTimeout(() => {
      this._closeEventDict.code = code
      reason && (this._closeEventDict.reason = reason)
      this._readyState = WebSocket.CLOSED
      this.removeAllListeners()
    }, WsMock.settings.CLOSING_TIME)
  }

  _defineFields () {
    // window.WebSocket fields
    this.binaryType = 'blob'
    // bufferedAmount: UTF-8 text or binary data
    // For those data that is not a string or binary data, use ('' + data) instead.
    // Example: ws.send({ a: 1 }), bufferedAmount = ('' + { a: 1 }).length => "[object Object]".length => 15
    // [1, 2, 3] => ('' + [1, 2, 3]).length => "1,2,3".length => 5
    // See https://html.spec.whatwg.org/multipage/web-sockets.html#dom-websocket-bufferedamount
    // And https://github.com/chromium/chromium/blob/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/modules/websockets/dom_web_socket.cc#L416
    // An implementation https://github.com/theturtle32/WebSocket-Node/blob/1037571aee32edd0c9008bda57cbf4c0d55fad36/lib/W3CWebSocket.js#L109
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
  }

  _attachEvents () {
    _eventBus.addEventListener('_message', this._dispatchMessageEvent.bind(this))
  }

  _dispatchMessageEvent (event) {
    if (event.url !== this.url) return
    this.dispatchEvent(this._defineEventProps(new MessageEvent('message', Object.assign({
      data: null,
      origin: this.url,
      lastEventId: '',
      source: null,
      ports: [],
    }, event.messageEventDict))))
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
          handler = val
        },
      })
    })
  }

  _observeReadyState () {
    this._observeReadOnlyProps('readyState', WebSocket.CONNECTING, (val) => {
      switch (val) {
        case WebSocket.OPEN:
          this.dispatchEvent(this._defineEventProps(new Event('open')))
          break
        case WebSocket.CLOSED:
          this.dispatchEvent(this._defineEventProps(new CloseEvent('close', {
            code: this._closeEventDict.code,
            reason: this._closeEventDict.reason,
            wasClean: this._closeEventDict.wasClean
          })))
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

  _defineEventProps (event) {
    const props = ['srcElement', 'currentTarget', 'target']
    props.map((prop) => {
      Object.defineProperty(event, prop, {
        value: this,
        configurable: true,
        enumerable: true,
      })
    })
    return event
  }
}

WebSocket.CONNECTING = 0
WebSocket.prototype.CONNECTING = WebSocket.CONNECTING
WebSocket.OPEN = 1
WebSocket.prototype.OPEN = WebSocket.OPEN
WebSocket.CLOSING = 2
WebSocket.prototype.CLOSING = WebSocket.CLOSING
WebSocket.CLOSED = 3
WebSocket.prototype.CLOSED = WebSocket.CLOSED

WebSocket._nativeWebSocket = _WebSocket

export default WebSocket
