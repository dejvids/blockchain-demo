import React, { FC } from 'react'
import Node from '../Models/Node'
import './TreeNode.css'

type TreeNodeProps = {
    node: Node|null
}

const TreeNode:React.FC<TreeNodeProps> = ({node})=>{
    return (
        <div className={`node-container ${node && node.content?.length > 0 ? 'valid-node' : 'empty-node'} ${node && node.isLeaf() ? 'leaf' : node?.isRoot ? 'root' : node && node.content?.length > 0 ? 'normal' : ''}`}>
            <h3 >{node && node.content?.length > 0 ?  node.content.substring(0,3) + '...' : ''}</h3>
        </div>
    )
}
export default TreeNode