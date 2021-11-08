import React, { Dispatch, useEffect, useState } from 'react';
import styles from './Home.module.css';
import Block from '../Block/Block';
import Blockchain from './Blockchain';
import IBlockModel from '../Block/Model/Block';
import './Home.css';
import BlockModel from '../Block/Model/BlockModel';
import MainToolbar from '../MainToolbar/MainToolbar';
import { BlockStatus } from '../Block/Model/BLockStatus';
import { verifyHash } from './BlockchainManager';
import { BlockchainState } from '../../reducers/blockchain/types';
import { connect } from 'react-redux';

const data = require('../../data.json');

const tempBlock: BlockModel = data.originBlock;

type HomeProps = {
  blocks: IBlockModel[]
  setBlockchain: Function,
  addBlock: Function,
  popBlock: Function
}

type ActionState = {
  canAdd: boolean,
  canPop: boolean,
  canClear?: boolean
}

enum ActionType {
  add,
  update,
  pop,
  clear
}

const Home: React.FC<HomeProps> = ({ blocks, setBlockchain, addBlock, popBlock }) => {

  const defaultActionState: ActionState = {
    canAdd: true,
    canPop: false
  }

  const [actionState, setActionState] = useState<ActionState>(defaultActionState)

  const updateActions = (block: IBlockModel, action: ActionType) => {

    let blockchainLength = blocks.length;
    if (action == ActionType.add) {
      blockchainLength++;
    }
    else if (action == ActionType.pop) {
      blockchainLength--;
    }
    else if (action == ActionType.clear) {
      blockchainLength = 1;
    }

    let updatedState: ActionState = {
      ...actionState,
      canAdd: block.isValid && block.status == BlockStatus.Approved,
      canPop: blockchainLength > 1
    }

    setActionState(updatedState);
  }

  const onAddClicked = () => {
    const newBlock = new BlockModel(blocks[0].height + 1, Date.now(), blocks[0].hash, '');
    const newBlockchain: BlockchainState = { blocks: [newBlock, ...blocks] };

    addBlock(newBlock);
    updateBlckStatus(newBlockchain, newBlock);
    updateActions(newBlock, ActionType.add);
  };

  const onBlockUpdate = (newBlock: IBlockModel) => {
    const newBlockchain: BlockchainState = { blocks: [...blocks] };
    newBlockchain.blocks[blocks.length - newBlock.height] = newBlock;

    updateBlckStatus(newBlockchain, newBlock);
    setBlockchain(newBlockchain);
    updateActions(newBlock, ActionType.update);
  }

  const onClearClicked = () => {
    let originBlock = new BlockModel(tempBlock.height, Date.now(), tempBlock.prevBlockHash, tempBlock.data);

    originBlock.approve();
    let newBlockchain = { blocks: [originBlock] }

    updateActions(originBlock, ActionType.clear);
    setBlockchain(newBlockchain);
  }

  const onPopClicked = () => {
    popBlock(blocks);
    updateActions(blocks[1], ActionType.pop);
  }

  const updateBlckStatus = (bc: BlockchainState, block: IBlockModel) => {
    let i = bc.blocks.indexOf(bc.blocks.filter(x => x.height === block.height)[0]);

    bc.blocks[i].isValid = verifyHash(bc.blocks[i]);
    if (i < bc.blocks.length - 1) {
      bc.blocks[i].isValid = bc.blocks[i].isValid && bc.blocks[i + 1].isValid;
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
      <MainToolbar addBtnClicked={onAddClicked} popBtnClicked={onPopClicked} clearBtnClicked={onClearClicked} addCanExecute={actionState.canAdd} popCanExecute={actionState.canPop} />
      <ul>
        {blocks.map((value, id) => {
          return (
            <li key={id}>
              <Block key={id} blockModel={value} onBlockUpdate={onBlockUpdate} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: BlockchainState) => {
  const { blocks } = state;

  return { blocks }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setBlockchain: (state: BlockchainState) => dispatch({ type: 'BLOCKCHAIN_SET', payload: state }),
    addBlock: (block: IBlockModel) => dispatch({ type: 'ADD_BLOCK', payload: block }),
    popBlock: (state: BlockchainState) => dispatch({ type: 'POP_BLOCK' })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
