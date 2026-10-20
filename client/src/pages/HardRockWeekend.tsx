import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteMenuDesktop, SiteMenuMobile } from "@/components/SiteMenu";

const SECTIONS = [
  { href: "#ingressos", label: "Ingressos" },
  { href: "#sobre", label: "O evento" },
  { href: "#noites", label: "Os shows" },
  { href: "#servico", label: "Serviço" },
];

// Página de vendas do Hard Rock Weekend (19, 20 e 21/11/2026, Hard Rock Cafe Ribeirão Preto).
// Imagens em client/public/hardrockweekend/.

const IMG = "/hardrockweekend";
const BASE_SHOW = "https://www.sympla.com.br/evento";
const TEL_RESERVA = "(16) 3170-1722";
const TEL_RESERVA_DIGITS = "1631701722";

type Night = {
  key: string; date: string; weekday: string; band: string; sub: string; style: string;
  perk: string; link: string; art: string; alt: string; hotel: string;
};

const FACTS: Record<string, string[]> = {
  guns: ["Tributo ao Guns N' Roses desde 1991, contratado pela Geffen para o lançamento dos discos Use Your Illusion", "Domingão do Faustão, Programa da Eliana e Fantástico", "Mais de 300 cidades e shows na Argentina"],
  lost80s: ["Hard rock e glam rock com o repertório dos anos 80", "No vocal, Rane Oliveira, vencedor de A Voz do Rock", "Convidado: Kiko Shred, que já tocou com Tim Ripper Owens, Blaze Bayley e André Matos"],
  radio: ["Clássicos do rock com Nando Fernandes, ex-Hangar", "Turnês brasileiras com o baixista Rudy Sarzo e o baterista Vinny Appice", "Cantou com o Lynyrd Skynyrd em 2023"],
};

const NIGHTS: Night[] = [
  {
    key: "guns", date: "19/11", weekday: "Quinta · Véspera de feriado", band: "Guns Cover Brazil", sub: "Tributo Guns N' Roses", style: "Hard rock",
    perk: "Os 30 primeiros que chegarem até 19h30 ganham ingresso para a sexta-feira, 20/11.",
    link: `${BASE_SHOW}/hard-rock-weekend--tributo-guns-n-roses-com-guns-cover-brazil-no-hard-rock-cafe-ribeirao-preto/3626191`,
    art: `${IMG}/guns-cover-brazil.webp`, alt: "Arte do show Guns Cover Brazil, tributo Guns N' Roses, Hard Rock Weekend", hotel: "Matiz Hotel Vilabom",
  },
  {
    key: "lost80s", date: "20/11", weekday: "Sexta", band: "Lost80s", sub: "Feat. Kiko Shred", style: "Glam rock especial anos 80",
    perk: "Os 30 primeiros que chegarem até 19h30 ganham ingresso para o sábado, 21/11.",
    link: `${BASE_SHOW}/hard-rock-weekend--lost80s-feat-kiko-shred-glam-rock-especial-anos-80-no-hard-rock-cafe-ribeirao/3626203`, art: `${IMG}/lost80s.webp`, alt: "Arte do show Lost80s feat. Kiko Shred, glam rock anos 80, Hard Rock Weekend", hotel: "Hotel JP",
  },
  {
    key: "radio", date: "21/11", weekday: "Sábado", band: "Radio Show", sub: "Feat. Nando Fernandes", style: "Rock",
    perk: "Fechamento do fim de semana no Hard Rock Cafe.",
    link: `${BASE_SHOW}/hard-rock-weekend--radio-show-feat-nando-fernandes-classicos-do-rock-no-hard-rock-cafe-ribeirao/3626225`, art: `${IMG}/radio-show.webp`, alt: "Arte do show Radio Show feat. Nando Fernandes, Hard Rock Weekend", hotel: "Hotel JP",
  },
];

type Logo = { src: string; alt: string; href: string };
const HOTEL_LOGO: Record<string, string> = { "Matiz Hotel Vilabom": `${IMG}/logo-matiz.png`, "Hotel JP": `${IMG}/logo-hotel-jp.png` };

const grupos: { titulo: string; wide?: boolean; logos: Logo[] }[] = [
  { titulo: "Local", logos: [{ src: `${IMG}/logo-hardrock.png`, alt: "Hard Rock Cafe Ribeirão Preto", href: "https://www.instagram.com/hrc.ribeiraopreto/" }] },
  { titulo: "Realização", logos: [{ src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/" }] },
  { titulo: "Hotéis parceiros", wide: true, logos: [
    { src: `${IMG}/logo-matiz.png`, alt: "Matiz Hotel Vilabom Ribeirão Preto", href: "https://www.instagram.com/matizribeiraopreto/" },
    { src: `${IMG}/logo-hotel-jp.png`, alt: "Hotel JP Ribeirão Preto", href: "https://www.instagram.com/hoteljprp/" },
  ] },
  { titulo: "Promoção", logos: [{ src: `${IMG}/logo-kiss.png`, alt: "Kiss FM 105,3", href: "https://www.instagram.com/kissfmribeirao/" }] },
  { titulo: "Apoio", wide: true, logos: [
    { src: `${IMG}/logo-school.png`, alt: "School of Rock Ribeirão Preto", href: "https://www.instagram.com/schoolofrock_ribeiraopreto/" },
    { src: `${IMG}/logo-dritto.png`, alt: "Dritto Mídia Out of Home", href: "https://www.instagram.com/drittomidiaooh/" },
  ] },
];

export default function HardRockWeekend() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hard Rock Weekend: 3 noites de rock no Hard Rock Cafe Ribeirão Preto | Rock Ribeirão";
    const FONTS = "https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&display=swap";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS;
    if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.appendChild(link);
    window.scrollTo(0, 0);
    return () => { document.title = prevTitle; link.remove(); };
  }, []);

  const copiar = () => {
    navigator.clipboard?.writeText(TEL_RESERVA_DIGITS).then(
      () => { setCopiado(true); setTimeout(() => setCopiado(false), 2500); },
      () => {}
    );
  };

  return (
    <div className="hrw">
      <style>{CSS}</style>
      <div className="wrap">
        <nav className="topnav">
          <a href="/" className="logo"><img src={`${IMG}/logo-rockribeirao.png`} alt="Rock Ribeirão Produções" /></a>
          <SiteMenuDesktop current="hrw" sections={SECTIONS} className="navlinks" />
          <button type="button" className="menubtn" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="mobilemenu"><SiteMenuMobile current="hrw" sections={SECTIONS} onNavigate={() => setMenuOpen(false)} /></div>
        )}

        <header className="hero">
          <div className="glow" aria-hidden="true">
            <picture>
              <source media="(max-width:700px)" srcSet={`${IMG}/hero-mobile.webp`} />
              <img src={`${IMG}/hero-desktop.webp`} alt="" fetchPriority="high" />
            </picture>
          </div>
          <div className="titlerow">
            <h1>
              <span className="kicker">3 noites de rock no feriadão · 19, 20 e 21/11</span>
              <span className="big">Hard Rock <em>Weekend</em></span>
              <span className="sub">no Hard Rock Cafe Ribeirão Preto</span>
            </h1>
            <a className="hrlogo" href="https://www.instagram.com/hrc.ribeiraopreto/" target="_blank" rel="noopener noreferrer">
              <img src={`${IMG}/logo-hardrock.png`} alt="Hard Rock Cafe Ribeirão Preto" width={200} height={157} />
            </a>
          </div>
          <div className="tickets" id="ingressos">
            {NIGHTS.map((n) => (
              <a key={n.key} className="ticket" href={n.link} target="_blank" rel="noopener noreferrer">
                <span className="tdate"><b>{n.date}</b> {n.weekday.split(" · ")[0]} · 21h</span>
                <span className="tband">{n.band} <small>{n.sub}</small></span>
                <span className="tbtn">Comprar ingresso · {n.date}</span>
              </a>
            ))}
          </div>
          <p className="hint">Ingressos pelo Sympla · Casa abre às 18h, shows a partir das 21h</p>
        </header>

        <section id="sobre">
          <h2>Três noites, três shows</h2>
          <div className="about">
            <p>De 19 a 21 de novembro, o Hard Rock Cafe Ribeirão Preto vira o endereço do rock. São três noites seguidas, com três shows ao vivo, e cada uma tem um som diferente: o tributo ao Guns N' Roses na quinta, o glam rock dos anos 80 na sexta e os clássicos do rock no sábado.</p>
            <p>Chegou cedo, ganhou a próxima noite: os 30 primeiros que chegarem até 19h30 na quinta ganham ingresso para a sexta, e os 30 primeiros da sexta ganham ingresso para o sábado. A casa abre às 18h e os shows começam às 21h.</p>
            <p>Vem de fora? Os hotéis parceiros têm hospedagem para o fim de semana. Ingressos pelo Sympla, um para cada noite.</p>
          </div>
        </section>

        <section id="noites">
          <h2>Os shows</h2>
          <p className="sec-lede">Quinta, sexta e sábado de rock ao vivo. Cada noite tem o seu ingresso no Sympla.</p>
          <div className="nights">
            {NIGHTS.map((n) => (
              <article className="night" key={n.key}>
                <img src={n.art} alt={n.alt} loading="lazy" />
                <div className="body">
                  <div className="date"><span className="d">{n.date}</span><span className="w">{n.weekday}</span></div>
                  <h3>{n.band} <small>{n.sub}</small></h3>
                  <ul className="facts">{FACTS[n.key].map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="hotel"><p><b>Hotel parceiro</b></p><img src={HOTEL_LOGO[n.hotel]} alt={n.hotel} /></div>
                  <a className="btn" href={n.link} target="_blank" rel="noopener noreferrer">Comprar ingresso · {n.date}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="acao">
          <h2>Ação dos 30 primeiros</h2>
          <p className="sec-lede">Chegou cedo, ganhou a noite seguinte. Quem entra primeiro leva ingresso de cortesia para o próximo show.</p>
          <ol className="steps">
            <li><b>Compre o ingresso</b>Garanta a sua noite no Sympla (quinta ou sexta).</li>
            <li><b>Chegue até 19h30</b>A casa abre às 18h. Os 30 primeiros a chegar entram na ação.</li>
            <li><b>Ganhe a próxima noite</b>Quinta leva ingresso para a sexta. Sexta leva ingresso para o sábado.</li>
          </ol>
        </section>

        <section id="servico">
          <h2>Serviço</h2>
          <div className="info">
            <div>
              <h4>Local</h4>
              <p><strong>Hard Rock Cafe Ribeirão Preto</strong></p>
              <p>R. Edgar Rodrigues, 200, Ribeirão Preto, SP</p>
              <p><a href="https://maps.google.com/?q=Hard+Rock+Cafe+Ribeir%C3%A3o+Preto" target="_blank" rel="noopener noreferrer">Abrir no mapa</a></p>
            </div>
            <div>
              <h4>Horários</h4>
              <p>Casa abre às 18h.</p>
              <p>Shows a partir das 21h nas três noites.</p>
            </div>
            <div>
              <h4>Reserva de mesa</h4>
              <p>Telefone <strong><a href={`tel:+55${TEL_RESERVA_DIGITS}`}>{TEL_RESERVA}</a></strong><button className="copy" type="button" onClick={copiar}>{copiado ? "Copiado" : "Copiar"}</button></p>
              <p>Somente após a compra do ingresso. Reservas mantidas até 19h30.</p>
            </div>
            <div>
              <h4>Hotéis parceiros</h4>
              <div className="hlogos">
                <figure><img src={`${IMG}/logo-matiz.png`} alt="Matiz Hotel Vilabom" /><figcaption>Quinta, 19/11</figcaption></figure>
                <figure><img src={`${IMG}/logo-hotel-jp.png`} alt="Hotel JP" /><figcaption>Sexta e sábado, 20 e 21/11</figcaption></figure>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Perguntas frequentes</h2>
          <details><summary>Preciso comprar um ingresso para cada noite?</summary><p>Sim, cada noite tem o seu ingresso no Sympla. Quem chegar entre os 30 primeiros na quinta ou na sexta, até 19h30, ganha o ingresso da noite seguinte.</p></details>
          <details><summary>A que horas começam os shows?</summary><p>A casa abre às 18h e os shows começam às 21h nas três noites.</p></details>
          <details><summary>Posso reservar mesa sem ingresso?</summary><p>Não. A reserva é feita por telefone somente depois da compra do ingresso e fica mantida até 19h30.</p></details>
          <details><summary>Venda e consumo de bebidas para menores?</summary><p>Venda e consumo de bebidas alcoólicas são proibidos para menores de 18 anos.</p></details>
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
    </div>
  );
}

const CSS = `
.hrw{
  --bg:#0b0710; --card:#16101f; --line:#2b2038; --txt:#f4eefb; --mut:#b2a6c2;
  --pink:#ff5caa; --purple:#7c3aed; --red:#d4204a;
  --f-d:"Anton","Impact","Arial Narrow",sans-serif; --f-b:"Barlow","Helvetica Neue",Arial,sans-serif;
  color-scheme:dark; min-height:100vh; overflow-x:clip; background:var(--bg); color:var(--txt); font-family:var(--f-b); font-size:16px; line-height:1.55;
}
.hrw *{box-sizing:border-box}
.hrw .wrap{max-width:1100px;margin:0 auto;padding-inline:20px}
.hrw a{color:inherit}
.hrw .topnav{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-block:14px;border-bottom:1px solid var(--line);position:relative;z-index:2}
.hrw .topnav .logo img{height:48px;width:auto}
.hrw .navlinks{display:flex;font-weight:600}
.hrw .navlinks a{text-decoration:none}
.hrw .menubtn{display:none;background:transparent;border:0;color:var(--pink);padding:8px;cursor:pointer;line-height:0}
.hrw .mobilemenu{display:none}
.hrw section[id],.hrw #ingressos{scroll-margin-top:16px}
.hrw .hero{padding-block:32px 36px;display:grid;gap:20px;position:relative;isolation:isolate}
.hrw .glow{position:absolute;top:0;bottom:0;left:50%;width:100vw;transform:translateX(-50%);z-index:-1;pointer-events:none;overflow:hidden}
.hrw .glow img{width:100%;height:100%;object-fit:cover;object-position:70% 40%;display:block}
.hrw .glow::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,7,16,.9) 0%,rgba(11,7,16,.55) 50%,rgba(11,7,16,.2) 100%),linear-gradient(0deg,var(--bg) 0%,rgba(11,7,16,0) 35%)}
.hrw .titlerow{display:flex;align-items:center;justify-content:space-between;gap:16px}
.hrw h1{margin:0;font-weight:400;line-height:.95;min-width:0}
.hrw h1 .kicker{display:block;font-weight:700;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--pink);margin-bottom:10px}
.hrw h1 .big{display:block;font-family:var(--f-d);text-transform:uppercase;font-size:clamp(46px,9.5vw,108px)}
.hrw h1 .big em{font-style:normal;color:var(--pink)}
.hrw h1 .sub{display:block;font-family:var(--f-d);text-transform:uppercase;font-size:clamp(18px,3vw,32px);margin-top:8px;color:var(--mut)}
.hrw .hrlogo{flex:none;display:block}
.hrw .hrlogo img{display:block;width:clamp(80px,14vw,180px);height:auto;filter:drop-shadow(0 0 10px rgba(0,0,0,.6))}
.hrw .tickets{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hrw .ticket{display:flex;flex-direction:column;gap:6px;text-decoration:none;background:rgba(22,16,31,.92);border:1px solid var(--line);border-top:3px solid var(--pink);border-radius:8px;padding:16px;-webkit-tap-highlight-color:transparent;transition:transform .15s,border-color .15s}
.hrw .ticket:hover{border-color:var(--pink);transform:translateY(-2px)}
.hrw .tdate{font-family:var(--f-d);text-transform:uppercase;font-size:15px;letter-spacing:.04em;color:var(--mut)}
.hrw .tdate b{font-weight:400;color:var(--pink);font-size:30px;line-height:1;margin-right:6px}
.hrw .tband{font-family:var(--f-d);text-transform:uppercase;font-size:clamp(22px,2.6vw,28px);line-height:1.05;margin-bottom:8px}
.hrw .tband small{display:block;font-family:var(--f-b);font-weight:600;font-size:13px;letter-spacing:.08em;color:var(--mut);margin-top:3px}
.hrw .tbtn{display:flex;align-items:center;justify-content:center;margin-top:auto;background:var(--red);color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:15px;min-height:48px;padding:10px 12px;border-radius:5px;text-align:center}
.hrw .ticket:hover .tbtn{filter:brightness(1.12)}
.hrw .hint{margin:0;font-size:13px;color:var(--mut)}
.hrw .btn{display:inline-flex;align-items:center;justify-content:center;background:var(--red);color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:14px;min-height:48px;padding:12px 22px;border-radius:4px;text-decoration:none}
.hrw .btn:hover{filter:brightness(1.12)}
.hrw .btn:focus-visible,.hrw a:focus-visible,.hrw button:focus-visible{outline:3px solid var(--pink);outline-offset:2px}
.hrw section{padding-block:48px;border-top:1px solid var(--line)}
.hrw h2{font-family:var(--f-d);font-weight:400;text-transform:uppercase;font-size:clamp(30px,5vw,44px);margin:0 0 8px;text-wrap:balance}
.hrw .sec-lede{color:var(--mut);margin:0 0 28px;max-width:62ch}
.hrw .nights{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.hrw .night{background:var(--card);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.hrw .night>img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover}
.hrw .night .body{padding:18px;display:flex;flex-direction:column;gap:12px;flex:1}
.hrw .date{display:flex;align-items:baseline;gap:10px;font-family:var(--f-d);text-transform:uppercase}
.hrw .date .d{font-size:36px;color:var(--pink);line-height:1}.hrw .date .w{font-size:15px;color:var(--mut)}
.hrw .night h3{margin:0;font-family:var(--f-d);font-weight:400;font-size:26px;text-transform:uppercase}
.hrw .night h3 small{display:block;font-family:var(--f-b);font-weight:600;font-size:13px;letter-spacing:.06em;color:var(--mut);text-transform:none;margin-top:3px}
.hrw .bio{margin:0;color:var(--mut);font-size:15px}
.hrw .hotel{margin:0;font-size:14px;color:var(--mut);border-left:3px solid var(--pink);padding-left:10px}.hrw .hotel b{color:var(--txt)}
.hrw .bands{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.hrw .band{background:var(--card);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.hrw .aban{position:relative;aspect-ratio:16/9;background:var(--card)}
.hrw .aban img{width:100%;height:100%;object-fit:cover;display:block}
.hrw .aban::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,7,16,.85),transparent 60%)}
.hrw .adate{position:absolute;left:14px;bottom:10px;z-index:1;display:flex;align-items:baseline;gap:8px}
.hrw .adate b{font-family:var(--f-d);font-weight:400;font-size:40px;line-height:1;color:var(--pink)}
.hrw .adate span{font-family:var(--f-d);text-transform:uppercase;color:var(--txt);font-size:15px}
.hrw .bbody{padding:16px;display:flex;flex-direction:column;gap:10px;flex:1}
.hrw .band h3{margin:0;font-family:var(--f-d);font-weight:400;font-size:26px;text-transform:uppercase;line-height:1.05}
.hrw .band .btn{margin-top:auto;width:100%}
.hrw .asub{margin:-4px 0 0;color:var(--mut);font-weight:600;letter-spacing:.04em}
.hrw .facts{margin:0;padding-left:18px;display:grid;gap:6px;color:var(--mut);font-size:14px}
.hrw .facts li::marker{color:var(--pink)}
.hrw .atext .hotel{margin-bottom:18px}
.hrw div.hotel{display:flex;flex-direction:column;align-items:flex-start;gap:8px;border-left:0;padding-left:0}
.hrw div.hotel img{height:52px;width:auto;max-width:140px;object-fit:contain;flex:none}
.hrw div.hotel p{margin:0}
.hrw .hlogos{display:grid;gap:16px}
.hrw .hlogos figure{margin:0;display:grid;gap:4px;justify-items:start}
.hrw .hlogos figcaption{font-size:13px;color:var(--mut)}
.hrw .hlogos img{height:52px;width:auto;max-width:150px;object-fit:contain}
.hrw .about{display:grid;gap:14px;max-width:70ch;color:var(--mut);font-size:17px}.hrw .about p{margin:0}
.hrw .perk{margin:0;background:var(--line);border-radius:5px;padding:10px 12px;font-size:15px}
.hrw .night .btn{margin-top:auto;width:100%}
.hrw .steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:s}
.hrw .steps li{counter-increment:s;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:18px;color:var(--mut)}
.hrw .steps li::before{content:counter(s);display:block;font-family:var(--f-d);font-size:34px;color:var(--pink);line-height:1;margin-bottom:6px}
.hrw .steps b{display:block;color:var(--txt);font-size:18px;margin-bottom:4px}
.hrw .info{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:28px}
.hrw .info h4{font-family:var(--f-d);font-weight:400;text-transform:uppercase;font-size:20px;margin:0 0 8px;color:var(--pink)}
.hrw .info p{margin:0 0 6px;color:var(--mut)}.hrw .info strong{color:var(--txt)}
.hrw .info a{text-decoration:underline}
.hrw .copy{background:transparent;border:1px solid var(--line);color:var(--txt);border-radius:4px;padding:4px 10px;font:600 12px var(--f-b);cursor:pointer;margin-left:6px}
.hrw details{border-bottom:1px solid var(--line);padding-block:14px}
.hrw details:last-of-type{border-bottom:0}
.hrw summary{cursor:pointer;font-weight:600;font-size:17px}
.hrw details p{color:var(--mut);margin:10px 0 0;max-width:70ch}
.hrw .logos{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 32px}
.hrw .lg{display:grid;gap:12px;align-content:start;min-width:0}
.hrw .lg.wide{grid-column:span 2}
.hrw .lg h5{margin:0;font:600 12px var(--f-b);text-transform:uppercase;letter-spacing:.14em;color:var(--mut);border-bottom:1px solid var(--line);padding-bottom:8px}
.hrw .lg .row{display:flex;flex-wrap:wrap;align-items:center;gap:20px}
.hrw .lg a{display:block;transition:opacity .2s}.hrw .lg a:hover{opacity:.75}
.hrw .lg img{height:56px;width:auto;max-width:150px;object-fit:contain}
.hrw .lg.wide a img[src*="logo-matiz"],.hrw .lg.wide a img[src*="logo-hotel"]{height:64px;max-width:none}
.hrw footer{padding-block:32px;color:var(--mut);font-size:13px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.hrw footer p{margin:0}
@media (max-width:900px){
  .hrw .bands{grid-template-columns:1fr}
  
  .hrw .nights,.hrw .steps{grid-template-columns:1fr}
  .hrw .night{flex-direction:row}
  .hrw .night>img{width:42%;aspect-ratio:auto;height:auto;flex:none}
}
@media (max-width:700px){
  .hrw .hero{padding-block:16px 24px;gap:14px}
  .hrw .glow img{object-position:50% 30%}
  .hrw .glow::after{background:linear-gradient(180deg,rgba(11,7,16,.45) 0%,rgba(11,7,16,.75) 45%,var(--bg) 100%)}
  .hrw .tickets{grid-template-columns:1fr;gap:10px}
  .hrw .ticket{gap:3px;padding:12px}
  .hrw .tband{margin-bottom:4px}
  .hrw .tband small{display:inline;margin-left:6px}
  .hrw h1 .kicker{font-size:12px;letter-spacing:.1em;margin-bottom:6px}
  .hrw .hrlogo img{width:22vw}
}
@media (max-width:560px){
  .hrw .navlinks{display:none !important}
  .hrw .topnav{padding-block:8px}
  .hrw .topnav .logo img{height:38px}
  .hrw .menubtn{display:block}
  .hrw .mobilemenu{display:block;position:relative;z-index:3;margin-inline:-20px}
  .hrw .night{flex-direction:column}
  .hrw .night>img{width:100%;aspect-ratio:4/5}
  .hrw .logos{grid-template-columns:1fr 1fr}
  .hrw .lg img{height:46px}
}
`;
