/*
 * Author: Rodrigo Serradura (@serradura)
 */

Tita = {
  VERSION: '0.1.0',
  Builder: {
    Definition: function (klazz, data) {
                  this.klazz = klazz;
                  this.data  = data;

                  this._constructor = {name: 'initialize'};
                  this._constructor.function = data[this._constructor.name];
                  this._constructor.type = typeof(this._constructor.function);
                }
  }
}

Tita.Builder.Constructor = function (definition) {
  var constructors = {
    'undefined': function () {},
    'function' : definition._constructor.function,
    'error'    : function () {
                   throw Error('The initializer is not a function!');
                 }
  }

 var __constructor__ = (function (type, constructors) {
                           return type.match(/(function|undefined)/) ? constructors[type] : error.call();
                        })(definition._constructor.type, constructors);

  definition.klazz.prototype.__constructor__ = __constructor__;
}

Tita.Builder.Properties = function (definition) {
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

  var self = Tita;

  var definition = new self.Builder.Definition(this.constructor, definitions);

  self.Builder.Constructor(definition);
  self.Builder.Properties(definition);

  return this.constructor;
}
