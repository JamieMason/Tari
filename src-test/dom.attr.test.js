define([
    'domAttr'
  ],

  function(
    $domAttr
  ) {

    describe('domAttr', function() {

      describe('#get', function() {
        it('should read named attributes', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<div id="attr-test"></div>';
          var el = wrap.getElementsByTagName('div')[0];

          expect($domAttr.get(el, 'id')).toEqual('attr-test');
        });
      });

      describe('#set', function() {
        it('should add or update named attributes', function() {
          var el = document.createElement('div');
          expect($domAttr.get(el, 'id')).toEqual(void(0));
          $domAttr.set(el, 'id', 'attr-test');
          expect($domAttr.get(el, 'id')).toEqual('attr-test');
        });
      });

      describe('#setMany', function() {
        it('should set many named attributes on a single element', function() {
          var el = document.createElement('div');

          expect($domAttr.get(el, 'id')).toEqual(void(0));
          expect($domAttr.get(el, 'data-test')).toEqual(void(0));
          expect($domAttr.get(el, 'name')).toEqual(void(0));

          $domAttr.setMany(el, {
            'id': 'foo',
            'data-test': 'bar',
            'name': 'baz'
          });

          expect($domAttr.get(el, 'id')).toEqual('foo');
          expect($domAttr.get(el, 'data-test')).toEqual('bar');
          expect($domAttr.get(el, 'name')).toEqual('baz');
        });
      });

      describe('#remove', function() {
        it('should remove named attributes', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<div id="attr-test"></div>';
          var el = wrap.getElementsByTagName('div')[0];

          expect($domAttr.get(el, 'id')).toEqual('attr-test');
          $domAttr.remove(el, 'id');
          expect($domAttr.get(el, 'id')).toEqual(void(0));
        });
      });

    });
  }
);
