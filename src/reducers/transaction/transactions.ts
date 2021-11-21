import { Reducer, ActionCreator } from 'redux';
import Transaction from '../../components/Transactions/Model/Transaction';
import { TransactionsState, SetTransactions, AddTransaction, RemoveTransaction } from './types';


const TRANSACTIONS_SET = 'TRANSACTIONS_SET';
const TRANSACTIONS_ADD = 'TRANSACTIONS_ADD';
const TRANSACTIONS_REMOVE = 'TRANSACTIONS_REMOVE';

const defTransactions: Array<Transaction> = [new Transaction('Person A', 'Person B', 234.52), new Transaction('Person B', 'Person C', 14.23)]

export const transactions: Reducer<TransactionsState> = (state = { transactions: defTransactions }, action) => {

    switch (action.type) {
        case TRANSACTIONS_SET:
            return {
                ...state,
                ...action.payload
            }
        case TRANSACTIONS_ADD:
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case TRANSACTIONS_REMOVE:
            const i = state.transactions.indexOf(action.payload);
            let newList = [...state.transactions];
            newList.splice(i,1);
            return{
                state,
                transactions: newList
            }
        default:
            return state;
    }
}

export const setTransactions: ActionCreator<SetTransactions> = (data: TransactionsState) => ({
    type: TRANSACTIONS_SET,
    payload: data
});

export const addTransaction: ActionCreator<AddTransaction> = (tx: Transaction) => ({
    type: TRANSACTIONS_ADD,
    payload: tx
})

export const removeTransaction: ActionCreator<RemoveTransaction> =(tx: Transaction) => ({
    type: TRANSACTIONS_REMOVE,
    payload: tx
})