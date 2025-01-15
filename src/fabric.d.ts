import "fabric";

declare module "fabric" {
    export class EraserBrush extends BaseBrush {
        constructor(canvas: Canvas);
    }
}
