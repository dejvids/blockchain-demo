class Node {

    constructor(content: string) {
        this.content = content;
        this.left = null;
        this.right = null;
    }


    left: Node | null;
    right: Node | null;
    content: string;

    
}

export default Node