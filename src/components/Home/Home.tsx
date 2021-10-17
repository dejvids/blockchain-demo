import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Block from '../Block/Block';
import Blockchain from './Blockchain';
import IBlockModel from '../Block/Model/Block';
import './Home.css';
import BlockModel from '../Block/Model/BlockModel';
import MainToolbar from '../MainToolbar/MainToolbar';
import { BlockStatus } from '../Block/Model/BLockStatus';
import { verifyHash } from './BlockchainManager';

const data = require('../../data.json');

const tempBlock: BlockModel = data.originBlock;


const Home: React.FC = () => {


  let defaultBlockChain: Blockchain = { blocks: [] }
  const [blockchain, setBlockchain] = useState<Blockchain>(defaultBlockChain);
  const [canAdd, setCanAdd] = useState<boolean>(true);

  useEffect(() => {
    let originBlock = new BlockModel(tempBlock.height, Date.now(), tempBlock.prevBlockHash, tempBlock.data);

    originBlock.approve();
    defaultBlockChain = {
      blocks: [
        originBlock
      ]
    };

    setBlockchain(defaultBlockChain);
    setCanAdd(originBlock.status == BlockStatus.Approved);
  }, []);

  const updateActions = (block: IBlockModel) => {
    if(block.isValid && block.status == BlockStatus.Approved) {
      setCanAdd(true);
    }
    else {
      setCanAdd(false);
    }
  }

  const onAddClicked = () => {
    const newBlock = new BlockModel(blockchain.blocks[0].height + 1, Date.now(), blockchain.blocks[0].hash, '');


    const newBlockchain: Blockchain = { ...blockchain, blocks: [newBlock, ...blockchain.blocks] };

    updateBlckStatus(newBlockchain, newBlock);
    setBlockchain(newBlockchain);
    updateActions(newBlock);
  };

  const onBlockUpdate = (newBlock: IBlockModel) => {
    const newBlockchain: Blockchain = { ...blockchain, blocks: [...blockchain.blocks] };
    newBlockchain.blocks[blockchain.blocks.length - newBlock.height] = newBlock;

    updateBlckStatus(newBlockchain, newBlock);
    setBlockchain(newBlockchain);
    updateActions(newBlock);
  }

  const onClearClicked = () => {
    let originBlock = new BlockModel(tempBlock.height, Date.now(), tempBlock.prevBlockHash, tempBlock.data);

    originBlock.approve();
    let newBlockchain = { ...blockchain, blocks: [originBlock] }

    updateActions(originBlock);
    setBlockchain(newBlockchain);
  }

  const onPopClicked = () => {
    if (blockchain.blocks.length <= 1)
      return;

    let blocks = blockchain.blocks.splice(1);

    let newBlockchain = { ...blockchain, blocks: blocks }
    setBlockchain(newBlockchain);
    updateActions(blocks[0]);
  }

  const updateBlckStatus = (bc: Blockchain, block: IBlockModel) => {
    let i = bc.blocks.indexOf(bc.blocks.filter(x => x.height === block.height)[0]);

    bc.blocks[i].isValid = verifyHash(bc.blocks[i]);
    if(i < bc.blocks.length-1) {
      bc.blocks[i].isValid = bc.blocks[i].isValid && bc.blocks[i+1].isValid;
    }
    i--;
    
    while (i >= 0 && bc.blocks.length > 0) {
      var currBlock = bc.blocks[i];
      var prevBlock = bc.blocks[i + 1];

      bc.blocks[i].isValid = prevBlock.isValid && currBlock.prevBlockHash === prevBlock.hash;
      i--;
    }
  }

  return (
    <div className={styles.container}>
      <MainToolbar addBtnClicked={onAddClicked} popBtnClicked={onPopClicked} clearBtnClicked={onClearClicked} addCanExecute={canAdd} />
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
