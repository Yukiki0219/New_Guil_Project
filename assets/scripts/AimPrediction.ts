import { launchSpeed, Marble, RADIUS } from './GameModel';

/** Read-only straight sweep before the first contact. Ground-plane pixels throughout.
 * The ring is a preview limit, not a physical wall. An outside launch may enter it.
 * Damping estimates the next 0.8 seconds, not the complete stopping distance.
 */
export function predictAim(x: number, y: number, dx: number, dy: number,
    power: number, balls: readonly Marble[], damping: number, radius = 32) {
    const magnitude = Math.hypot(dx, dy);
    if (!Number.isFinite(x + y + magnitude + power) || magnitude < 1e-6) return null;
    dx /= magnitude; dy /= magnitude;
    const speed = launchSpeed((power - 1) / 99);
    let distance = damping > 0 ? speed * (1 - Math.exp(-damping * .8)) / damping : speed * .8;
    let hit: 'range' | 'marble' | 'boundary' = 'range';
    const roots = (cx: number, cy: number, r: number) => {
        const ox = x - cx, oy = y - cy, projection = ox * dx + oy * dy;
        const discriminant = projection * projection - (ox * ox + oy * oy - r * r);
        return discriminant < -1e-7 ? null : [-projection - Math.sqrt(Math.max(0, discriminant)), -projection + Math.sqrt(Math.max(0, discriminant))];
    };
    const limit = (t: number, kind: typeof hit) => {
        if (t >= 0 && t <= distance) { distance = t; hit = kind; }
    };
    // Swept disc: enlarge each target by the shooter's collision radius.
    for (const ball of balls) {
        if (ball.gone || ball.shooter) continue;
        if (Math.hypot(x - ball.x, y - ball.y) <= radius + ball.r) { limit(0, 'marble'); continue; }
        const contact = roots(ball.x, ball.y, radius + ball.r);
        if (contact) limit(contact[0], 'marble');
    }
    // Allow entry from the launch area; stop at the far edge when the leading rim exits.
    const inner = roots(0, 0, Math.max(0, RADIUS - radius));
    if (inner && inner[1] >= 0) limit(inner[1], 'boundary');
    else {
        // A grazing shot that never fits inside the ring stops at its first rim contact.
        const outer = roots(0, 0, RADIUS + radius);
        if (outer) limit(outer[0], 'boundary');
    }
    return { x: x + dx * distance, y: y + dy * distance, distance, hit };
}
