import { AirconditionedRoom } from "./contracts/airconditionedRoom.js";
import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel.js";

export function decorator1(constructor: Function) {
    return class extends (constructor as { new(...args: any[]): AirconditionedRoom }) {
        constructor(...args: any[]) {
            args[0] = args[0] * 1.2;
            super(...args);
        }
    }
}


// alternative to changing price in constructor - change return value for getter totalPrice
export function decorator2(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // let getter = descriptor.get!;
    // descriptor.get = function () {
    //     let result = getter.call(this);
    //     let modifiedResult = 1.20 * result;
    //     return modifiedResult;
    // }
}

// alternative to changing price in constructor - change return value for getter cancellationPrice
export function decorator3(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // let getter = descriptor.get!;
    // descriptor.get = function () {
    //     let result = getter.call(this);
    //     let modifiedResult = 1.20 * result;
    //     return modifiedResult;
    // }
}

// parameters decorators cannot be used for changing parameter value, thus this decorator is useless for the task
export function decorator4(target: Object, propertyKey: string | symbol, parameterIndex: number) { }


// using type intersection to assert static properties
export function decorator5<T extends (abstract new(...args: any[]) => PartialMonthlyMotel) & {MotelName: string}>(constructor: T) {
    constructor.MotelName = 'Monthly Motel';
}

// alternative solution - Override class definition by extending the class and hiding the property using overriding
// export function decorator5<T extends (abstract new (...args: any[]) => {})>(constructor: T) {
//     abstract class Anonymous extends constructor {
//         public static readonly MotelName = 'Monthly Motel';
//     }

//     return Anonymous;
// }


// alternative solution - type assertion
// export function decorator5<T extends (abstract new(...args: any[]) => {})>(constructor: T) {
//     (<{MotelName: string}><unknown>constructor).MotelName = 'Monthly Motel';
// }

