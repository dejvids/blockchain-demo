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

  const onBlockUpdate = (newBlock: IBlockModel) =>{
    const newBlockchain: Blockchain = {...blockchain, blocks: [...blockchain.blocks]};
    newBlockchain.blocks[blockchain.blocks.length - newBlock.height] = newBlock;
  
    validate(newBlockchain);
    updateBlckStatus(newBlockchain, newBlock.height);
    setBlockchain(newBlockchain);
  }

  const validate = (bc: Blockchain) => {
     //const validationResult = validateBlockchain(bc);
    // if(validationResult > -1)
    // {
    //   console.log('Invalid blockchain starting from block: ' + validationResult)
    //   let i = 0;
    //   while(bc.blocks[i].height >= validationResult) {

    //     bc.blocks[i].isValid = false;
    //     i++;
    //   }
    // }
  }

  const updateBlckStatus = (bc: Blockchain, blockHeight: number) => {
    let i = bc.blocks.indexOf(bc.blocks.filter(x=>x.height == blockHeight)[0])
    
    while(i >0) {
      bc.blocks[i-1].isValid = bc.blocks[i-1].prevBlockHash === bc.blocks[i].hash && bc.blocks[i].isValid;
      i--;
    }
    
    if(i == 0 && bc.blocks.length > 1) {
      bc.blocks[i].isValid = bc.blocks[0].prevBlockHash == bc.blocks[1].hash && bc.blocks[1].isValid;
    }
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
