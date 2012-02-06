$(document).ready(function() {
   module('Core');
   test('Tita class should exists', function () {
     ok(typeof(Tita) == 'object', 'Expected a global object');
   });

  test('Tita.VERSION should returns the framework version', function () {
    ok(/\d\.\d\.\d/.test(Tita.VERSION), 'Expected the framework version');
  });

  test('Tita.class should build a new class', function () {
    var T = Tita.class({});
    ok(typeof(T) == 'function', 'Expected a Class (Constructor function)');
  });

  test('Tita.class raises an error when the constructor was defined and is not a function', function () {
    raises(Tita.class({initialize: 'constructor'}), Error, 'Expected an error when the initializer was defined and is not a function');
  });

  test("Tita.class not raises an error when the constructor wasn't defined", function () {
    raises(Tita.class({}), Error, 'Expected no errors');
  });
});
