import sha256 from "crypto-js/sha256";
import IBlockModel from "../Block/Model/Block";
import { BlockStatus } from "../Block/Model/BLockStatus";
import Blockchain from "./Blockchain";

export const getLastBlock = (blockchain: Blockchain): IBlockModel => {
    return blockchain.blocks[blockchain.blocks.length - 1];
}

export const setHash = (block: IBlockModel) => {
    block.hash = calcHash(block);
    return block.hash;
}

const calcHash = (block: IBlockModel) => {
    return sha256(block.timestamp.toString() + block.prevBlockHash + block.markleRoot).toString();
}

export const isOriginBLock = (block: IBlockModel): boolean => {
    return block?.height == 1;

}

export const isDraft = (block: IBlockModel): boolean => {
    return block?.status != BlockStatus.Approved;
}

export const verifyHash = (block: IBlockModel): boolean => {
    const calculatedHash = calcHash(block);
    return calculatedHash === block.hash;
}

export const validateBlockchain = (blockchain: Blockchain): number => {
    const blocks = blockchain.blocks;
    
    if(blocks.length <= 1)
        return -1;
    
    let valid = true;
    for(let i = 0; i< blocks.length -1; i++) {
        if(blocks[i+1].hash !== blocks[i].prevBlockHash) {
            return blocks[i].height;
        }
    }

    return -1;
}