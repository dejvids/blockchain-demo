import React from 'react'
import Node from '../Models/Node'
import TreeNode from '../TreeNode/TreeNode';

type MerkleTreeProps = {

}
const MerkleTree:React.FC = () => {

    let left = new Node(false, null, null, 'b1');
    let right = new Node(false, null, null, "b2");
    let root = new Node(true, left, right, 'root');

    return (
        <div>
            <h1>Merkle tree:</h1>
            <TreeNode node={root}/>
            <TreeNode node={root.left}/>
            <TreeNode node={root.right}/>
        </div>
    )
}

export default MerkleTree;