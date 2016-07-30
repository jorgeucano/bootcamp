//primitivas
var name:string = "Jorge";
var age:number = 27;
var live:boolean = true;
//arrays
var skills: Array <string> = ['Developer', 'Architect Web', 'Teacher'];
var skillsagain: string[] =  ['Developer', 'Architect Web', 'Teacher'];
var skillnumber: Array<number> = [1,2,3,4];
var skillsnumberagain: number[] =  [1,2,3,4];
//enums
enum Role {Employee, Manager, Admin};
//any
var something:any = 'now as string';

function setHola (name:string):void{
  this.hola = "Hola " + name;
}

function getHola ():string{
  console.log(this.hola);
  return this.hola;
}

function getSomething(data:any):void{
  console.log(data);
}
