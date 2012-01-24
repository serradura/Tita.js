$(document).ready(function() {
   module('Instances');
   test('Returns the properties defined in initilizer method', function () {
     var Test = Tita.class({
       initialize: function(a) {
                    this.a = a;
                  }
     });

     var t = new Test(1, 2);
     ok(t.a == 1, 'Expected the value defined in class constructor');
   });
});
