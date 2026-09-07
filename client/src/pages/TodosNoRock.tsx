import { useState, useEffect } from "react";

declare global {
  interface Window { __bhldScript?: boolean; }
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "feed-id": string }, HTMLElement>;
    }
  }
}
import { MapPin, Clock, Calendar, ArrowLeft, Instagram, Music, Users, Route, Building } from "lucide-react";

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

const lineup = [
  {
    order: "13h30",
    name: "School of Rock",
    image: `${BASE}/tnr-banda-school-of-rock.jpg.jpg`,
    instagram: "https://www.instagram.com/schoolofrock_ribeiraopreto/",
    dj: false,
  },
  {
    order: "14h55",
    name: "Santíssima Trindade",
    image: `${BASE}/tnr-banda-santissima-trindade.jpg`,
    instagram: "https://www.instagram.com/bandasantissimatrindadeoficial/",
    dj: false,
  },
  {
    order: "17h10",
    name: "O Épicco",
    image: `${BASE}/tnr-banda-o-epicco.jpg.jpg`,
    instagram: "https://www.instagram.com/oepiccooficial/",
    dj: false,
  },
  {
    order: "19h15",
    name: "Dirty Jack",
    image: `${BASE}/tnr-banda-dirty-jack.jpg.jpg`,
    instagram: "https://www.instagram.com/dirtyjack.acdccover/",
    dj: false,
  },
  {
    order: "22h00",
    name: "Rotor",
    image: `${BASE}/tnr-banda-rotor.jpg.jpg`,
    instagram: "https://www.instagram.com/bandarotor/",
    dj: false,
  },
];

const apoio = [
  { src: `${BASE}/marquesa.png`, alt: "Cervejaria Marquesa" },
  { src: `${BASE}/governo-sertaozinho.png`, alt: "Governo de Sertãozinho" },
];
const promocao = [
  { src: `${BASE}/kiss.png`, alt: "Kiss FM 105.3" },
  { src: `${BASE}/dritto.png`, alt: "Dritto Mídia" },
];
const realizacao = [
  { src: `${BASE}/Logo%20do%20header.png`, alt: "Rock Ribeirão Produções" },
  { src: `${BASE}/mic.png`, alt: "Ministério da Cultura" },
];

const edicoes = [
  { city: "Sertãozinho — SP", meta: "26 set 2026 · Cervejaria Marquesa · Lei Rouanet", status: "Em breve", done: false },
  { city: "Ribeirão Preto — SP", meta: "Data a confirmar · ProAC aprovado", status: "Captação em andamento", done: false },
  { city: "Monte Alto — SP", meta: "Data a confirmar · Lei Rouanet aprovada", status: "Captação em andamento", done: false },
];

export default function TodosNoRock() {
  const [countdown, setCountdown] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  const isFestivalDomain =
    typeof window !== "undefined" &&
    ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);

  // When this page is served on todosnorock.com.br, "/" resolves back to this
  // same page on that domain (see App.tsx), so the link back to the main site
  // needs to be an absolute URL instead of a relative one.
  const rockRibeiraoHref = isFestivalDomain ? "https://www.rockribeirao.com.br" : "/";

  // "Voltar" only makes sense if the visitor actually came from rockribeirao.com.br.
  // Someone landing directly on todosnorock.com.br (ad, social media, direct link)
  // never left that site, so we frame the link as a credit/intro instead of a return.
  const navLinkLabel = isFestivalDomain ? "Uma produção Rock Ribeirão" : "rockribeirao.com.br";
  const footerLinkLabel = isFestivalDomain
    ? "Conheça a Rock Ribeirão Produções →"
    : "← Voltar para rockribeirao.com.br";

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // On the festival's own domain, use the festival's title and favicon
  // instead of the ones set for rockribeirao.com.br in index.html.
  useEffect(() => {
    if (!isFestivalDomain) return;

    const previousTitle = document.title;
    document.title = "Festival Todos no Rock";

    const iconHref = "/favicon-todosnorock.ico";
    const existingIcon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const previousHref = existingIcon?.getAttribute("href") ?? "/favicon.ico";

    let icon = existingIcon;
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.type = "image/x-icon";
    icon.href = iconHref;

    return () => {
      document.title = previousTitle;
      if (icon) icon.href = previousHref;
    };
  }, [isFestivalDomain]);

  useEffect(() => {
    const target = new Date("2026-09-26T13:00:00-03:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setCountdown({ dias: 0, horas: 0, min: 0, seg: 0 }); return; }
      setCountdown({
        dias: Math.floor(diff / 86400000),
        horas: Math.floor((diff % 86400000) / 3600000),
        min: Math.floor((diff % 3600000) / 60000),
        seg: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: "100vh", backgroundColor: "#06020e", color: "#f0e0ff", fontFamily: "var(--font-sans)" },
    nav: { background: "#08030f", borderBottom: "0.5px solid #2a1050", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 },
    navBack: { display: "flex", alignItems: "center", gap: 8, color: "#9070c0", fontSize: 13, textDecoration: "none" },
    navIg: { display: "flex", alignItems: "center", gap: 6, color: "#b090e0", fontSize: 12, textDecoration: "none" },
    hero: { position: "relative", minHeight: 580, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem", backgroundImage: `linear-gradient(to bottom, rgba(6,2,14,0.5) 0%, rgba(6,2,14,0.88) 100%), url(${BASE}/tnr-hero-bg.jpg.jpg)`, backgroundSize: "cover", backgroundPosition: "center" },
    heroMin: { fontSize: 11, letterSpacing: "0.12em", color: "#a190c4", marginBottom: 16 },
    heroImg: { width: 280, maxWidth: "90%", marginBottom: 24 },
    heroSub: { fontSize: 15, color: "#9070c0", marginBottom: 24 },
    tagsWrap: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 },
    tag: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "5px 14px", borderRadius: 20, border: "0.5px solid #a190c4", color: "#c4a0ff", background: "#1a0a2e" },
    tagGreen: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "5px 14px", borderRadius: 20, border: "0.5px solid #0F6E56", color: "#5DCAA5", background: "#04342C" },
    btn: { background: "#6030b0", color: "#f0e0ff", fontSize: 14, fontWeight: 500, padding: "10px 28px", borderRadius: 8, textDecoration: "none", display: "inline-block" },
    countdown: { background: "#0d0618", borderTop: "2px solid #a190c4", borderBottom: "2px solid #a190c4", padding: "1.5rem", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" },
    countBox: { textAlign: "center" },
    countNum: { display: "block", fontSize: 44, fontWeight: 500, color: "#d0a0ff", lineHeight: 1 },
    countLabel: { fontSize: 11, color: "#a190c4", letterSpacing: "0.08em" },
    section: { padding: "4rem 1.5rem", maxWidth: 960, margin: "0 auto" },
    sectionAlt: { background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "4rem 1.5rem" },
    secLabel: { fontSize: 11, color: "#a190c4", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 12 },
    partnerGroupLabel: { fontSize: 12, color: "#a190c4", textTransform: "uppercase" as const, letterSpacing: "0.12em", textAlign: "center" as const, marginBottom: 14, fontWeight: 700 },
    secTitle: { fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 16, lineHeight: 1.2 },
    pillares: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 },
    pilar: { background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 10, padding: "1rem" },
    pilarTitle: { fontSize: 13, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 },
    pilarDesc: { fontSize: 12, color: "#a190c4" },
    bandGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 16 },
    bandCard: { background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 10, overflow: "hidden", textDecoration: "none", display: "block", transition: "border-color 0.2s" },
    bandImg: { width: "100%", height: 240, objectFit: "cover" as const },
    bandBody: { padding: "1rem" },
    bandOrder: { fontSize: 11, color: "#a190c4", marginBottom: 6 },
    bandName: { fontSize: 18, fontWeight: 500, color: "#f0e0ff", marginBottom: 0 },
    bandIg: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9070c0", marginTop: 8 },
    suppGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
    suppCard: { background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 10, overflow: "hidden", display: "flex", textDecoration: "none" },
    suppImg: { width: 120, height: 140, objectFit: "cover" as const, flexShrink: 0 },
    suppBody: { padding: "1rem" },
    suppOrder: { fontSize: 11, color: "#a190c4", marginBottom: 6 },
    suppName: { fontSize: 16, fontWeight: 500, color: "#f0e0ff", marginBottom: 6 },
    camaroteCard: { background: "#1a0a2e", border: "0.5px solid #6030b0", borderRadius: 12, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 280 },
    camaroteImg: { width: "100%", height: "100%", objectFit: "cover" as const },
    camaroteBody: { padding: "2rem" },
    edicaoList: { display: "flex", flexDirection: "column" as const, gap: 12 },
    edicaoItem: { background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 10, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: 16 },
    dot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
    leiGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 16 },
    leiCard: { background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 10, padding: "1.25rem", display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 8 },
    leiImg: { height: 32, maxWidth: 160, objectFit: "contain" as const,  },
    leiName: { fontSize: 13, fontWeight: 500, color: "#e0c0ff" },
    leiDesc: { fontSize: 12, color: "#a190c4", lineHeight: 1.5 },
    leiBanner: { background: "#12071f", border: "0.5px solid #a190c4", borderRadius: 8, padding: "1rem 1.25rem", fontSize: 13, color: "#a190c4", lineHeight: 1.6 },
    logoGrid: { display: "flex", flexWrap: "wrap" as const, gap: 24, alignItems: "center", justifyContent: "center", padding: "2rem 0" },
    logoImg: { height: 40, maxWidth: 140, objectFit: "contain" as const, opacity: 0.85,  },
    igSection: { background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "4rem 1.5rem", textAlign: "center" as const },
    igBox: { background: "#1a0a2e", border: "0.5px solid #6030b0", borderRadius: 12, padding: "2rem", maxWidth: 500, margin: "0 auto" },
    igHandle: { fontSize: 22, fontWeight: 500, color: "#e0c0ff", marginBottom: 8 },
    igDesc: { fontSize: 14, color: "#a190c4", marginBottom: 20, lineHeight: 1.6 },
    footer: { background: "#06020e", borderTop: "0.5px solid #1a0a2e", padding: "2rem 1.5rem", textAlign: "center" as const },
  };

  return (
    <div style={s.page}>
      {/* NAV */}
      <nav style={s.nav}>
        <a href={rockRibeiraoHref} style={s.navBack}>{!isFestivalDomain && <ArrowLeft size={16} />} {navLinkLabel}</a>
        <a href="https://www.instagram.com/todosnorock/" target="_blank" rel="noopener noreferrer" style={s.navIg}>
          <Instagram size={14} /> @todosnorock
        </a>
      </nav>

      <main>
      {/* HERO */}
      <section style={s.hero}>
        <img src={`${BASE}/mic.png`} alt="Ministério da Cultura" style={{ height: 34, objectFit: "contain", marginBottom: 14, opacity: 0.9 }} />
        <p style={{ ...s.heroMin, marginBottom: 14, color: "#ffffff" }}>apresenta</p>
        <img src={`${BASE}/tnr-logo-oficial.png`} alt="Festival Todos no Rock" style={s.heroImg} />
        <p style={s.heroSub}>Rock ao vivo, gratuito e itinerante no interior paulista</p>
        <div style={s.tagsWrap}>
          <span style={s.tag}><Calendar size={13} /> 26 de setembro de 2026</span>
          <span style={s.tag}><Clock size={13} /> A partir das 13h</span>
          <span style={s.tag}><MapPin size={13} /> Sertãozinho — SP</span>
          <span style={s.tagGreen}>🎟 Entrada gratuita</span>
        </div>
        <a href="#lineup" style={s.btn}>Ver line-up ↓</a>
      </section>

      {/* COUNTDOWN */}
      <section style={s.countdown}>
        {[{ val: countdown.dias, label: "DIAS" }, { val: countdown.horas, label: "HORAS" }, { val: countdown.min, label: "MIN" }, { val: countdown.seg, label: "SEG" }].map((c, i) => (
          <div key={i} style={s.countBox}>
            <span style={s.countNum}>{String(c.val).padStart(2, "0")}</span>
            <span style={s.countLabel}>{c.label}</span>
          </div>
        ))}
      </section>

      {/* O FESTIVAL */}
      <section style={s.section}>
        <p style={s.secLabel}>O festival</p>
        <h2 style={s.secTitle}>Rock ao vivo para todo mundo</h2>
        <p style={{ fontSize: 15, color: "#8060a0", lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>
          O Festival Todos no Rock leva rock ao vivo de qualidade para cidades do interior paulista de forma gratuita e acessível, reunindo música, gastronomia e cultura num único espaço ao ar livre.
        </p>
        <div style={s.pillares}>
          {[
            { icon: <Music size={20} />, title: "Rock ao vivo", desc: "Bandas regionais e tributos a grandes nomes" },
            { icon: <Route size={20} />, title: "Itinerante", desc: "Uma cidade diferente a cada edição" },
            { icon: <Users size={20} />, title: "Popular", desc: "Para todos — jovens, adultos e famílias" },
            { icon: <Building size={20} />, title: "Comunitário", desc: "Valoriza a cultura local e novos talentos" },
          ].map((p, i) => (
            <div key={i} style={s.pilar}>
              <div style={{ color: "#b090e0", marginBottom: 8 }}>{p.icon}</div>
              <p style={s.pilarTitle}>{p.title}</p>
              <p style={s.pilarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LINE-UP */}
      <section id="lineup" style={s.sectionAlt}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={s.secLabel}>Line-up · Sertãozinho 2026</p>
          <h2 style={{ ...s.secTitle, marginBottom: 8 }}>As atrações do festival</h2>
          <p style={{ fontSize: 13, color: "#a190c4", marginBottom: 32 }}>Abertura às 13h · Encerramento às 00h</p>

          {/* TABELA DE PROGRAMAÇÃO */}
          <div style={{ background: "#12071f", border: "0.5px solid #a190c4", borderRadius: 12, overflow: "hidden", marginBottom: 40 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 100px", background: "#6030b0", padding: "10px 20px" }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#e0c0ff", letterSpacing: "0.08em" }}>HORÁRIO</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#e0c0ff", letterSpacing: "0.08em" }}>ATRAÇÃO</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#e0c0ff", letterSpacing: "0.08em", textAlign: "right" }}>DURAÇÃO</span>
            </div>
            {[
              { hora: "13h00", nome: "DJ Rod Mac", duracao: "30 min", dj: true },
              { hora: "13h30", nome: "School of Rock", duracao: "40 min", dj: false },
              { hora: "14h10", nome: "DJ Rod Mac", duracao: "45 min", dj: true },
              { hora: "14h55", nome: "Santíssima Trindade", duracao: "1h30", dj: false },
              { hora: "16h25", nome: "DJ Rod Mac", duracao: "45 min", dj: true },
              { hora: "17h10", nome: "O Épicco", duracao: "1h20", dj: false },
              { hora: "18h30", nome: "DJ Rod Mac", duracao: "45 min", dj: true },
              { hora: "19h15", nome: "Dirty Jack", duracao: "2h00", dj: false },
              { hora: "21h15", nome: "DJ Rod Mac", duracao: "45 min", dj: true },
              { hora: "22h00", nome: "Rotor", duracao: "2h00", dj: false },
              { hora: "00h00", nome: "Encerramento", duracao: "—", dj: true },
            ].map((item, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "100px 1fr 100px",
                padding: "12px 20px",
                background: i % 2 === 0 ? "#0d0618" : "#12071f",
                borderBottom: "0.5px solid #1a0a2e",
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#b090e0" }}>{item.hora}</span>
                <span style={{ fontSize: 14, fontWeight: item.dj ? 400 : 600, color: item.dj ? "#a190c4" : "#f0e0ff" }}>
                  {item.dj ? <em>{item.nome}</em> : item.nome}
                </span>
                <span style={{ fontSize: 13, color: "#a190c4", textAlign: "right" }}>{item.duracao}</span>
              </div>
            ))}
          </div>

          {/* CARDS DAS BANDAS */}
          <div style={s.bandGrid}>
            {lineup.map((band, i) => (
              <a key={i} href={band.instagram} target="_blank" rel="noopener noreferrer" style={s.bandCard}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#8040d0")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#a190c4")}>
                <img src={band.image} alt={band.name} style={s.bandImg} />
                <div style={s.bandBody}>
                  <p style={s.bandName}>{band.name}</p>
                  <span style={s.bandIg}><Instagram size={12} /> Ver no Instagram</span>
                </div>
              </a>
            ))}
          </div>

          {/* DJ E ZÉ DO ROCK */}
          <div style={{ ...s.suppGrid, marginTop: 16 }}>
            <a href="https://www.instagram.com/therodmac_/" target="_blank" rel="noopener noreferrer" style={s.suppCard}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#6030b0")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#a190c4")}>
              <img src={`${BASE}/tnr-dj-rod-mac.jpg.jpg`} alt="DJ Rod Mac" style={s.suppImg} />
              <div style={s.suppBody}>
                <p style={s.suppOrder}>Entre os shows</p>
                <p style={s.suppName}>DJ Rod Mac</p>
                <p style={{ fontSize: 12, color: "#a190c4", marginBottom: 8 }}>Vinil · Rock britânico clássico</p>
                <span style={s.bandIg}><Instagram size={12} /> Ver no Instagram</span>
              </div>
            </a>
            <a href="https://www.instagram.com/zedorockoficial/" target="_blank" rel="noopener noreferrer" style={s.suppCard}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#6030b0")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#a190c4")}>
              <img src={`${BASE}/tnr-ze-do-rock.jpg.jpg`} alt="Zé do Rock" style={s.suppImg} />
              <div style={s.suppBody}>
                <p style={s.suppOrder}>Apresentação oficial</p>
                <p style={s.suppName}>Zé do Rock</p>
                <p style={{ fontSize: 12, color: "#a190c4", marginBottom: 8 }}>Apresentador oficial do festival</p>
                <span style={s.bandIg}><Instagram size={12} /> Ver no Instagram</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CAMAROTE */}
      <section style={s.section}>
        <p style={s.secLabel}>Experiência VIP</p>
        <div style={s.camaroteCard}>
          <img src={`${BASE}/tnr-camarote-marquesa.jpg.jpg`} alt="Camarote Marquesa" style={s.camaroteImg} />
          <div style={s.camaroteBody}>
            <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "#3a1060", color: "#c090f0", display: "inline-block", marginBottom: 12 }}>PAGO · INGRESSO SEPARADO</span>
            <h3 style={{ fontSize: 22, fontWeight: 500, color: "#f0d0ff", marginBottom: 8 }}>Camarote Marquesa</h3>
            <p style={{ fontSize: 13, color: "#8060a0", lineHeight: 1.6, marginBottom: 12 }}>
              Vista privilegiada do palco com open bar e open food da Cervejaria Marquesa.
            </p>
            <p style={{ fontSize: 11, color: "#a190c4", marginBottom: 20 }}>
              ⚠️ A entrada ao festival é gratuita. O camarote é um produto pago à parte.
            </p>
            <a href="https://www.sympla.com.br/evento/todos-no-rock-marquesa-open-bar/3569023" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#6030b0", color: "#f0e0ff", fontSize: 13, fontWeight: 500, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>
              Comprar no Sympla →
            </a>
          </div>
        </div>
      </section>

      {/* LAYOUT DO EVENTO */}
      <section style={s.sectionAlt}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={s.secLabel}>Estrutura do evento</p>
          <h2 style={s.secTitle}>Layout — Sertãozinho 2026</h2>
          <p style={{ fontSize: 13, color: "#a190c4", marginBottom: 24 }}>Av. Nelson Benedito Machado, 512 — Distrito Industrial, Sertãozinho — SP</p>
          <img src={`${BASE}/tnr-layout-sertaozinho.jpg.jpg`} alt="Layout do evento" style={{ width: "100%", borderRadius: 10, border: "0.5px solid #a190c4" }} />
        </div>
      </section>

      {/* EDIÇÕES */}
      <section style={s.section}>
        <p style={s.secLabel}>Festival itinerante</p>
        <h2 style={{ ...s.secTitle, marginBottom: 32 }}>Edições</h2>
        <div style={s.edicaoList}>
          {edicoes.map((e, i) => (
            <div key={i} style={{ ...s.edicaoItem, border: `0.5px solid ${e.done ? "#2a6050" : "#a190c4"}` }}>
              <div style={{ ...s.dot, background: e.done ? "#5DCAA5" : "#7F77DD" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#e0c0ff", marginBottom: 3 }}>{e.city}</p>
                <p style={{ fontSize: 12, color: "#a190c4" }}>{e.meta}</p>
              </div>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: e.done ? "#085041" : "#26215C", color: e.done ? "#5DCAA5" : "#AFA9EC" }}>
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* INCENTIVO CULTURAL */}
      <section style={s.sectionAlt}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={s.secLabel}>Incentivo cultural</p>
          <h2 style={{ ...s.secTitle, marginBottom: 24 }}>Viabilizado pela cultura</h2>
          <div style={s.leiGrid}>
            <div style={s.leiCard}>
              <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={s.leiImg} />
              <p style={s.leiName}>Lei Rouanet</p>
              <p style={s.leiDesc}>Lei Federal nº 8.313/91 · Ministério da Cultura</p>
            </div>
            <div style={s.leiCard}>
              <span style={{ fontSize: 28 }}>🎭</span>
              <p style={s.leiName}>ProAC</p>
              <p style={s.leiDesc}>Programa de Ação Cultural · Governo do Estado de SP</p>
            </div>
          </div>
          <div style={s.leiBanner}>
            Empresas que apoiam o festival pela <strong style={{ color: "#b090e0" }}>Lei Rouanet</strong> podem deduzir até 100% do valor no <strong style={{ color: "#b090e0" }}>Imposto de Renda</strong>. Pelo <strong style={{ color: "#b090e0" }}>ProAC ICMS</strong>, empresas que recolhem ICMS no Estado de São Paulo podem abater o valor do imposto estadual.
          </div>
        </div>
      </section>

      {/* LEVE O FESTIVAL */}
      <section style={{ ...s.section, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ ...s.secTitle, textAlign: "center" }}>Leve o festival para sua cidade</h2>
          <p style={{ fontSize: 14, color: "#a190c4", lineHeight: 1.6, marginBottom: 28 }}>
            Prefeituras, secretarias de cultura e empresas interessadas em trazer o Festival Todos no Rock para sua cidade podem entrar em contato.
          </p>
          <a href="mailto:rtodeschini@rockribeirao.com.br" style={s.btn}>Fale com a gente →</a>
        </div>
      </section>

      {/* É TUDO TOISS */}
      <section style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d0618 100%)", borderTop: "2px solid #6030b0", borderBottom: "2px solid #6030b0", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ background: "#12071f", border: "0.5px solid #6030b0", borderRadius: 16, overflow: "hidden", display: "grid", gridTemplateColumns: "auto 1fr", gap: 0 }}>
            {/* Faixa lateral */}
            <div style={{ background: "linear-gradient(to bottom, #6030b0, #a190c4)", width: 8, flexShrink: 0 }} />
            <div style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                <img src={`${BASE}/toiss.png`} alt="É Tudo Toiss" style={{ height: 64, objectFit: "contain" }} />
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.1em", color: "#a190c4", marginBottom: 4 }}>AÇÃO SOCIAL · FESTIVAL TODOS NO ROCK SERTÃOZINHO</p>
                  <h3 style={{ fontSize: 22, fontWeight: 500, color: "#f0e0ff", lineHeight: 1.2 }}>Apoio à Instituição É Tudo Toiss</h3>
                </div>
              </div>
              <p style={{ fontSize: 15, color: "#9070c0", lineHeight: 1.8, marginBottom: 24 }}>
                É com enorme satisfação e orgulho que o Festival Todos no Rock Sertãozinho apoia a Instituição É Tudo Toiss, que há <strong style={{ color: "#d0a0ff" }}>11 anos</strong> atua em benefício de crianças e famílias carentes na cidade. Contribuir para uma causa tão importante é o que move o espírito de mudança para uma sociedade melhor e mais justa.
              </p>
              <div style={{ background: "#1a0a2e", border: "0.5px solid #8040d0", borderRadius: 12, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 36 }}>🛒</span>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#f0e0ff", marginBottom: 4 }}>Traga 1kg de alimento no dia 26/09</p>
                  <p style={{ fontSize: 13, color: "#8060a0" }}>Você garante a alegria de quem mais precisa. A entrada é gratuita — o alimento é o seu ingresso solidário.</p>
                </div>
              </div>
              <a href="https://www.instagram.com/etudo_toiss/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#6030b0", color: "#f0e0ff", fontSize: 13, fontWeight: 500, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>
                <Instagram size={14} /> Conheça a Instituição
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section style={s.sectionAlt}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ ...s.secLabel, textAlign: "center", marginBottom: 20 }}>Edição Sertãozinho</p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={{ height: 56, objectFit: "contain" }} />
          </div>

          <div style={{ marginBottom: 32 }}>
            <p style={s.partnerGroupLabel}>Apoio</p>
            <div style={s.logoGrid}>
              {apoio.map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} style={s.logoImg} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <p style={s.partnerGroupLabel}>Promoção</p>
            <div style={s.logoGrid}>
              {promocao.map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} style={s.logoImg} />
              ))}
            </div>
          </div>

          <div>
            <p style={s.partnerGroupLabel}>Realização</p>
            <div style={s.logoGrid}>
              {realizacao.map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} style={s.logoImg} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section style={s.igSection}>
        <p style={{ ...s.secLabel, textAlign: "center" }}>Acompanhe o festival</p>
        <p style={{ fontSize: 20, fontWeight: 500, color: "#e0c0ff", marginBottom: 8 }}>@todosnorock</p>
        <p style={{ fontSize: 14, color: "#a190c4", marginBottom: 32 }}>Novidades, bastidores e chamadas das bandas</p>
        <behold-widget feed-id="cdzugaIBMXksgUHHxqH3"></behold-widget>
        <div style={{ marginTop: 24 }}>
          <a href="https://www.instagram.com/todosnorock/" target="_blank" rel="noopener noreferrer"
            style={{ ...s.btn, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Instagram size={16} /> Seguir no Instagram
          </a>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer style={s.footer}>
        <img src={`${BASE}/Logo%20do%20header.png`} alt="Rock Ribeirão" style={{ display: "block", margin: "0 auto 12px", height: 40, opacity: 0.7 }} />
        <p style={{ fontSize: 12, color: "#a190c4", marginBottom: 4 }}>© 2026 Festival Todos no Rock · Rock Ribeirão Produções</p>
        <p style={{ fontSize: 12, color: "#a190c4", marginBottom: 12 }}>CNPJ: 48.549.855/0001-00</p>
        <a href={rockRibeiraoHref} style={{ fontSize: 12, color: "#a190c4", textDecoration: "none" }}>{footerLinkLabel}</a>
        <p style={{ marginTop: 10 }}><a href="/acessibilidade" style={{ fontSize: 12, color: "#a190c4", textDecoration: "underline" }}>Declaração de Acessibilidade</a></p>
      </footer>
    </div>
  );
}
