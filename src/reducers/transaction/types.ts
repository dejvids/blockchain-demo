import { Action } from 'redux';
import Transaction from '../../components/Transactions/Model/Transaction';

export interface TransactionsState {
    transactions: Transaction[];
}

export interface SetTransactions extends Action {
    type: string;
    payload: TransactionsState;
}