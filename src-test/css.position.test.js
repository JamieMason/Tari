define([
    'cssPosition'
  ],

  function(
    $cssPosition
  ) {

    describe('cssPosition', function() {

      describe('#toCamelCase', function() {
        it('should convert dashed CSS values to JavaScript camel case format', function() {
          expect($cssPosition.toCamelCase('background-color')).toEqual('backgroundColor');
        });
      });

      describe('#getComputedStyle', function() {
        it('should read CSS rules applied to an element, however they are defined', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<style>.csstest{color:#FFF}</style><div class="csstest" style="background-color:#090"></div>';
          document.body.appendChild(wrap);
          var el = wrap.getElementsByTagName('div')[0];

          expect(!!el).toEqual(true);
          expect($cssPosition.getComputedStyle(el, 'color')).toEqual('rgb(255, 255, 255)');
          expect($cssPosition.getComputedStyle(el, 'background-color')).toEqual('rgb(0, 153, 0)');
          document.body.removeChild(wrap);
        });
      });

      describe('#offsetLeft', function() {
        it('should state how many pixels from the left edge of the body an element is', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<div style="margin:0;padding:0;"></div>';
          document.body.appendChild(wrap);
          var el = wrap.getElementsByTagName('div')[0];

          expect($cssPosition.offsetLeft(el)).toEqual(5);
          document.body.removeChild(wrap);
        });
      });

      describe('#offsetTop', function() {
        it('should state how many pixels from the top edge of the body an element is', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<div style="margin:0;padding:0;position:absolute;top:5px;left:5px;"></div>';
          document.body.appendChild(wrap);
          var el = wrap.getElementsByTagName('div')[0];

          expect($cssPosition.offsetTop(el)).toEqual(5);
          document.body.removeChild(wrap);
        });
      });

      describe('#scrollLeft / #scrollTop', function() {
        it('should state how many pixels a scrollable element has scrolled', function() {
          var wrap = document.createElement('div');
          wrap.innerHTML = '<div style="overflow:scroll;height:10px;width:10px;"><div style="height:100px;width:100px;"></div></div>';
          document.body.appendChild(wrap);
          var el = wrap.getElementsByTagName('div')[0];

          expect($cssPosition.scrollLeft(el)).toEqual(0);
          expect($cssPosition.scrollTop(el)).toEqual(0);
          el.scrollLeft = 10;
          el.scrollTop = 10;
          expect($cssPosition.scrollLeft(el)).toEqual(10);
          expect($cssPosition.scrollTop(el)).toEqual(10);
          document.body.removeChild(wrap);
        });
      });

    });
  }
);
