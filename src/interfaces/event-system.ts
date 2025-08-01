export interface EventSystem {
    add(
        target: "window" | "document" | HTMLElement,
        event: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;

    remove(
        target: "window" | "document" | HTMLElement,
        event: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;

    removeAll(): void;
}
