/*jslint browser: true, devel: true, vars: true, indent: 8*/
/*global define*/

/*
 * Codemotion Madrid 2014
 * Charla: Lo que la cafeína le hizo a JS. by Sergio Arbeo
 * Vídeo:  https://www.youtube.com/watch?v=Wdt7lYxvQm8
 */

define([], function () {
        "use strict";

        var App = {
                init: function () {
                        //this.promiseSinc();
                        //this.promiseAsinc();
                        //this.objDestructuring();
                        //this.arrDestructuring();
                        //this.letItGo();
                        //this.plucking();s
                        //this.getSet();
                        //this.arrowOp();

                }
        };

        App.promiseAsinc = function () {

                //Promesas: enlazar promesas de forma asíncrona (evaluarlas a la vez) vía secuencias

                console.log("Comienza la ejecución del método.");

                var sequence = Promise.resolve();

                sequence.then(function() {
                        console.log(">>Primera Acción: (tardo 3 segundos en terminar.");
                        window.setTimeout(function () {
                                console.log(">>Primera Acción: Acabé!")
                                return true;
                        }, 3000);
                }).then(function () {
                        console.log(">>Segunda Acción: (también tardo 2 segundos en acabar)");
                        window.setTimeout(function () {
                                console.log(">>Segunda Acción: Acabé!")
                                return true;
                        }, 2000);
                });

                console.log("Finaliza la ejecucióndel método y retorna.");
                return true;
        };

        App.promiseSinc = function () {

                //Promesas: enlazar promesas de forma síncrona y recoger errores

                console.log("Comienza la ejecución del método.");

                var sincProm = new Promise (function (resolve, reject) {
                        console.log(">> Realizando trabajo prometido");

                        if(true) {

                                window.setTimeout(function () {
                                        console.log(">>Trabajo realizado. Resuelvo la promesa.");
                                        resolve("{\"status\": \"Promesa cumplida\"}");
                                }, 3000);
                        } else {
                                 reject(new Error("Aunque sea un error aquí está lo prometido."));
                        }
                });

                sincProm.then(function(valor) {
                        console.log("->Esto retorna la promesa (cuando le ha dado la gana): " + valor);
                        var valorJSON = JSON.parse(valor);
                        return valorJSON;
                }).then(function(valor) {
                        console.log("->Ahora el valor está en formato JSON!!");
                }).catch(function () {
                        console.log("->Parece ser que el valor no era JSON :(");
                });

                console.log("Finaliza la ejecucióndel método y retorna.");
                return true;
        };

        App.arrowOp = function () {

                // Este es un método para crear funciones anónimas pequeñas.
                // (x) crea una función anónima con un parámetro.
                // => retorna la computación de la expresión siguiente

                var arr = [1, 2, 3, 4, 5, 6];
                var trans = arr.map((el) => 2*el);

                console.log(trans);
        };

        App.getSet = function () {

                // Crear métodos getter y setter de las propiedades de un objeto

                var obj = {
                        set name(n) { this.value = n.trim(); },
                        get name() { return this.value.toUpperCase(); }
                };

                obj.name = "   Icíar   ";
                console.log(obj.name);

        };

        App.plucking = function () {

                // Retornar un array con la propiedad seleccionada de los objetos de un array

                // Intento de explicación de {[prop]: value}
                // -----------------------------------------
                // En el cuerpo de la función se podría haber hecho - var value = arg1[prop]
                // De esta nueva forma se traspasa lógica a los argumentos usando destructuring

                var pluck = function (arr, prop) {
                        return arr.map(function ({[prop]: value} ) {

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

        App.letItGo = function () {

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
                const pi = 3.14
                        //pi = 5.6; //-> Error! Es constante merluzo

                const piObj = {
                        name: "pi",
                        value: 3.14
                }

                //piObj = {} //-> Error!
                piObj.value = 4.5;

                console.log(piObj.value);

        };

        App.arrDestructuring = function () {
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

        App.objDestructuring = function () {
                // Destructuring
                // =============
                // Crear variables de propiedades de un objecto

                var obj = {
                        theName: 'Sam',
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
                                name: 'Icíar',
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
                        }
                };

                console.log(newDev("Cris", "ES").lang);
        };






        //Se exporta la funcionalidad que se desea exponer
        return {
                "App": App
        };

}); //Fin requirejs