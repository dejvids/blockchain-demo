import { createStore } from 'redux';
import {blockchainReducer} from './reducers/blockchain/blockchain'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(blockchainReducer, composeWithDevTools());