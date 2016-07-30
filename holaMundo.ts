
var hola:string;

function setHola (name:string):void{
  this.hola = "Hola " + name;
}

function getHola ():string{
  console.log(this.hola);
  return this.hola;
}

console.log(hola);
