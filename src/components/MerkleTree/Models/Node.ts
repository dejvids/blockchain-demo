class Node {
    constructor (isRoot: boolean, left: Node|null, right: Node|null, content: string) {
        this.isRoot = isRoot;
        this.left = left;
        this.right = right;
        this.content = content;
    }
    isRoot: boolean;
    left:Node|null;
    right:Node|null;
    content: string;
}

export default Node