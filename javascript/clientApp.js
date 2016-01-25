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


      let mouse = Object.assign(Object.create(animal), {
        furColor: "brown",
        legs: 4,
        tail: "long, skinny"
      });


      console.log(mouse.describe());

      console.log(mouse.describe());
    }
  };

  //Se exporta la funcionalidad que se desea exponer
  return {
    App: app
  };
});
