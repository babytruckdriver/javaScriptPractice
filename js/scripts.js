//Configuración para JSLINT
/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4 */
/*global $, console */

// Avoid `console` errors in browsers that lack a console.
(function () {
    "use strict";
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

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
    /*for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = (function (num) {
            return function (e) {
                alert(num);
            };
        }(i));
    }*/
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
//console.log('&lt;&quot;&gt;'.deentityify());
//Test 10 ---------------------------------------------
var aObj = {
    name: "Icíar",
    age: 0.4,
    hight: null
};
/*console.log("'aObj.hight' is 'null': " + aObj.hight);
console.log("'aObj.aPropertie' is 'undefined': " + aObj.aPropertie);
console.log("'null' es igual a 'undefined': " + (null == undefined));
if (aObj.aPropertie == null) {
    console.log("Aparezco da igual si 'aPropertie' es 'null' o 'undefined'");
}*/
//Test 11 ---------------------------------------------

/*var call_back = function (name, age, anounce) {
    "use strict";
    var concat = name + ": " + age;
    anounce("I have done!");
    console.log("Execution continue...");
};
            
call_back("Icíar", 0.4, function (message) {
    "use strict";
    var i = 0;
    var concat = "";
    while (i < 1500000) {
        concat += i;
        i++;
    }
    console.log(message);
});*/

//Test 12 ---------------------------------------------

var Animal = function () {
    "use strict";
    this.name = "";
};

Animal.prototype.surname = "No surname";
Animal.prototype.getName = function () {
    "use strict";
    return this.name;
};

Animal.prototype.getSurname = function () {
    "use strict";
    return this.surname;
};

var perro = new Animal();
perro.name = "Dodo";
perro.surname = "Todo";

Animal.prototype = {
    getName: function () {
        "use strict";
        return "pringao!!!";
    }
};

var gato = new Animal();
gato.name = "Peter";

//console.log(perro.getSurname());
//console.log(gato.getSurname()); //getSurname no existe para 'gato'

//Test 13 ---------------------------------------------
var Thing = function (name) {
    "use strict";
    this.name = name;
};


Thing.prototype = {
    getName: function () {
        "use strict";
        return this.name;
    },
    setName: function (name) {
        "use strict";
        //console.log("In the father method..");
        this.name = name;
    }
};

var AnotherThing = function (name) {
    "use strict";
    this.name = name;
};

AnotherThing.prototype = new Thing();
AnotherThing.prototype.setName = function (name) {
    "use strict";
    //console.log("I'm in the child method");
    Thing.prototype.setName.apply(this, arguments);
    //console.log(arguments);
};

var aThing = new AnotherThing("osos");
aThing.setName("dogs");

//Test 14 ---------------------------------------------
var Some = function (name, value) {
    "use strict";
    if (this instanceof Some) {
        this.name = name;
        this.value = value;
        this.getString = function () { return this.name + " :: " + this.value; };
    } else {
        return {
            name: name,
            value: value,
            getString: function () { return name + " :: " + value; }
        };
    }
};

//var aSome = Some("Icíar", "Cansina"); //Puedes crear una nueva instacia de Some sin poner la palabra new
//console.log(aSome.getString());

//Test 15 ---------------------------------------------
var Add = function (x, y) {
    "use strict";
    var internalVar = 0.2;
    this.a = "Icíar";
    var internalFunction = function (param) {
        //console.log(internalVar + " " + param + " " + this.a);  
    };
    internalFunction.call(this, "parámetro");
    return x + y;
};

var addObj = new Add(1, 2);

//Test 16 ---------------------------------------------
var combine = function (fn1, fn2) {
    "use strict";
    return function (x) {
        return fn1(fn2(x));
    };
};

var sumaUno = function (n) {
    "use strict";
    return n + 1;
};

var doble = function (n) {
    "use strict";
    return n * 2;
};

var sumaUnoDoble = combine(doble, sumaUno);
//console.log(sumaUnoDoble(2));

//Test 17 ---------------------------------------------
var nombre = "Icíar";

(function (nombre) {
    "use strict";
    nombre = "Samuel";
    return false;
}(nombre));

//En JavasScript los parámetros se pasan por valor, no por referencia
//console.log(nombre);

//Test 18 ---------------------------------------------
var fnTest = function (a, b) {
    "use strict";
    return arguments;
};

var argumentsArr = Array.prototype.slice.call(fnTest(1, 2), 0);
//console.log(argumentsArr);

//Test 19 ---------------------------------------------
var __slice = Array.prototype.slice;

function llamaConPrimerArgumento(fn, argumento) {
    "use strict";
    return function casavieja() {
        var args = __slice.call(arguments, 0);
        return fn.apply(this, [argumento].concat(args));
    };
}

var saluda = function (yo, tu) {
    "use strict";
    return "Hola, " + tu + ", mi nombre es " + yo;
};

var cristinaDiHola = llamaConPrimerArgumento(saluda, "Cristina");

console.log(cristinaDiHola("Samuel"));


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