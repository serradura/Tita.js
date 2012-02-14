$(document).ready(function() {
  module('Tita');
  test('Should exists', function () {
    ok(typeof(Tita) == 'object', 'Expected a global object');
  });


  module('Tita.VERSION');
  test('Returns the framework version', function () {
    ok(Tita.VERSION.match(/\d\.\d\.\d/), 'Expected the framework version');
  });


  (function () {
    var Class = function () { /*The Class*/ };

    var definitions = {
      initialize: function () { /*The Constructor*/ }
    }

    var getConstructorObjToTestFrom = function (options) {
      var Class       = options.defaultArgs[0]; delete Class.prototype.__constructor__;
      var definitions = options.defaultArgs[1]; delete definitions.initialize;

      if (options.initializer) definitions.initialize = options.initializer;

      Tita.Builder.Constructor(new Tita.Builder.Definition(Class, definitions));

      return new Class.prototype.__constructor__;
    }

    module('Tita.Builder.Definition');
    test('Creates an object to be used by another builder', function() {
      var definition = new Tita.Builder.Definition(Class, definitions);

      equal(definition.klazz, Class      , 'Expected the class in construction');
      equal(definition.data , definitions, 'Expected the definition data');

      equal(definition._constructor.name    , 'initialize'          , 'Expected the name that defines the constructor');
      equal(definition._constructor.type    , 'function'            , 'Expected the constructor content type');
      equal(definition._constructor.function, definitions.initialize, 'Expected the constructor content');
    });


    module('Tita.Builder.Constructor');
    test('Apply the defined constructor in Class prototype when it was defined', function () {
      var obj = getConstructorObjToTestFrom({defaultArgs: [Class, definitions], initializer: function () {this.attribute = 'data'}});

      equal(obj.attribute, 'data', 'Expected the data from the constructor definition');
      equal(countProperties({in: obj}), 1);
    });

    test('Apply an empty function as constructor when the definition was undefined', function () {
      var obj = getConstructorObjToTestFrom({defaultArgs: [Class, definitions]});

      equal(countProperties({in: obj}), 0);
    });

    test('Raises an error when the definition is invalid', function () {
      raises(function () {
        var definitions = {initialize: 'Invalid constructor content'};

        Tita.Builder.Constructor(new Tita.Builder.Definition(Class, definitions))
      }, Error, 'Expected an error, because the constructor should be undefined or a function');
    });


    module('Tita.Builder.Properties');
    test('Collect properties defined in the "this" definition property and apply them in the class', function () {
      definitions = {
        this: {
                'method'   : function () { return 'class method' },
                'attribute': 'class attribute'
              }
      };

      Tita.Builder.Properties(new Tita.Builder.Definition(Class, definitions))

      equal(Class.method() , 'class method');
      equal(Class.attribute, 'class attribute');
    });

    test('Collect instance properties (not defined in the "this" property) and apply them to the Class prototype', function () {
      definitions = {
        'method'   : function () { return 'instance method' },
        'attribute': 'instance attribute'
      };

      Tita.Builder.Properties(new Tita.Builder.Definition(Class, definitions))

      var obj = new Class();

      equal(obj.method() , 'instance method');
      equal(obj.attribute, 'instance attribute');
    });
  })();


  module('Tita.class');
  test('Builds new classes', function () {
    var T = Tita.class({});
    ok(typeof(T) === 'function', 'Expected a Class (Constructor function)');
  });

  test('Raises an error when the constructor was defined and it is not a function', function () {
    raises(function () {
      Tita.class({initialize: 'constructor'})
    }, Error, 'Expected an error when the initializer was defined and is not a function');
  });

  test("Not raises errors when the constructor wasn't defined", function () {
    ok(Tita.class({}), 'Expected no errors');
  });
});
