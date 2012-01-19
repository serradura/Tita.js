$(document).ready(function() {
   module("After load the script");
   test("Creates the Tita class object", function() {
      equal(typeof Tita, 'object', "We expect an object" );
   });
});