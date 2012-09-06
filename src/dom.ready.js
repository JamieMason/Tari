/**
 * @fileOverview Adaptation of https://github.com/ded/domready
 */
define([
    'domListener'
  ],

  function(
    $domListener
  ) {

    var win = window;
    var fns = [];
    var fn;
    var f = false;
    var doc = win.document;
    var testEl = doc.documentElement;
    var ieContentLoadedTest = testEl.doScroll;
    var domContentLoaded = 'DOMContentLoaded';
    var addEventListener = 'addEventListener';
    var onreadystatechange = 'onreadystatechange';
    var readyState = 'readyState';
    var loaded = /^loade|c/.test(doc[readyState]);
    var $domReady;

    function flush(f) {
      loaded = true;
      while ((f = fns.shift())) {
        f();
      }
    }

    $domListener.hasAddEventListener() && $domListener.on(domContentLoaded, fn = function() {
      $domListener.off(domContentLoaded, fn, doc);
      flush();
    }, doc);

    ieContentLoadedTest && $domListener.hasAttachEvent() && $domListener.on(onreadystatechange, fn = function() {
      if (/^c/.test(doc[readyState])) {
        $domListener.off(onreadystatechange, fn, doc);
        flush();
      }
    }, doc);

    if (ieContentLoadedTest) {
      $domReady = function(fn) {
        win.self !== win.top ? loaded ? fn() : fns.push(fn) : (function() {
          try {
            testEl.doScroll('left');
          } catch (e) {
            return setTimeout(function() {
              $domReady(fn);
            }, 50);
          }
          fn();
        }());
      };
    } else {
      $domReady = function(fn) {
        loaded ? fn() : fns.push(fn);
      };
    }

    return $domReady;
  }
);
