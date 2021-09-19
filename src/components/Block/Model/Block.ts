import sha256 from 'crypto-js/sha256';

export default interface IBlockModel{
    hash:string,
    height: number,
    timestamp: number,
    markleRoot: string,
    prevBlockHash: string,
    data:string
}
