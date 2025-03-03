import { GraphDrawing } from "../drawing/graphdrawing";
import GraphTabs from "../ui_handlers/graphtabs";

export interface StoredDrawingInfo {
    id: number;
    name: string;
}

// [name, graph_json]
type StoredDrawing = [string, string];

export interface GraphDrawingStore {
    getAllStoredInfo(): StoredDrawingInfo[];
    getGraphDrawingById(id: number): GraphDrawing;
    storeGraphDrawing(graphDrawing: GraphDrawing, name: string): number;
    deleteGraphDrawing(id: number): boolean;
    listenForChanges(callback: () => void): void;
}

function isInteger(s: string): boolean {
    return !isNaN(parseInt(s));
}

export class LocalGraphDrawingStore implements GraphDrawingStore {
    graphTabs: GraphTabs;
    private static instance: LocalGraphDrawingStore;
    private changeCallback: () => void;

    private constructor(graphTabs: GraphTabs) {
        this.graphTabs = graphTabs
    }   

    static getInstance(graphTabs: GraphTabs) {
        if (LocalGraphDrawingStore.instance == null) {
            LocalGraphDrawingStore.instance = new LocalGraphDrawingStore(graphTabs);
        }
        return LocalGraphDrawingStore.instance;
    }

    getAllStoredInfo(): StoredDrawingInfo[] {
        const infos: StoredDrawingInfo[] = [];
        for (var i = 0; i < localStorage.length; i++) {
            if (isInteger(localStorage.key(i))) {
                const info = JSON.parse(localStorage.getItem(localStorage.key(i))) as StoredDrawing;
                infos.push({ id: parseInt(localStorage.key(i)), name: info[0] });
            }
        }
        return infos;
    }

    getGraphDrawingById(id: number): GraphDrawing {
        const s = JSON.parse(localStorage.getItem(id.toString())) as StoredDrawing;
        return GraphDrawing.fromJsonString(this.graphTabs, s[1]);
    }

    storeGraphDrawing(graphDrawing: GraphDrawing, name: string): number {
        const allIds = this.getAllStoredInfo().map(info => info.id);
        var nextId: number;
        if (allIds.length == 0) {
            nextId = 1;
        } else {
            nextId = Math.max(...allIds) + 1;
        }
        const storedDrawing: StoredDrawing = [ name, graphDrawing.toJsonString()];
        localStorage.setItem(nextId.toString(), JSON.stringify(storedDrawing));
        this.changeCallback();
        return nextId;
    }

    deleteGraphDrawing(id: number): boolean {
        const ids = this.getAllStoredInfo().map(i => i.id);
        if (ids.includes(id)) {
            localStorage.removeItem(id.toString());
            this.changeCallback();
            return true;
        }
        return false;
    }

    listenForChanges(callback: () => void) {
        this.changeCallback = callback;
    }
}
