var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    return Greeter;
}());
;
var Heroes = (function () {
    function Heroes(heroe) {
        this.heroe = heroe;
    }
    Heroes.prototype.callHeroe = function () {
        return "<h1>" + this.heroe.id + " " + this.heroe.name + "</h1>";
    };
    return Heroes;
}());
var greeter = new Greeter("Hello, world!");
var hero = new Heroes({ id: 1, name: 'Windstorm' });
document.body.innerHTML = greeter.greet();
document.body.innerHTML = hero.callHeroe();
