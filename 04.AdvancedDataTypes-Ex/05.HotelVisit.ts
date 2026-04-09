// function visitFloor(floor:
//     { number: 1, hallway: 'A', train:() => void, pass: 'Guest' } |
//     { number: 1, hallway: 'C', train:() => void } |
//     { number: 1, hallway: 'A', train:() => void } |
//     { number: 2, hallway: 'A', dine: () => void, } |
//     { number: 2, hallway: 'A', dine: () => void, pass: 'Guest' } |
//     { number: 2, hallway: 'C', dine: () => void, } |
//     { number: 3, hallway: 'C', sleep:() => void} |
//     { number: 3, hallway: 'A', sleep:() => void }
// ) {
//     switch (floor.number) {
//         case 1: floor.train(); return;
//         case 2: floor.dine(); return;
//         case 3: floor.sleep(); return;
//     }
// }

type gym = {number: 1, train: () => void} & ({hallway: 'A', pass?: 'Guest'} | {hallway: 'C'});
type restorant = {number: 2, dine: () => void} & ({hallway: 'A', pass?: 'Guest'} | {hallway: 'C'});
type hotel = {number: 3, sleep: () => void, hallway: 'A' | 'C'};
type simplified = gym | restorant | hotel;



function visitFloor(floor: simplified) {
    switch (floor.number) {
        case 1: floor.train(); return;
        case 2: floor.dine(); return;
        case 3: floor.sleep(); return;
    }
}


// these calls should work:
visitFloor({ train() { }, number: 1, hallway: 'A', pass: 'Guest' });
visitFloor({ dine() { }, number: 2, hallway: 'A' });
visitFloor({ sleep() { }, number: 3, hallway: 'C' });
visitFloor({ train() { }, number: 1, hallway: 'C' });
visitFloor({ train() { }, number: 1, hallway: 'A' });
visitFloor({ dine() { }, number: 2, hallway: 'A', pass: 'Guest' });
visitFloor({ sleep() { }, number: 3, hallway: 'A' });
visitFloor({ dine() { }, number: 2, hallway: 'C' });

//And all of these calls should be marked as TypeScript errors:
visitFloor({ train() { }, number: 4, hallway: 'A' });
visitFloor({ train() { }, number: 1, hallway: 'C', pass: 'Guest' });
visitFloor({ train() { }, number: 2, hallway: 'A' });
visitFloor({ train() { }, number: 3, hallway: 'C' });
visitFloor({ train() { }, number: 3, hallway: 'C', pass: 'Guest' });

visitFloor({ dine() { }, number: 1, hallway: 'A' });
visitFloor({ dine() { }, number: 1, hallway: 'B' });
visitFloor({ dine() { }, number: 1, hallway: 'C' });
visitFloor({ dine() { }, number: 3, hallway: 'C' });
visitFloor({ dine() { }, number: 2, hallway: 'C', pass: 'Guest' });
visitFloor({ dine() { }, number: 1, hallway: 'A', pass: 'Guest' });

visitFloor({ sleep() { }, number: 3, hallway: 'D' });
visitFloor({ sleep() { }, number: 4, hallway: 'C' });
visitFloor({ sleep() { }, number: 1, hallway: 'C' });
visitFloor({ sleep() { }, number: 1, hallway: 'A' });
visitFloor({ sleep() { }, number: 2, hallway: 'A' });
visitFloor({ sleep() { }, number: 2, hallway: 'C' });
