$(document).ready(function() {
   module('Instances');
   test("Should not have an initialize method after an instantiation", function () {
     var Test = Tita.class({
       initialize: function(a) {}
     });

     var t = new Test();
     equal(t.initialize, undefined, 'Expected an instance without an initialize method');
   });

   test('Should have the defined attributes', function () {
     var Test = Tita.class({
       initialize: function (a) {
                    this.a = a;
                  }
     });

     var t = new Test(1);
     ok(t.a == 1, 'Expected the attribute defined in class constructor');
   });

   test('Should have the defined methods', function () {
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
