/**
 * 
 */



/**
 * Mock settings template
 * import WsMock from 'WsMock'
 * WsMock.mock({
 *    url: 'ws://some.mock.url',
 *    sendInterval: 'onreceive',  // A number, an array or a string.
 *    receiver (data) {},
 *    sender () {
 *      // Write your mock data
 *      this.response = {
 *        success: true,
 *        msg: null,
 *        data: 'A msg from mock WebSocket!',
 *      }
 *    },
 * })
 */

if (!window.WebSocket) {
  throw new Error('Your browser does not support WebSocket.')
}

import _eventBus from './event-bus'
import { mockSocketUrls, mockSocketSettings } from './mock-store'
import WebSocket from './websocket'

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
  const execSender = () => {
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
  }
  if (typeof settings.sendInterval === 'number') {
    settings._intervalId = setInterval(execSender, settings.sendInterval)
  } else if (Array.isArray(settings.sendInterval)) {
    let timeoutIndex = 0
    settings.sendInterval = settings.sendInterval.filter((time) => {
      return typeof time === 'number'
    })
    const len = settings.sendInterval.length
    if (len) {
      const execTimeout = () => {
        execSender()
        timeoutIndex++
        if (timeoutIndex === len) timeoutIndex = 0
        settings._timeoutId = setTimeout(execTimeout, settings.sendInterval[timeoutIndex])
      }
      settings._timeoutId = setTimeout(execTimeout, settings.sendInterval[timeoutIndex])
    }
  } else if (settings.sendInterval === 'onreceive') {
    _eventBus.addEventListener('_receive', (event) => {
      if (!event.url !== settings.url) return
      execSender()
    })
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
}

window.WebSocket = WebSocket
export default WsMock
