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

            // === SERVICES: Pinned scroll-in-place ===
            const slides = gsap.utils.toArray<HTMLElement>(".service-slide");
            const dots = gsap.utils.toArray<HTMLElement>(".services-dot");
            const wrapper = document.querySelector(".services-pinned-wrapper");

            if (slides.length > 1 && wrapper) {
                // Show first slide, hide rest
                slides.forEach((slide, i) => {
                    if (i > 0) {
                        gsap.set(slide, { opacity: 0, pointerEvents: "none" });
                    } else {
                        gsap.set(slide, { opacity: 1, pointerEvents: "auto" });
                    }
                });

                // Highlight first dot
                if (dots.length) {
                    dots[0].classList.add("active");
                }

                // Create a timeline pinned to the wrapper
                const totalSlides = slides.length;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top top",
                        end: () => "+=" + (totalSlides * 100) + "%",
                        pin: true,
                        scrub: 0.5,
                        anticipatePin: 1,
                    },
                });

                // For each transition, crossfade from one slide to the next
                for (let i = 0; i < totalSlides - 1; i++) {
                    const currentSlide = slides[i];
                    const nextSlide = slides[i + 1];
                    const isNextImageRight = nextSlide.classList.contains("image-right");

                    // Current slide fades out, content slides away
                    tl.to(
                        currentSlide.querySelector(".service-slide-content"),
                        { x: isNextImageRight ? -60 : 60, opacity: 0, duration: 0.4, ease: "power2.in" },
                        `slide${i}`
                    );
                    tl.to(
                        currentSlide.querySelector(".service-slide-image"),
                        { scale: 0.95, opacity: 0, duration: 0.4, ease: "power2.in" },
                        `slide${i}`
                    );
                    tl.set(currentSlide, { pointerEvents: "none" });

                    // Next slide fades in
                    tl.fromTo(
                        nextSlide,
                        { opacity: 0 },
                        { opacity: 1, pointerEvents: "auto", duration: 0.1 },
                        `slide${i}+=0.35`
                    );
                    tl.fromTo(
                        nextSlide.querySelector(".service-slide-image"),
                        { scale: 1.05, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
                        `slide${i}+=0.35`
                    );
                    tl.fromTo(
                        nextSlide.querySelector(".service-slide-content"),
                        { x: isNextImageRight ? 60 : -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                        `slide${i}+=0.4`
                    );

                    // Update dots
                    if (dots.length) {
                        tl.call(() => {
                            dots.forEach((d) => d.classList.remove("active"));
                            if (dots[i + 1]) dots[i + 1].classList.add("active");
                        }, [], `slide${i}+=0.4`);
                    }

                    // Add spacing between transitions
                    if (i < totalSlides - 2) {
                        tl.to({}, { duration: 0.3 });
                    }
                }
            }

            // About stats counter
            gsap.utils.toArray<HTMLElement>(".about-stat-number").forEach((el) => {
                const text = el.textContent || "";
                const match = text.match(/(\d+)/);
                if (match) {
                    const endValue = parseInt(match[0]);
                    const suffix = text.replace(match[0], "");
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: endValue, duration: 2, ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
                    });
                }
            });

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
