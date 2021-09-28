import React, { FC, useState } from "react";
import Tx from "./Model/Transaction"
import sha256 from "crypto-js/sha256";
import "./transactions.css"
import { render } from "@testing-library/react";
import { off } from "process";
import TransactionDets from "../TransactionDets/TransactionsDets";
import Modal from "../Modal/Modal";
import NewTransaction from "../NewTramsaction/NewTransaction";
import Transaction from "./Model/Transaction";

const Transactions: React.FC = () => {

    const defTransactions: Array<Tx> = [new Tx('Person A', 'Person B', 234.52), new Tx('Person B', 'Person C', 14.23)]
    const [selectedTransaction, setSelectedTx] = useState<Tx | undefined>()
    const [transactions, setTransactions] = useState<Array<Tx>>(defTransactions)
    const [showModal, setModalVisibility] = useState<boolean>(false)

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
        setModalVisibility(false);
    }

    return (
        <div className="container">
            <Modal width="54%" height="300px"  visible={showModal} onCancel={()=> setModalVisibility(false)} onClose={()=>setModalVisibility(false)} onOk={onNewTxAdded} header="New Transaction" body={<NewTransaction/>}/>
            <div>
                <button onClick={onNewBtnClicked}>New</button>
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

export default Transactions;