/*
 * Author: Rodrigo Serradura (@serradura)
 */

Tita = {
   'VERSION': '0.1.0'
}

Tita.Builder = {};

Tita.Builder.Definition = function (klazz, data) {
  this.klazz = klazz;
  this.data  = data;

  this._constructor = {name: 'initialize'};
  this._constructor.function = data[this._constructor.name];
  this._constructor.type = typeof(this._constructor.function);
};

Tita.Builder.Constructor = function (definition) {
  var __constructor__;

  switch (definition._constructor.type) {
  case 'function':
    __constructor__ = definition._constructor.function;
    break;

  case 'undefined':
    __constructor__ = function () {};
    break;

  default:
    __constructor__ = function () {
      throw Error('Initializer is not a function!');
    }
    break;
  }

  definition.klazz.prototype.__constructor__ = __constructor__;
}

Tita.Builder.Handler = function (definition) {
  var definitions = definition.data;

  for (_property in definitions) {
    if (_property === 'self') {
      for (_class_property in definitions.self) {
        definition.klazz[_class_property] = definitions.self[_class_property];
      }
    } else {
      if (_property !== definition._constructor.name) {
        definition.klazz.prototype[_property] = definitions[_property];
      }
    }
  }
}

Tita.class = function (definitions) {
  this.constructor = function () {
    var __f__ = function () {};

    __f__.prototype = this.constructor.prototype;
    this.constructor.prototype = new __f__();
    this.__constructor__.apply(this, arguments);
  }

  var _ = Tita.Builder;

  var definition = new _.Definition(this.constructor, definitions);

  _.Constructor(definition);
  _.Handler(definition);

  return this.constructor;
}
