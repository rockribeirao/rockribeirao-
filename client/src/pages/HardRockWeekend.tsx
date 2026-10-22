import { useEffect, useState } from "react";
import { RRHeader, RRFooter } from "@/components/RRLayout";

// Página de vendas do Hard Rock Weekend (19, 20 e 21/11/2026, Hard Rock Cafe Ribeirão Preto).
// Mesmo visual das outras páginas do site, na cor do evento (rosa). Imagens em client/public/hardrockweekend/.

const IMG = "/hardrockweekend";
const ACC = "#ff5fa2";
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

const grupos: { titulo: string; logos: Logo[] }[] = [
  { titulo: "Local", logos: [{ src: `${IMG}/logo-hardrock.png`, alt: "Hard Rock Cafe Ribeirão Preto", href: "https://www.instagram.com/hrc.ribeiraopreto/" }] },
  { titulo: "Realização", logos: [{ src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/" }] },
  { titulo: "Hotéis parceiros", logos: [
    { src: `${IMG}/logo-matiz.png`, alt: "Matiz Hotel Vilabom Ribeirão Preto", href: "https://www.instagram.com/matizribeiraopreto/" },
    { src: `${IMG}/logo-hotel-jp.png`, alt: "Hotel JP Ribeirão Preto", href: "https://www.instagram.com/hoteljprp/" },
  ] },
  { titulo: "Promoção", logos: [{ src: `${IMG}/logo-kiss.png`, alt: "Kiss FM 105,3", href: "https://www.instagram.com/kissfmribeirao/" }] },
  { titulo: "Apoio", logos: [
    { src: `${IMG}/logo-school.png`, alt: "School of Rock Ribeirão Preto", href: "https://www.instagram.com/schoolofrock_ribeiraopreto/" },
    { src: `${IMG}/logo-dritto.png`, alt: "Dritto Mídia Out of Home", href: "https://www.instagram.com/drittomidiaooh/" },
  ] },
];

export default function HardRockWeekend() {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hard Rock Weekend: 3 noites de rock no Hard Rock Cafe Ribeirão Preto | Rock Ribeirão";
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => { document.title = prevTitle; };
  }, []);

  const copiar = () => {
    navigator.clipboard?.writeText(TEL_RESERVA_DIGITS).then(
      () => { setCopiado(true); setTimeout(() => setCopiado(false), 2500); },
      () => {}
    );
  };

  const H2 = { fontSize: "clamp(48px, 5.6vw, 84px)" };

  return (
    <div className="rr" style={{ ["--acc" as string]: ACC } as React.CSSProperties}>
      <RRHeader current="hrw" />
      <main>
        {/* ABERTURA */}
        <section className="ev-hero">
          <div className="ev-hero-txt s-acc">
            <h1 style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="kick">3 noites de rock no feriadão · 19, 20 e 21/11</span>
              <span className="disp ev-h1">Hard Rock Weekend</span>
              <span className="kick" style={{ fontSize: 20 }}>no Hard Rock Cafe Ribeirão Preto</span>
            </h1>
            <div className="ev-tickets" id="ingressos">
              {NIGHTS.map((n) => (
                <a key={n.key} className="ev-ticket" href={n.link} target="_blank" rel="noopener noreferrer">
                  <span className="d">{n.date}</span>
                  <span className="n"><b>{n.band} · {n.sub}</b><span>{n.weekday.split(" · ")[0]} · 21h</span></span>
                  <span className="go">Comprar ingresso · {n.date}</span>
                </a>
              ))}
            </div>
            <p style={{ fontWeight: 700 }}>Ingressos pelo Sympla · Casa abre às 18h, shows a partir das 21h</p>
          </div>
          <div className="ev-hero-media">
            <picture>
              <source media="(max-width:700px)" srcSet={`${IMG}/hero-mobile.webp`} />
              <img className="ev-hero-img" src={`${IMG}/hero-desktop.webp`} alt="Palco do Hard Rock Cafe com luzes rosa e público" fetchPriority="high" />
            </picture>
            <a className="ev-hero-logo ev-logo-smoke" href="https://www.instagram.com/hrc.ribeiraopreto/" target="_blank" rel="noopener noreferrer">
              <img src={`${IMG}/logo-hardrock.png`} alt="Hard Rock Cafe Ribeirão Preto" width={408} height={320} />
            </a>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
            <h2 className="disp" style={H2}>Três noites, três shows</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p className="lede">De 19 a 21 de novembro, o Hard Rock Cafe Ribeirão Preto vira o endereço do rock. São três noites seguidas, com três shows ao vivo, e cada uma tem um som diferente: o tributo ao Guns N' Roses na quinta, o glam rock dos anos 80 na sexta e os clássicos do rock no sábado.</p>
              <p className="body muted">Chegou cedo, ganhou a próxima noite: os 30 primeiros que chegarem até 19h30 na quinta ganham ingresso para a sexta, e os 30 primeiros da sexta ganham ingresso para o sábado. A casa abre às 18h e os shows começam às 21h.</p>
              <p className="body muted">Vem de fora? Os hotéis parceiros têm hospedagem para o fim de semana. Ingressos pelo Sympla, um para cada noite.</p>
            </div>
          </div>
        </section>

        {/* OS SHOWS */}
        <section id="noites" className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 className="disp" style={H2}>Os shows</h2>
              <p className="lede muted">Quinta, sexta e sábado de rock ao vivo. Cada noite tem o seu ingresso no Sympla.</p>
            </div>
            {NIGHTS.map((n) => (
              <article className="ev-night" key={n.key}>
                <img src={n.art} alt={n.alt} loading="lazy" />
                <div className="bd">
                  <div className="ev-date"><span className="d">{n.date}</span><span className="w">{n.weekday}</span><span className="muted">a partir das 21h</span></div>
                  <h3 className="disp" style={{ fontSize: 48 }}>{n.band} <span className="kick" style={{ fontStretch: "100%", textTransform: "none", fontSize: 18 }}>{n.sub}</span></h3>
                  <ul className="ev-perks">
                    {FACTS[n.key].map((f) => <li key={f}>{f}</li>)}
                    <li><b>{n.key === "radio" ? "Encerramento" : "30 primeiros"}</b>{n.perk}</li>
                  </ul>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span className="kick" style={{ color: ACC }}>Hotel parceiro</span>
                    <img src={HOTEL_LOGO[n.hotel]} alt={n.hotel} style={{ height: 44, width: "auto" }} loading="lazy" />
                  </div>
                  <a className="btn btn-acc" href={n.link} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}>Comprar ingresso · {n.date}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AÇÃO DOS 30 PRIMEIROS */}
        <section id="acao" className="s s-acc">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 820 }}>
              <h2 className="disp" style={H2}>Ação dos 30 primeiros</h2>
              <p className="lede" style={{ fontWeight: 500 }}>Chegou cedo, ganhou a noite seguinte. Quem entra primeiro leva ingresso de cortesia para o próximo show.</p>
            </div>
            <ol className="ev-steps">
              <li><b>Compre o ingresso</b>Garanta a sua noite no Sympla (quinta ou sexta).</li>
              <li><b>Chegue até 19h30</b>A casa abre às 18h. Os 30 primeiros a chegar entram na ação.</li>
              <li><b>Ganhe a próxima noite</b>Quinta leva ingresso para a sexta. Sexta leva ingresso para o sábado.</li>
            </ol>
          </div>
        </section>

        {/* SERVIÇO */}
        <section id="servico" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <h2 className="disp" style={H2}>Serviço</h2>
            <div className="ev-info">
              <div>
                <h3>Local</h3>
                <p><strong>Hard Rock Cafe Ribeirão Preto</strong></p>
                <p>R. Edgar Rodrigues, 200, Ribeirão Preto, SP</p>
                <p><a href="https://maps.google.com/?q=Hard+Rock+Cafe+Ribeir%C3%A3o+Preto" target="_blank" rel="noopener noreferrer">Abrir no mapa</a></p>
              </div>
              <div>
                <h3>Horários</h3>
                <p>Casa abre às 18h.</p>
                <p>Shows a partir das 21h nas três noites.</p>
              </div>
              <div>
                <h3>Reserva de mesa</h3>
                <p>Telefone <strong><a href={`tel:+55${TEL_RESERVA_DIGITS}`}>{TEL_RESERVA}</a></strong><button className="copy" type="button" onClick={copiar}>{copiado ? "Copiado" : "Copiar"}</button></p>
                <p>Somente após a compra do ingresso. Reservas mantidas até 19h30.</p>
              </div>
              <div>
                <h3>Hotéis parceiros</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                  <figure style={{ display: "flex", flexDirection: "column", gap: 6 }}><img src={`${IMG}/logo-matiz.png`} alt="Matiz Hotel Vilabom" style={{ height: 48, width: "auto", objectFit: "contain", alignSelf: "flex-start" }} /><figcaption className="muted" style={{ fontSize: 14 }}>Quinta, 19/11</figcaption></figure>
                  <figure style={{ display: "flex", flexDirection: "column", gap: 6 }}><img src={`${IMG}/logo-hotel-jp.png`} alt="Hotel JP" style={{ height: 48, width: "auto", objectFit: "contain", alignSelf: "flex-start" }} /><figcaption className="muted" style={{ fontSize: 14 }}>Sexta e sábado, 20 e 21/11</figcaption></figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PERGUNTAS */}
        <section className="s s-black rule-top">
          <div className="wrap ev-faq" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="disp" style={H2}>Perguntas frequentes</h2>
            <div>
              <details><summary>Preciso comprar um ingresso para cada noite?</summary><p>Sim, cada noite tem o seu ingresso no Sympla. Quem chegar entre os 30 primeiros na quinta ou na sexta, até 19h30, ganha o ingresso da noite seguinte.</p></details>
              <details><summary>A que horas começam os shows?</summary><p>A casa abre às 18h e os shows começam às 21h nas três noites.</p></details>
              <details><summary>Posso reservar mesa sem ingresso?</summary><p>Não. A reserva é feita por telefone somente depois da compra do ingresso e fica mantida até 19h30.</p></details>
              <details><summary>Venda e consumo de bebidas para menores?</summary><p>Venda e consumo de bebidas alcoólicas são proibidos para menores de 18 anos.</p></details>
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
    </div>
  );
}
