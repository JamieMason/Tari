define([
    'fn'
  ],

  function(
    $fn
  ) {

    describe('fn', function() {
      describe('#curry', function() {
        var concat3 = $fn.curry(function(a, b, c) {
          return a + b + c;
        });

        it('should return partially applied functions if called with less than the total named arguments', function() {
          var fixA = concat3('D');
          var fixAB = concat3('G', 'H');

          expect(concat3('A', 'B', 'C')).toEqual('ABC');
          expect(fixA('E', 'F')).toEqual('DEF');
          expect(fixAB('I')).toEqual('GHI');
        });

        it('should behave normally if called with all named arguments', function() {
          expect(concat3('J', 'K', 'L')).toEqual('JKL');
        });
      });

      describe('#compose', function() {
        function add5(a) {
          return a + 5;
        }

        it('should return a function which calls each supplied function in turn', function() {
          var add5times4 = $fn.compose([add5, add5, add5, add5]);
          expect(add5times4(0)).toEqual(20);
        });

        it('should call each function with the return value of the previous', function() {
          var inspectArgs = $fn.compose([function(a) {
            expect(a).toEqual(0);
            return 'A';
          }, function(a) {
            expect(a).toEqual('A');
            return {};
          }, function(a) {
            expect(a).toEqual({});
            return false;
          }]);

          expect(inspectArgs(0)).toEqual(false);
        });
      });
    });
  }
);
