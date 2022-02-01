import { type } from 'os';
import { Reducer, ActionCreator, combineReducers } from 'redux';
import Transaction from '../../components/Transactions/Model/Transaction';
import { AllTransactionsState, SetTransactions, AddTransaction, RemoveTransaction, SelectTransaction, UnselectTransaction, SelectedTransactionsState, TransactionsState, SetSelectedTransactions } from './types';


const TRANSACTIONS_SET = 'TRANSACTIONS_SET';
const TRANSACTIONS_ADD = 'TRANSACTIONS_ADD';
const TRANSACTIONS_REMOVE = 'TRANSACTIONS_REMOVE';

const TRANSACTIONS_SELECT_UPDATE = 'TRANSACTIONS_SELECT_UPDATE';
const TRANSACTIONS_SELECT = 'TRANSACTIONS_SELECT';
const TRANSACTIONS_UNSELECT = 'TRANSACTIONS_UNSELECT';

const defTransactions: Array<Transaction> = [new Transaction('Person A', 'Person B', 234.52), new Transaction('Person B', 'Person C', 14.23)]

export const allTransactions: Reducer<AllTransactionsState> = (state = {allTransactions: defTransactions}, action) => {

    switch (action.type) {
        case TRANSACTIONS_SET:
            return {
                ...state,
                allTransactions: action.payload
            }
        case TRANSACTIONS_ADD:
            return {
                ...state,
                allTransactions: [...state.allTransactions, action.payload]
            }
        case TRANSACTIONS_REMOVE:
            const i = state.allTransactions.indexOf(action.payload);
            let newList = [...state.allTransactions];
            newList.splice(i,1);
            return{
                state,
                allTransactions: newList
            }
        default:
            return state;
    }
}

const defSelected:Array<Transaction> = [];

export const selectedTransactions: Reducer<SelectedTransactionsState> = (state ={seletectTransactions: defSelected}, action) => {
    
    switch(action.type) {
        case TRANSACTIONS_SELECT:
            return {
                ...state,
                seletectTransactions:[...state.seletectTransactions, action.payload]
            }
        case TRANSACTIONS_UNSELECT:
            let newList = [...state.seletectTransactions];
            const i = state.seletectTransactions.indexOf(action.payload);
            newList.splice(i,1);
            return {
                state,
                seletectTransactions: newList
            }
        case TRANSACTIONS_SELECT_UPDATE:
            console.log(action.payload);
            return {
                ...state,
                seletectTransactions: action.payload
            }
        default:
            return state;
    }
}


export const setTransactions: ActionCreator<SetTransactions> = (data: AllTransactionsState) => ({
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

export const setSelectedTransactions: ActionCreator<SetSelectedTransactions> = (txs: Transaction[]) => ({
    type: TRANSACTIONS_SELECT_UPDATE,
    payload: txs
})

export const selectTransaction: ActionCreator<SelectTransaction> = (tx: Transaction) => ({
    type: TRANSACTIONS_SELECT,
    payload: tx
})

export const unselectTransaction: ActionCreator<UnselectTransaction> = (tx: Transaction) => ({
    type: TRANSACTIONS_UNSELECT,
    payload: tx
})
export const transactions: Reducer<TransactionsState> = combineReducers<TransactionsState>({allTransactions, selectedTransactions});
