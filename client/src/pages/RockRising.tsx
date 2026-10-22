import { useEffect, useState, type FormEvent } from "react";
import { RRHeader, RRFooter, DownloadIcon } from "@/components/RRLayout";

// Página especial: Rock Rising 2027 — festival de novos talentos do rock.
// Realização Rock Ribeirão Produções, parceria Kiss FM 105.3, apoio Fonzare Produções, School of Rock e Dritto.
// Imagens e PDFs em client/public/rockrising/.

const IMG = "/rockrising";
const ACC = "#ff5533";
const REGULAMENTO = `${IMG}/Regulamento_Rock_Rising_2027.pdf`;
const PROPOSTA = `${IMG}/Proposta_Rock_Rising_Patrocinio.pdf`;
const WHATSAPP_DIGITS = "551631850610";
const WHATSAPP_LABEL = "(16) 3185-0610";
const EMAIL = "sac@rockribeirao.com.br";
const INSCRICOES_ABREM = new Date("2027-01-15T00:00:00-03:00").getTime();

const passos = [
  { n: "01", titulo: "Inscreva", texto: "De 15/01 a 14/02, sua banda envia uma música autoral pelo site. É gratuito." },
  { n: "02", titulo: "Conquiste", texto: "O público ouve e vota aqui no site. As músicas ganham espaço na programação da Kiss FM Ribeirão Preto." },
  { n: "03", titulo: "Suba no palco", texto: "As 5 mais votadas tocam na grande final, onde um júri técnico escolhe a vencedora." },
];

const etapas = [
  { data: "15/01", titulo: "Inscrições abertas", texto: "Até 14/02, aqui no site." },
  { data: "15/02", titulo: "Votação popular", texto: "Somente no site, até 14/03." },
  { data: "15/03", titulo: "Os 5 finalistas", texto: "Anúncio na Kiss FM Ribeirão Preto e nas redes." },
  { data: "21/03", titulo: "Grande final", texto: "Ao vivo, júri técnico e entrada gratuita." },
];

const faixaBase = ["Inscrições 15/01", "Grave sua música", "Toque na Kiss FM Ribeirão Preto", "Grande final 21/03", "Entrada gratuita", "Bandas de todo o estado"];

type Logo = { src: string; alt: string; href: string; cls: string };
const grupos: { titulo: string; logos: Logo[] }[] = [
  { titulo: "Realização", logos: [{ src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/", cls: "lg-rr" }] },
  { titulo: "Parceria", logos: [{ src: `${IMG}/logo-kiss-1053.png`, alt: "Kiss FM 105.3 Ribeirão Preto", href: "https://www.instagram.com/kissfmribeirao/", cls: "lg-kiss" }] },
  { titulo: "Apoio", logos: [
    { src: `${IMG}/logo-fonzare.png`, alt: "Fonzare Produções", href: "https://www.instagram.com/fabiofonzare/", cls: "lg-fz" },
    { src: `${IMG}/logo-school.png`, alt: "School of Rock Ribeirão Preto", href: "https://www.instagram.com/schoolofrock_ribeiraopreto/", cls: "lg-sor" },
    { src: `${IMG}/logo-dritto.png`, alt: "Dritto Mídia Digital OOH", href: "https://www.instagram.com/drittomidiaooh/", cls: "lg-dritto" },
  ] },
];

function useCountdown(target: number) {
  const calc = () => Math.max(0, target - Date.now()) / 1000;
  const [s, setS] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setS(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return [
    { v: String(Math.floor(s / 86400)), r: "dias" },
    { v: p(Math.floor((s % 86400) / 3600)), r: "horas" },
    { v: p(Math.floor((s % 3600) / 60)), r: "min" },
    { v: p(Math.floor(s % 60)), r: "seg" },
  ];
}

export default function RockRising() {
  const contagem = useCountdown(INSCRICOES_ABREM);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Rock Rising 2027 — Festival de novos talentos do rock | Rock Ribeirão";
    window.scrollTo(0, 0);
    return () => { document.title = prevTitle; };
  }, []);

  // Contato de patrocínio: abre o WhatsApp da Rock Ribeirão com os dados preenchidos.
  const enviarPatrocinio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "Olá! Tenho interesse em patrocinar o Rock Rising 2027.",
      `Empresa: ${f.get("empresa") || ""}`,
      `Nome: ${f.get("nome") || ""}`,
      `E-mail: ${f.get("email") || ""}`,
      `Telefone: ${f.get("telefone") || ""}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setEnviado(true);
  };

  const faixa = [...faixaBase, ...faixaBase];
  const H2 = { fontSize: "clamp(48px, 5.6vw, 84px)" };

  return (
    <div className="rr" style={{ ["--acc" as string]: ACC } as React.CSSProperties}>
      <style>{CSS}</style>
      <RRHeader current="rise" />
      <main>
        {/* ABERTURA */}
        <section id="topo" className="ev-hero">
          <div className="ev-hero-txt s-red">
            <p className="kick" style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="rise-live" aria-hidden="true" />Festival de novos talentos do rock · Estado de SP</p>
            <h1 className="disp ev-h1">Rock<br />Rising</h1>
            <p className="lede">Sua banda no ar na <b>Kiss FM 105.3 Ribeirão Preto</b>. Inscreva-se, conquiste o voto do público e suba no palco da grande final em Ribeirão Preto.</p>
            <div className="ev-count" role="timer" aria-label="Contagem regressiva para a abertura das inscrições">
              <span>As inscrições abrem em</span>
              {contagem.map((t) => <div key={t.r}><b>{t.v}</b><small>{t.r}</small></div>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button type="button" className="btn btn-ink" disabled aria-disabled="true">Inscrição · Em breve</button>
              <a href="#patrocinio" className="btn btn-line">Seja patrocinador</a>
            </div>
          </div>
          <div className="ev-hero-media">
            <img className="ev-hero-img" src={`${IMG}/palco.jpg`} alt="Banda tocando no palco sob luzes, com a plateia à frente" fetchPriority="high" />
            <a className="ev-hero-logo" href="https://www.instagram.com/kissfmribeirao/" target="_blank" rel="noopener noreferrer" aria-label="Kiss FM 105.3 no Instagram">
              <img src={`${IMG}/logo-kiss-1053.png`} alt="Kiss FM 105.3" width={586} height={600} />
            </a>
          </div>
        </section>

        {/* FAIXA */}
        <div className="rise-marquee" aria-label={faixaBase.join(" · ")}>
          <div className="rise-track" aria-hidden="true">
            {faixa.map((t, i) => <span key={i} className="disp">{t}<span style={{ color: "#000", margin: "0 22px" }}>/</span></span>)}
          </div>
        </div>

        {/* PRÊMIO */}
        <section id="premio" className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p className="kick acc">O prêmio</p>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Sua música produzida por profissionais e tocando na Kiss FM Ribeirão Preto.</h2>
              <p className="lede muted">A banda vencedora ganha a produção de uma música inédita com Fábio Fonzare, da Fonzare Produções, e a Rock Ribeirão. Depois, a música toca de 1 a 2 vezes por dia na programação local da Kiss FM 105.3 Ribeirão Preto, durante 3 meses.</p>
              <dl style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
                {[["1", "Música produzida"], ["3", "Meses na Kiss FM Ribeirão Preto"], ["2x", "Por dia no ar"]].map(([v, r]) => (
                  <div key={r} style={{ paddingTop: 14, borderTop: `3px solid ${ACC}` }}>
                    <dt className="disp acc" style={{ fontSize: 64 }}>{v}</dt>
                    <dd className="muted" style={{ fontSize: 15 }}>{r}</dd>
                  </div>
                ))}
              </dl>
              <div style={{ display: "flex", gap: 18, alignItems: "center", background: "#141414", padding: 16 }}>
                <img src={`${IMG}/fabio-fonzare.jpg`} alt="Fábio Fonzare em seu estúdio" style={{ width: 110, height: 110, objectFit: "cover", flexShrink: 0 }} loading="lazy" />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className="kick acc" style={{ fontSize: 13 }}>Produção musical</span>
                  <span className="disp" style={{ fontSize: 36 }}>Fábio Fonzare</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }} className="muted"><img src={`${IMG}/logo-fonzare.png`} alt="Fonzare Produções" style={{ height: 30, width: "auto" }} />Fonzare Produções, com a Rock Ribeirão</span>
                </div>
              </div>
            </div>
            <img src={`${IMG}/estudio.jpg`} alt="Cantora gravando em estúdio, vista da técnica" loading="lazy" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block", boxShadow: `14px 14px 0 ${ACC}` }} />
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como" className="s s-red">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="kick">Como funciona</p>
              <h2 className="disp" style={H2}>Do ensaio ao palco.</h2>
            </div>
            <ol className="ev-steps">
              {passos.map((p) => <li key={p.n}><b>{p.titulo}</b>{p.texto}</li>)}
            </ol>
          </div>
        </section>

        {/* INSCRIÇÃO */}
        <section id="inscricao" className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p className="kick acc">Inscrições · 15/01 a 14/02/2027</p>
              <h2 className="disp" style={H2}>Chegou a vez da sua banda.</h2>
              <p className="lede muted">Gratuito e aberto a bandas de todo o estado de São Paulo. Basta uma música autoral.</p>
              <img src={`${IMG}/ensaio.jpg`} alt="Banda jovem ensaiando em estúdio" loading="lazy" style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, background: "#141414", padding: "32px clamp(20px, 3vw, 36px)", alignSelf: "start" }}>
              <h3 className="disp" style={{ fontSize: 48 }}>As inscrições abrem em <span className="acc">15/01</span></h3>
              <p className="muted">Deixe seu contato e avisamos sua banda no minuto em que as inscrições abrirem.</p>
              <form aria-label="Avise-me quando abrir" className="form" onSubmit={(e) => e.preventDefault()}>
                <label className="field">Nome da banda<input type="text" placeholder="Ex.: Os Desafinados" /></label>
                <label className="field">Cidade (SP)<input type="text" placeholder="Ex.: Ribeirão Preto" /></label>
                <label className="field">E-mail<input type="email" placeholder="banda@email.com" /></label>
                <label className="field">WhatsApp<input type="tel" placeholder="(16) 90000-0000" /></label>
                <button type="button" className="btn btn-red" disabled aria-disabled="true">Em breve</button>
              </form>
              <ul className="ev-perks">
                <li>Tenha pronto o link de uma música autoral (YouTube, Spotify ou SoundCloud).</li>
                <li>Leia o <a href={REGULAMENTO} download className="acc">regulamento (PDF)</a> antes de 15/01.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CRONOGRAMA */}
        <section id="cronograma" className="s s-yellow">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
              <h2 className="disp" style={H2}>Anote as datas.</h2>
              <a href={REGULAMENTO} download className="btn btn-ink"><DownloadIcon />Baixar regulamento (PDF)</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
              {etapas.map((e) => (
                <div key={e.data} style={{ paddingTop: 16, borderTop: "3px solid #000", display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className="disp" style={{ fontSize: 64 }}>{e.data}</span>
                  <b style={{ fontSize: 20 }}>{e.titulo}</b>
                  <p style={{ fontWeight: 500 }}>{e.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRANDE FINAL */}
        <section id="final" className="s s-black" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.78), rgba(0,0,0,.9)), url(${IMG}/plateia.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p className="kick acc">A grande final · Entrada gratuita</p>
            <p className="disp" style={{ fontSize: "clamp(110px, 16vw, 230px)" }}>21<span className="acc">.</span>03</p>
            <p className="lede">Domingo, 2027 · Ribeirão Preto · Local a ser anunciado</p>
            <p className="lede muted">5 finalistas ao vivo · Júri técnico escolhe a vencedora</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 12 }}>
              <article style={{ display: "flex", flexDirection: "column", background: "#141414" }}>
                <img src={`${IMG}/ze-do-rock.jpg`} alt="Zé do Rock com o microfone no palco" loading="lazy" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", objectPosition: "center 15%", display: "block" }} />
                <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="kick acc" style={{ fontSize: 13 }}>Apresentação</span>
                  <span className="disp" style={{ fontSize: 44 }}>Zé do Rock</span>
                  <p className="muted">Comanda a grande final e chama as 5 bandas ao palco.</p>
                </div>
              </article>
              <article style={{ display: "flex", flexDirection: "column", background: "#141414" }}>
                <img src={`${IMG}/epicco.jpg`} alt="Vocalista do Épicco no palco" loading="lazy" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", objectPosition: "center 12%", display: "block" }} />
                <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="kick acc" style={{ fontSize: 13 }}>Show de encerramento*</span>
                  <span className="disp" style={{ fontSize: 44 }}>Épicco</span>
                  <p className="muted">Big band de 9 integrantes de Ribeirão Preto que mistura soul, R&amp;B, blues e rock com brasilidade. Já abriu o show da banda Kiss em Ribeirão Preto. 75 minutos de show depois das finalistas.</p>
                  <p className="muted" style={{ fontSize: 13 }}>*A banda de encerramento pode mudar.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* REALIZAÇÃO / PARCERIA / APOIO */}
        <section className="s-tight s-black rule-top">
          <div className="wrap ev-logos">
            {grupos.map((g) => (
              <div key={g.titulo}>
                <h3>{g.titulo}</h3>
                <div className="row">
                  {g.logos.map((l) => (
                    <a key={l.alt} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.alt} no Instagram`}>
                      <img src={l.src} alt={l.alt} loading="lazy" style={{ height: l.cls === "lg-rr" || l.cls === "lg-kiss" ? 96 : 72 }} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PATROCÍNIO */}
        <section id="patrocinio" className="s s-purple">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p className="kick" style={{ color: "#b9a4f0" }}>Para marcas · Patrocínios até 15/12/2026</p>
              <h2 className="disp" style={H2}>Sua marca no volume máximo.</h2>
              <p className="lede" style={{ color: "#ece6fb" }}>Rádio e Instagram da Kiss FM Ribeirão Preto e presença na grande final, de janeiro a março de 2027. Baixe a apresentação com todas as informações para patrocinadores.</p>
              <a href={PROPOSTA} download className="btn btn-ink" style={{ alignSelf: "flex-start" }}><DownloadIcon />Baixar apresentação para patrocinadores (PDF)</a>
              <div id="contato-patrocinio" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                <span className="disp" style={{ fontSize: 48 }}>Vamos conversar.</span>
                <p style={{ color: "#ece6fb" }}>Deixe seus dados e a equipe da Rock Ribeirão entra em contato para montar a melhor participação da sua marca.</p>
                <p style={{ fontWeight: 800, marginTop: 6 }}>Rock Ribeirão Produções</p>
                <a href={`https://wa.me/${WHATSAPP_DIGITS}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>WhatsApp {WHATSAPP_LABEL}</a>
                <a href={`mailto:${EMAIL}`} style={{ fontWeight: 700 }}>{EMAIL}</a>
              </div>
            </div>
            <div style={{ background: "#000", padding: "32px clamp(20px, 3vw, 36px)", alignSelf: "start" }}>
              {!enviado ? (
                <form aria-label="Contato para patrocínio" className="form" onSubmit={enviarPatrocinio}>
                  <label className="field">Empresa<input name="empresa" type="text" required /></label>
                  <label className="field">Seu nome<input name="nome" type="text" required /></label>
                  <label className="field">E-mail<input name="email" type="email" /></label>
                  <label className="field">Telefone<input name="telefone" type="tel" required /></label>
                  <button type="submit" className="btn btn-red">Quero patrocinar</button>
                </form>
              ) : (
                <div role="status" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <span className="disp acc" style={{ fontSize: 56 }}>Recebido!</span>
                  <p className="muted">Abrimos o WhatsApp da Rock Ribeirão com os seus dados. É só enviar a mensagem que a equipe responde em até 1 dia útil.</p>
                  <button type="button" className="btn btn-line" style={{ alignSelf: "flex-start" }} onClick={() => setEnviado(false)}>Enviar outro contato</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <RRFooter extra={
        <p className="muted" style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          <span>Rock Rising · Rock Ribeirão Produções · Ribeirão Preto</span>
          <a href={REGULAMENTO} download>Regulamento (PDF)</a>
          <a href="https://www.instagram.com/rockribeirao/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      } />
    </div>
  );
}

const CSS = `
.rr .rise-live{width:10px;height:10px;border-radius:50%;background:#fff;animation:rise-pulse 1.6s infinite}
@keyframes rise-pulse{0%,100%{opacity:1}50%{opacity:.25}}
.rr .rise-marquee{background:var(--yellow);color:#000;overflow:hidden;padding:14px 0;border-top:3px solid #000;border-bottom:3px solid #000}
.rr .rise-track{display:flex;width:max-content;animation:rise-mq 40s linear infinite;font-size:34px;white-space:nowrap}
@keyframes rise-mq{to{transform:translateX(-50%)}}
`;
