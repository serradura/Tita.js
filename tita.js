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
   'VERSION': '0.0.1'
}

Tita.class = function (definitions) {
   function getInitializer() {
      return function () {
         if (typeof this['initialize'] === 'function') {
            this.initialize.apply(this, arguments);
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
