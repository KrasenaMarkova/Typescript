function multiply(
    param1?: string | number,
    param2?: string | number,
    param3?: string | number) {

// Ако лявото е undefined върни дясното
// let num1 = param1 ?? Number(param1);

// ако е undefined ми връща 1, ако не е обръщаме параметъра в число, тъй като може по условие да ни се подаде и string
    let num1 = param1 == undefined ? 1 : Number(param1);
    let num2 = param2 == undefined ? 1 : Number(param2);
    let num3 = param3 == undefined ? 1 : Number(param3);

    return num1 * num2 * num3;
}

console.log(multiply('3', 5, '10'));
console.log(multiply('2','2'));
console.log(multiply(undefined, 2, 3));
console.log(multiply(7, undefined, '2'));
console.log(multiply());