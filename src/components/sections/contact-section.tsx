"use client";

import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/data";
import { Check, Copy, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
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
        <section id="contact" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Elegant Background for Contact */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/8 to-accent/12" />
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 via-transparent to-muted/20" />

            {/* Contact-themed background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 border border-primary/30 rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-accent/20 rounded-2xl rotate-12" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/30 rounded-full" />
                <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-primary/40 rotate-45" />
                <div className="absolute top-1/4 right-1/2 w-20 h-20 bg-gradient-to-br from-primary/15 to-accent/15 rounded-lg" />
            </div>

            <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Send className="w-4 h-4" />
                        Contact
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Let&apos;s{" "}
                        <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                            Connect
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Open to new opportunities, collaborations, and interesting conversations
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-20">
                    {/* Left: Contact Info */}
                    <div className="space-y-6">
                        {/* Email Card */}
                        <div className="group p-4 sm:p-6 lg:p-8 rounded-3xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 hover:border-primary/30">
                            {/* Mobile-first responsive layout */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 sm:gap-5">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/25 transition-all duration-300 flex-shrink-0">
                                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors">Email</h3>
                                        <p className="text-muted-foreground text-sm sm:text-base font-medium break-all">{contactInfo.email}</p>
                                    </div>
                                </div>
                                {/* Buttons stack on mobile, inline on larger screens */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <Button variant="outline" size="sm" onClick={copyEmail} className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all flex-1 sm:flex-none">
                                        {copiedEmail ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                    <Button size="sm" className="gap-2 shadow-lg hover:shadow-xl transition-all flex-1 sm:flex-none" asChild>
                                        <a href={`mailto:${contactInfo.email}`}>
                                            <Send className="w-4 h-4" />
                                            Send Email
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Phone & Location */}
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="group p-4 sm:p-6 lg:p-8 rounded-3xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/30">
                                <div className="flex items-start gap-3 sm:gap-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-5 h-5 sm:w-7 sm:h-7 text-blue-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-blue-500 transition-colors">Phone</h3>
                                        <p className="text-muted-foreground text-sm sm:text-base font-medium mb-3 break-all">{contactInfo.phone}</p>
                                        <Button variant="link" size="sm" className="px-0 h-auto text-blue-500 hover:text-blue-600 text-sm" asChild>
                                            <a href={`tel:${contactInfo.phone}`}>📞 Call me</a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-4 sm:p-6 lg:p-8 rounded-3xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-500/30">
                                <div className="flex items-start gap-3 sm:gap-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-green-500 transition-colors">Location</h3>
                                        <p className="text-muted-foreground text-sm sm:text-base font-medium mb-1 break-words">{contactInfo.location}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground bg-green-500/5 px-2 sm:px-3 py-1 rounded-full inline-block">🌍 Remote worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="group p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-green-500/15 to-emerald-500/10 border border-green-500/25 hover:from-green-500/20 hover:to-emerald-500/15 hover:border-green-500/40 transition-all duration-500">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="relative flex-shrink-0">
                                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-30" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-green-600 transition-colors">
                                        🚀 Available for Opportunities
                                    </h4>
                                    <p className="text-green-600 dark:text-green-400 leading-relaxed text-sm sm:text-base">
                                        Open to staff-level engineering roles, technical leadership positions, and
                                        consulting engagements. Let&apos;s build something amazing together!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Social Links */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-3 sm:space-y-4">
                            {contactInfo.socialLinks.map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-muted/80 to-muted/60 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                        {getSocialIcon(social.platform)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-base sm:text-lg group-hover:text-primary transition-colors">{social.platform}</div>
                                        <div className="text-muted-foreground font-medium text-sm sm:text-base break-all">{social.username}</div>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0">
                                        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Connect</span>
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Quick CTA */}
                        <div className="group p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:from-primary/15 hover:to-accent/15 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20">
                            <div className="text-center space-y-3 sm:space-y-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors">Let&apos;s Build Something Great</h4>
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                    Ready to discuss your next project? Let&apos;s collaborate and bring your innovative ideas to life with cutting-edge technology.
                                </p>
                                <Button className="w-full gap-2 h-10 sm:h-12 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                                    <a href={`mailto:${contactInfo.email}`}>
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Start the Conversation
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
