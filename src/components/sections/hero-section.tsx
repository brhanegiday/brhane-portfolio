"use client";

import { CountUp } from "@/components/common/count-up";
import { Button } from "@/components/ui/button";
import { contactInfo, personalInfo, stats } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

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

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Instagram: Instagram,
} as const;

export function HeroSection() {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="home" className="aurora relative flex min-h-screen items-center overflow-hidden">
            <div aria-hidden className="bg-grid absolute inset-0" />

            {/* 3D object: sits behind the text on small screens, beside it on large ones */}
            <div aria-hidden className="absolute inset-0 opacity-50 lg:left-[42%] lg:opacity-100">
                <HeroScene className="h-full w-full" />
            </div>

            {/* Key to the globe: says what the 3D scene is showing */}
            <motion.aside
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="glass absolute bottom-8 right-6 z-10 hidden w-80 rounded-2xl p-4 lg:block xl:right-10"
            >
                <p className="mb-3 text-sm font-semibold">What you are looking at</p>
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
            </motion.aside>

            <div className="container relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                            Hi, I&apos;m <span className="text-gradient">{personalInfo.name.split(" ")[0]}</span>
                            <span className="block text-foreground/90">{personalInfo.name.split(" ")[1]}</span>
                        </h1>
                        <p className="text-xl font-medium text-primary sm:text-2xl">{personalInfo.title}</p>
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{personalInfo.tagline}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {contactInfo.location}
                            </span>
                            <span className="text-border">·</span>
                            <span>Carnegie Mellon University Africa</span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button size="lg" onClick={() => scrollToSection("showcase")} className="glow-primary gap-2 px-7">
                                Explore my work
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="gap-2 px-7 backdrop-blur" asChild>
                                <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="h-4 w-4" />
                                    Resume
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" className="gap-2 backdrop-blur" asChild>
                                <a href={`mailto:${contactInfo.email}`}>
                                    <Mail className="h-4 w-4" />
                                    Contact
                                </a>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
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
                                        className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.dl
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="glass rounded-xl p-4">
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <CountUp value={stat.value} className="block text-2xl font-bold text-primary" />
                                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>
            </div>

            <button
                onClick={() => scrollToSection("showcase")}
                className="animate-float-slow absolute bottom-6 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                aria-label="Scroll to featured project"
            >
                <ArrowDown className="h-4 w-4" />
            </button>
        </section>
    );
}
