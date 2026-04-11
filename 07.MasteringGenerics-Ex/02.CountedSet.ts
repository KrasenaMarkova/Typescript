interface CountedSet<T> {
    add(item:T): void;
    remove(item: T): void;
    contains(item: T): boolean;
    getNumberOfCopies(item: T): number;
}

class CountedSet<T> implements CountedSet<T> {
    private items: Map<T, number> = new Map();

    add(item: T): void {
        // ако item вече е в мапа ще получим бройката, а ако няма ще ни върне undifined
        const currentCount = this.items.get(item);

        // ако имаме items
        if (currentCount) {
            // вземаме текущият item и му сетваме стойноста с +1
            this.items.set(item, currentCount + 1);
        } else {
            this.items.set(item, 1);
        }
    }

    remove(item: T): void {
         // ако item вече е в мапа ще получим бройката, а ако няма ще ни върне undifined
        const currentCount = this.items.get(item);

        // ако имаме items
        if (currentCount) {
            // вземаме текущият item и му намалим стойноста с -1
            this.items.set(item, currentCount - 1);
        } 
    }

    contains(item: T): boolean {
         // ако item вече е в мапа ще получим бройката, а ако няма ще ни върне undifined
        const currentCount = this.items.get(item);

        // currentCount да го има в сета и да е по-голяма от нула
        // ако двете условия са спазени ще върне TRUE
        return currentCount !== undefined && currentCount > 0
    }

    getNumberOfCopies(item: T): number {
        // оператора ?? връща 0, ако зададеното условие е undifined или 0
        return this.items.get(item) ?? 0;
    }
}

let countedSet = new CountedSet<string>();
countedSet.add('test');
countedSet.add('test');
console.log(countedSet.contains('test'));
console.log(countedSet.getNumberOfCopies('test'));
countedSet.remove('test')
countedSet.remove('test')
countedSet.remove('test')
console.log(countedSet.getNumberOfCopies('test'));
console.log(countedSet.contains('test'));


// let codesCounterSet = new CountedSet<200 | 301 | 404 | 500>();
// codesCounterSet.add(404);
// codesCounterSet.add(200);
// console.log(codesCounterSet.contains(404));
// console.log(codesCounterSet.getNumberOfCopies(200));

// codesCounterSet.add(205);   //TS Error
// codesCounterSet.getNumberOfCopies(350);    //TS Error

