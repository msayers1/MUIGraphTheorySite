// import $ from "jquery";
import GraphTabs, { ErrorHandler } from "./graphtabs";
import { GraphDrawing } from "../drawing/graphdrawing";
import { v4 as uuidv4 } from 'uuid';
import { MessagePackage } from "../outsideKonva/MessageSnackbar";
import { AlertSeverity } from "../outsideKonva/ErrorSnackbar";

export  type MessageLevel = "info" | "warning" | "failure" | "success";
export interface Message {
    level: MessageLevel;
    text: string;
    title: string;
}

export interface StatusPackage {
    id: string;
    text: string;
    fadeDelay: number;
}


export type NotificationServiceMessageCallback = (messagePackage: MessagePackage) => void;
export type NotificationServiceStatusCallback = (statusPackage: StatusPackage) => void;

// type AlertSeverity  = "error" | "warning" | "info" | "success";
export default class NotificationService {
    graphTabs: GraphTabs;
    private notificationServiceMessageCallback: NotificationServiceMessageCallback;
    private notificationServiceStatusCallback: NotificationServiceStatusCallback;

    constructor(graphtabs: GraphTabs) {
        this.graphTabs = graphtabs;

    }

    setNotificationServiceMessageCallback(notificationServiceMessageCallback: NotificationServiceMessageCallback) {
        this.notificationServiceMessageCallback = notificationServiceMessageCallback;
    }

    setNotificationServiceStatusCallback(notificationServiceStatusCallback: NotificationServiceStatusCallback) {
        this.notificationServiceStatusCallback = notificationServiceStatusCallback;
    }

    showMessage(message: Message) {
        var level: AlertSeverity = "success";
        if (message.level != "failure") {
            level = message.level as AlertSeverity; // Type assertion
        } else {
            level = "error";
        }
        
        const messagePackage:MessagePackage = {id: `${Date.now()}-${uuidv4()}`, message: `${message.title}: ${message.text}`, level: level }
        this.notificationServiceMessageCallback(messagePackage);
    }

    showWarning(title: string, text: string) {
        this.showMessage({ level: "warning", text: text, title: title});
    }
    
    showInfo(title: string, text: string) {
        this.showMessage({ level: "info", text: text, title: title});
    }
    
    showStatus(text: string, fadeDelay: number) {
        const statusPackage:StatusPackage = {id: `${Date.now()}-${uuidv4()}`, text: text, fadeDelay: fadeDelay  }
        this.notificationServiceStatusCallback(statusPackage);
    }
    

}


export function showMessage(message: Message) {
    // $(".toast").removeClass('text-white bg-warning bg-primary bg-success bg-danger');
    if (message.level == "warning") {
        // $(".toast").addClass('text-white bg-warning');
    } else if (message.level == "info") {
        // $(".toast").addClass('text-white bg-primary');
    } else if (message.level == "success") {
        // $(".toast").addClass('text-white bg-success');
    } else if (message.level == "failure") {
        // $(".toast").addClass('text-white bg-danger');
    }
    // $(".toast").find("#toast-title").text(message.title);
    // $(".toast").find(".toast-body").text(message.text);
    // $(".toast").toast('show');
}

export function showWarning(title: string, text: string) {
    showMessage({ level: "warning", text: text, title: title});
}

export function showInfo(title: string, text: string) {
    showMessage({ level: "info", text: text, title: title});
}

export function showStatus(text: string, fadeDelay: number) {
    // // const span = $("#statusLine").find("span");
    // const addNew = () => {
    //     const $element = $('<span>');
    //     $element.html(text);
    //     $element.hide();
    //     $("#statusLine").append($element);
    //     $element.fadeIn(fadeDelay);
    // }
    // if (span.length == 0) {
    //     addNew();
    // } else {
    //     span.fadeOut(fadeDelay, () => {
    //         span.remove();
    //         addNew();
    //     });
    // }
}
