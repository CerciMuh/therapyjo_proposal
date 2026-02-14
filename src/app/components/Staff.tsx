"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

const staffMembers = [
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Head Physiotherapist",
        roleAr: "رئيس قسم العلاج الطبيعي",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: true,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Sports Physiotherapist",
        roleAr: "أخصائي علاج طبيعي رياضي",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Rehabilitation Specialist",
        roleAr: "أخصائية إعادة تأهيل",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Manual Therapist",
        roleAr: "أخصائي علاج يدوي",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Cupping Specialist",
        roleAr: "أخصائية حجامة",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Physiotherapy Assistant",
        roleAr: "مساعد علاج طبيعي",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
    {
        nameEn: "Noor Hamami",
        nameAr: "نور حمامي",
        roleEn: "Wellness Coordinator",
        roleAr: "منسقة العافية",
        image: "/noor_hamami_head_doctor.jpg",
        isLead: false,
    },
];

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

                <div className="staff-grid">
                    {staffMembers.map((member, index) => (
                        <div
                            key={index}
                            className={`staff-card gsap-reveal ${member.isLead ? "staff-card-lead" : ""}`}
                        >
                            <div className="staff-card-image">
                                <Image
                                    src={member.image}
                                    alt={lang === "en" ? member.nameEn : member.nameAr}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 200px"
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                />
                            </div>
                            <div className="staff-card-info">
                                <h3>{lang === "en" ? member.nameEn : member.nameAr}</h3>
                                <p>{lang === "en" ? member.roleEn : member.roleAr}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
