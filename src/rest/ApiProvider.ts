import Transaction from "../components/Transactions/Model/Transaction";
import {TransactionRequest} from "./types";

const apiHost = 'http://localhost:5099'

export async function getTransactions(): Promise<Transaction[]>  {
    return fetch(apiHost + '/transaction', { method: 'GET'})
    .then(response => {
        if(response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    });
}

export async function saveTransaction(request: TransactionRequest): Promise<Transaction>{
    return fetch(apiHost + '/transaction', {method: 'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify(request)})
    .then(response => {
        if(response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    });
}

export async function deleteTransaction(tx: string) {
    const response = await fetch(apiHost + '/transaction/' + tx, {method: 'DELETE'});

    if(response.ok) {
        return Promise.resolve();
    }

    throw new Error(response.statusText);
}