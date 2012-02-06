$(document).ready(function() {
   module('Instances');
   test("Should not have an initialize method after it's creation", function () {
     var Test = Tita.class({
       initialize: function(a) {}
     });

     var t = new Test();
     equal(t.initialize, undefined, 'Expected an instance without an initialize method');
   });

   test('Returns attributes', function () {
     var Test = Tita.class({
       initialize: function (a) {
                    this.a = a;
                  }
     });

     var t = new Test(1);
     ok(t.a == 1, 'Expected the value defined in class constructor');
   });

   test('Returns methods', function () {
     var Test = Tita.class({
       say_from_instance:
          function (message) {
            return message;
          }
     });

     var t = new Test();
     equal(t.say_from_instance('World'), 'World', 'Expected the value returned by the instance method');
   });
});
