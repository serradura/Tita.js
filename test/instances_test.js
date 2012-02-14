$(document).ready(function() {
  module('Instances', {
    setup: function () {
      var Class = Tita.class({
        initialize: function(value) {
          this.value = value;
        },

        say:
        function (message) {
          return message;
        }
      });

      this.instance = new Class(1);
    }
  });

  test("Should not have an initialize method after an instantiation", function () {
    equal(this.instance.initialize, undefined, 'Expected an instance without an initialize method');
  });

  test('Should have the defined attributes', function () {
    equal(this.instance.value, 1, 'Expected the attribute defined in class constructor');
  });

  test('Should have the defined methods', function () {
    equal(this.instance.say('World'), 'World', 'Expected the value returned by the instance method');
  });
});
