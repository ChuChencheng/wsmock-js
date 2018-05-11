(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WsMock"] = factory();
	else
		root["WsMock"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Stores urls and settings of mock rules.
 */
var mockSocketUrls = exports.mockSocketUrls = [];
var mockSocketSettings = exports.mockSocketSettings = [];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple event dispatching system
 * See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Example
 */
var _EventTarget = function () {
  function _EventTarget() {
    _classCallCheck(this, _EventTarget);

    this.listeners = {};
  }

  _createClass(_EventTarget, [{
    key: 'addEventListener',
    value: function addEventListener(type, callback) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      var stack = this.listeners[type];
      stack.push(callback);
      // Return index
      return stack.length - 1;
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, callback) {
      if (!(type in this.listeners)) return;
      var stack = this.listeners[type];
      for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      if (!(event.type in this.listeners)) {
        return true;
      }
      var stack = this.listeners[event.type];
      for (var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
      }
      return !event.defaultPrevented;
    }
  }, {
    key: 'modifyHandler',
    value: function modifyHandler(type, index, newHandler) {
      if (!(type in this.listeners) || typeof index !== 'number') {
        return;
      }
      var stack = this.listeners[type];
      stack[index] = newHandler;
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      this.listeners = {};
    }
  }]);

  return _EventTarget;
}();

exports.default = _EventTarget;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventTarget = __webpack_require__(1);

var _eventTarget2 = _interopRequireDefault(_eventTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventBus = new _eventTarget2.default(); /**
                                              * Event bus.
                                              */
exports.default = _eventBus;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var procSentData = exports.procSentData = function procSentData(data) {
  var dataSize = 0;
  var dataToBeSent = data;
  // Data type confirm
  // String.
  if (typeof data === 'string') {
    dataSize += data.length;
  }
  // ArrayBuffer. Use arrayBuffer.byteLength
  else if (data instanceof ArrayBuffer) {
      dataSize += data.byteLength;
    }
    // Blob. Use blob.size
    else if (data instanceof Blob) {
        dataSize += data.size;
      }
      // ArrayBufferView/TypedArray. Judge if has byteLength and BYTES_PER_ELEMENT
      else if (data.byteLength) {
          dataSize += data.byteLength * (data.BYTES_PER_ELEMENT || 1);
        }
        // Other type. ('' + data).length
        else {
            dataToBeSent = '' + data;
            dataSize += dataToBeSent.length;
          }
  return {
    dataToBeSent: dataToBeSent,
    dataSize: dataSize
  };
};

var isValidUrl = exports.isValidUrl = function isValidUrl(url) {
  // If URL API does not exist, just check if url was a string type and not empty.
  // Other polyfill modules would make this module size too huge and url validation is not quite necessary.
  if (typeof URL !== 'function') {
    return typeof url === 'string' && url !== '';
  }
  var _url = {};
  try {
    _url = new URL(url);
  } catch (error) {
    return 'The URL \'' + url + '\' is invalid.';
  }
  var _protocol = _url.protocol;
  if (_protocol !== 'ws:' && _protocol !== 'wss:') {
    return 'The URL\'s scheme must be either \'ws\' or \'wss\'. \'' + _protocol.slice(0, -1) + '\' is not allowed.';
  }
  return true;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _eventBus2 = __webpack_require__(2);

var _eventBus3 = _interopRequireDefault(_eventBus2);

var _mockStore = __webpack_require__(0);

var _websocket = __webpack_require__(5);

var _websocket2 = _interopRequireDefault(_websocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 *      this.response = 'A msg from mock WebSocket!'
 *    },
 * })
 */

if (!window.WebSocket) {
  throw new Error('Your browser does not support WebSocket.');
}

var _storeMock = function _storeMock(settings) {
  var existIndex = -1;
  if (_mockStore.mockSocketUrls.some(function (url, index) {
    if (url === settings.url) {
      existIndex = index;
      return true;
    }
    return false;
  })) {
    _mockStore.mockSocketSettings[existIndex].push(settings);
  } else {
    _mockStore.mockSocketUrls.push(settings.url);
    _mockStore.mockSocketSettings.push([settings]);
  }
};

var _attachSender = function _attachSender(settings) {
  var execSender = function execSender() {
    settings.sender.call(settings);
    if (!settings.response) {
      console.warn('Please specify response data for url \'' + settings.url + '\'.');
      return;
    }
    var validData = (0, _utils.procSentData)(settings.response);
    _eventBus3.default.dispatchEvent({
      type: '_message',
      url: settings.url,
      messageEventDict: {
        data: validData.dataToBeSent
      }
    });
  };
  if (typeof settings.sendInterval === 'number') {
    settings._intervalId = setInterval(execSender, settings.sendInterval);
  } else if (Array.isArray(settings.sendInterval)) {
    var timeoutIndex = 0;
    settings.sendInterval = settings.sendInterval.filter(function (time) {
      return typeof time === 'number';
    });
    var len = settings.sendInterval.length;
    if (len) {
      var execTimeout = function execTimeout() {
        execSender();
        timeoutIndex++;
        if (timeoutIndex === len) timeoutIndex = 0;
        settings._timeoutId = setTimeout(execTimeout, settings.sendInterval[timeoutIndex]);
      };
      settings._timeoutId = setTimeout(execTimeout, settings.sendInterval[timeoutIndex]);
    }
  } else if (settings.sendInterval === 'onreceive') {
    _eventBus3.default.addEventListener('_receive', function (event) {
      if (event.url !== settings.url || event._id !== settings._id) return;
      execSender();
    });
  }
};

var _id = 0;

// Class to be exported

var WsMock = function () {
  function WsMock() {
    _classCallCheck(this, WsMock);
  }

  _createClass(WsMock, null, [{
    key: 'config',
    value: function config(opt) {
      Object.assign(WsMock.settings, opt);
    }
  }, {
    key: 'mock',
    value: function mock(settings) {
      if (!settings.url) {
        console.error('Url must be specified.');
        return;
      }
      settings._id = _id++;
      _storeMock(settings);
      _attachSender(settings);
    }
  }]);

  return WsMock;
}();

WsMock.settings = {
  CONNECTING_TIME: 100,
  CLOSING_TIME: 100,
  // Bytes per second
  SEND_RATE: 1 * 1024 * 1024
};

window.WebSocket = _websocket2.default;
exports.default = WsMock;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _eventTarget = __webpack_require__(1);

var _eventTarget2 = _interopRequireDefault(_eventTarget);

var _eventBus2 = __webpack_require__(2);

var _eventBus3 = _interopRequireDefault(_eventBus2);

var _wsmock = __webpack_require__(4);

var _wsmock2 = _interopRequireDefault(_wsmock);

var _mockStore = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * How Webkit implements WebSocket.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WebSocket.h  -https://github.com/WebKit/webkit/blob/5ba65e3c7d14bc3230381f786534e50bb5f3c593/Source/WebCore/Modules/websockets/WebSocket.h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WebSocket.cpp  -https://github.com/WebKit/webkit/blob/5ba65e3c7d14bc3230381f786534e50bb5f3c593/Source/WebCore/Modules/websockets/WebSocket.cpp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _WebSocket = window.WebSocket;

// Override native

var WebSocket = function (_EventTarget2) {
  _inherits(WebSocket, _EventTarget2);

  function WebSocket(url, protocols) {
    var _ret;

    _classCallCheck(this, WebSocket);

    if (arguments.length < 1) {
      throw TypeError('Failed to construct \'WebSocket\': 1 argument required, but only 0 present.');
      return _possibleConstructorReturn(_this);
    }

    var _this = _possibleConstructorReturn(this, (WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call(this));

    for (var i = 0; i < _mockStore.mockSocketUrls.length; i++) {
      if (_mockStore.mockSocketUrls[i] === url) {
        var urlValidationResult = (0, _utils.isValidUrl)(url);
        if (typeof urlValidationResult === 'string') {
          throw new DOMException('Failed to construct \'WebSocket\': ' + urlValidationResult);
          return _possibleConstructorReturn(_this);
        }
        _this._defineFields();
        _this._observeProps();
        _this._url = url;
        _this._protocol = protocols;

        _this._closeEventDict = {
          code: 1000,
          reason: 'Connection of mock WebSocket with url \'' + _this.url + '\' is closed because you are so ugly.',
          wasClean: true
        };
        _this._index = i;
        _this._attachEvents();
        setTimeout(function () {
          _this._readyState = WebSocket.OPEN;
        }, _wsmock2.default.settings.CONNECTING_TIME);
        return _possibleConstructorReturn(_this);
      }
    }
    console.log('%cMock setting for url \'' + url + '\' not found, native WebSocket will be invoked.', 'color: blue;');
    return _ret = new _WebSocket(url, protocols), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WebSocket, [{
    key: 'send',
    value: function send(data) {
      var _this2 = this;

      if (arguments.length < 1) {
        throw new TypeError('Failed to execute \'send\' on \'WebSocket\': 1 argument required, but only 0 present.');
        return;
      }
      if (this._readyState === WebSocket.CONNECTING) {
        throw new DOMException('Failed to execute \'send\' on \'WebSocket\': Still in CONNECTING state.', 'InvalidStateError');
        return;
      } else if (this._readyState !== WebSocket.OPEN) {
        console.error('WebSocket is already in CLOSING or CLOSED state.');
        return;
      }
      var validData = (0, _utils.procSentData)(data);
      var dataSize = validData.dataSize;
      var dataToBeSent = validData.dataToBeSent;
      this._bufferedAmount += dataSize;
      var settings = _mockStore.mockSocketSettings[this._index];
      var waitingTime = this.bufferedAmount / _wsmock2.default.settings.SEND_RATE * 1000;
      setTimeout(function () {
        settings.map(function (setting) {
          var receiver = setting.receiver;
          receiver && receiver.call(setting, dataToBeSent);
          _eventBus3.default.dispatchEvent({
            type: '_receive',
            url: setting.url,
            _id: setting._id
          });
          _this2._bufferedAmount = 0;
        });
      }, waitingTime);
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var reason = arguments[1];

      code = Number(code);
      code = isNaN(code) || code < 0 ? 0 : code > 65535 ? 65535 : code;
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
      if (code !== 1000 && (code < 3000 || code > 4999)) {
        throw new DOMException('Failed to execute \'close\' on \'WebSocket\': The code must be either 1000, or between 3000 and 4999. ' + code + ' is neither.', 'InvalidAccessError');
        return;
      }
      this._readyState = WebSocket.CLOSING;
      setTimeout(function () {
        _this3._closeEventDict.code = code;
        reason && (_this3._closeEventDict.reason = reason);
        _this3._readyState = WebSocket.CLOSED;
        _this3.removeAllListeners();
      }, _wsmock2.default.settings.CLOSING_TIME);
    }
  }, {
    key: '_defineFields',
    value: function _defineFields() {
      // window.WebSocket fields
      this.binaryType = 'blob';
      // bufferedAmount: UTF-8 text or binary data
      // For those data that is not a string or binary data, use ('' + data) instead.
      // Example: ws.send({ a: 1 }), bufferedAmount = ('' + { a: 1 }).length => "[object Object]".length => 15
      // [1, 2, 3] => ('' + [1, 2, 3]).length => "1,2,3".length => 5
      // See https://html.spec.whatwg.org/multipage/web-sockets.html#dom-websocket-bufferedamount
      // And https://github.com/chromium/chromium/blob/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/modules/websockets/dom_web_socket.cc#L416
      // An implementation https://github.com/theturtle32/WebSocket-Node/blob/1037571aee32edd0c9008bda57cbf4c0d55fad36/lib/W3CWebSocket.js#L109
      this.bufferedAmount = 0;
      this.extensions = '';
      this.onclose = null;
      this.onerror = null;
      this.onmessage = null;
      this.onopen = null;
      this.protocol = '';
      this.readyState = WebSocket.CONNECTING;
      this.url = null;

      // 'Invisible' WebSocket fields
      this._bufferedAmount = 0;
      this._extensions = '';
      this._protocol = '';
      this._readyState = WebSocket.CONNECTING;
      this._url = null;

      // Custom fields
      this._index = -1;
    }
  }, {
    key: '_attachEvents',
    value: function _attachEvents() {
      _eventBus3.default.addEventListener('_message', this._dispatchMessageEvent.bind(this));
    }
  }, {
    key: '_dispatchMessageEvent',
    value: function _dispatchMessageEvent(event) {
      if (event.url !== this.url) return;
      this.dispatchEvent(this._defineEventProps(new MessageEvent('message', Object.assign({
        data: null,
        origin: this.url,
        lastEventId: '',
        source: null,
        ports: []
      }, event.messageEventDict))));
    }
  }, {
    key: '_observeProps',
    value: function _observeProps() {
      this._observeBinaryType();
      this._observeBufferedAmount();
      this._observeExtensions();
      this._observeProtocol();
      this._observeOnEvents();
      this._observeReadyState();
      this._observeUrl();
    }
  }, {
    key: '_observeBinaryType',
    value: function _observeBinaryType() {
      var validEnum = ['blob', 'arraybuffer'];
      var binaryTypeValue = 'blob';
      Object.defineProperty(this, 'binaryType', {
        configurable: true,
        enumerable: true,
        get: function get() {
          return binaryTypeValue;
        },
        set: function set(val) {
          if (validEnum.indexOf(val) > -1) {
            binaryTypeValue = val;
          } else {
            console.warn('The provided value \'' + val + '\' is not a valid enum value of type BinaryType.');
          }
        }
      });
    }
  }, {
    key: '_observeBufferedAmount',
    value: function _observeBufferedAmount() {
      this._observeReadOnlyProps('bufferedAmount', 0);
    }
  }, {
    key: '_observeExtensions',
    value: function _observeExtensions() {
      this._observeReadOnlyProps('extensions', '');
    }
  }, {
    key: '_observeProtocol',
    value: function _observeProtocol() {
      this._observeReadOnlyProps('protocol', '');
    }
  }, {
    key: '_observeOnEvents',
    value: function _observeOnEvents() {
      var _this4 = this;

      var onEvents = ['close', 'error', 'message', 'open'];
      onEvents.map(function (event) {
        var eventIndex = void 0,
            handler = null;
        Object.defineProperty(_this4, 'on' + event, {
          configurable: true,
          enumerable: true,
          get: function get() {
            return handler;
          },
          set: function set(val) {
            if (!handler) {
              eventIndex = this.addEventListener(event, val);
            } else {
              this.modifyHandler(event, eventIndex, val);
            }
            handler = val;
          }
        });
      });
    }
  }, {
    key: '_observeReadyState',
    value: function _observeReadyState() {
      var _this5 = this;

      this._observeReadOnlyProps('readyState', WebSocket.CONNECTING, function (val) {
        switch (val) {
          case WebSocket.OPEN:
            _this5.dispatchEvent(_this5._defineEventProps(new Event('open')));
            break;
          case WebSocket.CLOSED:
            _this5.dispatchEvent(_this5._defineEventProps(new CloseEvent('close', {
              code: _this5._closeEventDict.code,
              reason: _this5._closeEventDict.reason,
              wasClean: _this5._closeEventDict.wasClean
            })));
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: '_observeUrl',
    value: function _observeUrl() {
      this._observeReadOnlyProps('url', null);
    }
  }, {
    key: '_observeReadOnlyProps',
    value: function _observeReadOnlyProps(propName, defaultValue, setterCallback) {
      var propValue = defaultValue;
      Object.defineProperty(this, '_' + propName, {
        configurable: true,
        enumerable: false,
        get: function get() {
          return propValue;
        },
        set: function set(val) {
          propValue = val;
          setterCallback && typeof setterCallback === 'function' && setterCallback.call(this, val);
          Object.defineProperty(this, propName, {
            value: propValue,
            configurable: true,
            enumerable: true,
            writable: false
          });
        }
      });
      this['_' + propName] = defaultValue;
    }
  }, {
    key: '_defineEventProps',
    value: function _defineEventProps(event) {
      var _this6 = this;

      var props = ['srcElement', 'currentTarget', 'target'];
      props.map(function (prop) {
        Object.defineProperty(event, prop, {
          value: _this6,
          configurable: true,
          enumerable: true
        });
      });
      return event;
    }
  }]);

  return WebSocket;
}(_eventTarget2.default);

WebSocket.CONNECTING = 0;
WebSocket.prototype.CONNECTING = WebSocket.CONNECTING;
WebSocket.OPEN = 1;
WebSocket.prototype.OPEN = WebSocket.OPEN;
WebSocket.CLOSING = 2;
WebSocket.prototype.CLOSING = WebSocket.CLOSING;
WebSocket.CLOSED = 3;
WebSocket.prototype.CLOSED = WebSocket.CLOSED;

WebSocket._nativeWebSocket = _WebSocket;

exports.default = WebSocket;

/***/ })
/******/ ])["default"];
});