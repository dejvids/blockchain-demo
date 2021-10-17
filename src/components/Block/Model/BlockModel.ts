import sha256 from "crypto-js/sha256";
import { setHash } from "../../Home/BlockchainManager";
import IBlockModel from "./Block";
import { BlockStatus } from "./BLockStatus";

export default class BlockModel implements IBlockModel {
    
    hash: string;
    height: number;
    timestamp: number;
    markleRoot: string;
    prevBlockHash: string;
    data: string;
    isValid: boolean;
    status: BlockStatus = BlockStatus.Draft;

    constructor(height: number, timestamp: number, prevBlockHash: string, data: string) {
        this.height = height;
        this.timestamp = timestamp;
        this.prevBlockHash = prevBlockHash;
        this.data = data;
        this.markleRoot = sha256(data).toString();
        //this.hash = sha256(this.timestamp.toString() + this.prevBlockHash + this.markleRoot).toString();
        this.isValid = true;
        this.status = BlockStatus.Draft;
        this.hash = setHash(this);
    }

    approve():void {
        console.log('Approve');
        this.status = BlockStatus.Approved;
    }
}
