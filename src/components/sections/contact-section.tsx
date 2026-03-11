"use client";

import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/data";
import { Check, Copy, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
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
            case "Instagram":
                return <Instagram className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <section id="contact" className="relative py-20 lg:py-24">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Send className="w-3.5 h-3.5" />
                        Contact
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Open to new opportunities, collaborations, and interesting conversations
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
                    {/* Left: Contact Info */}
                    <div className="space-y-4">
                        {/* Email Card */}
                        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base mb-0.5">Email</h3>
                                    <p className="text-muted-foreground text-sm font-medium break-all">
                                        {contactInfo.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyEmail}
                                    className="gap-2"
                                >
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
                                <Button size="sm" className="gap-2" asChild>
                                    <a href={`mailto:${contactInfo.email}`}>
                                        <Send className="w-4 h-4" />
                                        Send Email
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Phone & Location */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm mb-1">Phone</h3>
                                        <p className="text-muted-foreground text-sm font-medium break-all">
                                            {contactInfo.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm mb-1">Location</h3>
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {contactInfo.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
                            <div className="flex items-start gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">
                                        Available for Opportunities
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Open to staff-level engineering roles, leadership opportunities, and consulting
                                        projects.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Social Links */}
                    <div className="space-y-4">
                        {contactInfo.socialLinks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-5 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
                            >
                                <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                    {getSocialIcon(social.platform)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                                        {social.platform}
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        {social.username}
                                    </div>
                                </div>
                                <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </a>
                        ))}

                        {/* Quick CTA */}
                        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                            <div className="text-center space-y-3">
                                <h4 className="font-bold text-base">
                                    Let&apos;s Build Something Great
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    Let&apos;s collaborate and bring your innovative ideas to life
                                </p>
                                <Button className="w-full gap-2" asChild>
                                    <a href={`mailto:${contactInfo.email}`}>
                                        <Mail className="w-4 h-4" />
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
