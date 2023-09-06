export default class MinHeap {
    public length: number;
    private data: number[];



    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0){
            return -1;
        }

        const out = this.data[0]
        this.length--
        if (this.length === 0) {
            this.data = [];
            return out;
        }


        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }

    private heapifyUp(idx: number): void {

        if (idx === 0) {
            return
        }

        const p = this.parent(idx)
        const parentV = this.data[p]
        const value = this.data[idx]

        if (parentV > value) {
            this.data[idx] = parentV;
            this.data[p] = value;
            this.heapifyUp(p)
        }

    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }

        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx)

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (lV > rV && v > rV) {
            this.data[idx] = rV;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }


    }
}

export type HeapNode = {
    node: number,
    dist: number
}

export class ObjectMinHeap {
    private heap: HeapNode[]
    constructor() {
        this.heap = [];
    }

    // Get the parent index of a given index
    parent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    // Get the left child index of a given index
    leftChild(index: number) {
        return 2 * index + 1;
    }

    // Get the right child index of a given index
    rightChild(index: number) {
        return 2 * index + 2;
    }

    // Check if the heap is empty
    isEmpty(): Boolean {
        return this.heap.length === 0;
    }

    // Insert an item into the heap
    insert(item: HeapNode) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    // Extract the minimum element from the heap (root)
    extractMin() {
        if (this.isEmpty()) {
            return -1;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop() as HeapNode;
        this.heapifyDown(0);
        return min;
    }

    // Move an element up the heap to its correct position
    heapifyUp(index: number) {
        while (index > 0) {
            const parentIndex = this.parent(index);

            if (this.heap[index].dist >= this.heap[parentIndex].dist) {
                break;
            }

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // Move an element down the heap to its correct position
    heapifyDown(index: number) {
        const leftChildIndex = this.leftChild(index);
        const rightChildIndex = this.rightChild(index);
        let smallest = index;

        if (
            leftChildIndex < this.heap.length &&
            this.heap[leftChildIndex].dist < this.heap[smallest].dist
        ) {
            smallest = leftChildIndex;
        }

        if (
            rightChildIndex < this.heap.length &&
            this.heap[rightChildIndex].dist < this.heap[smallest].dist
        ) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }
}

