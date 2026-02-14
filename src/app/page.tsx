"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Staff from "./components/Staff";
import Location from "./components/Location";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import GSAPAnimations from "./components/GSAPAnimations";
import { useLanguage } from "./i18n/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div key={lang}>
      <GSAPAnimations />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Staff />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
