"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const trackRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) {
            setProgress(0);
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }
        const scrollPos = Math.abs(track.scrollLeft);
        const pct = scrollPos / maxScroll;
        setProgress(pct);
        setCanScrollLeft(scrollPos > 4);
        setCanScrollRight(scrollPos < maxScroll - 4);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollLeft = 0;
        const onScroll = () => updateScrollState();
        track.addEventListener("scroll", onScroll, { passive: true });
        requestAnimationFrame(() => updateScrollState());
        return () => track.removeEventListener("scroll", onScroll);
    }, [updateScrollState, lang]);

    const scroll = (dir: "left" | "right") => {
        const track = trackRef.current;
        if (!track) return;
        const cardEl = track.querySelector<HTMLElement>(".service-card");
        if (!cardEl) return;
        const scrollAmount = cardEl.offsetWidth + 24;

        const isRtl = document.dir === "rtl" || document.documentElement.dir === "rtl";
        let delta: number;
        if (dir === "right") {
            delta = isRtl ? -scrollAmount : scrollAmount;
        } else {
            delta = isRtl ? scrollAmount : -scrollAmount;
        }
        track.scrollBy({ left: delta, behavior: "smooth" });
    };

    const learnMoreLabel = lang === "ar" ? "اعرف المزيد" : "Learn More";

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="services-header gsap-reveal">
                    <h2 className="section-title">{t.services.title}</h2>
                </div>

                <div className="carousel-wrapper">
                    <button
                        className={`carousel-arrow carousel-arrow-prev ${!canScrollLeft ? "disabled" : ""}`}
                        onClick={() => scroll("left")}
                        aria-label="Previous"
                        type="button"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div className="carousel-track" ref={trackRef}>
                        {t.services.items.map((service) => (
                            <a
                                key={service.title}
                                href="https://wa.me/962799819669"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="service-card"
                            >
                                <div className="service-card-icon-area">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={iconMap[service.title] || "/icons/cold-laser.png"}
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="service-icon-img"
                                    />
                                </div>
                                <div className="service-card-body">
                                    <h3 className="service-card-title">{service.title}</h3>
                                    <p className="service-card-desc">{service.description}</p>
                                    <span className="service-card-link">
                                        {learnMoreLabel}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <button
                        className={`carousel-arrow carousel-arrow-next ${!canScrollRight ? "disabled" : ""}`}
                        onClick={() => scroll("right")}
                        aria-label="Next"
                        type="button"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                <div className="carousel-progress-track">
                    <div
                        className="carousel-progress-fill"
                        style={{ width: `${Math.max(12, progress * 100)}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
