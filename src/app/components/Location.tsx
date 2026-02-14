"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function Location() {
    const { t } = useLanguage();

    return (
        <section id="location" className="location section-padding">
            <div className="container">
                <div className="location-grid">
                    <div className="gsap-reveal-left">
                        <div className="location-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.5!2d35.87!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTInMTIuMCJF!5e0!3m2!1sen!2sjo!4v1700000000000"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Therapy Jo Location"
                            ></iframe>
                        </div>
                    </div>

                    <div className="location-info gsap-reveal-right">
                        <div className="section-label">{t.location.label}</div>
                        <h2 className="section-title">{t.location.title}</h2>
                        <p className="section-subtitle">{t.location.subtitle}</p>

                        <div className="location-address">
                            <div className="location-address-icon">
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
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="location-address-text">
                                <h4>{t.location.addressTitle}</h4>
                                <p>{t.location.addressText}</p>
                            </div>
                        </div>

                        <div className="location-address">
                            <div className="location-address-icon">
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
                            </div>
                            <div className="location-address-text">
                                <h4>{t.location.contactTitle}</h4>
                                <p>
                                    <a
                                        href="tel:+962799819669"
                                        style={{ color: "var(--secondary)" }}
                                    >
                                        +962 7 9981 9669
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="location-hours">
                            <h4>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {t.location.hoursTitle}
                            </h4>
                            <div className="location-hours-item">
                                <span>{t.location.weekdays}</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {t.location.weekdaysTime}
                                </span>
                            </div>
                            <div className="location-hours-item">
                                <span>{t.location.friday}</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {t.location.fridayClosed}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
