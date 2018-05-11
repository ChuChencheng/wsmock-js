# wsmock-js

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

## API

* `wsm.mock(options)`
  * Add a new mock setting.
  * `options`: [Object] Mock setting options.
    * `url`: [String] Mock url. Note: Url validation will not proceed if WHATWG URL API is not supported by browser (e.g. IE).
    * `sendInterval`: [Array|Number|String] Define when server would send a message to the browser. 
      * [Array]: A set of numbers representing interval time.
      * [Number]: Interval time.
      * [String]: 'onreceive', server send message imediately once receive data from the browser.
    * `receiver`: [Function] Simulate receive method invoked by server.
    * `send`: [Function] Simulate send method invoked by server.
* `wsm.config(options)`
  * Global settings of wsmock-js
  * `options`: [Object]
    * `CONNECTING_TIME`: [Number] Default: `100`, time cost of connection.
    * `CLOSING_TIME`: [Number] Default: `100`, time cost of disconnection.
    * `SEND_RATE`: [Number] Default: `1 * 1024 * 1024`, send rate, bytes per second

# Attention

**THIS MODULE IS USED TO MOCK WEBSOCKET BEHAVIORS IN DEVELOPMENT**

**DO NOT USE IT IN PRODUCTION**

# Todo

* [ ] Mock url regular expression support
* [ ] Socket.io support?
* [ ] Better test cases
