import { AlgorithmRunner, AlgorithmState, Algorithm, AlgorithmError, AlgorithmOutput } from "../algorithm/algorithm";
import GraphTabs from "../ui_handlers/graphtabs";
import * as Util from "../util";
import ImportExport from "../ui_handlers/importexport";
import * as Layout from "../drawing/layouts";
import { GraphDrawing } from "../drawing/graphdrawing";
import { Graph } from "../graph_core/graph";
import { VertexInput, NoVertexClickedError, SourceSinkInput } from "../commontypes";
import { Decorator, StatusSink } from "../decoration/decorator";
import { showMessage } from "../ui_handlers/notificationservice";
// import { showStatus } from "../ui_handlers/notificationservice";
import { v4 as uuidv4 } from 'uuid';

export interface AlgorithmControlState {
    algorithm_name: string;
    play_btn: boolean;
    pause_btn: boolean;
    next_btn: boolean;
    stop_btn: boolean;
    clear_btn: boolean;
    speed_slider: boolean;
    speed_slider_value: number;
    output_tab_btn: boolean;
    output_export_btn: boolean;
    output_drop_btn: boolean;
    message: string
} 

export type ControlStateChangeCallback = (algrithmControlState: AlgorithmControlState| undefined) => void;

export abstract class AlgorithmControls implements StatusSink {
    private algorithmControlState: AlgorithmControlState;
    private controlStateChangeCallback: ControlStateChangeCallback = (state)=>{};
    // protected readonly play_btn: string;
    // protected readonly pause_btn: string;
    // protected readonly next_btn: string;
    // protected readonly stop_btn: string;
    // protected readonly clear_btn: string;
    // protected readonly speed_slider: string;
    // protected readonly output_tab_btn: string;
    // protected readonly output_export_btn: string;
    // protected readonly output_drop_btn: string;
    protected decorator: Decorator;
    protected output: AlgorithmOutput;
    protected statusText: string = '';
    protected name: string = '';

    constructor(private readonly graphTabs: GraphTabs,
                protected readonly graphDrawing: GraphDrawing) {

        this.algorithmControlState = {
                algorithm_name: '',
                play_btn: true,
                pause_btn: false,
                next_btn: false,
                stop_btn: false,
                clear_btn: true,
                speed_slider: true,
                speed_slider_value: 50, 
                output_tab_btn: true,
                output_export_btn: true,
                output_drop_btn: true,
                message: ''
        };
        //const shadow = this.attachShadow({mode: 'open'});
        // const template: HTMLTemplateElement =
        //     document.querySelector("#algo-control-template");
        // const templateFrag = document.importNode(template.content, true);
        // this.appendChild(templateFrag);

        // $(this).addClass('container-fluid');

        // this.speed_slider = $(this).find("#algorithm-speed");
        // this.pause_btn = $(this).find("#btn-algo-pause");
        // this.next_btn = $(this).find("#btn-algo-next");
        // this.play_btn = $(this).find("#btn-algo-play");
        // this.stop_btn = $(this).find("#btn-algo-stop");
        // this.clear_btn = $(this).find("#btn-algo-clear");
        // this.output_tab_btn = $(this).find("#btn-algo-output-tab");
        // this.output_export_btn = $(this).find("#btn-algo-output-export");
        // this.output_drop_btn = $(this).find("#btndrop-algo-output");

        // this.pause_btn.on('click', this.onPause.bind(this));
        // this.next_btn.on('click', this.onNext.bind(this));
        // this.play_btn.on('click', this.onPlay.bind(this));
        // this.stop_btn.on('click', this.onStop.bind(this));
        // this.clear_btn.on('click', this.onClear.bind(this));
        // this.speed_slider.on('change', () => {
        //     const value = this.speed_slider.val() as number;
        //     this.getRunner().setSpeed(Number(value));
        // });
        // type ExportType = "file" | "tab"
        // const exportOutput = (how: ExportType) => {
        //     const graph = this.output.graph;
        //     if (graph == null) {
        //         alert("The algorithm did not generate any output!");
        //         return;
        //     }
        //     const graphDrawing = this.getGraphDrawingForOutput(graph);
        //     if (how == "tab") {
        //         Util.createTabWithGraphDrawing(this.graphTabs, graphDrawing,
        //             this.output.name);
        //     } else {
        //         ImportExport.openDialogToExport(graphDrawing, this.output.name);
        //     }
        // };
        // this.output_tab_btn.on('click', () => exportOutput('tab'));
        // this.output_export_btn.on('click', () => exportOutput('file'));
        this.algorithmStateChanged("init"); // TODO this is bad
    }

    setControlStateChangeCallback(controlStateChangeCallback: ControlStateChangeCallback) {
        this.controlStateChangeCallback = controlStateChangeCallback;
    }
    public newTab(graphDrawing: GraphDrawing) {
        Util.createTabWithGraphDrawing(this.graphTabs, graphDrawing,
            this.output.name);
    }

    public setSpeed(speed: number) {
        this.algorithmControlState = {
            speed_slider_value: speed,
            ...this.algorithmControlState
        }
        this.getRunner().setSpeed(speed);
    }
    public playAlgorithm() {
        this.onPlay();
    }

    public pauseAlgorithm(){
        this.onPause();
    }

    public nextStepOfAlgorithm() {
        this.onNext();
    }

    public stopAlgorithm(){
        this.onStop();
    }

    public clearAlgorithm(){
        this.onClear();
    }


    public setName(algorithmName: string) {
        this.algorithmControlState.algorithm_name = algorithmName;
    }

    public getAlgorithmControlState() {
        return this.algorithmControlState;
    };

    protected abstract executeAlgorithm(): Promise<AlgorithmOutput>;
    protected abstract getRunner(): AlgorithmRunner<any>;

    protected setDecorator(decorator: Decorator) {
        this.decorator = decorator;
    }

    protected onPlay() {
        if (this.graphDrawing.getGraph().getVertexIds().size == 0) {
            this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "Please create a graph with at least one vertex!", level: "warning" });
            // alert("Please create a graph with at least one vertex!");
            return;
        }
        const runner = this.getRunner();
        if (runner.getState() == "init" ||
            runner.getState() == "done") {
            this.algorithmStateChanged("running"); // TODO this is bad was init - Changed to running
            this.executeAlgorithm().then(output => {
                if (output.message) {
                    console.log(`Output Message: ${output.message}`);
                    this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: `${output.message.title}:${output.message.text}`, level: output.message.level });
                    //showMessage(output.message);
                }
                this.output = output;
                // this.changeButtonState(this.output_drop_btn, output.graph != null);
            }).catch(e => {
                if (e instanceof AlgorithmError) {
                    this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: e.message, level: "warning" });
                    // alert(e.message);
                } else if (e instanceof NoVertexClickedError) {
                } else {
                    this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "There was an unexpected problem with the algorithm.", level: "warning" });
                    // alert("There was an unexpected problem with the algorithm.");
                    console.error(e);
                }
            });
        } else {
            runner.resume();
        }
    }

    protected onPause() {
        this.getRunner().pause();
    }

    protected onNext() {
        this.getRunner().next();
    }

    protected onStop() {
        this.getRunner().stop();
    }

    protected onClear() {
        this.decorator.clearAllDecoration();
    }

    protected getGraphDrawingForOutput(graph: Graph): GraphDrawing {
        let layout: Layout.Layout, graphDrawing: GraphDrawing;
        if (this.graphDrawing == undefined) {
            console.warn("Graphdrawing undefined, creating circular layout");
            layout = new Layout.CircularLayout(
                this.graphTabs.getStageDims());
            graphDrawing = GraphDrawing.create(graph);
        } else {
            const positions: Layout.PositionMap = new Map();
            for (const v of graph.getVertexIds()) {
                positions.set(v, this.graphDrawing.getVertexPosition(v));
            }
            layout = new Layout.FixedLayout(positions);
            graphDrawing = GraphDrawing.create(graph);
        }
        graphDrawing.layoutWithoutRender(layout);
        return graphDrawing;
    }

    protected algorithmStateChanged(newState: AlgorithmState) {
        switch (newState) {
            case "init":
                this.changeState({algorithm_name: this.algorithmControlState.algorithm_name,play_btn: true,
                    pause_btn: false,
                    next_btn: false,
                    stop_btn: false,
                    clear_btn: true,
                    speed_slider: true,
                    speed_slider_value: this.algorithmControlState.speed_slider_value,
                    output_tab_btn: false,
                    output_export_btn: false,
                    output_drop_btn: false,
                    message: this.algorithmControlState.message
                })
                // this.changeButtonState(this.play_btn, true);
                // this.changeButtonState(this.pause_btn, false);
                // this.changeButtonState(this.next_btn, false);
                // this.changeButtonState(this.stop_btn, false);
                // this.changeButtonState(this.clear_btn, true);
                // this.changeButtonState(this.output_drop_btn, false);
                break;
            case "paused":
                this.changeState({algorithm_name: this.algorithmControlState.algorithm_name,play_btn: true,
                    pause_btn: false,
                    next_btn: true,
                    stop_btn: true,
                    clear_btn: false,
                    speed_slider: true,
                    speed_slider_value: this.algorithmControlState.speed_slider_value,
                    output_tab_btn: false,
                    output_export_btn: false,
                    output_drop_btn: false,
                    message: this.algorithmControlState.message})
                // this.changeButtonState(this.play_btn, true);
                // this.changeButtonState(this.pause_btn, false);
                // this.changeButtonState(this.next_btn, true);
                // this.changeButtonState(this.stop_btn, true);
                // this.changeButtonState(this.clear_btn, false);
                // this.changeButtonState(this.output_drop_btn, false);
                break;
            case "running":
                this.changeState({algorithm_name: this.algorithmControlState.algorithm_name,play_btn: false,
                    pause_btn: true,
                    next_btn: false,
                    stop_btn: true,
                    clear_btn: false,
                    speed_slider: true,
                    speed_slider_value: this.algorithmControlState.speed_slider_value,
                    output_tab_btn: false,
                    output_export_btn: false,
                    output_drop_btn: false,
                    message: this.algorithmControlState.message})
                // this.changeButtonState(this.play_btn, false);
                // this.changeButtonState(this.pause_btn, true);
                // this.changeButtonState(this.next_btn, false);
                // this.changeButtonState(this.stop_btn, true);
                // this.changeButtonState(this.clear_btn, false);
                // this.changeButtonState(this.output_drop_btn, false);
                break;
            case "done":
                this.changeState({algorithm_name: this.algorithmControlState.algorithm_name,play_btn: true,
                    pause_btn: false,
                    next_btn: false,
                    stop_btn: false,
                    clear_btn: true,
                    speed_slider: true,
                    speed_slider_value: this.algorithmControlState.speed_slider_value,
                    output_tab_btn: true,
                    output_export_btn: true,
                    output_drop_btn: true,
                    message: this.algorithmControlState.message})
                // this.changeButtonState(this.play_btn, true);
                // this.changeButtonState(this.pause_btn, false);
                // this.changeButtonState(this.next_btn, false);
                // this.changeButtonState(this.stop_btn, false);
                // this.changeButtonState(this.clear_btn, true);
                // this.changeButtonState(this.output_drop_btn, true);
                break;
        }
        // console.log(this.controlStateChangeCallback);
        this.controlStateChangeCallback(this.algorithmControlState);
    }

    protected setMessage(newMessage: string, delay: number){

        const newAlgorithmControlState = {
            message: newMessage,
            algorithm_name: this.algorithmControlState.algorithm_name,
            play_btn: this.algorithmControlState.play_btn,
            pause_btn: this.algorithmControlState.pause_btn,
            next_btn: this.algorithmControlState.next_btn,
            stop_btn: this.algorithmControlState.stop_btn,
            clear_btn: this.algorithmControlState.clear_btn,
            speed_slider: this.algorithmControlState.speed_slider,
            speed_slider_value: this.algorithmControlState.speed_slider_value,
            output_tab_btn: this.algorithmControlState.output_tab_btn,
            output_export_btn: this.algorithmControlState.output_export_btn,
            output_drop_btn: this.algorithmControlState.output_drop_btn
        }
        this.algorithmControlState = newAlgorithmControlState;
        // Implement delay if I want to later. 
        // console.log(`${newMessage} vs ${Object.keys(newAlgorithmControlState)}`);
        this.controlStateChangeCallback(newAlgorithmControlState);
    }
    
    protected changeState(state: AlgorithmControlState){
        this.algorithmControlState = state;
    }

    protected changeButtonState(button: string, enabled: boolean) {
        // if (enabled) {
        //     button.removeClass("disabled");
        //     button.removeAttr("disabled");
        // } else {
        //     button.addClass("disabled");
        //     button.attr("disabled", "true");
        // }
    }

    setStatus(text: string): void {
        this.statusText = text;
        this.setMessage(text, 50);
        // showStatus(text, 50);
    }

    onAttach() {
        this.setMessage(this.statusText, 0);
        // showStatus(this.statusText, 0);
    }

    onDetach() {
        this.setMessage('', 0);
        // showStatus('', 0);
    }
}

export class InputlessControls extends AlgorithmControls {

    runner: AlgorithmRunner<void>;
    algorithm: Algorithm<void>;

    constructor(AlgorithmClass: new (decorator: Decorator) => Algorithm<void>,
            graphTabs: GraphTabs, graphDrawing: GraphDrawing) {
        super(graphTabs, graphDrawing);
        this.setDecorator(graphDrawing.getDecorator(this));
        this.algorithm = new AlgorithmClass(this.decorator);
        this.runner = new AlgorithmRunner(this.algorithm);
        this.runner.setStateChangeCallback(this.algorithmStateChanged.bind(this));
        // $(this).find("#algo-name").text(this.getRunner().getAlgorithm().getFullName());

    }

    async executeAlgorithm(): Promise<AlgorithmOutput> {
        return this.getRunner().execute();
    }

    getRunner(): AlgorithmRunner<void> {
        return this.runner;
    }
}

export class VertexInputControls extends AlgorithmControls {

    private runner: AlgorithmRunner<VertexInput>;
    private algorithm: Algorithm<VertexInput>;

    constructor(AlgorithmClass: new (decorator: Decorator) => Algorithm<VertexInput>,
            graphTabs: GraphTabs, graphDrawing: GraphDrawing) {
        super(graphTabs, graphDrawing);
        this.setDecorator(graphDrawing.getDecorator(this));
        this.algorithm = new AlgorithmClass(this.decorator);
        this.runner = new AlgorithmRunner(this.algorithm);
        this.runner.setStateChangeCallback(this.algorithmStateChanged.bind(this));
        // $(this).find("#algo-name").text(this.getRunner().getAlgorithm().getFullName());
        
    }

    async executeAlgorithm(): Promise<AlgorithmOutput> {
        const title = "Select Vertex";
        const body = "Please click on a vertex to start from";
        return this.graphDrawing.enterVertexSelectMode(title, body).then(s =>
            this.getRunner().execute({ vertexId: s })
        );
    }

    getRunner(): AlgorithmRunner<VertexInput> {
        return this.runner;
    }
}

export class SourceSinkInputControls extends AlgorithmControls {

    private runner: AlgorithmRunner<SourceSinkInput>;
    private algorithm: Algorithm<SourceSinkInput>;

    constructor(AlgorithmClass: new (decorator: Decorator) => Algorithm<SourceSinkInput>,
            graphTabs: GraphTabs, graphDrawing: GraphDrawing) {
        super(graphTabs, graphDrawing);
        this.setDecorator(graphDrawing.getDecorator(this));
        this.algorithm = new AlgorithmClass(this.decorator);
        this.runner = new AlgorithmRunner(this.algorithm);
        this.runner.setStateChangeCallback(this.algorithmStateChanged.bind(this));
        // $(this).find("#algo-name").text(this.getRunner().getAlgorithm().getFullName());

    }

    async executeAlgorithm(): Promise<AlgorithmOutput> {
        const source = this.graphDrawing.enterVertexSelectMode("Select Source",
                "Please click on the source vertex.");
        const sink = source.then(_ => {
             return this.graphDrawing.enterVertexSelectMode("Select Sink",
                    "Please click on the sink vertex.");
        });
        return Promise.all([source, sink]).then(([sourceId, sinkId]) => (
            this.getRunner().execute({ sourceId: sourceId, sinkId: sinkId })
        ));
    }

    getRunner(): AlgorithmRunner<SourceSinkInput> {
        return this.runner;
    }
}

// customElements.define('inputless-controls', InputlessControls);
// customElements.define('vertexinput-controls', VertexInputControls);
// customElements.define('sourcesinkinput-controls', SourceSinkInputControls);
