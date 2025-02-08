import Sortable from "sortablejs";

export type TabType = "empty-directed" | "empty-undirected" | "generated" |
    "loaded" | "empty-directed-weighted" | "empty-undirected-weighted" |
    "empty-euclidean";

export type TabEventCallback = (id: number) => void;
export type TabCreatedCallback = (id: number, tabType: TabType) => void;
export interface tabObject {id:number, name:string, editable:boolean};

export class TabBar {
    private nextId: number;
    private activeId: number;
    private prevActiveId: number;
    private tabActivatedCallback: TabEventCallback;
    private tabDeactivatedCallback: TabEventCallback;
    private tabClosedCallback: TabEventCallback;
    private tabCreatedCallback: TabCreatedCallback;
    tabArray;

    constructor() {
        // super();
        //const shadow = this.attachShadow({mode: 'open'});
        // const template: HTMLTemplateElement = document.querySelector("#tabbar-template");
        // const templateFrag = document.importNode(template.content, true);
        // this.appendChild(templateFrag);
        // Sortable.create(this.querySelector("ul"));
        this.nextId = 0;
        this.prevActiveId = undefined;
        this.activeId = undefined;
        this.tabArray = [];

    }

    setTabDeactivatedCallback(tabDeactivatedCallback: TabEventCallback) {
        this.tabDeactivatedCallback = tabDeactivatedCallback;
    }

    setTabActivatedCallback(tabActivatedCallback: TabEventCallback) {
        this.tabActivatedCallback = tabActivatedCallback;
    }

    setTabClosedCallback(tabClosedCallback: TabEventCallback) {
        this.tabClosedCallback = tabClosedCallback;
    }

    setTabCreatedCallback(tabCreatedCallback: TabCreatedCallback) {
        this.tabCreatedCallback = tabCreatedCallback;
    }

    makeTitleEditable(tabId: number) {
        const tabIndex = this.tabArray.findIndex((tab:tabObject) => tab.id === tabId);
        if (tabIndex === -1) return; // If the tab is not found
        this.tabArray[tabIndex].editable = true;        
    }

    makeTitleNonEditable(tabId: number) {
        const tabIndex = this.tabArray.findIndex((tab:tabObject) => tab.id === tabId);
        if (tabIndex === -1) return; // If the tab is not found
        this.tabArray[tabIndex].editable = false;    
    }

    addTabElement(title: string, tabType: TabType): number {
        const id = this.getNextId();
        // const template: HTMLTemplateElement = document.querySelector("#tab-template");
        // const tabFrag = document.importNode(template.content, true);
        // const titleSpan = tabFrag.querySelector("a.nav-link span");
        // titleSpan.innerHTML = title;
        // tabFrag.firstElementChild.setAttribute("data-id", "" + id);
        // tabFrag.firstElementChild.querySelector("a").onclick = () => {
        //     const active = this.getActiveTabId();
        //     if (active != id) {
        //         this.setActiveById(id);
        //     }
        // };
        // const closeIcon = $(tabFrag.firstElementChild).find("i");
        // closeIcon.on('mouseover', () => {
        //     closeIcon.removeClass("bi-x-square");
        //     closeIcon.addClass("bi-x-square-fill");
        // });
        // closeIcon.on('mouseout', () => {
        //     closeIcon.removeClass("bi-x-square-fill");
        //     closeIcon.addClass("bi-x-square");
        // });
        // closeIcon.on('click', (event) => {
        //     const activeTabId = this.getActiveTabId();
        //     if (id == activeTabId) {
        //         // Active tab was closed, so call deactivated callback
        //         this.tabDeactivatedCallback?.(id);
        //         this.removeById(id);
        //         this.tabClosedCallback?.(id);
        //         const lastTabId = this.getLastTabId();
        //         if (lastTabId != undefined) {
        //             this.setActiveById(lastTabId);
        //         }
        //     } else {
        //         this.removeById(id);
        //         this.tabClosedCallback?.(id);
        //     }
        //     event.stopPropagation();
        // });
        // const container = this.querySelector("#tabbar");
        // container.appendChild(tabFrag);
        this.tabArray = [... this.tabArray, {id:id, name:`${title}-${id}`, editable:true}]
        this.tabCreatedCallback(id, tabType);
        return id;
    }

    containsTabWithId(id: number) {
        // return $("#tabbar").children(`li[data-id=${id}]`) != undefined;
    }

    setActiveById(id: number) {
        this.prevActiveId = this.getActiveTabId();
        if (this.prevActiveId != undefined) {
            // this.makeTitleNonEditable(this.prevActiveId);
            console.log(this.prevActiveId);
            this.tabDeactivatedCallback?.(this.prevActiveId);
        }
        // $("#tabbar").children().children("a").removeClass("active");
        // $("#tabbar").children().children("a").addClass("bg-secondary");
        // const a = $("#tabbar").children(`li[data-id=${id}]`).children("a");
        // a.addClass("active");
        // a.removeClass("bg-secondary");
        this.makeTitleEditable(id);
        this.tabActivatedCallback?.(id);
        this.activeId = id;
    }

    changeTab(id: number) {
        this.prevActiveId = this.getActiveTabId();
        if (this.prevActiveId != undefined) {
            this.makeTitleNonEditable(this.prevActiveId);
            this.tabDeactivatedCallback?.(this.prevActiveId);
        }
        // $("#tabbar").children().children("a").removeClass("active");
        // $("#tabbar").children().children("a").addClass("bg-secondary");
        // const a = $("#tabbar").children(`li[data-id=${id}]`).children("a");
        // a.addClass("active");
        // a.removeClass("bg-secondary");
        this.makeTitleEditable(id);
        this.tabActivatedCallback?.(id);
        return(this.tabArray);
    }

    getLastTabId() {
        // const id = $("#tabbar").children("li").last().attr("data-id");
        // return id ? parseInt(id) : undefined;
        return this.prevActiveId;
    }

    getActiveTabId(): number {
        // const id = $("#tabbar").find("a.active").parent().attr("data-id");
        // return id ? parseInt(id) : undefined;
        return this.activeId;
    }

    getActiveTabTitle(): string {
        // return $("#tabbar").find("a.active").children("span").html();
        return this.tabArray[this.activeId].name;
    }

    removeById(id: number) {
        // $("#tabbar").children(`li[data-id=${id}]`).remove();
        const tabIndexToRemove = this.tabArray.findIndex((tab:tabObject) => tab.id === id);
        if (tabIndexToRemove === -1) return; // If the tab is not found
        // Remove the tab from the array
        this.tabDeactivatedCallback(id);
        const updatedTabs = this.tabArray.filter((tab:tabObject) => tab.id !== id);
        this.tabArray = updatedTabs;
        if (id === this.activeId) {
            // If there are remaining tabs, set the first tab as the active one
            if (this.tabArray.length > 2) {
                const nextActiveTab = updatedTabs[Math.min(tabIndexToRemove, updatedTabs.length - 2)].id;
                this.activeId = nextActiveTab;
                this.prevActiveId = updatedTabs[Math.min(tabIndexToRemove + 1, updatedTabs.length - 1)].id;
            } else if (this.tabArray.length > 1) {
                const nextActiveTab = updatedTabs[Math.min(tabIndexToRemove, updatedTabs.length - 1)].id;
                this.activeId = nextActiveTab;
                this.prevActiveId = undefined;
            } else {
            // No more tabs available, reset active ID to an empty string or handle as needed
            this.activeId = undefined;
            this.prevActiveId = undefined;
            }
        } else if (id === this.prevActiveId) {   // If the removed tab was the active tab, update prevActiveId
        
            // If there are remaining tabs, set the first tab as the active one
            if (this.tabArray.length > 2) {
            const nextActiveTab = updatedTabs[Math.min(tabIndexToRemove, updatedTabs.length - 2)].id;
            this.prevActiveId = nextActiveTab;
            } else {
            // No more tabs available, reset active ID to an empty string or handle as needed
            this.prevActiveId = undefined;
            }
        }
        return(updatedTabs);
    }

    private getNextId(): number {
        const next = this.nextId;
        this.nextId += 1;
        return next;
    }
}

// customElements.define('tab-bar', TabBar);
