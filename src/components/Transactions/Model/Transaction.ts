import { SHA256 } from "crypto-js";

export default class Transaction {
    hash: string;
    from: string;
    to: string;
    amount: number;

    constructor(from: string, to: string, amount: number) {
        this.from = from
        this.to = to
        this.amount = amount
        this.hash = SHA256(from + to + amount.toString()).toString()
    }
}