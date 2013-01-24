define('domListenerTest', [
    'domListener'
  ],

  function(
    $domListener
  ) {

    describe('domListener', function() {

      describe('#on', function() {

        beforeEach(function(){
          $domListener.flush();
        });

        afterEach(function(){
          $domListener.flush();
        });

        it('should register a DOM event listener to an element', function() {
          var div = document.createElement('div');
          var count = 0;

          function someFn() { count++; }
          $domListener.on('click', someFn, div);
          div.click();
          expect(count).toEqual(1);
        });

      });

      describe('#off', function() {

        it('should remove a DOM event listener from an element', function() {
          var div = document.createElement('div');
          var count = 0;

          function someFn() { count++; }
          $domListener.on('click', someFn, div);
          $domListener.off('click', someFn, div);
          div.click();
          expect(count).toEqual(0);
        });

      });

      describe('#flush', function() {

        it('should remove all event listeners bound by this module', function() {
          var div = document.createElement('div');
          var count = 0;

          function someFn() { count++; }
          $domListener.on('click', someFn, div);
          $domListener.flush();
          div.click();
          expect(count).toEqual(0);
        });

      });

    });

  }
);
