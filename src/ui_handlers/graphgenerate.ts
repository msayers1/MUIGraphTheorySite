// import $ from "jquery";

import GraphTabs from "./graphtabs";
import * as Layout from "../drawing/layouts";
import { GraphDrawing } from "../drawing/graphdrawing";
import * as GraphUtil from "../graph_core/graph_util";
import { TabType } from '../components/tabbar';

export interface GenerateGraphPackage {
    graphType: string;
    numVertices: number;
    secondNumVertices: number;
    weighted: boolean;
    directed: boolean;
}

export type GenerateGraphCallback = (title: string, type: TabType, graphDrawing: GraphDrawing) => number;

export default class GraphGenerate {
    private generateGraphCallback: GenerateGraphCallback;

    constructor(private graphTabs: GraphTabs) {
    //     $(".conditional-show[data-showon=complete-bipartite]").hide();
    //     $("#selectGraphType").val('complete');
    //     $("#selectGraphType").on('change', e => {
    //         const val = (e.target as HTMLInputElement).value;
    //         $(".conditional-show").hide();
    //         $(`.conditional-show[data-showon=${val}`).show();
    //     });
    //     $("#graphGenerateForm").on("submit", e => {
    //         const kind = $("#selectGraphType").val();
    //         e.preventDefault();
    //         if (kind == "complete") {
    //             this.createCompleteGraph();
    //         } else {
    //             this.createCompleteBipartiteGraph()
    //         }
    //         $("#generateModal").modal("hide");
    //     });
    }

    setGenerateCallback(generateGraphCallback: GenerateGraphCallback) {
        this.generateGraphCallback = generateGraphCallback;
    }
    
    public GraphGenerate(formSubmission: GenerateGraphPackage) {
        var newId: number;
        switch(formSubmission.graphType){
            case "Complete-Graph":
                newId = this.createCompleteGraph(formSubmission.numVertices, formSubmission.weighted, formSubmission.directed);
                break;
            case "Complete-Bipartite-Graph":
                newId = this.createCompleteBipartiteGraph(formSubmission.numVertices, formSubmission.secondNumVertices, formSubmission.weighted, formSubmission.directed)
                break;
        }
        return newId;
    }
    private createCompleteGraph(n: number, weighted: boolean, directed:boolean) {
        // const n = parseInt($("#inputNumVertices").val() as string);
        // const tabbar = this.graphTabs.getTabBar();
        // const newId = tabbar.addTabElement(`Complete Graph (K_${n})`, "generated");
        // tabbar.setActiveById(newId);
        const layout = new Layout.CircularLayout(this.graphTabs.getStageDims());
        // const weighted = $("#genWeightedCheck").is(":checked");
        const graphDrawing = GraphDrawing.create(GraphUtil.completeGraph(n, weighted, directed));
        graphDrawing.layoutWithoutRender(layout);
        const newId = this.generateGraphCallback(`Complete Graph (K_${n})`, "generated", graphDrawing);
        // this.graphTabs.updateGraphDrawing(newId, graphDrawing);
        return newId;

    }

    private createCompleteBipartiteGraph(m: number, n: number, weighted: boolean, directed:boolean) {
        // const m = parseInt($("#inputLeftVertices").val() as string);
        // const n = parseInt($("#inputRightVertices").val() as string);
        // const tabbar = this.graphTabs.getTabBar();
        // const newId = tabbar.addTabElement(`K_${m},${n}`, "generated");
        // tabbar.setActiveById(newId);
        const layout = new Layout.BipartiteLayout(this.graphTabs.getStageDims());
        // const weighted = $("#genWeightedCheck").is(":checked");
        // const directed = $("#genDirectedCheck").is(":checked");
        const graphDrawing = GraphDrawing.create(GraphUtil.completeBipartiteGraph(m, n, weighted, directed));
        graphDrawing.layoutWithoutRender(layout);
        const newId = this.generateGraphCallback(`K_${m},${n}`, "generated", graphDrawing);
        // this.graphTabs.updateGraphDrawing(newId, graphDrawing);
        return newId;

    }
}
