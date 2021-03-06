/*! this file is created by edison */
webpackJsonp([0],{

/***/ 0:
/*!*************************************!*\
  !*** ./app/src/js/cascade/entry.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var ReactDOM = __webpack_require__(/*! react-dom */ 1),
	    React = __webpack_require__(/*! react */ 162),
	    CascadeCpn = __webpack_require__(/*! scripts/cascade/component/CascadeCpn */ 168);
	
	/**渲染*/
	ReactDOM.render(
	    React.createElement(CascadeCpn, null),
	    document.getElementById("main")
	);


/***/ },

/***/ 168:
/*!****************************************************!*\
  !*** ./app/src/js/cascade/component/CascadeCpn.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var React = __webpack_require__(/*! react */ 162),
	    Store = __webpack_require__(/*! scripts/cascade/store/CascadeStore */ 169),
	    CascadeSelectCpn = __webpack_require__(/*! scripts/cascade/component/CascadeSelectCpn */ 177),
	    CityCpn = __webpack_require__(/*! scripts/cascade/component/CascadeCityCpn */ 179);
	
	/**级联*/
	var CascadeCpn = React.createClass({displayName: "CascadeCpn",
	    /**初始化state*/
	    getInitialState: function() {
	        return Store.getInitStore();
	    },
	    /**装上DOM完成回调*/
	    componentDidMount: function() {
	        Store.addChangeListener(this._onChange);
	    },
	    /**卸载DOM之前回调*/
	    componentWillUnmount: function() {
	        Store.removeChangeListener(this._onChange);
	    },
	    /**渲染*/
	    render: function() {
	        return (
	            React.createElement("div", null, 
	                React.createElement("span", null, "省："), 
	                React.createElement(CascadeSelectCpn, {provinces: this.state.provinces}), 
	                React.createElement("span", null, "市："), 
	                React.createElement(CityCpn, {cities: this.state.cities})
	            )
	        );
	    },
	    /**委托给store的回调*/
	    _onChange: function() {
	        this.setState(Store.getStore());
	    }
	});
	
	module.exports = CascadeCpn;

/***/ },

/***/ 169:
/*!**************************************************!*\
  !*** ./app/src/js/cascade/store/CascadeStore.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var CentralDispatcher = __webpack_require__(/*! scripts/cascade/dispatcher/CentralDispatcher */ 170),
	    CascadeConst = __webpack_require__(/*! scripts/cascade/const/CascadeConst */ 174),
	    EventEmitter = __webpack_require__(/*! events */ 176).EventEmitter,
	    assign = __webpack_require__(/*! object-assign */ 23),
	    CHANGE_EVENT = "change",
	    store = {};
	
	/**处理省状态*/
	var provinceDeal = {
	    create: function(props) {
	        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	        store.provinces[id] = assign({id: id}, props);
	    },
	    initial: function() {
	        store.provinces = {};
	        this.create({text: "四川", isSelected: true});
	        this.create({text: "北京", isSelected: false});
	        this.create({text: "广东", isSelected: false});
	    },
	    change: function(id) {
	        for (var key in store.provinces) {
	            store.provinces[key].isSelected = false;
	        }
	        store.provinces[id].isSelected = true;
	    }
	};
	
	/**处理市状态*/
	var cityDeal = {
	    cache: {},
	    create: function(props) {
	        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	        this.cache[id] = assign({id: id}, props);
	    },
	    initial: function() {
	        this.cache = {};
	        this.create({text: "成都", provinceText: "四川"});
	        this.create({text: "资阳", provinceText: "四川"});
	        this.create({text: "内江", provinceText: "四川"});
	        this.create({text: "丰台区", provinceText: "北京"});
	        this.create({text: "海淀区", provinceText: "北京"});
	        this.create({text: "朝阳区", provinceText: "北京"});
	        this.create({text: "广州", provinceText: "广东"});
	        this.create({text: "深圳", provinceText: "广东"});
	        this.create({text: "中山", provinceText: "广东"});
	        this.confirmProvince();
	    },
	    confirmProvince: function() {
	        store.cities = {};
	        var province = null;
	        for (var key in store.provinces) {
	            if (store.provinces[key].isSelected) {
	                province = store.provinces[key];
	                break;
	            }
	        }
	        for (key in this.cache) {
	            if (this.cache[key].provinceText == province.text) {
	                store.cities[key] = this.cache[key];
	            }
	        }
	    }
	};
	
	/**Cascade状态机*/
	var Store = assign({}, EventEmitter.prototype, {
	    /**获取初始化状态*/
	    getInitStore: function() {
	        provinceDeal.initial();
	        cityDeal.initial();
	
	        return store;
	    },
	    /**获取状态*/
	    getStore: function() {
	
	        return store;
	    },
	    /**执行事件*/
	    emitChange: function() {
	        this.emit(CHANGE_EVENT);
	    },
	    /**注册事件监听器*/
	    addChangeListener: function(callback) {
	        this.on(CHANGE_EVENT, callback);
	    },
	    /**移除事件监听器*/
	    removeChangeListener: function(callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    }
	});
	
	/**为dispatcher注册回调*/
	CentralDispatcher.register(function(action) {
	    switch (action.actionType) {
	        case CascadeConst.CHANGE_PROVINCE:
	            provinceDeal.change(action.id);
	            cityDeal.confirmProvince();
	
	            Store.emitChange();
	            break;
	    }
	});
	
	module.exports = Store;

/***/ },

/***/ 170:
/*!************************************************************!*\
  !*** ./app/src/js/cascade/dispatcher/CentralDispatcher.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var Dispatcher = __webpack_require__(/*! flux */ 171).Dispatcher;
	
	module.exports = new Dispatcher();

/***/ },

/***/ 171:
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 172);


/***/ },

/***/ 172:
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var invariant = __webpack_require__(/*! fbjs/lib/invariant */ 173);
	
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);
	
	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */
	
	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   */
	
	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */
	
	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   */
	
	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   */
	
	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };
	
	  return Dispatcher;
	})();
	
	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 3)))

/***/ },

/***/ 173:
/*!****************************************!*\
  !*** ./~/flux/~/fbjs/lib/invariant.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 3)))

/***/ },

/***/ 174:
/*!**************************************************!*\
  !*** ./app/src/js/cascade/const/CascadeConst.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var keyMirror = __webpack_require__(/*! keymirror */ 175);
	
	/**Cascade常量*/
	module.exports = keyMirror({
	    CHANGE_PROVINCE: null
	});

/***/ },

/***/ 175:
/*!******************************!*\
  !*** ./~/keymirror/index.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	"use strict";
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;


/***/ },

/***/ 176:
/*!********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/events/events.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },

/***/ 177:
/*!**********************************************************!*\
  !*** ./app/src/js/cascade/component/CascadeSelectCpn.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var React = __webpack_require__(/*! react */ 162),
	    CascadeAction = __webpack_require__(/*! scripts/cascade/action/CascadeAction */ 178);
	
	var SelectCpn = React.createClass({displayName: "SelectCpn",
	    _onChangeProvince: function(e) {
	        CascadeAction.changeProvince(e.target.value);
	    },
	    render: function() {
	        var options = [],
	            provinceId = null;
	        for (var key in this.props.provinces) {
	            var province = this.props.provinces[key];
	            options.push(React.createElement("option", {key: key, value: key}, province.text));
	            if (province.isSelected) provinceId = province.id;
	        }
	        return (
	            React.createElement("select", {value: provinceId, onChange: this._onChangeProvince}, 
	                options
	            )
	        );
	    }
	});
	
	module.exports = SelectCpn;

/***/ },

/***/ 178:
/*!****************************************************!*\
  !*** ./app/src/js/cascade/action/CascadeAction.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var CentralDispatcher = __webpack_require__(/*! scripts/cascade/dispatcher/CentralDispatcher */ 170),
	    CascadeConst = __webpack_require__(/*! scripts/cascade/const/CascadeConst */ 174);
	
	/**Cascade action*/
	var CascadeAction = {
	    changeProvince: function(id) {
	        CentralDispatcher.dispatch({
	            actionType: CascadeConst.CHANGE_PROVINCE,
	            id: id
	        });
	    }
	};
	
	module.exports = CascadeAction;

/***/ },

/***/ 179:
/*!********************************************************!*\
  !*** ./app/src/js/cascade/component/CascadeCityCpn.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/29.
	 */
	var React = __webpack_require__(/*! react */ 162),
	    CascadeAction = __webpack_require__(/*! scripts/cascade/action/CascadeAction */ 178);
	
	var CityCpn = React.createClass({displayName: "CityCpn",
	    render: function() {
	        var options = [];
	        for (var key in this.props.cities) {
	            var city = this.props.cities[key];
	            options.push(React.createElement("option", {key: key, value: key}, city.text));
	        }
	        return (
	            React.createElement("select", null, 
	                options
	            )
	        );
	    }
	});
	
	module.exports = CityCpn;

/***/ }

});
//# sourceMappingURL=cascade.bundle.js.map