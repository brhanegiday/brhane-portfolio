"use client";

import { EditorialHeading } from "@/components/common/editorial-heading";
import { Reveal } from "@/components/common/reveal";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { experiences, personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-01" → months since year 0, so roles can be measured and placed on one scale. */
const toMonth = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    return year * 12 + (month - 1);
};
const nowMonth = () => {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
};
const label = (value: string) => {
    const [year, month] = value.split("-");
    return `${MONTHS[Number(month) - 1]} ${year}`;
};
const endMonth = (experience: Experience) => (experience.endDate ? toMonth(experience.endDate) : nowMonth());

/** "1 yr 10 mos", counting both the first and the last month. */
function duration(experience: Experience) {
    const months = endMonth(experience) - toMonth(experience.startDate) + 1;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const parts = [years && `${years} yr${years > 1 ? "s" : ""}`, rest && `${rest} mo${rest > 1 ? "s" : ""}`].filter(Boolean);
    return parts.join(" ");
}

const TYPE_LABEL: Record<Experience["type"], string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
    research: "Research",
};

/**
 * The years since my first role as a vertical ruler, newest at the top.
 * Each role is a segment as long as the time spent in it; the one being read lights up.
 */
function Ruler({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
    const { segments, years } = useMemo(() => {
        const last = nowMonth() + 1;
        const first = Math.min(...experiences.map((e) => toMonth(e.startDate))) - 2;
        const span = last - first;
        const at = (month: number) => ((last - month) / span) * 100;
        const segments = experiences.map((experience) => {
            const top = at(endMonth(experience) + 1);
            const bottom = at(toMonth(experience.startDate));
            return { experience, top, height: bottom - top, middle: (top + bottom) / 2 };
        });
        const years: { year: number; top: number }[] = [];
        for (let year = Math.ceil(first / 12); year * 12 <= nowMonth(); year++) years.push({ year, top: at(year * 12) });
        return { segments, years };
    }, []);

    return (
        <div className="relative h-[min(46vh,25rem)]">
            {/* Year marks */}
            {years.map(({ year, top }) => (
                <div key={year} className="absolute left-0 flex w-14 -translate-y-1/2 items-center gap-2" style={{ top: `${top}%` }}>
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">{year}</span>
                    <span className="h-px flex-1 bg-foreground/10" />
                </div>
            ))}

            {/* The line the roles sit on */}
            <div className="absolute bottom-0 left-[4.25rem] top-0 w-px bg-foreground/10" />

            {segments.map(({ experience, top, height, middle }, index) => {
                const isActive = index === active;
                const [company] = experience.company.split(", ");
                return (
                    <button
                        key={experience.id}
                        onClick={() => onSelect(index)}
                        aria-label={`${experience.title} at ${company}`}
                        aria-current={isActive}
                        className="group absolute left-[4.25rem] right-0"
                        style={{ top: `${top}%`, height: `${height}%` }}
                    >
                        <span
                            className={cn(
                                "absolute inset-y-0 left-0 w-[7px] -translate-x-1/2 rounded-full transition-all duration-500",
                                isActive
                                    ? "bg-gradient-to-b from-primary to-orange-400 shadow-[0_0_18px_var(--glow-primary)]"
                                    : "bg-foreground/20 group-hover:bg-foreground/40",
                            )}
                        />
                        <span
                            className={cn(
                                "absolute left-5 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap text-sm transition-colors duration-300",
                                isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground",
                            )}
                            style={{ top: `${((middle - top) / height) * 100}%` }}
                        >
                            <span className={cn("h-px bg-current transition-all duration-500", isActive ? "w-5 opacity-60" : "w-2 opacity-30")} />
                            {company}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export function ExperienceSection() {
    const [active, setActive] = useState(0);
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

    // The role crossing the middle of the screen is the one the ruler lights up.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
                });
            },
            { rootMargin: "-45% 0px -45% 0px" },
        );
        cardRefs.current.forEach((card) => card && observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const select = (index: number) => {
        cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const current = experiences[active];

    return (
        <section id="experience" aria-labelledby="experience-heading" className="relative scroll-mt-20 overflow-clip py-24 lg:py-32">
            <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
            <div aria-hidden className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-orange-400/10 blur-[120px]" />

            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <EditorialHeading
                    title={
                        <span id="experience-heading">
                            Where I&apos;ve <span className="text-gradient">worked</span>
                        </span>
                    }
                    description="Six years across research, product teams and startups, from Addis Ababa to Kigali, and with remote teams in Europe and the USA."
                />

                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.55fr] lg:gap-16">
                    {/* The ruler, pinned while the roles scroll past */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28">
                            <div className="mb-8 min-h-[5.5rem]" aria-live="polite">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current.id}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <p className="text-4xl font-semibold leading-tight tracking-[-0.03em]">
                                            {(() => {
                                                const [startMonth, startYear] = label(current.startDate).split(" ");
                                                if (!current.endDate) {
                                                    return (
                                                        <>
                                                            {startYear}
                                                            <span className="text-muted-foreground/50"> — </span>
                                                            <span className="text-gradient">Now</span>
                                                        </>
                                                    );
                                                }
                                                const [endMonth, endYear] = label(current.endDate).split(" ");
                                                // Within one year the years alone would read "2022 — 2022", so show the months.
                                                return startYear === endYear ? (
                                                    <>
                                                        {startMonth}
                                                        <span className="text-muted-foreground/50"> — </span>
                                                        {endMonth} {endYear}
                                                    </>
                                                ) : (
                                                    <>
                                                        {startYear}
                                                        <span className="text-muted-foreground/50"> — </span>
                                                        {endYear}
                                                    </>
                                                );
                                            })()}
                                        </p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {current.company.split(", ")[0]} · {duration(current)}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <Ruler active={active} onSelect={select} />

                            <a
                                href={personalInfo.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-10 inline-flex items-center gap-2 border-b border-primary/40 pb-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                            >
                                Full CV
                                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </div>

                    {/* The roles */}
                    <ol className="space-y-5">
                        {experiences.map((experience, index) => {
                            const isCurrent = !experience.endDate;
                            const isActive = index === active;
                            const [company, ...affiliation] = experience.company.split(", ");
                            return (
                                <li
                                    key={experience.id}
                                    ref={(element) => void (cardRefs.current[index] = element)}
                                    data-index={index}
                                    className="scroll-mt-28"
                                >
                                    <Reveal>
                                        <SpotlightCard
                                            className={cn(
                                                "glass rounded-3xl p-6 transition-[border-color,opacity] duration-500 sm:p-8",
                                                isActive ? "border-primary/30" : "lg:opacity-70",
                                            )}
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                <p className="flex items-center gap-3">
                                                    <span className="font-mono text-xs tabular-nums">
                                                        {label(experience.startDate)} — {experience.endDate ? label(experience.endDate) : "Present"}
                                                    </span>
                                                    {isCurrent && (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                            <span className="relative flex h-1.5 w-1.5">
                                                                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                                                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                            </span>
                                                            Current
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs">
                                                    {experience.location} · {TYPE_LABEL[experience.type]}
                                                </p>
                                            </div>

                                            <h3 className="mt-5 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.7rem]">
                                                {experience.title}
                                            </h3>
                                            <p className="mt-1.5 text-base">
                                                <span className="font-medium text-primary">{company}</span>
                                                {affiliation.length > 0 && (
                                                    <span className="text-muted-foreground"> · {affiliation.join(", ")}</span>
                                                )}
                                            </p>

                                            <p className="mt-5 leading-relaxed text-muted-foreground">{experience.description}</p>

                                            {experience.achievements && experience.achievements.length > 0 && (
                                                <ul className="mt-5 space-y-2.5">
                                                    {experience.achievements.map((achievement) => (
                                                        <li
                                                            key={achievement}
                                                            className="relative pl-5 text-sm leading-relaxed text-foreground/80 before:absolute before:left-0 before:top-[0.6rem] before:h-px before:w-2.5 before:bg-primary"
                                                        >
                                                            {achievement}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {experience.technologies && experience.technologies.length > 0 && (
                                                <ul aria-label="Technologies and skills" className="mt-6 flex flex-wrap gap-1.5 border-t border-foreground/10 pt-5">
                                                    {experience.technologies.map((tech) => (
                                                        <li key={tech} className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                                                            {tech}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </SpotlightCard>
                                    </Reveal>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <a
                    href={personalInfo.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-10 inline-flex items-center gap-2 border-b border-primary/40 pb-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary lg:hidden"
                >
                    Full CV
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}
