import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Página especial: Halloween do Hard Rock Cafe Ribeirão Preto (30 e 31/10/2026).
// Visual próprio, separado do resto do site. Imagens em client/public/halloween/.

const IMG = "/halloween";

const SYMPLA_LITHIUM = "https://www.sympla.com.br/evento/lithium-com-dri-santana-no-hard-rock-cafe-ribeirao-preto/3576546";
const SYMPLA_CAARU = "https://www.sympla.com.br/evento/caaru-rock-xamanico-no-hard-rock-cafe-ribeirao-preto/3576589";
const WHATSAPP_RESERVA = "(16) 99292-2458";
const WHATSAPP_RESERVA_DIGITS = "16992922458";
const SHOW_START = new Date("2026-10-30T21:00:00-03:00").getTime();

const galeria: { n: string; portrait?: boolean }[] = [
  { n: "01" }, { n: "02" }, { n: "03" }, { n: "04", portrait: true },
  { n: "05" }, { n: "06", portrait: true }, { n: "07" }, { n: "08", portrait: true },
  { n: "09" }, { n: "10", portrait: true }, { n: "11" }, { n: "12", portrait: true },
];

type Logo = { src: string; alt: string; href: string };
const grupos: { titulo: string; wide?: boolean; logos: Logo[] }[] = [
  { titulo: "Local", logos: [{ src: `${IMG}/logo-hardrock.png`, alt: "Hard Rock Cafe Ribeirão Preto", href: "https://www.instagram.com/hrc.ribeiraopreto/" }] },
  { titulo: "Realização", logos: [{ src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/" }] },
  { titulo: "Promoção exclusiva", logos: [{ src: `${IMG}/logo-kiss.png`, alt: "Kiss FM 105,3", href: "https://www.instagram.com/kissfmribeirao/" }] },
  { titulo: "Hotel oficial", logos: [{ src: `${IMG}/logo-transamerica.png`, alt: "Transamerica Ribeirão Preto", href: "https://www.instagram.com/transamericaribeiraopreto/" }] },
  { titulo: "Apoio", wide: true, logos: [
    { src: `${IMG}/logo-school.png`, alt: "School of Rock Ribeirão Preto", href: "https://www.instagram.com/schoolofrock_ribeiraopreto/" },
    { src: `${IMG}/logo-dritto.png`, alt: "Dritto Mídia Out of Home", href: "https://www.instagram.com/drittomidiaooh/" },
  ] },
  { titulo: "Nas noites", wide: true, logos: [
    { src: `${IMG}/logo-yupi.png`, alt: "Yupi Foto Cabine", href: "https://www.instagram.com/yupifotocabine/" },
  ] },
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

// Halloween decorations: inline SVG, no image downloads, purely decorative.
const BAT = "M50 22c-3-7-9-10-15-9 3 3 4 6 3 9-5-4-12-5-18-2 4 2 6 5 6 9-6-2-13 0-17 5 8-1 15 2 20 7 2-4 6-6 11-6 2 3 6 5 10 5s8-2 10-5c5 0 9 2 11 6 5-5 12-8 20-7-4-5-11-7-17-5 0-4 2-7 6-9-6-3-13-2-18 2-1-3 0-6 3-9-6-1-12 2-15 9z";

function Bats() {
  return (
    <div className="bats" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={`bat b${i}`} viewBox="0 0 100 44"><path d={BAT} /></svg>
      ))}
    </div>
  );
}

function Web() {
  return (
    <svg className="web" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M200 0 L60 200 M200 0 L0 120 M200 0 L0 20 M200 0 L130 200 M200 0 L0 190" />
        <path d="M168 0 Q172 18 186 24 Q192 10 200 32" />
        <path d="M128 0 Q140 34 168 46 Q176 72 200 76" />
        <path d="M84 0 Q100 46 138 66 Q148 104 200 118" />
        <path d="M40 0 Q62 60 110 88 Q120 140 200 160" />
        <path d="M0 18 Q36 70 84 108 Q92 168 170 200" />
      </g>
      <g transform="translate(150 124)">
        <g className="spiderbob">
          <line x1="0" y1="-84" x2="0" y2="-12" stroke="currentColor" strokeWidth="1" />
          <ellipse rx="7" ry="8" fill="#0b0810" />
          <circle cy="-9" r="4.5" fill="#0b0810" />
          <g stroke="#0b0810" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M-6 -4 L-14 -10 L-17 -4 M-6 0 L-15 -1 L-18 5 M-6 3 L-13 8 L-15 14 M-5 6 L-10 13 L-10 19" />
            <path d="M6 -4 L14 -10 L17 -4 M6 0 L15 -1 L18 5 M6 3 L13 8 L15 14 M5 6 L10 13 L10 19" />
          </g>
          <circle cx="-1.6" cy="-10" r=".9" fill="#f07a1a" /><circle cx="1.6" cy="-10" r=".9" fill="#f07a1a" />
        </g>
      </g>
    </svg>
  );
}

function Pumpkin({ className = "" }: { className?: string }) {
  return (
    <svg className={`pumpkin ${className}`} viewBox="0 0 64 60" aria-hidden="true">
      <path d="M31 9c1-5 4-8 9-8-3 2-4 5-4 9z" fill="#4a7a2c" />
      <ellipse cx="20" cy="34" rx="15" ry="22" fill="#d9661a" />
      <ellipse cx="44" cy="34" rx="15" ry="22" fill="#d9661a" />
      <ellipse cx="32" cy="34" rx="15" ry="24" fill="#f07a1a" />
      <g className="face" fill="#ffd36b">
        <path d="M17 27l8-6 3 9z" /><path d="M47 27l-8-6-3 9z" /><path d="M29 33l3-5 3 5z" />
        <path d="M14 39c6 8 30 8 36 0l-4 2-3-3-4 4-3-3-4 4-3-3-4 4-3-3-4 3z" />
      </g>
    </svg>
  );
}

export default function Halloween() {
  const cd = useCountdown(SHOW_START);
  const [foto, setFoto] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Halloween no Hard Rock Cafe Ribeirão Preto | Rock Ribeirão";
    const FONTS = "https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&family=Creepster&display=swap";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS;
    if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.appendChild(link);
    window.scrollTo(0, 0);
    return () => { document.title = prevTitle; link.remove(); };
  }, []);

  useEffect(() => {
    if (!foto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFoto(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [foto]);

  const copiar = () => {
    navigator.clipboard?.writeText(WHATSAPP_RESERVA_DIGITS).then(
      () => { setCopiado(true); setTimeout(() => setCopiado(false), 2500); },
      () => {}
    );
  };

  return (
    <div className="hw">
      <style>{CSS}</style>
      <div className="wrap">
        <nav className="topnav">
          <a href="/" className="logo"><img src={`${IMG}/logo-rockribeirao.png`} alt="Rock Ribeirão Produções" /></a>
          <div className="navlinks">
            <a href="/">Início</a>
            <a href="/#shows">Shows</a>
            <a href="https://todosnorock.com.br">Todos no Rock</a>
            <a href="/rockrising">Rock Rising</a>
          </div>
          <button type="button" className="menubtn" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="mobilemenu" onClick={() => setMenuOpen(false)}>
            <a href="/">Início</a>
            <a href="/#shows">Shows</a>
            <a href="https://todosnorock.com.br">Todos no Rock</a>
            <a href="/rockrising">Rock Rising</a>
          </div>
        )}

        <header className="hero">
          <div className="sky" aria-hidden="true">
            <picture>
              <source media="(max-width:700px)" type="image/webp" srcSet={`${IMG}/halloween-hero-mobile.webp`} />
              <source media="(max-width:700px)" srcSet={`${IMG}/halloween-hero-mobile.jpg`} />
              <source type="image/webp" srcSet={`${IMG}/halloween-hero-desktop.webp`} />
              <img src={`${IMG}/halloween-hero-desktop.jpg`} alt="" fetchPriority="high" />
            </picture>
          </div>
          <Bats />
          <Web />
          <div className="fogband" aria-hidden="true" />
          <div className="titlerow">
            <a className="hrwrap" href="https://www.instagram.com/hrc.ribeiraopreto/" target="_blank" rel="noopener noreferrer">
              <img className="hrlogo" src={`${IMG}/logo-hardrock.png`} alt="Hard Rock Cafe Ribeirão Preto" width={240} height={188} />
            </a>
            <h1>
              <span className="spook">Halloween</span>
              <span className="sub">no Hard Rock Cafe Ribeirão Preto</span>
            </h1>
          </div>
          <div className="tickets">
            <a className="ticket" href={SYMPLA_LITHIUM} target="_blank" rel="noopener noreferrer">
              <Pumpkin className="tpk" />
              <span className="tdate"><b>30/10</b> Sexta · 21h</span>
              <span className="tband">Lithium <small>com Dri Santana</small></span>
              <span className="tperk">30 primeiros fantasiados até 19h30 ganham ingresso para sábado</span>
              <span className="tbtn">Comprar ingresso · Sexta</span>
            </a>
            <a className="ticket" href={SYMPLA_CAARU} target="_blank" rel="noopener noreferrer">
              <Pumpkin className="tpk" />
              <span className="tdate"><b>31/10</b> Sábado · 21h</span>
              <span className="tband">Caaru <small>Rock xamânico</small></span>
              <span className="tperk">Concurso de fantasias com R$ 600 em prêmios</span>
              <span className="tbtn">Comprar ingresso · Sábado</span>
            </a>
          </div>
          <div className="count" aria-live="polite">
            <span className="clabel">Faltam</span>
            <div><b>{cd.d}</b><small>dias</small></div>
            <div><b>{cd.h}</b><small>horas</small></div>
            <div><b>{cd.m}</b><small>min</small></div>
          </div>
          <p className="hint">Classificação livre · Até 6 anos não paga</p>
        </header>

        <section id="noites">
          <h2>Os shows</h2>
          <p className="sec-lede">Shows a partir das 21h. Cada noite tem o seu ingresso no Sympla.</p>
          <div className="nights">
            <article className="night">
              <img src="/Lithium-banner%2020261030.jpg" alt="Arte do show da banda Lithium com Dri Santana, Especial Halloween" />
              <div className="body">
                <div className="date"><span className="d">30/10</span><span className="w">Sexta</span><span className="t">a partir das 21h</span></div>
                <h3>Lithium <small>com Dri Santana</small></h3>
                <ul className="perks">
                  <li><span>Totem</span>Totem fotográfico da Yupi para levar a foto da noite.</li>
                  <li><span>Fantasia</span>Os 30 primeiros que chegarem fantasiados até as 19h30 ganham um ingresso para o show do Caaru no sábado, 31/10.</li>
                </ul>
                <a className="btn" href={SYMPLA_LITHIUM} target="_blank" rel="noopener noreferrer">Comprar ingresso · 30/10</a>
              </div>
            </article>
            <article className="night">
              <img src="/Caaru-banner%2020261031.jpg" alt="Arte do show do Caaru, rock xamânico, Especial Halloween" />
              <div className="body">
                <div className="date"><span className="d">31/10</span><span className="w">Sábado</span><span className="t">a partir das 21h</span></div>
                <h3>Caaru <small>Rock xamânico</small></h3>
                <ul className="perks">
                  <li><span>Totem</span>Totem fotográfico da Yupi para levar a foto da noite.</li>
                  <li><span>Concurso</span>Concurso de fantasias com R$ 600 em gift cards do Hard Rock para os três primeiros colocados.</li>
                </ul>
                <a className="btn" href={SYMPLA_CAARU} target="_blank" rel="noopener noreferrer">Comprar ingresso · 31/10</a>
              </div>
            </article>
          </div>
        </section>

        <section id="concurso">
          <h2>Concurso de fantasias</h2>
          <p className="sec-lede">Sábado, 31/10, no Hard Rock. Capriche na fantasia: as três melhores levam gift cards do Hard Rock para aproveitar na mesma noite.</p>
          <div className="prizes">
            <div className="prize first"><div className="pos">1º lugar</div><div className="val">R$ 300</div><small>em gift card Hard Rock</small></div>
            <div className="prize"><div className="pos">2º lugar</div><div className="val">R$ 200</div><small>em gift card Hard Rock</small></div>
            <div className="prize"><div className="pos">3º lugar</div><div className="val">R$ 100</div><small>em gift card Hard Rock</small></div>
          </div>
          <ol className="rules">
            <li>Para participar, basta vir fantasiado e com ingresso para a noite de 31/10.</li>
            <li>Os três vencedores são anunciados na própria noite.</li>
            <li>O prêmio é um gift card do Hard Rock Cafe, válido para consumo na própria noite do evento.</li>
          </ol>
        </section>

        <section id="galeria">
          <h2>Como foi nos outros anos</h2>
          <p className="sec-lede">O Halloween do Hard Rock já virou tradição em Ribeirão Preto. Fantasias caprichadas, casa lotada e show ao vivo.</p>
          <div className="gal">
            {galeria.map((g) => {
              const src = `${IMG}/halloween-galeria-${g.n}.jpg`;
              return (
                <button key={g.n} type="button" className={g.portrait ? "p" : ""} onClick={() => setFoto(src)}>
                  <img src={src} alt="Público fantasiado no Halloween do Hard Rock Cafe Ribeirão Preto" loading="lazy" />
                </button>
              );
            })}
          </div>
          <p className="sec-lede credit">Fotos: Rafael Cautella</p>
        </section>

        <section>
          <h2>Serviço</h2>
          <div className="info">
            <div>
              <h4>Local</h4>
              <p><strong>Hard Rock Cafe Ribeirão Preto</strong></p>
              <p>R. Edgar Rodrigues, 200, Ribeirão Preto, SP</p>
              <p><a href="https://maps.google.com/?q=Hard+Rock+Cafe+Ribeir%C3%A3o+Preto" target="_blank" rel="noopener noreferrer">Abrir no mapa</a></p>
            </div>
            <div>
              <h4>Reserva de mesa</h4>
              <p>WhatsApp <strong>{WHATSAPP_RESERVA}</strong><button className="copy" type="button" onClick={copiar}>{copiado ? "Copiado" : "Copiar"}</button></p>
              <p>Somente após a compra do ingresso. Reservas mantidas até 19h30.</p>
            </div>
            <div>
              <h4>Horários</h4>
              <p>Shows a partir das 21h nas duas noites.</p>
              <p>Na sexta, chegue fantasiado até as 19h30 para garantir um dos 30 ingressos para o sábado.</p>
              <p>Classificação livre. Crianças de até 6 anos, acompanhadas, não pagam.</p>
            </div>
            <div>
              <h4>Hotel oficial</h4>
              <p><strong>Transamerica Ribeirão Preto</strong></p>
              <p>Vem de fora da cidade? Este é o hotel parceiro das duas noites.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Perguntas frequentes</h2>
          <details><summary>Preciso ir fantasiado?</summary><p>Não é obrigatório, mas a noite fica melhor assim. Na sexta, 30/10, os 30 primeiros que chegarem fantasiados até as 19h30 ganham um ingresso para o sábado. No sábado, 31/10, quem vier fantasiado concorre aos gift cards do concurso.</p></details>
          <details><summary>Posso reservar mesa sem ingresso?</summary><p>Não. A reserva é feita pelo WhatsApp somente depois da compra do ingresso e fica mantida até 19h30.</p></details>
          <details><summary>Posso levar as crianças?</summary><p>Pode. A classificação é livre nas duas noites, e crianças de até 6 anos, acompanhadas, não pagam. Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos.</p></details>
        </section>

        <section>
          <h2>Parceiros</h2>
          <div className="logos">
            {grupos.map((g) => (
              <div key={g.titulo} className={g.wide ? "lg wide" : "lg"}>
                <h5>{g.titulo}</h5>
                <div className="row">
                  {g.logos.map((l) => (
                    <a key={l.alt} href={l.href} target="_blank" rel="noopener noreferrer"><img src={l.src} alt={l.alt} /></a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <p>Beba com moderação. Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos.</p>
          <p><a href="/">Rock Ribeirão Produções</a></p>
        </footer>
      </div>

      {foto && (
        <div className="lb" onClick={(e) => { if ((e.target as HTMLElement).tagName !== "IMG") setFoto(null); }}>
          <button type="button" aria-label="Fechar" onClick={() => setFoto(null)}>×</button>
          <img src={foto} alt="Foto do Halloween do Hard Rock Cafe Ribeirão Preto" />
        </div>
      )}
    </div>
  );
}

const CSS = `
.hw{
  --night:#0f0b14; --crypt:#1a1422; --fog:#2a2234; --bone:#f1ebe2; --ash:#a99fb3;
  --pumpkin:#f07a1a; --violet:#7b4bc4; --blood:#cc2200;
  --f-display:"Anton","Impact","Arial Narrow",sans-serif;
  --f-spook:"Creepster","Anton",cursive;
  --f-body:"Barlow","Helvetica Neue",Arial,sans-serif;
  color-scheme:dark; min-height:100vh; overflow-x:clip;
  background:var(--night); color:var(--bone); font-family:var(--f-body); font-size:16px; line-height:1.55;
}
.hw *{box-sizing:border-box}
.hw .wrap{max-width:1100px;margin:0 auto;padding-inline:20px}
.hw a{color:inherit}
.hw .topnav{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-block:14px;border-bottom:1px solid var(--fog);position:relative;z-index:2}
.hw .topnav .logo img{height:48px;width:auto}
.hw .navlinks{display:flex;gap:18px;flex-wrap:wrap;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:var(--ash)}
.hw .navlinks a{text-decoration:none}.hw .navlinks a:hover{color:var(--bone)}
.hw .navlinks .on{color:var(--pumpkin);border-bottom:2px solid var(--pumpkin)}
.hw .menubtn{display:none;background:transparent;border:0;color:var(--pumpkin);padding:8px;cursor:pointer;line-height:0}
.hw .mobilemenu{display:none}
.hw .hero{padding-block:28px 32px;display:grid;gap:18px;position:relative;isolation:isolate;align-content:start}
.hw .hero>*:not(.sky):not(.bats):not(.web):not(.fogband){position:relative;z-index:1}
.hw .bats{position:absolute;top:0;bottom:0;left:calc(50% - 50vw);width:100vw;pointer-events:none;z-index:0;overflow:hidden}
.hw .bat{position:absolute;fill:#120a18;filter:drop-shadow(0 0 1px rgba(255,170,90,.9)) drop-shadow(0 0 6px rgba(240,122,26,.7))}
.hw .bat path{transform-box:fill-box;transform-origin:50% 50%}
.hw .bat.b0{width:44px;top:7%;right:14%}
.hw .bat.b1{width:28px;top:17%;right:30%}
.hw .bat.b2{width:20px;top:4%;right:42%}
.hw .bat.b3{width:32px;top:58%;right:6%}
.hw .bat.b4{width:18px;top:26%;right:4%}
.hw .web{position:absolute;top:0;right:calc(50% - 50vw);width:clamp(120px,15vw,210px);color:rgba(241,235,226,.32);pointer-events:none;z-index:0}
.hw .fogband{position:absolute;left:calc(50% - 50vw);width:100vw;bottom:0;height:120px;pointer-events:none;z-index:0;opacity:.55;background:radial-gradient(ellipse 35% 60% at 20% 80%,rgba(169,159,179,.35),transparent 70%),radial-gradient(ellipse 40% 55% at 70% 85%,rgba(123,75,196,.4),transparent 70%),radial-gradient(ellipse 30% 50% at 45% 95%,rgba(169,159,179,.25),transparent 70%)}
.hw .ticket{position:relative}
.hw .tpk{position:absolute;top:-16px;right:12px;width:40px;filter:drop-shadow(0 0 8px rgba(240,122,26,.65))}
.hw section{position:relative}
.hw section::before{content:"";position:absolute;top:-1px;left:50%;width:34px;height:16px;transform:translateX(-50%) scaleY(-1);opacity:.85;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 44'%3E%3Cpath fill='%23a99fb3' d='M50 22c-3-7-9-10-15-9 3 3 4 6 3 9-5-4-12-5-18-2 4 2 6 5 6 9-6-2-13 0-17 5 8-1 15 2 20 7 2-4 6-6 11-6 2 3 6 5 10 5s8-2 10-5c5 0 9 2 11 6 5-5 12-8 20-7-4-5-11-7-17-5 0-4 2-7 6-9-6-3-13-2-18 2-1-3 0-6 3-9-6-1-12 2-15 9z'/%3E%3C/svg%3E") center/30px no-repeat}
.hw section::after{content:"";position:absolute;top:-1px;left:50%;width:1px;height:3px;background:var(--ash);opacity:.5;transform:translateX(-50%)}
.hw .sky{position:absolute;top:0;bottom:0;left:50%;width:100vw;transform:translateX(-50%);z-index:0;pointer-events:none;overflow:hidden}
.hw .sky img{width:100%;height:100%;max-width:none;object-fit:cover;object-position:70% 50%;display:block}
.hw .sky::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,11,20,.92) 0%,rgba(15,11,20,.6) 50%,rgba(15,11,20,.15) 85%),linear-gradient(0deg,var(--night) 0%,rgba(15,11,20,0) 30%)}
.hw .titlerow{display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:1060px}
.hw .titlerow h1{min-width:0}
.hw .hrwrap{flex:none;order:2;position:relative;isolation:isolate;display:block}
.hw .hrwrap::before,.hw .hrwrap::after{content:"";position:absolute;z-index:-1;border-radius:50%;pointer-events:none}
.hw .hrwrap::before{inset:-35% -30%;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 35%,rgba(0,0,0,0) 70%);filter:blur(14px)}
.hw .hrwrap::after{inset:-15% -45% -25% -10%;background:radial-gradient(ellipse 45% 40% at 35% 60%,rgba(0,0,0,.55),transparent 70%),radial-gradient(ellipse 40% 35% at 70% 35%,rgba(0,0,0,.45),transparent 70%);filter:blur(18px)}
.hw .hrlogo{display:block;width:clamp(84px,16vw,200px);height:auto;filter:drop-shadow(0 0 10px rgba(0,0,0,.7))}
.hw h1{margin:0;line-height:.9;font-weight:400}
.hw h1 .spook{font-family:var(--f-spook);color:var(--pumpkin);font-size:clamp(54px,11vw,128px);display:block;letter-spacing:.02em}
.hw h1 .sub{font-family:var(--f-display);font-size:clamp(20px,3.6vw,40px);display:block;text-transform:uppercase;margin-top:6px}
.hw .tickets{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:900px}
.hw .ticket{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:var(--bone);background:rgba(26,20,34,.88);border:1px solid var(--fog);border-top:3px solid var(--pumpkin);border-radius:8px;padding:16px 16px 14px;-webkit-tap-highlight-color:transparent;transition:transform .15s,border-color .15s}
.hw .ticket:hover{border-color:var(--pumpkin);transform:translateY(-2px)}
.hw .ticket:active{transform:scale(.99)}
.hw .tdate{font-family:var(--f-display);text-transform:uppercase;font-size:16px;letter-spacing:.04em;color:var(--ash)}
.hw .tdate b{font-weight:400;color:var(--pumpkin);font-size:30px;line-height:1;margin-right:6px}
.hw .tband{font-family:var(--f-display);text-transform:uppercase;font-size:clamp(24px,3vw,32px);line-height:1}
.hw .tband small{font-family:var(--f-body);font-weight:600;font-size:13px;letter-spacing:.08em;color:var(--ash);margin-left:6px}
.hw .tperk{font-size:14px;line-height:1.35;color:var(--ash);margin-bottom:8px}
.hw .tbtn{display:flex;align-items:center;justify-content:center;margin-top:auto;background:var(--blood);color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:15px;min-height:48px;padding:10px 12px;border-radius:5px;text-align:center}
.hw .ticket:hover .tbtn{filter:brightness(1.12)}
.hw .hint{margin:0;font-size:13px;color:var(--ash);letter-spacing:.02em}
.hw .count{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.hw .clabel{font-family:var(--f-display);text-transform:uppercase;letter-spacing:.06em;font-size:15px;color:var(--ash);margin-right:2px}
.hw .count div{display:flex;align-items:baseline;gap:5px;background:rgba(26,20,34,.88);border:1px solid var(--fog);border-radius:6px;padding:6px 10px}
.hw .count b{font-family:var(--f-display);font-weight:400;font-size:24px;line-height:1;color:var(--pumpkin);font-variant-numeric:tabular-nums}
.hw .count small{text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:var(--ash)}
.hw .btn{display:inline-flex;align-items:center;justify-content:center;background:var(--blood);color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:14px;padding:14px 22px;border-radius:4px;text-decoration:none;border:0;cursor:pointer}
.hw .btn:hover{filter:brightness(1.12)}
.hw .btn:focus-visible,.hw a:focus-visible,.hw button:focus-visible{outline:3px solid var(--pumpkin);outline-offset:2px}
.hw .btn.ghost{background:transparent;border:1.5px solid var(--ash);color:var(--bone)}
.hw section{padding-block:48px;border-top:1px solid var(--fog)}
.hw h2{font-family:var(--f-display);font-weight:400;text-transform:uppercase;font-size:clamp(30px,5vw,44px);margin:0 0 8px;letter-spacing:.01em;text-wrap:balance}
.hw .sec-lede{color:var(--ash);margin:0 0 28px;max-width:62ch}
.hw .credit{margin:14px 0 0;font-size:13px}
.hw .nights{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:24px}
.hw .night{background:var(--crypt);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.hw .night>img{display:block;width:100%;aspect-ratio:1600/838;object-fit:cover}
.hw .night .body{padding:22px;display:grid;gap:14px;flex:1;align-content:start}
.hw .date{display:flex;align-items:baseline;gap:10px;font-family:var(--f-display);text-transform:uppercase}
.hw .date .d{font-size:40px;color:var(--pumpkin);line-height:1}.hw .date .w{font-size:20px}
.hw .date .t{font-family:var(--f-body);font-weight:600;color:var(--ash);font-size:15px;margin-left:auto}
.hw .night h3{margin:0;font-family:var(--f-display);font-weight:400;font-size:28px;text-transform:uppercase;letter-spacing:.01em}
.hw .night h3 small{display:block;font-family:var(--f-body);font-weight:600;font-size:14px;letter-spacing:.1em;color:var(--ash)}
.hw .perks{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.hw .perks li{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;background:var(--fog);border-radius:5px;padding:10px 12px;font-size:15px}
.hw .perks li span{font-family:var(--f-display);color:var(--pumpkin);font-size:13px;letter-spacing:.08em;text-transform:uppercase;padding-top:2px}
.hw .night .btn{margin-top:auto;width:100%}
.hw .prizes{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px}
.hw .prize{border:1px solid var(--fog);border-radius:8px;padding:22px 18px;text-align:center;background:var(--crypt)}
.hw .prize .pos{font-family:var(--f-display);text-transform:uppercase;letter-spacing:.06em;color:var(--ash);font-size:15px}
.hw .prize .val{font-family:var(--f-display);font-size:clamp(34px,6vw,54px);line-height:1.05;font-variant-numeric:tabular-nums}
.hw .prize.first{border-color:var(--pumpkin)}.hw .prize.first .val{color:var(--pumpkin)}
.hw .prize small{color:var(--ash);font-size:13px}
.hw .rules{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px 32px;color:var(--ash);margin:0;padding-left:20px;list-style:decimal}
.hw .gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:clamp(110px,15vw,170px);grid-auto-flow:dense;gap:8px}
.hw .gal button{padding:0;border:0;background:var(--crypt);border-radius:4px;overflow:hidden;cursor:zoom-in;grid-column:span 2;grid-row:span 2}
.hw .gal button.p{grid-column:span 1;grid-row:span 2}
.hw .gal img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}
.hw .gal button:hover img{transform:scale(1.04)}
.hw .lb{position:fixed;inset:0;background:rgba(10,7,14,.94);display:flex;align-items:center;justify-content:center;padding:24px;z-index:100}
.hw .lb img{max-height:90vh;max-width:100%;border-radius:4px}
.hw .lb button{position:absolute;top:calc(12px + env(safe-area-inset-top,0px));right:16px;background:transparent;border:0;color:var(--bone);font-size:40px;cursor:pointer;line-height:1}
.hw .info{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:28px}
.hw .info h4{font-family:var(--f-display);font-weight:400;text-transform:uppercase;font-size:20px;margin:0 0 8px;color:var(--pumpkin);letter-spacing:.03em}
.hw .info p{margin:0 0 6px;color:var(--ash)}.hw .info strong{color:var(--bone)}
.hw .info a{text-decoration:underline}
.hw .copy{background:transparent;border:1px solid var(--fog);color:var(--bone);border-radius:4px;padding:4px 10px;font:600 12px var(--f-body);cursor:pointer;margin-left:6px}
.hw details{border-bottom:1px solid var(--fog);padding-block:14px}
.hw details:last-of-type{border-bottom:0}
.hw summary{cursor:pointer;font-weight:600;font-size:17px}
.hw details p{color:var(--ash);margin:10px 0 0;max-width:70ch}
.hw .logos{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 32px}
.hw .lg{display:grid;gap:12px;align-content:start;min-width:0}
.hw .lg.wide{grid-column:span 2}
.hw .lg h5{margin:0;font:600 12px var(--f-body);text-transform:uppercase;letter-spacing:.14em;color:var(--ash);border-bottom:1px solid var(--fog);padding-bottom:8px}
.hw .lg .row{display:flex;flex-wrap:wrap;align-items:center;gap:20px}
.hw .lg a{display:block;border-radius:4px;transition:opacity .2s}.hw .lg a:hover{opacity:.75}
.hw .lg img{height:56px;width:auto;max-width:150px;object-fit:contain}
.hw footer{padding-block:32px;color:var(--ash);font-size:13px;border-top:1px solid var(--fog);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.hw footer p{margin:0}
@media (max-width:700px){
  .hw .hero{padding-block:14px 22px;gap:12px}
  .hw .sky img{object-position:50% 35%}
  .hw .sky::after{background:linear-gradient(180deg,rgba(15,11,20,.25) 0%,rgba(15,11,20,.5) 30%,rgba(15,11,20,.85) 60%,var(--night) 100%)}
  .hw .tickets{grid-template-columns:1fr;gap:10px}
  .hw .tpk{width:32px;top:-13px;right:10px}
  .hw .web{width:118px;opacity:.8}
  .hw .bat.b0{width:40px;top:1%;right:33%}
  .hw .bat.b1{width:26px;top:10%;right:52%}
  .hw .bat.b2{display:none}
  .hw .bat.b3{width:24px;top:44%;right:3%}
  .hw .bat.b4{width:20px;top:4%;right:5%}
  .hw .count{flex-wrap:nowrap;gap:6px}
  .hw .count div{padding:5px 8px;gap:4px}
  .hw .count b{font-size:21px}
  .hw .count small{font-size:10px;letter-spacing:.04em}
  .hw .clabel{font-size:13px}
  .hw .titlerow{gap:12px}
  .hw h1 .spook{font-size:13vw}
  .hw .hrlogo{width:21vw}
  .hw h1 .sub{font-size:clamp(17px,5.2vw,24px)}
  .hw .ticket{gap:3px;padding:11px 12px 12px}
  .hw .tdate{font-size:14px}
  .hw .tdate b{font-size:24px}
  .hw .tband{font-size:24px}
  .hw .tperk{font-size:13px;margin-bottom:4px}
  .hw .tbtn{min-height:46px;font-size:15px}
}
@media (max-width:560px){
  .hw .prizes{grid-template-columns:1fr}
  .hw .navlinks{display:none}
  .hw .topnav{padding-block:8px}
  .hw .topnav .logo img{height:38px}
  .hw .menubtn{display:block}
  .hw .mobilemenu{display:flex;flex-direction:column;position:relative;z-index:3;margin-inline:-20px;background:var(--crypt);border-bottom:1px solid var(--fog)}
  .hw .mobilemenu a{padding:14px 20px;font-weight:600;font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:var(--bone);text-decoration:none;border-top:1px solid var(--fog)}
  .hw .mobilemenu a:first-child{border-top:0}
  .hw .mobilemenu a.on{color:var(--pumpkin)}
  .hw .gal{grid-template-columns:repeat(2,1fr);grid-auto-rows:120px}
  .hw .logos{grid-template-columns:1fr 1fr}
  .hw .lg.wide{grid-column:span 2}
  .hw .lg img{height:46px}
}
@media (prefers-reduced-motion:no-preference){
  .hw .bat path{animation:hwflap .32s ease-in-out infinite alternate}
  .hw .bat{animation:hwdrift 7s ease-in-out infinite alternate}
  .hw .bat.b1{animation-duration:9s;animation-delay:-2s}.hw .bat.b1 path{animation-duration:.28s}
  .hw .bat.b2{animation-duration:11s;animation-delay:-5s}
  .hw .bat.b3{animation-duration:8s;animation-delay:-3s}.hw .bat.b3 path{animation-duration:.36s}
  .hw .bat.b4{animation-duration:10s;animation-delay:-6s}
  .hw .spiderbob{animation:hwbob 4.5s ease-in-out infinite alternate}
  .hw .fogband{animation:hwfog 16s ease-in-out infinite alternate}
  .hw .pumpkin .face{animation:hwcandle 3.2s infinite}
  .hw .ticket:nth-child(2) .pumpkin .face{animation-delay:-1.4s}
  .hw .spook{animation:hwflick 6s infinite}
  .hw .hrwrap::after{animation:hwsmoke 9s ease-in-out infinite alternate}
}
@keyframes hwflap{from{transform:scaleY(1)}to{transform:scaleY(.45)}}
@keyframes hwdrift{0%{transform:translate(0,0)}50%{transform:translate(-22px,10px)}100%{transform:translate(-40px,-6px)}}
@keyframes hwbob{from{transform:translateY(0)}to{transform:translateY(10px)}}
@keyframes hwfog{from{transform:translateX(-4%)}to{transform:translateX(4%)}}
@keyframes hwcandle{0%,100%{opacity:1}40%{opacity:.82}45%{opacity:1}70%{opacity:.88}72%{opacity:.7}74%{opacity:1}}
@keyframes hwflick{0%,92%,100%{opacity:1}94%{opacity:.55}96%{opacity:1}97%{opacity:.7}}
@keyframes hwsmoke{to{transform:translate(-6%,-4%) scale(1.08) rotate(6deg)}}
`;
