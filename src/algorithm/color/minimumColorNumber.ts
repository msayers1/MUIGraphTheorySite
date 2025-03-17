import { Algorithm, AlgorithmOutput, delayFunction } from "../algorithm";
import { Decorator, DecorationState } from "../../decoration/decorator";
import { Graph, UnweightedGraph, WeightedGraph, GraphAdjacencies, WeightedEdgeData, MultiEdgeData} from "../../graph_core/graph";
import { BreakfastDiningOutlined } from "@mui/icons-material";
import { generateRandomColor } from "../../util";

type EdgeData = WeightedEdgeData | MultiEdgeData;



export class ColorAlgorithm implements Algorithm<void> {

    colorTree: WeightedGraph | UnweightedGraph;
    adjList: number[][];
    queue: Set<number> = new Set();
    counts: number[];
    colors: string[];
    colorCounts: number[];
    minEdgeIndex: number;

    constructor(private decorator: Decorator) {
    }

    private initialize(edgeList: number[][], directed: boolean) {
        const graph = this.decorator.getGraph();
        if (graph.isWeighted()) {
            this.colorTree = new WeightedGraph(true);
        } else {
            this.colorTree = new UnweightedGraph(true);
        }
        if (directed) {

        } else{
            for (const edge of edgeList) {
                // console.log(edge[1]);
                if (!this.adjList[edge[1] - 1].includes(edge[0] - 1)) {
                    this.adjList[edge[0] - 1].push(edge[1] - 1);
                    this.adjList[edge[1] - 1].push(edge[0] - 1);
                    this.counts[edge[0] - 1] += 1
                    this.counts[edge[1] - 1] += 1
                    this.decorator.setEdgeState(edge[0], edge[1], DecorationState.DISABLED);
                    this.decorator.setVertexState(edge[0], DecorationState.DISABLED);
                    this.decorator.setVertexState(edge[1], DecorationState.DISABLED);
                }
            }
        }
        
    }
    

    
    //*run(): Generator<void, AlgorithmOutput, void> {
    async *run(): AsyncGenerator<void, AlgorithmOutput, void> {
        const graph = this.decorator.getGraph();
        const edgeList = graph.getEdgeList();
        switch(edgeList.length){
            case 0: 
                return {
                    graph: this.colorTree,
                    name: null,
                    message: {
                        level: "success",
                        title: "Execution Complete",
                        text: "1 is minimum number of colors for the graph."
                    }
                };
            case 1: 
                return {
                    graph: this.colorTree,
                    name: null,
                    message: {
                        level: "success",
                        title: "Execution Complete",
                        text: "2 is minimum number of colors for the graph."
                    }
                };
        }
        const nodes:Set<number> = graph.getVertexIds();
        // console.log(edgeList);
        this.adjList = Array.from({ length: nodes.size }, () => []);
        this.counts = new Array(nodes.size).fill(0);
        this.colorCounts = new Array(nodes.size).fill(1);
        this.colors = Array.from({length: nodes.size}, ()=>{let color:string = generateRandomColor(); console.log(color);return(color)});
        // this.colors =new Array(nodes.size).fill(generateRandomColor());
        this.initialize(edgeList, graph.isDirected());
        let numberOfColors = nodes.size;
        let minIndex = this.counts.length > 0 ? this.counts.reduce((minIdx, num, idx, arr) => num < arr[minIdx] ? idx : minIdx, 0) : -1;
        this.decorator.setStatusLine(`Initialized with an adjancey list of ${nodes.size}, and a node ${graph.getVertexLabel(minIndex+1)} with the least edges.`);
        // console.log(this.adjList);
        // console.log(this.counts);        let numberOfColors = nodes.size;     // Variable to count the number of numberOfColors
        this.queue.add(minIndex);

        while (this.queue.size > 0){
            let currentNode = this.queue.values().next().value;
            this.decorator.setVertexState((currentNode + 1), DecorationState.SELECTED);
            this.decorator.setStatusLine(`Reviewing nodes adjacent to ${graph.getVertexLabel(currentNode+1)}.`);
            if (this.counts[this.queue.values().next().value] <= 0){
                this.counts[this.queue.values().next().value] = 0
                this.queue.delete(this.queue.values().next().value)
                this.decorator.setVertexState((currentNode + 1), DecorationState.DISABLED);
                this.decorator.setStatusLine(`Finished with node ${graph.getVertexLabel(currentNode+1)}.`);
                if (this.queue.size > 0){
                    currentNode = this.queue.values().next().value;
                    this.decorator.setStatusLine(`Reviewing nodes adjacent to ${graph.getVertexLabel(currentNode+1)}.`);
                } else {
                    break;
                }
            }
            let currentNeighbors:number[] = this.adjList[currentNode];
            // console.log(this.queue);
            // console.log(`Queue: ${this.queue}, Value: ${this.queue.values().next().value}, Current Node: ${currentNode}, Current Neighbors: ${currentNeighbors}`);
            for (const adjacentNodeIndex of currentNeighbors){
                this.decorator.setStatusLine(`Reviewing node ${graph.getVertexLabel(adjacentNodeIndex+1)}.`);
                this.counts[adjacentNodeIndex] -= 1;
                if (this.counts[currentNode] > 0){
                    this.counts[currentNode] -= 1;
                }

                if (!this.queue.has(adjacentNodeIndex) && this.counts[adjacentNodeIndex] > 0){
                    this.queue.add(adjacentNodeIndex);
                }
    			if (this.colorCounts[adjacentNodeIndex] <= this.colorCounts[currentNode]){
	    			this.colorCounts[adjacentNodeIndex] = 1 + this.colorCounts[currentNode]
                }
            console.log(graph);
            await delayFunction(2000);
            }
        }
        numberOfColors = this.colorCounts.length > 0 ? this.colorCounts.reduce((min, num) => Math.min(min, num), this.colorCounts[0]) : -1;
        console.log(`Colors: ${this.colors}, Colors Counts: ${this.colorCounts}, min number ${numberOfColors}`);
        this.decorator.setStatusLine(`${numberOfColors} number of colors is the minimum coloring for the graph.`);
        return {
            graph: this.colorTree,
            name: null,
            message: {
                level: "success",
                title: "Execution Complete",
                text: numberOfColors.toString() + " numberOfColors found in the graph."
            }
        };
    }

    getFullName() {
        return "Minimum Color Algorithm";
    }
}
