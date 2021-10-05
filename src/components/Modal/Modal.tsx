import React, { Component, ReactNode } from "react";
import Transaction from "../Transactions/Model/Transaction";
import './Modal.css';

type ModalProps = {
    header: string,
    body: ReactNode,
    footer?: string,
    visible?: boolean,
    width: string,
    height: string,
    onClose: () => void
    onOk: (result: any) => void,
    onCancel?: () => void
}

const Modal: React.FC<ModalProps> = ({ width, height, header, visible, body, onClose, onOk, onCancel }) => {

    const onOkClicked = () => {
        onOk({})
    }

    return (
        <div id="myModal" className="modal" style={visible ? { display: 'block' } : { display: 'none' }}>
            <div className="modal-content" style={{ height: height, width: width }}>
                <div className="modal-header">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>{header}</h2>
                </div>
                <div className="modal-body">
                    {body}
                </div>
                <div className="modal-footer">
                    <div className="footer-toolbar">
                        <button className="btn btn-modal btn-secondary" onClick={onCancel}>Cancel</button>
                        <button className="btn btn-modal btn-dark" onClick={onOk}>Ok</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal;