function operator(
    param: string | number | string[],
    operator: 'Index' | 'Length' | 'Add',
    operand: number) {

    if (operator === 'Index' && typeof param !== 'number') {
        return param[operand];
    }

    if (operator === 'Length' && typeof param !== 'number') {
        return param.length % operand;
    }

    if (operator === 'Add' && !Array.isArray(param)) {
        return Number(param) + operand;
    }
}

console.log(operator(['First', 'Second', 'Third'], 'Index', 1));
console.log(operator('string', 'Index', 1));
console.log(operator(['Just', 'Two'], 'Length', 5));
console.log(operator('short string1', 'Length', 5));
console.log(operator('7', 'Add', 3));