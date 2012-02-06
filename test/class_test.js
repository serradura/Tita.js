$(document).ready(function() {
   module('Class');
   test('Returns class attributes', function () {
     var Test = Tita.class({
       self: {
              value: 1
             }
     });

     ok(Test.value == 1, 'Expected the value defined in the self context');
   });

   test('Returns class methods', function () {
     var Test = Tita.class({
       self: {
              say: function (message) {
                return String(message);
              }
       }
     });

     equal(Test.say('hello'), 'hello', 'Expected the value returned by the class method');
   });
});
