$(document).ready(function() {
   module('Classes');
   test('Should have the defined attributes', function () {
     var Test = Tita.class({
       self: {
              value: 1
             }
     });

     ok(Test.value == 1, 'Expected the class attribute defined in the self context');
   });

   test('Should have the defined methods', function () {
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
