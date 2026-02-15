"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function Staff() {
    const { t, lang } = useLanguage();

    return (
        <section id="staff" className="staff section-padding">
            <div className="container">
                <div className="staff-header gsap-reveal">
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        {t.staff.label}
                    </div>
                    <h2 className="section-title">{t.staff.title}</h2>
                    <p className="section-subtitle">{t.staff.subtitle}</p>
                </div>

                <div className="staff-solo gsap-reveal">
                    <div className="staff-solo-card">
                        <div className="staff-solo-image">
                            <Image
                                src="/noor_hamami_head_doctor.jpg"
                                alt={lang === "en" ? "Noor Hamami" : "نور حمامي"}
                                fill
                                sizes="(max-width: 768px) 80vw, 320px"
                                style={{ objectFit: "cover" }}
                                loading="lazy"
                            />
                        </div>
                        <div className="staff-solo-info">
                            <h3>{lang === "en" ? "Noor Hamami" : "نور حمامي"}</h3>
                            <p>{lang === "en" ? "Head Specialist" : "رئيس الأخصائيين"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
