import { createStore, combineReducers } from 'redux';
import {blockchain} from './reducers/blockchain/blockchain'
import { composeWithDevTools } from 'redux-devtools-extension';
import { TransactionsState } from './reducers/transaction/types';
import { BlockchainState } from './reducers/blockchain/types';
import { transactions } from './reducers/transaction/transactions';

export interface AppState {
    blockchain :BlockchainState,
    transactions: TransactionsState
}
const reducers = combineReducers<AppState>({blockchain, transactions});
export const store = createStore(reducers, composeWithDevTools());