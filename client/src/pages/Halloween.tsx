import { useEffect, useState } from "react";
import { RRHeader, RRFooter } from "@/components/RRLayout";

// Página especial: Halloween do Hard Rock Cafe Ribeirão Preto (30 e 31/10/2026).
// Mesmo visual das outras páginas do site, na cor do evento (laranja). Imagens em client/public/halloween/.

const IMG = "/halloween";
const ACC = "#ff8c1a";

const SYMPLA_LITHIUM = "https://www.sympla.com.br/evento/lithium-com-dri-santana-no-hard-rock-cafe-ribeirao-preto/3576546";
const SYMPLA_CAARU = "https://www.sympla.com.br/evento/caaru-rock-xamanico-no-hard-rock-cafe-ribeirao-preto/3576589";
const TEL_RESERVA = "(16) 3170-1722";
const TEL_RESERVA_DIGITS = "1631701722";
const SHOW_START = new Date("2026-10-30T21:00:00-03:00").getTime();

const galeria: { n: string; portrait?: boolean }[] = [
  { n: "01" }, { n: "02" }, { n: "03" }, { n: "04", portrait: true },
  { n: "05" }, { n: "06", portrait: true }, { n: "07" }, { n: "08", portrait: true },
  { n: "09" }, { n: "10", portrait: true }, { n: "11" }, { n: "12", portrait: true },
];

type Logo = { src: string; alt: string; href: string };
const grupos: { titulo: string; logos: Logo[] }[] = [
  { titulo: "Local", logos: [{ src: `${IMG}/logo-hardrock.png`, alt: "Hard Rock Cafe Ribeirão Preto", href: "https://www.instagram.com/hrc.ribeiraopreto/" }] },
  { titulo: "Realização", logos: [{ src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/" }] },
  { titulo: "Promoção exclusiva", logos: [{ src: `${IMG}/logo-kiss.png`, alt: "Kiss FM 105,3", href: "https://www.instagram.com/kissfmribeirao/" }] },
  { titulo: "Hotel oficial", logos: [{ src: `${IMG}/logo-transamerica.png`, alt: "Transamerica Ribeirão Preto", href: "https://www.instagram.com/transamericaribeiraopreto/" }] },
  { titulo: "Apoio", logos: [
    { src: `${IMG}/logo-school.png`, alt: "School of Rock Ribeirão Preto", href: "https://www.instagram.com/schoolofrock_ribeiraopreto/" },
    { src: `${IMG}/logo-dritto.png`, alt: "Dritto Mídia Out of Home", href: "https://www.instagram.com/drittomidiaooh/" },
  ] },
  { titulo: "Nas noites", logos: [{ src: `${IMG}/logo-yupi.png`, alt: "Yupi Foto Cabine", href: "https://www.instagram.com/yupifotocabine/" }] },
];

function useCountdown(target: number) {
  const calc = () => Math.max(0, target - Date.now()) / 1000;
  const [s, setS] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setS(calc()), 30000);
    return () => clearInterval(id);
  }, []);
  return {
    d: Math.floor(s / 86400),
    h: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
  };
}

export default function Halloween() {
  const cd = useCountdown(SHOW_START);
  const [foto, setFoto] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Halloween no Hard Rock Cafe Ribeirão Preto | Rock Ribeirão";
    window.scrollTo(0, 0);
    return () => { document.title = prevTitle; };
  }, []);

  useEffect(() => {
    if (!foto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFoto(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [foto]);

  const copiar = () => {
    navigator.clipboard?.writeText(TEL_RESERVA_DIGITS).then(
      () => { setCopiado(true); setTimeout(() => setCopiado(false), 2500); },
      () => {}
    );
  };

  return (
    <div className="rr" style={{ ["--acc" as string]: ACC } as React.CSSProperties}>
      <RRHeader current="hw" />
      <main>
        {/* ABERTURA */}
        <section className="ev-hero">
          <div className="ev-hero-txt s-acc">
            <h1 style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="disp ev-h1">Halloween</span>
              <span className="kick" style={{ fontSize: 20 }}>no Hard Rock Cafe Ribeirão Preto</span>
            </h1>
            <div className="ev-tickets" id="ingressos">
              <a className="ev-ticket" href={SYMPLA_LITHIUM} target="_blank" rel="noopener noreferrer">
                <span className="d">30/10</span>
                <span className="n"><b>Lithium com Dri Santana</b><span>Sexta · 21h · 30 primeiros fantasiados até 19h30 ganham ingresso para sábado</span></span>
                <span className="go">Comprar ingresso · Sexta</span>
              </a>
              <a className="ev-ticket" href={SYMPLA_CAARU} target="_blank" rel="noopener noreferrer">
                <span className="d">31/10</span>
                <span className="n"><b>Caaru · Rock xamânico</b><span>Sábado · 21h · Concurso de fantasias com R$ 600 em prêmios</span></span>
                <span className="go">Comprar ingresso · Sábado</span>
              </a>
            </div>
            <div className="ev-count" aria-live="polite">
              <span>Faltam</span>
              <div><b>{cd.d}</b><small>dias</small></div>
              <div><b>{cd.h}</b><small>horas</small></div>
              <div><b>{cd.m}</b><small>min</small></div>
            </div>
            <p style={{ fontWeight: 700 }}>Classificação livre · Até 6 anos não paga</p>
          </div>
          <div className="ev-hero-media">
            <picture>
              <source media="(max-width:700px)" type="image/webp" srcSet={`${IMG}/halloween-hero-mobile.webp`} />
              <source media="(max-width:700px)" srcSet={`${IMG}/halloween-hero-mobile.jpg`} />
              <source type="image/webp" srcSet={`${IMG}/halloween-hero-desktop.webp`} />
              <img className="ev-hero-img" src={`${IMG}/halloween-hero-desktop.jpg`} alt="Palco do Hard Rock decorado para o Halloween, com abóboras, teias e morcegos" fetchPriority="high" />
            </picture>
            <a className="ev-hero-logo ev-logo-smoke" href="https://www.instagram.com/hrc.ribeiraopreto/" target="_blank" rel="noopener noreferrer">
              <img src={`${IMG}/logo-hardrock.png`} alt="Hard Rock Cafe Ribeirão Preto" width={408} height={320} />
            </a>
          </div>
        </section>

        {/* OS SHOWS */}
        <section id="noites" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Os shows</h2>
              <p className="lede muted">Shows a partir das 21h. Cada noite tem o seu ingresso no Sympla.</p>
            </div>
            <article className="ev-night">
              <img src="/Lithium-banner%2020261030.jpg" alt="Arte do show da banda Lithium com Dri Santana, Especial Halloween" loading="lazy" />
              <div className="bd">
                <div className="ev-date"><span className="d">30/10</span><span className="w">Sexta</span><span className="muted">a partir das 21h</span></div>
                <h3 className="disp" style={{ fontSize: 48 }}>Lithium <span className="kick" style={{ fontStretch: "100%", textTransform: "none", fontSize: 18 }}>com Dri Santana</span></h3>
                <ul className="ev-perks">
                  <li><b>Totem</b>Totem fotográfico da Yupi para levar a foto da noite.</li>
                  <li><b>Fantasia</b>Os 30 primeiros que chegarem fantasiados até as 19h30 ganham um ingresso para o show do Caaru no sábado, 31/10.</li>
                </ul>
                <a className="btn btn-acc" href={SYMPLA_LITHIUM} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}>Comprar ingresso · 30/10</a>
              </div>
            </article>
            <article className="ev-night">
              <img src="/Caaru-banner%2020261031.jpg" alt="Arte do show do Caaru, rock xamânico, Especial Halloween" loading="lazy" />
              <div className="bd">
                <div className="ev-date"><span className="d">31/10</span><span className="w">Sábado</span><span className="muted">a partir das 21h</span></div>
                <h3 className="disp" style={{ fontSize: 48 }}>Caaru <span className="kick" style={{ fontStretch: "100%", textTransform: "none", fontSize: 18 }}>Rock xamânico</span></h3>
                <ul className="ev-perks">
                  <li><b>Totem</b>Totem fotográfico da Yupi para levar a foto da noite.</li>
                  <li><b>Concurso</b>Concurso de fantasias com R$ 600 em gift cards do Hard Rock para os três primeiros colocados.</li>
                </ul>
                <a className="btn btn-acc" href={SYMPLA_CAARU} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}>Comprar ingresso · 31/10</a>
              </div>
            </article>
          </div>
        </section>

        {/* CONCURSO */}
        <section id="concurso" className="s s-acc">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 820 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Concurso de fantasias</h2>
              <p className="lede" style={{ fontWeight: 500 }}>Sábado, 31/10, no Hard Rock. Capriche na fantasia: as três melhores levam gift cards do Hard Rock para aproveitar na mesma noite.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[["1º lugar", "R$ 300"], ["2º lugar", "R$ 200"], ["3º lugar", "R$ 100"]].map(([pos, val], k) => (
                <div key={pos} style={{ background: k === 0 ? "#000" : "transparent", color: k === 0 ? "#fff" : "#000", boxShadow: k === 0 ? "none" : "inset 0 0 0 3px #000", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontWeight: 800 }}>{pos}</span>
                  <span className="disp" style={{ fontSize: 72, color: k === 0 ? ACC : "#000" }}>{val}</span>
                  <small style={{ fontWeight: 700, fontSize: 14 }}>em gift card Hard Rock</small>
                </div>
              ))}
            </div>
            <ol className="ev-steps">
              <li>Para participar, basta vir fantasiado e com ingresso para a noite de 31/10.</li>
              <li>Os três vencedores são anunciados na própria noite.</li>
              <li>O prêmio é um gift card do Hard Rock Cafe, válido para consumo na própria noite do evento.</li>
            </ol>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
              <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Como foi nos outros anos</h2>
              <p className="lede muted">O Halloween do Hard Rock já virou tradição em Ribeirão Preto. Fantasias caprichadas, casa lotada e show ao vivo.</p>
            </div>
            <div className="ev-gal">
              {galeria.map((g) => {
                const src = `${IMG}/halloween-galeria-${g.n}.jpg`;
                return (
                  <button key={g.n} type="button" className={g.portrait ? "p" : ""} onClick={() => setFoto(src)} aria-label="Ampliar foto">
                    <img src={src} alt="Público fantasiado no Halloween do Hard Rock Cafe Ribeirão Preto" loading="lazy" />
                  </button>
                );
              })}
            </div>
            <p className="muted" style={{ fontSize: 14 }}>Fotos: Rafael Cautella</p>
          </div>
        </section>

        {/* SERVIÇO */}
        <section id="servico" className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Serviço</h2>
            <div className="ev-info">
              <div>
                <h3>Local</h3>
                <p><strong>Hard Rock Cafe Ribeirão Preto</strong></p>
                <p>R. Edgar Rodrigues, 200, Ribeirão Preto, SP</p>
                <p><a href="https://maps.google.com/?q=Hard+Rock+Cafe+Ribeir%C3%A3o+Preto" target="_blank" rel="noopener noreferrer">Abrir no mapa</a></p>
              </div>
              <div>
                <h3>Reserva de mesa</h3>
                <p>Telefone <strong><a href={`tel:+55${TEL_RESERVA_DIGITS}`}>{TEL_RESERVA}</a></strong><button className="copy" type="button" onClick={copiar}>{copiado ? "Copiado" : "Copiar"}</button></p>
                <p>Somente após a compra do ingresso. Reservas mantidas até 19h30.</p>
              </div>
              <div>
                <h3>Horários</h3>
                <p>Shows a partir das 21h nas duas noites.</p>
                <p>Na sexta, chegue fantasiado até as 19h30 para garantir um dos 30 ingressos para o sábado.</p>
                <p>Classificação livre. Crianças de até 6 anos, acompanhadas, não pagam.</p>
              </div>
              <div>
                <h3>Hotel oficial</h3>
                <p><strong>Transamerica Ribeirão Preto</strong></p>
                <p>Vem de fora da cidade? Este é o hotel parceiro das duas noites.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PERGUNTAS */}
        <section className="s s-black rule-top">
          <div className="wrap ev-faq" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="disp" style={{ fontSize: "clamp(48px, 5.6vw, 84px)" }}>Perguntas frequentes</h2>
            <div>
              <details><summary>Preciso ir fantasiado?</summary><p>Não é obrigatório, mas a noite fica melhor assim. Na sexta, 30/10, os 30 primeiros que chegarem fantasiados até as 19h30 ganham um ingresso para o sábado. No sábado, 31/10, quem vier fantasiado concorre aos gift cards do concurso.</p></details>
              <details><summary>Posso reservar mesa sem ingresso?</summary><p>Não. A reserva é feita por telefone somente depois da compra do ingresso e fica mantida até 19h30.</p></details>
              <details><summary>Posso levar as crianças?</summary><p>Pode. A classificação é livre nas duas noites, e crianças de até 6 anos, acompanhadas, não pagam. Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos.</p></details>
            </div>
          </div>
        </section>

        {/* PARCEIROS */}
        <section className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
            <h2 className="disp" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>Parceiros</h2>
            <div className="ev-logos">
              {grupos.map((g) => (
                <div key={g.titulo}>
                  <h3>{g.titulo}</h3>
                  <div className="row">
                    {g.logos.map((l) => (
                      <a key={l.alt} href={l.href} target="_blank" rel="noopener noreferrer"><img src={l.src} alt={l.alt} loading="lazy" /></a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="ev-age">Beba com moderação. Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos.</p>
          </div>
        </section>
      </main>
      <RRFooter />

      {foto && (
        <div className="ev-lb" onClick={(e) => { if ((e.target as HTMLElement).tagName !== "IMG") setFoto(null); }}>
          <button type="button" aria-label="Fechar" onClick={() => setFoto(null)}>×</button>
          <img src={foto} alt="Foto do Halloween do Hard Rock Cafe Ribeirão Preto" />
        </div>
      )}
    </div>
  );
}
