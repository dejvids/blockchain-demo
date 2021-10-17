import { BlockStatus } from "./BLockStatus";

export default interface IBlockModel {
    hash: string;
    height: number;
    timestamp: number;
    markleRoot?: string;
    prevBlockHash: string;
    data: string;
    isValid: boolean;
    status: BlockStatus;

    approve():void;
}

