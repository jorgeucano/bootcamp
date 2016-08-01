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
function print_result() {
    document.getElementById('result').innerHTML = getHola();
}
function getHola() {
    console.log(this.hola);
    return this.hola;
}
function getSomething(data) {
    console.log(data);
}
// ES5
function iteradores(data) {
    data.forEach(function (iterado) {
        console.log(iterado);
    });
}
// a lo typescript
function iteradores_ts(data) {
    data.forEach(function (iterado) {
        return console.log(iterado);
    });
    ;
}
function iteradores_ts2(data) {
    data.forEach(function (iterado) {
        return console.log(iterado);
    });
    ;
}
