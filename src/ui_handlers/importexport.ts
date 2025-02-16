// import $ from "jquery";
import GraphTabs, { ErrorHandler } from "./graphtabs";
import { GraphDrawing } from "../drawing/graphdrawing";
import { v4 as uuidv4 } from 'uuid';


export type ImportGraphCallback = (drawing: GraphDrawing, title: string) => number|void;
// type AlertSeverity  = "error" | "warning" | "info" | "success";
export default class ImportExport {
    graphTabs: GraphTabs;
    private importGraphCallback: ImportGraphCallback;

    constructor(graphtabs: GraphTabs) {
        this.graphTabs = graphtabs;
        // $("#btn-export").on('click', this.exportCurrent.bind(this));
        // $("#btn-import").on('click', this.importNew.bind(this));
        // $("#new-import-graph-btn").on('click', this.importNew.bind(this));
    }

    saveGraph(filename: string) {
        const drawing = this.graphTabs.getActiveGraphDrawing();
        ImportExport.exportGraphDrawing(drawing, filename, this.graphTabs.errorHandler);
    }
    setImportGraphCallBack(importGraphCallback: ImportGraphCallback) {
        this.importGraphCallback = importGraphCallback;
    }

    static stripJsonExtension(filename: string) {
        return filename.slice(-4).toLowerCase() == 'json' ? filename.slice(0, -5) : filename;
    }

    static openDialogToExport(drawing: GraphDrawing, defaultName: string) {
        // $("#saveModal").modal("show");
        // $("input#saveFileName").val(defaultName);
        // $("#graphSaveForm").off("submit");
        // $("#graphSaveForm").on("submit", e => {
        //     $("#saveModal").modal("hide");
        //     const fileName = $("input#saveFileName").val().toString() + ".json";
        //     ImportExport.exportGraphDrawing(drawing, fileName.toString());
        //     e.preventDefault();
        // });
    }

    exportCurrent() {
        try{
            const tabname = this.graphTabs.tabBar.getActiveTabTitle();
            const fileName = tabname.slice(-4).toLowerCase() == 'json' ?
                tabname.slice(0, -5) : tabname;
            return fileName;
            // $("#saveModal").modal("show");
            // $("input#saveFileName").val(fileName);
            // $("#graphSaveForm").off("submit");
            // $("#graphSaveForm").on("submit", e => {
            //     const drawing = this.graphTabs.getActiveGraphDrawing();
            //     $("#saveModal").modal("hide");
            //     const fileName = $("input#saveFileName").val().toString() + ".json";
            //     ImportExport.exportGraphDrawing(drawing, fileName.toString());
            //     e.preventDefault();
            // });
        } catch {
            this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "Please select a graph json file.", level: "error" });
        }
    }

    importNew(fileList: FileList) {
        if (fileList == undefined) {
            return;
        }
        if (fileList.length == 0 || fileList[0].type != 'application/json') {
            this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "Please select a graph json file.", level: "warning" });
            // alert("Please select a graph json file.");
            return;
        }
        const newId = fileList[0].text().then(text => {
            const drawing = GraphDrawing.fromJsonString(text);
            const newId = this.importGraphCallback(drawing,
                ImportExport.stripJsonExtension(fileList[0].name));
            return(newId);
        }).catch(e => {
            console.error(e);
            this.graphTabs.errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "Error when reading file!", level: "warning" })
            // alert("Error when reading file!");
        });;
        return newId;
    }
    // importNew() {
    //     ImportExport.openFilePicker((fileList: FileList) => {
    //         if (fileList == undefined) {
    //             return;
    //         }
    //         if (fileList.length == 0 || fileList[0].type != 'application/json') {
    //             alert("Please select a graph json file.");
    //             return;
    //         }
    //         fileList[0].text().then(text => {
    //             const drawing = GraphDrawing.fromJsonString(text);
    //             this.importGraphCallback(drawing,
    //                 ImportExport.stripJsonExtension(fileList[0].name));
    //         }).catch(e => {
    //             console.error(e);
    //             alert("Error when reading file!");
    //         });;
    //     });
    // }

    // createTab(drawing: GraphDrawing, title: string) {
    //     const tabbar = this.graphTabs.getTabBar();
    //     const newId = tabbar.addTabElement(title, "loaded");
    //     tabbar.setActiveById(newId);
    //     this.graphTabs.updateGraphDrawing(newId, drawing);
    // }

    static exportGraphDrawing(drawing: GraphDrawing, fileName: string, errorHandler: ErrorHandler) {
        if (drawing == undefined) {
            errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "No graph to save!", level: "warning" })
            // alert("No graph to save!");
            return;
        }
        if (drawing.getGraph().getNumberOfVertices() == 0) {
            errorHandler({id: `${Date.now()}-${uuidv4()}`, message: "Cannot export an empty graph!", level: "warning" })
            // alert("Cannot export an empty graph!");
            return;
        }
        const jsonStr = drawing.toJsonString();
        const blob = new Blob([jsonStr], {type : 'application/json'});
        const url = URL.createObjectURL(blob);
        ImportExport.download(url, fileName);
    }

    static download(url: string, filename: string) {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // static openFilePicker(callback: (fileList: FileList) => void) {
    //     const element = document.createElement('input');
    //     element.setAttribute('type', 'file');
    //     element.style.display = 'none';
    //     document.body.appendChild(element);
    //     element.click();
    //     element.addEventListener('change', _ => {
    //         callback(element.files);
    //     });
    //     document.body.removeChild(element);
    // }
}
