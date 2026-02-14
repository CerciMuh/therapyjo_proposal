"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const attemptPlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        setVideoLoaded(true);
        if (video.paused) {
            video.play().catch(() => { });
        }
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;

        if (video.readyState >= 2) {
            setVideoLoaded(true);
        }

        attemptPlay();

        video.addEventListener("canplay", attemptPlay);
        video.addEventListener("loadeddata", attemptPlay);

        const retryTimer = setTimeout(attemptPlay, 500);

        const handleVisibility = () => {
            if (document.visibilityState === "visible") attemptPlay();
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearTimeout(retryTimer);
            video.removeEventListener("canplay", attemptPlay);
            video.removeEventListener("loadeddata", attemptPlay);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [attemptPlay]);

    const scrollToSection = () => {
        const target = document.querySelector("#about");
        if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="hero">
            {/* Video Background */}
            <div className="hero-video-container">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                    style={{
                        opacity: videoLoaded ? 1 : 0,
                        transition: "opacity 0.8s ease",
                    }}
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            <div className="hero-content">
                <Image
                    src="/logo.jpg"
                    alt="Therapy Jo Logo"
                    width={120}
                    height={120}
                    className="hero-logo"
                    priority
                />

                <div className="hero-badge">{t.hero.badge}</div>

                <h1 className="hero-title">
                    {t.hero.title} <span>{t.hero.titleHighlight}</span> {t.hero.titleEnd}
                </h1>

                <p className="hero-subtitle">{t.hero.subtitle}</p>

                <div className="hero-actions">
                    <a
                        href="https://wa.me/962799819669"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {t.hero.bookSession}
                    </a>
                    <a href="tel:+962799819669" className="btn-secondary">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {t.hero.callUs}
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="hero-scroll-indicator"
                onClick={scrollToSection}
                style={{ cursor: "pointer" }}
            >
                <span>{t.hero.scroll}</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
