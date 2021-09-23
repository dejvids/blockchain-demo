import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Block from '../Block/Block';
import Blockchain from './Blockchain';
import IBlockModel from '../Block/Model/Block';
import './Home.css';
import BlockModel from '../Block/Model/BlockModel';
import Footer from '../Footer/Footer';
import { setHash, validateBlockchain } from './BlockchainManager';
import sha256 from 'crypto-js/sha256';
import MainToolbar from '../MainToolbar/MainToolbar'

const data = require('../../data.json');

const originBLock: BlockModel = data.originBlock;


const Home: React.FC = () => {
  setHash(originBLock);
  originBLock.markleRoot = sha256(originBLock.data).toString();
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


    const newBlockchain: Blockchain = { ...blockchain, blocks: [newBlock, ...blockchain.blocks] };

    updateBlckStatus(newBlockchain, newBlock.height);
    setBlockchain(newBlockchain);
  };

  const onBlockUpdate = (newBlock: IBlockModel) => {
    const newBlockchain: Blockchain = { ...blockchain, blocks: [...blockchain.blocks] };
    newBlockchain.blocks[blockchain.blocks.length - newBlock.height] = newBlock;

    updateBlckStatus(newBlockchain, newBlock.height);
    setBlockchain(newBlockchain);
  }

  const onClearClicked = () => {
    let newBlockchain = { ...blockchain, blocks: [originBLock] }

    setBlockchain(newBlockchain);
  }

  const onPopClicked = () => {
    if(blockchain.blocks.length <=1)
      return;
      
    let blocks = blockchain.blocks.splice(1);

    let newBlockchain = {...blockchain, blocks: blocks}
    setBlockchain(newBlockchain);
  }

  const updateBlckStatus = (bc: Blockchain, blockHeight: number) => {
    let i = bc.blocks.indexOf(bc.blocks.filter(x => x.height == blockHeight)[0])

    while (i > 0) {
      bc.blocks[i - 1].isValid = bc.blocks[i - 1].prevBlockHash === bc.blocks[i].hash && bc.blocks[i].isValid;
      i--;
    }

    if (i == 0 && bc.blocks.length > 1) {
      bc.blocks[i].isValid = bc.blocks[0].prevBlockHash == bc.blocks[1].hash && bc.blocks[1].isValid;
    }
  }

  return (
    <div className={styles.container}>
      <MainToolbar addBtnClicked={onAddClicked} popBtnClicked={onPopClicked} clearBtnClicked={onClearClicked}/>
      <ul>
        {blockchain.blocks.map((value, id) => {
          return (
            <div>
            
           {/* <svg height="200" width="200">
            <line x1="0" y1="0" x2="100" y2="100" stroke="red" stroke-width="2"/>
          </svg> */}
            <Block key={id} blockModel={value} onBlockUpdate={onBlockUpdate} />
          </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
