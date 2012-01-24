/*
 *   var A = _Class({
 *      initialize: function () {
 *         // constructor
 *      },
 *
 *      instance_method: function () {
 *         //...
 *      },
 *
 *      self: {
 *         static_method: function () {
 *            //...
 *         },
 *      }
 *   });
 */

Tita = {
   'VERSION': '0.0.2'
}

Tita.class = function (definitions) {
   var _inititalizer = 'initialize';

   function getInitializer() {
      return function () {
         if (/(function|undefined)/.test(typeof(this[_inititalizer]))) {
            this.initialize.apply(this, arguments);
         } else {
            throw Error('Initializer is not a function!');
         }
      }
   }

   function factory(definitions) {
      for (_property in definitions) {
         this.constructor.prototype[_property] = definitions[_property]
      }
   }

   this.constructor = getInitializer();

   factory.call(this, definitions);

   return this.constructor;
}
