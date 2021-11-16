import { Reducer, ActionCreator } from 'redux';
import Transaction from '../../components/Transactions/Model/Transaction';
import { TransactionsState, SetTransactions } from './types';


const TRANSACTIONS_SET = "TRANSACTIONS_SET";

const defTransactions: Array<Transaction> = [new Transaction('Person A', 'Person B', 234.52), new Transaction('Person B', 'Person C', 14.23)]

export const transactions: Reducer<TransactionsState> = (state = { transactions: defTransactions }, action) => {

    switch (action.type) {
        case TRANSACTIONS_SET:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setTransactions: ActionCreator<SetTransactions> = (data: TransactionsState) => ({
    type: TRANSACTIONS_SET,
    payload: data
});