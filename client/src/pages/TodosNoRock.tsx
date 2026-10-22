import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { RRHeader, RRFooter, ContactForm, DownloadIcon } from "@/components/RRLayout";
import { CONTRAPARTIDAS, projetoHref, projetoAsset, pdfName } from "@/data/projetos";

declare global {
  interface Window { __bhldScript?: boolean; }
}
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "feed-id": string }, HTMLElement>;
    }
  }
}

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";
const MINT = "#5dcaa5";
const LILAC = "#b9a4f0";

const lineup = [
  { order: "13h30", name: "School of Rock", image: `${BASE}/tnr-banda-school-of-rock.jpg.jpg`, instagram: "https://www.instagram.com/schoolofrock_ribeiraopreto/" },
  { order: "14h55", name: "Santíssima Trindade", image: `${BASE}/tnr-banda-santissima-trindade.jpg`, instagram: "https://www.instagram.com/bandasantissimatrindadeoficial/" },
  { order: "17h10", name: "O Épicco", image: `${BASE}/tnr-banda-o-epicco.jpg.jpg`, instagram: "https://www.instagram.com/oepiccooficial/" },
  { order: "19h15", name: "Dirty Jack", image: `${BASE}/tnr-banda-dirty-jack.jpg.jpg`, instagram: "https://www.instagram.com/dirtyjack.acdccover/" },
  { order: "22h00", name: "Rotor", image: `${BASE}/tnr-banda-rotor.jpg.jpg`, instagram: "https://www.instagram.com/bandarotor/" },
];

const apoio = [
  { src: `${BASE}/marquesa.png`, alt: "Cervejaria Marquesa", link: "https://www.instagram.com/marquesacervejaria/", height: 76 },
  { src: `${BASE}/governo-sertaozinho.png`, alt: "Governo de Sertãozinho", height: 76 },
  { src: `${BASE}/apoio-iron.png`, alt: "Iron Suplementos", link: "https://www.instagram.com/iron.suplementos25/" },
  { src: `${BASE}/apoio-memo.png`, alt: "Choppeiras Memo", link: "https://www.instagram.com/chopeirasmemo/", height: 38 },
];
const hotelOficial = [{ src: `${BASE}/hotel-comfort.png`, alt: "Comfort Hotel Sertãozinho", link: "https://www.instagram.com/comfortsertaozinho/", height: 90 }];
const promocao = [
  { src: `${BASE}/kiss.png`, alt: "Kiss FM 105.3", link: "https://www.instagram.com/kissfmribeirao/", height: 76 },
  { src: `${BASE}/dritto.png`, alt: "Dritto Mídia", link: "https://www.instagram.com/drittomidiaooh/", height: 38 },
];
const realizacao = [
  { src: `${BASE}/Logo%20do%20header.png`, alt: "Rock Ribeirão Produções", link: "https://www.instagram.com/rockribeirao/" },
  { src: `${BASE}/mic.png`, alt: "Ministério da Cultura" },
];

const economiaCriativa = [
  { src: `${BASE}/tnr-economia-checkers-revenge.jpg`, name: "Checker's Revenge", segment: "Camisas pintadas à mão", link: "https://www.instagram.com/checkersrevenge/" },
  { src: `${BASE}/tnr-economia-sol-tattoo.jpg`, name: "Sol Tattoo e Art", segment: "Estúdio de tatuagem", link: "https://www.instagram.com/soltattoo.ink/" },
  { src: `${BASE}/tnr-economia-parpi-art.jpg`, name: "Parpi Art", segment: "Artesanato", link: "https://www.instagram.com/parpiart/" },
  { src: `${BASE}/tnr-economia-dona-nilce.jpg`, name: "Dona Nilce", segment: "Crochê", link: "https://www.instagram.com/nilcerochastz/" },
];

const galeria = [
  ["19", "Banda e equipe posando para a foto com o público ao fundo"], ["20", "Vista do palco e do público à noite"], ["62", "Vocalista cantando de braços abertos no palco do festival"],
  ["35", "Banda da School of Rock posando no palco do festival"], ["36", "Guitarrista da School of Rock no palco"], ["37", "Vocalista da School of Rock cantando no palco"],
  ["21", "Vocalista cantando no palco do festival"], ["22", "Baixista no palco do festival"], ["23", "Baixista da banda Dirty Jack no palco"],
  ["24", "Guitarrista da banda Dirty Jack em ação"], ["25", "Vocalista da banda Dirty Jack no palco"], ["26", "Banda tocando sob as luzes roxas do palco"],
  ["27", "Guitarrista no palco do festival"], ["28", "Vocalista cantando no palco do festival"], ["29", "Trombonista em apresentação no festival"],
  ["30", "Vocalista cantando no palco do festival"], ["31", "Guitarrista e vocalista no palco do festival"], ["61", "DJ segurando um disco de vinil diante do palco"],
  ["33", "Apresentador do festival com o microfone no palco"], ["38", "Vocalista e guitarrista lado a lado no palco"], ["40", "Guitarrista da banda Dirty Jack no palco"],
  ["44", "Baixista e vocalista no palco do festival"], ["46", "Comida servida na área de gastronomia do festival"], ["34", "Coruja em atração do festival"],
  ["01", "Intérprete de Libras traduzindo o show no palco"], ["02", "Tatuadora trabalhando na Vitrine da Economia Criativa"], ["03", "Crochê e panos de prato bordados na Vitrine da Economia Criativa"],
  ["04", "Bolsas e necessaires artesanais na Vitrine da Economia Criativa"], ["06", "Público no Festival Todos no Rock"], ["07", "Público no Festival Todos no Rock"],
  ["08", "Público no Festival Todos no Rock"], ["09", "Público no Festival Todos no Rock"], ["10", "Público no Festival Todos no Rock"],
  ["11", "Público no Festival Todos no Rock"], ["12", "Público no Festival Todos no Rock"], ["13", "Público no Festival Todos no Rock"],
  ["14", "Público no Festival Todos no Rock"], ["15", "Público no Festival Todos no Rock"], ["16", "Público no Festival Todos no Rock"],
  ["17", "Público no Festival Todos no Rock"], ["18", "Público no Festival Todos no Rock"], ["48", "Criança curtindo o show na grade"],
  ["49", "Família com a filha pequena no festival"], ["50", "Pai e filha posando no festival"], ["51", "Pai, mãe e filha posando no festival"],
  ["52", "Casal brindando com canecas no festival"], ["53", "Casal sorrindo no festival"], ["54", "Casal posando no meio do público"],
  ["55", "Público acompanhando o show"], ["56", "Amigos acompanhando o show"], ["57", "Amigas posando no festival"],
  ["58", "Amigas sorrindo no festival"], ["59", "Amigos posando no festival"], ["60", "Jovem e adulto fazendo o sinal do rock na grade"],
].map(([n, alt]) => ({ src: `${BASE}/tnr-galeria-${n}.jpg`, alt }));

type Logo = { src: string; alt: string; link?: string; height?: number };
function LogoRow({ title, logos }: { title: string; logos: Logo[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
      <h3 style={{ fontSize: 15, fontWeight: 800, color: LILAC }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center" }}>
        {logos.map((l) => {
          const img = <img src={l.src} alt={l.alt} style={{ height: l.height || 56, maxWidth: 260, objectFit: "contain" }} />;
          return l.link ? <a key={l.alt} href={l.link} target="_blank" rel="noopener noreferrer">{img}</a> : <span key={l.alt}>{img}</span>;
        })}
      </div>
    </div>
  );
}

export default function TodosNoRock() {
  const [verTodas, setVerTodas] = useState(false);
  const fotos = verTodas ? galeria : galeria.slice(0, 24);
  const isFestivalDomain = typeof window !== "undefined" && ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);
  const pdf = projetoAsset("todos-no-rock", pdfName("todos-no-rock"));
  const pdfHref = isFestivalDomain ? pdf : pdf;

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // No domínio do festival, usa título e favicon do festival.
  useEffect(() => {
    if (!isFestivalDomain) return;
    const previousTitle = document.title;
    document.title = "Festival Todos no Rock";
    const existingIcon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const previousHref = existingIcon?.getAttribute("href") ?? "/favicon.ico";
    let icon = existingIcon;
    if (!icon) { icon = document.createElement("link"); icon.rel = "icon"; document.head.appendChild(icon); }
    icon.type = "image/x-icon";
    icon.href = "/favicon-todosnorock.ico";
    return () => { document.title = previousTitle; if (icon) icon.href = previousHref; };
  }, [isFestivalDomain]);


  return (
    <div className="rr">
      <RRHeader current="tnr" logoHref={isFestivalDomain ? "https://www.rockribeirao.com.br" : "/"} />
      <main>
        {/* ABERTURA */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className="s-purple" style={{ padding: "56px clamp(24px, 5vw, 72px) 64px", display: "flex", flexDirection: "column", gap: 22, justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={`${BASE}/mic.png`} alt="Ministério da Cultura" style={{ height: 34, objectFit: "contain" }} />
              <span style={{ fontWeight: 700 }}>apresenta</span>
            </div>
            <h1 className="sr-only">Festival Todos no Rock</h1>
            <p className="disp" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>Rock ao vivo, gratuito e itinerante no interior paulista</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: "1 1 220px", minWidth: 0 }}>
                <div className="badges">
                  <span className="badge b-ink">Realizado em 26 de setembro de 2026</span>
                  <span className="badge b-ink">Sertãozinho, SP</span>
                  <span className="badge" style={{ background: MINT, color: "#000" }}>Entrada gratuita</span>
                </div>
                <p className="lede" style={{ color: "#ece6fb" }}>Obrigado a todos que fizeram a edição Sertãozinho acontecer!</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a className="btn btn-ink" href="#galeria">Ver como foi</a>
                  <a className="btn btn-line" href={pdfHref} download={pdfName("todos-no-rock")}><DownloadIcon />Baixar apresentação</a>
                </div>
              </div>
              <img src={`${BASE}/tnr-logo-oficial.png`} alt="Festival Todos no Rock, edição Sertãozinho" style={{ width: "clamp(140px, 15vw, 260px)", height: "auto", display: "block", flex: "0 0 auto" }} />
            </div>
          </div>
          <img src={`${BASE}/tnr-hero-bg.jpg.jpg`} alt="Público em frente ao palco do Festival Todos no Rock" style={{ width: "100%", height: "100%", minHeight: 420, objectFit: "cover", display: "block" }} />
        </section>

        {/* O FESTIVAL */}
        <section id="festival" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Rock ao vivo para todo mundo</h2>
              <p className="body muted">O Festival Todos no Rock leva rock ao vivo de qualidade para cidades do interior paulista de forma gratuita e acessível, reunindo música, gastronomia e cultura num único espaço ao ar livre.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
              {[["Rock ao vivo", "Bandas regionais e tributos a grandes nomes"], ["Itinerante", "Uma cidade diferente a cada edição"], ["Popular", "Para todos: jovens, adultos e famílias"], ["Comunitário", "Valoriza a cultura local e novos talentos"]].map(([t, d]) => (
                <div key={t} style={{ paddingTop: 18, borderTop: `3px solid ${LILAC}`, display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ fontSize: 22 }}>{t}</h3>
                  <p className="muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LINE-UP */}
        <section id="lineup" className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontWeight: 800, color: MINT }}>Quem tocou · Sertãozinho 2026</p>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>As atrações da edição Sertãozinho</h2>
              <p className="muted">26 de setembro de 2026. Cinco bandas, DJ e muito rock.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {lineup.map((b) => (
                <a key={b.name} href={b.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", background: "#161616" }}>
                  <img src={b.image} alt={b.name} loading="lazy" style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }} />
                  <span style={{ padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 800, color: MINT, fontSize: 14 }}>{b.order}</span>
                    <span className="disp" style={{ fontSize: 32 }}>{b.name}</span>
                    <span className="muted" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}><Instagram size={14} /> Ver no Instagram</span>
                  </span>
                </a>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {[
                { img: `${BASE}/tnr-dj-rod-mac.jpg.jpg`, role: "Entre os shows", name: "DJ Rod Mac", desc: "Vinil · Rock britânico clássico", link: "https://www.instagram.com/therodmac_/" },
                { img: `${BASE}/tnr-ze-do-rock.jpg.jpg`, role: "Apresentação oficial", name: "Zé do Rock", desc: "Apresentador oficial do festival", link: "https://www.instagram.com/zedorockoficial/" },
              ].map((x) => (
                <a key={x.name} href={x.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", textDecoration: "none", background: "#161616" }}>
                  <img src={x.img} alt={x.name} loading="lazy" style={{ width: 130, height: 150, objectFit: "cover", flexShrink: 0 }} />
                  <span style={{ padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 800, color: MINT, fontSize: 14 }}>{x.role}</span>
                    <span className="disp" style={{ fontSize: 30 }}>{x.name}</span>
                    <span className="muted" style={{ fontSize: 14 }}>{x.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* VITRINE DA ECONOMIA CRIATIVA */}
        <section className="s s-yellow">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
              <p style={{ fontWeight: 800 }}>Vitrine da Economia Criativa</p>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Quem empreende com criatividade também sobe ao palco</h2>
              <p className="body" style={{ fontWeight: 500 }}>O Festival Todos no Rock reserva um espaço especial para valorizar esse universo: a Vitrine da Economia Criativa. Nela, empreendedores locais expõem e vendem seus produtos gratuitamente, sem cobrança de taxas, em um ambiente pensado para dar visibilidade ao talento da região: moda, produtos culturais, instrumentos feitos por luthiers locais e gastronomia autoral, entre outros segmentos.</p>
              <p className="body" style={{ fontWeight: 500 }}>Mais do que um festival de música, o Todos no Rock é também uma plataforma para fortalecer quem empreende com criatividade em Sertãozinho e região.</p>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>Expositores 2026</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {economiaCriativa.map((ex) => (
                <a key={ex.name} href={ex.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", background: "#000", color: "#fff" }}>
                  <img src={ex.src} alt={`${ex.name}, ${ex.segment}`} loading="lazy" style={{ width: "100%", aspectRatio: "800 / 1131", objectFit: "cover", display: "block" }} />
                  <span style={{ padding: 14, display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontWeight: 800, fontSize: 17 }}>{ex.name}</span>
                    <span className="muted" style={{ fontSize: 14 }}>{ex.segment}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
              <p style={{ fontWeight: 800, color: MINT }}>Como foi · Sertãozinho 2026</p>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Um dia inteiro de rock</h2>
              <p className="body muted">Bandas no palco, tradução em Libras, Vitrine da Economia Criativa e um público que fez a festa. Veja alguns dos melhores momentos.</p>
            </div>
            <div style={{ columns: "3 240px", columnGap: 12 }}>
              {fotos.map((f) => <img key={f.src} src={f.src} alt={f.alt} loading="lazy" style={{ width: "100%", display: "block", marginBottom: 12, breakInside: "avoid" }} />)}
            </div>
            {!verTodas && galeria.length > 24 && (
              <button type="button" className="btn btn-purple" style={{ alignSelf: "center" }} onClick={() => setVerTodas(true)}>Ver mais fotos ({galeria.length - 24})</button>
            )}
            <p className="muted" style={{ textAlign: "center" }}>Siga <a href="https://www.instagram.com/todosnorock/" target="_blank" rel="noopener noreferrer" style={{ color: LILAC }}>@todosnorock</a> para ver mais fotos e vídeos.</p>
          </div>
        </section>

        {/* AÇÃO SOCIAL */}
        <section className="s s-purple">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <img src={`${BASE}/toiss.png`} alt="É Tudo Toiss" style={{ height: 72, width: "auto", objectFit: "contain", alignSelf: "flex-start" }} />
              <p style={{ fontWeight: 800, color: "#ece6fb" }}>Ação social · Festival Todos no Rock Sertãozinho</p>
              <h2 className="disp" style={{ fontSize: "clamp(40px, 4.6vw, 64px)" }}>Apoio à Instituição É Tudo Toiss</h2>
              <p className="body" style={{ color: "#ece6fb" }}>O Festival Todos no Rock Sertãozinho teve a satisfação e o orgulho de apoiar a Instituição É Tudo Toiss, que há 11 anos atua em benefício de crianças e famílias carentes na cidade. Contribuir para uma causa tão importante é o que move o espírito de mudança para uma sociedade melhor e mais justa.</p>
              <a className="btn btn-ink" href="https://www.instagram.com/etudo_toiss/" target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}><Instagram size={16} /> Conheça a Instituição</a>
            </div>
            <div style={{ background: "#000", padding: 32, display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="disp" style={{ fontSize: 44, color: MINT }}>Obrigado a quem trouxe 1 kg de alimento!</p>
              <p className="muted">Cada quilo arrecadado no ingresso solidário ajuda quem mais precisa. Gratidão a todo o público de Sertãozinho.</p>
            </div>
          </div>
        </section>

        {/* EDIÇÕES */}
        <section id="edicoes" className="s s-black">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Edições</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "20px 0", borderTop: `2px solid ${MINT}` }}>
                <span className="disp" style={{ fontSize: "clamp(32px, 4vw, 52px)", flex: "1 1 320px" }}>Sertãozinho, SP</span>
                <span className="muted" style={{ flex: "1 1 260px" }}>26 de setembro de 2026 · Cervejaria Marquesa · Lei Rouanet</span>
                <span className="badge" style={{ background: MINT, color: "#000" }}>Realizada</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "20px 0", borderTop: `2px solid ${LILAC}`, borderBottom: `2px solid ${LILAC}` }}>
                <span className="disp" style={{ fontSize: "clamp(32px, 4vw, 52px)", flex: "1 1 320px" }}>Próximas edições</span>
                <span className="muted" style={{ flex: "1 1 260px" }}>Lei Rouanet e ProAC aprovados · cidade e data definidas com o patrocinador</span>
                <span className="badge" style={{ background: LILAC, color: "#000" }}>Captação em andamento</span>
              </li>
            </ul>
          </div>
        </section>

        {/* PATROCINAR */}
        <section id="patrocinar" className="s s-purple">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ fontWeight: 800, color: MINT }}>Próximas edições</p>
              <h2 className="disp" style={{ fontSize: "clamp(52px, 6.4vw, 100px)" }}>Leve o Todos no Rock para a sua marca</h2>
              <p className="lede" style={{ color: "#ece6fb" }}>O festival é gratuito, itinerante e viabilizado por incentivo cultural. Prefeituras, secretarias de cultura e empresas podem trazer o festival para sua cidade ou apoiar as próximas edições. A cidade, o espaço e a data são definidos junto com o patrocinador.</p>
              <div className="badges"><span className="badge b-rouanet">Lei Rouanet · PRONAC 262753</span><span className="badge b-proac">ProAC ICMS · 35057</span></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a className="btn btn-ink" href={pdfHref} download={pdfName("todos-no-rock")}><DownloadIcon />Baixar apresentação (PDF)</a>
                <a className="btn btn-line" href="#contato">Quero patrocinar</a>
              </div>
            </div>
            <img src={projetoAsset("todos-no-rock", "apresentacao-capa.jpg")} alt="Capa da apresentação do Festival Todos no Rock" loading="lazy" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", boxShadow: `14px 14px 0 ${MINT}` }} />
          </div>
        </section>

        <section className="s s-black">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Sua marca no festival</h2>
              <p className="body muted">Pela Lei Rouanet, empresas tributadas pelo lucro real destinam parte do Imposto de Renda devido. Pelo ProAC ICMS, empresas que recolhem ICMS no estado de São Paulo destinam parte do imposto estadual.</p>
              <p className="body" style={{ fontWeight: 700 }}>Exemplos de contrapartidas. O pacote é negociado caso a caso, conforme a cota de patrocínio.</p>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={{ height: 44, objectFit: "contain" }} />
              </div>
            </div>
            <ul className="ruled" style={{ color: MINT }}>{CONTRAPARTIDAS.map((c) => <li key={c} style={{ color: "#fff", borderColor: MINT }}>{c}</li>)}</ul>
          </div>
        </section>

        {/* FAMÍLIA TODOS NO… */}
        <section className="s-tight s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 className="disp" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>A família Todos no…</h2>
            <div>
              {[["todos-no-samba", "Todos no Samba", "Festival de samba e economia criativa"], ["todos-no-sertanejo", "Todos no Sertanejo", "Festival de música sertaneja e economia criativa"]].map(([slug, name, desc], k) => (
                <a key={slug} href={projetoHref(slug)} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 24px", padding: "18px 0", borderTop: `2px solid ${MINT}`, borderBottom: k === 1 ? `2px solid ${MINT}` : undefined, textDecoration: "none" }}>
                  <span className="disp" style={{ fontSize: "clamp(36px, 4vw, 60px)" }}>{name}</span>
                  <span className="muted">{desc}</span>
                </a>
              ))}
            </div>
            <a href={isFestivalDomain ? "https://www.rockribeirao.com.br/#projetos" : "/#projetos"} style={{ color: LILAC, fontWeight: 700 }}>Ver todos os projetos da Rock Ribeirão</a>
          </div>
        </section>

        {/* PARCEIROS */}
        <section id="parceiros" className="s s-black rule-top">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}>
              <h2 className="disp" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>Parceiros da edição Sertãozinho</h2>
              <img src={`${BASE}/rouanet.png`} alt="Lei Rouanet" style={{ height: 56, objectFit: "contain" }} />
            </div>
            <LogoRow title="Apoio" logos={apoio} />
            <LogoRow title="Hotel oficial" logos={hotelOficial} />
            <LogoRow title="Promoção" logos={promocao} />
            <LogoRow title="Realização" logos={realizacao} />
          </div>
        </section>

        {/* INSTAGRAM */}
        <section id="instagram" className="s s-black rule-top" style={{ textAlign: "center" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <h2 className="disp" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>@todosnorock</h2>
            <p className="muted">Novidades, bastidores e chamadas das bandas.</p>
            <div style={{ width: "100%" }}><behold-widget feed-id="cdzugaIBMXksgUHHxqH3"></behold-widget></div>
            <a className="btn btn-purple" href="https://www.instagram.com/todosnorock/" target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Seguir no Instagram</a>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" data-contato className="s s-black rule-top">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Quero o Todos no Rock na minha cidade</h2>
              <p style={{ fontSize: 19, lineHeight: 1.8, fontWeight: 700 }}><a href="mailto:sac@rockribeirao.com.br" style={{ color: LILAC }}>sac@rockribeirao.com.br</a><br /><a href="https://wa.me/551631850610">WhatsApp (16) 3185-0610</a></p>
            </div>
            <ContactForm subject="Patrocínio: Festival Todos no Rock" cityField cta="Quero patrocinar" />
          </div>
        </section>
      </main>
      <RRFooter extra={<p className="muted" style={{ marginTop: 32 }}>© 2026 Festival Todos no Rock · Rock Ribeirão Produções · <a href="/acessibilidade">Declaração de Acessibilidade</a></p>} />
    </div>
  );
}
