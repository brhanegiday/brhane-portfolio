"use client";

import { useEffect, useState } from "react";

/** The current time in a given time zone, e.g. "14:32". Renders a placeholder until mounted, so server and client agree. */
export function LocalTime({ timeZone = "Africa/Kigali", className }: { timeZone?: string; className?: string }) {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
        const tick = () => setTime(format.format(new Date()));
        tick();
        const timer = setInterval(tick, 10_000);
        return () => clearInterval(timer);
    }, [timeZone]);

    return <span className={className}>{time ?? "--:--"}</span>;
}
