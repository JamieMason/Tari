define([
    'domListener'
  ],

  function(
    $domListener
  ) {

    describe('domListener', function() {

      describe('#add', function() {

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
          $domListener.add(div, 'click', someFn);
          div.click();
          expect(count).toEqual(1);
        });

      });

      describe('#remove', function() {

        it('should remove a DOM event listener from an element', function() {
          var div = document.createElement('div');
          var count = 0;

          function someFn() { count++; }
          $domListener.add(div, 'click', someFn);
          $domListener.remove(div, 'click', someFn);
          div.click();
          expect(count).toEqual(0);
        });

      });

      describe('#flush', function() {

        it('should remove all event listeners bound by this module', function() {
          var div = document.createElement('div');
          var count = 0;

          function someFn() { count++; }
          $domListener.add(div, 'click', someFn);
          $domListener.flush();
          div.click();
          expect(count).toEqual(0);
        });

      });

    });

  }
);
