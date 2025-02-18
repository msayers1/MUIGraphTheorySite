
import Konva from 'konva';

import GraphTabs from "./graphtabs";

export type ToolName = "delete" | "default" | "text";

export class Tools {
    private currentTool: ToolName = "default";
    private stage: Konva.Stage;


    clickTool(data_tool: string): void {
        this.setCurrentTool(data_tool as ToolName);

    }

    constructor(private graphTabs: GraphTabs, toolSwitchCallback?: () => void) {
        this.stage = this.graphTabs.getStage();
        // $("#tool-buttons-container").find('button').on('click', (e) => {
        //     $("#tool-buttons-container").find('button').removeClass('btn-dark');
        //     $("#tool-buttons-container").find('button').addClass('btn-outline-dark');
        //     const targetBtn = $(e.target).closest("[data-tool]");
        //     targetBtn.removeClass('btn-outline-dark');
        //     targetBtn.addClass('btn-dark');
        //     this.setCurrentTool(targetBtn.attr("data-tool") as ToolName);
        //     toolSwitchCallback?.();
        // });
    }

    private setCurrentTool(toolName: ToolName) {
        this.currentTool = toolName;
        this.setCorrectCursor();
    }

    getCurrentTool(): ToolName {
        return this.currentTool;
    }

    setCorrectCursor() {
        if (this.currentTool == "default") {
            this.stage.container().style.cursor = "default";
        } else if (this.currentTool == "delete") {
            this.stage.container().style.cursor = "url(img/x-lg.svg) 8 8, auto";
        } else if (this.currentTool == "text") {
            this.stage.container().style.cursor = "text";
        } else if (this.currentTool == "color") {
            // this.stage.container().style.cursor = "grab";
            this.stage.container().style.cursor = "url(img/palette.cur), auto";
        } else {
            throw new Error(`Tool ${this.currentTool} has no associated cursor!`);
        }
    }
}
