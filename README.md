# wsmock-js

[![npm](https://img.shields.io/npm/v/wsmock-js.svg)](https://www.npmjs.com/package/wsmock-js)
[![Build Status](https://travis-ci.org/ChuChencheng/wsmock-js.svg?branch=master)](https://travis-ci.org/ChuChencheng/wsmock-js)

Mock WebSocket in the browser without a server.

# Getting-started

## Install

yarn:

`yarn add wsmock-js --dev`

with &lt;script&gt; tag:

`<script src="wsmock.min.js"></script>`

## Define mock settings

```javascript
import wsm from 'wsmock-js'

wsm.mock({
  url: 'ws://some.mock.url',
  sendInterval: 'onreceive',
  receiver (data) { // 'data' is sent by webSocket.send in browser
    console.log(data)
  },
  sender () { // Simulating server send
    this.response = 'This is a message sent by server.'
  },
})
```

Then just use WebSocket as usual.

# API

```javascript
/**
 * Add a new mock setting.
 */
wsm.mock({
  // [String|RegExp] Mock url. Note: Url validation will not proceed if WHATWG URL API is not supported by browser (e.g. IE).
  url: /wss:\/\/xxx\.(xxxx|regexp)\.xxx/,

  /** 
   * [Array|Number|String] Define when server would send a message to the browser. 
   * [Array]: A set of numbers representing interval time.
   * [Number]: Interval time.
   * [String]: 'onreceive', server send message imediately once receive data from the browser.
   */
  sendInterval: 1000,

  // [Function] Simulate receive method invoked by server.
  receiver (data) {
    
  },

  // [Function] Simulate send method invoked by server.
  // * Note: You'd better not use an arrow function in case that 'this' does not point to setting object.
  sender () {
    this.response = 'This is a message sent by server.'
  },
})

/**
 * Global settings of wsmock-js
 */
wsm.config({
  // [Number] Default: '100', time (ms) cost of connection.
  CONNECTING_TIME: 100,

  // [Number] Default: '100', time (ms) cost of disconnection.
  CLOSING_TIME: 100,

  // [Number] Default: '1 * 1024 * 1024', send rate, bytes per second
  SEND_RATE: 1 * 1024 * 1024,
})
```

# Attention

**THIS MODULE IS USED TO MOCK WEBSOCKET BEHAVIORS IN DEVELOPMENT**

**DO NOT USE IT IN PRODUCTION**

# Todo

* [x] Mock url regular expression support
* [ ] Socket.io support?
* [ ] Better test cases
