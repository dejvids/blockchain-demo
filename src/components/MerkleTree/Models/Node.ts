class Node {

    constructor(content: string, isroot = false) {
        this.content = content;
        this.left = null;
        this.right = null;
        this.isRoot = isroot;
    }


    left: Node | null;
    right: Node | null;
    content: string;
    isRoot: boolean;

    isLeaf():boolean {
        return !this.left && !this.right && this.content?.length > 0;
    }
    
}

export default Node