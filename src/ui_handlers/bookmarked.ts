// import $ from "jquery";
import GraphTabs from "./graphtabs";
import { GraphDrawingStore, LocalGraphDrawingStore, StoredDrawingInfo } from "../store/graphstore";
import { GraphDrawing } from "../drawing/graphdrawing";
import { TabEventCallback, TabCreatedCallback, TabType } from "../components/tabbar";


export type BookmarkRetrievalCallback = (drawing: GraphDrawing, title: string) => number;
export type BookmarkActionCallback = (newBookmarks: StoredDrawingInfo[]) => void;

export default class BookmarkedGraphs {
    private store: GraphDrawingStore;
    private bookmarkRetrievalCallback: BookmarkRetrievalCallback;
    private bookmarkActionCallback: BookmarkActionCallback;

    constructor(private graphTabs: GraphTabs) {
        this.store = LocalGraphDrawingStore.getInstance();
        this.store.listenForChanges(this.update.bind(this));
        this.update();
        // $("#btn-bookmark").on('click', _ => {
        //     const drawing = graphTabs.getActiveGraphDrawing();
        //     if (drawing == undefined) {
        //         alert("No graph to bookmark!");
        //         return;
        //     }
        //     if (drawing.getGraph().getNumberOfVertices() == 0) {
        //         alert("Cannot bookmark an empty graph!");
        //         return;
        //     }
        //     const name = graphTabs.tabBar.getActiveTabTitle();
        //     this.store.storeGraphDrawing(drawing, name);
        // });
    }

    setBookmarkRetrievalCallback(retrievalBookmarkCallback: BookmarkRetrievalCallback) {
        this.bookmarkRetrievalCallback = retrievalBookmarkCallback;
    }
    setBookmarkActionCallback(bookmarkActionCallback: BookmarkActionCallback) {
        this.bookmarkActionCallback = bookmarkActionCallback;
    }

    public retrieveBookmark(item: StoredDrawingInfo) {
        // const newId = this.createTab(this.store.getGraphDrawingById(item.id),item.name);
        const newId = this.bookmarkRetrievalCallback(this.store.getGraphDrawingById(item.id),item.name);
        const bookmarks = this.store.getAllStoredInfo();
        return newId;
    }

    public removeBookmark(id: number) {
        this.store.deleteGraphDrawing(id);
        const newBookmarks = this.store.getAllStoredInfo();
        this.bookmarkActionCallback?.(newBookmarks);
    }
    public bookmark(graphTabs: GraphTabs) {
        const drawing = graphTabs.getActiveGraphDrawing();
        // graphTabs.update = true;
        // console.log(drawing);
        if (drawing == undefined) {
            alert("No graph to bookmark!");
            return;
        }
        if (drawing.getGraph().getNumberOfVertices() == 0) {
            alert("Cannot bookmark an empty graph!");
            return;
        }
        const name = graphTabs.tabBar.getActiveTabTitle();
        this.store.storeGraphDrawing(drawing, name);
        const newBookmarks = this.store.getAllStoredInfo();
        this.bookmarkActionCallback?.(newBookmarks);
    }

    public getBookmarks(): StoredDrawingInfo[] {
        const items = this.store.getAllStoredInfo();
        return items;
    }
    

    private update() {
        const newBookmarks = this.store.getAllStoredInfo();
        this.bookmarkActionCallback?.(newBookmarks);
        // const items = this.store.getAllStoredInfo();
        // for (const item of items) {
        //     console.log(`Update is being called and items: ${item.id} ${item.name}`);
        // }
        // $("#bookmarkedContainer").html('');
        // if (items.length > 0) {
        //     $("#bookmarkedContainer").append(this.getBookmarksList(items));
        // } else {
        //     $("#bookmarkedContainer").append(this.getNoBookmarks());
        // }
    }

    // Moved to setBookmarkRetrievalCallback defined in graphtabs and stored within this class. 
    // private createTab(drawing: GraphDrawing, title: string) {
    //     const tabbar = this.graphTabs.getTabBar();
    //     const newId = tabbar.addTabElement(title, "loaded");
    //     console.log(newId);
    //     tabbar.setActiveById(newId);
    //     this.graphTabs.updateGraphDrawing(newId, drawing);
    //     return newId;
    // }

    
    // This is obselete with the pulling of Jquery. 
    // private getBookmarksList(items: StoredDrawingInfo[]) {
    //     // const template: HTMLTemplateElement = document.querySelector("#bookmarks-list-template");
    //     // const list = document.importNode(template.content, true);
    //     // const itemTemplate : HTMLTemplateElement = document.querySelector("#bookmarks-item-template");
    //     // for (const item of items) {
    //     //     const itemEl = document.importNode(itemTemplate.content, true);
    //     //     $(itemEl).find("span[name=bookmark-name]").html(item.name);
    //     //     $(itemEl).find("tr").on('click', () => {
    //     //         console.log("clicked", item.id, item.name);
    //     //         const drawing = this.store.getGraphDrawingById(item.id);
    //     //         this.createTab(drawing, item.name);
    //     //     });
    //     //     $(itemEl).find("button").hide();
    //     //     $(itemEl).find("tr").on('mouseover', (e) => {
    //     //         $(e.currentTarget).find("button").show();
    //     //     });
    //     //     $(itemEl).find("tr").on('mouseout', (e) => {
    //     //         $(e.currentTarget).find("button").hide();
    //     //     });
    //     //     $(itemEl).find("button").on('click', () => {
    //     //         this.store.deleteGraphDrawing(item.id);
    //     //     });
    //     //     $(list).find("tbody").append(itemEl);
    //     // }
    //     // return list;
    // }

    private getNoBookmarks() {
        // const template: HTMLTemplateElement = document.querySelector("#no-bookmarks-template");
        // return document.importNode(template.content, true);
    }
}
