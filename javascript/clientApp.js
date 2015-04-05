/*jslint browser: true, devel: true, vars: true, indent: 8, plusplus: true*/
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
                        //this.generatorIterator();
                        //this.generatorAsinc();
                        //this.objDestructuring();
                        //this.arrDestructuring();
                        //this.letItGo();
                        //this.plucking();s
                        //this.getSet();
                        //this.arrowOp();
                        this.future();

                }
        };

        App.future = function () {

                // Continuation Passing Style: CPS: Estilo de programación vía CallBacks.
                // Aquí se explica el concepto de Futuro que permite componer funciones y mantener
                // el flujo bajo contról (no como en CPS).

                function Future() {
                        // Lista de subcriptores pendientes
                        this.slots = [];
                }

                // Notificar terminación (completion)
                Future.prototype.ready = function (slot) {
                        if (this.completed) {
                                slot(this.value);
                        } else {
                                this.slots.push(slot);
                        }
                };

                // Simple utilidad de log
                function logF(f) {
                        f.ready(v => console.log(v));
                }

                Future.prototype.complete = function (val) {

                        // Asegura la inmutabilidad
                        if (this.completed) {
                                throw Error("No se puede completar un Futuro ya completo!");
                        }

                        this.value = val;
                        this.completed = true;

                        // Notificar a subcriptores
                        for (var i = 0, len = this.slots.length; i < len; i++) {
                                this.slots[i](val);
                        }

                        // Liberar todo, no lo necesitaremos más
                        this.slots = null;
                };

                // unit : Value -> Future<Value>
                // NOTE: 'unit' no tiene por qué ser un método de 'Future'...
                Future.unit = function (val) {
                        var fut = new Future();
                        fut.complete(val);
                        return fut;
                };

                logF(Future.unit("Hi now"));

                // delay: (Value, Number) -> Future<Value>
                Future.delay = function (v, millis) {
                        let f = new Future();
                        setTimeout(function () {
                                f.complete(v);
                        }, millis);

                        return f;
                };

                logF(Future.delay("Hola. Han pasado 5 segundos!", 5000));

                // Actualmente las invocaciones vía AJAX devuelven Promesas. Antes devolvían 'undefined'.
                // Ejemplo de uso de Futuros en llamadas AJAX:
                /*
                        // llamadaAjax: (String, Object) -> Future<String>
                        function llamadaAjax (url, opciones) {
                                var f = new Future();
                                $.Ajax(url, opciones, function (valorExito) {
                                        f.complete(valorExito);
                                });

                                return f;
                        }

                        //Añado un subcriptor al Futuro
                        logF(llamadaAjax("http://service", {encoding: "UTF-8"}))

                */
        },

        App.generatorAsinc = function ()  {

                // Generadores: Una vez devuelto el control vía yield a la parte de código desde
                // donde se invocó el .next(), el siguiente .next(value) puede enviar un valor que
                // puede ser recogido (en este caso por la variable 'res') y continuar la ejecución
                // de la función.

                // TODO: La utilidad de esto parece que es la ejecución de código de forma asíncrona
                // pero todavía no he entindido cómo.
                /*
                function request(url) {
                        // this is where we're hiding the asynchronicity,
                        // away from the main code of our generator
                        // `it.next(..)` is the generator's iterator-resume
                        // call
                        makeAjaxCall(url, function (response) {
                                it.next(response);
                        });
                        // Nota: nothing returned here!
                }

                function* main() {
                        var result1 =
                                yield request("http://some.url.1");
                        var data = JSON.parse(result1);

                        var result2 =
                                yield request("http://some.url.2?id=" + data.id);
                        var resp = JSON.parse(result2);
                        console.log("The value you asked for: " + resp.value);
                }

                var it = main();
                it.next(); // get it all started*/

        };

        App.generatorIterator = function () {

                // Generadores: Funciones que devuelven vía 'yield' y quedan en ese punto
                // en Standby hasta que se vuelve a invocar en un 'for of' o .next()
                // Esto posibilita la creación de lista muy grandes o potencialmente infinitas.

                var idMaker = function* (n) {
                        var i = 0;

                        // FIX: ¿De qué manera se prodría mejorar este código para no repetir dos veces
                        // casi exactamente el mimso bucle
                        if(n) {
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

                for (var id of idMaker(3)) {
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

        App.promiseAsinc = function () {

                // Promesas: enlazar promesas de forma asíncrona (evaluarlas a la vez) vía secuencias

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

                // Promesas: enlazar promesas de forma síncrona y recoger errores
                // Las APIS modernas ya trabajan con promesas, por lo que crear una a mano, como en este ejemplo
                // es raro.

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
