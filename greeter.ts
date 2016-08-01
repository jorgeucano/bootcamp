class Hero {
  id: number;
  name: string;
}

class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};

class Heroes{
  constructor (public heroe: Hero){ }
  callHeroe(){
    return "<h1>" + this.heroe.id +" "+this.heroe.name+"</h1>";
  }
}

var greeter = new Greeter("Hello, world!");

var hero = new Heroes({ id: 1, name: 'Windstorm'});

document.body.innerHTML = greeter.greet();
document.body.innerHTML = hero.callHeroe();
