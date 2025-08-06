export type FrameContext = {
    readonly ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;
    readonly deltaTime: number;
    readonly totalTime: number;
};

export interface EngineHook {
    frameTick(context: FrameContext): void;
}
