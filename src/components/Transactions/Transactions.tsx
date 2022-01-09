import React, { useRef, useState } from "react";
import Transaction from "./Model/Transaction"
import "./transactions.css"
import TransactionDets from "../TransactionDets/TransactionsDets";
import Modal from "../Modal/Modal";
import NewTransaction from "../NewTramsaction/NewTransaction";
import '../../App.css';
import { connect } from "react-redux";
import { setTransactions, addTransaction, removeTransaction } from '../../reducers/transaction/transactions';
import { AppState } from "../../store";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { DragDropContext, Draggable, DraggableLocation, DragStart, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'

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
    const [assignedTransactions, setAssignedTransactions] = useState<Transaction[]>([]);

    const txContainer = useRef<HTMLDivElement>(null);

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
        txContainer.current?.style.removeProperty('height');
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

    const deleteTx = (tx: Transaction) => {
        removeTransaction(tx);
        txContainer.current?.style.removeProperty('height');
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

    const reorder = (list: Transaction[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (source: Transaction[], destination: Transaction[], sourceDroppable: DraggableLocation, droppableDestination: DraggableLocation) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(sourceDroppable.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: any = {};
        result[sourceDroppable.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const getList = (id: string) => {
        if (id === 'sourceDroppable') {
            return transactions;
        }

        return assignedTransactions;
    }

    const onDragStart = (initial: DragStart, provider: ResponderProvided) => {
        const height = txContainer.current?.clientHeight;
        console.log(`height is ${height}`);

    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {

            if (source.droppableId == 'sourceDroppable') {
                const items = reorder(
                    transactions,
                    result.source.index,
                    destination.index
                );

                setTransactions(items);
            }
            else {
                const items = reorder(
                    assignedTransactions,
                    result.source.index,
                    destination.index
                );

                setAssignedTransactions(items);
            }
        }
        else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            if (source.droppableId === 'sourceDroppable') {
                setTransactions(result[source.droppableId]);
                setAssignedTransactions(result[destination.droppableId]);
            }
            else {
                setTransactions(result[destination.droppableId]);
                setAssignedTransactions(result[source.droppableId]);
            }
        }
    }

    const ontxContainerClick = () => {
        const height = txContainer.current?.clientHeight;
        console.log(`height is ${height}`);
        txContainer.current?.style.setProperty('height', `${height}px`);
    }

    return (
        <div className="tx-container">
            <Modal width="54%" height="300px" visible={showNewTxModal} onCancel={() => setModalVisibility(false)} onClose={() => setModalVisibility(false)} onOk={onNewTxAdded} header="New Transaction" body={<NewTransaction tx={newTransaction} pullData={onPullData} />} />
            <div>
                <button className="btn btn-dark" onClick={onNewBtnClicked}>New</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <div className="row">

                    <div
                        ref={txContainer}
                        onMouseDown={ontxContainerClick}
                        className="tx-list">
                        <Droppable droppableId="sourceDroppable">
                            {(provided, snapshot) => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {transactions.map((t, index) => {
                                        return (
                                            <Draggable key={t.hash} draggableId={t.hash} index={index} >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TransactionItem transaction={t} onTxSelected={onTxClicked} onTxDeleted={deleteTx} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </ul>)}
                        </Droppable>
                    </div>
                    <div className="tx-det">
                        {txDetails}
                    </div>
                </div>
                <div className="row">
                    <h2>Block creator</h2>
                    <Droppable droppableId="targetDroppable">
                        {(provided, snapshot) => (
                            <ul className="border-light"
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {assignedTransactions.map((t, index) => {
                                    return (
                                        <Draggable key={t.hash} draggableId={t.hash} index={index} >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {t.hash}
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </ul>)}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    console.log("TX state:");
    const { transactions } = state.transactions;

    console.log(state);

    return { transactions };
}

export default connect(mapStateToProps, { setTransactions, addTransaction, removeTransaction })(Transactions);