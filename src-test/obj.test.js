define([
    'obj'
  ],

  function(
    $obj
  ) {

    describe('obj', function() {

      describe('#extend', function() {

        it('should copy members from b to a', function() {
          var a = {};
          var b = { x: 'x', y: 'y' };
          $obj.extend(a, b);
          expect('x' in b).toBe(true);
          expect('y' in b).toBe(true);
          expect(b.x).toBe(a.x);
          expect(b.y).toBe(a.y);
        });

        it('should overwrite existing members on a of the same name', function() {
          var a = { x: 'x' };
          var b = { x: 'y' };
          $obj.extend(a, b);
          expect(b.x).toBe('y');
        });
      });

      describe('#defaults', function() {

        it('should add members of defaults to options that are not already present', function() {
          var initOptions = $obj.defaults({
            x: 'x',
            y: 'y',
            z: 'z'
          });
          var a = initOptions({});
          expect(a.x).toBe('x');
          expect(a.y).toBe('y');
          expect(a.z).toBe('z');
        });

        it('should not copy members of defaults onto options that are already present', function() {
          var initOptions = $obj.defaults({
            x: 'x',
            y: 'y',
            z: 'z'
          });

          var a = initOptions({
            x: 'a',
            y: 'b',
            z: 'c'
          });

          expect(a.x).toBe('a');
          expect(a.y).toBe('b');
          expect(a.z).toBe('c');
        });

      });
    });

  }
);
