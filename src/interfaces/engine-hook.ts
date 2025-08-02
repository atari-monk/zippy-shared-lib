import { FrameContext } from "./frame-context";

export interface EngineHook {
    frameTick(context: FrameContext): void;
}
