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
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
            )}
        >
            <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("home");
                        }}
                        className="flex items-center space-x-3 group"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-lg">BG</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-foreground">{personalInfo.name}</h1>
                            <p className="text-xs text-muted-foreground">Software Engineer</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-200 hover:text-primary relative py-2",
                                    activeSection === section.id ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {section.label}
                                {activeSection === section.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={personalInfo.resumeUrl!} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-4 h-4 mr-2" />
                                Resume
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => scrollToSection("contact")}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Let&apos;s Talk
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col h-full">
                                    {/* Mobile Logo */}
                                    <div className="flex items-center space-x-3 pb-8 border-b">
                                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">BG</span>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-lg">{personalInfo.name}</h2>
                                            <p className="text-sm text-muted-foreground">Software Engineer</p>
                                        </div>
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <div className="flex-1 py-8">
                                        <nav className="space-y-6">
                                            {navSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={cn(
                                                        "block w-full text-left text-lg font-medium transition-colors duration-200 hover:text-primary",
                                                        activeSection === section.id
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                    )}
                                                >
                                                    {section.label}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Mobile CTA Buttons */}
                                    <div className="space-y-4 border-t pt-6">
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link
                                                href={personalInfo.resumeUrl!}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                Download Resume
                                            </Link>
                                        </Button>
                                        <Button className="w-full" onClick={() => scrollToSection("contact")}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Get In Touch
                                        </Button>
                                    </div>

                                    {/* Mobile Social Links */}
                                    <div className="flex items-center justify-center space-x-6 pt-6 border-t">
                                        {contactInfo.socialLinks.slice(0, 3).map((social) => (
                                            <Link
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
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
