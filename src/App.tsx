import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Shield, 
  Truck, 
  UserCheck, 
  Eye, 
  FileText, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  HardHat,
  Loader2,
  ArrowUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const CookieConsent = ({ onAccept }: { onAccept: () => void }) => {
  const bannerRef = useRef(null);

  useGSAP(() => {
    gsap.from(bannerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: 'power4.out'
    });
  }, []);

  return (
    <div ref={bannerRef} className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[100]">
      <div className="glass-card p-8 rounded-2xl shadow-2xl border-vanguard-accent/20">
        <div className="flex items-center gap-3 mb-4 text-vanguard-accent">
          <Shield size={20} />
          <h5 className="font-bold uppercase text-xs tracking-widest">Cookie-Einstellungen</h5>
        </div>
        <p className="text-xs text-vanguard-silver/60 leading-relaxed mb-6">
          Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern und den Datenverkehr zu analysieren. Mit Klick auf "Akzeptieren" stimmen Sie der Verwendung zu.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onAccept}
            className="flex-1 bg-vanguard-accent text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Akzeptieren
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 border border-white/10 text-white py-3 text-[10px] font-black uppercase tracking-widest hover:border-white transition-all"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
};

const LegalModal = ({ type, onClose }: { type: 'impressum' | 'datenschutz', onClose: () => void }) => {
  const modalRef = useRef(null);

  useGSAP(() => {
    gsap.from('.modal-content', {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'power4.out'
    });
  }, []);

  const content = {
    impressum: {
      title: "Impressum",
      body: `VANGUARD SECURITY GmbH
Premium Sicherheitsdienst & Baulogistik

Hauptstr. 336
65760 Eschborn
Deutschland

Vertreten durch:
Tülay Akcan (Geschäftsführerin)

Kontakt:
Telefon: +49 174 3498768
E-Mail: kontakt@vanguard-security.de

Registereintrag:
Eintragung im Handelsregister.
Registergericht: Amtsgericht Frankfurt am Main
Registernummer: HRB 137233

Umsatzsteuer-ID:
Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
xxxxxxx`
    },
    datenschutz: {
      title: "Datenschutz",
      body: `Datenschutz ist uns wichtig. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO).

1. Datenerfassung auf unserer Website:
Die Datenerfassung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum entnehmen.

2. Analyse-Tools und Tools von Drittanbietern:
Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das erfolgt vor allem mit Cookies und mit sogenannten Analyseprogrammen.

3. Ihre Rechte:
Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.`
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-vanguard-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="modal-content relative glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-10 md:p-16 rounded-3xl border-vanguard-accent/30">
        <button onClick={onClose} className="absolute top-8 right-8 text-vanguard-silver/40 hover:text-white transition-colors">
          <X size={32} />
        </button>
        <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Information</span>
        <h2 className="text-4xl font-black mb-8 leading-none uppercase tracking-tighter">{content[type].title}</h2>
        <div className="text-vanguard-silver/70 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
          {content[type].body}
        </div>
        <div className="mt-12 pt-8 border-t border-white/5">
          <button onClick={onClose} className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-vanguard-accent hover:text-white transition-all">
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] w-12 h-12 bg-vanguard-accent text-white rounded-none flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-vanguard-black/95 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-4 group">
          <div className="w-16 h-16 md:w-32 md:h-32 relative overflow-hidden flex items-center justify-center">
            <img 
              src="https://github.com/jordansoftware/Vanguard-Security-gmbh/blob/main/src/logo12.png?raw=true" 
              alt="VANGUARD SECURITY Logo" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-2xl md:text-4xl tracking-tighter leading-none">VANGUARD</span>
            <span className="text-[12px] md:text-[18px] font-bold font-mono tracking-[0.3em] text-vanguard-accent">SECURITY GmbH</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Leistungen', 'Über uns', 'Prozess', 'Kontakt'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold uppercase tracking-widest hover:text-vanguard-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#anfrage" className="bg-vanguard-accent text-white px-8 py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-vanguard-accent/20">
            Anfrage senden
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-vanguard-black border-b border-white/10 p-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300">
          {['Leistungen', 'Über uns', 'Prozess', 'Kontakt'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest">
              {item}
            </a>
          ))}
          <a href="#anfrage" onClick={() => setIsOpen(false)} className="bg-vanguard-accent text-white px-8 py-4 text-center font-bold uppercase tracking-widest">
            Anfrage senden
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-sub', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' })
      .from('.hero-title', { opacity: 0, x: -50, duration: 1, ease: 'power4.out' }, '-=0.6')
      .from('.hero-logo-decoration', { opacity: 0, scale: 0.5, duration: 1.2, ease: 'back.out(1.7)' }, '-=0.8')
      .from('.hero-desc', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' }, '-=0.6')
      .from('.hero-btn', { opacity: 0, scale: 0.9, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4');

    gsap.to('.hero-bg-img', {
      scale: 1.1,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex items-center pt-32 md:pt-48 grid-bg overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://i.ibb.co/VWvJNcDr/hero-bg.jpg" 
          alt="VANGUARD SECURITY - Professioneller Sicherheitsdienst und Baustellenbewachung" 
          className="hero-bg-img w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-vanguard-black/60" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-vanguard-black to-transparent z-[1]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-5xl">
          <div className="hero-sub font-mono text-vanguard-accent text-base sm:text-2xl lg:text-[36px] lg:leading-[37px] font-bold lg:w-[669px] lg:h-[148px] tracking-[0.05em] uppercase mb-6 flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <span className="w-8 sm:w-16 h-[2px] bg-vanguard-accent shrink-0" />
            PREMIUM SICHERHEITSDIENST. BAUSTELLENBEWACHUNG MIT SYSTEM
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-stretch gap-6 lg:gap-12 mb-8 group/title">
            <h1 className="hero-title text-3xl sm:text-5xl md:text-5xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter uppercase flex-1 order-2 md:order-1">
              PREMIUM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vanguard-accent to-vanguard-silver">SICHERHEITSDIENST</span> <br/>
              & BAULOGISTIK
            </h1>

            {/* Highly Visible Side Logo (Right) - Precision Placement as per request */}
            <div className="hero-logo-decoration shrink-0 order-1 md:order-2 flex items-center justify-center">
              <img 
                src="https://github.com/jordansoftware/Vanguard-Security-gmbh/blob/main/src/logo12.png?raw=true" 
                alt="VANGUARD Logo" 
                className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] w-[160px] h-[126px] lg:w-[400px] lg:h-[315px] lg:mt-[10px] lg:-ml-[52px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <p className="hero-desc text-base md:text-xl text-vanguard-silver/70 mb-10 max-w-xl leading-relaxed">
            VANGUARD SECURITY GmbH ist Ihr Partner für exzellenten Objektschutz und effiziente Baulogistik in Deutschland. Wir schützen Werte, koordinieren komplexe Abläufe und garantieren maximale Sicherheit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="hero-btn bg-vanguard-accent text-white px-6 py-4 sm:px-10 sm:py-5 rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
              Jetzt Anfrage senden
              <ChevronRight size={18} />
            </button>
            <button className="hero-btn border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-4 sm:px-10 sm:py-5 rounded-none font-bold uppercase tracking-widest hover:border-vanguard-accent transition-all text-center">
              Leistungen ansehen
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical lines */}
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block" />
    </section>
  );
};

const Services = () => {
  const container = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const bgImages = [
    "https://i.ibb.co/hxTyXHZF/bg1.jpg",
    "https://i.ibb.co/VWvJNcDr/hero-bg.jpg",
    "https://i.ibb.co/HpHSB7GN/about.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { title: "Sicherheitsdienst", desc: "Professioneller Schutz für Objekte und Veranstaltungen.", id: "01", icon: <Shield size={32} /> },
    { title: "Baustellenbewachung", desc: "Schutz vor Diebstahl, Vandalismus und unbefugtem Zutritt.", id: "02", icon: <HardHat size={32} /> },
    { title: "Baulogistik", desc: "Gesteuerte Zufahrten und strukturierte Materialflüsse.", id: "03", icon: <Truck size={32} /> },
    { title: "Zutrittskontrolle", desc: "Geordnete Einlasssituationen und Besuchermanagement.", id: "04", icon: <UserCheck size={32} /> },
    { title: "Streifendienst", desc: "Sichtbare Präsenz und regelmäßige Kontrollgänge.", id: "05", icon: <Eye size={32} /> },
    { title: "Individuelle Konzepte", desc: "Maßgeschneiderte Lösungen exakt für Ihren Bedarf.", id: "06", icon: <FileText size={32} /> },
  ];

  useGSAP(() => {
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: container });

  return (
    <section id="leistungen" ref={container} className="py-24 relative overflow-hidden bg-vanguard-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={bgImages[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-vanguard-black via-transparent to-vanguard-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Vanguard Leistungen</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Sicherheitslösungen & Baulogistik.</h2>
          <p className="text-vanguard-silver/70 max-w-xl">
            Maßgeschneiderter Objektschutz, professionelle Baustellenbewachung und Zutrittskontrolle für anspruchsvolle Auftraggeber.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <div key={i} className="service-card glass-card p-8 md:p-10 hover:border-vanguard-accent/50 transition-all hover-glow group relative overflow-hidden bg-vanguard-black/40">
              <div className="text-vanguard-accent/10 absolute top-[-10px] right-[-10px] text-7xl md:text-9xl font-black -z-0">
                {s.id}
              </div>
              <div className="relative z-10">
                <div className="mb-6 text-vanguard-accent group-hover:scale-110 transition-transform origin-left">
                  {s.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-4">{s.title}</h4>
                <p className="text-vanguard-silver/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quality = () => {
  const listRef = useRef(null);

  useGSAP(() => {
    gsap.from('.quality-item', {
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: listRef });

  return (
    <section id="über-uns" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-vanguard-gray rounded-2xl overflow-hidden p-0 border border-white/5">
             <img 
               src="https://i.ibb.co/20BHgzTg/about.jpg" 
               alt="VANGUARD SECURITY GmbH - Expertise in Objektschutz und Werkschutz" 
               className="w-full h-full object-cover rounded-2xl"
               referrerPolicy="no-referrer"
             />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-8 -right-8 bg-vanguard-accent p-10 text-white hidden lg:block">
            <h4 className="font-black text-4xl mb-1">PREMIUM</h4>
            <span className="text-xs font-mono uppercase tracking-widest opacity-80">Der Standard</span>
          </div>
        </div>

        <div>
          <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Warum Vanguard?</span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Expertise im Objektschutz & Werkschutz.</h2>
          <p className="text-vanguard-silver/60 mb-10 text-lg">
            VANGUARD SECURITY GmbH steht für einen Sicherheitsdienst, der Autorität, modernste Technik und absolute Verlässlichkeit vereint.
          </p>

          <div ref={listRef} className="space-y-6">
            {[
              { t: "Qualifiziert nach §34a GewO", d: "Sämtliche Einsatzkräfte verfügen über die notwendigen Qualifikationen und regelmäßige Schulungen." },
              { t: "Zertifizierter Sicherheitsdienst", d: "Strukturierte Objektsicherung und präzise Protokollierung für lückenlose Sicherheit." },
              { t: "Effiziente Baulogistik", d: "Optimierung von Lieferverkehren und Materialflüssen auf Ihrer Baustelle." },
              { t: "24/7 Präsenz & Notruf", d: "Rund um die Uhr erreichbar für sofortige Intervention und maximalen Schutz." }
            ].map((item, i) => (
              <div key={i} className="quality-item flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-vanguard-accent/30 flex items-center justify-center text-vanguard-accent flex-shrink-0 group-hover:bg-vanguard-accent group-hover:text-white transition-all">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-1">{item.t}</h5>
                  <p className="text-vanguard-silver/40 text-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.from('.stat-box', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      scale: 0.95,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'all'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-vanguard-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "einsatzbereit", val: "24/7", sub: "Rund um die Uhr" },
            { label: "Fokus", val: "100%", sub: "Höchste Präzision" },
            { label: "Betreuung", val: "1:1", sub: "Persönlicher Kontakt" },
            { label: "Anspruch", val: "PREMIUM", sub: "Qualitätsversprechen" },
          ].map((s, i) => (
            <div key={i} className="stat-box glass-card p-12 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-vanguard-accent text-xs font-mono uppercase tracking-widest mb-4">{s.label}</span>
              <div className="text-4xl md:text-6xl font-black mb-2">{s.val}</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-vanguard-silver/30">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const container = useRef(null);
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const reviews = [
    { name: "Maximilian Voss", role: "Projektleiter", company: "Aethelgard Bau", text: "Vanguard hat unsere Großbaustelle lückenlos abgesichert. Die Professionalität und Disziplin des Personals ist auf dem Markt unerreicht." },
    { name: "Svenja Bergmann", role: "Leitung Operations", company: "Crestwood Events", text: "Hervorragender Einlassdienst und ein sehr diskretes, aber autoritäres Auftreten. Genau das, was wir für unsere VIP-Gala gesucht haben." },
    { name: "Lennart Krahn", role: "Logistik-Optimierer", company: "OmniPath Logistics", text: "Die strukturierte Koordination der Materialflüsse durch Vanguard hat unsere Prozesse massiv beschleunigt. Ein echter Gewinn für unsere Baulogistik." },
    { name: "Elena Novak", role: "Portfolio Managerin", company: "Horizon Real Estate", text: "Zuverlässiger Objektschutz mit lückenloser Dokumentation. Wir fühlen uns bei der Absicherung unserer Portfolios bestens aufgehoben." },
  ];

  const animateSlide = (direction: 'next' | 'prev', newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      }
    });

    const xMove = direction === 'next' ? -50 : 50;

    tl.to(slideRef.current, {
      opacity: 0,
      x: xMove,
      duration: 0.4,
      ease: 'power2.in'
    })
    .set(slideRef.current, { x: -xMove })
    .to(slideRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const next = () => {
    const nextIndex = (currentIndex + 1) % reviews.length;
    animateSlide('next', nextIndex);
  };

  const goTo = (index: number) => {
    if (index === currentIndex || isAnimating) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    animateSlide(direction, index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  useGSAP(() => {
    gsap.from('.testimonial-header', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-vanguard-black overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vanguard-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="testimonial-header text-center mb-16">
          <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Kundenstimmen</span>
          <h2 className="text-4xl md:text-6xl font-black">Was unsere Partner sagen.</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div ref={slideRef} className="review-card glass-card p-12 md:p-20 relative group min-h-[400px] flex flex-col justify-center">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-vanguard-accent flex items-center justify-center font-bold text-3xl text-white shadow-xl shadow-vanguard-accent/20">
                {reviews[currentIndex].name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-1">{reviews[currentIndex].name}</h4>
                <p className="text-sm text-vanguard-accent font-mono uppercase tracking-widest">
                  {reviews[currentIndex].role} <span className="mx-2 opacity-30">|</span> {reviews[currentIndex].company}
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-vanguard-silver/90 italic leading-relaxed text-center md:text-left">
              &ldquo;{reviews[currentIndex].text}&rdquo;
            </p>
            
            <div className="absolute top-10 right-10 md:top-20 md:right-20 text-9xl font-serif text-white/5 pointer-events-none">
              &ldquo;
            </div>
          </div>

          <div className="flex items-center justify-center mt-12">
            <div className="flex gap-3">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-vanguard-accent w-10' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: container });

  return (
    <section id="prozess" ref={container} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Unsere Strategie</span>
          <h3 className="text-4xl md:text-6xl font-black mb-6">Prozesse für maximale Sicherheit.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector lines (Desktop) */}
          <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-white/5 hidden md:block" />
          
          {[
            { n: "1", t: "Analyse", d: "Bedarf erfassen, Risiken bewerten, Maßnahmen definieren.", icon: <Eye /> },
            { n: "2", t: "Konzept", d: "Individuelles Sicherheits- oder Logistikkonzept mit Struktur.", icon: <Lock /> },
            { n: "3", t: "Umsetzung", d: "Maßnahmen zuverlässig, professionell und termingerecht.", icon: <ShieldCheck /> }
          ].map((s, i) => (
            <div key={i} className="step-card relative text-center group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 mx-auto rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:bg-vanguard-accent transition-all duration-500">
                <span className="text-2xl font-black">{s.n}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">{s.t}</h4>
              <p className="text-vanguard-silver/50 text-sm leading-relaxed max-w-[250px] mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="kontakt" className="py-24 bg-vanguard-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Kontakt aufnehmen</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8">Sicherheitsberatung & Angebot anfordern.</h2>
            <p className="text-vanguard-silver/60 mb-12">
              Lassen Sie uns gemeinsam die optimale Sicherheitsstrategie für Ihr Vorhaben entwickeln. Kostenfreies Angebot für Ihren Sicherheitsdienst anfordern.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-vanguard-accent flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="font-bold opacity-50 uppercase text-xs tracking-widest mb-1">Telefon</h5>
                  <p className="text-lg font-bold">+49 174 3498768</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-vanguard-accent flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="font-bold opacity-50 uppercase text-xs tracking-widest mb-1">E-Mail</h5>
                  <p className="text-lg font-bold">kontakt@vanguard-security.de</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-vanguard-accent flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-bold opacity-50 uppercase text-xs tracking-widest mb-1">Adresse</h5>
                  <p className="text-lg font-bold">Hauptstr. 336, 65760 Eschborn</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-vanguard-accent flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h5 className="font-bold opacity-50 uppercase text-xs tracking-widest mb-1">Öffnungszeiten</h5>
                  <p className="text-sm font-bold opacity-80">Mo - Fr: 08:00 – 18:00 Uhr</p>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Einsätze nach Vereinbarung 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div id="anfrage" className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
            <AnimatePresence>
              {(status === 'success' || status === 'error') && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`absolute inset-0 z-50 flex items-center justify-center p-12 text-center bg-vanguard-black`}
                >
                  <div className="space-y-6">
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {status === 'success' ? <CheckCircle2 size={40} /> : <X size={40} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">
                        {status === 'success' ? 'Erfolg!' : 'Fehler!'}
                      </h3>
                      <p className="text-vanguard-silver/70">
                        {status === 'success' 
                          ? 'Vielen Dank! Ihre Anfrage wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.' 
                          : 'Leider gab es ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-vanguard-accent hover:text-white transition-colors"
                    >
                      Schließen
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <h4 className="text-2xl font-bold mb-8">Unverbindliche Anfrage</h4>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Name</label>
                  <input 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Vollständiger Name" 
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-vanguard-accent transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Unternehmen</label>
                  <input 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Firma" 
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-vanguard-accent transition-colors" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">E-Mail Adresse</label>
                <input 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  placeholder="beispiel@mail.de" 
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-vanguard-accent transition-colors" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Nachricht</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Beschreiben Sie kurz Ihr Vorhaben..." 
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-vanguard-accent transition-colors" 
                />
              </div>

              <button 
                disabled={status === 'loading'}
                className="w-full bg-vanguard-accent text-white py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sendet...
                  </>
                ) : (
                  <>
                    Anfrage senden
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Locations = () => {
  return (
    <section className="py-24 bg-vanguard-black/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="font-mono text-vanguard-accent text-xs tracking-widest uppercase mb-4 block">Einsatzgebiete</span>
        <h2 className="text-3xl md:text-5xl font-black mb-8">Deutschlandweit für Sie im Einsatz.</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 opacity-60">
          {['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'].map((city) => (
            <span key={city} className="text-xl md:text-2xl font-bold hover:text-vanguard-accent transition-colors cursor-default">
              {city}
            </span>
          ))}
        </div>
        <p className="mt-12 text-vanguard-silver/40 text-sm max-w-2xl mx-auto">
          Als überregional agierendes Sicherheitsunternehmen bieten wir unseren erstklassigen Sicherheitsdienst und unsere spezialisierte Baulogistik an allen bedeutenden Wirtschaftsstandorten in Deutschland an.
        </p>
      </div>
    </section>
  );
};

const Footer = ({ onLegalClick }: { onLegalClick: (type: 'impressum' | 'datenschutz') => void }) => {
  return (
    <footer className="py-12 bg-vanguard-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="font-bold text-xl tracking-tighter">VANGUARD</span>
          <p className="text-[10px] opacity-40 uppercase tracking-widest mt-2">© 2026 VANGUARD SECURITY GmbH – Alle Rechte vorbehalten</p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <button onClick={() => onLegalClick('impressum')} className="hover:text-vanguard-accent transition-colors">Impressum</button>
          <button onClick={() => onLegalClick('datenschutz')} className="hover:text-vanguard-accent transition-colors">Datenschutz</button>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showCookies, setShowCookies] = useState(false);
  const [legalModal, setLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('vanguard_cookie_consent');
    if (!consent) {
      setShowCookies(true);
    }
  }, []);

  const handleCookieAction = () => {
    localStorage.setItem('vanguard_cookie_consent', 'true');
    setShowCookies(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Quality />
      <Stats />
      <Testimonials />
      <Workflow />
      <Locations />
      <Contact />
      <Footer onLegalClick={setLegalModal} />
      
      {showCookies && <CookieConsent onAccept={handleCookieAction} />}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      <ScrollToTop />
    </div>
  );
}
