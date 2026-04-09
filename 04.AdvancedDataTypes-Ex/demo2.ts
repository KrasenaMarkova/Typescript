import { Person } from "./demo";

let person = new Person('Pesho', 20);

function printName(person: Person) {
    console.log(person.name);
}


printName(person);
