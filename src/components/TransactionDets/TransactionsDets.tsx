import React from "react";
import Transaction from "../Transactions/Model/Transaction";

type TxDetsProps =  {
    transaction: Transaction
}

const TransactionDets: React.FC<TxDetsProps> = ({transaction}) => {
    return (
        <div className="det-items">
            <div><span className="label-std">Tx: </span>{transaction.hash}</div>
            <div><span className="label-std">From: </span>{transaction.from}</div>
            <div><span className="label-std">To: </span>{transaction.to}</div>
            <div><span className="label-std">Amount:</span>{transaction.amount}</div>
        </div>
    )
}

export default TransactionDets;