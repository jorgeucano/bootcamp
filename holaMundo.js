//primitivas
var name = "Jorge";
var age = 27;
var live = true;
//arrays
var skills = ['Developer', 'Architect Web', 'Teacher'];
var skillsagain = ['Developer', 'Architect Web', 'Teacher'];
var skillnumber = [1, 2, 3, 4];
var skillsnumberagain = [1, 2, 3, 4];
//enums
var Role;
(function (Role) {
    Role[Role["Employee"] = 0] = "Employee";
    Role[Role["Manager"] = 1] = "Manager";
    Role[Role["Admin"] = 2] = "Admin";
})(Role || (Role = {}));
;
//any
var something = 'now as string';
function setHola(name) {
    this.hola = "Hola " + name;
}
function getHola() {
    console.log(this.hola);
    return this.hola;
}
function getSomething(data) {
    console.log(data);
}
