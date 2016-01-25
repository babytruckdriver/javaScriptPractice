/*
 * Articles referenced:
 *   -https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a#.yepusunvp
 *   -
 */

define([], function () {
  "use strict";

  var app = {
    init() {
      // Prototypal Inheritance
      this.inheritate();
    },

    // Prototypal Inheritance
    inheritate() {

      // Object literal declaration
      let animal = {
        animalType: "animal",
        describe() {
          return `An ${this.animalType}, with ${this.furColor} fur, ${this.legs} legs, and a ${this.tail} tail.`;
        }
      };

      // ***********************************************************
      // Inheritance by delegation
      // Inheritance by concatenation
      // Functional inheritance
      // ***********************************************************

      // Inheritance by concatenation
      let mouse = Object.assign({}, animal, {
        furColor: "brown",
        legs: 4,
        tail: "long, skinny"
      });

      console.log(mouse.describe());
      animal.animalType = "insect";
      console.log(mouse.describe()); //mouse.animalType doesn't change

      // Inheritance by delegation
      // The result object has its props and the props of the parent (no a copy of the props)
      // 'fly' is just a new name for the extended animal object.
      // For this kind of inheritance you need the "new" or "Object.create"

      let fly = Object.assign(Object.create(animal), {
        furColor: "black",
        legs: 4,
        tail: "none"
      });

      console.log(fly.describe());
      animal.animalType = "amphibian";
      console.log(fly.describe()); // fly.animalType has changed

      // Functional inheritance
      // You need create the a function factory and add new properties

      let flyFactory = function () {
        return {
          furColor: "white",
          legs: 6
        };
      };

      let aFly = flyFactory();
      aFly.animalType = "insect";
      aFly.describe = function () {
        return `A ${this.animalType}, with ${this.legs} legs.`;
      };

      console.log(aFly.describe());
    }
  };

  //Se exporta la funcionalidad que se desea exponer
  return {
    App: app
  };
});
