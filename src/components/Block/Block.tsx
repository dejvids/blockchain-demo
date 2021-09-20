import React, { FC, useEffect, useState } from 'react';
import BlockItem from '../BlockItem/BlockItem';
import styles from './Block.module.css';
import IBlockModel from '../Block/Model/Block'
import sha256 from 'crypto-js/sha256';
import BlockModel from './Model/BlockModel';
import { isOriginBLock, setHash } from '../Home/BlockchainManager';
import './Block.css';


interface BlockProps {
    blockModel: IBlockModel,
    onBlockUpdate: (block: IBlockModel)=>void
}
const Block: React.FC<BlockProps> = ({ blockModel: block, onBlockUpdate: onBlockUpdate }) => {

    const defaultBlock: IBlockModel = {
        height:-1,
        hash: '',
        markleRoot: '',
        data: '',
        prevBlockHash: '',
        timestamp: 0,
        isValid: true
    }

    const [currentBlock, setCurrentBLock] = useState<IBlockModel>(block);

    const onDataChanged = (value: string) => {
        let updatedBLock : BlockModel = { ...currentBlock };
        updatedBLock.data = value;
        updatedBLock.markleRoot = sha256(value).toString();
        updatedBLock.hash = setHash(updatedBLock);
    
        setCurrentBLock(updatedBLock);
        onBlockUpdate(updatedBLock);
    }

    useEffect(()=>{
        setCurrentBLock(block);
    },[block]);

    const formatDate = (date: Date) => {
        let stringDate = date.toLocaleDateString();

        stringDate += ' ' + date.getUTCHours().toString() + ':' + date.getUTCMinutes();

        return stringDate;
    }

    return (
        <div className= { `block ${!currentBlock.isValid ? "invalid" : ""}`}>
            { isOriginBLock(block) && <span>Origin block</span>}
            <BlockItem label="Height:" value={currentBlock.height.toString()} disabled={false} />
            <BlockItem label="Hash:" value={currentBlock.hash} />
            <BlockItem label="Timestamp:" value={currentBlock.timestamp.toString()} />
            <BlockItem label="Date:" value={ formatDate(new Date(currentBlock.timestamp))}/>
            <BlockItem label="Data:" value={currentBlock.data} onValueChange={onDataChanged}/>
            {/* <BlockItem label="Merkle root:" value={currentBlock.markleRoot} /> */}
            <BlockItem label="Prev. block:" value={currentBlock.prevBlockHash} />
        </div>);
}

export default Block;