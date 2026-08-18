import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { privateDoorContent } from "./content/privateDoor";
import { siteContent, type ImageAsset } from "./content/siteContent";

function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg className={`arrow-icon arrow-icon--${direction}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d={direction === "down" ? "M4 7l6 6 6-6" : "M3 10h13M11 5l5 5-5 5"} />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v14M3 10h14" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function AssetImage({ asset, className = "", loading = "lazy" }: { asset: ImageAsset; className?: string; loading?: "eager" | "lazy" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`asset-fallback ${className}`} role="img" aria-label={asset.alt}>
        <span>{asset.fallback}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={asset.src}
      alt={asset.alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealStyle = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <div ref={ref} style={revealStyle} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionIntro({ number, title, intro, id, tone = "dark" }: { number: string; title: string; intro: string; id?: string; tone?: "dark" | "light" }) {
  return (
    <div className={`section-intro section-intro--${tone}`}>
      <div className="section-intro__rule" aria-hidden="true" />
      <div className="section-intro__index">{number}</div>
      <h2 id={id}>{title}</h2>
      <p>
        {intro.split("\n").map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

function SiteHeader({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${menuOpen ? "is-open" : ""}`}>
      <a className="brand-mark" href="#top" onClick={closeMenu} aria-label="回到首页">
        E<span>Y</span>
      </a>
      <nav className="desktop-nav" aria-label="主导航">
        {siteContent.nav.map((item) => (
          <a key={item.href} className={activeSection === item.href.slice(1) ? "is-active" : ""} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-meta">
        <span className="header-meta__current">{activeSection === "top" ? "00" : activeSection === "motion" ? "01" : activeSection === "elsewhere" ? "02" : activeSection === "convictions" ? "04" : "05"}</span>
        <span className="header-meta__slash">/</span>
        <span>06</span>
      </div>
      <button className="menu-trigger" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <MenuIcon open={menuOpen} />
        <span className="sr-only">{menuOpen ? "关闭导航" : "打开导航"}</span>
      </button>
      <div id="mobile-navigation" className="mobile-nav" aria-hidden={!menuOpen}>
        <div className="mobile-nav__topline">PRIVATE DOCUMENTARY <span>01 — 06</span></div>
        <nav aria-label="移动端主导航">
          {siteContent.nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>{String(index).padStart(2, "0")}</span>
              {item.label}
              {index > 0 && <ArrowIcon />}
            </a>
          ))}
        </nav>
        <p className="mobile-nav__note">有些事，慢一点才看得清。</p>
      </div>
    </header>
  );
}

function Hero() {
  const { hero } = siteContent;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__image-wrap">
        <AssetImage asset={hero.image} className="hero__image" loading="eager" />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__content page-gutter">
        <p className="eyebrow eyebrow--light">{hero.eyebrow}</p>
        <h1 id="hero-title">{hero.title}</h1>
        <div className="hero__bottomline">
          <p>{hero.subtitle}</p>
          <a className="scroll-prompt" href="#motion">
            <span>{hero.prompt}</span>
            <ArrowIcon direction="down" />
          </a>
        </div>
      </div>
      <div className="hero__side-note" aria-hidden="true">
        <span>PRIVATE / 01</span>
        <span>SHADOWS &amp; LIGHT</span>
      </div>
    </section>
  );
}

function MotionSection() {
  const { motion } = siteContent;
  return (
    <section id="motion" className="motion section-dark" aria-labelledby="motion-title">
      <div className="page-gutter">
        <SectionIntro id="motion-title" number="01" title={motion.title} intro={motion.intro} />
        <div className="motion__quote-wrap">
          <div className="motion__quote-mark" aria-hidden="true">“</div>
          <p className="motion__quote">{motion.pullQuote}</p>
        </div>
        <div className="motion__layout">
          <Reveal className="motion__lead-image image-frame image-frame--tall">
            <AssetImage asset={motion.images[0]} />
            <span className="image-caption">A TABLE BEFORE THE ROOM FILLS</span>
          </Reveal>
          <div className="motion__notes">
            {motion.fragments.map((fragment, index) => (
              <Reveal key={fragment.number} className="motion-note" delay={index * 90}>
                <span className="motion-note__number">{fragment.number}</span>
                <div>
                  <p className="motion-note__label">{fragment.label}</p>
                  <p className="motion-note__text">{fragment.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="motion__bottom-grid">
          <Reveal className="image-frame image-frame--wide">
            <AssetImage asset={motion.images[1]} />
            <span className="image-caption">BETWEEN DEPARTURE &amp; ARRIVAL</span>
          </Reveal>
          <Reveal className="image-frame image-frame--paper">
            <AssetImage asset={motion.images[2]} />
            <span className="image-caption">NOT FINISHED THE FIRST TIME</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ElsewhereSection() {
  const { elsewhere } = siteContent;
  return (
    <section id="elsewhere" className="elsewhere section-light" aria-labelledby="elsewhere-title">
      <div className="page-gutter">
        <SectionIntro id="elsewhere-title" number="02" title={elsewhere.title} intro={elsewhere.intro} tone="light" />
        <div className="elsewhere__gallery">
          {elsewhere.images.map((item, index) => (
            <Reveal key={item.marker} className={`place-frame place-frame--${index + 1}`}>
              <AssetImage asset={item} />
              <div className="place-frame__overlay">
                <span>{item.marker}</span>
                <span>{item.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="elsewhere__closing">
          <span className="side-label">A FEW PLACES / UNFINISHED</span>
          <p>{elsewhere.closing}</p>
        </div>
      </div>
    </section>
  );
}

function ReturnsSection() {
  const { returns } = siteContent;
  return (
    <section id="returns" className="returns section-dark" aria-labelledby="returns-title">
      <div className="page-gutter">
        <div className="returns__heading">
          <div>
            <p className="eyebrow">03 / THE PERSONAL INDEX</p>
            <h2 id="returns-title">{returns.title}</h2>
          </div>
          <p>{returns.intro}</p>
        </div>
        <div className="returns__grid">
          {returns.items.map((item, index) => (
            <Reveal key={item.label} className={`return-card return-card--${index + 1}`}>
              <div className="return-card__image image-frame">
                <AssetImage asset={item.image} />
                <span className="image-caption">{item.image.fallback}</span>
              </div>
              <div className="return-card__copy">
                <span className="return-card__index">0{index + 1}</span>
                <div>
                  <p className="return-card__label">{item.label}</p>
                  <p className="return-card__note">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConvictionsSection() {
  const { convictions } = siteContent;
  return (
    <section id="convictions" className="convictions section-paper" aria-labelledby="convictions-title">
      <div className="page-gutter">
        <SectionIntro id="convictions-title" number="04" title={convictions.title} intro={convictions.intro} tone="light" />
        <div className="convictions__list">
          {convictions.lines.map((line, index) => (
            <Reveal key={line.english} className="conviction-line" delay={index * 80}>
              <span className="conviction-line__index">0{index + 1}</span>
              <div>
                <p className="conviction-line__english">{line.english}</p>
                <p className="conviction-line__chinese">{line.chinese}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudioButton({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!src) return null;

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    await audioRef.current.play();
    setPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} preload="none" />
      <button className="audio-button" type="button" onClick={toggle} aria-label={playing ? "暂停声音" : "播放声音"}>
        <span className={`audio-button__dot ${playing ? "is-playing" : ""}`} />
        <span>{playing ? "PAUSE" : "LISTEN"}</span>
      </button>
    </>
  );
}

function FragmentsSection() {
  const { fragments } = siteContent;
  return (
    <section id="fragments" className="fragments section-dark" aria-labelledby="fragments-title">
      <div className="page-gutter">
        <SectionIntro id="fragments-title" number="05" title={fragments.title} intro={fragments.intro} />
        <div className="fragments__grid">
          {fragments.items.map((item, index) => (
            <Reveal key={item.number} className={`fragment-card fragment-card--${index + 1}`}>
              {item.image && (
                <div className="fragment-card__image image-frame">
                  <AssetImage asset={item.image} />
                </div>
              )}
              <div className="fragment-card__copy">
                <div className="fragment-card__topline">
                  <span>{item.number}</span>
                  <span>{item.title}</span>
                </div>
                <p>{item.text}</p>
                <AudioButton src={item.audioSrc} />
              </div>
              {!item.image && <div className="fragment-card__ghost" aria-hidden="true"><PlusIcon /></div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const { closing } = siteContent;
  return (
    <footer className="closing section-dark" aria-labelledby="closing-title">
      <div className="page-gutter">
        <div className="closing__rule" aria-hidden="true" />
        <p className="eyebrow">06 / THE LAST FRAME</p>
        <h2 id="closing-title">
          {closing.title.split("\n").map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className="closing__english">{closing.english}</p>
        <div className="closing__bottomline">
          <span>{closing.smallNote}</span>
          {closing.contact && <a href={closing.contact.href}>{closing.contact.label}<ArrowIcon /></a>}
        </div>
      </div>
    </footer>
  );
}

function PrivateDoor() {
  const content = privateDoorContent;
  return (
    <main className="private-page">
      <div className="page-gutter">
        <a href="/" className="private-page__back"><ArrowIcon direction="down" /> BACK TO THE FILM</a>
        {content.enabled && content.body ? (
          <article className="private-note">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="private-note__body">{content.body}</p>
            <p className="private-note__signature">{content.signature}</p>
            <AudioButton src={content.audioSrc} />
          </article>
        ) : (
          <div className="private-empty">
            <span>THE DOOR IS NOT OPEN</span>
            <p>There is nothing here yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = ["top", "motion", "elsewhere", "convictions", "fragments"];
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.36;
      let current = "top";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return activeSection;
}

function DocumentaryPage() {
  const activeSection = useActiveSection();

  useEffect(() => {
    document.title = siteContent.meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", siteContent.meta.description);
    const ogImage = document.querySelector('meta[property="og:image"]');
    ogImage?.setAttribute("content", siteContent.meta.ogImage);
  }, []);

  return (
    <div className="site-shell">
      <SiteHeader activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        <MotionSection />
        <ElsewhereSection />
        <ReturnsSection />
        <ConvictionsSection />
        <FragmentsSection />
      </main>
      <Closing />
    </div>
  );
}

export default function App() {
  const isPrivatePath = window.location.pathname.replace(/\/$/, "") === "/for-you";
  return isPrivatePath ? <PrivateDoor /> : <DocumentaryPage />;
}
