import { Block } from "typescript";
import IBlockModel from "../Block/Model/Block";

export default interface Blockchain {
    blocks: Array<IBlockModel>;
}