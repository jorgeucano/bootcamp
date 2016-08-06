"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var BlogPageComponent = (function () {
    function BlogPageComponent(af) {
        this.afi = af;
        this.posts = this.afi.database.list('/POSTS');
    }
    BlogPageComponent.prototype.ngOnInit = function () {
    };
    BlogPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-blog-page',
            templateUrl: 'blog-page.component.html',
            styleUrls: ['blog-page.component.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], BlogPageComponent);
    return BlogPageComponent;
}());
exports.BlogPageComponent = BlogPageComponent;
/*
  VAMOS A CREAR DATA :D
const itemObservable = this.afi.database.list('/POSTS');
itemObservable.push(
  {
    id: 1,
    title : "Angular 2, arrancar ahora?",
    subtitle: "Como todos ya sabemos Angular 2 se anunció pero todavía está en beta (al día de hoy beta.3)...",
    by: "Jorge Cano",
    body: `Como todos ya sabemos Angular 2 se anunció pero todavía está en beta (al día de hoy beta.3), y varias personas me preguntaron si valía la pena ya meterse en angular o esperar a que salga la versión final (esperemos que esté pronto).
            La verdadera respuesta, es que depende de cada uno, no trabajo en el equipo del core de Angular2, va ni siquiera trabajo en google, así que no podría decir cuanto más van a cambiar y cuando va a salir la versión final, PERO, si de algo estoy seguro es que vale la pena arrancar a trabajar con este hermoso Framework que a pesar de ser genial se re-inventó.
            Estás seguro?
            Sí, muchos de nosotros utilizamos NODE cuando no era una versión estable, discutimos con gente de que node se tenía que utilizar, y no estaba en versión final por un tema de tiempos… Con Angular2 creo que pasa algo parecido.
            Tenemos que pensar que los amigos de google, mejor dicho los cracks que trabajan en el core de Angular2, re-escribieron todo con Typescript, y cambiaron todo el tipo de modelado que tenía angular 1, si este era genial e hicieron esto, es porque andan con algo mejor entre manos.
            Qué es lo nuevo?
            Arranquemos porque Angular 2 está escrito de pies a cabeza en Typescript, esto nos permite todavía ser mas profesionales en nuestros frontends, si lo se siempre menciono esto, recuerden que yo hacía backend hace muchos años (de hecho lo sigo haciendo).
            Gracias a typescript vamos a poder tipificar variables, crear interfaces y clases… Unos dirán que son cosas aburridas y que en el frontend no se necesitan porque la lógica va en el backend, ahora yo retruco eso con el siguiente pensamiento…
            Si tenemos una base de datos no relacional, como por ejemplo FIREBASE, no necesitamos un backend o middleware, para que si desde firebase podemos hacer lo que necesitamos. Entonces, la lógica está en el frontend del funcionamiento y el backend+DDBB directamente es firebase, la cual podemos consumir y traer y filtrar los datos que necesitamos tranquilamente.
            En el caso de que no nos guste Firebase, tenemos otros ejemplos como mongodb o redis o muchas más, que nos dejan poner funciones.
            EMACScript6 es otra de las ventanas (la nueva versión de javascript), entonces tenemos nuevos operadores =>, let , const , entre otros, los cuales nos permitirán mejorar algunas cosas a lo largo de nuestras aplicaciones.
            Retro-Compatibilidad, en mi caso, mi manera de aprender nuevas tecnologías/frameworks/librerías es bajando los fuentes, entrando a la web oficial, leyendo las API’s y buscando toda la información posible, para poder empezar a probar cosas… PERO no siempre uno tiene todo el tiempo para poder hacer esto, muchas veces, hay cosas que queman o se necesitan hacer super rápido, por lo tanto algo bueno es la retro-compatibilidad de Angular2 que quiere decir esto, que podemos usar, versiones que ya venimos utilizando. Esto quiere decir que podemos usar EMACScript5 (la versión de javascript que venimos utilizando), DART, CoffeeScript o algún otro lenguaje que compile a Javascript.
            Inyección de dependencias Jerárquicas, otra vez parece que estamos hablando de JAVA o cosas de los backends nuevamente, pero esto realmente es importante a la hora de trabajar en plataformas de gran escalabilidad y performance, pero que significa todo esto, que podemos modularizar el código y angular va a trabajarlo y consumir lo necesario para que tu aplicación sea escalable.
            Velocidad increíblemente rápida, con Angular2 tenemos hasta 5 veces más de velocidad contra los mejores estandartes de javascript para la detección de cambios (si en tu cara reactjs).
            La forma de trabajar al ser modularizada se hace simple y fácil de trabajar en equipo (esto siempre depende del equipo y como programa la gente).
            Animaciones, API y facilidad de trabajar.
            Y como vivimos en un mundo interconectado, tenemos Internacionalización (traducción / pluralización / reglas de género) como tambien permite convivir con otros frameworks y librerías de punta como Polymer Firebase entre otros.
            Como empezar con Angular 2
            Siempre hay 2 formas de empezar con las tecnologías, leyendo la web oficial o viendo y leyendo tutoriales en internet.
            Para el primer caso tienen La web oficial de Angular 2 en donde arrancan con el quickstart, si saben ingles es mucho mas fácil y si no es hora de aprender porque no con documentación.
            Para el segundo caso, hay que utilizar google, hoy en día como esta en Beta hay tutoriales y cosas que van quedando en las betas anteriores y otros lo van actualizando.
            Yo por mi parte vengo siguiendo todo esto muy de cerca y empecé a escribir un libro, me di cuenta que no iba a poder modificar el libro cuando cambiara algo o que pasaba si no le gustaba a los lectores la forma de escribir o los ejemplos, por lo tanto decidí sacar una serie de tutoriales/post/videos/gits para poder ayudar a quienes tengan ganas de aprender esto.
            Mi próximo post va a ser sobre typescript y un “hola mundo” explicado paso a paso con un git que lo apoye, espero que les guste cada cosa que vaya haciendo y poco a poco generemos un gran proyecto para que toda la comunidad pueda aprovechar.
            En el caso de que quieran contactarse conmigo:
            TW: @jorgeucano
            Si quieren ver los videos que fui haciendo y las charlas que fui dando:
            YouTube: MrJorgeCano (raro lo se, llegue tarde a ponerme el name)
            Si les interesa saber que hago de mi vida laboral:
            LinkedIn: Jorge Cano`
  }
);
*/
//# sourceMappingURL=blog-page.component.js.map