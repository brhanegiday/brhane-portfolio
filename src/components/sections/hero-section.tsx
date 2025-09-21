"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Mail, FileText, Github, Linkedin, Sparkles, Code, Brain } from "lucide-react";
import { personalInfo, stats, featuredTechnologies, contactInfo } from "@/lib/data";

export function HeroSection() {
    const [currentTech, setCurrentTech] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const interval = setInterval(() => {
            setCurrentTech((prev) => (prev + 1) % featuredTechnologies.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div
                        className={`space-y-8 transition-all duration-1000 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        {/* Status Badge */}
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <Badge variant="secondary" className="text-xs">
                                    Available for opportunities
                                </Badge>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-primary font-medium text-sm uppercase tracking-wide">
                                    {personalInfo.title}
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                                    <span className="block text-foreground">Hi, I&apos;m</span>
                                    <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {personalInfo.name}
                                    </span>
                                </h1>
                            </div>

                            <div className="flex items-center space-x-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground">
                                <span>I build with</span>
                                <span className="text-primary font-mono transition-all duration-500">
                                    {featuredTechnologies[currentTech]}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            Staff Software Engineer with 5+ years building scalable systems and leading engineering
                            teams.{" "}
                            <span className="text-foreground font-medium">
                                Currently architecting AI-powered healthcare solutions that serve 1000+ researchers
                                worldwide.
                            </span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection("projects")}
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                            >
                                View My Work
                                <ChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToSection("contact")}
                                className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                            >
                                <Mail className="mr-2 w-4 h-4" />
                                Get In Touch
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-6 pt-4">
                            <span className="text-sm text-muted-foreground">Find me on:</span>
                            <div className="flex items-center space-x-4">
                                {contactInfo.socialLinks.slice(0, 2).map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                                    >
                                        {social.platform === "GitHub" && <Github className="w-5 h-5" />}
                                        {social.platform === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                                    </a>
                                ))}
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                                >
                                    <FileText className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Code Terminal Mockup */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="relative">
                            {/* Terminal Window */}
                            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-1 shadow-2xl">
                                <div className="bg-card rounded-2xl overflow-hidden shadow-inner">
                                    {/* Terminal Header */}
                                    <div className="bg-muted/50 px-6 py-4 flex items-center space-x-3 border-b">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                                        </div>
                                        <div className="text-sm text-muted-foreground font-mono">
                                            brhane@portfolio:~$
                                        </div>
                                    </div>

                                    {/* Terminal Content */}
                                    <div className="p-6 space-y-3 font-mono text-sm">
                                        <div className="text-green-500">
                                            <span className="text-muted-foreground">$</span> cat developer.json
                                        </div>
                                        <div className="text-muted-foreground ml-2">
                                            <div>{"{"}</div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;name&quot;</span>:
                                                <span className="text-yellow-500">
                                                    {" "}
                                                    &quot;{personalInfo.name}&quot;
                                                </span>
                                                ,
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;role&quot;</span>:
                                                <span className="text-yellow-500"> &quot;Software Engineer&quot;</span>,
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;education&quot;</span>:
                                                <span className="text-yellow-500"> &quot;CMU&quot;</span>,
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;expertise&quot;</span>:
                                                <span className="text-yellow-500">
                                                    {" "}
                                                    [&quot;AI&quot;, &quot;Full-Stack&quot;]
                                                </span>
                                                ,
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;location&quot;</span>:
                                                <span className="text-yellow-500">
                                                    {" "}
                                                    &quot;{contactInfo.location}&quot;
                                                </span>
                                                ,
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-blue-400">&quot;passion&quot;</span>:
                                                <span className="text-yellow-500">
                                                    {" "}
                                                    [&quot;DevOps&quot;, &quot;Software Engineer&quot;, &quot;AI
                                                    Researcher&quot;]
                                                </span>
                                            </div>
                                            <div>{"}"}</div>
                                        </div>
                                        <div className="text-green-500 animate-pulse">
                                            <span className="text-muted-foreground">$</span> █
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Tech Stack */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                                <Code className="w-8 h-8 text-primary" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                                <Brain className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div
                    className={`mt-20 transition-all duration-1000 delay-600 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button
                    onClick={() => scrollToSection("about")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Scroll to about section"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}
