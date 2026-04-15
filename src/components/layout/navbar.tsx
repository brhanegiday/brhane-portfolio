"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Mail } from "lucide-react";
import { personalInfo, navSections, contactInfo } from "@/lib/data";
import { BrandLogo } from "@/components/common/brand-logo";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

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
                isScrolled
                    ? "bg-background/95 backdrop-blur-md border-b"
                    : "bg-transparent"
            )}
        >
            <nav className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("home");
                        }}
                        className="flex items-center group"
                    >
                        <BrandLogo className="text-primary" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                                    activeSection === section.id
                                        ? "text-primary bg-primary/8"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            asChild
                        >
                            <Link href={personalInfo.cvUrl!} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-4 h-4 mr-1.5" />
                                Resume
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => scrollToSection("contact")}
                        >
                            <Mail className="w-4 h-4 mr-1.5" />
                            Let&apos;s Talk
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72 bg-background border-l">
                                <div className="flex flex-col h-full px-2">
                                    {/* Mobile Header */}
                                    <div className="flex items-center gap-3 py-6 border-b">
                                        <BrandLogo className="text-primary" />
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <div className="flex-1 py-4">
                                        <nav className="space-y-1">
                                            {navSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={cn(
                                                        "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors",
                                                        activeSection === section.id
                                                            ? "text-primary bg-primary/8 font-medium"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                    )}
                                                >
                                                    {section.label}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Mobile CTA Buttons */}
                                    <div className="space-y-2 border-t pt-4 pb-6">
                                        <Button variant="outline" className="w-full justify-start text-sm" size="sm" asChild>
                                            <Link href={personalInfo.cvUrl!} target="_blank" rel="noopener noreferrer">
                                                <FileText className="w-4 h-4 mr-2" />
                                                Download Resume
                                            </Link>
                                        </Button>
                                        <Button
                                            className="w-full justify-start text-sm"
                                            size="sm"
                                            onClick={() => scrollToSection("contact")}
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            Get In Touch
                                        </Button>
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
