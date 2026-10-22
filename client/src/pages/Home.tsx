import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RRHeader, RRFooter, ContactForm } from "@/components/RRLayout";
import { getFutureShows, weekday, parseDate } from "@/data/shows";
import { projetos, projetoHref, GROUPS } from "@/data/projetos";

const SECTIONS = [
  { href: "#ingressos", label: "Ingressos" },
  { href: "#destaques", label: "Destaques" },
  { href: "#projetos", label: "Projetos" },
  { href: "/hardrock", label: "Hard Rock" },
  { href: "#patrocine", label: "Patrocine" },
  { href: "#contato", label: "Contato" },
];

const MONTHS = ["", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const DESTAQUES = [
  { href: "/rockrising", img: "/rockrising/rockrising-destaque-home.jpg", alt: "Rock Rising 2027, festival de novos talentos do rock", title: "Rock Rising 2027", text: "Festival de novas bandas. Inscrições a partir de 15 de janeiro, final em 21 de março.", cta: "Conhecer o festival", color: "#ffffff", until: null as number | null },
  { href: "/halloween", img: "/halloween/halloween-destaque-home.jpg", alt: "Halloween no Hard Rock Cafe Ribeirão Preto", title: "Halloween no Hard Rock", text: "30 e 31 de outubro, a partir das 21h, no Hard Rock Cafe Ribeirão Preto.", cta: "Ver a programação", color: "#ff8c1a", until: new Date("2026-11-01T06:00:00-03:00").getTime() },
  { href: "/hardrockweekend", img: "/hardrockweekend/hardrockweekend-destaque-home.jpg", alt: "Hard Rock Weekend, 19, 20 e 21 de novembro", title: "Hard Rock Weekend", text: "Guns Cover Brazil, Lost80s e Radio Show. 19, 20 e 21 de novembro, a partir das 21h.", cta: "Garantir ingresso", color: "#ff5fa2", until: new Date("2026-11-22T06:00:00-03:00").getTime() },
];

const SIZES = { festivais: "clamp(52px, 7.6vw, 116px)", shows: "clamp(44px, 5.6vw, 84px)", formacao: "clamp(40px, 4.6vw, 68px)" } as const;

export default function Home() {
  const slides = getFutureShows().filter((s) => s.bannerImage);
  const [i, setI] = useState(0);
  const n = slides.length;

  useEffect(() => {
    if (n <= 1) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  const cur = slides[n ? i % n : 0];
  const destaques = DESTAQUES.filter((d) => !d.until || Date.now() < d.until);

  return (
    <div className="rr">
      <RRHeader sections={SECTIONS} />
      <main>
        {cur && (
          <section id="ingressos" className="s-black" style={{ padding: "28px 0 40px" }} aria-label="Ingressos à venda">
            <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <a href={cur.carouselLink || cur.link} style={{ display: "block" }}>
                <img src={cur.bannerImage} alt={`Banner do show ${cur.name}`} style={{ width: "100%", aspectRatio: "1600 / 838", objectFit: "cover", display: "block" }} />
              </a>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h2 className="disp" style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}>{cur.name}</h2>
                  <span className="muted">
                    {cur.subtitle ? `${cur.subtitle} · ` : ""}{weekday(cur.date)}, {parseDate(cur.date).day} de {MONTHS[parseDate(cur.date).month]}, {cur.time}, {cur.venue}
                  </span>
                </div>
                {cur.link && <a className="btn btn-red" href={cur.link}>{cur.linkLabel ? cur.linkLabel.charAt(0) + cur.linkLabel.slice(1).toLowerCase() : "Comprar ingresso"}</a>}
              </div>
              {n > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <button type="button" className="btn btn-line" style={{ minHeight: 44, width: 44, padding: 0 }} aria-label="Show anterior" onClick={() => setI((x) => (x - 1 + n) % n)}><ChevronLeft size={20} /></button>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {slides.map((s, k) => (
                      <button key={s.id} type="button" className={k === i % n ? "dot dot-on" : "dot"} aria-label={`Mostrar ${s.name}`} aria-current={k === i % n} onClick={() => setI(k)} />
                    ))}
                  </div>
                  <button type="button" className="btn btn-line" style={{ minHeight: 44, width: 44, padding: 0 }} aria-label="Próximo show" onClick={() => setI((x) => (x + 1) % n)}><ChevronRight size={20} /></button>
                  <a href="/hardrock#agenda" style={{ marginLeft: "auto", fontWeight: 700, fontSize: 15 }}>Ver toda a agenda</a>
                </div>
              )}
            </div>
          </section>
        )}

        <section id="destaques" className="s-tight s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="disp" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>Destaques</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {destaques.map((d) => (
                <a key={d.href} href={d.href} style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "#fff", background: "#161616", borderTop: `4px solid ${d.color}` }}>
                  <img src={d.img} alt={d.alt} style={{ width: "100%", aspectRatio: "1584 / 672", objectFit: "cover", display: "block" }} />
                  <span style={{ display: "flex", flexDirection: "column", gap: 8, padding: 20, flexGrow: 1 }}>
                    <span className="disp" style={{ fontSize: 36, color: d.color }}>{d.title}</span>
                    <span className="muted" style={{ fontSize: 15 }}>{d.text}</span>
                    <span style={{ fontWeight: 800, fontSize: 15, marginTop: "auto", paddingTop: 8, color: d.color }}>{d.cta}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="s s-red">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <h1 className="disp" style={{ fontSize: "clamp(56px, 7.4vw, 112px)" }}>Rock, samba, sertanejo e orquestra. A gente monta o palco onde o público está.</h1>
              <p className="lede">Somos uma produtora cultural do interior de São Paulo. Fazemos shows, festivais gratuitos e projetos aprovados nas leis de incentivo, da ideia ao palco e do palco à prestação de contas.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a className="btn btn-ink" href="#projetos">Ver os projetos</a>
                <a className="btn btn-line" href="#contato">Falar com a gente</a>
              </div>
            </div>
            <img src="/site/S01.jpg" alt="Multidão em praça pública diante de um palco iluminado ao anoitecer" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block", boxShadow: "14px 14px 0 #000" }} />
          </div>
        </section>

        <section className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>O que a gente faz</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 36 }}>
              {[
                ["Shows", "Produção completa: artistas, palco, divulgação, bilheteria e acerto final. Mais de 200 shows no Hard Rock Cafe."],
                ["Festivais", "Festivais gratuitos de rock, samba e sertanejo em praça pública, com oficinas e acessibilidade."],
                ["Projetos incentivados", "Nove projetos aprovados na Lei Rouanet e no ProAC, prontos para receber patrocínio."],
                ["Gestão de projetos culturais", "Para prefeituras e instituições: elaboração, captação, execução e prestação de contas."],
              ].map(([t, d]) => (
                <div key={t} style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 18, borderTop: "3px solid #fff" }}>
                  <h3 style={{ fontSize: 22 }}>{t}</h3>
                  <p className="muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="s s-yellow">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 20, fontWeight: 800 }}>Rock Ribeirão apresenta</p>
                <h2 className="disp" style={{ fontSize: "clamp(48px, 6vw, 88px)" }}>Projetos para patrocinar</h2>
              </div>
              <p style={{ maxWidth: "34ch", fontWeight: 600 }}>Todos aprovados e prontos para captação. Cada um tem página própria e apresentação para baixar.</p>
            </div>
            {(Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((g) => (
              <div key={g} style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ marginBottom: 6, fontSize: 18, fontWeight: 800 }}>{GROUPS[g].title}</h3>
                {projetos.filter((p) => p.group === g).map((p) => (
                  <a key={p.slug} className="bill-row" href={projetoHref(p.slug)}>
                    <span className="disp bill-name" style={{ fontSize: SIZES[g] }}>{p.billName}</span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 6 }}>
                      <span className="badges">
                        {p.laws.filter((l) => l.kind === "rouanet" || l.kind === "proac").map((l) => (
                          <span key={l.label} className={`badge ${l.kind === "rouanet" ? "b-rouanet" : "b-proac"}`}>{l.kind === "rouanet" ? "Lei Rouanet" : "ProAC ICMS"}</span>
                        ))}
                      </span>
                      <span style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}>{p.card}</span>
                    </span>
                  </a>
                ))}
              </div>
            ))}
            <p className="disp" style={{ fontSize: "clamp(28px, 3vw, 40px)", borderTop: "6px solid #000", paddingTop: 18 }}>Local: onde a sua marca estiver.</p>
          </div>
        </section>

        <section id="patrocine" className="s s-purple">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Seu imposto pode virar um festival com a sua marca</h2>
              <p className="lede" style={{ color: "#ece6fb" }}>Parte do imposto que sua empresa já paga pode ir para um projeto cultural. Você escolhe o projeto e a gente ajusta cidade, data e formato ao seu público.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <div style={{ background: "#000", padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span className="badge b-rouanet" style={{ alignSelf: "flex-start" }}>Lei Rouanet</span>
                  <p style={{ color: "#d6d6d6", fontSize: 16 }}>Imposto de Renda. Para empresas no lucro real, até 4% do IR devido. Pessoas físicas também podem apoiar.</p>
                </div>
                <div style={{ background: "#000", padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span className="badge b-proac" style={{ alignSelf: "flex-start" }}>ProAC ICMS</span>
                  <p style={{ color: "#d6d6d6", fontSize: 16 }}>ICMS paulista. Para empresas contribuintes de ICMS no estado de São Paulo.</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h3 style={{ fontSize: 22 }}>Como funciona</h3>
              <ol style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" }}>
                {["Conversamos sobre a sua marca e o seu público.", "Você escolhe o projeto, a cidade e a data.", "O aporte é feito pela lei de incentivo.", "O evento acontece e você recebe o relatório com fotos, público e alcance."].map((t, k, a) => (
                  <li key={k} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 16, padding: "18px 0", borderTop: "2px solid #fff", borderBottom: k === a.length - 1 ? "2px solid #fff" : undefined }}>
                    <span className="disp" style={{ fontSize: 44 }}>{k + 1}</span><span>{t}</span>
                  </li>
                ))}
              </ol>
              <a className="btn btn-paper" href="#contato" style={{ alignSelf: "flex-start" }}>Quero patrocinar</a>
            </div>
          </div>
        </section>

        <section className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
            <img src="/U2%20Cover%20Ribeir%C3%A3o.jpg" alt="Show do U2 Cover Ribeirão no Hard Rock Cafe" style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", display: "block", boxShadow: "14px 14px 0 #cc2200" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Rock Ribeirão no Hard Rock Cafe</h2>
              <p className="body muted">Mais de 200 shows e mais de 60 mil pessoas. Veja a agenda, compre ingressos e confira tudo que já passou por esse palco.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a className="btn btn-red" href="/hardrock">Agenda e história</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="s s-black rule-top">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Vamos fazer acontecer?</h2>
              <p className="body muted">Patrocínio, contratação de shows ou elaboração de projetos culturais.</p>
              <p style={{ fontSize: 19, lineHeight: 1.8, fontWeight: 700 }}><a href="mailto:sac@rockribeirao.com.br">sac@rockribeirao.com.br</a><br /><a href="https://wa.me/551631850610">WhatsApp (16) 3185-0610</a></p>
            </div>
            <ContactForm subject="Contato pelo site Rock Ribeirão" />
          </div>
        </section>
      </main>
      <RRFooter />
    </div>
  );
}
