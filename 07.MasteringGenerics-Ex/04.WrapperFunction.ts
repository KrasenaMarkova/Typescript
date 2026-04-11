// ако Т extend number тогава типа на входния параметър на функцията също ще е number,
// ако оригиналното Т е различно от number ще е string
type InputParamType<T> = T extends number ? number : string;

function conditionalNumber<T>(value: InputParamType<T>): void {
    if (typeof value === 'number') {
        console.log(value.toFixed(2));
    } else {
        console.log(value);
    }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');

// conditionalNumber<boolean>(30); //TS error: type 'number' is not assignable to parameter of type 'string'
// conditionalNumber<number>('test'); //TS error: type 'string' is not assignable to parameter of type 'number'

