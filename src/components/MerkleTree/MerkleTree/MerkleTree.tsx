import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import Transaction from '../../Transactions/Model/Transaction';
import Node from '../Models/Node'
import TreeNode from '../TreeNode/TreeNode';
import sha256 from "crypto-js/sha256";
import './MerkleTree.css'

type MerkleTreeProps = {
    transactions: Transaction[];

}
const MerkleTree: React.FC<MerkleTreeProps> = ({ transactions }) => {
    const [nodesToPrint, setnodesToPrint] = useState<Node[][]>();
    const [elems, setElems] = useState<string[][]>([['aaa', 'bbb', 'ccc'], ['111', '222', '333']]);
    const [root, setRoot] = useState<Node>();
    const [treeAsText, setTreeAsText] = useState<string>("");

    let nodes: Node[][];
    useEffect(() => {
        nodes = [];
        buildMerkleTree(transactions);

        // buildTree(transactions);

        // console.log(nodes);
        // setnodesToPrint(nodes);
        // setnodesToPrint(nodes);

    }, [])

    let outerText = "";

    const buildMerkleTree = (transactions: Transaction[]) => {
        const numberOfNodes = transactions.length * 2 - 1;
        let arrs = Array.from({ length: numberOfNodes }, (_, i) => `${i + 1}`);
        let localRoot = insertLevelOrder(arrs, null, 0) as Node;
        localRoot.isRoot = true;
        setNodes(localRoot as Node);
        setRoot(localRoot as Node);
        if (localRoot) {
            let text: string = "";
            getTextRepresentation(localRoot);
            setTreeAsText(outerText);
            printTree(localRoot, 0);
            const levels = nodes.length;
            console.log(`levels: ${levels}`);
            let nodesToPrint: Node[][] = [];
            nodesToPrint.push(nodes[0]);

            for (let i = 0; i < levels; i++) {
                let levelNodes = nodes[i];
                let requiredNodesNumber = Math.pow(2, i);
                let missingNodes = requiredNodesNumber - levelNodes.length;
                if (missingNodes > 0) {
                    let empptyNodes = new Array(missingNodes).fill(new Node(''))
                    nodes[i] = levelNodes.concat(empptyNodes);
                }
            }

            let level = 1;
            for (let i = 1; i < levels; i++) {
                //nodesToPrint.push(new Array(nodes[i].length).fill(new Node('???')));
                nodesToPrint.push(nodes[i]);
            }
            console.log(nodesToPrint);
            setnodesToPrint(nodesToPrint);
        }

    }


    let index = 0;

    const setNodes = (root: Node) => {
        if (root.left == null && root.right == null) {
            let tx = transactions[index];
            root.content = tx.hash;
            index++;
        }
        else {
            let content = "";
            if (root.left) {
                setNodes(root.left);
                content += root.left.content;

            }
            if (root.right) {
                setNodes(root.right);
                content += root.right.content;

            }

            root.content = sha256(content).toString();
        }
    }


    const getTextRepresentation = (root: Node) => {

        let text = root.content.substring(0, 3);
        console.log(text);
        setTreeAsText(text);
        outerText += text;

        if (root.left) {
            outerText += '-';
            getTextRepresentation(root.left);
        }
        if (root.right) {
            outerText += '-';
            getTextRepresentation(root.right);
        }
    }

    const buildTree = (transactions: any[]) => {
        let r = insertLevelOrder(transactions.map(t => t.hash), null, 0);

        if (r) {
            printTree(r, 0);
            setRoot(r);

            console.log(r);
        }
    }

    const isLeaf = (node: Node) => {
        return node.left == null && node.right == null;
    }

    const insertLevelOrder = (arr: string[],
        root: Node | null, i: number) => {
        // Base case for recursion
        if (i < arr.length) {
            let temp = new Node(arr[i]);
            root = temp;

            // insert left child
            root.left = insertLevelOrder(arr,
                root.left, 2 * i + 1);

            // insert right child
            root.right = insertLevelOrder(arr,
                root.right, 2 * i + 2);
        }
        return root;
    }

    const printTree = (node: Node, level: number = 0) => {
        if (!nodes[level])
            nodes[level] = [];

        nodes[level].push(node)
        level++;

        if (node.left) {
            printTree(node.left, level);
        }

        if (node.right) {
            printTree(node.right, level);
        }
    }


    return (
        <div>
            <h1>Merkle tree:</h1>
            <h2>Merkle root: {root?.content}</h2>
            {nodesToPrint?.map(n => {
                return (
                    <div className='tree-level'>
                        {n.map(n2 => {
                            return (
                                <TreeNode node={n2} />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    const { transactions } = state.transactions;

    return { transactions };
}

export default connect(mapStateToProps)(MerkleTree);