import { useState } from "react";
import { RRHeader, RRFooter } from "@/components/RRLayout";
import { historicoHardRock, HISTORICO_ATE } from "@/data/historicoHardRock";
import { getFutureShows, getPastHardRockShows, galleryPhotos, parseDate, weekday, MONTH_ABBR } from "@/data/shows";

// Shows que têm página própria de evento.
function eventPage(subtitle = "", date: string) {
  const { month } = parseDate(date);
  if (/HALLOWEEN/i.test(subtitle) && month === 10) return { href: "/halloween", label: "Halloween", color: "#ff8c1a" };
  if (/HARD ROCK WEEKEND/i.test(subtitle)) return { href: "/hardrockweekend", label: "Hard Rock Weekend", color: "#ff5fa2" };
  return null;
}

// Shows feitos em parceria com a North Star Concerts (campo partnerName em data/shows.ts).
const isNorthStar = (partnerName?: string) => /north\s*star/i.test(partnerName ?? "");
const NS_COLOR = "#6030b0";

type Realizado = { iso: string; title: string; ns: boolean };

// Histórico completo: planilha até HISTORICO_ATE + shows de data/shows.ts que já passaram depois disso.
function historicoCompleto(): Realizado[] {
  const base: Realizado[] = historicoHardRock.map(([iso, title, ns]) => ({ iso, title, ns: !!ns }));
  const novos: Realizado[] = getPastHardRockShows()
    .map((p) => {
      const { day, month } = parseDate(p.date);
      const iso = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return { iso, title: p.subtitle ? `${p.name} – ${p.subtitle}` : p.name, ns: isNorthStar(p.partnerName) };
    })
    .filter((p) => p.iso > HISTORICO_ATE);
  return [...base, ...novos].sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
}

export default function HardRock() {
  const shows = getFutureShows().filter((s) => s.venue === "Hard Rock Cafe");
  const historico = historicoCompleto();
  const anos = Array.from(new Set(historico.map((h) => h.iso.slice(0, 4))));
  const [ano, setAno] = useState(anos[0]);
  const doAno = historico.filter((h) => h.iso.startsWith(ano));

  return (
    <div className="rr">
      <RRHeader current="hr" />
      <main>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className="s-red" style={{ padding: "64px clamp(24px, 5vw, 72px)", display: "flex", flexDirection: "column", gap: 24, justifyContent: "flex-end" }}>
            <p style={{ fontSize: 19, fontWeight: 800 }}>Hard Rock Cafe Ribeirão Preto</p>
            <h1 className="disp" style={{ fontSize: "clamp(64px, 8.4vw, 132px)" }}>Rock Ribeirão no Hard Rock</h1>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
                <p className="lede">Mais de 200 shows e mais de 60 mil pessoas: tributos, noites temáticas e grandes bandas. A casa abre às 18h e os shows começam às 21h.</p>
                <a className="btn btn-ink" href="#agenda">Ver a agenda</a>
              </div>
              <a className="ev-titlelogo" href="https://www.instagram.com/hrc.ribeiraopreto/" target="_blank" rel="noopener noreferrer">
                <img src="/halloween/logo-hardrock.png" alt="Hard Rock Cafe Ribeirão Preto" width={408} height={320} />
              </a>
            </div>
          </div>
          <img className="ev-hero-img" src="/Guns%20Cover%20Brasil.jpg" alt="Show do Guns N' Roses Cover Brasil no Hard Rock Cafe" />
        </section>

        <section id="agenda" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Próximos shows</h2>
              <p className="muted">Garanta seu ingresso antes de esgotar.</p>
            </div>
            {shows.length === 0 ? (
              <p className="lede">Novos shows em breve. Acompanhe a Rock Ribeirão no Instagram para saber primeiro.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "32px 20px" }}>
                {shows.map((s) => {
                  const d = parseDate(s.date);
                  const ev = eventPage(s.subtitle, s.date);
                  return (
                    <article key={s.id} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {s.image && (
                        <a href={s.link} style={{ display: "block" }}>
                          <img src={s.image} alt={`Cartaz do show ${s.name}`} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }} />
                        </a>
                      )}
                      <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 64, padding: "8px 0", background: "#cc2200", color: "#fff" }}>
                          <span className="disp" style={{ fontSize: 34 }}>{String(d.day).padStart(2, "0")}</span>
                          <span style={{ fontSize: 13, fontWeight: 800 }}>{MONTH_ABBR[d.month]}</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, minWidth: 0 }}>
                          <h3 style={{ fontSize: 19, lineHeight: 1.2 }}>{s.name}</h3>
                          {s.subtitle && <span className="muted" style={{ fontSize: 14, lineHeight: 1.35 }}>{s.subtitle}</span>}
                          <span className="muted" style={{ fontSize: 14 }}>{weekday(s.date)}, {s.time}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {s.link && <a className="btn btn-red" href={s.link} style={{ flex: "1 1 auto" }}>Comprar ingresso</a>}
                        {ev && <a className="btn btn-line" href={ev.href} style={{ color: ev.color }}>{ev.label}</a>}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            <p className="muted">Cada show sai da agenda no dia seguinte e passa para o histórico abaixo.</p>
          </div>
        </section>

        <section id="historia" className="s s-yellow">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Já passou por esse palco</h2>
                <p className="body" style={{ fontWeight: 600 }}>Todos os shows da Rock Ribeirão no Hard Rock Cafe desde outubro de 2024.</p>
                <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700 }}>
                  <span style={{ background: NS_COLOR, color: "#fff", fontSize: 12, fontWeight: 800, padding: "3px 8px", whiteSpace: "nowrap" }}>Parceria North Star</span>
                  show realizado em parceria com a North Star Concerts
                </p>
              </div>
              <dl style={{ display: "flex", gap: 40 }}>
                <div><dt className="disp" style={{ fontSize: 56 }}>200+</dt><dd style={{ fontWeight: 700 }}>shows</dd></div>
                <div><dt className="disp" style={{ fontSize: 56 }}>60 mil+</dt><dd style={{ fontWeight: 700 }}>pessoas</dd></div>
              </dl>
            </div>
            <div role="tablist" aria-label="Ano" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {anos.map((a) => {
                const n = historico.filter((h) => h.iso.startsWith(a)).length;
                const on = a === ano;
                return (
                  <button key={a} type="button" role="tab" aria-selected={on} onClick={() => setAno(a)}
                    style={{ font: "inherit", fontWeight: 800, fontSize: 17, padding: "10px 18px", cursor: "pointer", border: "2px solid #000", background: on ? "#000" : "transparent", color: on ? "#ffd23f" : "#000" }}>
                    {a} <span style={{ fontWeight: 600, fontSize: 14, opacity: 0.8 }}>· {n} shows</span>
                  </button>
                );
              })}
            </div>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0 40px" }}>
              {doAno.map((h, k) => {
                const [, m, d] = h.iso.split("-").map(Number);
                return (
                  <li key={`${h.iso}-${k}`} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "4px 16px", padding: "12px 0", borderTop: "2px solid #000", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{String(d).padStart(2, "0")} {MONTH_ABBR[m]}</span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <strong style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 800 }}>{h.title}</strong>
                      {h.ns && <span style={{ alignSelf: "flex-start", marginTop: 4, background: NS_COLOR, color: "#fff", fontSize: 12, fontWeight: 800, padding: "3px 8px" }}>Parceria North Star</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="galeria" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Fotos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {galleryPhotos.map((g) => (
                <figure key={g.src} style={{ position: "relative" }}>
                  <img src={g.src} alt={`Show de ${g.alt} no Hard Rock Cafe`} loading="lazy" style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", display: "block" }} />
                  <figcaption style={{ position: "absolute", left: 0, bottom: 0, background: "#000", color: "#fff", fontWeight: 700, fontSize: 14, padding: "6px 10px" }}>{g.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <RRFooter />
    </div>
  );
}
