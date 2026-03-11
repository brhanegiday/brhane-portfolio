"use client";

import { Button } from "@/components/ui/button";
import { contactInfo, personalInfo, stats } from "@/lib/data";
import { ArrowDown, Download, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export function HeroSection() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case "GitHub":
                return <Github className="w-4 h-4" />;
            case "LinkedIn":
                return <Linkedin className="w-4 h-4" />;
            case "Instagram":
                return <Instagram className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-10">
                    {/* Main Content */}
                    <div className="text-center space-y-5">
                        {/* Name & Title */}
                        <div className="space-y-3">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                                {personalInfo.name}
                            </h1>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary">
                                {personalInfo.title}
                            </p>
                        </div>

                        {/* Tagline */}
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {personalInfo.tagline}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{contactInfo.location}</span>
                            </div>
                            <span className="hidden sm:inline text-border">·</span>
                            <span className="hidden sm:inline">Carnegie Mellon University Africa</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            size="lg"
                            onClick={() => scrollToSection("projects")}
                            className="gap-2 px-8"
                        >
                            View My Work
                            <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 px-8"
                            asChild
                        >
                            <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4" />
                                Resume
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2"
                            asChild
                        >
                            <a href={`mailto:${contactInfo.email}`}>
                                <Mail className="w-4 h-4" />
                                Contact
                            </a>
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center items-center gap-2">
                        {contactInfo.socialLinks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl border hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center text-muted-foreground"
                                aria-label={social.platform}
                            >
                                {getSocialIcon(social.platform)}
                            </a>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow text-center"
                            >
                                <div className="text-3xl font-bold text-primary mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={() => scrollToSection("about")}
                        className="w-10 h-10 rounded-full border hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center text-muted-foreground"
                        aria-label="Scroll to next section"
                    >
                        <ArrowDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}