import React from "react"
import './MainToolbar.css'


interface MainToolbarProps {
    addBtnClicked: () => void;
    popBtnClicked?: () => void;
    clearBtnClicked?: () => void;
    addCanExecute?: boolean;
    popCanExecute?: boolean;
    clearCanExecute?: boolean;
}

const MainToolbar: React.FC<MainToolbarProps> = ({ addBtnClicked, popBtnClicked, clearBtnClicked, addCanExecute, popCanExecute }) => {

    const onAddClicked = () => {
        addBtnClicked();
    }

    const onClearClicked = () => {
        if (clearBtnClicked)
            clearBtnClicked();
    }

    const onPopClicked = () => {
        if (popBtnClicked)
            popBtnClicked();
    }

    return (
        <div className="toolbar">
            <button className="btn btn-toolbar btn-dark" disabled={!addCanExecute} onClick={onAddClicked}>Add</button>
            <button className="btn btn-toolbar btn-pop" disabled={!popCanExecute} onClick={onPopClicked}>Pop</button>
            <button className="btn btn-toolbar btn-clear" onClick={onClearClicked}>Clear</button>
        </div>
    )
}

export default MainToolbar