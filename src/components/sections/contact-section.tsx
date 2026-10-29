"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/data";
import { Check, Copy, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ContactScene = dynamic(() => import("@/components/three/contact-scene").then((m) => m.ContactScene), {
    ssr: false,
});

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
        <section id="contact" className="aurora relative overflow-hidden py-24 lg:py-32">
            {/* Perspective floor receding to the horizon */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
                <div className="floor-grid" />
            </div>
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Let's build something"
                    description="Open to new roles, research collaborations and interesting conversations."
                />

                {/* Signal scene: pings out from Kigali, with my channels in orbit */}
                <div
                    aria-hidden
                    className="relative -mt-4 mb-10 h-[300px] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]"
                >
                    <ContactScene className="absolute inset-0" />
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
                    {/* Left: Contact Info */}
                    <div className="space-y-4">
                        {/* Email Card */}
                        <div className="glass rounded-xl p-6 transition-transform duration-300 hover:-translate-y-0.5">
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
                            <div className="glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
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

                            <div className="glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
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
                                <span className="relative mt-1 flex h-3 w-3 shrink-0"><span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" /></span>
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">
                                        Available for Opportunities
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Open to software engineering, AI/ML and research roles, as well as consulting
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
                                className="glass group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
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
                        <div className="glass rounded-xl p-6 transition-transform duration-300 hover:-translate-y-0.5">
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
