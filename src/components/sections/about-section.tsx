"use client";

import { EditorialHeading } from "@/components/common/editorial-heading";
import { LocalTime } from "@/components/common/local-time";
import { Reveal } from "@/components/common/reveal";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { SKILL_COLORS } from "@/components/three/skill-cloud";
import { achievements, contactInfo, education, focusAreas, getCurrentExperience, getExpertSkills, personalInfo, skillsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";

const SkillCloud = dynamic(() => import("@/components/three/skill-cloud").then((m) => m.SkillCloud), {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-muted/20" />,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2025-01" → "Jan 2025", without going through Date (which would shift with the time zone). */
const monthYear = (value: string) => {
    const [year, month] = value.split("-");
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

/** One tile of the board: a glass surface that lights up around the pointer, with an optional heading. */
function Tile({ title, className, delay = 0, children }: { title?: string; className?: string; delay?: number; children: ReactNode }) {
    return (
        <Reveal delay={delay} className={className}>
            <SpotlightCard className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7">
                {title && <h3 className="mb-5 text-lg font-semibold tracking-tight">{title}</h3>}
                {children}
            </SpotlightCard>
        </Reveal>
    );
}

export function AboutSection() {
    const [highlight, setHighlight] = useState<SkillCategory | null>(null);
    const current = getCurrentExperience();
    const shownSkills = highlight ? (skillsByCategory[highlight] ?? []) : getExpertSkills();

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="about" className="relative overflow-hidden py-24 lg:py-32">
            <div aria-hidden className="bg-circuit absolute inset-0 opacity-70" />
            <div aria-hidden className="absolute -right-40 top-24 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
            <div aria-hidden className="absolute -left-32 bottom-10 h-[24rem] w-[24rem] rounded-full bg-orange-400/10 blur-[120px]" />

            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <EditorialHeading
                    title={
                        <>
                            Code, data and <span className="text-gradient">applied AI</span>
                        </>
                    }
                    description="Software engineer and AI researcher building tools for healthcare and policy."
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                    {/* Who I am */}
                    <Tile className="md:col-span-2 lg:col-span-4 lg:row-span-2">
                        <p className="max-w-2xl text-2xl font-medium leading-[1.2] tracking-tight sm:text-3xl lg:text-[2.1rem]">
                            I like turning <span className="text-gradient">hard problems</span> into products people can use.
                        </p>
                        <div className="mt-6 grid gap-5 text-[15px] leading-relaxed text-muted-foreground md:grid-cols-2">
                            <p>
                                <span className="font-semibold text-foreground">Software engineer</span> with 6+ years in
                                fullstack development, DevOps and cloud-native systems, and an MSc in Information Technology
                                from Carnegie Mellon University Africa.
                            </p>
                            <p>
                                I am a software engineer and AI researcher at the Upanzi Network, where I build backend
                                services and AI tools for digital public infrastructure in Africa, including identity systems
                                integrated with MOSIP.
                            </p>
                        </div>
                        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                            Scalable architectures, CI/CD pipelines, and interfaces that make complex information easy to
                            explore, including immersive 3D ones.
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                            <button
                                onClick={() => scrollToSection("projects")}
                                className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
                            >
                                View my projects
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                                    <ArrowDownRight className="h-4 w-4" />
                                </span>
                            </button>
                            <a
                                href={personalInfo.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 px-5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
                            >
                                Download CV
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </Tile>

                    {/* Now */}
                    {current && (
                        <Tile delay={0.08} className="lg:col-span-2">
                            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </span>
                                Now · since {monthYear(current.startDate)}
                            </span>
                            <p className="text-lg font-semibold leading-snug">{current.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{current.company.split(", ").join(" · ")}</p>
                            <button
                                onClick={() => scrollToSection("experience")}
                                className="group mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-primary"
                            >
                                Full experience
                                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </button>
                        </Tile>
                    )}

                    {/* Where */}
                    <Tile delay={0.14} className="lg:col-span-2">
                        <p className="mb-3 text-sm text-muted-foreground">Local time</p>
                        <LocalTime className="text-5xl font-semibold tracking-tight tabular-nums" />
                        <p className="mt-2 text-sm text-muted-foreground">{contactInfo.location} · CAT, UTC+2</p>
                        {/* Ripples spreading from Kigali */}
                        <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36">
                            <span className="absolute inset-0 rounded-full border border-primary/20" />
                            <span className="absolute inset-5 rounded-full border border-primary/25" />
                            <span className="absolute inset-10 rounded-full border border-primary/35" />
                            <span className="animate-ping-slow absolute inset-[3.75rem] rounded-full bg-primary/50" />
                            <span className="absolute inset-[4.1rem] rounded-full bg-primary" />
                        </span>
                    </Tile>

                    {/* Focus */}
                    <Tile title="What I work on" className="md:col-span-2 lg:col-span-3">
                        <ul className="space-y-1">
                            {focusAreas.map((area, i) => (
                                <li key={area.id} className="group/row -mx-3 flex items-start gap-5 rounded-2xl p-3 transition-colors hover:bg-foreground/[0.04]">
                                    <span className="text-outline w-10 shrink-0 text-3xl font-semibold leading-none tracking-tight transition-colors group-hover/row:text-primary">
                                        0{i + 1}
                                    </span>
                                    <div>
                                        <p className="font-semibold">{area.title}</p>
                                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Tile>

                    {/* Toolbox: drag the sphere, or pick a category to light it up */}
                    <Tile title="Toolbox" delay={0.08} className="md:col-span-2 lg:col-span-3 lg:row-span-2">
                        <div className="relative -mx-2 h-[340px] overflow-hidden rounded-2xl">
                            <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
                            <SkillCloud className="absolute inset-0" highlight={highlight} />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {(Object.keys(SKILL_COLORS) as SkillCategory[]).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setHighlight(highlight === category ? null : category)}
                                    aria-pressed={highlight === category}
                                    className="flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1 text-xs transition-colors hover:border-foreground/40 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
                                >
                                    <span className="h-2 w-2 rounded-full" style={{ background: SKILL_COLORS[category] }} />
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="mt-5 border-t border-foreground/10 pt-4">
                            <p className="mb-3 text-sm text-muted-foreground">
                                {highlight ?? "Strongest skills"}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {shownSkills.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className={cn(
                                            "rounded-lg px-2.5 py-1 text-xs",
                                            skill.proficiency === "expert" ? "bg-primary/15 text-foreground" : "bg-muted/70 text-muted-foreground",
                                        )}
                                    >
                                        {skill.name}
                                        {skill.yearsOfExperience && (
                                            <span className="ml-1.5 font-mono text-[10px] opacity-60">{skill.yearsOfExperience}y</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Tile>

                    {/* Education */}
                    <Tile title="Education" delay={0.05} className="md:col-span-2 lg:col-span-3">
                        <ol className="relative space-y-6 border-l border-foreground/15 pl-6">
                            {education.map((edu, i) => (
                                <li key={edu.id} className="relative">
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "absolute -left-[1.85rem] top-1 h-3 w-3 rounded-full border-2 border-primary",
                                            i === 0 ? "bg-primary shadow-[0_0_12px_var(--glow-primary)]" : "bg-background",
                                        )}
                                    />
                                    <p className="font-mono text-xs text-muted-foreground">
                                        {monthYear(edu.startDate)} — {monthYear(edu.endDate)}
                                    </p>
                                    <p className="mt-1 font-semibold leading-snug">
                                        {edu.degree}, {edu.field}
                                    </p>
                                    <p className="text-sm text-primary">{edu.institution}</p>
                                </li>
                            ))}
                        </ol>
                    </Tile>

                    {/* Milestones */}
                    <Tile title="Milestones" className="md:col-span-2 lg:col-span-6">
                        <div className="grid gap-3 md:grid-cols-3">
                            {achievements.slice(0, 3).map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="rounded-2xl border border-foreground/10 bg-background/30 p-5 transition-colors hover:border-primary/40"
                                >
                                    <p className="mb-4 font-mono text-xs text-primary">{achievement.date}</p>
                                    <p className="font-semibold leading-snug">{achievement.title}</p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </Tile>
                </div>
            </div>
        </section>
    );
}
