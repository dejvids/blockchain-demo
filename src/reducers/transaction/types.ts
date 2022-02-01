import { Action } from 'redux';
import Transaction from '../../components/Transactions/Model/Transaction';

export interface TransactionsState {
    allTransactions: AllTransactionsState,
    selectedTransactions: SelectedTransactionsState
}

export interface AllTransactionsState {
    allTransactions: Transaction[];
}

export interface SelectedTransactionsState {
    seletectTransactions: Transaction[];
}

export interface SetTransactions extends Action {
    type: string;
    payload: AllTransactionsState;
}

export interface AddTransaction extends Action {
    type: string;
    payload: Transaction;
}

export interface RemoveTransaction extends Action {
    type: string;
    payload: Transaction;
}

export interface SetSelectedTransactions extends Action {
    type:string;
    payload: Transaction[];
}

export interface SelectTransaction extends Action {
    type: string;
    payload: Transaction;
}

export interface UnselectTransaction extends Action {
    type: string;
    payload: Transaction;
}