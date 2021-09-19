import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Block from '../Block/Block';
import Blockchain from './Blockchain';
import IBlockModel from '../Block/Model/Block';
import './Home.css';
import BlockModel from '../Block/Model/BlockModel';
import Footer from '../Footer/Footer';

const data = require('../../data.json');

const originBLock: BlockModel = data.originBlock;


const Home: React.FC = () => {
  const defaultBlockChain: Blockchain = {
    blocks: [
      originBLock
    ]
  }
  const [blockchain, setBlockchain] = useState<Blockchain>(defaultBlockChain);

  useEffect(() => {

  }, []);

  const onAddClicked = () => {
    const newBlock = new BlockModel(blockchain.blocks[0].height + 1, Date.now(), blockchain.blocks[0].hash, '');
    console.log(blockchain.blocks[0]);

    const newBlockchain: Blockchain = { ...blockchain, blocks: [newBlock, ...blockchain.blocks] };
    setBlockchain(newBlockchain);
  };

  const onBlockUpdate = (newBlock: IBlockModel) =>{
    console.log(newBlock.data);

    const newBLockChain: Blockchain = {...blockchain, blocks: [...blockchain.blocks]};
    newBLockChain.blocks[blockchain.blocks.length - newBlock.height] = newBlock;
    setBlockchain(newBLockChain);
  }

  return (
    <div className={styles.container}>
      <button className="btn-add" onClick={onAddClicked}>Add</button>
      <ul>
        {blockchain.blocks.map((value, id) => {
          return (<Block key={id} blockModel={value} onBlockUpdate={onBlockUpdate}/>);
        })}
      </ul>
    </div>
  );
};

export default Home;
