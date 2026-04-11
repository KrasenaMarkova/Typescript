enum TravelVacation {
    Abroad = 'Abroad',
    InCountry = 'InCountry'
}

enum MountainVacation {
    Ski = 'Ski',
    Hiking = 'Hiking'
}

enum BeachVacation {
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving'
}

interface Holiday {
    set start(val: Date);
    set end(val: Date);
    getInfo(): string;
}

interface VacationManager<T, V> {
    reserveVacation(holiday: T, vacationType: V): void;
    listReservations(): string;
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor(startDate: Date, endDate: Date) {
        this.start = startDate;
        this.end = endDate;
    }

    //sets the start date of the holiday – if the start date is after the end date throw and error
    set start(val: Date) {
        if (val > this._end) {
            throw new Error('Start date cannot be after end date');
        }

        this._start = val;
    }

    //sets the end date of the holiday – if the end date is before the start date throw and error
    set end(val: Date) {
      if (val < this._start) {
            throw new Error('End date cannot be before start date');
        }

        this._end = val;
    }

    //returns info about the holiday in the following format `Holiday: {startDate in format d/m/yyyy} - {endDate in format d/m/yyyy }`
     getInfo(): string {
        // 1. this._start.getMonth() + 1} тъй като месеците ги индексира започвайки от 0 добавяме +1, за да започне от 1
        // 1. 
        return `Holiday: ${this._start.getDate()}/${this._start.getMonth() + 1}/${this._start.getFullYear()} - ${this._end.getDate()}/${this._end.getMonth() + 1}/${this._end.getFullYear()}`;
    }
}

class HolidayManager<T extends Holiday, V extends TravelVacation | MountainVacation | BeachVacation> implements VacationManager<T, V> {
    private holidays: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V): void {
        this.holidays.set(holiday, vacationType);
    }

    listReservations(): string {
        let result: string[] = [];

        // 1.взимаме си ентритата на мапа и ги превръщаме в обикновен масив
        // 2. за всяко entry добавяме... 
        Array.from(this.holidays.entries()).forEach(entry => {
            result.push(`${entry[0].getInfo()} => ${entry[1]}`)
        });

        return result.join('\n');
    }
}

let holiday = new PlannedHoliday(new Date(2024, 1, 1), new Date(2024, 1, 4));
let holiday2 = new PlannedHoliday(new Date(2025, 3, 14), new Date(2025, 3, 17));
let holidayManager = new HolidayManager<Holiday, TravelVacation>();
holidayManager.reserveVacation(holiday, TravelVacation.Abroad);
holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);
console.log(holidayManager.listReservations())

