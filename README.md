## ROADMAP

### Version.: 0.1.X

    var A = Tita.class({
      initialize:  function () {
        //constructor
      },

      instanceAttribute: 1,

      instanceMethod: function () {
      },

      this: { // Class definitions
        classAttribute: 2,

        classMethod: function () {}
      }
    });


### Version.: 0.2.X

    var B = Tita.class({
      initialize:  function () {
        //constructor
      },

      public: {
        pubMethod: function () {
          //...
        }
      }

      private: {
        priMethod: function (foo) {
          //...
        }
      }
    });

    var b = new B();
    b.send('priMethod', 'Foo');



### Version.: 0.3.X

    var C = Tita.class({
      super: A,

      initialize:  function () {
        //constructor
      },

      instanceMethod: function () {
        this._super();
      }

      protected: {
        //...
      }

      this: {
        classMethod: function () {
          this._super();
        }
      }
    });
