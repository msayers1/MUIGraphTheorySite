// import $ from "jquery";

import * as Layout from "../drawing/layouts";
import GraphTabs from "./graphtabs";

export default class AutoLayout {
    graphTabs: GraphTabs;

    constructor(graphTabs: GraphTabs) {
        this.graphTabs = graphTabs;
    }

    setLayout(layoutName: Layout.LayoutName) {
        const drawing = this.graphTabs.getActiveGraphDrawing();
        if (drawing == undefined) {
            return;
        }
        const layout = Layout.getLayoutForStageDims(layoutName,
            this.graphTabs.getStageDims());
        drawing.renderGraph(layout);
    }
}
