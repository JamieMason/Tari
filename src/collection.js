define('collection', ['fn', 'each'], function($fn, $each) {

  'use strict';

  var exports = {};

  function fold(iterator, memo, collection) {
    $each(collection, function(val, key) {
      memo = iterator(memo, val, key);
    });
    return memo;
  }

  /**
   * Iterates over the Object to create a single item using the memo provided
   * @param  {Function} iterator
   * @param  {Mixed} memo
   * @param  {Object} collection
   * @return {Mixed}
   */
  exports.fold = $fn.curry(fold);

  /**
   * Iterate over every member of collection, calling iterator with the arguments: member, i, collection to create a new array of iterator's return values
   * @param  {Array|Object} collection
   * @param  {Function} iterator
   * @return {Array|Object}
   */
  exports.map = $fn.curry(function(collection, iterator) {
    return fold(function(memo, val, key) {
      memo[key] = iterator(val, key, collection);
      return memo;
    }, {}.toString.call(collection).slice(8, -1) === 'Array' ? [] : {}, collection);
  });

  /**
   * Convert an Array-like Object into a true Array
   * @param  {Array|Object|NodeList} collection
   * @return {Array}
   */
  exports.toArray = function(collection) {
    return fold(function(memo, val) {
      memo.push(val);
      return memo;
    }, [], collection);
  };

  return exports;

});
