"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="about section-padding">
            <div className="container">
                <div className="about-grid">
                    <div className="gsap-reveal-left">
                        <div className="about-image-wrapper">
                            <Image
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                                alt="Professional physiotherapy session"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: "cover" }}
                                loading="lazy"
                            />
                            <div className="about-image-accent"></div>
                        </div>
                    </div>

                    <div className="gsap-reveal-right">
                        <div className="section-label">{t.about.label}</div>
                        <h2 className="section-title">{t.about.title}</h2>
                        <p className="section-subtitle">{t.about.description1}</p>
                        <p className="section-subtitle" style={{ marginTop: "1rem" }}>
                            {t.about.description2}
                        </p>

                        <div className="about-stats">
                            <div className="about-stat">
                                <div className="about-stat-number">{t.about.stat1Number}</div>
                                <div className="about-stat-label">{t.about.stat1Label}</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">{t.about.stat2Number}</div>
                                <div className="about-stat-label">{t.about.stat2Label}</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">{t.about.stat3Number}</div>
                                <div className="about-stat-label">{t.about.stat3Label}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
