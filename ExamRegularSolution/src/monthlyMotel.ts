import { Motel } from "./contracts/motel.js";
import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel.js";
import { Room } from "./contracts/room.js";
import { Month, RoomNumbers } from "./utilTypes.js";


export class MonthlyMotel<T extends Month> extends PartialMonthlyMotel {
    private budget: number = 0;
    private rooms: Map<RoomNumbers, Room>;
    private bookedRooms: Map<RoomNumbers, T[]>;

    constructor() {
        super();
        this.rooms = new Map<RoomNumbers, Room>();
        this.bookedRooms = new Map<RoomNumbers, T[]>();
    }

    addRoom(room: unknown): string {
        if (this.isRoom(room)) {
            if (this.rooms.has(room.roomNumber)) {
                return `Room '${room.roomNumber}' already exists.`;
            }

            this.rooms.set(room.roomNumber, room);
            this.bookedRooms.set(room.roomNumber, []);
            return `Room '${room.roomNumber}' added.`;
        }

        return 'Value was not a Room.';
    }

    bookRoom(roomNumber: RoomNumbers, bookedMonth: T): string {
        let room = this.rooms.get(roomNumber);
        if (!room) {
            return `Room '${roomNumber}' does not exist.`;
        }

        let roomBookings = this.bookedRooms.get(roomNumber)!;
        if (roomBookings.some(r => r === bookedMonth)) {
            return `Room '${roomNumber}' is already booked for '${bookedMonth}'`;
        }

        let price = room.totalPrice;
        this.budget += price;
        roomBookings.push(bookedMonth);
        return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
    }

    cancelBooking(roomNumber: RoomNumbers, bookedMonth: T): string {
        let room = this.rooms.get(roomNumber);
        if (!room) {
            return `Room '${roomNumber}' does not exist.`;
        }


        let roomBookings = this.bookedRooms.get(roomNumber)!;
        if (!(roomBookings.some(r => r === bookedMonth))) {
            return `Room '${roomNumber}' is not booked for '${bookedMonth}'.`;
        }

        let cancellationPrice = room.cancellationPrice;
        this.budget -= cancellationPrice;
        let filteredRoomBookings = roomBookings.filter(m => m !== bookedMonth);
        this.bookedRooms.set(roomNumber, filteredRoomBookings);
        return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
    }

    getTotalBudget(): string {
        let motelNameString = super.getTotalBudget();
        return `${motelNameString}\nTotal budget: $${this.budget.toFixed(2)}`;
    }

    private isRoom(possibleRoom: unknown): possibleRoom is Room {
        return possibleRoom != null &&
            typeof possibleRoom === 'object' &&
            'roomNumber' in possibleRoom && typeof possibleRoom.roomNumber === 'string' &&
            ['A01', 'A02', 'A03', 'B01', 'B02', 'B03'].includes(possibleRoom.roomNumber) &&
            'totalPrice' in possibleRoom && typeof possibleRoom.totalPrice === 'number' &&
            'cancellationPrice' in possibleRoom && typeof possibleRoom.cancellationPrice === 'number';
    }
}

