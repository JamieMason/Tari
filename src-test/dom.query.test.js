define('domQueryTest', [
    'domQuery'
  ],

  function(
    $domQuery
  ) {

    describe('domQuery', function() {
      describe('#is', function() {
        it('should state whether the supplied element matches the provided CSS selector', function() {

          var wrap = document.createElement('div');
          wrap.innerHTML = '<div class="selector-test"></div>';
          var el = wrap.getElementsByTagName('div')[0];

          expect($domQuery.is('div', el)).toEqual(true);
          expect($domQuery.is('.selector-test', el)).toEqual(true);
          expect($domQuery.is('div.selector-test', el)).toEqual(true);
          expect($domQuery.is('[class]', el)).toEqual(true);
          expect($domQuery.is('div[class="selector-test"]', el)).toEqual(true);
        });
      });

      describe('#find', function() {
        it('should return elements matching the provided CSS selector', function() {

          var wrap = document.createElement('div');
          wrap.innerHTML = '<div class="selector-test"></div>';

          expect($domQuery.find('div', wrap).length).toEqual(1);
          expect($domQuery.find('.selector-test', wrap).length).toEqual(1);
        });
      });
    });
  }
);
