"use client";

import { Button } from "@/components/ui/button";
import { contactInfo, personalInfo, stats } from "@/lib/data";
import { ArrowDown, Download, Github, Instagram, Linkedin, Mail, MapPin, Sparkles, Youtube } from "lucide-react";

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
                return <Github className="w-5 h-5" />;
            case "LinkedIn":
                return <Linkedin className="w-5 h-5" />;
            case "YouTube":
                return <Youtube className="w-5 h-5" />;
            case "Instagram":
                return <Instagram className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-12">
                    {/* Main Content */}
                    <div className="text-center space-y-6">
                        {/* Greeting Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            Welcome to my portfolio
                        </div>

                        {/* Name & Title */}
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    {personalInfo.name}
                                </span>
                            </h1>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-medium">
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    {personalInfo.title}
                                </span>
                            </p>
                        </div>

                        {/* Tagline */}
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {personalInfo.tagline}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50">
                                <MapPin className="w-4 h-4" />
                                <span>{contactInfo.location}</span>
                            </div>
                            <div className="w-1 h-1 bg-muted-foreground/50 rounded-full hidden sm:block" />
                            <span className="hidden sm:inline">Carnegie Mellon University Africa</span>
                            <div className="w-1 h-1 bg-muted-foreground/50 rounded-full hidden sm:block" />
                            <span className="hidden sm:inline">AI Research & Engineering</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
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
                            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
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
                    <div className="flex justify-center items-center gap-3">
                        {contactInfo.socialLinks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/50 transition-all flex items-center justify-center group"
                                aria-label={social.platform}
                            >
                                <div className="group-hover:scale-110 transition-transform">
                                    {getSocialIcon(social.platform)}
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto pt-8">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
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
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <button
                        onClick={() => scrollToSection("about")}
                        className="w-10 h-10 rounded-full border bg-card/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/50 transition-all flex items-center justify-center"
                        aria-label="Scroll to next section"
                    >
                        <ArrowDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}