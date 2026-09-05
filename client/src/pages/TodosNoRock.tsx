import { useState, useEffect } from "react";
import { MapPin, Clock, Calendar, Mail, Instagram, ArrowLeft, Star, Music, Users, Route, Building } from "lucide-react";

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

const lineup = [
  {
    order: "Abertura · 13h",
    name: "School of Rock",
    desc: "Alunos ao vivo no palco do festival",
    image: `${BASE}/tnr-banda-school-of-rock.jpg.jpg`,
    headliner: false,
  },
  {
    order: "14h30",
    name: "Santíssima Trindade",
    desc: "Tributo ao Deep Purple, Black Sabbath e Led Zeppelin",
    image: `${BASE}/tnr-banda-santissima-trindade.jpg`,
    headliner: false,
  },
  {
    order: "16h",
    name: "O Épicco",
    desc: "Rock nacional",
    image: `${BASE}/tnr-banda-o-epicco.jpg.jpg`,
    headliner: false,
  },
  {
    order: "17h30",
    name: "Dirty Jack",
    desc: "Tributo ao AC/DC",
    image: `${BASE}/tnr-banda-dirty-jack.jpg.jpg`,
    headliner: true,
  },
  {
    order: "Encerramento · 19h",
    name: "Rotor",
    desc: "Tributo ao Bon Jovi, U2, Journey e mais",
    image: `${BASE}/tnr-banda-rotor.jpg.jpg`,
    headliner: true,
  },
];

const edicoes = [
  { city: "Sertãozinho — SP", meta: "26 set 2026 · Cervejaria Marquesa · Lei Rouanet", status: "Realizada", done: true },
  { city: "Ribeirão Preto — SP", meta: "Data a confirmar · ProAC aprovado", status: "Captação em andamento", done: false },
  { city: "Monte Alto — SP", meta: "Data a confirmar · Lei Rouanet aprovada", status: "Captação em andamento", done: false },
];

export default function TodosNoRock() {
  const [countdown, setCountdown] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const target = new Date("2026-09-26T13:00:00-03:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#06020e", color: "#f0e0ff", fontFamily: "var(--font-sans)" }}>

      {/* NAV */}
      <nav style={{ background: "#08030f", borderBottom: "0.5px solid #2a1050", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#9070c0", fontSize: 13, textDecoration: "none" }}>
          <ArrowLeft size={16} /> rockribeirao.com.br
        </a>
        <a href="https://instagram.com/todosnorock" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "#b090e0", fontSize: 12, textDecoration: "none" }}>
          <Instagram size={14} /> @todosnorock
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "4rem 1.5rem",
        backgroundImage: `linear-gradient(to bottom, rgba(6,2,14,0.55) 0%, rgba(6,2,14,0.85) 100%), url(${BASE}/tnr-hero-bg.jpg.jpg)`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#7040a0", marginBottom: 16 }}>O MINISTÉRIO DA CULTURA APRESENTA</p>
        <img src={`${BASE}/Todos%20no%20Rock%2020260926.png`} alt="Festival Todos no Rock" style={{ width: 280, maxWidth: "90%", marginBottom: 24 }} />
        <p style={{ fontSize: 15, color: "#9070c0", marginBottom: 24 }}>Rock ao vivo, gratuito e itinerante no interior paulista</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          {[
            { icon: <Calendar size={13} />, text: "26 de setembro de 2026" },
            { icon: <Clock size={13} />, text: "A partir das 13h" },
            { icon: <MapPin size={13} />, text: "Sertãozinho — SP" },
          ].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "5px 14px", borderRadius: 20, border: "0.5px solid #5030a0", color: "#c4a0ff", background: "#1a0a2e" }}>
              {item.icon} {item.text}
            </span>
          ))}
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "5px 14px", borderRadius: 20, border: "0.5px solid #0F6E56", color: "#5DCAA5", background: "#04342C" }}>
            🎟 Entrada gratuita
          </span>
        </div>
        <a href="#lineup" style={{ background: "#6030b0", color: "#f0e0ff", fontSize: 14, fontWeight: 500, padding: "10px 28px", borderRadius: 8, textDecoration: "none" }}>
          Ver line-up ↓
        </a>
      </section>

      {/* COUNTDOWN */}
      <section style={{ background: "#0d0618", borderTop: "2px solid #3a1a60", borderBottom: "2px solid #3a1a60", padding: "1.5rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {[
          { val: countdown.dias, label: "DIAS" },
          { val: countdown.horas, label: "HORAS" },
          { val: countdown.min, label: "MIN" },
          { val: countdown.seg, label: "SEG" },
        ].map((c, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: 40, fontWeight: 500, color: "#d0a0ff", lineHeight: 1 }}>{String(c.val).padStart(2, "0")}</span>
            <span style={{ fontSize: 11, color: "#5030a0", letterSpacing: "0.08em" }}>{c.label}</span>
          </div>
        ))}
      </section>

      {/* O FESTIVAL */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>O festival</p>
        <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 16, lineHeight: 1.2 }}>Rock ao vivo para todo mundo</h2>
        <p style={{ fontSize: 15, color: "#8060a0", lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>
          O Festival Todos no Rock leva rock ao vivo de qualidade para cidades do interior paulista de forma gratuita e acessível, reunindo música, gastronomia e cultura num único espaço ao ar livre.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { icon: <Music size={20} />, title: "Rock ao vivo", desc: "Bandas regionais e tributos a grandes nomes" },
            { icon: <Route size={20} />, title: "Itinerante", desc: "Uma cidade diferente a cada edição" },
            { icon: <Users size={20} />, title: "Popular", desc: "Para todos — jovens, adultos e famílias" },
            { icon: <Building size={20} />, title: "Comunitário", desc: "Valoriza a cultura local e novos talentos" },
          ].map((p, i) => (
            <div key={i} style={{ background: "#1a0a2e", border: "0.5px solid #3a1a60", borderRadius: 10, padding: "1rem" }}>
              <div style={{ color: "#b090e0", marginBottom: 8 }}>{p.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 }}>{p.title}</p>
              <p style={{ fontSize: 12, color: "#6040a0" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LINE-UP */}
      <section id="lineup" style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Line-up · Sertãozinho 2026</p>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 32 }}>As bandas do festival</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
            {lineup.map((band, i) => (
              <div key={i} style={{
                background: band.headliner ? "#220d3a" : "#1a0a2e",
                border: `0.5px solid ${band.headliner ? "#8040d0" : "#3a1a60"}`,
                borderRadius: 10, overflow: "hidden",
              }}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={band.image} alt={band.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ fontSize: 11, color: "#7040a0", marginBottom: 4 }}>{band.order}</p>
                  <p style={{ fontSize: 16, fontWeight: 500, color: band.headliner ? "#f0d0ff" : "#e0c0ff", marginBottom: 4 }}>{band.name}</p>
                  <p style={{ fontSize: 12, color: "#6040a0" }}>{band.desc}</p>
                  {band.headliner && <span style={{ display: "inline-block", marginTop: 8, fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#3a1060", color: "#c090f0" }}>HEADLINER</span>}
                </div>
              </div>
            ))}
          </div>

          {/* DJ E ZÉ DO ROCK */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ background: "#1a0a2e", border: "0.5px solid #3a1a60", borderRadius: 10, overflow: "hidden", display: "flex", gap: 0 }}>
              <img src={`${BASE}/tnr-dj-rod-mac.jpg.jpg`} alt="DJ Rod Mac" style={{ width: 120, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "1rem" }}>
                <p style={{ fontSize: 11, color: "#7040a0", marginBottom: 4 }}>Entre os shows</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 }}>DJ Rod Mac</p>
                <p style={{ fontSize: 12, color: "#6040a0" }}>Discotecagem de vinil com os clássicos do rock britânico</p>
              </div>
            </div>
            <div style={{ background: "#1a0a2e", border: "0.5px solid #3a1a60", borderRadius: 10, overflow: "hidden", display: "flex", gap: 0 }}>
              <img src={`${BASE}/tnr-ze-do-rock.jpg.jpg`} alt="Zé do Rock" style={{ width: 120, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "1rem" }}>
                <p style={{ fontSize: 11, color: "#7040a0", marginBottom: 4 }}>Apresentação</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 }}>Zé do Rock</p>
                <p style={{ fontSize: 12, color: "#6040a0" }}>Apresentador oficial do festival</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMAROTE */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Experiência VIP</p>
        <div style={{ background: "#1a0a2e", border: "0.5px solid #6030b0", borderRadius: 12, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 280 }}>
          <img src={`${BASE}/tnr-camarote-marquesa.jpg.jpg`} alt="Camarote Marquesa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ padding: "2rem" }}>
            <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "#3a1060", color: "#c090f0", display: "inline-block", marginBottom: 12 }}>PAGO · INGRESSO SEPARADO</span>
            <h3 style={{ fontSize: 22, fontWeight: 500, color: "#f0d0ff", marginBottom: 8 }}>Camarote Marquesa</h3>
            <p style={{ fontSize: 13, color: "#8060a0", lineHeight: 1.6, marginBottom: 16 }}>
              Vista privilegiada do palco com open bar e open food da Cervejaria Marquesa. Uma experiência premium enquanto curte o festival.
            </p>
            <div style={{ fontSize: 12, color: "#6040a0", marginBottom: 20 }}>
              ⚠️ A entrada ao festival é gratuita. O camarote é um produto pago à parte.
            </div>
            <span style={{ display: "inline-block", background: "#3a1060", color: "#c090f0", fontSize: 13, padding: "8px 20px", borderRadius: 8, cursor: "pointer" }}>
              Em breve no Sympla
            </span>
          </div>
        </div>
      </section>

      {/* LAYOUT DO EVENTO */}
      <section style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Estrutura do evento</p>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 8 }}>Layout — Sertãozinho 2026</h2>
          <p style={{ fontSize: 13, color: "#7040a0", marginBottom: 24 }}>Av. Nelson Benedito Machado, 512 — Distrito Industrial, Sertãozinho — SP</p>
          <img src={`${BASE}/tnr-layout-sertaozinho.jpg.jpg`} alt="Layout do evento" style={{ width: "100%", borderRadius: 10, border: "0.5px solid #3a1a60" }} />
        </div>
      </section>

      {/* EDIÇÕES */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Festival itinerante</p>
        <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 32 }}>Edições</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {edicoes.map((e, i) => (
            <div key={i} style={{ background: "#1a0a2e", border: `0.5px solid ${e.done ? "#2a6050" : "#3a1a60"}`, borderRadius: 10, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: e.done ? "#5DCAA5" : "#7F77DD", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#e0c0ff", marginBottom: 3 }}>{e.city}</p>
                <p style={{ fontSize: 12, color: "#5030a0" }}>{e.meta}</p>
              </div>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: e.done ? "#085041" : "#26215C", color: e.done ? "#5DCAA5" : "#AFA9EC" }}>
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* INCENTIVO CULTURAL */}
      <section style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Incentivo cultural</p>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 24 }}>Viabilizado pela cultura</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "#1a0a2e", border: "0.5px solid #3a1a60", borderRadius: 10, padding: "1.25rem" }}>
              <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={{ height: 40, marginBottom: 12, filter: "invert(1) brightness(0.7)" }} />
              <p style={{ fontSize: 13, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 }}>Lei Rouanet</p>
              <p style={{ fontSize: 12, color: "#6040a0", lineHeight: 1.5 }}>Lei Federal nº 8.313/91 · Ministério da Cultura</p>
            </div>
            <div style={{ background: "#1a0a2e", border: "0.5px solid #3a1a60", borderRadius: 10, padding: "1.25rem" }}>
              <p style={{ fontSize: 24, marginBottom: 8 }}>🎭</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#e0c0ff", marginBottom: 4 }}>ProAC</p>
              <p style={{ fontSize: 12, color: "#6040a0", lineHeight: 1.5 }}>Programa de Ação Cultural · Governo do Estado de SP</p>
            </div>
          </div>
          <div style={{ background: "#12071f", border: "0.5px solid #3a1a60", borderRadius: 8, padding: "1rem 1.25rem", fontSize: 13, color: "#7040a0", lineHeight: 1.6 }}>
            <strong style={{ color: "#b090e0" }}>Empresas que apoiam o festival podem deduzir até 100% do valor no Imposto de Renda</strong> por meio dos mecanismos da Lei Rouanet e ProAC.
          </div>
        </div>
      </section>

      {/* LEVE O FESTIVAL */}
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: "#e0c0ff", marginBottom: 12 }}>Leve o festival para sua cidade</h2>
          <p style={{ fontSize: 14, color: "#7040a0", lineHeight: 1.6, marginBottom: 28 }}>
            Prefeituras, secretarias de cultura e empresas interessadas em trazer o Festival Todos no Rock para sua cidade podem entrar em contato.
          </p>
          <a href="mailto:rtodeschini@rockribeirao.com.br" style={{ display: "inline-block", background: "#6030b0", color: "#f0e0ff", fontSize: 14, fontWeight: 500, padding: "12px 28px", borderRadius: 8, textDecoration: "none" }}>
            Fale com a gente →
          </a>
        </div>
      </section>

      {/* PARCEIROS */}
      <section style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#5030a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Parceiros · Edição Sertãozinho</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginBottom: 24 }}>
            <img src={`${BASE}/ministerio-da-cultura-brasil.png`} alt="Ministério da Cultura" style={{ height: 36, filter: "brightness(0) invert(1) opacity(0.5)" }} />
            <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={{ height: 28, filter: "brightness(0) invert(1) opacity(0.5)" }} />
            <img src={`${BASE}/cultura-sertaozinho.png`} alt="Secretaria de Cultura Sertãozinho" style={{ height: 36, filter: "brightness(0) invert(1) opacity(0.5)" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Apoio: Cervejaria Marquesa", "Apoio: Secretaria de Cultura — Sertãozinho", "Promoção: Kiss FM 105.3", "Promoção: Dritto Mídia Out of Home", "Realização: Rock Ribeirão Produções"].map((p, i) => (
              <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, border: "0.5px solid #3a1a60", color: "#8060a0", background: "#12071f" }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#06020e", borderTop: "0.5px solid #1a0a2e", padding: "2rem 1.5rem", textAlign: "center" }}>
        <img src={`${BASE}/Logo%20do%20header.png`} alt="Rock Ribeirão" style={{ height: 40, marginBottom: 12, opacity: 0.7 }} />
        <p style={{ fontSize: 12, color: "#3a1a60", marginBottom: 6 }}>© 2026 Festival Todos no Rock · Rock Ribeirão Produções</p>
        <p style={{ fontSize: 12, color: "#3a1a60", marginBottom: 12 }}>RST Soluções Ltda. · CNPJ: 48.549.855/0001-00</p>
        <a href="/" style={{ fontSize: 12, color: "#6040a0", textDecoration: "none" }}>← Voltar para rockribeirao.com.br</a>
      </footer>
    </div>
  );
}
