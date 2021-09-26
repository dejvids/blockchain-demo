import React, { FC, useState } from "react";
import Tx from "./Model/Transaction"
import sha256 from "crypto-js/sha256";
import "./transactions.css"
import { render } from "@testing-library/react";
import { off } from "process";


const Transactions: React.FC = () => {

    const defTransactions: Array<Tx> = [new Tx('Person A', 'Person B', 234.52), new Tx('Person B', 'Person C', 14.23)]
    const [selectedTransaction, setSelectedTx] = useState<Tx | undefined>()
    const [transactions, setTransactions] = useState<Array<Tx>>(defTransactions)

    let txDetails;
    if (selectedTransaction) {
        txDetails = <div className="det-items"><div><span className="label-std">Tx: </span>{selectedTransaction.hash}</div><div><span className="label-std">From: </span>{selectedTransaction.from}</div><div><span className="label-std">To: </span>{selectedTransaction.to}</div> <div><span className="label-std">Amound:</span>{selectedTransaction.amount}</div></div>
    }
    else {
        txDetails = <h1>Select transaction</h1>
    }

    const onTxClicked = (item:any) => {
        let tx = transactions.find(t => t.hash === item.target.id)
        if(tx) {
            setSelectedTx(tx)
        }
        else {
            console.log("Couldn`t find transaction. Clicked item: " + item)
        }
    }

    return (
        <div className="container">
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