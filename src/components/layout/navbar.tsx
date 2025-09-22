"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, navSections, contactInfo } from "@/lib/data";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Update active section based on scroll position
            const sections = navSections.map((section) => section.id);
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border/50"
                    : "bg-transparent"
            )}
        >
            <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Enhanced Logo */}
                    <Link
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("home");
                        }}
                        className="flex items-center space-x-4 group"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40">
                                <span className="text-white font-bold text-lg tracking-tight select-none">
                                    {personalInfo.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </span>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {personalInfo.name}
                            </h1>
                            <p className="text-sm text-muted-foreground font-medium">Software Engineer</p>
                        </div>
                    </Link>

                    {/* Enhanced Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "relative px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl group hover:bg-primary/10",
                                    activeSection === section.id
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <span className="relative z-10">{section.label}</span>

                                {/* Animated background */}
                                <div
                                    className={cn(
                                        "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 transition-opacity duration-300",
                                        activeSection === section.id ? "opacity-100" : "group-hover:opacity-50"
                                    )}
                                />

                                {/* Active indicator */}
                                {activeSection === section.id && (
                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Enhanced Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20"
                            asChild
                        >
                            <Link href={personalInfo.cvUrl!} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-4 h-4 mr-2" />
                                Resume
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => scrollToSection("contact")}
                            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Let&apos;s Talk
                        </Button>
                    </div>

                    {/* Enhanced Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="relative w-10 h-10 p-0 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300"
                                >
                                    <Menu className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-80 bg-background/98 backdrop-blur-2xl border-l border-border/30"
                            >
                                <div className="flex flex-col h-full px-2">
                                    {/* Minimalistic Mobile Header */}
                                    <div className="flex items-center justify-start py-8 border-b px-3 gap-5 border-border/20">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3 mx-auto">
                                                <span className="text-white font-semibold text-base">
                                                    {personalInfo.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <h2 className="font-semibold text-lg text-foreground">{personalInfo.name}</h2>
                                    </div>

                                    {/* Clean Mobile Navigation Links */}
                                    <div className="flex-1 py-6">
                                        <nav className="space-y-1">
                                            {navSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={cn(
                                                        "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group",
                                                        activeSection === section.id
                                                            ? "text-primary bg-primary/8 font-medium"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-base">{section.label}</span>
                                                        {activeSection === section.id && (
                                                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Clean Mobile CTA Buttons */}
                                    <div className="space-y-3 border-t border-border/20 pt-6">
                                        <Button variant="outline" className="w-full justify-start font-normal" asChild>
                                            <Link href={personalInfo.cvUrl!} target="_blank" rel="noopener noreferrer">
                                                <FileText className="w-4 h-4 mr-3" />
                                                Download Resume
                                            </Link>
                                        </Button>
                                        <Button
                                            className="w-full justify-start font-normal"
                                            onClick={() => scrollToSection("contact")}
                                        >
                                            <Mail className="w-4 h-4 mr-3" />
                                            Get In Touch
                                        </Button>
                                    </div>

                                    {/* Clean Mobile Social Links */}
                                    <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border/20">
                                        {contactInfo.socialLinks.slice(0, 3).map((social) => (
                                            <Link
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                                                aria-label={social.platform}
                                            >
                                                {social.platform === "GitHub" && <Github className="w-5 h-5" />}
                                                {social.platform === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                                                {social.platform === "Twitter" && <Mail className="w-5 h-5" />}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}
