(function() {

  var testSuites = {
    ajax: 'src/ajax',
    collection: 'src/collection',
    compare: 'src/compare',
    cssPosition: 'src/css.position',
    domAttr: 'src/dom.attr',
    domListener: 'src/dom.listener',
    domQuery: 'src/dom.query',
    domReady: 'src/dom.ready',
    each: 'src/each',
    fn: 'src/fn',
    obj: 'src/obj',
    str: 'src/str',
    url: 'src/url',
    value: 'src/value',

    ajaxTest: 'src-test/ajax.test',
    collectionTest: 'src-test/collection.test',
    compareTest: 'src-test/compare.test',
    cssPositionTest: 'src-test/css.position.test',
    domAttrTest: 'src-test/dom.attr.test',
    domListenerTest: 'src-test/dom.listener.test',
    domQueryTest: 'src-test/dom.query.test',
    domReadyTest: 'src-test/dom.ready.test',
    eachTest: 'src-test/each.test',
    fnTest: 'src-test/fn.test',
    objTest: 'src-test/obj.test',
    strTest: 'src-test/str.test',
    urlTest: 'src-test/url.test'
  };

  require.config({
    baseUrl: '/base',
    paths: testSuites
  });

  require(Object.keys(testSuites), function() {
    window.__testacular__.start();
  });

}());
