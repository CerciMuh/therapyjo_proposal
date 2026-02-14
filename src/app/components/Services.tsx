"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

const serviceIcons = [
    <svg key="manipulation" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
    </svg>,
    <svg key="cupping" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>,
    <svg key="hawkgrips" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>,
    <svg key="theragun" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    <svg key="consultations" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>,
];

const serviceImages = [
    "/joint-manipulation.webp",
    "/cupping.webp",
    "/hawkgrips.webp",
    "/theragun.webp",
    "/joint-manipulation.webp",
];

export default function Services() {
    const { t } = useLanguage();

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="services-header gsap-reveal">
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        {t.services.label}
                    </div>
                    <h2 className="section-title">{t.services.title}</h2>
                    <p className="section-subtitle">{t.services.subtitle}</p>
                </div>
            </div>

            {/* Pinned scroll-in-place container */}
            <div className="services-pinned-wrapper">
                <div className="services-pinned-viewport">
                    {/* Stacked slides — only one visible at a time */}
                    {t.services.items.map((service, index) => (
                        <div
                            key={index}
                            className={`service-slide ${index % 2 === 0 ? "image-left" : "image-right"}`}
                            data-index={index}
                        >
                            <div className="service-slide-image">
                                <Image
                                    src={serviceImages[index]}
                                    alt={service.title}
                                    fill
                                    sizes="50vw"
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                />
                                <div className="service-slide-image-overlay"></div>
                                <div className="service-slide-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                            </div>
                            <div className="service-slide-content">
                                <div className="service-slide-icon">{serviceIcons[index]}</div>
                                <h3 className="service-slide-title">{service.title}</h3>
                                <p className="service-slide-desc">{service.description}</p>
                                <a
                                    href="https://wa.me/962799819669"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="service-slide-cta"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress dots */}
                <div className="services-dots">
                    {t.services.items.map((_, index) => (
                        <div key={index} className="services-dot" data-dot={index}></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
