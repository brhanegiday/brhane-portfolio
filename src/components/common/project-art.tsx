import type { Project, ProjectCategory } from "@/types";

/**
 * Generative artwork for a project card. Each category has its own picture
 * (a neural net, a stack of slabs, an isometric cube, a UI wireframe), and the
 * project id seeds the details, so every card is different but always the same.
 */

/** Small deterministic random number generator (mulberry32), so server and client draw the same art. */
function seededRandom(seed: string): () => number {
    let state = 0;
    for (let i = 0; i < seed.length; i++) state = (Math.imul(state, 31) + seed.charCodeAt(i)) | 0;
    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const WIDTH = 320;
const HEIGHT = 150;

function NeuralNet({ random }: { random: () => number }) {
    const layerX = [48, 124, 200, 276];
    const layers = layerX.map((x, layerIndex) => {
        const count = layerIndex === 0 || layerIndex === layerX.length - 1 ? 3 : 4 + Math.floor(random() * 2);
        return Array.from({ length: count }, (_, i) => ({ x, y: ((i + 1) / (count + 1)) * HEIGHT }));
    });

    return (
        <g>
            {layers.slice(0, -1).flatMap((layer, li) =>
                layer.flatMap((from, fi) =>
                    layers[li + 1].map((to, ti) => (
                        <line
                            key={`${li}-${fi}-${ti}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeOpacity={0.12 + random() * 0.3}
                            strokeWidth={1}
                            strokeDasharray="4 8"
                            className="animate-dash-flow"
                        />
                    )),
                ),
            )}
            {layers.flat().map((node, i) => (
                <g key={i}>
                    <circle cx={node.x} cy={node.y} r={9} fill="currentColor" fillOpacity={0.12} />
                    <circle cx={node.x} cy={node.y} r={4} fill="currentColor" />
                </g>
            ))}
        </g>
    );
}

/** Isometric slab: a top diamond with left and right faces. */
function Slab({ cx, cy, width, thickness, opacity }: { cx: number; cy: number; width: number; thickness: number; opacity: number }) {
    const depth = width / 2;
    return (
        <g>
            <path d={`M${cx - width} ${cy} L${cx} ${cy + depth} L${cx} ${cy + depth + thickness} L${cx - width} ${cy + thickness} Z`} fill="currentColor" fillOpacity={opacity * 0.45} stroke="currentColor" strokeOpacity={0.6} />
            <path d={`M${cx + width} ${cy} L${cx} ${cy + depth} L${cx} ${cy + depth + thickness} L${cx + width} ${cy + thickness} Z`} fill="currentColor" fillOpacity={opacity * 0.7} stroke="currentColor" strokeOpacity={0.6} />
            <path d={`M${cx} ${cy - depth} L${cx + width} ${cy} L${cx} ${cy + depth} L${cx - width} ${cy} Z`} fill="currentColor" fillOpacity={opacity} stroke="currentColor" strokeOpacity={0.8} />
        </g>
    );
}

function LayerStack({ random }: { random: () => number }) {
    const layers = 3 + Math.floor(random() * 2);
    return (
        <g>
            {Array.from({ length: layers }, (_, i) => (
                // Bottom slab first so upper ones draw on top; the top slab floats.
                <g key={i} className={i === layers - 1 ? "animate-float-slow" : undefined}>
                    <Slab cx={WIDTH / 2} cy={HEIGHT - 52 - i * 26} width={76 - i * 6} thickness={9} opacity={0.35 + (i / layers) * 0.5} />
                </g>
            ))}
        </g>
    );
}

function IsometricCube() {
    const cx = WIDTH / 2;
    const cy = 70;
    const s = 38;
    const h = s / 2;
    // Floor: a diamond of grid lines, point (i, j) sits at x = (i - j) * dx, y = (i + j) * dy.
    const divisions = 6;
    const dx = 100 / divisions;
    const dy = 46 / (2 * divisions);
    const floorPoint = (i: number, j: number) => ({ x: cx + (i - j) * dx, y: HEIGHT - 8 - 46 + (i + j) * dy });
    const floor = Array.from({ length: divisions + 1 }, (_, k) => {
        const alongJ = [floorPoint(k, 0), floorPoint(k, divisions)];
        const alongI = [floorPoint(0, k), floorPoint(divisions, k)];
        return (
            <g key={k} stroke="currentColor" strokeOpacity={0.25}>
                <line x1={alongJ[0].x} y1={alongJ[0].y} x2={alongJ[1].x} y2={alongJ[1].y} />
                <line x1={alongI[0].x} y1={alongI[0].y} x2={alongI[1].x} y2={alongI[1].y} />
            </g>
        );
    });
    return (
        <g>
            {floor}
            <g className="animate-float-slow">
                <path d={`M${cx} ${cy - s} L${cx + s} ${cy - h} L${cx + s} ${cy + h} L${cx} ${cy + s} L${cx - s} ${cy + h} L${cx - s} ${cy - h} Z`} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeWidth={1.5} />
                <path d={`M${cx} ${cy} L${cx} ${cy + s} M${cx} ${cy} L${cx + s} ${cy - h} M${cx} ${cy} L${cx - s} ${cy - h}`} stroke="currentColor" strokeWidth={1.5} fill="none" />
                <path d={`M${cx} ${cy} L${cx + s} ${cy - h} L${cx} ${cy - s} L${cx - s} ${cy - h} Z`} fill="currentColor" fillOpacity={0.3} />
                {/* Orbit ring */}
                <ellipse cx={cx} cy={cy} rx={64} ry={20} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeDasharray="3 6" className="animate-dash-flow" />
                <circle cx={cx + 64} cy={cy} r={3.5} fill="currentColor" />
            </g>
        </g>
    );
}

function Wireframe({ random }: { random: () => number }) {
    const cards = Array.from({ length: 3 }, () => 0.35 + random() * 0.5);
    return (
        <g>
            <rect x={56} y={14} width={208} height={122} rx={8} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.6} />
            <line x1={56} y1={32} x2={264} y2={32} stroke="currentColor" strokeOpacity={0.4} />
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={68 + i * 11} cy={23} r={2.5} fill="currentColor" fillOpacity={0.7} />
            ))}
            <rect x={64} y={42} width={44} height={86} rx={4} fill="currentColor" fillOpacity={0.14} />
            <rect x={118} y={42} width={90} height={10} rx={3} fill="currentColor" fillOpacity={0.55} />
            <rect x={118} y={58} width={64} height={6} rx={3} fill="currentColor" fillOpacity={0.25} />
            {cards.map((opacity, i) => (
                <rect key={i} x={118 + i * 49} y={76} width={42} height={52} rx={5} fill="currentColor" fillOpacity={opacity * 0.4} stroke="currentColor" strokeOpacity={0.5} />
            ))}
            <rect x={220} y={42} width={36} height={16} rx={8} fill="currentColor" className="animate-float-slow" />
        </g>
    );
}

/** Sources flow into bronze, silver and gold tiers that get taller and brighter: the medallion pipeline. */
function Pipeline({ random }: { random: () => number }) {
    const sources = Array.from({ length: 5 }, (_, i) => ({ x: 24, y: 22 + i * 26 + random() * 6 }));
    const tiers = [
        { x: 84, height: 62, opacity: 0.14 },
        { x: 150, height: 82, opacity: 0.28 },
        { x: 216, height: 102, opacity: 0.5 },
    ];
    const centreY = HEIGHT / 2;
    return (
        <g>
            {sources.map((source, i) => (
                <g key={i}>
                    <line
                        x1={source.x}
                        y1={source.y}
                        x2={tiers[0].x}
                        y2={centreY}
                        stroke="currentColor"
                        strokeOpacity={0.3}
                        strokeDasharray="4 8"
                        className="animate-dash-flow"
                    />
                    <circle cx={source.x} cy={source.y} r={5} fill="currentColor" fillOpacity={0.7} />
                </g>
            ))}
            {tiers.map((tier, i) => (
                <g key={i}>
                    <rect
                        x={tier.x}
                        y={centreY - tier.height / 2}
                        width={48}
                        height={tier.height}
                        rx={6}
                        fill="currentColor"
                        fillOpacity={tier.opacity}
                        stroke="currentColor"
                        strokeOpacity={0.7}
                    />
                    {[0, 1, 2].map((row) => (
                        <rect
                            key={row}
                            x={tier.x + 8}
                            y={centreY - tier.height / 2 + 12 + row * 12}
                            width={row === 1 ? 20 : 32}
                            height={4}
                            rx={2}
                            fill="currentColor"
                            fillOpacity={0.6}
                        />
                    ))}
                    {i < tiers.length - 1 && (
                        <line
                            x1={tier.x + 48}
                            y1={centreY}
                            x2={tiers[i + 1].x}
                            y2={centreY}
                            stroke="currentColor"
                            strokeOpacity={0.6}
                            strokeDasharray="3 5"
                            className="animate-dash-flow"
                        />
                    )}
                </g>
            ))}
            {/* Output chart */}
            <line x1={tiers[2].x + 48} y1={centreY} x2={264} y2={centreY} stroke="currentColor" strokeOpacity={0.6} strokeDasharray="3 5" className="animate-dash-flow" />
            {[28, 46, 36, 60].map((barHeight, i) => (
                <rect key={i} x={268 + i * 12} y={centreY + 30 - barHeight} width={8} height={barHeight} rx={2} fill="currentColor" fillOpacity={0.4 + i * 0.15} />
            ))}
        </g>
    );
}

const ART: Record<ProjectCategory, (props: { random: () => number }) => React.JSX.Element> = {
    "AI/ML Application": NeuralNet,
    "Full-Stack Development": LayerStack,
    "Data Engineering": Pipeline,
    "Immersive 3D Web": () => <IsometricCube />,
    "Frontend Engineering": Wireframe,
    "Team Leadership": LayerStack,
};

export function ProjectArt({ project, className }: { project: Project; className?: string }) {
    const random = seededRandom(project.id);
    const Art = ART[project.category];

    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={`${project.category} illustration`}
            className={className}
            preserveAspectRatio="xMidYMid meet"
        >
            <Art random={random} />
        </svg>
    );
}
