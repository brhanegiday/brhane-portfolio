"use client";

import { Button } from "@/components/ui/button";
import { contactInfo, featuredTechnologies, personalInfo, stats } from "@/lib/data";
import {
    ArrowUpRight,
    Brain,
    ChevronDown,
    Code,
    FileText,
    Github,
    Linkedin,
    Mail,
    Sparkles,
    Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
    const [currentTech, setCurrentTech] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsVisible(true);

        const interval = setInterval(() => {
            setCurrentTech((prev) => (prev + 1) % featuredTechnologies.length);
        }, 3000);

        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            clearInterval(interval);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section ref={heroRef} id="home" className="min-h-screen flex items-center relative overflow-hidden pt-15">
            {/* Enhanced Background with Dynamic Elements */}
            <div className="absolute inset-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

                {/* Animated Gradient Orbs */}
                <div
                    className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                />
                <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* Sophisticated Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-ping" />
                <div className="absolute top-1/3 right-20 w-1 h-1 bg-purple-500/60 rounded-full animate-pulse delay-500" />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce delay-1000" />
            </div>

            <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Enhanced Content */}
                    <div
                        className={`space-y-10 transition-all duration-1000 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        {/* Enhanced Main Heading */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
                                    <p className="text-primary font-bold text-sm uppercase tracking-wider">
                                        {personalInfo.title}
                                    </p>
                                </div>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                                    <span className="block text-foreground mb-2">Hi, I&apos;m</span>
                                    <span className="block relative">
                                        <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {personalInfo.name}
                                        </span>
                                        <div className="absolute -bottom-3 left-0 w-32 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
                                    </span>
                                </h1>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold">
                                <span className="text-muted-foreground">I craft with</span>
                                <div className="relative">
                                    <span className="text-primary font-mono transition-all duration-500 hover:scale-105 cursor-default">
                                        {featuredTechnologies[currentTech]}
                                    </span>
                                    <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-primary animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Description */}
                        <div className="space-y-4">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-semibold">Software Engineer & AI Researcher</span>{" "}
                                with 5+ years building scalable systems and leading high-performance engineering teams.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Currently architecting{" "}
                                <span className="text-primary font-semibold">AI-powered healthcare solutions</span> that
                                serve <span className="text-foreground font-semibold">1000+ researchers worldwide</span>
                                .
                            </p>
                        </div>

                        {/* Enhanced CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection("projects")}
                                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 hover:scale-105"
                            >
                                <span>View My Work</span>
                                <ArrowUpRight className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToSection("contact")}
                                className="group px-10 py-4 rounded-2xl font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                                <Mail className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                <span>Get In Touch</span>
                            </Button>
                        </div>

                        {/* Enhanced Social Links */}
                        <div className="flex items-center gap-8 pt-6">
                            <span className="text-sm text-muted-foreground font-medium">Connect with me</span>
                            <div className="flex items-center gap-6">
                                {contactInfo.socialLinks.slice(0, 2).map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-3 rounded-xl bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                                    >
                                        {social.platform === "GitHub" && (
                                            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        )}
                                        {social.platform === "LinkedIn" && (
                                            <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        )}
                                    </a>
                                ))}
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-3 rounded-xl bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                                >
                                    <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Terminal Showcase */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="relative group">
                            {/* Terminal Window */}
                            <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-3xl p-1 shadow-2xl border border-border/50 hover:shadow-3xl hover:shadow-primary/10 transition-all duration-500">
                                <div className="bg-card/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-inner">
                                    {/* Enhanced Terminal Header */}
                                    <div className="bg-gradient-to-r from-muted/80 to-muted/60 px-8 py-5 flex items-center justify-between border-b border-border/50">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex space-x-3">
                                                <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer" />
                                                <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer" />
                                                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer" />
                                            </div>
                                            <div className="text-sm text-muted-foreground font-mono font-medium">
                                                brhane@portfolio:~$
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
                                            <span className="text-xs text-muted-foreground font-medium">Live</span>
                                        </div>
                                    </div>

                                    {/* Enhanced Terminal Content */}
                                    <div className="p-8 space-y-4 font-mono text-sm bg-gradient-to-br from-card to-card/95">
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-500">$</span>
                                            <span className="text-primary">cat</span>
                                            <span className="text-muted-foreground">developer.json</span>
                                        </div>

                                        <div className="text-muted-foreground ml-4 space-y-2">
                                            <div className="text-purple-400">{"{"}</div>
                                            <div className="ml-4 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;name&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        &quot;{personalInfo.name}&quot;
                                                    </span>
                                                    ,
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;role&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        &quot;Software Engineer & AI Researcher&quot;
                                                    </span>
                                                    ,
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;education&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        &quot;Carnegie Mellon University&quot;
                                                    </span>
                                                    ,
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-blue-400">&quot;expertise&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        [&quot;AI/ML&quot;, &quot;Full-Stack&quot;, &quot;DevOps&quot;]
                                                    </span>
                                                    ,
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;location&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        &quot;{contactInfo.location}&quot;
                                                    </span>
                                                    ,
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;status&quot;</span>:
                                                    <span className="text-emerald-500">&quot;available&quot;</span>,
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-400">&quot;current_focus&quot;</span>:
                                                    <span className="text-yellow-500">
                                                        &quot;Healthcare AI Solutions&quot;
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-purple-400">{"}"}</div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            <span className="text-emerald-500">$</span>
                                            <span className="text-muted-foreground animate-pulse">█</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Floating Elements */}
                            <div className="absolute -top-6 -right-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-primary/20 animate-float">
                                    <Code className="w-10 h-10 text-primary" />
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 group-hover:scale-110 transition-transform duration-300 delay-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-purple-500/20 animate-float">
                                    <Brain className="w-8 h-8 text-purple-500" />
                                </div>
                            </div>

                            <div className="absolute top-1/2 -right-8 group-hover:scale-110 transition-transform duration-300 delay-200">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-emerald-500/20 animate-pulse">
                                    <Zap className="w-6 h-6 text-emerald-500" />
                                </div>
                            </div>

                            {/* Subtle Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Section */}
                <div
                    className={`mt-24 transition-all duration-1000 delay-600 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {stat.label}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button
                    onClick={() => scrollToSection("about")}
                    className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label="Scroll to about section"
                >
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Scroll to explore
                    </span>
                    <div className="p-3 rounded-full border border-border/50 group-hover:border-primary/50 backdrop-blur-sm transition-all duration-300 animate-bounce group-hover:shadow-lg">
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                    </div>
                </button>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes animate-float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(5deg);
                    }
                }
                .animate-float {
                    animation: animate-float 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
