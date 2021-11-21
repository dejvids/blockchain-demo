import React, { useState } from "react";
import Transaction from "./Model/Transaction"
import "./transactions.css"
import TransactionDets from "../TransactionDets/TransactionsDets";
import Modal from "../Modal/Modal";
import NewTransaction from "../NewTramsaction/NewTransaction";
import '../../App.css';
import { connect } from "react-redux";
import { setTransactions, addTransaction, removeTransaction } from '../../reducers/transaction/transactions';
import { TransactionsState } from "../../reducers/transaction/types";
import { AppState } from "../../store";
import { TransactionItem } from "./TransactionItem/TransactionItem";

type TransactionsProps = {
    transactions: Transaction[],
    setTransactions: Function,
    addTransaction: Function,
    removeTransaction: Function
}
const Transactions: React.FC<TransactionsProps> = ({ transactions, setTransactions, addTransaction, removeTransaction }) => {
    const [selectedTransaction, setSelectedTx] = useState<Transaction | undefined>()
    const [showNewTxModal, setModalVisibility] = useState<boolean>(false)
    const [newTransaction, setNewTransaction] = useState<NewTransaction>({ from: '', to: '', amount: 0 });

    let txDetails;
    if (selectedTransaction) {
        txDetails = <TransactionDets transaction={selectedTransaction} />
    }
    else {
        txDetails = <h1>Select transaction</h1>
    }

    const onTxClicked = (tx: Transaction) => {
        //let tx = transactions.find(t => t.hash === item.target.id)
        if (tx) {
            setSelectedTx(tx)
        }
        else {
            console.log("Couldn`t find transaction. ")
        }
    }

    const onNewBtnClicked = () => {
        setModalVisibility(!showNewTxModal);
    }

    const onNewTxAdded = (tx: Transaction) => {
        if (newTransaction) {
            let valid = validateNewTransaction(newTransaction);
            if (!valid[0]) {
                alert(valid[1]);
                return;
            }

            addTransaction(new Transaction(newTransaction.from, newTransaction.to, newTransaction.amount));
            setNewTransaction({ from: '', to: '', amount: 0 });
            setModalVisibility(false);
        }
    }

    const onPullData = (tx: NewTransaction) => {
        setNewTransaction(tx);
    }

    const deleteTx =(tx: Transaction) => {
        // const i = transactions.indexOf(tx);
        // const newList = [...transactions];
        // newList.splice(i, 1);

        // setTransactions({transactions: newList});
        removeTransaction(tx);
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
        <div className="tx-container">
            <Modal width="54%" height="300px" visible={showNewTxModal} onCancel={() => setModalVisibility(false)} onClose={() => setModalVisibility(false)} onOk={onNewTxAdded} header="New Transaction" body={<NewTransaction tx={newTransaction} pullData={onPullData} />} />
            <div>
                <button className="btn btn-dark" onClick={onNewBtnClicked}>New</button>
            </div>
            <div className="tx-list">
                <ul>
                    {transactions.map(t => {
                        return (
                            <TransactionItem transaction={t} onTxSelected={onTxClicked} onTxDeleted={deleteTx}/>
                            // <li key={t.hash} id={t.hash} className="tx-item" onClick={onTxClicked}>{t.hash}</li>
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

export default connect(mapStateToProps, {setTransactions, addTransaction, removeTransaction})(Transactions);