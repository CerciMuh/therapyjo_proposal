"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Map service titles → icon file paths */
const iconMap: Record<string, string> = {
    "Cold Laser Therapy": "/icons/cold-laser.png",
    "العلاج بالليزر البارد": "/icons/cold-laser.png",
    "Radio Frequency Therapy": "/icons/radio-frequency.png",
    "العلاج بالترددات الراديوية": "/icons/radio-frequency.png",
    "Pelvic Floor Rehabilitation": "/icons/pelvic-floor.png",
    "تأهيل عضلات الحوض": "/icons/pelvic-floor.png",
    "Electromagnetic Pelvic Floor": "/icons/electromagnetic.png",
    "الكهرومغناطيسي لعضلات الحوض": "/icons/electromagnetic.png",
    "Traction Therapy": "/icons/traction.png",
    "علاج الشد (الجر)": "/icons/traction.png",
    "Sport Rehabilitation": "/icons/sport-rehab.png",
    "التأهيل الرياضي": "/icons/sport-rehab.png",
    "Post-Op Rehabilitation": "/icons/post-op.png",
    "تأهيل ما بعد العمليات": "/icons/post-op.png",
    "Pediatric Physical Therapy": "/icons/pediatric.png",
    "العلاج الطبيعي للأطفال": "/icons/pediatric.png",
    "Dry Needling & Acupuncture": "/icons/dry-needling.png",
    "الإبر الجافة والوخز بالإبر": "/icons/dry-needling.png",
};

export default function Services() {
    const { t, lang } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const items = t.services.items;

    // Pair items into slides of 2
    const slides: typeof items[] = [];
    for (let i = 0; i < items.length; i += 2) {
        slides.push(items.slice(i, i + 2));
    }

    const totalSlides = slides.length;

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Disable pin on mobile — cards just stack normally
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setActiveSlide(-1); // show all slides on mobile
            return;
        }

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${totalSlides * 150}vh`,
                pin: true,
                scrub: 0.3,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const idx = Math.min(
                        Math.floor(self.progress * totalSlides),
                        totalSlides - 1
                    );
                    setActiveSlide(idx);
                },
            });
        }, section);

        return () => ctx.revert();
    }, [totalSlides, lang]);

    const learnMoreLabel = lang === "ar" ? "اعرف المزيد" : "Learn More";

    return (
        <section id="services" className="svc" ref={sectionRef}>
            <div className="container">
                <div className="svc-header">
                    <h2 className="section-title">{t.services.title}</h2>
                </div>

                {/* Counter */}
                <div className="svc-counter">
                    <span className="svc-counter-num">{String(activeSlide + 1).padStart(2, "0")}</span>
                    <span className="svc-counter-sep">/</span>
                    <span className="svc-counter-total">{String(totalSlides).padStart(2, "0")}</span>
                </div>

                {/* Slides */}
                <div className="svc-slides">
                    {slides.map((pair, slideIdx) => (
                        <div
                            key={slideIdx}
                            className={`svc-slide ${activeSlide === -1
                                    ? "active"
                                    : slideIdx === activeSlide
                                        ? "active"
                                        : slideIdx < activeSlide
                                            ? "exited"
                                            : "waiting"
                                }`}
                        >
                            {pair.map((service, rowIdx) => {
                                // Alternate: even slide+row = icon-left, odd = icon-right
                                const iconRight = (slideIdx + rowIdx) % 2 !== 0;

                                return (
                                    <a
                                        key={service.title}
                                        href="https://wa.me/962799819669"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`svc-row ${iconRight ? "svc-row-reverse" : ""}`}
                                    >
                                        <div className="svc-row-icon">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={iconMap[service.title] || "/icons/cold-laser.png"}
                                                alt=""
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="svc-row-content">
                                            <h3 className="svc-row-title">{service.title}</h3>
                                            <p className="svc-row-desc">{service.description}</p>
                                            <span className="svc-row-link">
                                                {learnMoreLabel}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="7" y1="17" x2="17" y2="7" />
                                                    <polyline points="7 7 17 7 17 17" />
                                                </svg>
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Progress dots */}
                <div className="svc-dots">
                    {slides.map((_, i) => (
                        <span key={i} className={`svc-dot ${i === activeSlide ? "active" : ""}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}
