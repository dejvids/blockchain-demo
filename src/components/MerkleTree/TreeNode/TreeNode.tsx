import React, { FC } from 'react'
import Node from '../Models/Node'
import './TreeNode.css'

type TreeNodeProps = {
    node: Node|null
}

const TreeNode:React.FC<TreeNodeProps> = ({node})=>{
    return (
        <div className='node-container'>
            <h3>{node !== null ?  node.content.substring(0,3) + '...' : '---'}</h3>
        </div>
    )
}
export default TreeNode