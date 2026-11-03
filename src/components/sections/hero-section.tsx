"use client";

import { CountUp } from "@/components/common/count-up";
import { LocalTime } from "@/components/common/local-time";
import { Magnetic } from "@/components/common/magnetic";
import { contactInfo, focusAreas, personalInfo, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";

// WebGL cannot render on the server, so the scene is loaded in the browser only.
const PillarMorph = dynamic(() => import("@/components/three/pillar-morph").then((m) => m.PillarMorph), {
    ssr: false,
});

// How long each shape holds before the particles rebuild into the next one.
const PILLAR_MS = 5200;

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Instagram: Instagram,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** A word that slides up out of a mask, like a line of type being set. */
function RisingWord({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
    const reducedMotion = useReducedMotion();
    return (
        <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
                className={cn("inline-block", className)}
                initial={reducedMotion ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

function FadeIn({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();
    const { resolvedTheme } = useTheme();
    const [pillar, setPillar] = useState(0);
    const [paused, setPaused] = useState(false);
    const [firstName, ...rest] = personalInfo.name.split(" ");

    // The particles move on to the next area by themselves, unless the visitor is choosing one.
    useEffect(() => {
        if (paused || reducedMotion) return;
        const timer = setTimeout(() => setPillar((current) => (current + 1) % focusAreas.length), PILLAR_MS);
        return () => clearTimeout(timer);
    }, [pillar, paused, reducedMotion]);
    const lastName = rest.join(" ");

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // A soft light follows the pointer across the hero; written to CSS variables so nothing re-renders.
    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        const section = sectionRef.current;
        if (!section || event.pointerType === "touch") return;
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--hx", `${event.clientX - rect.left}px`);
        section.style.setProperty("--hy", `${event.clientY - rect.top}px`);
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            onPointerMove={handlePointerMove}
            className="aurora relative flex min-h-[100svh] flex-col overflow-hidden"
        >
            <div aria-hidden className="bg-grid absolute inset-0" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden lg:block"
                style={{
                    background:
                        "radial-gradient(640px circle at var(--hx, 72%) var(--hy, 42%), color-mix(in oklab, var(--primary) 11%, transparent), transparent 60%)",
                }}
            />
            <div aria-hidden className="bg-noise absolute inset-0" />

            <div className="container relative z-10 mx-auto grid max-w-6xl flex-1 items-center gap-12 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:px-8 lg:pb-6 lg:pt-24">
                {/* Words */}
                <div>
                    <h1 className="font-semibold">
                        <span className="sr-only">Hi, I&apos;m {personalInfo.name}</span>
                        <span aria-hidden className="block">
                            <RisingWord delay={0.1} className="mb-2 text-2xl font-medium tracking-tight text-muted-foreground sm:text-3xl">
                                Hi, I&apos;m
                            </RisingWord>
                            <span className="block text-[clamp(4rem,13vw,8rem)] leading-[0.9] tracking-[-0.045em]">
                                <RisingWord delay={0.18} className="text-gradient">
                                    {firstName}
                                </RisingWord>{" "}
                                <RisingWord delay={0.3} className="text-outline">
                                    {lastName}
                                </RisingWord>
                            </span>
                        </span>
                    </h1>

                    <FadeIn delay={0.5}>
                        <p className="mt-8 text-xl font-medium sm:text-2xl">{personalInfo.title}</p>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {personalInfo.tagline}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.65} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                        <Magnetic>
                            <button
                                onClick={() => scrollToSection("showcase")}
                                className="group inline-flex h-14 items-center gap-4 rounded-full bg-primary pl-7 pr-2 text-sm font-semibold text-primary-foreground shadow-[0_18px_50px_-14px_var(--glow-primary)] transition-[filter] hover:brightness-110"
                            >
                                Explore my work
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                                    <ArrowDownRight className="h-4 w-4" />
                                </span>
                            </button>
                        </Magnetic>
                        <a
                            href={personalInfo.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex h-14 items-center gap-2 rounded-full border border-foreground/15 px-6 text-sm font-medium backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                        >
                            Resume
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                        <div className="flex items-center gap-1.5">
                            {contactInfo.socialLinks.map((social) => {
                                const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.platform}
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-primary"
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                    </a>
                                );
                            })}
                            <a
                                href={`mailto:${contactInfo.email}`}
                                aria-label="Email"
                                className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-primary"
                            >
                                <Mail className="h-[18px] w-[18px]" />
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* What I build, drawn in particles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                    className="relative mx-auto w-full max-w-[min(32rem,90vw)] lg:mr-0 lg:max-w-none"
                    onPointerEnter={() => setPaused(true)}
                    onPointerLeave={() => setPaused(false)}
                >
                    <div className="relative aspect-square w-full">
                        <div
                            aria-hidden
                            className="absolute inset-[12%] rounded-full opacity-70 blur-3xl"
                            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)" }}
                        />
                        <PillarMorph index={pillar} light={resolvedTheme === "light"} className="absolute inset-0" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 sm:gap-6">
                        {focusAreas.map((area, i) => {
                            const isActive = i === pillar;
                            return (
                                <button
                                    key={area.id}
                                    onClick={() => setPillar(i)}
                                    aria-pressed={isActive}
                                    className="group self-start text-left"
                                >
                                    <span className="relative block h-px w-full overflow-hidden bg-foreground/15">
                                        {isActive && (
                                            <span
                                                key={pillar}
                                                className={cn(
                                                    "absolute inset-0 origin-left bg-primary",
                                                    !reducedMotion && "animate-pillar-progress",
                                                    paused && "[animation-play-state:paused]",
                                                )}
                                                style={{ animationDuration: `${PILLAR_MS}ms` }}
                                            />
                                        )}
                                    </span>
                                    <span
                                        className={cn(
                                            "mt-3 block text-sm font-medium leading-snug transition-colors",
                                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                                        )}
                                    >
                                        {area.title}
                                    </span>
                                    <span
                                        className={cn(
                                            "mt-1 hidden text-xs leading-relaxed text-muted-foreground transition-opacity duration-500 xl:block",
                                            isActive ? "opacity-100" : "opacity-40",
                                        )}
                                    >
                                        {area.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Numbers, place and time */}
            <FadeIn delay={0.85} className="container relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
                <div className="grid items-end gap-6 border-t border-foreground/10 pt-6 lg:grid-cols-[1fr_auto]">
                    <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className={cn("pr-4", i > 0 && "sm:border-l sm:border-foreground/10 sm:pl-6", i === 2 && "max-sm:pl-0")}>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <CountUp value={stat.value} className="block text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl" />
                                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                        {stat.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="hidden items-center gap-8 font-mono text-xs text-muted-foreground lg:flex">
                        <span>
                            {contactInfo.location} · <LocalTime className="tabular-nums text-foreground" />
                        </span>
                        <button
                            onClick={() => scrollToSection("showcase")}
                            className="flex items-center gap-3 uppercase tracking-[0.2em] transition-colors hover:text-foreground"
                        >
                            Scroll
                            <span className="relative block h-10 w-px overflow-hidden bg-foreground/10">
                                <span className="animate-scroll-cue absolute inset-0 bg-primary" />
                            </span>
                        </button>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
