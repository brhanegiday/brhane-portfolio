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
        <section id="contact" className="py-20 lg:py-20 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
                    {/* Left: Contact Info */}
                    <div className="space-y-6">
                        {/* Email Card */}
                        <div className="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <p className="text-muted-foreground">{contactInfo.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyEmail} className="gap-2">
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
                                    <Button size="sm" asChild>
                                        <a href={`mailto:${contactInfo.email}`}>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Phone & Location */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold mb-1">Phone</h3>
                                        <p className="text-muted-foreground text-sm">{contactInfo.phone}</p>
                                        <Button variant="link" size="sm" className="px-0 h-auto mt-2" asChild>
                                            <a href={`tel:${contactInfo.phone}`}>Call me</a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Location</h3>
                                        <p className="text-muted-foreground text-sm">{contactInfo.location}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Remote worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                            <div className="flex items-start gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1" />
                                <div>
                                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                                        Available for Opportunities
                                    </h4>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        Open to staff-level engineering roles, technical leadership positions, and
                                        consulting engagements
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Social Links */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            {contactInfo.socialLinks.map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                                        {getSocialIcon(social.platform)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{social.platform}</div>
                                        <div className="text-sm text-muted-foreground">{social.username}</div>
                                    </div>
                                    <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* Quick CTA */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border">
                            <h4 className="font-semibold mb-2">Let&apos;s Build Something Great</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Let&apos;s discuss how we can work together to bring your ideas
                                to life.
                            </p>
                            <Button className="w-full gap-2" asChild>
                                <a href={`mailto:${contactInfo.email}`}>
                                    <Mail className="w-4 h-4" />
                                    Get in Touch
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
