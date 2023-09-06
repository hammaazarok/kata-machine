import { HeapNode, ObjectMinHeap } from './MinHeap';

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList
): number[] {

    const dists = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1);
    dists[source] = 0;

    const minHeap = new ObjectMinHeap();

    minHeap.insert({ node: source, dist: 0 });
    while (!minHeap.isEmpty()) {
        const { node: curr, dist: currDist } = minHeap.extractMin() as HeapNode;
        if (curr === sink) break;

        if (currDist > dists[curr]) continue;

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];
            const dist = currDist + edge.weight;

            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;

                minHeap.insert({ node: edge.to, dist });
            }
        }
    }

    const out: number[] = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
