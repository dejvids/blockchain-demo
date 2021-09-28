import React from "react"
import './NewTransaction.css'

const NewTransaction:React.FC = () => {
    return(
        <div className="form">
            <label htmlFor="from">From:</label>
            <input id="from" name="from" type="text"/>

            <label htmlFor="to">To:</label>
            <input id="to" name="to" type="text"/>

            <label htmlFor="amount">Amount:</label>
            <input id="amount" name="amount" type="text"/>
        </div>
    )
}

export default NewTransaction