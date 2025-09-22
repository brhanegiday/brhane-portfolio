"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences, personalInfo } from "@/lib/data";
import { motion, useInView } from "framer-motion";
import { Briefcase, Building, Calendar, CheckCircle, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

export function ExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.section
            ref={ref}
            id="experience"
            className="relative py-20 lg:py-24 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Enhanced Background with Animated Gradients */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-muted/30"
                animate={
                    isInView
                        ? {
                              background: [
                                  "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent))/5% 50%, hsl(var(--muted))/30% 100%)",
                                  "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--primary))/8% 50%, hsl(var(--accent))/20% 100%)",
                                  "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent))/5% 50%, hsl(var(--muted))/30% 100%)",
                              ],
                          }
                        : {}
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-secondary/10"
                animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Animated Professional geometric elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/30 rounded-lg"
                    animate={
                        isInView
                            ? {
                                  rotate: [12, 72, 12],
                                  scale: [1, 1.1, 1],
                                  borderColor: [
                                      "hsl(var(--primary))/30%",
                                      "hsl(var(--accent))/50%",
                                      "hsl(var(--primary))/30%",
                                  ],
                              }
                            : { rotate: 12 }
                    }
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-32 right-16 w-28 h-28 bg-accent/20 rounded-full"
                    animate={
                        isInView
                            ? {
                                  scale: [1, 1.2, 1],
                                  backgroundColor: [
                                      "hsl(var(--accent))/20%",
                                      "hsl(var(--primary))/30%",
                                      "hsl(var(--accent))/20%",
                                  ],
                              }
                            : {}
                    }
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/3 w-12 h-12 bg-secondary/30"
                    animate={
                        isInView
                            ? {
                                  rotate: [45, 135, 45],
                                  borderRadius: ["0%", "50%", "0%"],
                              }
                            : { rotate: 45 }
                    }
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-16 h-16 border border-primary/20 rounded-full"
                    animate={
                        isInView
                            ? {
                                  scale: [1, 0.8, 1.2, 1],
                                  borderColor: [
                                      "hsl(var(--primary))/20%",
                                      "hsl(var(--secondary))/40%",
                                      "hsl(var(--primary))/20%",
                                  ],
                              }
                            : {}
                    }
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Additional floating elements */}
                <motion.div
                    className="absolute top-1/2 left-10 w-6 h-6 bg-primary/20 rounded-full"
                    animate={
                        isInView
                            ? {
                                  y: [-10, 10, -10],
                                  opacity: [0.2, 0.6, 0.2],
                              }
                            : {}
                    }
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-3/4 right-20 w-8 h-8 border border-accent/30"
                    animate={
                        isInView
                            ? {
                                  rotate: [0, 180, 360],
                                  scale: [1, 1.3, 1],
                              }
                            : {}
                    }
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header with Sparkle Effect */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary))/20%" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Briefcase className="w-4 h-4" />
                        Experience
                    </motion.div>
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                        initial={{ scale: 0.9 }}
                        animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Professional Journey
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Staff-level engineering experience leading teams and architecting scalable systems
                    </motion.p>
                </motion.div>

                {/* Enhanced Experience List with Staggered Animations */}
                <div className="space-y-8 mb-10">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={experience.id}
                            className="group relative"
                            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.8 + index * 0.2,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            {/* Enhanced Timeline connector */}
                            {index < experiences.length - 1 && (
                                <motion.div
                                    className="absolute left-8 top-16 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20 hidden lg:block"
                                    initial={{ height: 0 }}
                                    animate={isInView ? { height: 96 } : { height: 0 }}
                                    transition={{ duration: 1, delay: 1 + index * 0.2 }}
                                />
                            )}

                            <motion.div
                                className="relative p-8 rounded-3xl border bg-card/90 backdrop-blur-sm shadow-lg"
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 25px 50px -12px hsl(var(--primary))/25%",
                                    borderColor: "hsl(var(--primary))/50%",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                {/* Enhanced Status indicator with pulse */}
                                <motion.div
                                    className="absolute -left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden lg:block"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        boxShadow: [
                                            "0 0 0 0 hsl(var(--primary))/50%",
                                            "0 0 0 8px hsl(var(--primary))/0%",
                                            "0 0 0 0 hsl(var(--primary))/50%",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                                    <div className="flex-1">
                                        <motion.div
                                            className="flex items-center gap-3 mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                                        >
                                            {!experience.endDate && (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <Badge className="text-xs px-3 py-1 bg-green-500/10 text-green-600 border-green-500/20">
                                                        <motion.div
                                                            className="w-2 h-2 bg-green-500 rounded-full mr-2"
                                                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                        Current
                                                    </Badge>
                                                </motion.div>
                                            )}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20"
                                                >
                                                    {experience.type.replace("-", " ")}
                                                </Badge>
                                            </motion.div>
                                        </motion.div>
                                        <motion.h3
                                            className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                            transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                                        >
                                            {experience.title}
                                        </motion.h3>
                                        <motion.div
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                                        >
                                            <motion.div
                                                className="flex items-center gap-2"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <motion.div
                                                    className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                                                    whileHover={{
                                                        backgroundColor: "hsl(var(--primary))/20%",
                                                        rotate: 360,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Building className="w-4 h-4 text-primary" />
                                                </motion.div>
                                                <span className="text-primary font-semibold text-base">
                                                    {experience.company}
                                                </span>
                                            </motion.div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {experience.location}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-muted/20"
                                        whileHover={{
                                            backgroundColor: "hsl(var(--primary))/10%",
                                            borderColor: "hsl(var(--primary))/30%",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">
                                            {experience.startDate} - {experience.endDate || "Present"}
                                        </span>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                                >
                                    <p className="text-muted-foreground max-w-3/4 leading-relaxed text-base">
                                        {experience.description}
                                    </p>
                                </motion.div>

                                {/* Enhanced Technologies with Hover Effects */}
                                {experience.technologies && experience.technologies.length > 0 && (
                                    <motion.div
                                        className="mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 2 + index * 0.2 }}
                                    >
                                        <h4 className="text-sm font-semibold mb-3 text-foreground">
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {experience.technologies.slice(0, 8).map((tech, techIndex) => (
                                                <motion.div
                                                    key={techIndex}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={
                                                        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                                                    }
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: 2.2 + index * 0.2 + techIndex * 0.1,
                                                    }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        backgroundColor: "hsl(var(--primary))/20%",
                                                        color: "hsl(var(--primary))",
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs px-3 py-1 bg-muted/70 cursor-pointer transition-colors"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                            {experience.technologies.length > 8 && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={
                                                        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                                                    }
                                                    transition={{ duration: 0.3, delay: 2.2 + index * 0.2 + 8 * 0.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs px-3 py-1 bg-accent/10 text-accent"
                                                    >
                                                        +{experience.technologies.length - 8} more
                                                    </Badge>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Enhanced Achievements with Staggered Animation */}
                                {experience.achievements && experience.achievements.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 2.4 + index * 0.2 }}
                                    >
                                        <h4 className="text-sm font-semibold mb-4 text-foreground">Key Achievements</h4>
                                        <div className="grid gap-3">
                                            {experience.achievements
                                                .slice(0, 4)
                                                .map((achievement, achievementIndex) => (
                                                    <motion.div
                                                        key={achievementIndex}
                                                        className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={
                                                            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                                                        }
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: 2.6 + index * 0.2 + achievementIndex * 0.1,
                                                        }}
                                                        whileHover={{
                                                            backgroundColor: "hsl(var(--green-500))/10%",
                                                            borderColor: "hsl(var(--green-500))/20%",
                                                            scale: 1.02,
                                                        }}
                                                        // transition={{ duration: 0.2 }}
                                                    >
                                                        <motion.div
                                                            animate={{ rotate: [0, 360] }}
                                                            transition={{
                                                                duration: 8,
                                                                repeat: Infinity,
                                                                ease: "linear",
                                                                delay: achievementIndex * 2,
                                                            }}
                                                        >
                                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        </motion.div>
                                                        <span className="text-sm text-muted-foreground leading-relaxed">
                                                            {achievement}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced CTA with Magnetic Effect */}
                <motion.div
                    className="text-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1 + experiences.length * 0.2 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Button
                            variant="outline"
                            className="gap-2 px-8 py-3 text-base bg-gradient-to-r from-background to-muted/20 border-primary/30 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm shadow-lg"
                            asChild
                        >
                            <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </motion.div>
                                View Full Resume
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
