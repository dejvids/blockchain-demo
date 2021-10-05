import React from "react"
import './NewTransaction.css'

type NewTransaction = {
    from: string,
    to: string,
    amount: number,
}

type NewTransactionProps = {
    tx: NewTransaction,
    pullData: (tx: NewTransaction) => void;
}

const NewTransaction: React.FC<NewTransactionProps> = ({ tx, pullData }) => {

    const defaultTx = {
        from: '',
        to: '',
        amount: 0
    };


    const onValueChanged = (event: any) => {
        const item = event.target;
        const value = item.value;
        let newTx = { ...tx };
        switch (item.name) {
            case 'from':
                newTx.from = value;
                break;
            case 'to':
                newTx.to = value;
                break;
            case 'amount':
                newTx.amount = value;
                break;
        }

        pullData(newTx);
    }

    return (
        <div className="form">
            <label htmlFor="from">Sender:</label>
            <input id="from" name="from" type="text" value={tx?.from || ''} onChange={onValueChanged} />

            <label htmlFor="to">Receiver:</label>
            <input id="to" name="to" type="text" value={tx?.to || ''} onChange={onValueChanged} />

            <label htmlFor="amount">Amount:</label>
            <input id="amount" name="amount" type="text" value={tx?.amount || 0} onChange={onValueChanged} />
        </div>
    )
}

export default NewTransaction