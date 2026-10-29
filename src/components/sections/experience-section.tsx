"use client";

import { Reveal } from "@/components/common/reveal";
import { experiences, personalInfo } from "@/lib/data";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" })
        .format(new Date(`${date}-01T00:00:00Z`));
}

export function ExperienceSection() {
    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="relative scroll-mt-20 border-y border-border/60 bg-card/30 py-20 sm:py-24 lg:py-32"
        >
            <div className="container mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.65fr] lg:gap-20 lg:px-8">
                <div>
                    <Reveal className="lg:sticky lg:top-28">
                        <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                            <span aria-hidden className="h-px w-8 bg-primary" />
                            Experience
                        </p>
                        <h2
                            id="experience-heading"
                            className="max-w-sm text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-[3.5rem]"
                        >
                            Professional<br />
                            <span className="text-primary">journey.</span>
                        </h2>
                        <p className="mt-6 max-w-xs text-base leading-relaxed text-muted-foreground">
                            Building interfaces. Leading teams. Turning research into tools people can use.
                        </p>
                        <a
                            href={personalInfo.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-8 inline-flex items-center gap-3 border-b border-primary/40 pb-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                            View full resume
                            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                        </a>
                        <div aria-hidden className="mt-16 hidden items-end justify-between border-t border-border pt-5 lg:flex">
                            <span className="font-mono text-xs text-muted-foreground">2019 — Present</span>
                            <ArrowDownRight className="h-8 w-8 text-primary/60" strokeWidth={1} />
                        </div>
                    </Reveal>
                </div>

                <ol className="min-w-0 border-t border-border">
                    {experiences.map((experience, index) => {
                        const isCurrent = !experience.endDate;
                        const [company, ...affiliation] = experience.company.split(", ");

                        return (
                            <li key={experience.id} className="border-b border-border">
                                <details open={index === 0} className="group/role">
                                    <summary className="group/summary relative grid cursor-pointer list-none grid-cols-[1fr_auto] gap-x-5 py-7 transition-colors marker:content-none hover:bg-primary/[0.025] sm:py-8 [&::-webkit-details-marker]:hidden">
                                        <div className="min-w-0">
                                            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted-foreground sm:text-xs">
                                                <span>
                                                    <time dateTime={experience.startDate}>{formatDate(experience.startDate)}</time>
                                                    {" — "}
                                                    {experience.endDate
                                                        ? <time dateTime={experience.endDate}>{formatDate(experience.endDate)}</time>
                                                        : "Present"}
                                                </span>
                                                {isCurrent && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                                                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-medium leading-snug tracking-tight transition-colors group-hover/summary:text-primary sm:text-2xl">
                                                {experience.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                <span className="font-medium text-foreground/85">{company}</span>
                                                {affiliation.length > 0 && (
                                                    <span className="mt-1 block text-xs leading-relaxed">{affiliation.join(", ")}</span>
                                                )}
                                            </p>
                                        </div>
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-open/role:border-primary/25 group-open/role:bg-primary/10 group-open/role:text-primary group-hover/summary:border-primary/50 group-hover/summary:text-primary">
                                            <Plus aria-hidden className="h-4 w-4 transition-transform duration-200 group-open/role:rotate-45 motion-reduce:transition-none" />
                                            <span className="sr-only">Role details</span>
                                        </span>
                                    </summary>

                                    <div className="pb-8 sm:pr-10">
                                        <p className="mb-5 font-mono text-[11px] capitalize text-muted-foreground">
                                            {experience.location} <span aria-hidden className="mx-2 text-primary/50">/</span> {experience.type.replaceAll("-", " ")}
                                        </p>
                                        <p className="text-sm leading-7 text-muted-foreground">{experience.description}</p>

                                        {experience.achievements && experience.achievements.length > 0 && (
                                            <div className="mt-6 border-l-2 border-primary/25 pl-5">
                                                <h4 className="mb-3 text-xs font-medium text-foreground">Selected contributions</h4>
                                                <ul className="space-y-3">
                                                    {experience.achievements.map((achievement) => (
                                                        <li key={achievement} className="relative pl-3 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary/60">
                                                            {achievement}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {experience.technologies && experience.technologies.length > 0 && (
                                            <ul aria-label="Technologies and skills" className="mt-6 flex flex-wrap gap-2">
                                                {experience.technologies.map((tech) => (
                                                    <li key={tech} className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                                                        {tech}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </details>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
