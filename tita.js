/*
 * Author: Rodrigo Serradura (@serradura)
 */

Tita = {
   'VERSION': '0.1.0'
}

Tita.class = function (definitions) {
  var __constructor__ = 'initialize';
  var __initializer__ = {
     error:
            function () {
              throw Error('Initializer is not a function!');
            },
     undefined:
            function () {}
  }

  function getConstructor() {
    return function () {
      var __f__ = function () {};

      __f__.prototype = this.constructor.prototype;
      this.constructor.prototype = new __f__();
      this.__initializer__.apply(this, arguments);
    }
  }

  function factory(definitions) {
    for (_property in definitions) {
      if (_property === 'self') {
        for (_class_property in definitions.self) {
          this.constructor[_class_property] = definitions.self[_class_property];
        }
      } else {
        if (_property !== __constructor__) {
          this.constructor.prototype[_property] = definitions[_property];
        }
      }
    }
  }

  this.constructor = getConstructor();

  switch (typeof(definitions[__constructor__])) {
    case 'function':
      this.constructor.prototype.__initializer__ = definitions[__constructor__];
      break;
    case 'undefined':
      this.constructor.prototype.__initializer__ = __initializer__.undefined;
      break;
    default:
      this.constructor.prototype.__initializer__ = __initializer__.error;
      break;
  }

  factory.call(this, definitions);

  return this.constructor;
}
