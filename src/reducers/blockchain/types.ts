import { Action } from 'redux';
import IBlockModel from '../../components/Block/Model/Block';

export interface BlockchainState {
    blocks: IBlockModel[];
}

export interface SetBlockchainData extends Action {
    type: string;
    payload: BlockchainState;
}

export interface AddBLockToBlockchain extends Action {
    type: string;
    payload: IBlockModel;
}

export interface PopBlockFromBlockchain extends Action {
    type: string;
}