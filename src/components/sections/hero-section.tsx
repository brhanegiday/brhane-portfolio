"use client";

import { CountUp } from "@/components/common/count-up";
import { LocalTime } from "@/components/common/local-time";
import { Magnetic } from "@/components/common/magnetic";
import { contactInfo, focusAreas, personalInfo, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";

// WebGL cannot render on the server, so the scene is loaded in the browser only.
const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((m) => m.HeroScene), {
    ssr: false,
});

// Colours match the flows drawn in hero-scene.tsx.
const GLOBE_KEY = [
    { color: "#22d3ee", text: "Health and policy data from across Africa, harmonised by LLM pipelines in Kigali." },
    { color: "#fb923c", text: "My path: Addis Ababa, where I studied and started working, to Kigali." },
    { color: "#a78bfa", text: "Remote engineering teams in Europe and the USA.", dashed: true },
];

// One colour per focus area, used for the chips that orbit the globe.
const ORBIT_COLORS = ["#22d3ee", "#fb923c", "#a78bfa"];

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
    const [firstName, ...rest] = personalInfo.name.split(" ");
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
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-[29rem]">
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

                {/* Globe in its orbit */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                    className="relative mx-auto aspect-square w-full max-w-[min(34rem,88vw)] lg:mr-0 lg:w-[90%] lg:max-w-none"
                >
                    <div aria-hidden className="animate-orbit absolute inset-[-5%] rounded-full border border-dashed border-foreground/10 [animation-duration:140s]" />
                    <div aria-hidden className="absolute inset-[3%] rounded-full border border-primary/15" />

                    <HeroScene className="absolute inset-0" />

                    {/* What I build, circling the continent */}
                    <div className="animate-orbit pointer-events-none absolute inset-[-5%] hidden sm:block">
                        {focusAreas.map((area, i) => {
                            const angle = i * 120 - 50;
                            return (
                                <div key={area.id} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                                        <div style={{ transform: `rotate(${-angle}deg)` }}>
                                            <div className="animate-orbit-reverse">
                                                <span className="glass flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium">
                                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORBIT_COLORS[i] }} />
                                                    {area.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        {/* Key to the globe, opened on hover or focus */}
                        <div className="group relative">
                            <button className="underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground focus-visible:text-foreground">
                                What am I looking at?
                            </button>
                            <div className="glass pointer-events-none absolute bottom-full right-0 mb-3 w-80 translate-y-1 rounded-2xl p-4 font-sans opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                                <ul className="space-y-2.5 text-xs leading-relaxed text-muted-foreground">
                                    {GLOBE_KEY.map((item) => (
                                        <li key={item.text} className="flex gap-3">
                                            <span
                                                aria-hidden
                                                className="mt-1.5 h-0.5 w-5 shrink-0 rounded"
                                                style={{
                                                    background: item.dashed
                                                        ? `repeating-linear-gradient(90deg, ${item.color} 0 4px, transparent 4px 7px)`
                                                        : item.color,
                                                }}
                                            />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
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
