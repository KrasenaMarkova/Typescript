type FunctionKeys<T> = {
    // ще минем през всек ключ от ключовете на Т, ще проверим типа на клютовете
    // ако T от К екстендва функциите ще запазя ключа
    // в противен случай запазвам never
    [K in keyof T]: T[K] extends Function ? K : never;

    // връща ни имета на функционалните ключове
}[keyof T];

type AllFunctions<T> = Pick<T, FunctionKeys<T>>;

type test = {
    name: string,
    age: number,
    test: () => string;
    print: () => void;
}
type extracted = AllFunctions<test>