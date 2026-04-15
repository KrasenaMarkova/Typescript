export { };

//Add a class decorator that adds a new property to the instance when creating a new user:
function addCreatedOn(constructor: { new(...args: any[]): User }) {
    return class extends constructor {
        // създаваме още едно пропърти
        createOn = new Date();
    }
}

@addCreatedOn
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayUserInfo(): void {
        console.log(`${this.name}, Age: ${this.age}`);
    }
}

const user1 = new User("John Doe", 30);
user1.displayUserInfo()
console.log(user1);
console.log((user1 as any).createdOn);