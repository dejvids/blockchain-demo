import sha256 from "crypto-js/sha256";
import IBlockModel from "../Block/Model/Block";
import Blockchain from "./Blockchain";

export const getLastBlock = (blockchain: Blockchain): IBlockModel => {
    return blockchain.blocks[blockchain.blocks.length - 1];
}

export const setHash = (block: IBlockModel) => {
    return sha256(block.timestamp.toString() + block.prevBlockHash + block.markleRoot).toString();
}

export const isOriginBLock = (block: IBlockModel): boolean => {
    return block?.height == 1;

}