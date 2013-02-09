define('domListener', [
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    'use strict';

    var curry = $fn.curry;
    var win = window;
    var doc = win.document;
    var root = doc.documentElement;
    var hasAddEventListener = !!root.addEventListener;
    var hasAttachEvent = !!root.attachEvent;
    var addEvent;
    var removeEvent;
    var cache = [];

    /**
     * Add/Remove listener using W3C methods
     * @private
     * @param  {String} method "addEventListener" or "removeEventListener"
     * @param  {String} type
     * @param  {Function} f
     * @param  {HTMLElement} el
     * @return {Boolean}
     */
    var w3cDom = curry(function(method, type, f, el) {
      return el[method](type, f, false);
    });

    /**
     * Add/Remove listener using Microsoft methods
     * @private
     * @param  {String} method "attachEvent" or "detachEvent"
     * @param  {String} type
     * @param  {Function} f
     * @param  {HTMLElement} el
     * @return {Boolean}
     */
    var microsoftDom = curry(function(method, type, f, el) {
      return el[method]('on' + type, f);
    });

    if (hasAddEventListener) {
      addEvent = w3cDom('addEventListener');
      removeEvent = w3cDom('removeEventListener');
    } else if (hasAttachEvent) {
      addEvent = microsoftDom('attachEvent');
      removeEvent = microsoftDom('detachEvent');
    } else {
      addEvent = function() {
        throw new Error('!addEventListener && !attachEvent');
      };
      removeEvent = function() {
        throw new Error('!removeEventListener && !detachEvent');
      };
    }

    /**
     * Remove all event listeners bound by this module
     * @return {Array[]} cache
     */
    function flushCache () {
      return $each(cache, function(item){
        removeEvent.apply({}, item);
      });
    }

    addEvent('unload', flushCache, win);

    return {
      /**
       * @return {Boolean}
       */
      hasAddEventListener: $fn.id(hasAddEventListener),

      /**
       * @return {Boolean}
       */
      hasAttachEvent: $fn.id(hasAttachEvent),

      /**
       * Add listener to DOM Element
       * @param  {String} type
       * @param  {Function} f
       * @param  {HTMLElement} el
       */
      on: curry(function(type, f, el) {
        addEvent(type, f, el);
        cache.push([type, f, el]);
      }),

      /**
       * Remove listener from DOM Element
       * @param  {String} type
       * @param  {Function} f
       * @param  {HTMLElement} el
       */
      off: curry(removeEvent),
      flush: flushCache
    };
  }
);
