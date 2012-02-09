var getConstructorObjToTestFrom = function (options) {
  var Class       = options.defaultArgs[0]; delete Class.prototype.__constructor__;
  var definitions = options.defaultArgs[1]; delete definitions.initialize;

  if (options.initializer) definitions.initialize = options.initializer;

  Tita.Builder.Constructor(new Tita.Builder.Definition(Class, definitions));

  return new Class.prototype.__constructor__;
}

var countProperties = function (option) {var count = 0; for (p in option.in) { count++; }; return count};
