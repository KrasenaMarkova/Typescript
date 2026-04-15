// добавяме го за да може да имаме класове с едно и също име
// създаваме и packages.json с следново съдържание 
// {
//     "type": "modyle"
// }
export { };

//•	set name – should validate that the length of the name is at least minLength characters long, 
// where minLength is a parameter of the decorator factory
function validateName(minLength: number) {
    return function (target: any, propName: string, descriptor: PropertyDescriptor) {
        // взимаме си оргиналният сетър
        const originalSetter = descriptor.set;

        // променяме сетъра
        descriptor.set = function (val: string) {
            if (val.length < minLength) {
                throw new Error(`name must have a min length of ${minLength} characters`);
            }

            originalSetter?.call(this, val);
        }

        return descriptor;
    }
}

//•	set age – should validate that the age is between [min…max] where min and max are parameters of the decorator factory
function validateAge(min: number, max: number) {
    return function (target: any, propName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (val: number) {
            if (val < min || val > max) {
                throw new Error(`age must be between ${min} and ${max}`);
            }

            originalSetter?.call(this, val);
        }

        return descriptor;
    }
}

// • set password – should validate that the password matched a given regex 
// where the regex is a parameter of the decorator factory
function validatePassword(pattern: RegExp) {
    return function (target: any, propName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (val: string) {
            if (!val.match(pattern)) {
                throw new Error(`password needs to match ${pattern}`);
            }

            originalSetter?.call(this, val);
        }

        return descriptor;
    }
}

class User {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor(name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    // тези стойности ги вземаме от примера, който ни е подаден
    //// minLength = 1
    // min = 1, max = 150
    // regex = /^[a-zA-Z0-9!@]+$/g
    // като за всеки пример трябва да се актуализират
    @validateName(1)
    set name(val: string) { this._name = val; }

    // тези стойности ги вземаме от примера, който ни е подаден
    // като за всеки пример трябва да се актуализират
    @validateAge(1, 150)
    set age(val: number) { this._age = val; }

    // тези стойности ги вземаме от примера, който ни е подаден
    // като за всеки пример трябва да се актуализират
   @validatePassword(/^[a-zA-Z0-9!@]+$/g)
    set password(val: string) { this._password = val; }

    get name() { return this._name; }
    get age() { return this._age; }
}

let user = new User('John', 130, 'hardPassword12');
let user2 = new User('John', 30, '!test');
let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');

