import React, { } from 'react'
import Transaction from '../Model/Transaction'
import './transactionItem.css'

type TxItemProps = {
    transaction: Transaction,
    onTxSelected: Function,
    onTxDeleted: Function
}
export const TransactionItem: React.FC<TxItemProps> = ({transaction: tx, onTxSelected: onTxClicked, onTxDeleted: onTxDelete})=>{

    const onDeleteClicked = (e:React.MouseEvent<HTMLSpanElement> )=>{
        e.stopPropagation();

        onTxDelete(tx);
    }

    return(
        <li key={tx.hash} id={tx.hash} className="tx-item" onClick={()=>onTxClicked(tx)}>{tx.hash.slice(0,5)+'...'}<span className="btn-list-item-delete" onClick={onDeleteClicked}>X</span></li>
    )
    
}