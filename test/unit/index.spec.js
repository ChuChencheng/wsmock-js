import wsm from '@/wsmock'
import * as utils from '@/utils'
import sinon from 'sinon'

const _ws = window.WebSocket
const echoUrl = 'wss://echo.websocket.org'
const mockUrl = 'ws://some.mock.url'
const invalidMockUrl = 'not_a_valid_url'
const mockObj = {
  url: mockUrl,
  sendInterval: 'onreceive',
  receiver (data) {
  },
  sender () {
    // Write your mock data
    this.response = 'A msg from mock WebSocket!'
  },
}
const mockObj2 = {
  url: invalidMockUrl,
  sendInterval: 'onreceive',
  receiver (data) {
  },
  sender () {
    // Write your mock data
    this.response = 'A msg from mock WebSocket!'
  },
}

wsm.mock(mockObj)
wsm.mock(mockObj2)

before(() => {
  sinon.spy(console, 'warn')
  sinon.spy(console, 'error')
})

describe('Constants.', () => {
  it('WsMock constants check.', () => {
    assert.isObject(wsm.settings, 'WsMock.settings should be an object.')
    assert.containsAllKeys(wsm.settings, ['CONNECTING_TIME', 'CLOSING_TIME', 'SEND_RATE'])
    assert.isNumber(wsm.settings.CONNECTING_TIME)
    assert.isNumber(wsm.settings.CLOSING_TIME)
    assert.isNumber(wsm.settings.SEND_RATE)
  })

  it('WebSocket constants check.', () => {
    assert.containsAllKeys(WebSocket, ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'])
    assert(WebSocket.CONNECTING === 0)
    assert(WebSocket.OPEN === 1)
    assert(WebSocket.CLOSING === 2)
    assert(WebSocket.CLOSED === 3)
  })
})

describe('Invoke native WebSocket if url not specified in settings.', () => {
  it('Should invoke native.', () => {
    const ws = new WebSocket(echoUrl)
    assert(ws instanceof WebSocket._nativeWebSocket, 'Instance should be an instance of native WebSocket.')
  })
})

describe('Invoke override if url exists in mock settings.', () => {
  describe('Constructor check.', () => {
    it('Throw TypeError if arguments are not enough.', () => {
      assert.throws(() => { new WebSocket() }, TypeError)
    })
  
    it('Throw DOMException if url is invalid.', () => {
      assert.throws(() => { new WebSocket(invalidMockUrl) }, DOMException)
    })
  })

  const onopen = sinon.spy()
  const onmessage = sinon.spy()
  const onmessage2 = sinon.spy()
  const onerror = sinon.spy()
  const onclose = sinon.spy()

  const etopen = sinon.spy()
  const etmessage = sinon.spy()
  const etmessage2 = sinon.spy()
  const eterror = sinon.spy()
  const etclose = sinon.spy()

  describe('Properties check.', () => {
    let ws
    it('Open.', (done) => {
      ws = new WebSocket(mockUrl)
      setTimeout(() => {
        assert(ws.readyState === 1, 'ReadyState should be OPEN once opened.')
        done()
      }, wsm.settings.CONNECTING_TIME)
    })
  
    it('Should has WebSocket properties.', () => {
      assert.containsAllKeys(ws, ['binaryType', 'bufferedAmount', 'extensions', 'onclose', 'onerror', 'onmessage', 'onopen', 'protocol', 'readyState', 'url'])
    })

    it('BinaryType.', () => {
      assert.isString(ws.binaryType)
      ws.binaryType = 'arraybuffer'
      assert(ws.binaryType === 'arraybuffer')
      ws.binaryType = 'blabla'
      assert(ws.binaryType === 'arraybuffer')
    })

    after(() => {
      ws && ws.close()
    })
  })

  describe('Events check.', () => {
    let ws
    it('Open event.', (done) => {
      ws = new WebSocket(mockUrl)
      ws.onopen = onopen
      ws.addEventListener('open', etopen)
      setTimeout(() => {
        assert(onopen.calledOnce, 'onopen not called.')
        assert(etopen.calledOnce, 'EventTarget open event not called.')
        assert(onopen.args[0][0] instanceof Event && onopen.args[0][0].type === 'open', 'Event argument error.')
        assert(etopen.args[0][0] instanceof Event && etopen.args[0][0].type === 'open', 'Event argument error.')
        done()
      }, wsm.settings.CONNECTING_TIME)
    })

    it('Message event.', (done) => {
      ws.onmessage = onmessage
      ws.addEventListener('message', etmessage)
      ws.addEventListener('message', etmessage2)
      const msg = 'test message event'
      ws.send(msg)
      setTimeout(() => {
        assert(onmessage.calledOnce, 'onmessage not called.')
        assert(etmessage.calledOnce, 'EventTarget message event not called.')
        assert(etmessage2.calledOnce, 'EventTarget message event 2 not called.')
        assert(onmessage.args[0][0] instanceof Event && onmessage.args[0][0].type === 'message', 'Event argument error.')
        assert(etmessage.args[0][0] instanceof Event && etmessage.args[0][0].type === 'message', 'Event argument error.')
        assert(etmessage2.args[0][0] instanceof Event && etmessage2.args[0][0].type === 'message', 'Event argument error.')
        sinon.assert.callOrder(onmessage, etmessage, etmessage2)
        // Change event listeners.
        ws.onmessage = onmessage2
        assert(ws.onmessage === onmessage2, 'onmessage handler change failed.')
        ws.removeEventListener('message', etmessage2)
        ws.send(msg)
        setTimeout(() => {
          assert(onmessage.calledOnce, 'onmessage called incorrectly in the second time.')
          assert(onmessage2.calledOnce, 'onmessage not called in the second time.')
          assert(etmessage.calledTwice, 'EventTarget message event not called in the second time.')
          assert(etmessage2.calledOnce, 'EventTarget message event 2 called incorrectly in the second time.')
          assert(onmessage2.args[0][0] instanceof Event && onmessage2.args[0][0].type === 'message', 'Event argument error in the second time.')
          assert(etmessage.args[1][0] instanceof Event && etmessage.args[1][0].type === 'message', 'Event argument error in the second time.')
          sinon.assert.callOrder(onmessage2, etmessage)
          done()
        }, (msg.length / wsm.settings.SEND_RATE) * 1000)
      }, (msg.length / wsm.settings.SEND_RATE) * 1000)
    })

    // onerror to be tested.

    it('Close event.', (done) => {
      ws.onclose = onclose
      ws.addEventListener('close', etclose)
      ws.close()
      setTimeout(() => {
        assert(onclose.calledOnce, 'onclose not called.')
        assert(etclose.calledOnce, 'EventTarget close event not called.')
        assert(onclose.args[0][0] instanceof Event && onclose.args[0][0].type === 'close', 'Event argument error.')
        assert(etclose.args[0][0] instanceof Event && etclose.args[0][0].type === 'close', 'Event argument error.')
        done()
      }, wsm.settings.CLOSING_TIME)
    })

    after(() => {
      ws && ws.close()
    })
  })

  describe('Methods check.', () => {
    describe('Send method.', () => {
      let ws
      it('ReadyState in Connecting.', () => {
        ws = new WebSocket(mockUrl)
        assert.throws(() => ws.send('test'), DOMException)
      })

      it('Arguments not enough.', () => {
        assert.throws(() => ws.send(), TypeError)
      })

      it('No response defined in mock setting sender.', (done) => {
        wsm.mock(Object.assign({}, mockObj, {
          response: undefined,
          sender () {},
        }))
        setTimeout(() => {
          const msg = 'test'
          ws.send(msg)
          setTimeout(() => {
            assert(console.warn.calledWithExactly(`Please specify response data for url '${ws.url}'.`))
            done()
          }, (msg.length / wsm.settings.SEND_RATE) * 1000)
        }, wsm.settings.CONNECTING_TIME)
      })

      it('ReadyState in closing or closed.', (done) => {
        ws.close()
        setTimeout(() => {
          ws.send('test')
          assert(console.error.calledWithExactly('WebSocket is already in CLOSING or CLOSED state.'))
          done()
        }, wsm.settings.CLOSING_TIME)
      })
    })

    describe('Close method.', () => {
      it('Close code not in range.', () => {
        let ws = new WebSocket(mockUrl)
        assert.throws(() => ws.close(-1), DOMException)
        assert.throws(() => ws.close(65536), DOMException)
        assert.throws(() => ws.close(999), DOMException)
        assert.throws(() => ws.close(2000), DOMException)
        assert.throws(() => ws.close(5000), DOMException)
        ws.close()
      })

      it('Set close reason.', () => {
        let ws = new WebSocket(mockUrl)
        const reason = 'test close reason'
        ws.close(1000, reason)
        setTimeout(() => {
          assert(ws._closeEventDict.reason === reason)
        }, wsm.settings.CLOSING_TIME)
      })
    })
  })
})

// WsMock test
describe('WsMock settings.', () => {
  it('Config', () => {
    wsm.config({
      CONNECTING_TIME: 200,
      CLOSING_TIME: 200,
      SEND_RATE: 2 * 1024 * 1024,
    })
    assert(wsm.settings.CONNECTING_TIME === 200)
    assert(wsm.settings.CLOSING_TIME === 200)
    assert(wsm.settings.SEND_RATE === 2 * 1024 * 1024)
  })

  describe('Mock', () => {
    it('Url not set.', () => {
      wsm.mock({})
      console.error.calledWithExactly('Url must be specified.')
    })

    it('Define multiple mock settings for one url.', () => {
      wsm.mock(mockObj)
    })

    describe('SendInterval', () => {
      it('number', () => {
        wsm.mock(Object.assign({}, mockObj, {
          sendInterval: 1000,
        }))
      })

      it('array', () => {
        wsm.mock(Object.assign({}, mockObj, {
          sendInterval: [1000, 100, 'abc', 666],
        }))
      })

      it('onreceive', () => {
        wsm.mock(Object.assign({}, mockObj, {
          sendInterval: 'onreceive',
        }))
      })
    })
  })
})

// Utils test
describe('Utils test.', () => {
  describe('procSentData', () => {
    it('String', () => {
      const data = 'test'
      const result = utils.procSentData(data)
      assert.isObject(result)
      assert.containsAllKeys(result, ['dataToBeSent', 'dataSize'])
      assert(result.dataToBeSent === data)
      assert(result.dataSize === data.length)
    })

    it('ArrayBuffer', () => {
      const data = new ArrayBuffer(10)
      const result = utils.procSentData(data)
      assert.isObject(result)
      assert.containsAllKeys(result, ['dataToBeSent', 'dataSize'])
      assert(result.dataToBeSent === data)
      assert(result.dataSize === data.byteLength)
    })

    it('Blob', () => {
      const data = new Blob(['test blob'])
      const result = utils.procSentData(data)
      assert.isObject(result)
      assert.containsAllKeys(result, ['dataToBeSent', 'dataSize'])
      assert(result.dataToBeSent === data)
      assert(result.dataSize === data.size)
    })

    it('ArrayBufferView', () => {
      const data = new Int16Array(5)
      const result = utils.procSentData(data)
      assert.isObject(result)
      assert.containsAllKeys(result, ['dataToBeSent', 'dataSize'])
      assert(result.dataToBeSent === data)
      assert(result.dataSize === data.byteLength * (data.BYTES_PER_ELEMENT || 1))
    })

    it('Other', () => {
      const data = { a: 1 }
      const result = utils.procSentData(data)
      assert.isObject(result)
      assert.containsAllKeys(result, ['dataToBeSent', 'dataSize'])
      assert(result.dataToBeSent === ('' + data))
      assert(result.dataSize === ('' + data).length)
    })
  })

  describe('isValidUrl', () => {
    it('Valid url', () => {
      assert.isBoolean(utils.isValidUrl('wss://some.mock.url'))
    })

    it('Return error string if url is invalid', () => {
      const fn = () => utils.isValidUrl('ftpsomemockurl')
      assert(fn() === `The URL 'ftpsomemockurl' is invalid.`)
    })

    it('Return error string if url has other protocols', () => {
      const fn = () => utils.isValidUrl('ftp://some.mock.url')
      assert.isString(fn())
    })
  })

  describe('isUrlMatched', () => {
    it('Both String type.', () => {
      const url1 = 'abc'
      const url2 = 'abc'
      const url3 = 'bcd'
      assert.equal(utils.isUrlMatched(url1, url2), true, `'isUrlMatched(${url1}, ${url2})' should be true.`)
      assert.equal(utils.isUrlMatched(url1, url3), false, `'isUrlMatched(${url1}, ${url3})' should be false.`)
    })

    it('Both RegExp type.', () => {
      const url1 = /reg/
      const url2 = /reg/
      const url3 = /regexp/
      assert.equal(utils.isUrlMatched(url1, url2), true, `'isUrlMatched(${url1}, ${url2})' should be true.`)
      assert.equal(utils.isUrlMatched(url1, url3), false, `'isUrlMatched(${url1}, ${url3})' should be false.`)
    })

    it('RegExp and String.', () => {
      const url1 = 'abc'
      const url2 = /abc/
      const url3 = /d/
      assert.equal(utils.isUrlMatched(url1, url2), true, `'isUrlMatched(${url1}, ${url2})' should be true.`)
      assert.equal(utils.isUrlMatched(url2, url1), true, `'isUrlMatched(${url2}, ${url1})' should be true.`)
      assert.equal(utils.isUrlMatched(url1, url3), false, `'isUrlMatched(${url1}, ${url3})' should be false.`)
    })

    it('Other types.', () => {
      const url1 = ['abc']
      const url2 = {}
      const url3 = () => {}
      assert.equal(utils.isUrlMatched(url1, url2), false, `'isUrlMatched(${url1}, ${url2})' should be false.`)
      assert.equal(utils.isUrlMatched(url1, url3), false, `'isUrlMatched(${url1}, ${url3})' should be false.`)
    })
  })
})

after(() => {
  console.warn.restore()
  console.error.restore()
})
