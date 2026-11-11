/** Input state in Canvas design pixels, shared by mouse and touch. No engine/DOM dependency. */
export const SLING_MAX_PULL = 120;
export const SLING_DEAD_ZONE = 8;
export const SLING_HIT_RADIUS = 44;
export const GROUND_Y_SCALE = 0.87;
export class Slingshot {
    pointer: string | null = null;
    x = 0;
    y = 0;
    private startX = 0;
    private startY = 0;
    get distance() { return Math.hypot(this.x, this.y); }
    get ready() { return this.distance >= SLING_DEAD_ZONE; }
    get power() { return Math.round(1 + 99 * Math.max(0, Math.min(1, (this.distance - SLING_DEAD_ZONE) / (SLING_MAX_PULL - SLING_DEAD_ZONE)))); }
    begin(pointer: string, x: number, y: number, anchorX: number, anchorY: number) {
        if (this.pointer !== null || !Number.isFinite(x + y) || Math.hypot(x - anchorX, y - anchorY) > SLING_HIT_RADIUS) return false;
        this.pointer = pointer; this.startX = x; this.startY = y; this.x = this.y = 0;
        return true;
    }
    move(pointer: string, x: number, y: number) {
        if (pointer !== this.pointer || !Number.isFinite(x + y)) return false;
        const dx = x - this.startX, dy = y - this.startY, d = Math.hypot(dx, dy);
        const scale = d > SLING_MAX_PULL ? SLING_MAX_PULL / d : 1;
        this.x = dx * scale; this.y = dy * scale; return true;
    }
    release(pointer: string, x: number, y: number) {
        if (!this.move(pointer, x, y)) return null;
        const result = this.ready ? { x: this.x, y: this.y, power: this.power } : null;
        this.cancel(); return result;
    }
    cancel(pointer?: string) {
        if (pointer !== undefined && pointer !== this.pointer) return false;
        this.pointer = null; this.x = this.y = 0; return true;
    }
}
