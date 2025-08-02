//utils
export type { BrowserEnvironment } from "./interfaces/browser-environment";
export type { EventSystem } from "./interfaces/event-system";
export type { ListenerEntry } from "./interfaces/listener-entry";

//core
export type { FrameContext } from "./interfaces/frame-context";
export type { EngineHook } from "./interfaces/engine-hook";

//utils implementations
export { BrowserEventSystem } from "./core/browser-event-system";
export { RealBrowserEnvironment } from "./core/real-browser-environment";
