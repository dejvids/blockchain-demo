import { ActionCreator, Reducer } from 'redux';
import IBlockModel from '../../components/Block/Model/Block';
import BlockModel from '../../components/Block/Model/BlockModel';
import { AddBLockToBlockchain, BlockchainState, PopBlockFromBlockchain, SetBlockchainData } from './types';

const BLOCKCHAIN_SET = 'BLOCKCHAIN_SET';
const ADD_BLOCK = 'ADD_BLOCK';
const POP_BLOCK = 'POP_BLOCK';

const data = require('../../data.json');

const tempBlock: BlockModel = data.originBlock;

const getOriginBlock = () => {
    let originBlock = new BlockModel(tempBlock.height, Date.now(), tempBlock.prevBlockHash, tempBlock.data);

    originBlock.approve();

    return originBlock;
}

let defaultState: BlockchainState = {
    blocks: [getOriginBlock()]
}

export const blockchainReducer: Reducer<BlockchainState> = (state = defaultState, action) => {
    switch (action.type) {
        case BLOCKCHAIN_SET:
            return {
                ...state,
                ...action.payload
            }
        
        case ADD_BLOCK:
            return {
                ...state,
                blocks: [action.payload, ...state?.blocks]
            }
        
        case POP_BLOCK:
            return {
                ...state,
                blocks: state.blocks.slice(1)
            }

        default:
            return state;
    }
}

export const setBlockchain: ActionCreator<SetBlockchainData> = (data: BlockchainState) => ({
    type: BLOCKCHAIN_SET,
    payload: data
});

export const addBlockToBlockchain: ActionCreator<AddBLockToBlockchain> = (data: BlockModel) => ({
    type: ADD_BLOCK,
    payload: data
});

export const popBlockFromBlockchain: ActionCreator<PopBlockFromBlockchain> = (data: BlockchainState) => ({
    type: POP_BLOCK,
    payload: data
})