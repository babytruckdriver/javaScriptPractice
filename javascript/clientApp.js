/*jslint browser: true, devel: true, indent: 8, plusplus: true */
/*eslint-env amd, browser */
/*global define*/

/*
 * Codemotion Madrid 2014
 * Charla: Lo que la cafeína le hizo a JS. by Sergio Arbeo
 * Vídeo:  https://www.youtube.com/watch?v=Wdt7lYxvQm8
 */

define([], function () {
        "use strict";

        var app = {
                init() {
                        //this.promiseSinc();
                        //this.promiseAsinc();
                        //this.generatorIterator();
                        //this.generatorAsinc();
                        //this.objDestructuring();
                        //this.arrDestructuring();
                        //this.letItGo();
                        //this.plucking();
                        //this.getSet();
                        //this.arrowOp();
                        //this.future();
                        //this.fetchTest();
                        //this.iterators();
                        this.strings();
                }
        };

        app.strings = function () {
                let name = "Icíar";
                let age = 2;
                let saludo = `Hola ${name}! Tienes ${age} años!`;

                console.log(saludo + ` ${age}!!`);

                let severalLines = `
                        This is a test
                        with several lines
                        more than ${2 + 2}
                        `;
                console.log(severalLines);
        };

        app.iterators = function () {
                let arr = ["a", "b", "c"];
                let iter = arr[Symbol.iterator]();

                // Si este conjunto de console.log's "gastan" el iterador 'iter' un bucle
                //posterior 'for of' no iterará nada
                console.log(iter.next().value);
                console.log(iter.next());
                console.log(iter.next().value);
                console.log(iter.next());

                for (let item of arr) {
                        console.log(">> " + item);
                }

                // -----------------------------------------------

                let cadena = "Ey! I'm a String!";

                for (let letter of cadena) {
                        console.log("->String->" + letter);
                }

                // -----------------------------------------------

                // La iteración devuelve un array con la clave y el valor.
                let mapa = new Map().set("uno", 1).set(2, "soy un dos");
                let mapaIterValues = mapa.values();
                let mapaIterKeys = mapa.keys();

                console.log("------");
                for (let item of mapaIterValues) {
                        console.log("->mapaIterValues: " + item);
                }
                console.log("------");
                for (let item of mapaIterKeys) {
                        console.log("->mapaIterKeys: " + item);
                }
                console.log("------");

                // [key, value] = Destructuring pattern!
                for (let [key, value] of mapa) {
                        console.log("->mapa => key: " + key + " => value: " + value);
                }

                // Y lo mismo para Arrays normales (que por defecto no tienen el índice)
                let arr2 = ["a", "b", "c"];

                for (let [k, v] of arr2.entries()) {
                        console.log(`key = ${k}, value = ${v}`);
                }

                // -----------------------------------------------

                // Operador Spread: Deconstruye un array en sus elementos
                // Ej: let arr = [2,3];
                //     ler arr2 = [1, ...arr, 4];
                (function (a, b) {
                        console.log(">>a: " + a + " >>b: " + b);
                }(...[2, 3]));

                // -----------------------------------------------

                // Un 'Set' es como un ArrayList de Java pero cuyos elementos no puden estar repetidos
                let aSet = new Set(arr); //new Set().add("Sam").add(2).add(2); // Solo añade un 2

                for (let item of aSet) {
                        console.log("aSet: " + item);
                }

                // -----------------------------------------------

                let arrayLike = {length: 2, 0: "a", 1: "b"};

                console.log(Array.from(arrayLike)); // length: 2 no lo tiene en cuenta
                console.log(Array.from("Icíar"));
                console.log(Array.from([1, 2, 3], x => x * 2)); //[2, 4, 6]

                // Esto no lo entiendo... [0,1,2,3,4]
                console.log(Array.from({length: 5}, (v, k) => k));

                // -----------------------------------------------

                let obj = {
                        name: "Icíar",
                        age: 2,
                        sayHello() {console.log("Hello " + this.name + "!");}
                };

                for (obj.name of ["Samuel", "Cristina"]) {
                        console.log(obj.sayHello());
                }

                // -----------------------------------------------

        };

        app.fetchTest = function () {
                console.log("Try Fetch API.");

                let processStatus = function (response) {
                        if (response.status === 200) {
                                return Promise.resolve(response);
                        }

                        return Promise.reject(Error(response.statusText));
                };

                let fetchP = fetch("http://echo.jsontest.com/key/value/one/two", {encoding: "UTF-8"});
                fetchP.then(processStatus)
                      .then(function (result) {

                        // No es posible en este punto recoger la información del resultado.
                        // FIX: No sé por qué pero hay que extraerla y en un sigueinte 'then' consumirla

                              console.log("Fetch ok. Transform and Return.");
                              return result.text();
                      })
                      .then(function (value) {
                              console.log("Fetch result: " + value);
                      })
                      .catch(function (err) {

                              // Aquí se captura el error proviniente de 'processStatus'
                              console.log("Fetching error: " + err);
                      });

                console.log("Fetch API finished");
        };

        app.generatorAsinc = function () {

                // Generadores: Una vez devuelto el control vía yield a la parte de código desde
                // donde se invocó el .next(), el siguiente .next(value) puede enviar un valor que
                // puede ser recogido (en este caso por la variable 'res') y continuar la ejecución
                // de la función.

                var myFoo;

                function *foo() {
                        console.log("Before the asynchronous task");
                        yield fetch("http://echo.jsontest.com/name/samuel/children/1").then(function () {
                                myFoo.next();
                        });
                        console.log("After de asynchronous task has completed");
                }

                myFoo = foo();
                myFoo.next();


        };

        app.generatorIterator = function () {

                // Generadores: Funciones que devuelven vía 'yield' y quedan en ese punto
                // en Standby hasta que se vuelve a invocar en un 'for of' o .next()
                // Esto posibilita la creación de listas muy grandes o potencialmente infinitas.

                var idMaker = function *(n) {
                        var i = 0;

                        // FIX: ¿De qué manera se prodría mejorar este código para no repetir dos veces
                        // casi exactamente el mimso bucle
                        if (n) {
                                while (i < n) {
                                        yield i;
                                        i++;
                                }
                        } else {
                                while (true) {
                                        yield i;
                                        i++;
                                }
                        }

                };

                let id;

                for (id of idMaker(3)) {
                        console.log(id);
                }

                let idGenerator = idMaker();

                console.log(idGenerator.next());
                console.log(idGenerator.next());
                console.log(idGenerator.next());
                console.log(idGenerator.next());
                console.log(idGenerator.next());
                console.log(idGenerator.next()); // {value: i, done: false}

        };

        app.promiseAsinc = function () {

                // Promesas: enlazar promesas de forma asíncrona (evaluarlas a la vez) vía secuencias

                console.log("}}Comienza la ejecución del método.");

                var sequence = Promise.resolve();

                sequence.then(function () {
                        console.log("  >>Primera Acción: (tardo 3 segundos en terminar)");
                        window.setTimeout(function () {
                                console.log("    >>Primera Acción: Acabé!");
                                return true;
                        }, 3000);
                }).then(function () {
                        console.log("  >>Segunda Acción: (también tardo 2 segundos en acabar)");
                        throw Error("Ay! Que daño!");
                        window.setTimeout(function () {
                                console.log("    >>Segunda Acción: Acabé!");
                                return true;
                        }, 2000);
                }).catch(function (err) {
                        console.log("Se ha producido un error en alguna de las promesas: " + err);
                });

                console.log("}}Finaliza la ejecucióndel método y retorna.");
                return true;
        };

        app.promiseSinc = function () {

                // Promesas: enlazar promesas de forma síncrona y recoger errores
                // Las APIS modernas ya trabajan con promesas, por lo que crear una a mano, como en este ejemplo
                // es raro.

                console.log("}}Comienza la ejecución del método.");

                var sincProm = new Promise(function (resolve, reject) {
                        console.log("    >>Realizando trabajo prometido");

                        if (true) {

                                window.setTimeout(function () {
                                        console.log("    >>Trabajo realizado. Resuelvo la promesa.");
                                        resolve("{\"status\": \"Promesa cumplida\"}");
                                }, 3000);
                        } else {
                                reject(new Error("    Aunque sea un error aquí está lo prometido."));
                        }
                });

                sincProm.then(function (valor) {
                        console.log("  ->Esto retorna la promesa (cuando le ha dado la gana): " + valor);
                        var valorJSON = JSON.parse(valor);
                        return valorJSON;
                }).then(function (valor) {
                        console.log("  ->Ahora el valor está en formato JSON!!");
                }).catch(function (err) {
                        console.log("  ->Parece ser que el valor no era JSON :( " + err);
                });

                console.log("}}Finaliza la ejecución del método y retorna.");
                return true;
        };

        app.arrowOp = function () {

                // Este es un método para crear funciones anónimas pequeñas.
                // (x) crea una función anónima con un parámetro.
                // => retorna la computación de la expresión siguiente

                var arr = [1, 2, 3, 4, 5, 6];
                var trans = arr.map((el) => 2 * el);

                console.log(trans);
        };

        app.getSet = function () {

                // Crear métodos getter y setter de las propiedades de un objeto

                var obj = {
                        set name(n) { this.value = n.trim(); },
                        get name() { return this.value.toUpperCase(); }
                };

                obj.name = "   Icíar   ";
                console.log(obj.name);

        };

        app.plucking = function () {

                // Retornar un array con la propiedad seleccionada de los objetos de un array

                // Intento de explicación de {[prop]: value}
                // -----------------------------------------
                // En el cuerpo de la función se podría haber hecho - var value = arg1[prop]
                // De esta nueva forma se traspasa lógica a los argumentos usando destructuring

                var pluck = function (arr, prop) {
                        return arr.map(function ({[prop]: value}) {

                                return value;
                        });
                };

                var Persona = function (name, age) {
                        this.name = name;
                        this.age = age;
                };

                var p1 = new Persona("Icíar", 1);
                var p2 = new Persona("Cris", 33);
                var p3 = new Persona("Samuel", 32);

                console.log(pluck([p1, p2, p3], "age"));

        };

        app.letItGo = function () {

                // Sustituyendo a var: let y const

                // let block
                // =========
                var i = 0;

                for (let i = i; i < 10; i++) {
                        console.log("Into the loop: " + i);
                }
                console.log("Out of the loop: " + i);

                // const
                // =====
                const pi = 3.14;
                        //pi = 5.6; //-> Error! Es constante merluzo

                const piObj = {
                        name: "pi",
                        value: 3.14
                };

                //piObj = {} //-> Error!
                piObj.value = 4.5;

                console.log(piObj.value);

        };

        app.arrDestructuring = function () {
                // Destructuring
                // =============
                // Crear variables con el contenido de un array

                var [a, b] = [1, 2];
                [a, b] = [b, a];

                var arr = [9, 10];
                var [c, d] = arr;

                // Awesome!
                var [a1, b1, ...rest] = [11, 12, 13, 14];

                console.log(rest);
                console.log(a);
                console.log(d);

                function f() {
                        return [5, 6, 7];
                }

                // se pueden ignorar alguno de los valores devueltos
                var [f, , g] = f();

                console.log(g);

        };

        app.objDestructuring = function () {
                // Destructuring
                // =============
                // Crear variables de propiedades de un objecto

                var obj = {
                        theName: "Sam",
                        theAge: 32
                };
                var {
                        theName,
                        theAge
                } = obj;

                console.log(theName);

                // Crear variables con propiedades profundas de un objeto
                var json = {
                        person: {
                                name: "Icíar",
                                age: 1
                        }
                };

                var {
                        person: {
                                name, age
                        }
                } = json;

                console.log(age);

                // De-destructuring
                // ================
                // Función que devuelve un objeto que añade los parámetros de la función como propiedades

                var newDev = function (name, lang) {
                        return {
                                job: "dev",
                                name,
                                lang
                        };
                };

                console.log(newDev("Cris", "ES").lang);
        };


        //Se exporta la funcionalidad que se desea exponer
        return {
                App: app
        };

}); //Fin requirejs
