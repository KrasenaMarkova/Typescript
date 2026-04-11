//•	K – a type representing the keys to extract from T
type Choose<T, K extends keyof T> = {
    // минаваме през всеки един ключ от К и вземи цялото пропърти от Т
    [Key in K]: T[Key];
}

type anotherType = {
    time: Date,
    duration: number,
    test: () => string,
    val: 200 | 300,
    user: {
        name: string,
        age: number
    }
}

type nestedUserAndTime = 'user' | 'time'
type extracted2 = Choose<anotherType, nestedUserAndTime>


type test = { 
   name: string,
   age: number,
   test:() => string;
}
type extracted = Choose<test, 'name' | 'age'>

