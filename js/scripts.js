//Configuración para JSLINT
/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4 */
/*global $, console */

//Test 1 ----------------------------------------------
var cVuelo = {
        value: 0,
        num: "ES12345",
        pass: 456,
        status: "KO",
        plane: {model: "B747", color: "withe"},
        increment: function (inc) {
            "use strict";
            this.value += typeof inc === "number" ? inc : 1;
        }
        
    };

cVuelo.increment();
//console.log(cVuelo.value);

cVuelo.increment(2);
//console.log(cVuelo.value);

cVuelo.double = function () {
    "use strict";
    var that = this;
    var helper = function () {
        
            that.value = that.value * 2;
        };
    
    helper();
};

cVuelo.double();
//console.log(cVuelo.value);

//Test 2 over Test1 -----------------------------------
Object.prototype.makeLogString = function () {
    "use strict";
    
    var name, result = "";
    for (name in this) {
        if (typeof this[name] !== "function" && this.hasOwnProperty(name)) {
            result += name + ": " + this[name] + "##";
        }
    }
    return result;
};

//console.log(cVuelo.makeLogString());

//Test 3 ----------------------------------------------
var Class = function (vel, dist) {
    "use strict";
    var _velocidad = vel;
    var _distancia = dist;
    
    this.getVelocidad = function () {
        return _velocidad;
    };
    
    this.getDistancia = function () {
        return _distancia;
    };
    
    this.setVelocidad = function (vel) {
        _velocidad = vel;
    };
    
    this.setDistancia = function (dist) {
        _distancia = dist;
    };
    
};

var myClass = new Class(12, 45);
myClass.setVelocidad(34);

//console.log(myClass.getVelocidad() + " ## " + myClass.getDistancia());


//Test 4 ----------------------------------------------
Function.prototype.method = function (name, func) {
    "use strict";
    this.prototype[name] = func;
    return this;
};

String.method("trim", function () {
    "use strict";
    return this.replace(/^\s+|\s+$/g, '');
});

//console.log("        spaces Everywhere      ".trim());


//Test 5 ----------------------------------------------
var saluda = function () {
    "use strict";
    return function (message) {
        //console.log(message);
    };
};

saluda()("Hola colega!");

//Test 6 ----------------------------------------------
var Aobj = (function () {
    "use strict";
    var name = "";
    var age = 0;
    return {
        getName: function () {
            return name;
        },
        setName: function (oName) {
            name = oName;
        }
    };
}()); //Ojo: Se invoca a la función justo después de declararla.

Aobj.setName("samuel");
//console.log(Aobj.getName());

//Test 7 ----------------------------------------------
// Define a function that sets a DOM node's color
// to yellow and then fades it to white.
var fade = function (node) {
    "use strict";
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        console.log(hex);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
//fade(document.body);

//Test 8 ----------------------------------------------
var add_the_handlers = function (nodes) {
    "use strict";
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = (function (num) {
            return function (e) {
                alert(num);
            };
        }(i));
    }
};
//add_the_handlers(document.body.childNodes);

//Test 9 ----------------------------------------------
String.method('deentityify', (function () {
// The entity table. It maps entity names to
// characters.
    "use strict";
    var entity = {
        quot: '"',
        lt:  '<',
        gt: '>'
    };
// Return the deentityify method.
    return function () {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            });
    };
}()));
console.log('&lt;&quot;&gt;'.deentityify());


//jQuery ----------------------------------------------
/*var mostrarOcultar = function () {
    "use strict";
    var menuOculto = $("#menuOculto");
    if (menuOculto.is(":visible")) {
        menuOculto.fadeOut(200);
    } else {
        menuOculto.fadeIn(200);
    }
};*/