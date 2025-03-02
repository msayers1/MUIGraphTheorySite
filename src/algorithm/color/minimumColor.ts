import { Algorithm, AlgorithmOutput } from "../algorithm";
import { Decorator, DecorationState } from "../../decoration/decorator";
import { Graph, UnweightedGraph } from "../../graph_core/graph";

export class ColorAlgorithm implements Algorithm<void> {

    constructor(private decorator: Decorator) {
    }

    *run(): Generator<void, AlgorithmOutput, void> {
        const graph = this.decorator.getGraph();

        // Set all vertices and edges to disabled state
        for (const vertex of graph.getVertexIds()) {
            this.decorator.setVertexState(vertex, DecorationState.DISABLED);
        }
        for (const edge of graph.getEdgeList()) {
            this.decorator.setEdgeState(edge[0], edge[1], DecorationState.DISABLED);
        }
        yield;  // Let the decorations be displayed

        // Create a set of vertices we haven't yet visited, initially all of them.
        const unvisited = graph.getVertexIds();
        var numberOfColors = 0;     // Variable to count the number of numberOfColors
        while (unvisited.size > 0) {
            // Create a graph from this component for decoration later
            const thisComponent = new UnweightedGraph(false);
            // Get one element from the unvisited set
            const vertex = unvisited.values().next().value;
            // Create an array to serve as a stack for DFS
            const stack = [vertex];
            unvisited.delete(vertex);
            thisComponent.addVertex(vertex);
            this.decorator.setVertexState(vertex, DecorationState.SELECTED);
            this.decorator.setStatusLine("Exploring component " + (numberOfColors + 1));
            yield;
            while (stack.length > 0) {
                // Pop a vertex from the stack, remove it from unvisited
                const v = stack.pop();

                var newPushed = false;  // For the yield later
                // Push all of its unvisited neighbors to the stack,
                // disregarding edge direction for directed graphs
                for (const n of graph.getVertexNeighborIds(v, true)) {
                    if (unvisited.has(n)) {
                        unvisited.delete(n);
                        stack.push(n);
                        thisComponent.addVertex(n);
                        this.decorator.setEdgeState(v, n, DecorationState.SELECTED);
                        this.decorator.setVertexState(n, DecorationState.SELECTED);
                        newPushed = true;
                    }
                    thisComponent.addEdge(v, n);
                }
                if (newPushed) {
                    yield;
                }
            }
            // We're done exploring all vertices in this component
            numberOfColors++;

            // Set vertices and edges of this component to an auxiliary state
            const auxState = DecorationState.getAuxiliaryState(numberOfColors - 1);
            for (const v of thisComponent.getVertexIds()) {
                this.decorator.setVertexState(v, auxState);
            }
            for (const e of thisComponent.getEdgeList()) {
                this.decorator.setEdgeState(e[0], e[1], auxState);
            }
            this.decorator.setStatusLine(thisComponent.getVertexIds().size +
                " vertices found in component " + numberOfColors);
            yield;
        }
        this.decorator.setStatusLine("Graph has " + numberOfColors + " numberOfColors");
        // Return output with message
        return {
            graph: null,
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
