$(document).ready(function() {
   module("When was defined a property receiving a constructor parameter");
   test("Should be possible get the property value", function () {
      var S2 = Tita.class({
         initialize: function (message) {
            this.message = message;
         }
      });

      var serradura = new S2('Tita I love you!');
      equal(serradura.message, 'Tita I love you!', "We expect a love declaration message" );
   });
});