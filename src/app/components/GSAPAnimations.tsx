"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPAnimations() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance
            const heroTl = gsap.timeline({ delay: 0.3 });
            heroTl
                .from(".hero-logo", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".hero-badge", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(".hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
                .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
                .from(".hero-scroll-indicator", { opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");

            // General reveals
            gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
                gsap.fromTo(el, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
                });
            });

            gsap.utils.toArray<HTMLElement>(".gsap-reveal-left").forEach((el) => {
                gsap.fromTo(el, { x: -50, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
                });
            });

            gsap.utils.toArray<HTMLElement>(".gsap-reveal-right").forEach((el) => {
                gsap.fromTo(el, { x: 50, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
                });
            });

            // Service cards staggered reveal
            const serviceCards = gsap.utils.toArray<HTMLElement>(".service-card");
            if (serviceCards.length) {
                serviceCards.forEach((card, i) => {
                    gsap.fromTo(card, { y: 30, opacity: 0 }, {
                        y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
                        delay: i * 0.06,
                        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
                    });
                });
            }

            // About stats are animated within About.tsx to handle language changes

            // Hero parallax
            gsap.to(".hero-content", {
                y: -50, opacity: 0.3, ease: "none",
                scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
            });

            // Contact reveal
            gsap.fromTo(".contact-buttons", { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".contact-cta", start: "top 75%", toggleActions: "play none none none" },
            });
        });

        return () => ctx.revert();
    }, []);

    return null;
}
