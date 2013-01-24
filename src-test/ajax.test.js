define('ajaxTest', [
    'ajax'
  ],

  function(
    $ajax
  ) {

    describe('ajax', function() {
      describe('#get', function() {
        it('should read remote files', function() {
          $ajax.get({
            url: '/base/src-test/lib/remote-file.txt',
            success: function(resBody){
              expect(resBody.indexOf('Remote file')).toEqual(0);
            }
          });
        });
      });

      describe('#post', function() {
        it('should post to remote handlers', function() {
          var postData = '{"key":"value"}';
          $ajax.post({
            url: '/server',
            postBody: postData,
            success: function(resBody){
              expect(resBody).toEqual(postData);
            }
          });
        });
      });
    });
  }
);
