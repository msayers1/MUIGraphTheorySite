import Konva from 'konva';
// import $ from "jquery";

import { TabBar, TabType } from "../components/tabbar";
import { GraphDrawing, EuclideanGraphDrawing } from "../drawing/graphdrawing";
import { Graph, UnweightedGraph, WeightedGraph } from "../graph_core/graph";
import { EuclideanGraph } from "../graph_core/euclidean_graph";
import { Size } from "../commontypes";
import { AlgorithmControls, AlgorithmControlState } from "../components/algorithm_controls";
import { Tools } from "./tools";
import AutoLayout from "../ui_handlers/autolayout";
import DisplayCustomizer from './display_customizer';
import BookmarkedGraphs from './bookmarked';
import ImportExport from './importexport';
import GraphGenerate from './graphgenerate';
import { BipartiteLayout } from '../drawing/layouts';
import { ErrorPackage } from '../outsideKonva/ErrorSnackbar';
import AlgorithmControl from './algorithm_control';
import { ColorInformation } from '../decoration/color';

export type ErrorHandler = (ErrorPackage) => void;

export default class GraphTabs {
    autoLayout: AutoLayout;
    activeColor: ColorInformation;
    colorInformation: ColorInformation[];
    displayCustomizer: DisplayCustomizer;
    graphGenerate:GraphGenerate; 
    importExport: ImportExport;
    tabBar: TabBar;
    bookmarkedGraphs: BookmarkedGraphs;
    tabDrawings: {[id: number]: GraphDrawing} = {};
    controlPanels: {[id: number]: AlgorithmControls } = {};
    algortihmControl: AlgorithmControl;
    tabSwitchCallbacks: (() => void)[];
    callbackClickToAddText: ((state:boolean)=>void);
    callbackNoGraphText: ((state:boolean)=>void);
    correctControlPanelCallback: ((algorithmControlState: AlgorithmControlState)=>void);
    tools: Tools;
    errorHandler: ErrorHandler
    // Possible direction to update
    // update: boolean;
    private clickToAddUpdater: () => void;

    constructor(private stage: Konva.Stage, callbackClickToAddText:((state:boolean)=>void), callbackNoGraphText: ((state:boolean)=>void), correctControlPanelCallback: ((algorithmControlState: AlgorithmControlState)=>void), errorHandler: ErrorHandler) {
        // Possible direction to update
        // this.update = false;
        this.colorInformation = this.fillColor();
        this.tabSwitchCallbacks = [];
        this.callbackClickToAddText = callbackClickToAddText;
        this.callbackNoGraphText = callbackNoGraphText;
        this.correctControlPanelCallback = correctControlPanelCallback;
        this.importExport = new ImportExport(this);
        this.tabBar = new TabBar();
        this.autoLayout = new AutoLayout(this);
        this.displayCustomizer = new DisplayCustomizer(this);
        this.graphGenerate = new GraphGenerate(this);
        this.bookmarkedGraphs = new BookmarkedGraphs(this);
        this.errorHandler = errorHandler;
        this.algortihmControl = new AlgorithmControl(this);
        // $("#clickToAddText").hide();
        this.callbackClickToAddText(false);
        this.clickToAddUpdater = () => {
            const graph = this.getActiveGraphDrawing()?.getGraph();
            const tool = this.tools.getCurrentTool();
            if (graph == undefined) {
                return;
            }
            if (graph.getVertexIds().size > 0 ||  tool != "default") {
                // $("#clickToAddText").hide();
                this.callbackClickToAddText(false);
            } else {
                // $("#clickToAddText").show();
                this.callbackClickToAddText(true);
            }
        };
        this.tools = new Tools(this, this.clickToAddUpdater);
        this.tabBar.setTabCreatedCallback((id: number, tabType: TabType) => {
            let graph: Graph;
            switch (tabType) {
                case "empty-directed":
                    graph = new UnweightedGraph(true);
                    break;
                case "empty-undirected":
                    graph = new UnweightedGraph(false);
                    break;
                case "empty-directed-weighted":
                    graph = new WeightedGraph(true);
                    break;
                case "empty-undirected-weighted":
                    graph = new WeightedGraph(false);
                    break;
                case "empty-euclidean":
                    graph = new EuclideanGraph();
                    break;
                default:
                    graph = new UnweightedGraph(true);
            }
            if (graph instanceof EuclideanGraph) {
                this.tabDrawings[id] = new EuclideanGraphDrawing(graph);
            } else {
                this.tabDrawings[id] = GraphDrawing.create(graph);
            }
            if (Object.keys(this.tabDrawings).length == 1) {
                // $("#noGraphText").hide();
                this.callbackNoGraphText(false);
            }
        });
        this.tabBar.setTabActivatedCallback((id: number) => {
            // console.log(`Set Tab Active in GraphTabs ${id}`);
            this.stage.removeChildren();
            this.stage.clear();
            this.tabDrawings[id].attachStage(this.stage, this.tools);
            this.tabDrawings[id].renderGraph();
            this.setCorrectControlPanel(id);
            this.tabSwitchCallbacks.forEach(cb => cb());
            this.clickToAddUpdater();
            this.tabDrawings[id].setGraphEditCallback(this.clickToAddUpdater);
        });
        this.tabBar.setTabDeactivatedCallback((id: number) => {
            if(this.tabDrawings[id]){
                this.tabDrawings[id].detachStage();
                // $("#clickToAddText").hide();
                this.callbackClickToAddText(false);
                this.tabDrawings[id].setGraphEditCallback(undefined);
                this.controlPanels[id]?.onDetach();
                // this.stage.removeChildren();
                // this.stage.clear();
            }
        });
        this.tabBar.setTabClosedCallback((id: number) => {
            delete this.tabDrawings[id];
            $(this.controlPanels[id]).remove();
            delete this.controlPanels[id];
            if (Object.keys(this.tabDrawings).length == 0) {
                // $("#noGraphText").show();
                this.callbackNoGraphText(true);
            }
        });
        this.bookmarkedGraphs.setBookmarkRetrievalCallback((drawing: GraphDrawing, title: string) => {
            const newId = this.tabBar.addTabElement(title, "loaded");
            this.tabBar.setActiveById(newId);
            this.updateGraphDrawing(newId, drawing);
            return newId;
        });
        this.importExport.setImportGraphCallBack((drawing: GraphDrawing, title: string) => {
            const newId = this.tabBar.addTabElement(title, "loaded");
            this.tabBar.setActiveById(newId);
            this.updateGraphDrawing(newId, drawing);
            return newId;
        })

        this.graphGenerate.setGenerateCallback((title: string, type: TabType, drawing: GraphDrawing)=>{
            const newId = this.tabBar.addTabElement(title, type);
            this.tabBar.setActiveById(newId);
            this.updateGraphDrawing(newId, drawing);
            return newId;
        })
        // Possible direction to update
        // this.bookmarkedGraphs.setBookmarkActionCallback(()=>{
            // this.update = true;
        // })
    }
    // Resetting the update
    // resetUpdateFlag() {
        // this.update = false;
    // }
    // updateGraphDrawing(id: number, graphDrawing: GraphDrawing) {
    //     const active = this.tabBar.getActiveTabId();
    //     if (active == id) {
    //         this.tabDrawings[id].detachStage();
    //         this.stage.destroyChildren();
    //         this.stage.clear();
    //         this.tabDrawings[id] = graphDrawing;
    //         this.tabDrawings[id].attachStage(this.stage, this.tools);
    //         this.tabDrawings[id].renderGraph();
    //         this.clickToAddUpdater();
    //     } else {
    //         this.tabDrawings[id] = graphDrawing;
    //     }
    // }
    fillColor() {
        const initialColorLoad = [ '#e6194b', '#3cb44b', '#ffe119',
            '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c',
            '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000',
            '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#000000'
        ];
        const colorInformation = initialColorLoad.map((color, index) => ({
            colorId: index, // Assigns a unique ID (1-based index)
            colorString: color,
          }));
        this.activeColor = colorInformation[0];
        return(colorInformation)
    }

    updateColor (color: ColorInformation) {
        // console.log(color);
        this.activeColor = color;
    }

    updateGraphDrawing(id: number, graphDrawing: GraphDrawing) {
        // console.log(`Id:${id}, active ${this.tabBar.getActiveTabId()}`);
        // // const active = this.getActiveTabId();
        // const active = this.tabBar.getActiveTabId();
        // if (active == id || bookmarkFlag) {
            this.tabDrawings[id].detachStage();
            this.stage.destroyChildren();
            this.stage.clear();
            this.tabDrawings[id] = graphDrawing;
            this.tabDrawings[id].attachStage(this.stage, this.tools);
            this.tabDrawings[id].renderGraph();
            this.clickToAddUpdater();
        // } else {
        //     this.tabDrawings[id] = graphDrawing;
        // }
    }


    setControlPanelForActiveTab(controlPanel: AlgorithmControls) {
        // TODO properly dispose pre-existing panel
        // this.controlPanels[this.tabBar.getActiveTabId()] = controlPanel;
        this.controlPanels[this.tabBar.getActiveTabId()] = controlPanel;
        // this.setCorrectControlPanel(this.tabBar.getActiveTabId());
        this.setCorrectControlPanel(this.tabBar.getActiveTabId());
    }

    private setCorrectControlPanel(id: number) {
        const controls = this.controlPanels[id]
        if(controls != undefined){
                this.correctControlPanelCallback(controls.getAlgorithmControlState());
        }
    }

    // getActiveGraphDrawing(): GraphDrawing {
    //     return this.tabDrawings[this.tabBar.getActiveTabId()];
    // }

    getActiveGraphDrawing(): GraphDrawing {
        return this.tabDrawings[this.tabBar.getActiveTabId()];
    }

    getStageDims(): Size {
        return {width: this.stage.width(), height: this.stage.height()};
    }

    getTabBar(): TabBar {
        return this.tabBar;
    }

    registerTabSwitchCallback(callback: () => void) {
        this.tabSwitchCallbacks.push(callback);
    }

    getTools() {
        return this.tools;
    }

    getStage() {
        return this.stage;
    }
}
