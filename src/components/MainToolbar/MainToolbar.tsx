import React from "react"
import './MainToolbar.css'


interface MainToolbarProps {
    addBtnClicked : () => void;
    popBtnClicked? :() => void;
    clearBtnClicked?: () => void;
}
const MainToolbar: React.FC<MainToolbarProps> = ({addBtnClicked, popBtnClicked, clearBtnClicked}) => {

    const onAddClicked = () => {
        addBtnClicked();
    }

    const onClearClicked = () => {
        if(clearBtnClicked)
            clearBtnClicked();
    }

    const onPopClicked = () => {
        if(popBtnClicked)
            popBtnClicked();
    }

    return (
        <div className="toolbar">
            <button className="btn btn-toolbar btn-dark" onClick={onAddClicked}>Add</button>
            <button className="btn btn-toolbar btn-pop" onClick={onPopClicked}>Pop</button>
            <button className="btn btn-toolbar btn-clear" onClick={onClearClicked}>Clear</button>
        </div>
    )
}

export default MainToolbar