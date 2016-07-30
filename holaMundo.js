var hola;
function setHola(name) {
    this.hola = "Hola " + name;
}
function getHola() {
    console.log(this.hola);
    return this.hola;
}
console.log(hola);
