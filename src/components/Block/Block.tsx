import React, { FC, useEffect, useState } from 'react';
import BlockItem from '../BlockItem/BlockItem';
import styles from './Block.module.css';
import IBlockModel from '../Block/Model/Block'
import sha256 from 'crypto-js/sha256';
import { isDraft, isOriginBLock, setHash } from '../Home/BlockchainManager';
import './Block.css';
import { BlockStatus } from './Model/BLockStatus';


interface BlockProps {
    blockModel: IBlockModel,
    onBlockUpdate: (block: IBlockModel) => void
}
const Block: React.FC<BlockProps> = ({ blockModel: block, onBlockUpdate: onBlockUpdate }) => {

    // const defaultBlock: IBlockModel = {
    //     height:-1,
    //     hash: '',
    //     markleRoot: '',
    //     data: '',
    //     prevBlockHash: '',
    //     timestamp: 0,
    //     isValid: true
    // }

    const [currentBlock, setCurrentBLock] = useState<IBlockModel>(block);

    const onDataChanged = (value: string) => {
        let updatedBLock: IBlockModel = { ...currentBlock };
        updatedBLock.data = value;
        updatedBLock.markleRoot = sha256(value).toString();
        updatedBLock.hash = setHash(updatedBLock);

        if(updatedBLock.status == BlockStatus.Approved && updatedBLock.hash != currentBlock.hash) {
            updatedBLock = {...currentBlock, data: value, markleRoot: sha256(value).toString()};
        }

        setCurrentBLock(updatedBLock);
        onBlockUpdate(updatedBLock);
    }

    useEffect(() => {
        setCurrentBLock(block);
    }, [block]);

    const formatDate = (date: Date) => {
        let stringDate = date.toLocaleDateString();

        stringDate += ' ' + date.getUTCHours().toString() + ':' + date.getUTCMinutes();

        return stringDate;
    }

    const approve = () => {
        let approvedBlock = { ...currentBlock, status: BlockStatus.Approved }
        setCurrentBLock(approvedBlock);
        onBlockUpdate(approvedBlock);
    }

    return (
        <div className={`block ${currentBlock.status == BlockStatus.Approved ? "block-approved" : ""} ${!currentBlock.isValid ? "invalid" : ""}`}>
            {isOriginBLock(block) && <span>Origin block</span>}
            {isDraft(currentBlock) && <div><span>(Draft)</span> <button className="btn" onClick={approve}>Approve</button></div>}
            <BlockItem label="Height:" value={currentBlock.height.toString()} disabled={false} />
            <BlockItem label="Hash:" value={currentBlock.hash} />
            <BlockItem label="Timestamp:" value={currentBlock.timestamp.toString()} />
            <BlockItem label="Date:" value={formatDate(new Date(currentBlock.timestamp))} />
            <BlockItem label="Data:" value={currentBlock.data} onValueChange={onDataChanged} />
            {/* <BlockItem label="Merkle root:" value={currentBlock.markleRoot} /> */}
            <BlockItem label="Prev. block:" value={currentBlock.prevBlockHash} />
        </div>);
}

export default Block;