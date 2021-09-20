import sha256 from "crypto-js/sha256";
import IBlockModel from "../Block/Model/Block";
import Blockchain from "./Blockchain";

export const getLastBlock = (blockchain: Blockchain): IBlockModel => {
    return blockchain.blocks[blockchain.blocks.length - 1];
}

export const setHash = (block: IBlockModel) => {
    block.hash = sha256(block.timestamp.toString() + block.prevBlockHash + block.markleRoot).toString();
    return block.hash;
}

export const isOriginBLock = (block: IBlockModel): boolean => {
    return block?.height == 1;

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