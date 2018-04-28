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
      if (this._readyState === WebSocket.CONNECTING) {
        throw new DOMException('Failed to execute \'send\' on \'WebSocket\': Still in CONNECTING state.', 'InvalidStateError');
        return;
      } else if (this._readyState !== WebSocket.OPEN) {
        console.error('WebSocket is already in CLOSING or CLOSED state.');
        return;
      }
      var settings = _mockStore.mockSocketSettings[this._index];
      var waitingTime = _wsmock2.default.settings.TOTAL_BUFFER_SIZE / _wsmock2.default.settings.SEND_RATE * 1000;
      setTimeout(function () {
        settings.map(function (setting) {
          var receiver = setting.receiver;
          receiver && receiver.call(setting, data);
        });
      }, waitingTime);
    }
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

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
        _this2._closeEventDict.code = code;
        reason && (_this2._closeEventDict.reason = reason);
        _this2.removeAllListeners('message');
        _this2._readyState = WebSocket.CLOSED;
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
      var _this3 = this;

      var onEvents = ['close', 'error', 'message', 'open'];
      onEvents.map(function (event) {
        var eventIndex = void 0,
            handler = null;
        Object.defineProperty(_this3, 'on' + event, {
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
      var _this4 = this;

      this._observeReadOnlyProps('readyState', WebSocket.CONNECTING, function (val) {
        switch (val) {
          case WebSocket.OPEN:
            _this4.dispatchEvent(new CustomEvent('open'));
            break;
          case WebSocket.CLOSED:
            _this4.dispatchEvent(new CloseEvent('close', {
              code: _this4._closeEventDict.code,
              reason: _this4._closeEventDict.reason,
              wasClean: _this4._closeEventDict.wasClean
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Xc01vY2svd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1dzTW9jay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Xc01vY2svLi9zcmMvZXZlbnQtYnVzLmpzIiwid2VicGFjazovL1dzTW9jay8uL3NyYy9ldmVudC10YXJnZXQuanMiLCJ3ZWJwYWNrOi8vV3NNb2NrLy4vc3JjL21vY2stc3RvcmUuanMiLCJ3ZWJwYWNrOi8vV3NNb2NrLy4vc3JjL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly9Xc01vY2svLi9zcmMvd3Ntb2NrLmpzIl0sIm5hbWVzIjpbIl9ldmVudEJ1cyIsIl9FdmVudFRhcmdldCIsImxpc3RlbmVycyIsInR5cGUiLCJjYWxsYmFjayIsInN0YWNrIiwicHVzaCIsImxlbmd0aCIsImkiLCJsIiwic3BsaWNlIiwiZXZlbnQiLCJjYWxsIiwiZGVmYXVsdFByZXZlbnRlZCIsImluZGV4IiwibmV3SGFuZGxlciIsIm1vY2tTb2NrZXRVcmxzIiwibW9ja1NvY2tldFNldHRpbmdzIiwiX1dlYlNvY2tldCIsIndpbmRvdyIsIldlYlNvY2tldCIsInVybCIsInByb3RvY29scyIsIl9kZWZpbmVGaWVsZHMiLCJfb2JzZXJ2ZVByb3BzIiwiX3VybCIsIl9wcm90b2NvbCIsIl9pbmRleCIsIl9hdHRhY2hFdmVudHMiLCJzZXRUaW1lb3V0IiwiX3JlYWR5U3RhdGUiLCJPUEVOIiwiV3NNb2NrIiwic2V0dGluZ3MiLCJDT05ORUNUSU5HX1RJTUUiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIkNPTk5FQ1RJTkciLCJET01FeGNlcHRpb24iLCJlcnJvciIsIndhaXRpbmdUaW1lIiwiVE9UQUxfQlVGRkVSX1NJWkUiLCJTRU5EX1JBVEUiLCJtYXAiLCJzZXR0aW5nIiwicmVjZWl2ZXIiLCJjb2RlIiwicmVhc29uIiwiTnVtYmVyIiwiaXNOYU4iLCJDTE9TSU5HIiwiX2Nsb3NlRXZlbnREaWN0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiQ0xPU0VEIiwiQ0xPU0lOR19USU1FIiwiYmluYXJ5VHlwZSIsImJ1ZmZlcmVkQW1vdW50IiwiZXh0ZW5zaW9ucyIsIm9uY2xvc2UiLCJvbmVycm9yIiwib25tZXNzYWdlIiwib25vcGVuIiwicHJvdG9jb2wiLCJyZWFkeVN0YXRlIiwiX2J1ZmZlcmVkQW1vdW50IiwiX2V4dGVuc2lvbnMiLCJ3YXNDbGVhbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGlzcGF0Y2hNZXNzYWdlRXZlbnQiLCJiaW5kIiwiZGlzcGF0Y2hFdmVudCIsIk1lc3NhZ2VFdmVudCIsIk9iamVjdCIsImFzc2lnbiIsIm9yaWdpbiIsImxhc3RFdmVudElkIiwic291cmNlIiwicG9ydHMiLCJtZXNzYWdlRXZlbnREaWN0IiwiX29ic2VydmVCaW5hcnlUeXBlIiwiX29ic2VydmVCdWZmZXJlZEFtb3VudCIsIl9vYnNlcnZlRXh0ZW5zaW9ucyIsIl9vYnNlcnZlUHJvdG9jb2wiLCJfb2JzZXJ2ZU9uRXZlbnRzIiwiX29ic2VydmVSZWFkeVN0YXRlIiwiX29ic2VydmVVcmwiLCJ2YWxpZEVudW0iLCJiaW5hcnlUeXBlVmFsdWUiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJ2YWwiLCJpbmRleE9mIiwid2FybiIsIl9vYnNlcnZlUmVhZE9ubHlQcm9wcyIsIm9uRXZlbnRzIiwiZXZlbnRJbmRleCIsImhhbmRsZXIiLCJtb2RpZnlIYW5kbGVyIiwiQ3VzdG9tRXZlbnQiLCJDbG9zZUV2ZW50IiwicHJvcE5hbWUiLCJkZWZhdWx0VmFsdWUiLCJzZXR0ZXJDYWxsYmFjayIsInByb3BWYWx1ZSIsInZhbHVlIiwid3JpdGFibGUiLCJwcm90b3R5cGUiLCJFcnJvciIsIl9zdG9yZU1vY2siLCJleGlzdEluZGV4Iiwic29tZSIsIl9hdHRhY2hTZW5kZXIiLCJzZW5kSW50ZXJ2YWwiLCJfaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwic2VuZGVyIiwi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QjtBQU9ELEtBYnNCLEVBYXBCdkYsU0FBU21GLFlBYlcsQ0FBdkI7QUFjRDtBQUNGLENBakJEOztBQW1CQTs7SUFDTXBGLE07Ozs7Ozs7MkJBQ1d5RixHLEVBQUs7QUFDbEJoRCxhQUFPQyxNQUFQLENBQWMxQyxPQUFPQyxRQUFyQixFQUErQndGLEdBQS9CO0FBQ0Q7Ozt5QkFFWXhGLFEsRUFBVTtBQUNyQixVQUFJLENBQUNBLFNBQVNaLEdBQWQsRUFBbUI7QUFDakJjLGdCQUFRSyxLQUFSLENBQWMsd0JBQWQ7QUFDQTtBQUNEO0FBQ0R3RSxpQkFBVy9FLFFBQVg7QUFDQWtGLG9CQUFjbEYsUUFBZDtBQUNEOzs7Ozs7QUFHSEQsT0FBT0MsUUFBUCxHQUFrQjtBQUNoQkMsbUJBQWlCLEdBREQ7QUFFaEJxQixnQkFBYyxHQUZFO0FBR2hCO0FBQ0FaLGFBQVcsSUFBSSxJQUFKLEdBQVcsSUFKTjtBQUtoQjtBQUNBRCxxQkFBb0IsSUFBSSxJQUFKLEdBQVcsSUFBWCxHQUFrQixJQUFuQixHQUEyQjtBQU45QixDQUFsQjs7QUFTQXZCLE9BQU9DLFNBQVAsR0FBbUJBLG1CQUFuQjtrQkFDZVksTSIsImZpbGUiOiJ3c21vY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJXc01vY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiV3NNb2NrXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd3Ntb2NrLmpzXCIpO1xuIiwiLyoqXHJcbiAqIEV2ZW50IGJ1cy5cclxuICovXHJcbmltcG9ydCBfRXZlbnRUYXJnZXQgZnJvbSAnLi9ldmVudC10YXJnZXQnXHJcbmNvbnN0IF9ldmVudEJ1cyA9IG5ldyBfRXZlbnRUYXJnZXQoKVxyXG5leHBvcnQgZGVmYXVsdCBfZXZlbnRCdXNcclxuIiwiLyoqXHJcbiAqIFNpbXBsZSBldmVudCBkaXNwYXRjaGluZyBzeXN0ZW1cclxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldCNFeGFtcGxlXHJcbiAqL1xyXG5jbGFzcyBfRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzID0ge31cclxuICB9XHJcblxyXG4gIGFkZEV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW3R5cGVdXHJcbiAgICBzdGFjay5wdXNoKGNhbGxiYWNrKVxyXG4gICAgLy8gUmV0dXJuIGluZGV4XHJcbiAgICByZXR1cm4gc3RhY2subGVuZ3RoIC0gMVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSByZXR1cm5cclxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5saXN0ZW5lcnNbdHlwZV1cclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcclxuICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW2V2ZW50LnR5cGVdXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBzdGFja1tpXS5jYWxsKHRoaXMsIGV2ZW50KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkXHJcbiAgfVxyXG5cclxuICBtb2RpZnlIYW5kbGVyICh0eXBlLCBpbmRleCwgbmV3SGFuZGxlcikge1xyXG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykgfHwgISh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5saXN0ZW5lcnNbdHlwZV1cclxuICAgIHN0YWNrW2luZGV4XSA9IG5ld0hhbmRsZXJcclxuICB9XHJcblxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyAodHlwZSkge1xyXG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHJldHVyblxyXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgX0V2ZW50VGFyZ2V0XHJcbiIsIi8qKlxyXG4gKiBTdG9yZXMgdXJscyBhbmQgc2V0dGluZ3Mgb2YgbW9jayBydWxlcy5cclxuICovXHJcbmV4cG9ydCBsZXQgbW9ja1NvY2tldFVybHMgPSBbXVxyXG5leHBvcnQgbGV0IG1vY2tTb2NrZXRTZXR0aW5ncyA9IFtdXHJcbiIsImltcG9ydCBfRXZlbnRUYXJnZXQgZnJvbSAnLi9ldmVudC10YXJnZXQnXHJcbmltcG9ydCBfZXZlbnRCdXMgZnJvbSAnLi9ldmVudC1idXMnXHJcbmltcG9ydCBXc01vY2sgZnJvbSAnLi93c21vY2snXHJcbmltcG9ydCB7IG1vY2tTb2NrZXRVcmxzLCBtb2NrU29ja2V0U2V0dGluZ3MgfSBmcm9tICcuL21vY2stc3RvcmUnXHJcblxyXG5jb25zdCBfV2ViU29ja2V0ID0gd2luZG93LldlYlNvY2tldFxyXG5cclxuLy8gT3ZlcnJpZGUgbmF0aXZlXHJcbmNsYXNzIFdlYlNvY2tldCBleHRlbmRzIF9FdmVudFRhcmdldCB7XHJcbiAgY29uc3RydWN0b3IgKHVybCwgcHJvdG9jb2xzKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vY2tTb2NrZXRVcmxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChtb2NrU29ja2V0VXJsc1tpXSA9PT0gdXJsKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5lRmllbGRzKClcclxuICAgICAgICB0aGlzLl9vYnNlcnZlUHJvcHMoKVxyXG4gICAgICAgIHRoaXMuX3VybCA9IHVybFxyXG4gICAgICAgIHRoaXMuX3Byb3RvY29sID0gcHJvdG9jb2xzXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5kZXggPSBpXHJcbiAgICAgICAgdGhpcy5fYXR0YWNoRXZlbnRzKClcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuT1BFTlxyXG4gICAgICAgIH0sIFdzTW9jay5zZXR0aW5ncy5DT05ORUNUSU5HX1RJTUUpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAlY01vY2sgc2V0dGluZyBmb3IgdXJsICcke3VybH0nIG5vdCBmb3VuZCwgbmF0aXZlIFdlYlNvY2tldCB3aWxsIGJlIGludm9rZWQuYCwgJ2NvbG9yOiBibHVlOycpXHJcbiAgICByZXR1cm4gbmV3IF9XZWJTb2NrZXQodXJsLCBwcm90b2NvbHMpXHJcbiAgfVxyXG5cclxuICBzZW5kIChkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5fcmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcclxuICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihgRmFpbGVkIHRvIGV4ZWN1dGUgJ3NlbmQnIG9uICdXZWJTb2NrZXQnOiBTdGlsbCBpbiBDT05ORUNUSU5HIHN0YXRlLmAsICdJbnZhbGlkU3RhdGVFcnJvcicpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdXZWJTb2NrZXQgaXMgYWxyZWFkeSBpbiBDTE9TSU5HIG9yIENMT1NFRCBzdGF0ZS4nKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHNldHRpbmdzID0gbW9ja1NvY2tldFNldHRpbmdzW3RoaXMuX2luZGV4XVxyXG4gICAgY29uc3Qgd2FpdGluZ1RpbWUgPSAoV3NNb2NrLnNldHRpbmdzLlRPVEFMX0JVRkZFUl9TSVpFIC8gV3NNb2NrLnNldHRpbmdzLlNFTkRfUkFURSkgKiAxMDAwXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2V0dGluZ3MubWFwKChzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVjZWl2ZXIgPSBzZXR0aW5nLnJlY2VpdmVyXHJcbiAgICAgICAgcmVjZWl2ZXIgJiYgcmVjZWl2ZXIuY2FsbChzZXR0aW5nLCBkYXRhKVxyXG4gICAgICB9KVxyXG4gICAgfSwgd2FpdGluZ1RpbWUpXHJcbiAgfVxyXG5cclxuICBjbG9zZSAoY29kZSA9IDEwMDAsIHJlYXNvbikge1xyXG4gICAgY29kZSA9IE51bWJlcihjb2RlKVxyXG4gICAgY29kZSA9IChpc05hTihjb2RlKSB8fCBjb2RlIDwgMCkgPyAwIDogKGNvZGUgPiA2NTUzNSA/IDY1NTM1IDogY29kZSlcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2Rlc1xyXG4gICAgaWYgKGNvZGUgIT09IDEwMDAgJiYgKGNvZGUgPCAzMDAwIHx8IGNvZGUgPiA0OTk5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKGBGYWlsZWQgdG8gZXhlY3V0ZSAnY2xvc2UnIG9uICdXZWJTb2NrZXQnOiBUaGUgY29kZSBtdXN0IGJlIGVpdGhlciAxMDAwLCBvciBiZXR3ZWVuIDMwMDAgYW5kIDQ5OTkuICR7Y29kZX0gaXMgbmVpdGhlci5gLCAnSW52YWxpZEFjY2Vzc0Vycm9yJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkdcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jbG9zZUV2ZW50RGljdC5jb2RlID0gY29kZVxyXG4gICAgICByZWFzb24gJiYgKHRoaXMuX2Nsb3NlRXZlbnREaWN0LnJlYXNvbiA9IHJlYXNvbilcclxuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKVxyXG4gICAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRFxyXG4gICAgfSwgV3NNb2NrLnNldHRpbmdzLkNMT1NJTkdfVElNRSlcclxuICB9XHJcblxyXG4gIF9kZWZpbmVGaWVsZHMgKCkge1xyXG4gICAgLy8gd2luZG93LldlYlNvY2tldCBmaWVsZHNcclxuICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdibG9iJ1xyXG4gICAgLy8gYnVmZmVyZWRBbW91bnQ6IFVURi04IHRleHQgb3IgYmluYXJ5IGRhdGFcclxuICAgIC8vIEZvciB0aG9zZSBkYXRhIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGJpbmFyeSBkYXRhLCBpdHMgYHRvU3RyaW5nYCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgdGhlbiByZXR1cm4gdGhlIGxlbmd0aC5cclxuICAgIC8vIEV4YW1wbGU6IHdzLnNlbmQoeyBhOiAxIH0pLCBidWZmZXJlZEFtb3VudCA9ICh7IGE6IDEgfSkudG9TdHJpbmcoKS5sZW5ndGggPT4gXCJbb2JqZWN0IE9iamVjdF1cIi5sZW5ndGggPT4gMTVcclxuICAgIC8vIFsxLCAyLCAzXSA9PiBbMSwgMiwgM10udG9TdHJpbmcoKS5sZW5ndGggPT4gXCIxLDIsM1wiLmxlbmd0aCA9PiA1XHJcbiAgICAvLyBTZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvd2ViLXNvY2tldHMuaHRtbCNkb20td2Vic29ja2V0LWJ1ZmZlcmVkYW1vdW50XHJcbiAgICAvLyBBbmQgaHR0cHM6Ly9naXRodWIuY29tL2Nocm9taXVtL2Nocm9taXVtL2Jsb2IvMGFlZTQ0MzRhNGRiYTQyYTQyYWJhZWE5YmZiYzBjZDE5NmE2M2JjMS90aGlyZF9wYXJ0eS9ibGluay9yZW5kZXJlci9tb2R1bGVzL3dlYnNvY2tldHMvZG9tX3dlYl9zb2NrZXQuY2MjTDQxNlxyXG4gICAgLy8gQW4gaW1wbGVtZW50YXRpb24gaHR0cHM6Ly9naXRodWIuY29tL3RoZXR1cnRsZTMyL1dlYlNvY2tldC1Ob2RlL2Jsb2IvMTAzNzU3MWFlZTMyZWRkMGM5MDA4YmRhNTdjYmY0YzBkNTVmYWQzNi9saWIvVzNDV2ViU29ja2V0LmpzI0wxMDlcclxuICAgIHRoaXMuYnVmZmVyZWRBbW91bnQgPSAwXHJcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSAnJ1xyXG4gICAgdGhpcy5vbmNsb3NlID0gbnVsbFxyXG4gICAgdGhpcy5vbmVycm9yID0gbnVsbFxyXG4gICAgdGhpcy5vbm1lc3NhZ2UgPSBudWxsXHJcbiAgICB0aGlzLm9ub3BlbiA9IG51bGxcclxuICAgIHRoaXMucHJvdG9jb2wgPSAnJ1xyXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkdcclxuICAgIHRoaXMudXJsID0gbnVsbFxyXG5cclxuICAgIC8vICdJbnZpc2libGUnIFdlYlNvY2tldCBmaWVsZHNcclxuICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ID0gMFxyXG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9ICcnXHJcbiAgICB0aGlzLl9wcm90b2NvbCA9ICcnXHJcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkdcclxuICAgIHRoaXMuX3VybCA9IG51bGxcclxuICBcclxuICAgIC8vIEN1c3RvbSBmaWVsZHNcclxuICAgIHRoaXMuX2luZGV4ID0gLTFcclxuICAgIHRoaXMuX2Nsb3NlRXZlbnREaWN0ID0ge1xyXG4gICAgICBjb2RlOiAxMDAwLFxyXG4gICAgICByZWFzb246IGBDb25uZWN0aW9uIG9mIG1vY2sgV2ViU29ja2V0IHdpdGggdXJsICcke3RoaXMudXJsfScgaXMgY2xvc2VkIGJlY2F1c2UgeW91IGFyZSBzbyB1Z2x5LmAsXHJcbiAgICAgIHdhc0NsZWFuOiB0cnVlLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2F0dGFjaEV2ZW50cyAoKSB7XHJcbiAgICBfZXZlbnRCdXMuYWRkRXZlbnRMaXN0ZW5lcignX21lc3NhZ2UnLCB0aGlzLl9kaXNwYXRjaE1lc3NhZ2VFdmVudC5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgX2Rpc3BhdGNoTWVzc2FnZUV2ZW50IChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnVybCAhPT0gdGhpcy51cmwpIHJldHVyblxyXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNZXNzYWdlRXZlbnQoJ21lc3NhZ2UnLCBPYmplY3QuYXNzaWduKHtcclxuICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgb3JpZ2luOiAnJyxcclxuICAgICAgbGFzdEV2ZW50SWQ6ICcnLFxyXG4gICAgICBzb3VyY2U6IG51bGwsXHJcbiAgICAgIHBvcnRzOiBbXSxcclxuICAgIH0sIGV2ZW50Lm1lc3NhZ2VFdmVudERpY3QpKSlcclxuICB9XHJcblxyXG4gIF9vYnNlcnZlUHJvcHMgKCkge1xyXG4gICAgdGhpcy5fb2JzZXJ2ZUJpbmFyeVR5cGUoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZUJ1ZmZlcmVkQW1vdW50KClcclxuICAgIHRoaXMuX29ic2VydmVFeHRlbnNpb25zKClcclxuICAgIHRoaXMuX29ic2VydmVQcm90b2NvbCgpXHJcbiAgICB0aGlzLl9vYnNlcnZlT25FdmVudHMoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZVJlYWR5U3RhdGUoKVxyXG4gICAgdGhpcy5fb2JzZXJ2ZVVybCgpXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZUJpbmFyeVR5cGUgKCkge1xyXG4gICAgY29uc3QgdmFsaWRFbnVtID0gWydibG9iJywgJ2FycmF5YnVmZmVyJ11cclxuICAgIGxldCBiaW5hcnlUeXBlVmFsdWUgPSAnYmxvYidcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYmluYXJ5VHlwZScsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQgKCkge1xyXG4gICAgICAgIHJldHVybiBiaW5hcnlUeXBlVmFsdWVcclxuICAgICAgfSxcclxuICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsaWRFbnVtLmluZGV4T2YodmFsKSA+IC0xKSB7XHJcbiAgICAgICAgICBiaW5hcnlUeXBlVmFsdWUgPSB2YWxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGBUaGUgcHJvdmlkZWQgdmFsdWUgJyR7dmFsfScgaXMgbm90IGEgdmFsaWQgZW51bSB2YWx1ZSBvZiB0eXBlIEJpbmFyeVR5cGUuYClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVCdWZmZXJlZEFtb3VudCAoKSB7XHJcbiAgICB0aGlzLl9vYnNlcnZlUmVhZE9ubHlQcm9wcygnYnVmZmVyZWRBbW91bnQnLCAwKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVFeHRlbnNpb25zICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCdleHRlbnNpb25zJywgJycpXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZVByb3RvY29sICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCdwcm90b2NvbCcsICcnKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVPbkV2ZW50cyAoKSB7XHJcbiAgICBjb25zdCBvbkV2ZW50cyA9IFsnY2xvc2UnLCAnZXJyb3InLCAnbWVzc2FnZScsICdvcGVuJ11cclxuICAgIG9uRXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcclxuICAgICAgbGV0IGV2ZW50SW5kZXgsIGhhbmRsZXIgPSBudWxsXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBgb24ke2V2ZW50fWAsIHtcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgZXZlbnRJbmRleCA9IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdmFsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZnlIYW5kbGVyKGV2ZW50LCBldmVudEluZGV4LCB2YWwpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBfb2JzZXJ2ZVJlYWR5U3RhdGUgKCkge1xyXG4gICAgdGhpcy5fb2JzZXJ2ZVJlYWRPbmx5UHJvcHMoJ3JlYWR5U3RhdGUnLCBXZWJTb2NrZXQuQ09OTkVDVElORywgKHZhbCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKHZhbCkge1xyXG4gICAgICAgIGNhc2UgV2ViU29ja2V0Lk9QRU46XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcGVuJykpXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgV2ViU29ja2V0LkNMT1NFRDpcclxuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ2xvc2VFdmVudCgnY2xvc2UnLCB7XHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuX2Nsb3NlRXZlbnREaWN0LmNvZGUsXHJcbiAgICAgICAgICAgIHJlYXNvbjogdGhpcy5fY2xvc2VFdmVudERpY3QucmVhc29uLFxyXG4gICAgICAgICAgICB3YXNDbGVhbjogdGhpcy5fY2xvc2VFdmVudERpY3Qud2FzQ2xlYW5cclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIF9vYnNlcnZlVXJsICgpIHtcclxuICAgIHRoaXMuX29ic2VydmVSZWFkT25seVByb3BzKCd1cmwnLCBudWxsKVxyXG4gIH1cclxuXHJcbiAgX29ic2VydmVSZWFkT25seVByb3BzIChwcm9wTmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXJDYWxsYmFjaykge1xyXG4gICAgbGV0IHByb3BWYWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGBfJHtwcm9wTmFtZX1gLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZVxyXG4gICAgICB9LFxyXG4gICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgIHByb3BWYWx1ZSA9IHZhbFxyXG4gICAgICAgIHNldHRlckNhbGxiYWNrICYmICh0eXBlb2Ygc2V0dGVyQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpICYmIHNldHRlckNhbGxiYWNrLmNhbGwodGhpcywgdmFsKVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wTmFtZSwge1xyXG4gICAgICAgICAgdmFsdWU6IHByb3BWYWx1ZSxcclxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICB0aGlzW2BfJHtwcm9wTmFtZX1gXSA9IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxufVxyXG5cclxuV2ViU29ja2V0LkNPTk5FQ1RJTkcgPSAwXHJcbldlYlNvY2tldC5wcm90b3R5cGUuQ09OTkVDVElORyA9IFdlYlNvY2tldC5DT05ORUNUSU5HXHJcbldlYlNvY2tldC5PUEVOID0gMVxyXG5XZWJTb2NrZXQucHJvdG90eXBlLk9QRU4gPSBXZWJTb2NrZXQuT1BFTlxyXG5XZWJTb2NrZXQuQ0xPU0lORyA9IDJcclxuV2ViU29ja2V0LnByb3RvdHlwZS5DTE9TSU5HID0gV2ViU29ja2V0LkNMT1NJTkdcclxuV2ViU29ja2V0LkNMT1NFRCA9IDNcclxuV2ViU29ja2V0LnByb3RvdHlwZS5DTE9TRUQgPSBXZWJTb2NrZXQuQ0xPU0VEXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJTb2NrZXRcclxuIiwiLyoqXHJcbiAqIFxyXG4gKi9cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIE1vY2sgc2V0dGluZ3MgdGVtcGxhdGVcclxuICogY29uc3Qgd3NtID0gcmVxdWlyZSgnd3Ntb2NrJylcclxuICogd3NtLm1vY2soe1xyXG4gKiAgICB1cmw6ICd3czovL3NvbWUubW9jay51cmwnLFxyXG4gKiAgICByZWNlaXZlciAoZGF0YSkge30sXHJcbiAqICAgIHNlbmRlciAoKSB7XHJcbiAqICAgICAgLy8gV3JpdGUgeW91ciBtb2NrIGRhdGFcclxuICogICAgICB0aGlzLnJlc3BvbnNlID0ge1xyXG4gKiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICogICAgICAgIG1zZzogbnVsbCxcclxuICogICAgICAgIGRhdGE6IHtcclxuICogICAgICAgICAgdGV4dDogJ0EgbXNnIGZyb20gbW9jayBXZWJTb2NrZXQhJyxcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgfVxyXG4gKiAgICB9LFxyXG4gKiB9KVxyXG4gKi9cclxuXHJcbmlmICghd2luZG93LldlYlNvY2tldCkge1xyXG4gIHRocm93IG5ldyBFcnJvcignWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViU29ja2V0LicpXHJcbn1cclxuXHJcbmltcG9ydCBfZXZlbnRCdXMgZnJvbSAnLi9ldmVudC1idXMnXHJcbmltcG9ydCB7IG1vY2tTb2NrZXRVcmxzLCBtb2NrU29ja2V0U2V0dGluZ3MgfSBmcm9tICcuL21vY2stc3RvcmUnXHJcbmltcG9ydCBXZWJTb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnXHJcblxyXG5jb25zdCBfc3RvcmVNb2NrID0gKHNldHRpbmdzKSA9PiB7XHJcbiAgbGV0IGV4aXN0SW5kZXggPSAtMVxyXG4gIGlmIChtb2NrU29ja2V0VXJscy5zb21lKCh1cmwsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAodXJsID09PSBzZXR0aW5ncy51cmwpIHtcclxuICAgICAgZXhpc3RJbmRleCA9IGluZGV4XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9KSkge1xyXG4gICAgbW9ja1NvY2tldFNldHRpbmdzW2V4aXN0SW5kZXhdLnB1c2goc2V0dGluZ3MpXHJcbiAgfSBlbHNlIHtcclxuICAgIG1vY2tTb2NrZXRVcmxzLnB1c2goc2V0dGluZ3MudXJsKVxyXG4gICAgbW9ja1NvY2tldFNldHRpbmdzLnB1c2goW3NldHRpbmdzXSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IF9hdHRhY2hTZW5kZXIgPSAoc2V0dGluZ3MpID0+IHtcclxuICBpZiAodHlwZW9mIHNldHRpbmdzLnNlbmRJbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcclxuICAgIHNldHRpbmdzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBzZXR0aW5ncy5zZW5kZXIuY2FsbChzZXR0aW5ncylcclxuICAgICAgaWYgKCFzZXR0aW5ncy5yZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgUGxlYXNlIHNwZWNpZnkgcmVzcG9uc2UgZGF0YSBmb3IgdXJsICcke3NldHRpbmdzLnVybH0nLmApXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgX2V2ZW50QnVzLmRpc3BhdGNoRXZlbnQoe1xyXG4gICAgICAgIHR5cGU6ICdfbWVzc2FnZScsXHJcbiAgICAgICAgdXJsOiBzZXR0aW5ncy51cmwsXHJcbiAgICAgICAgbWVzc2FnZUV2ZW50RGljdDoge1xyXG4gICAgICAgICAgZGF0YTogc2V0dGluZ3MucmVzcG9uc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0sIHNldHRpbmdzLnNlbmRJbnRlcnZhbClcclxuICB9XHJcbn1cclxuXHJcbi8vIENsYXNzIHRvIGJlIGV4cG9ydGVkXHJcbmNsYXNzIFdzTW9jayB7XHJcbiAgc3RhdGljIGNvbmZpZyAob3B0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKFdzTW9jay5zZXR0aW5ncywgb3B0KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIG1vY2sgKHNldHRpbmdzKSB7XHJcbiAgICBpZiAoIXNldHRpbmdzLnVybCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdVcmwgbXVzdCBiZSBzcGVjaWZpZWQuJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBfc3RvcmVNb2NrKHNldHRpbmdzKVxyXG4gICAgX2F0dGFjaFNlbmRlcihzZXR0aW5ncylcclxuICB9XHJcbn1cclxuXHJcbldzTW9jay5zZXR0aW5ncyA9IHtcclxuICBDT05ORUNUSU5HX1RJTUU6IDEwMCxcclxuICBDTE9TSU5HX1RJTUU6IDEwMCxcclxuICAvLyBCeXRlcyBwZXIgc2Vjb25kXHJcbiAgU0VORF9SQVRFOiAxICogMTAyNCAqIDEwMjQsXHJcbiAgLy8gRGVmYXVsdDogMzAwbXMgdG8gZmluaXNoIHNlbmRpbmdcclxuICBUT1RBTF9CVUZGRVJfU0laRTogKDEgKiAxMDI0ICogMTAyNCAvIDEwMDApICogMzAwLFxyXG59XHJcblxyXG53aW5kb3cuV2ViU29ja2V0ID0gV2ViU29ja2V0XHJcbmV4cG9ydCBkZWZhdWx0IFdzTW9ja1xyXG4iXSwic291cmNlUm9vdCI6IiJ9