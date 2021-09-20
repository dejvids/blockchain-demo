export default interface IBlockModel {
    hash: string,
    height: number,
    timestamp: number,
    markleRoot: string,
    prevBlockHash: string,
    data: string
    isValid: boolean
}
