import { Room } from "./contracts/room.js";
import { RoomNumbers } from "./utilTypes.js";

export class Apartment implements Room {
    public readonly roomNumber;
    protected _price!: number;
    protected _numberOfGuests: number;

    constructor(price: number, roomNumber: RoomNumbers, numberOfGuests: number) {
        this._price = price;
        this.roomNumber = roomNumber;
        this._numberOfGuests = numberOfGuests;
    }

    public get totalPrice(): number {
        return this._price * this._numberOfGuests;
    }

    public get cancellationPrice(): number {
        return (this._price * this._numberOfGuests) * 0.8
    }
}