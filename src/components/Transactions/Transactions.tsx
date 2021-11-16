import React, { FC, useState } from "react";
import Transaction from "./Model/Transaction"
import "./transactions.css"
import TransactionDets from "../TransactionDets/TransactionsDets";
import Modal from "../Modal/Modal";
import NewTransaction from "../NewTramsaction/NewTransaction";
import '../../App.css';
import { connect } from "react-redux";
import { setTransactions } from '../../reducers/transaction/transactions';
import { TransactionsState } from "../../reducers/transaction/types";
import { AppState } from "../../store";

type TransactionsProps  = {
    transactions: Transaction[],
    setTransactions: Function
}
const Transactions: React.FC<TransactionsProps> = ({transactions, setTransactions}) => {

    const defTransactions: Array<Transaction> = [new Transaction('Person A', 'Person B', 234.52), new Transaction('Person B', 'Person C', 14.23)]
    const [selectedTransaction, setSelectedTx] = useState<Transaction | undefined>()
    //const [transactions, setTransactions] = useState<Array<Transaction>>(defTransactions)
    const [showModal, setModalVisibility] = useState<boolean>(false)
    const [newTransaction, setNewTransaction] = useState<NewTransaction>({ from: '', to: '', amount: 0 });

    let txDetails;
    if (selectedTransaction) {
        txDetails = <TransactionDets transaction={selectedTransaction} />
    }
    else {
        txDetails = <h1>Select transaction</h1>
    }

    const onTxClicked = (item: any) => {
        let tx = transactions.find(t => t.hash === item.target.id)
        if (tx) {
            setSelectedTx(tx)
        }
        else {
            console.log("Couldn`t find transaction. Clicked item: " + item)
        }
    }

    const onNewBtnClicked = () => {
        setModalVisibility(!showModal);
    }

    const onNewTxAdded = (tx: Transaction) => {
        if (newTransaction) {
            let valid = validateNewTransaction(newTransaction);
            if (!valid[0]) {
                alert(valid[1]);
                return;
            }

            //setTransactions([...transactions, new Transaction(newTransaction.from, newTransaction.to, newTransaction.amount)]);
            setTransactions({transactions: [...transactions, new Transaction(newTransaction.from, newTransaction.to, newTransaction.amount)]});
            setNewTransaction({ from: '', to: '', amount: 0 });
            setModalVisibility(false);
        }
    }

    const onPullData = (tx: NewTransaction) => {
        setNewTransaction(tx);
    }

    const validateNewTransaction = (tx: NewTransaction) => {
        if ((tx.from?.length > 0) == false) {
            return [false, "Sender property can not be empty"];
        }

        if ((tx.to?.length > 0) == false) {
            return [false, "Receiver property can not be empty"];
        }

        if (tx.to == tx.from) {
            return [false, "Sender can not be a receiver in single transaction"]
        }

        if (!(tx.amount > 0)) {
            return [false, "Amount must be greater than 0"];
        }

        return [true, ""];
    }

    return (
        <div className="container">
            <Modal width="54%" height="300px" visible={showModal} onCancel={() => setModalVisibility(false)} onClose={() => setModalVisibility(false)} onOk={onNewTxAdded} header="New Transaction" body={<NewTransaction tx={newTransaction} pullData={onPullData} />} />
            <div>
                <button className="btn btn-dark" onClick={onNewBtnClicked}>New</button>
            </div>
            <div className="tx-list">
                <ul>
                    {transactions.map(t => {
                        return (
                            <li key={t.hash} id={t.hash} className="tx-item" onClick={onTxClicked}>{t.hash}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="tx-det">
                {txDetails}
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    console.log("TX state:");
    const { transactions } = state.transactions;
    
    console.log(state);

    return { transactions };
}

export default connect(mapStateToProps, { setTransactions })(Transactions);