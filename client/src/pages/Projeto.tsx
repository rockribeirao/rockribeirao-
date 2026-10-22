import { useEffect } from "react";
import { useRoute } from "wouter";
import { RRHeader, RRFooter, ContactForm, DownloadIcon } from "@/components/RRLayout";
import { projetos, projetoHref, projetoAsset, pdfName, GROUPS, CONTRAPARTIDAS } from "@/data/projetos";
import NotFound from "@/pages/NotFound";

const HERO = { festivais: "s-red", shows: "s-yellow", formacao: "s-purple" } as const;
const ACCENT = { festivais: "#cc2200", shows: "#ffd23f", formacao: "#b9a4f0" } as const;
// Enquadramento da foto de abertura quando o centro da imagem não é o ponto principal.
const CAPA_POS: Record<string, string> = { "raizes-da-cerveja": "72% center" };
const BADGE = { rouanet: "b-rouanet", proac: "b-proac", free: "b-free", info: "b-free" } as const;

export default function Projeto() {
  const [, params] = useRoute("/projetos/:slug");
  const p = projetos.find((x) => x.slug === params?.slug);

  useEffect(() => {
    if (!p) return;
    const prev = document.title;
    document.title = `${p.name} | Rock Ribeirão`;
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, [p]);

  if (!p) return <NotFound />;

  const pdf = projetoAsset(p.slug, pdfName(p.slug));
  const others = projetos.filter((x) => x.slug !== p.slug);
  const freeBadge = p.group === "festivais" ? "b-free" : "b-ink";

  return (
    <div className="rr">
      <RRHeader current="proj" project={p.slug} />
      <main>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className={HERO[p.group]} style={{ padding: "56px clamp(24px, 5vw, 72px) 64px", display: "flex", flexDirection: "column", gap: 24, justifyContent: "flex-end" }}>
            <a href="/#projetos" style={{ fontWeight: 700, fontSize: 15 }}>Todos os projetos</a>
            <p style={{ fontSize: 19, fontWeight: 800 }}>{GROUPS[p.group].label}</p>
            <h1 className="disp" style={{ fontSize: "clamp(64px, 8.4vw, 132px)" }}>{p.name}</h1>
            <p className="lede">{p.tagline}</p>
            <div className="badges">
              {p.laws.map((l) => <span key={l.label} className={`badge ${l.kind === "free" ? freeBadge : BADGE[l.kind]}`}>{l.label}</span>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn-ink" href={pdf} download={pdfName(p.slug)}><DownloadIcon />Baixar apresentação</a>
              <a className="btn btn-line" href="#patrocinar">Quero patrocinar</a>
            </div>
          </div>
          <img src={projetoAsset(p.slug, "capa.jpg")} alt={p.alts.capa} style={{ width: "100%", height: "100%", minHeight: 420, objectFit: "cover", objectPosition: CAPA_POS[p.slug] ?? "center", display: "block" }} />
        </section>

        <section id="projeto" className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>{p.aboutTitle}</h2>
              <p className="body">{p.about}</p>
              <p className="body muted">A cidade, o espaço e a data são definidos junto com o patrocinador, para o projeto chegar onde estão o público e os clientes da sua marca.</p>
            </div>
            <dl style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0 32px", alignSelf: "start" }}>
              {p.facts.map((f) => (
                <div key={f.k} style={{ padding: "20px 0", borderTop: "3px solid #fff", display: "flex", flexDirection: "column", gap: 4 }}>
                  <dt className="disp" style={{ fontSize: "clamp(36px, 4vw, 60px)" }}>{f.v}</dt>
                  <dd className="muted" style={{ fontSize: 16 }}>{f.k}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="programacao" className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Programação</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
              {p.items.map((it) => (
                <div key={it.t} style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 18, borderTop: `3px solid ${ACCENT[p.group]}` }}>
                  <h3 style={{ fontSize: 22 }}>{it.t}</h3>
                  <p className="muted">{it.d}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <img src={projetoAsset(p.slug, "a.jpg")} alt={p.alts.a} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }} />
              <img src={projetoAsset(p.slug, "b.jpg")} alt={p.alts.b} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </section>

        <section id="apresentacao" className="s s-yellow">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            <img src={projetoAsset(p.slug, "apresentacao-capa.jpg")} alt={`Capa da apresentação do ${p.name}`} loading="lazy" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", boxShadow: "12px 12px 0 #000" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Leve o projeto para a sua diretoria</h2>
              <p className="body" style={{ fontWeight: 500 }}>A apresentação traz o formato, a programação, o valor aprovado, as contrapartidas e como patrocinar.</p>
              <a className="btn btn-ink" href={pdf} download={pdfName(p.slug)} style={{ alignSelf: "flex-start" }}><DownloadIcon />Baixar apresentação (PDF)</a>
            </div>
          </div>
        </section>

        <section className="s s-purple">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Sua marca no projeto</h2>
              <p className="body" style={{ color: "#ece6fb" }}>{p.lawText}</p>
              <p className="body" style={{ color: "#ece6fb", fontWeight: 700 }}>Exemplos de contrapartidas. O pacote é negociado caso a caso, conforme a cota de patrocínio.</p>
            </div>
            <ul className="ruled">{CONTRAPARTIDAS.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </section>

        <section className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="disp" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>Outros projetos</h2>
            <div>
              {others.map((o) => (
                <a key={o.slug} href={projetoHref(o.slug)} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 24px", padding: "16px 0", borderTop: "1px solid #3a3a3a", textDecoration: "none" }}>
                  <span className="disp" style={{ fontSize: "clamp(30px, 3.2vw, 46px)" }}>{o.billName}</span>
                  <span className="muted" style={{ fontSize: 15 }}>{GROUPS[o.group].title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="patrocinar" className="s s-black rule-top">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Leve o {p.shortName} para a sua marca</h2>
              <p style={{ fontSize: 19, lineHeight: 1.8, fontWeight: 700 }}><a href="mailto:sac@rockribeirao.com.br">sac@rockribeirao.com.br</a><br /><a href="https://wa.me/551631850610">WhatsApp (16) 3185-0610</a></p>
            </div>
            <ContactForm subject={`Patrocínio: ${p.name}`} cityField cta="Quero patrocinar" />
          </div>
        </section>
      </main>
      <RRFooter />
    </div>
  );
}
