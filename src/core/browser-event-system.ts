import type { BrowserEnvironment } from "../interfaces/browser-environment.js";
import type { EventSystem } from "../interfaces/event-system.js";
import type { ListenerEntry } from "../interfaces/listener-entry.js";

export class BrowserEventSystem implements EventSystem {
    private listeners: Map<string, ListenerEntry> = new Map();

    constructor(private browser: BrowserEnvironment) {}

    add(
        target: "window" | "document" | HTMLElement,
        event: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void {
        const key = this.getListenerKey(target, event, callback);
        const entry: ListenerEntry = { target, event, callback, options };

        if (this.listeners.has(key)) {
            this.remove(target, event, callback);
        }

        if (target === "window" || target === "document") {
            this.browser.addEventListener(target, event, callback, options);
        } else {
            target.addEventListener(event, callback, options);
        }

        this.listeners.set(key, entry);
    }

    remove(
        target: "window" | "document" | HTMLElement,
        event: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void {
        const key = this.getListenerKey(target, event, callback);
        const entry = this.listeners.get(key);

        if (entry) {
            if (entry.target === "window" || entry.target === "document") {
                this.browser.removeEventListener(
                    entry.target,
                    entry.event,
                    entry.callback,
                    options ?? entry.options
                );
            } else {
                entry.target.removeEventListener(
                    entry.event,
                    entry.callback,
                    options ?? entry.options
                );
            }
            this.listeners.delete(key);
        }
    }

    removeAll(): void {
        for (const [_key, entry] of this.listeners) {
            this.remove(entry.target, entry.event, entry.callback);
        }
    }

    private getListenerKey(
        target: "window" | "document" | HTMLElement,
        event: string,
        callback: EventListenerOrEventListenerObject
    ): string {
        const targetId =
            target instanceof HTMLElement ? target.id || "element" : target;
        return `${targetId}:${event}:${callback.toString().slice(0, 30)}`;
    }
}
