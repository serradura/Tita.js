/*
 * Author: Rodrigo Serradura (@serradura)
 */

Tita = {
  VERSION: '0.1.1',

  Builder: {
    Definition: function (klazz, data) {
      this.klazz = klazz;
      this.data  = data;

      this._constructor = {name: 'initialize'};
      this._constructor.function = data[this._constructor.name];
      this._constructor.type = typeof(this._constructor.function);
    },

    Constructor: function (definition) {
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
    },

    Properties: function (definition) {
      var definitions = definition.data;

      for (_property in definitions) {
        if (_property === 'this') {
          for (_class_property in definitions.this) {
            definition.klazz[_class_property] = definitions.this[_class_property];
          }
        } else {
          if (_property !== definition._constructor.name) {
            definition.klazz.prototype[_property] = definitions[_property];
          }
        }
      }
    }
  },

  class: function (definitions) {
    this.constructor = function () {
      var __f__ = function () {};

      __f__.prototype = this.constructor.prototype;
      this.constructor.prototype = new __f__();
      this.__constructor__.apply(this, arguments);
    }

    var _ = Tita.Builder;

    var definition = new _.Definition(this.constructor, definitions);

    _.Constructor(definition); _.Properties(definition);

    return this.constructor;
  }
}
