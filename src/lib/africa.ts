/**
 * Geography for the hero globe: a hand-simplified outline of Africa and the
 * cities the story passes through. Responsible for coordinates and the maths
 * to place them on a sphere; it knows nothing about rendering.
 *
 * The outline is deliberately coarse (about 90 points). It is drawn as dots,
 * so it only needs to read as "Africa", not be a survey.
 */

/** [longitude, latitude] in degrees. */
export type LonLat = [number, number];

export const AFRICA_OUTLINE: LonLat[] = [
    [-5.9, 35.8], [-2, 35.1], [3, 36.8], [10.2, 37.2], [11, 36.3], [10.5, 34.5], [11.5, 33.2], [13, 32.9], [15.2, 32.3],
    [15.5, 31.2], [18, 30.4], [19.8, 31.7], [20.1, 32.4], [23, 32.7], [25, 31.8], [29, 30.9], [31.5, 31.5], [32.4, 31.1],
    [32.6, 29.9], [34, 27.8], [35.5, 24], [37.2, 21], [37.4, 18.5], [38.6, 18], [39.8, 15.5], [41.5, 13.4], [43.2, 11.6],
    [44.5, 10.4], [49, 11.3], [51.3, 11.8], [50.8, 9.5], [48.5, 8], [47.4, 4.8], [45.3, 2], [42.5, -0.4], [40.2, -2.7],
    [39.6, -4.4], [39.3, -6.8], [39.5, -10], [40.5, -11], [40.6, -15], [37, -17.8], [34.9, -19.8], [35.5, -24], [32.9, -26],
    [32.6, -26.5], [31, -29.9], [27, -33.5], [25.6, -34], [22, -34.2], [20, -34.8], [18.4, -34.2], [18, -32], [16.5, -28.6],
    [15.1, -26.6], [14.5, -22.9], [11.8, -17.5], [12, -13.5], [13.2, -8.8], [12.2, -6], [9.5, -1], [9.4, 1], [9.7, 3.9],
    [6, 4.3], [3.4, 6.4], [0, 5.6], [-3, 5], [-7.5, 4.4], [-10, 6], [-13, 8.5], [-14.5, 10.5], [-16.8, 13.5], [-17.5, 14.7],
    [-16.5, 19], [-17, 21], [-15, 24], [-13, 27.7], [-9.7, 30], [-9.8, 31.5], [-8, 33.5], [-6.8, 34],
];

export const MADAGASCAR_OUTLINE: LonLat[] = [
    [49.3, -12], [50.4, -15.5], [49.4, -17], [48, -22], [47, -25], [44.5, -25], [43.5, -22.5], [44.2, -20], [44, -17],
    [46, -15.8], [48, -13.5],
];

export interface City {
    name: string;
    position: LonLat;
}

export const KIGALI: City = { name: "Kigali", position: [30.06, -1.94] };
export const ADDIS_ABABA: City = { name: "Addis Ababa", position: [38.74, 9.03] };

/** Places whose data flows into the pipelines in Kigali. */
export const DATA_SOURCES: City[] = [
    { name: "Dakar", position: [-17.47, 14.7] },
    { name: "Lagos", position: [3.38, 6.52] },
    { name: "Cairo", position: [31.24, 30.04] },
    { name: "Kinshasa", position: [15.27, -4.44] },
    { name: "Nairobi", position: [36.82, -1.29] },
    { name: "Cape Town", position: [18.42, -33.92] },
];

/** Where the remote teams are. The US end is drawn leaving the visible hemisphere on purpose. */
export const REMOTE_EUROPE: City = { name: "Belgium", position: [4.4, 50.8] };
export const REMOTE_AMERICAS: City = { name: "USA", position: [-52, 36] };

/** Longitude the globe is turned to so Africa faces the viewer. */
export const GLOBE_CENTER_LON = 18;

/** Longitude/latitude in degrees to a point on a sphere. East is +x, north is +y, lon 0 faces +z. */
export function lonLatToVector([lon, lat]: LonLat, radius: number): [number, number, number] {
    const lonRad = (lon * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;
    return [
        radius * Math.cos(latRad) * Math.sin(lonRad),
        radius * Math.sin(latRad),
        radius * Math.cos(latRad) * Math.cos(lonRad),
    ];
}

/** Even-odd ray casting on the lon/lat plane. Fine here because Africa never crosses the antimeridian. */
export function pointInPolygon([x, y]: LonLat, polygon: LonLat[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
}

/** Evenly spread land points: a Fibonacci lattice over the whole sphere, kept where it falls on Africa. */
export function africaDots(totalSamples: number, radius: number): [number, number, number][] {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const dots: [number, number, number][] = [];
    for (let i = 0; i < totalSamples; i++) {
        const y = 1 - (i / (totalSamples - 1)) * 2;
        const lat = (Math.asin(y) * 180) / Math.PI;
        if (lat < -36 || lat > 38) continue;
        // Longitude wraps as the lattice winds round the sphere.
        let lon = (((goldenAngle * i * 180) / Math.PI + 180) % 360) - 180;
        if (lon < -20 || lon > 53) continue;
        lon = Math.round(lon * 1000) / 1000;
        const position: LonLat = [lon, lat];
        if (pointInPolygon(position, AFRICA_OUTLINE) || pointInPolygon(position, MADAGASCAR_OUTLINE)) {
            dots.push(lonLatToVector(position, radius));
        }
    }
    return dots;
}
