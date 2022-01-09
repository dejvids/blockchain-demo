import React, { FC } from 'react'
import Node from '../Models/Node'

type TreeNodeProps = {
    node: Node|null
}

const TreeNode:React.FC<TreeNodeProps> = ({node})=>{
    return (
        <div>
            <h3>{node !== null ?  node.content : '---'}</h3>
            <div>

            </div>
        </div>
    )
}
export default TreeNode