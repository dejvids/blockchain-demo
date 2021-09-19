import React from 'react'
import styles from './Blockitem.module.css';

interface BlockItemProps {
    label: string,
    value?: string,
    disabled?: boolean,
    onValueChange?: (value: string) => void
}

const BlockItem: React.FC<BlockItemProps> = ({ label, value, disabled, onValueChange }) => {

    const onValueChanged = (event: any) => {
        if (onValueChange) {
            onValueChange(event?.target?.value ?? '');
        }
    }

    const onMouseOver = (event: any) => {
        if(typeof(value) ===  undefined || value == null)
            return;

        const timestampValue:string = value;
        let date = new Date(value);
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} type="text" value={value} disabled={disabled ?? false} onChange={onValueChanged} onMouseOver={onMouseOver}/>
        </div>);
}

export default BlockItem;