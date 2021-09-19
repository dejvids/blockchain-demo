import sha256 from "crypto-js/sha256";
import IBlockModel from "./Block";

export default class BlockModel implements IBlockModel {

    constructor(height: number, timestamp: number, prevBlockHash: string, data: string) {
        this.height = height;
        this.timestamp = timestamp;
        this.prevBlockHash = prevBlockHash;
        this.data = data;
        this.markleRoot = sha256(data).toString();
        this.hash = sha256(this.timestamp.toString() + this.prevBlockHash + this.markleRoot).toString();
    }
    hash: string;
    height: number;
    timestamp: number;
    markleRoot: string;
    prevBlockHash: string;
    data: string;
}
