$(document).ready(function() {
  module('Classes', {
    setup: function () {
      this.Class = Tita.class({
        this: {
                value: 1,

                say: function (message) {
                  return String(message);
                },

                getValue: function () {
                  return this.value;
                }
              }
      });
    }
  });

  test('Should have the defined attributes', function () {
    equal(this.Class.value, 1, 'Expected the class attribute defined in the self context');
  });

  test('Should have the defined methods', function () {
    equal(this.Class.say('hello'), 'hello', 'Expected the value returned by the class method');
  });

  test('Should access to itself using "this"', function () {
    equal(this.Class.getValue(), 1, 'Expected the value returned by the class attribute');
  });
});
