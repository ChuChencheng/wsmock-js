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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/wsmock.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/event-bus.js":
/*!**************************!*\
  !*** ./src/event-bus.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventTarget = __webpack_require__(/*! ./event-target */ "./src/event-target.js");

var _eventTarget2 = _interopRequireDefault(_eventTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventBus = new _eventTarget2.default(); /**
                                              * Event bus.
                                              */
exports.default = _eventBus;

/***/ }),

/***/ "./src/event-target.js":
/*!*****************************!*\
  !*** ./src/event-target.js ***!
  \*****************************/
/*! no static exports found */
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
      if (!(type in this.listeners) || !(typeof index !== 'number')) {
        return;
      }
      var stack = this.listeners[type];
      stack[index] = newHandler;
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners(type) {
      if (!(type in this.listeners)) return;
      this.listeners[type] = [];
    }
  }]);

  return _EventTarget;
}();

exports.default = _EventTarget;

/***/ }),

/***/ "./src/mock-store.js":
/*!***************************!*\
  !*** ./src/mock-store.js ***!
  \***************************/
/*! no static exports found */
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

/***/ "./src/websocket.js":
/*!**************************!*\
  !*** ./src/websocket.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventTarget = __webpack_require__(/*! ./event-target */ "./src/event-target.js");

var _eventTarget2 = _interopRequireDefault(_eventTarget);

var _eventBus2 = __webpack_require__(/*! ./event-bus */ "./src/event-bus.js");

var _eventBus3 = _interopRequireDefault(_eventBus2);

var _wsmock = __webpack_require__(/*! ./wsmock */ "./src/wsmock.js");

var _wsmock2 = _interopRequireDefault(_wsmock);

var _mockStore = __webpack_require__(/*! ./mock-store */ "./src/mock-store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _WebSocket = window.WebSocket;

// Override native

var WebSocket = function (_EventTarget2) {
  _inherits(WebSocket, _EventTarget2);

  function WebSocket(url, protocols) {
    var _ret;

    _classCallCheck(this, WebSocket);

    var _this = _possibleConstructorReturn(this, (WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call(this));

    for (var i = 0; i < _mockStore.mockSocketUrls.length; i++) {
      if (_mockStore.mockSocketUrls[i] === url) {
        _this._defineFields();
        _this._observeProps();
        _this._url = url;
        _this._protocol = protocols;

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

      if (this._readyState === WebSocket.CONNECTING) {
        throw new DOMException('Failed to execute \'send\' on \'WebSocket\': Still in CONNECTING state.', 'InvalidStateError');
        return;
      } else if (this._readyState !== WebSocket.OPEN) {
        console.error('WebSocket is already in CLOSING or CLOSED state.');
        return;
      }
      var dataSize = 0;
      // Data type confirm
      // String.
      if (typeof data === 'string' || data instanceof String) {
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
            // Other type. Invoke its toString method then use the 'length' property
            else {
                // Not sure what will be sent yet. Need to be tested on server side.
                dataSize += data.toString && data.toString().length || data === null && 4 || data === undefined && 9;
              }
      this._bufferedAmount += dataSize;
      var settings = _mockStore.mockSocketSettings[this._index];
      var waitingTime = _wsmock2.default.settings.TOTAL_BUFFER_SIZE / _wsmock2.default.settings.SEND_RATE * 1000;
      setTimeout(function () {
        settings.map(function (setting) {
          var receiver = setting.receiver;
          receiver && receiver.call(setting, data);
          _this2._bufferedAmount -= dataSize;
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
        _this3.removeAllListeners('message');
        _this3._readyState = WebSocket.CLOSED;
      }, _wsmock2.default.settings.CLOSING_TIME);
    }
  }, {
    key: '_defineFields',
    value: function _defineFields() {
      // window.WebSocket fields
      this.binaryType = 'blob';
      // bufferedAmount: UTF-8 text or binary data
      // For those data that is not a string or binary data, its `toString` method will be called then return the length.
      // Example: ws.send({ a: 1 }), bufferedAmount = ({ a: 1 }).toString().length => "[object Object]".length => 15
      // [1, 2, 3] => [1, 2, 3].toString().length => "1,2,3".length => 5
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
      this._closeEventDict = {
        code: 1000,
        reason: 'Connection of mock WebSocket with url \'' + this.url + '\' is closed because you are so ugly.',
        wasClean: true
      };
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
      this.dispatchEvent(new MessageEvent('message', Object.assign({
        data: null,
        origin: '',
        lastEventId: '',
        source: null,
        ports: []
      }, event.messageEventDict)));
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
            _this5.dispatchEvent(new CustomEvent('open'));
            break;
          case WebSocket.CLOSED:
            _this5.dispatchEvent(new CloseEvent('close', {
              code: _this5._closeEventDict.code,
              reason: _this5._closeEventDict.reason,
              wasClean: _this5._closeEventDict.wasClean
            }));
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

exports.default = WebSocket;

/***/ }),

/***/ "./src/wsmock.js":
/*!***********************!*\
  !*** ./src/wsmock.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventBus2 = __webpack_require__(/*! ./event-bus */ "./src/event-bus.js");

var _eventBus3 = _interopRequireDefault(_eventBus2);

var _mockStore = __webpack_require__(/*! ./mock-store */ "./src/mock-store.js");

var _websocket = __webpack_require__(/*! ./websocket */ "./src/websocket.js");

var _websocket2 = _interopRequireDefault(_websocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  if (typeof settings.sendInterval === 'number') {
    settings._intervalId = setInterval(function () {
      settings.sender.call(settings);
      if (!settings.response) {
        console.warn('Please specify response data for url \'' + settings.url + '\'.');
        return;
      }
      _eventBus3.default.dispatchEvent({
        type: '_message',
        url: settings.url,
        messageEventDict: {
          data: settings.response
        }
      });
    }, settings.sendInterval);
  }
};

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
  SEND_RATE: 1 * 1024 * 1024,
  // Default: 300ms to finish sending
  TOTAL_BUFFER_SIZE: 1 * 1024 * 1024 / 1000 * 300
};

window.WebSocket = _websocket2.default;
exports.default = WsMock;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Xc01vY2svd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1dzTW9jay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Xc01vY2svLi9zcmMvZXZlbnQtYnVzLmpzIiwid2VicGFjazovL1dzTW9jay8uL3NyYy9ldmVudC10YXJnZXQuanMiLCJ3ZWJwYWNrOi8vV3NNb2NrLy4vc3JjL21vY2stc3RvcmUuanMiLCJ3ZWJwYWNrOi8vV3NNb2NrLy4vc3JjL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly9Xc01vY2svLi9zcmMvd3Ntb2NrLmpzIl0sIm5hbWVzIjpbIl9ldmVudEJ1cyIsIl9FdmVudFRhcmdldCIsImxpc3RlbmVycyIsInR5cGUiLCJjYWxsYmFjayIsInN0YWNrIiwicHVzaCIsImxlbmd0aCIsImkiLCJsIiwic3BsaWNlIiwiZXZlbnQiLCJjYWxsIiwiZGVmYXVsdFByZXZlbnRlZCIsImluZGV4IiwibmV3SGFuZGxlciIsIm1vY2tTb2NrZXRVcmxzIiwibW9ja1NvY2tldFNldHRpbmdzIiwiX1dlYlNvY2tldCIsIndpbmRvdyIsIldlYlNvY2tldCIsInVybCIsInByb3RvY29scyIsIl9kZWZpbmVGaWVsZHMiLCJfb2JzZXJ2ZVByb3BzIiwiX3VybCIsIl9wcm90b2NvbCIsIl9pbmRleCIsIl9hdHRhY2hFdmVudHMiLCJzZXRUaW1lb3V0IiwiX3JlYWR5U3RhdGUiLCJPUEVOIiwiV3NNb2NrIiwic2V0dGluZ3MiLCJDT05ORUNUSU5HX1RJTUUiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIkNPTk5FQ1RJTkciLCJET01FeGNlcHRpb24iLCJlcnJvciIsImRhdGFTaXplIiwiU3RyaW5nIiwiQXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiQmxvYiIsInNpemUiLCJCWVRFU19QRVJfRUxFTUVOVCIsInRvU3RyaW5nIiwidW5kZWZpbmVkIiwiX2J1ZmZlcmVkQW1vdW50Iiwid2FpdGluZ1RpbWUiLCJUT1RBTF9CVUZGRVJfU0laRSIsIlNFTkRfUkFURSIsIm1hcCIsInNldHRpbmciLCJyZWNlaXZlciIsImNvZGUiLCJyZWFzb24iLCJOdW1iZXIiLCJpc05hTiIsIkNMT1NJTkciLCJfY2xvc2VFdmVudERpY3QiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJDTE9TRUQiLCJDTE9TSU5HX1RJTUUiLCJiaW5hcnlUeXBlIiwiYnVmZmVyZWRBbW91bnQiLCJleHRlbnNpb25zIiwib25jbG9zZSIsIm9uZXJyb3IiLCJvbm1lc3NhZ2UiLCJvbm9wZW4iLCJwcm90b2NvbCIsInJlYWR5U3RhdGUiLCJfZXh0ZW5zaW9ucyIsIndhc0NsZWFuIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9kaXNwYXRjaE1lc3NhZ2VFdmVudCIsImJpbmQiLCJkaXNwYXRjaEV2ZW50IiwiTWVzc2FnZUV2ZW50IiwiT2JqZWN0IiwiYXNzaWduIiwib3JpZ2luIiwibGFzdEV2ZW50SWQiLCJzb3VyY2UiLCJwb3J0cyIsIm1lc3NhZ2VFdmVudERpY3QiLCJfb2JzZXJ2ZUJpbmFyeVR5cGUiLCJfb2JzZXJ2ZUJ1ZmZlcmVkQW1vdW50IiwiX29ic2VydmVFeHRlbnNpb25zIiwiX29ic2VydmVQcm90b2NvbCIsIl9vYnNlcnZlT25FdmVudHMiLCJfb2JzZXJ2ZVJlYWR5U3RhdGUiLCJfb2JzZXJ2ZVVybCIsInZhbGlkRW51bSIsImJpbmFyeVR5cGVWYWx1ZSIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInNldCIsInZhbCIsImluZGV4T2YiLCJ3YXJuIiwiX29ic2VydmVSZWFkT25seVByb3BzIiwib25FdmVudHMiLCJldmVudEluZGV4IiwiaGFuZGxlciIsIm1vZGlmeUhhbmRsZXIiLCJDdXN0b21FdmVudCIsIkNsb3NlRXZlbnQiLCJwcm9wTmFtZSIsImRlZmF1bHRWYWx1ZSIsInNldHRlckNhbGxiYWNrIiwicHJvcFZhbHVlIiwidmFsdWUiLCJ3cml0YWJsZSIsInByb3RvdHlwZSIsIkVycm9yIiwiX3N0b3JlTW9jayIsImV4aXN0SW5kZXgiLCJzb21lIiwiX2F0dGFjaFNlbmRlciIsInNlbmRJbnRlcnZhbCIsIl9pbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJzZW5kZXIiLCJyZXNwb25zZSIsIm9wdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7QUFDQSxJQUFNQSxZQUFZLElBQUlDLHFCQUFKLEVBQWxCLEMsQ0FKQTs7O2tCQUtlRCxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGY7Ozs7SUFJTUMsWTtBQUNKLDBCQUFlO0FBQUE7O0FBQ2IsU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNEOzs7O3FDQUVpQkMsSSxFQUFNQyxRLEVBQVU7QUFDaEMsVUFBSSxFQUFFRCxRQUFRLEtBQUtELFNBQWYsQ0FBSixFQUErQjtBQUM3QixhQUFLQSxTQUFMLENBQWVDLElBQWYsSUFBdUIsRUFBdkI7QUFDRDtBQUNELFVBQU1FLFFBQVEsS0FBS0gsU0FBTCxDQUFlQyxJQUFmLENBQWQ7QUFDQUUsWUFBTUMsSUFBTixDQUFXRixRQUFYO0FBQ0E7QUFDQSxhQUFPQyxNQUFNRSxNQUFOLEdBQWUsQ0FBdEI7QUFDRDs7O3dDQUVvQkosSSxFQUFNQyxRLEVBQVU7QUFDbkMsVUFBSSxFQUFFRCxRQUFRLEtBQUtELFNBQWYsQ0FBSixFQUErQjtBQUMvQixVQUFNRyxRQUFRLEtBQUtILFNBQUwsQ0FBZUMsSUFBZixDQUFkO0FBQ0EsV0FBSyxJQUFJSyxJQUFJLENBQVIsRUFBV0MsSUFBSUosTUFBTUUsTUFBMUIsRUFBa0NDLElBQUlDLENBQXRDLEVBQXlDRCxHQUF6QyxFQUE4QztBQUM1QyxZQUFJSCxNQUFNRyxDQUFOLE1BQWFKLFFBQWpCLEVBQTJCO0FBQ3pCQyxnQkFBTUssTUFBTixDQUFhRixDQUFiLEVBQWdCLENBQWhCO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7OztrQ0FFY0csSyxFQUFPO0FBQ3BCLFVBQUksRUFBRUEsTUFBTVIsSUFBTixJQUFjLEtBQUtELFNBQXJCLENBQUosRUFBcUM7QUFDbkMsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxVQUFNRyxRQUFRLEtBQUtILFNBQUwsQ0FBZVMsTUFBTVIsSUFBckIsQ0FBZDtBQUNBLFdBQUssSUFBSUssSUFBSSxDQUFSLEVBQVdDLElBQUlKLE1BQU1FLE1BQTFCLEVBQWtDQyxJQUFJQyxDQUF0QyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDNUNILGNBQU1HLENBQU4sRUFBU0ksSUFBVCxDQUFjLElBQWQsRUFBb0JELEtBQXBCO0FBQ0Q7QUFDRCxhQUFPLENBQUNBLE1BQU1FLGdCQUFkO0FBQ0Q7OztrQ0FFY1YsSSxFQUFNVyxLLEVBQU9DLFUsRUFBWTtBQUN0QyxVQUFJLEVBQUVaLFFBQVEsS0FBS0QsU0FBZixLQUE2QixFQUFFLE9BQU9ZLEtBQVAsS0FBaUIsUUFBbkIsQ0FBakMsRUFBK0Q7QUFDN0Q7QUFDRDtBQUNELFVBQU1ULFFBQVEsS0FBS0gsU0FBTCxDQUFlQyxJQUFmLENBQWQ7QUFDQUUsWUFBTVMsS0FBTixJQUFlQyxVQUFmO0FBQ0Q7Ozt1Q0FFbUJaLEksRUFBTTtBQUN4QixVQUFJLEVBQUVBLFFBQVEsS0FBS0QsU0FBZixDQUFKLEVBQStCO0FBQy9CLFdBQUtBLFNBQUwsQ0FBZUMsSUFBZixJQUF1QixFQUF2QjtBQUNEOzs7Ozs7a0JBR1lGLFk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRmOzs7QUFHTyxJQUFJZSwwQ0FBaUIsRUFBckI7QUFDQSxJQUFJQyxrREFBcUIsRUFBekIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1DLGFBQWFDLE9BQU9DLFNBQTFCOztBQUVBOztJQUNNQSxTOzs7QUFDSixxQkFBYUMsR0FBYixFQUFrQkMsU0FBbEIsRUFBNkI7QUFBQTs7QUFBQTs7QUFBQTs7QUFFM0IsU0FBSyxJQUFJZCxJQUFJLENBQWIsRUFBZ0JBLElBQUlRLDBCQUFlVCxNQUFuQyxFQUEyQ0MsR0FBM0MsRUFBZ0Q7QUFDOUMsVUFBSVEsMEJBQWVSLENBQWYsTUFBc0JhLEdBQTFCLEVBQStCO0FBQzdCLGNBQUtFLGFBQUw7QUFDQSxjQUFLQyxhQUFMO0FBQ0EsY0FBS0MsSUFBTCxHQUFZSixHQUFaO0FBQ0EsY0FBS0ssU0FBTCxHQUFpQkosU0FBakI7O0FBRUEsY0FBS0ssTUFBTCxHQUFjbkIsQ0FBZDtBQUNBLGNBQUtvQixhQUFMO0FBQ0FDLG1CQUFXLFlBQU07QUFDZixnQkFBS0MsV0FBTCxHQUFtQlYsVUFBVVcsSUFBN0I7QUFDRCxTQUZELEVBRUdDLGlCQUFPQyxRQUFQLENBQWdCQyxlQUZuQjtBQUdBO0FBQ0Q7QUFDRjtBQUNEQyxZQUFRQyxHQUFSLCtCQUF1Q2YsR0FBdkMsc0RBQTRGLGNBQTVGO0FBQ0Esa0JBQU8sSUFBSUgsVUFBSixDQUFlRyxHQUFmLEVBQW9CQyxTQUFwQixDQUFQO0FBQ0Q7Ozs7eUJBRUtlLEksRUFBTTtBQUFBOztBQUNWLFVBQUksS0FBS1AsV0FBTCxLQUFxQlYsVUFBVWtCLFVBQW5DLEVBQStDO0FBQzdDLGNBQU0sSUFBSUMsWUFBSiw0RUFBd0YsbUJBQXhGLENBQU47QUFDQTtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtULFdBQUwsS0FBcUJWLFVBQVVXLElBQW5DLEVBQXlDO0FBQzlDSSxnQkFBUUssS0FBUixDQUFjLGtEQUFkO0FBQ0E7QUFDRDtBQUNELFVBQUlDLFdBQVcsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxVQUFJLE9BQU9KLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLGdCQUFnQkssTUFBaEQsRUFBd0Q7QUFDdERELG9CQUFZSixLQUFLOUIsTUFBakI7QUFDRDtBQUNEO0FBSEEsV0FJSyxJQUFJOEIsZ0JBQWdCTSxXQUFwQixFQUFpQztBQUNwQ0Ysc0JBQVlKLEtBQUtPLFVBQWpCO0FBQ0Q7QUFDRDtBQUhLLGFBSUEsSUFBSVAsZ0JBQWdCUSxJQUFwQixFQUEwQjtBQUM3Qkosd0JBQVlKLEtBQUtTLElBQWpCO0FBQ0Q7QUFDRDtBQUhLLGVBSUEsSUFBSVQsS0FBS08sVUFBVCxFQUFxQjtBQUN4QkgsMEJBQVlKLEtBQUtPLFVBQUwsSUFBbUJQLEtBQUtVLGlCQUFMLElBQTBCLENBQTdDLENBQVo7QUFDRDtBQUNEO0FBSEssaUJBSUE7QUFDSDtBQUNBTiw0QkFBY0osS0FBS1csUUFBTCxJQUFpQlgsS0FBS1csUUFBTCxHQUFnQnpDLE1BQWxDLElBQThDOEIsU0FBUyxJQUFULElBQWlCLENBQS9ELElBQXNFQSxTQUFTWSxTQUFULElBQXNCLENBQXpHO0FBQ0Q7QUFDRCxXQUFLQyxlQUFMLElBQXdCVCxRQUF4QjtBQUNBLFVBQU1SLFdBQVdoQiw4QkFBbUIsS0FBS1UsTUFBeEIsQ0FBakI7QUFDQSxVQUFNd0IsY0FBZW5CLGlCQUFPQyxRQUFQLENBQWdCbUIsaUJBQWhCLEdBQW9DcEIsaUJBQU9DLFFBQVAsQ0FBZ0JvQixTQUFyRCxHQUFrRSxJQUF0RjtBQUNBeEIsaUJBQVcsWUFBTTtBQUNmSSxpQkFBU3FCLEdBQVQsQ0FBYSxVQUFDQyxPQUFELEVBQWE7QUFDeEIsY0FBTUMsV0FBV0QsUUFBUUMsUUFBekI7QUFDQUEsc0JBQVlBLFNBQVM1QyxJQUFULENBQWMyQyxPQUFkLEVBQXVCbEIsSUFBdkIsQ0FBWjtBQUNBLGlCQUFLYSxlQUFMLElBQXdCVCxRQUF4QjtBQUNELFNBSkQ7QUFLRCxPQU5ELEVBTUdVLFdBTkg7QUFPRDs7OzRCQUUyQjtBQUFBOztBQUFBLFVBQXJCTSxJQUFxQix1RUFBZCxJQUFjO0FBQUEsVUFBUkMsTUFBUTs7QUFDMUJELGFBQU9FLE9BQU9GLElBQVAsQ0FBUDtBQUNBQSxhQUFRRyxNQUFNSCxJQUFOLEtBQWVBLE9BQU8sQ0FBdkIsR0FBNEIsQ0FBNUIsR0FBaUNBLE9BQU8sS0FBUCxHQUFlLEtBQWYsR0FBdUJBLElBQS9EO0FBQ0E7QUFDQSxVQUFJQSxTQUFTLElBQVQsS0FBa0JBLE9BQU8sSUFBUCxJQUFlQSxPQUFPLElBQXhDLENBQUosRUFBbUQ7QUFDakQsY0FBTSxJQUFJbEIsWUFBSiw0R0FBc0hrQixJQUF0SCxtQkFBMEksb0JBQTFJLENBQU47QUFDQTtBQUNEO0FBQ0QsV0FBSzNCLFdBQUwsR0FBbUJWLFVBQVV5QyxPQUE3QjtBQUNBaEMsaUJBQVcsWUFBTTtBQUNmLGVBQUtpQyxlQUFMLENBQXFCTCxJQUFyQixHQUE0QkEsSUFBNUI7QUFDQUMsbUJBQVcsT0FBS0ksZUFBTCxDQUFxQkosTUFBckIsR0FBOEJBLE1BQXpDO0FBQ0EsZUFBS0ssa0JBQUwsQ0FBd0IsU0FBeEI7QUFDQSxlQUFLakMsV0FBTCxHQUFtQlYsVUFBVTRDLE1BQTdCO0FBQ0QsT0FMRCxFQUtHaEMsaUJBQU9DLFFBQVAsQ0FBZ0JnQyxZQUxuQjtBQU1EOzs7b0NBRWdCO0FBQ2Y7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLE1BQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxXQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQnRELFVBQVVrQixVQUE1QjtBQUNBLFdBQUtqQixHQUFMLEdBQVcsSUFBWDs7QUFFQTtBQUNBLFdBQUs2QixlQUFMLEdBQXVCLENBQXZCO0FBQ0EsV0FBS3lCLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxXQUFLakQsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUtJLFdBQUwsR0FBbUJWLFVBQVVrQixVQUE3QjtBQUNBLFdBQUtiLElBQUwsR0FBWSxJQUFaOztBQUVBO0FBQ0EsV0FBS0UsTUFBTCxHQUFjLENBQUMsQ0FBZjtBQUNBLFdBQUttQyxlQUFMLEdBQXVCO0FBQ3JCTCxjQUFNLElBRGU7QUFFckJDLDZEQUFrRCxLQUFLckMsR0FBdkQsMENBRnFCO0FBR3JCdUQsa0JBQVU7QUFIVyxPQUF2QjtBQUtEOzs7b0NBRWdCO0FBQ2Y1RSx5QkFBVTZFLGdCQUFWLENBQTJCLFVBQTNCLEVBQXVDLEtBQUtDLHFCQUFMLENBQTJCQyxJQUEzQixDQUFnQyxJQUFoQyxDQUF2QztBQUNEOzs7MENBRXNCcEUsSyxFQUFPO0FBQzVCLFVBQUlBLE1BQU1VLEdBQU4sS0FBYyxLQUFLQSxHQUF2QixFQUE0QjtBQUM1QixXQUFLMkQsYUFBTCxDQUFtQixJQUFJQyxZQUFKLENBQWlCLFNBQWpCLEVBQTRCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0Q5QyxjQUFNLElBRHFEO0FBRTNEK0MsZ0JBQVEsRUFGbUQ7QUFHM0RDLHFCQUFhLEVBSDhDO0FBSTNEQyxnQkFBUSxJQUptRDtBQUszREMsZUFBTztBQUxvRCxPQUFkLEVBTTVDNUUsTUFBTTZFLGdCQU5zQyxDQUE1QixDQUFuQjtBQU9EOzs7b0NBRWdCO0FBQ2YsV0FBS0Msa0JBQUw7QUFDQSxXQUFLQyxzQkFBTDtBQUNBLFdBQUtDLGtCQUFMO0FBQ0EsV0FBS0MsZ0JBQUw7QUFDQSxXQUFLQyxnQkFBTDtBQUNBLFdBQUtDLGtCQUFMO0FBQ0EsV0FBS0MsV0FBTDtBQUNEOzs7eUNBRXFCO0FBQ3BCLFVBQU1DLFlBQVksQ0FBQyxNQUFELEVBQVMsYUFBVCxDQUFsQjtBQUNBLFVBQUlDLGtCQUFrQixNQUF0QjtBQUNBZixhQUFPZ0IsY0FBUCxDQUFzQixJQUF0QixFQUE0QixZQUE1QixFQUEwQztBQUN4Q0Msc0JBQWMsSUFEMEI7QUFFeENDLG9CQUFZLElBRjRCO0FBR3hDQyxXQUh3QyxpQkFHakM7QUFDTCxpQkFBT0osZUFBUDtBQUNELFNBTHVDO0FBTXhDSyxXQU53QyxlQU1uQ0MsR0FObUMsRUFNOUI7QUFDUixjQUFJUCxVQUFVUSxPQUFWLENBQWtCRCxHQUFsQixJQUF5QixDQUFDLENBQTlCLEVBQWlDO0FBQy9CTiw4QkFBa0JNLEdBQWxCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xwRSxvQkFBUXNFLElBQVIsMkJBQW9DRixHQUFwQztBQUNEO0FBQ0Y7QUFadUMsT0FBMUM7QUFjRDs7OzZDQUV5QjtBQUN4QixXQUFLRyxxQkFBTCxDQUEyQixnQkFBM0IsRUFBNkMsQ0FBN0M7QUFDRDs7O3lDQUVxQjtBQUNwQixXQUFLQSxxQkFBTCxDQUEyQixZQUEzQixFQUF5QyxFQUF6QztBQUNEOzs7dUNBRW1CO0FBQ2xCLFdBQUtBLHFCQUFMLENBQTJCLFVBQTNCLEVBQXVDLEVBQXZDO0FBQ0Q7Ozt1Q0FFbUI7QUFBQTs7QUFDbEIsVUFBTUMsV0FBVyxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFNBQW5CLEVBQThCLE1BQTlCLENBQWpCO0FBQ0FBLGVBQVNyRCxHQUFULENBQWEsVUFBQzNDLEtBQUQsRUFBVztBQUN0QixZQUFJaUcsbUJBQUo7QUFBQSxZQUFnQkMsVUFBVSxJQUExQjtBQUNBM0IsZUFBT2dCLGNBQVAsQ0FBc0IsTUFBdEIsU0FBaUN2RixLQUFqQyxFQUEwQztBQUN4Q3dGLHdCQUFjLElBRDBCO0FBRXhDQyxzQkFBWSxJQUY0QjtBQUd4Q0MsYUFId0MsaUJBR2pDO0FBQ0wsbUJBQU9RLE9BQVA7QUFDRCxXQUx1QztBQU14Q1AsYUFOd0MsZUFNbkNDLEdBTm1DLEVBTTlCO0FBQ1IsZ0JBQUksQ0FBQ00sT0FBTCxFQUFjO0FBQ1pELDJCQUFhLEtBQUsvQixnQkFBTCxDQUFzQmxFLEtBQXRCLEVBQTZCNEYsR0FBN0IsQ0FBYjtBQUNELGFBRkQsTUFFTztBQUNMLG1CQUFLTyxhQUFMLENBQW1CbkcsS0FBbkIsRUFBMEJpRyxVQUExQixFQUFzQ0wsR0FBdEM7QUFDRDtBQUNGO0FBWnVDLFNBQTFDO0FBY0QsT0FoQkQ7QUFpQkQ7Ozt5Q0FFcUI7QUFBQTs7QUFDcEIsV0FBS0cscUJBQUwsQ0FBMkIsWUFBM0IsRUFBeUN0RixVQUFVa0IsVUFBbkQsRUFBK0QsVUFBQ2lFLEdBQUQsRUFBUztBQUN0RSxnQkFBUUEsR0FBUjtBQUNFLGVBQUtuRixVQUFVVyxJQUFmO0FBQ0UsbUJBQUtpRCxhQUFMLENBQW1CLElBQUkrQixXQUFKLENBQWdCLE1BQWhCLENBQW5CO0FBQ0E7QUFDRixlQUFLM0YsVUFBVTRDLE1BQWY7QUFDRSxtQkFBS2dCLGFBQUwsQ0FBbUIsSUFBSWdDLFVBQUosQ0FBZSxPQUFmLEVBQXdCO0FBQ3pDdkQsb0JBQU0sT0FBS0ssZUFBTCxDQUFxQkwsSUFEYztBQUV6Q0Msc0JBQVEsT0FBS0ksZUFBTCxDQUFxQkosTUFGWTtBQUd6Q2tCLHdCQUFVLE9BQUtkLGVBQUwsQ0FBcUJjO0FBSFUsYUFBeEIsQ0FBbkI7QUFLQTtBQUNGO0FBQ0U7QUFaSjtBQWNELE9BZkQ7QUFnQkQ7OztrQ0FFYztBQUNiLFdBQUs4QixxQkFBTCxDQUEyQixLQUEzQixFQUFrQyxJQUFsQztBQUNEOzs7MENBRXNCTyxRLEVBQVVDLFksRUFBY0MsYyxFQUFnQjtBQUM3RCxVQUFJQyxZQUFZRixZQUFoQjtBQUNBaEMsYUFBT2dCLGNBQVAsQ0FBc0IsSUFBdEIsUUFBZ0NlLFFBQWhDLEVBQTRDO0FBQzFDZCxzQkFBYyxJQUQ0QjtBQUUxQ0Msb0JBQVksS0FGOEI7QUFHMUNDLFdBSDBDLGlCQUduQztBQUNMLGlCQUFPZSxTQUFQO0FBQ0QsU0FMeUM7QUFNMUNkLFdBTjBDLGVBTXJDQyxHQU5xQyxFQU1oQztBQUNSYSxzQkFBWWIsR0FBWjtBQUNBWSw0QkFBbUIsT0FBT0EsY0FBUCxLQUEwQixVQUE3QyxJQUE0REEsZUFBZXZHLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEIyRixHQUExQixDQUE1RDtBQUNBckIsaUJBQU9nQixjQUFQLENBQXNCLElBQXRCLEVBQTRCZSxRQUE1QixFQUFzQztBQUNwQ0ksbUJBQU9ELFNBRDZCO0FBRXBDakIsMEJBQWMsSUFGc0I7QUFHcENDLHdCQUFZLElBSHdCO0FBSXBDa0Isc0JBQVU7QUFKMEIsV0FBdEM7QUFNRDtBQWZ5QyxPQUE1QztBQWlCQSxpQkFBU0wsUUFBVCxJQUF1QkMsWUFBdkI7QUFDRDs7OztFQTlPcUJqSCxxQjs7QUFpUHhCbUIsVUFBVWtCLFVBQVYsR0FBdUIsQ0FBdkI7QUFDQWxCLFVBQVVtRyxTQUFWLENBQW9CakYsVUFBcEIsR0FBaUNsQixVQUFVa0IsVUFBM0M7QUFDQWxCLFVBQVVXLElBQVYsR0FBaUIsQ0FBakI7QUFDQVgsVUFBVW1HLFNBQVYsQ0FBb0J4RixJQUFwQixHQUEyQlgsVUFBVVcsSUFBckM7QUFDQVgsVUFBVXlDLE9BQVYsR0FBb0IsQ0FBcEI7QUFDQXpDLFVBQVVtRyxTQUFWLENBQW9CMUQsT0FBcEIsR0FBOEJ6QyxVQUFVeUMsT0FBeEM7QUFDQXpDLFVBQVU0QyxNQUFWLEdBQW1CLENBQW5CO0FBQ0E1QyxVQUFVbUcsU0FBVixDQUFvQnZELE1BQXBCLEdBQTZCNUMsVUFBVTRDLE1BQXZDOztrQkFFZTVDLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck9mOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBL0JBOzs7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBSSxDQUFDRCxPQUFPQyxTQUFaLEVBQXVCO0FBQ3JCLFFBQU0sSUFBSW9HLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0Q7O0FBTUQsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUN4RixRQUFELEVBQWM7QUFDL0IsTUFBSXlGLGFBQWEsQ0FBQyxDQUFsQjtBQUNBLE1BQUkxRywwQkFBZTJHLElBQWYsQ0FBb0IsVUFBQ3RHLEdBQUQsRUFBTVAsS0FBTixFQUFnQjtBQUN0QyxRQUFJTyxRQUFRWSxTQUFTWixHQUFyQixFQUEwQjtBQUN4QnFHLG1CQUFhNUcsS0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0QsV0FBTyxLQUFQO0FBQ0QsR0FORyxDQUFKLEVBTUk7QUFDRkcsa0NBQW1CeUcsVUFBbkIsRUFBK0JwSCxJQUEvQixDQUFvQzJCLFFBQXBDO0FBQ0QsR0FSRCxNQVFPO0FBQ0xqQiw4QkFBZVYsSUFBZixDQUFvQjJCLFNBQVNaLEdBQTdCO0FBQ0FKLGtDQUFtQlgsSUFBbkIsQ0FBd0IsQ0FBQzJCLFFBQUQsQ0FBeEI7QUFDRDtBQUNGLENBZEQ7O0FBZ0JBLElBQU0yRixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUMzRixRQUFELEVBQWM7QUFDbEMsTUFBSSxPQUFPQSxTQUFTNEYsWUFBaEIsS0FBaUMsUUFBckMsRUFBK0M7QUFDN0M1RixhQUFTNkYsV0FBVCxHQUF1QkMsWUFBWSxZQUFNO0FBQ3ZDOUYsZUFBUytGLE1BQVQsQ0FBZ0JwSCxJQUFoQixDQUFxQnFCLFFBQXJCO0FBQ0EsVUFBSSxDQUFDQSxTQUFTZ0csUUFBZCxFQUF3QjtBQUN0QjlGLGdCQUFRc0UsSUFBUiw2Q0FBc0R4RSxTQUFTWixHQUEvRDtBQUNBO0FBQ0Q7QUFDRHJCLHlCQUFVZ0YsYUFBVixDQUF3QjtBQUN0QjdFLGNBQU0sVUFEZ0I7QUFFdEJrQixhQUFLWSxTQUFTWixHQUZRO0FBR3RCbUUsMEJBQWtCO0FBQ2hCbkQsZ0JBQU1KLFNBQVNnRztBQURDO0FBSEksT0FBeEI7QUFPRCxLQWJzQixFQWFwQmhHLFNBQVM0RixZQWJXLENBQXZCO0FBY0Q7QUFDRixDQWpCRDs7QUFtQkE7O0lBQ003RixNOzs7Ozs7OzJCQUNXa0csRyxFQUFLO0FBQ2xCaEQsYUFBT0MsTUFBUCxDQUFjbkQsT0FBT0MsUUFBckIsRUFBK0JpRyxHQUEvQjtBQUNEOzs7eUJBRVlqRyxRLEVBQVU7QUFDckIsVUFBSSxDQUFDQSxTQUFTWixHQUFkLEVBQW1CO0FBQ2pCYyxnQkFBUUssS0FBUixDQUFjLHdCQUFkO0FBQ0E7QUFDRDtBQUNEaUYsaUJBQVd4RixRQUFYO0FBQ0EyRixvQkFBYzNGLFFBQWQ7QUFDRDs7Ozs7O0FBR0hELE9BQU9DLFFBQVAsR0FBa0I7QUFDaEJDLG1CQUFpQixHQUREO0FBRWhCK0IsZ0JBQWMsR0FGRTtBQUdoQjtBQUNBWixhQUFXLElBQUksSUFBSixHQUFXLElBSk47QUFLaEI7QUFDQUQscUJBQW9CLElBQUksSUFBSixHQUFXLElBQVgsR0FBa0IsSUFBbkIsR0FBMkI7QUFOOUIsQ0FBbEI7O0FBU0FqQyxPQUFPQyxTQUFQLEdBQW1CQSxtQkFBbkI7a0JBQ2VZLE0iLCJmaWxlIjoid3Ntb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiV3NNb2NrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIldzTW9ja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3dzbW9jay5qc1wiKTtcbiIsIi8qKlxyXG4gKiBFdmVudCBidXMuXHJcbiAqL1xyXG5pbXBvcnQgX0V2ZW50VGFyZ2V0IGZyb20gJy4vZXZlbnQtdGFyZ2V0J1xyXG5jb25zdCBfZXZlbnRCdXMgPSBuZXcgX0V2ZW50VGFyZ2V0KClcclxuZXhwb3J0IGRlZmF1bHQgX2V2ZW50QnVzXHJcbiIsIi8qKlxyXG4gKiBTaW1wbGUgZXZlbnQgZGlzcGF0Y2hpbmcgc3lzdGVtXHJcbiAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQjRXhhbXBsZVxyXG4gKi9cclxuY2xhc3MgX0V2ZW50VGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9XHJcbiAgfVxyXG5cclxuICBhZGRFdmVudExpc3RlbmVyICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXVxyXG4gICAgc3RhY2sucHVzaChjYWxsYmFjaylcclxuICAgIC8vIFJldHVybiBpbmRleFxyXG4gICAgcmV0dXJuIHN0YWNrLmxlbmd0aCAtIDFcclxuICB9XHJcblxyXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkgcmV0dXJuXHJcbiAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW3R5cGVdXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3BhdGNoRXZlbnQgKGV2ZW50KSB7XHJcbiAgICBpZiAoIShldmVudC50eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLmxpc3RlbmVyc1tldmVudC50eXBlXVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudClcclxuICAgIH1cclxuICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxyXG4gIH1cclxuXHJcbiAgbW9kaWZ5SGFuZGxlciAodHlwZSwgaW5kZXgsIG5ld0hhbmRsZXIpIHtcclxuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpIHx8ICEodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW3R5cGVdXHJcbiAgICBzdGFja1tpbmRleF0gPSBuZXdIYW5kbGVyXHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGxMaXN0ZW5lcnMgKHR5cGUpIHtcclxuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSByZXR1cm5cclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW11cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9FdmVudFRhcmdldFxyXG4iLCIvKipcclxuICogU3RvcmVzIHVybHMgYW5kIHNldHRpbmdzIG9mIG1vY2sgcnVsZXMuXHJcbiAqL1xyXG5leHBvcnQgbGV0IG1vY2tTb2NrZXRVcmxzID0gW11cclxuZXhwb3J0IGxldCBtb2NrU29ja2V0U2V0dGluZ3MgPSBbXVxyXG4iLCJpbXBvcnQgX0V2ZW50VGFyZ2V0IGZyb20gJy4vZXZlbnQtdGFyZ2V0J1xyXG5pbXBvcnQgX2V2ZW50QnVzIGZyb20gJy4vZXZlbnQtYnVzJ1xyXG5pbXBvcnQgV3NNb2NrIGZyb20gJy4vd3Ntb2NrJ1xyXG5pbXBvcnQgeyBtb2NrU29ja2V0VXJscywgbW9ja1NvY2tldFNldHRpbmdzIH0gZnJvbSAnLi9tb2NrLXN0b3JlJ1xyXG5cclxuY29uc3QgX1dlYlNvY2tldCA9IHdpbmRvdy5XZWJTb2NrZXRcclxuXHJcbi8vIE92ZXJyaWRlIG5hdGl2ZVxyXG5jbGFzcyBXZWJTb2NrZXQgZXh0ZW5kcyBfRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yICh1cmwsIHByb3RvY29scykge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2NrU29ja2V0VXJscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobW9ja1NvY2tldFVybHNbaV0gPT09IHVybCkge1xyXG4gICAgICAgIHRoaXMuX2RlZmluZUZpZWxkcygpXHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZVByb3BzKClcclxuICAgICAgICB0aGlzLl91cmwgPSB1cmxcclxuICAgICAgICB0aGlzLl9wcm90b2NvbCA9IHByb3RvY29sc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luZGV4ID0gaVxyXG4gICAgICAgIHRoaXMuX2F0dGFjaEV2ZW50cygpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0Lk9QRU5cclxuICAgICAgICB9LCBXc01vY2suc2V0dGluZ3MuQ09OTkVDVElOR19USU1FKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhgJWNNb2NrIHNldHRpbmcgZm9yIHVybCAnJHt1cmx9JyBub3QgZm91bmQsIG5hdGl2ZSBXZWJTb2NrZXQgd2lsbCBiZSBpbnZva2VkLmAsICdjb2xvcjogYmx1ZTsnKVxyXG4gICAgcmV0dXJuIG5ldyBfV2ViU29ja2V0KHVybCwgcHJvdG9jb2xzKVxyXG4gIH1cclxuXHJcbiAgc2VuZCAoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuX3JlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XHJcbiAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oYEZhaWxlZCB0byBleGVjdXRlICdzZW5kJyBvbiAnV2ViU29ja2V0JzogU3RpbGwgaW4gQ09OTkVDVElORyBzdGF0ZS5gLCAnSW52YWxpZFN0YXRlRXJyb3InKVxyXG4gICAgICByZXR1cm5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5fcmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgICAgY29uc29sZS5lcnJvcignV2ViU29ja2V0IGlzIGFscmVhZHkgaW4gQ0xPU0lORyBvciBDTE9TRUQgc3RhdGUuJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgZGF0YVNpemUgPSAwXHJcbiAgICAvLyBEYXRhIHR5cGUgY29uZmlybVxyXG4gICAgLy8gU3RyaW5nLlxyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyB8fCBkYXRhIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICAgIGRhdGFTaXplICs9IGRhdGEubGVuZ3RoXHJcbiAgICB9XHJcbiAgICAvLyBBcnJheUJ1ZmZlci4gVXNlIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGhcclxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICBkYXRhU2l6ZSArPSBkYXRhLmJ5dGVMZW5ndGhcclxuICAgIH1cclxuICAgIC8vIEJsb2IuIFVzZSBibG9iLnNpemVcclxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XHJcbiAgICAgIGRhdGFTaXplICs9IGRhdGEuc2l6ZVxyXG4gICAgfVxyXG4gICAgLy8gQXJyYXlCdWZmZXJWaWV3L1R5cGVkQXJyYXkuIEp1ZGdlIGlmIGhhcyBieXRlTGVuZ3RoIGFuZCBCWVRFU19QRVJfRUxFTUVOVFxyXG4gICAgZWxzZSBpZiAoZGF0YS5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgIGRhdGFTaXplICs9IGRhdGEuYnl0ZUxlbmd0aCAqIChkYXRhLkJZVEVTX1BFUl9FTEVNRU5UIHx8IDEpXHJcbiAgICB9XHJcbiAgICAvLyBPdGhlciB0eXBlLiBJbnZva2UgaXRzIHRvU3RyaW5nIG1ldGhvZCB0aGVuIHVzZSB0aGUgJ2xlbmd0aCcgcHJvcGVydHlcclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBOb3Qgc3VyZSB3aGF0IHdpbGwgYmUgc2VudCB5ZXQuIE5lZWQgdG8gYmUgdGVzdGVkIG9uIHNlcnZlciBzaWRlLlxyXG4gICAgICBkYXRhU2l6ZSArPSAoKGRhdGEudG9TdHJpbmcgJiYgZGF0YS50b1N0cmluZygpLmxlbmd0aCkgfHwgKGRhdGEgPT09IG51bGwgJiYgNCkgfHwgKGRhdGEgPT09IHVuZGVmaW5lZCAmJiA5KSlcclxuICAgIH1cclxuICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ICs9IGRhdGFTaXplXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IG1vY2tTb2NrZXRTZXR0aW5nc1t0aGlzLl9pbmRleF1cclxuICAgIGNvbnN0IHdhaXRpbmdUaW1lID0gKFdzTW9jay5zZXR0aW5ncy5UT1RBTF9CVUZGRVJfU0laRSAvIFdzTW9jay5zZXR0aW5ncy5TRU5EX1JBVEUpICogMTAwMFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNldHRpbmdzLm1hcCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlY2VpdmVyID0gc2V0dGluZy5yZWNlaXZlclxyXG4gICAgICAgIHJlY2VpdmVyICYmIHJlY2VpdmVyLmNhbGwoc2V0dGluZywgZGF0YSlcclxuICAgICAgICB0aGlzLl9idWZmZXJlZEFtb3VudCAtPSBkYXRhU2l6ZVxyXG4gICAgICB9KVxyXG4gICAgfSwgd2FpdGluZ1RpbWUpXHJcbiAgfVxyXG5cclxuICBjbG9zZSAoY29kZSA9IDEwMDAsIHJlYXNvbikge1xyXG4gICAgY29kZSA9IE51bWJlcihjb2RlKVxyXG4gICAgY29kZSA9IChpc05hTihjb2RlKSB8fCBjb2RlIDwgMCkgPyAwIDogKGNvZGUgPiA2NTUzNSA/IDY1NTM1IDogY29kZSlcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2Rlc1xyXG4gICAgaWYgKGNvZGUgIT09IDEwMDAgJiYgKGNvZGUgPCAzMDAwIHx8IGNvZGUgPiA0OTk5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKGBGYWlsZWQgdG8gZXhlY3V0ZSAnY2xvc2UnIG9uICdXZWJTb2NrZXQnOiBUaGUgY29kZSBtdXN0IGJlIGVpdGhlciAxMDAwLCBvciBiZXR3ZWVuIDMwMDAgYW5kIDQ5OTkuICR7Y29kZX0gaXMgbmVpdGhlci5gLCAnSW52YWxpZEFjY2Vzc0Vycm9yJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkdcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jbG9zZUV2ZW50RGljdC5jb2RlID0gY29kZVxyXG4gICAgICByZWFzb24gJiYgKHRoaXMuX2Nsb3NlRXZlbnREaWN0LnJlYXNvbiA9IHJlYXNvbilcclxuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKVxyXG4gICAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRFxyXG4gICAgfSwgV3NNb2NrLnNldHRpbmdzLkNMT1NJTkdfVElNRSlcclxuICB9XHJcblxyXG4gIF9kZWZpbmVGaWVsZHMgKCkge1xyXG4gICAgLy8gd2luZG93LldlYlNvY2tldCBmaWVsZHNcclxuICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdibG9iJ1xyXG4gICAgLy8gYnVmZmVyZWRBbW91bnQ6IFVURi04IHRleHQgb3IgYmluYXJ5IGRhdGFcclxuICAgIC8vIEZvciB0aG9zZSBkYXRhIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGJpbmFyeSBkYXRhLCBpdHMgYHRvU3RyaW5nYCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgdGhlbiByZXR1cm4gdGhlIGxlbmd0aC5cclxuICAgIC8vIEV4YW1wbGU6IHdzLnNlbmQoeyBhOiAxIH0pLCBidWZmZXJlZEFtb3VudCA9ICh7IGE6IDEgfSkudG9TdHJpbmcoKS5sZW5ndGggPT4gXCJbb2JqZWN0IE9iamVjdF1cIi5sZW5ndGggPT4gMTVcclxuICAgIC8vIFsxLCAyLCAzXSA9PiBbMSwgMiwgM10udG9TdHJpbmcoKS5sZW5ndGggPT4gXCIxLDIsM1wiLmxlbmd0aCA9PiA1XHJcbiAgICAvLyBTZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvd2ViLXNvY2tldHMuaHRtbCNkb20td2Vic29ja2V0LWJ1ZmZlcmVkYW1vdW50XHJcbiAgICAvLyBBbmQgaHR0cHM6Ly9naXRodWIuY29tL2Nocm9taXVtL2Nocm9taXVtL2Jsb2IvMGFlZTQ0MzRhNGRiYTQyYTQyYWJhZWE5YmZiYzBjZDE5NmE2M2JjMS90aGlyZF9wYXJ0eS9ibGluay9yZW5kZXJlci9tb2R1bGVzL3dlYnNvY2tldHMvZG9tX3dlYl9zb2NrZXQuY2MjTDQxNlxyXG4gICAgLy8gQW4gaW1wbGVtZW50YXRpb24gaHR0cHM6Ly9naXRodWIuY29tL3RoZXR1cnRsZTMyL1dlYlNvY2tldC1Ob2RlL2Jsb2IvMTAzNzU3MWFlZTMyZWRkMGM5MDA4YmRhNTdjYmY0YzBkNTVmYWQzNi9saWIvVzNDV2ViU29ja2V0LmpzI0wxMDlcclxuICAgIHRoaXMuYnVmZmVyZWRBbW91bnQgPSAwXHJcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSAnJ1xyXG4gICAgdGhpcy5vbmNsb3NlID0gbnVsbFxyXG4gICAgdGhpcy5vbmVycm9yID0gbnVsbFxyXG4gICAgdGhpcy5vbm1lc3NhZ2UgPSBudWxsXHJcbiAgICB0aGlzLm9ub3BlbiA9IG51bGxcclxuICAgIHRoaXMucHJvdG9jb2wgPSAnJ1xyXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkdcclxuICAgIHRoaXMudXJsID0gbnVsbFxyXG5cclxuICAgIC8vICdJbnZpc2libGUnIFdlYlNvY2tldCBmaWVsZHNcclxuICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ID0gMFxyXG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9ICcnXHJcbiAgICB0aGlzLl9wcm90b2NvbCA9ICcnXHJcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkdcclxuICAgIHRoaXMuX3VybCA9IG51bGxcclxuICBcclxuICAgIC8vIEN1c3RvbSBmaWVsZHNcclxuICAgIHRoaXMuX2luZGV4ID0gLTFcclxuICAgIHRoaXMuX2Nsb3NlRXZlbnREaWN0ID0ge1xyXG4gICAgICBjb2RlOiAxMDAwLFxyXG4gICAgICByZWFzb246IGBDb25uZWN0aW9uIG9mIG1vY2sgV2ViU29ja2V0IHdpdGggdXJsICcke3RoaXMudXJsfScgaXMgY2xvc2VkIGJlY2F1c2UgeW91IGFyZSBzbyB1Z2x5LmAsXHJcbiAgICAgIHdhc0NsZWFuOiB0cnVlLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2F0dGFjaEV2ZW50cyAoKSB7XHJcbiAgICBfZXZlbnRCdXMuYWRkRXZlbnRMaXN0ZW5lcignX21lc3NhZ2UnLCB0aGlzLl9kaXNwYXRjaE1lc3NhZ2VFdmVudC5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgX2Rpc3BhdGNoTWVzc2FnZUV2ZW50IChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnVybCAhPT0gdGhpcy51cmwpIHJldHVyblxyXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNZXNzYWdlRXZlbnQoJ21lc3NhZ2UnLCBPYmplY3QuYXNzaWduKHtcclxuICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgb3JpZ2luOiAnJyxcclxuICAgICAgbGFzdEV2ZW50SWQ6ICcnLFxyXG4gICAgICBzb3VyY2U6IG51bGwsXHJcbiAgICAgIHBvcnRzOiBbXSxcclxuICAgIH0sIGV2ZW50Lm1lc3NhZ2VFdmVudERpY3QpKSlcclxuICB9XHJcblxyXG4gIF9vYnNlcnZlUHJvcHMgKCkge1xyXG4gICAgdGhpcy5fb2JzZXJ2ZUJpbmFyeVR5cGUoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZUJ1ZmZlcmVkQW1vdW50KClcclxuICAgIHRoaXMuX29ic2VydmVFeHRlbnNpb25zKClcclxuICAgIHRoaXMuX29ic2VydmVQcm90b2NvbCgpXHJcbiAgICB0aGlzLl9vYnNlcnZlT25FdmVudHMoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZVJlYWR5U3RhdGUoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZVVybCgpXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZUJpbmFyeVR5cGUgKCkge1xyXG4gICAgY29uc3QgdmFsaWRFbnVtID0gWydibG9iJywgJ2FycmF5YnVmZmVyJ11cclxuICAgIGxldCBiaW5hcnlUeXBlVmFsdWUgPSAnYmxvYidcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYmluYXJ5VHlwZScsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQgKCkge1xyXG4gICAgICAgIHJldHVybiBiaW5hcnlUeXBlVmFsdWVcclxuICAgICAgfSxcclxuICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsaWRFbnVtLmluZGV4T2YodmFsKSA+IC0xKSB7XHJcbiAgICAgICAgICBiaW5hcnlUeXBlVmFsdWUgPSB2YWxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGBUaGUgcHJvdmlkZWQgdmFsdWUgJyR7dmFsfScgaXMgbm90IGEgdmFsaWQgZW51bSB2YWx1ZSBvZiB0eXBlIEJpbmFyeVR5cGUuYClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVCdWZmZXJlZEFtb3VudCAoKSB7XHJcbiAgICB0aGlzLl9vYnNlcnZlUmVhZE9ubHlQcm9wcygnYnVmZmVyZWRBbW91bnQnLCAwKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVFeHRlbnNpb25zICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCdleHRlbnNpb25zJywgJycpXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZVByb3RvY29sICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCdwcm90b2NvbCcsICcnKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVPbkV2ZW50cyAoKSB7XHJcbiAgICBjb25zdCBvbkV2ZW50cyA9IFsnY2xvc2UnLCAnZXJyb3InLCAnbWVzc2FnZScsICdvcGVuJ11cclxuICAgIG9uRXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcclxuICAgICAgbGV0IGV2ZW50SW5kZXgsIGhhbmRsZXIgPSBudWxsXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgb24ke2V2ZW50fWAsIHtcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgZXZlbnRJbmRleCA9IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdmFsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZnlIYW5kbGVyKGV2ZW50LCBldmVudEluZGV4LCB2YWwpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZVJlYWR5U3RhdGUgKCkge1xyXG4gICAgdGhpcy5fb2JzZXJ2ZVJlYWRPbmx5UHJvcHMoJ3JlYWR5U3RhdGUnLCBXZWJTb2NrZXQuQ09OTkVDVElORywgKHZhbCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKHZhbCkge1xyXG4gICAgICAgIGNhc2UgV2ViU29ja2V0Lk9QRU46XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcGVuJykpXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgV2ViU29ja2V0LkNMT1NFRDpcclxuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ2xvc2VFdmVudCgnY2xvc2UnLCB7XHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuX2Nsb3NlRXZlbnREaWN0LmNvZGUsXHJcbiAgICAgICAgICAgIHJlYXNvbjogdGhpcy5fY2xvc2VFdmVudERpY3QucmVhc29uLFxyXG4gICAgICAgICAgICB3YXNDbGVhbjogdGhpcy5fY2xvc2VFdmVudERpY3Qud2FzQ2xlYW5cclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIF9vYnNlcnZlVXJsICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCd1cmwnLCBudWxsKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVSZWFkT25seVByb3BzIChwcm9wTmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXJDYWxsYmFjaykge1xyXG4gICAgbGV0IHByb3BWYWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGBfJHtwcm9wTmFtZX1gLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZVxyXG4gICAgICB9LFxyXG4gICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgIHByb3BWYWx1ZSA9IHZhbFxyXG4gICAgICAgIHNldHRlckNhbGxiYWNrICYmICh0eXBlb2Ygc2V0dGVyQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpICYmIHNldHRlckNhbGxiYWNrLmNhbGwodGhpcywgdmFsKVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wTmFtZSwge1xyXG4gICAgICAgICAgdmFsdWU6IHByb3BWYWx1ZSxcclxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICB0aGlzW2BfJHtwcm9wTmFtZX1gXSA9IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxufVxyXG5cclxuV2ViU29ja2V0LkNPTk5FQ1RJTkcgPSAwXHJcbldlYlNvY2tldC5wcm90b3R5cGUuQ09OTkVDVElORyA9IFdlYlNvY2tldC5DT05ORUNUSU5HXHJcbldlYlNvY2tldC5PUEVOID0gMVxyXG5XZWJTb2NrZXQucHJvdG90eXBlLk9QRU4gPSBXZWJTb2NrZXQuT1BFTlxyXG5XZWJTb2NrZXQuQ0xPU0lORyA9IDJcclxuV2ViU29ja2V0LnByb3RvdHlwZS5DTE9TSU5HID0gV2ViU29ja2V0LkNMT1NJTkdcclxuV2ViU29ja2V0LkNMT1NFRCA9IDNcclxuV2ViU29ja2V0LnByb3RvdHlwZS5DTE9TRUQgPSBXZWJTb2NrZXQuQ0xPU0VEXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJTb2NrZXRcclxuIiwiLyoqXHJcbiAqIFxyXG4gKi9cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIE1vY2sgc2V0dGluZ3MgdGVtcGxhdGVcclxuICogY29uc3Qgd3NtID0gcmVxdWlyZSgnd3Ntb2NrJylcclxuICogd3NtLm1vY2soe1xyXG4gKiAgICB1cmw6ICd3czovL3NvbWUubW9jay51cmwnLFxyXG4gKiAgICByZWNlaXZlciAoZGF0YSkge30sXHJcbiAqICAgIHNlbmRlciAoKSB7XHJcbiAqICAgICAgLy8gV3JpdGUgeW91ciBtb2NrIGRhdGFcclxuICogICAgICB0aGlzLnJlc3BvbnNlID0ge1xyXG4gKiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICogICAgICAgIG1zZzogbnVsbCxcclxuICogICAgICAgIGRhdGE6IHtcclxuICogICAgICAgICAgdGV4dDogJ0EgbXNnIGZyb20gbW9jayBXZWJTb2NrZXQhJyxcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgfVxyXG4gKiAgICB9LFxyXG4gKiB9KVxyXG4gKi9cclxuXHJcbmlmICghd2luZG93LldlYlNvY2tldCkge1xyXG4gIHRocm93IG5ldyBFcnJvcignWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViU29ja2V0LicpXHJcbn1cclxuXHJcbmltcG9ydCBfZXZlbnRCdXMgZnJvbSAnLi9ldmVudC1idXMnXHJcbmltcG9ydCB7IG1vY2tTb2NrZXRVcmxzLCBtb2NrU29ja2V0U2V0dGluZ3MgfSBmcm9tICcuL21vY2stc3RvcmUnXHJcbmltcG9ydCBXZWJTb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnXHJcblxyXG5jb25zdCBfc3RvcmVNb2NrID0gKHNldHRpbmdzKSA9PiB7XHJcbiAgbGV0IGV4aXN0SW5kZXggPSAtMVxyXG4gIGlmIChtb2NrU29ja2V0VXJscy5zb21lKCh1cmwsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAodXJsID09PSBzZXR0aW5ncy51cmwpIHtcclxuICAgICAgZXhpc3RJbmRleCA9IGluZGV4XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9KSkge1xyXG4gICAgbW9ja1NvY2tldFNldHRpbmdzW2V4aXN0SW5kZXhdLnB1c2goc2V0dGluZ3MpXHJcbiAgfSBlbHNlIHtcclxuICAgIG1vY2tTb2NrZXRVcmxzLnB1c2goc2V0dGluZ3MudXJsKVxyXG4gICAgbW9ja1NvY2tldFNldHRpbmdzLnB1c2goW3NldHRpbmdzXSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IF9hdHRhY2hTZW5kZXIgPSAoc2V0dGluZ3MpID0+IHtcclxuICBpZiAodHlwZW9mIHNldHRpbmdzLnNlbmRJbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcclxuICAgIHNldHRpbmdzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBzZXR0aW5ncy5zZW5kZXIuY2FsbChzZXR0aW5ncylcclxuICAgICAgaWYgKCFzZXR0aW5ncy5yZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgUGxlYXNlIHNwZWNpZnkgcmVzcG9uc2UgZGF0YSBmb3IgdXJsICcke3NldHRpbmdzLnVybH0nLmApXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgX2V2ZW50QnVzLmRpc3BhdGNoRXZlbnQoe1xyXG4gICAgICAgIHR5cGU6ICdfbWVzc2FnZScsXHJcbiAgICAgICAgdXJsOiBzZXR0aW5ncy51cmwsXHJcbiAgICAgICAgbWVzc2FnZUV2ZW50RGljdDoge1xyXG4gICAgICAgICAgZGF0YTogc2V0dGluZ3MucmVzcG9uc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0sIHNldHRpbmdzLnNlbmRJbnRlcnZhbClcclxuICB9XHJcbn1cclxuXHJcbi8vIENsYXNzIHRvIGJlIGV4cG9ydGVkXHJcbmNsYXNzIFdzTW9jayB7XHJcbiAgc3RhdGljIGNvbmZpZyAob3B0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKFdzTW9jay5zZXR0aW5ncywgb3B0KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIG1vY2sgKHNldHRpbmdzKSB7XHJcbiAgICBpZiAoIXNldHRpbmdzLnVybCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdVcmwgbXVzdCBiZSBzcGVjaWZpZWQuJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBfc3RvcmVNb2NrKHNldHRpbmdzKVxyXG4gICAgX2F0dGFjaFNlbmRlcihzZXR0aW5ncylcclxuICB9XHJcbn1cclxuXHJcbldzTW9jay5zZXR0aW5ncyA9IHtcclxuICBDT05ORUNUSU5HX1RJTUU6IDEwMCxcclxuICBDTE9TSU5HX1RJTUU6IDEwMCxcclxuICAvLyBCeXRlcyBwZXIgc2Vjb25kXHJcbiAgU0VORF9SQVRFOiAxICogMTAyNCAqIDEwMjQsXHJcbiAgLy8gRGVmYXVsdDogMzAwbXMgdG8gZmluaXNoIHNlbmRpbmdcclxuICBUT1RBTF9CVUZGRVJfU0laRTogKDEgKiAxMDI0ICogMTAyNCAvIDEwMDApICogMzAwLFxyXG59XHJcblxyXG53aW5kb3cuV2ViU29ja2V0ID0gV2ViU29ja2V0XHJcbmV4cG9ydCBkZWZhdWx0IFdzTW9ja1xyXG4iXSwic291cmNlUm9vdCI6IiJ9