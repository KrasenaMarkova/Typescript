function isNonEmptyStringArray(arg: unknown) : arg is string[] {
    // проверяваме дали нашият аргумент е масив
    //arg.every(el => typeof el === 'string' - така проверяваме типа на всеки елемент дали е string
    return Array.isArray(arg)
         && arg.length >= 1 
         && arg.every(el => typeof el === 'string');
}

let arr: unknown = ['test', '123'];

if (isNonEmptyStringArray(arr)) {
    console.log(arr.length);    // allowed
}