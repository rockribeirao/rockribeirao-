import { useEffect, useState, type FormEvent } from "react";
import { Menu, X, Download } from "lucide-react";

// Página especial: Rock Rising 2027 — festival de novos talentos do rock.
// Realização Rock Ribeirão Produções, parceria Kiss FM 105.3, apoio Fonzare Produções.
// Imagens e PDFs em client/public/rockrising/.

const IMG = "/rockrising";
const REGULAMENTO = `${IMG}/Regulamento_Rock_Rising_2027.pdf`;
const PROPOSTA = `${IMG}/Proposta_Rock_Rising_Patrocinio.pdf`;
const WHATSAPP_DIGITS = "551631850610";
const WHATSAPP_LABEL = "(16) 3185-0610";
const EMAIL = "sac@rockribeirao.com.br";
const INSCRICOES_ABREM = new Date("2027-01-15T00:00:00-03:00").getTime();

const passos = [
  { n: "01", titulo: "Inscreva", texto: "De 15/01 a 14/02, sua banda envia uma música autoral pelo site. É gratuito." },
  { n: "02", titulo: "Conquiste", texto: "O público ouve e vota aqui no site. As músicas ganham espaço na programação da Kiss FM." },
  { n: "03", titulo: "Suba no palco", texto: "As 5 mais votadas tocam na grande final, onde um júri técnico escolhe a vencedora." },
];

const etapas = [
  { data: "15/01", titulo: "Inscrições abertas", texto: "Até 14/02, aqui no site." },
  { data: "15/02", titulo: "Votação popular", texto: "Somente no site, até 14/03." },
  { data: "15/03", titulo: "Os 5 finalistas", texto: "Anúncio na Kiss FM e nas redes." },
  { data: "21/03", titulo: "Grande final", texto: "Ao vivo, júri técnico e entrada gratuita." },
];

const faixaBase = ["Inscrições 15/01", "Grave sua música", "Toque na Kiss FM", "Grande final 21/03", "Entrada gratuita", "Bandas de todo o estado"];

const logos = [
  { titulo: "Realização", src: `${IMG}/logo-rockribeirao.png`, alt: "Rock Ribeirão Produções", href: "https://www.instagram.com/rockribeirao/", cls: "lg-rr" },
  { titulo: "Parceria", src: `${IMG}/logo-kiss.png`, alt: "Kiss FM 105.3", href: "https://www.instagram.com/kissfmribeirao/", cls: "lg-kiss" },
  { titulo: "Apoio", src: `${IMG}/logo-fonzare.png`, alt: "Fonzare Produções", href: "https://www.instagram.com/fabiofonzare/", cls: "lg-fz" },
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

const DownloadIcon = () => <Download size={18} strokeWidth={2.5} aria-hidden="true" />;

export default function RockRising() {
  const contagem = useCountdown(INSCRICOES_ABREM);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Rock Rising 2027 — Festival de novos talentos do rock | Rock Ribeirão";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@500;700&display=swap";
    document.head.appendChild(link);
    window.scrollTo(0, 0);
    return () => { document.title = prevTitle; link.remove(); };
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

  return (
    <div className="rrs">
      <style>{CSS}</style>

      {/* MENU — mesmo estilo do rockribeirao.com.br */}
      <header className="head">
        <div className="wrap head-in">
          <a href="/" aria-label="Rock Ribeirão Produções — início" className="head-logo">
            <img src={`${IMG}/logo-rockribeirao-header.png`} alt="Rock Ribeirão Produções" />
          </a>
          <nav className="nav" aria-label="Menu do site">
            <a href="/">INÍCIO</a>
            <a href="/#shows">PRÓXIMOS SHOWS</a>
            <a href="https://todosnorock.com.br" className="pill pill-tnr">TODOS NO ROCK</a>
            <a href="/halloween" className="pill pill-hw">HALLOWEEN</a>
            <a href="#topo" className="pill pill-on" aria-current="page">ROCK RISING</a>
            <a href="#inscricao">INSCRIÇÃO</a>
            <a href="#patrocinio">PATROCÍNIO</a>
            <a href="/#contact">CONTATO</a>
          </nav>
          <button type="button" className="menubtn" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mnav" aria-label="Menu do site (celular)" onClick={() => setMenuOpen(false)}>
            <a href="/">INÍCIO</a>
            <a href="/#shows">PRÓXIMOS SHOWS</a>
            <a href="https://todosnorock.com.br" style={{ color: "#b090e0" }}>TODOS NO ROCK</a>
            <a href="/halloween" style={{ color: "#ff8c00" }}>HALLOWEEN</a>
            <a href="#topo" aria-current="page" className="mnav-on">ROCK RISING</a>
            <a href="#inscricao">INSCRIÇÃO</a>
            <a href="#patrocinio">PATROCÍNIO</a>
            <a href="/#contact">CONTATO</a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="topo" className="hero">
          <div className="hero-shade1" />
          <div className="hero-shade2" />
          <div className="wrap hero-in">
            <div className="kicker"><span className="live" aria-hidden="true" />Festival de novos talentos do rock · Estado de SP</div>
            <div className="hero-title">
              <h1 className="disp">
                <span className="txt-stroke">Rock</span>
                <span className="red">Rising</span>
              </h1>
              <a href="https://www.instagram.com/kissfmribeirao/" target="_blank" rel="noopener noreferrer" aria-label="Kiss FM 105.3 no Instagram" className="hero-kiss">
                <img src={`${IMG}/logo-kiss.png`} alt="Kiss FM 105.3" />
              </a>
            </div>
            <p className="hero-lead">Sua banda no ar na <b>Kiss FM 105.3</b>. Inscreva-se, conquiste o voto do público e suba no palco da grande final em Ribeirão Preto.</p>
            <div className="cd">
              <div className="eyebrow">As inscrições abrem em</div>
              <div role="timer" aria-label="Contagem regressiva para a abertura das inscrições" className="cd-row">
                {contagem.map((t) => (
                  <div key={t.r} className="cd-box"><div className="disp cd-v">{t.v}</div><div className="cd-r">{t.r}</div></div>
                ))}
              </div>
            </div>
            <div className="hero-ctas">
              <button type="button" className="btn btn-off" disabled aria-disabled="true">Inscrição · Em breve</button>
              <a href="#patrocinio" className="btn btn-light">Seja patrocinador</a>
            </div>
          </div>
          <div aria-hidden="true" className="hero-cut" />
          <div aria-hidden="true" className="hero-cut-red" />
        </section>

        {/* FAIXA */}
        <div className="marquee">
          <div className="track" aria-hidden="true">
            {faixa.map((t, i) => (
              <span key={i} className="disp mq-item">{t}<span className="mq-sep">/</span></span>
            ))}
          </div>
        </div>

        {/* PRÊMIO */}
        <section id="premio" className="wrap sec premio">
          <div className="split">
            <div className="col">
              <div className="disp txt-stroke-red big-ghost">O prêmio</div>
              <h2 className="h2-sans">Sua música produzida por profissionais e tocando na Kiss FM.</h2>
              <p className="lead">A banda vencedora ganha a produção de uma música inédita com Fábio Fonzare, da Fonzare Produções, e a Rock Ribeirão. Depois, a música toca de 1 a 2 vezes por dia na programação da Kiss FM 105.3, durante 3 meses.</p>
              <div className="stats">
                <div><div className="disp stat-v">1</div><div className="stat-r">Música produzida</div></div>
                <div><div className="disp stat-v">3</div><div className="stat-r">Meses na Kiss FM</div></div>
                <div><div className="disp stat-v">2x</div><div className="stat-r">Por dia no ar</div></div>
              </div>
              <div className="fz-card">
                <img src={`${IMG}/fabio-fonzare.jpg`} alt="Fábio Fonzare em seu estúdio" className="fz-foto" />
                <div className="fz-txt">
                  <div className="eyebrow">Produção musical</div>
                  <div className="disp fz-nome">Fábio Fonzare</div>
                  <div className="fz-sub"><img src={`${IMG}/logo-fonzare.png`} alt="Fonzare Produções" /><span>Fonzare Produções, com a Rock Ribeirão</span></div>
                </div>
              </div>
            </div>
            <div className="col premio-img">
              <div aria-hidden="true" className="premio-frame" />
              <img src={`${IMG}/estudio.jpg`} alt="Cantora gravando em estúdio, vista da técnica" />
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como" className="como">
          <div aria-hidden="true" className="como-cut" />
          <div className="wrap como-in">
            <div className="eyebrow">Como funciona</div>
            <h2 className="disp h2-disp">Do ensaio <span className="red">ao palco.</span></h2>
            <div className="passos">
              {passos.map((p) => (
                <div key={p.n} className="passo">
                  <div className="disp txt-stroke-red passo-n">{p.n}</div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSCRIÇÃO */}
        <section id="inscricao" className="wrap sec">
          <div className="split split-top">
            <div className="col">
              <div className="eyebrow">Inscrições · 15/01 a 14/02/2027</div>
              <h2 className="disp h2-disp">Chegou a <span className="txt-stroke">vez da</span> <span className="red">sua banda.</span></h2>
              <p className="lead">Gratuito e aberto a bandas de todo o estado de São Paulo. Basta uma música autoral.</p>
              <img src={`${IMG}/ensaio.jpg`} alt="Banda jovem ensaiando em estúdio" className="ensaio" />
            </div>
            <div className="col insc-box">
              <div className="disp insc-title">As inscrições abrem em <span className="red">15/01</span></div>
              <p className="lead sm">Deixe seu contato e avisamos sua banda no minuto em que as inscrições abrirem.</p>
              <form aria-label="Avise-me quando abrir" className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="fld"><label htmlFor="a-banda">Nome da banda</label><input id="a-banda" className="inp" type="text" placeholder="Ex.: Os Desafinados" /></div>
                <div className="fld"><label htmlFor="a-cidade">Cidade (SP)</label><input id="a-cidade" className="inp" type="text" placeholder="Ex.: Ribeirão Preto" /></div>
                <div className="fld"><label htmlFor="a-email">E-mail</label><input id="a-email" className="inp" type="email" placeholder="banda@email.com" /></div>
                <div className="fld"><label htmlFor="a-zap">WhatsApp</label><input id="a-zap" className="inp" type="tel" placeholder="(16) 90000-0000" /></div>
                <div className="full"><button type="button" className="btn btn-off w100" disabled aria-disabled="true">Em breve</button></div>
              </form>
              <ul className="lst">
                <li><span aria-hidden="true" className="sq" /><span>Tenha pronto o link de uma música autoral (YouTube, Spotify ou SoundCloud).</span></li>
                <li><span aria-hidden="true" className="sq" /><span>Leia o <a href={REGULAMENTO} download>regulamento (PDF)</a> antes de 15/01.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CRONOGRAMA */}
        <section id="cronograma" className="crono">
          <div className="wrap crono-in">
            <div className="crono-head">
              <h2 className="disp h2-disp crono-h">Anote <span className="white">as datas.</span></h2>
              <a href={REGULAMENTO} download className="btn btn-dark"><DownloadIcon />Baixar regulamento (PDF)</a>
            </div>
            <div className="etapas">
              {etapas.map((e) => (
                <div key={e.data} className="etapa">
                  <div aria-hidden="true" className="etapa-dot" />
                  <div className="disp etapa-d">{e.data}</div>
                  <div className="etapa-t">{e.titulo}</div>
                  <p>{e.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRANDE FINAL */}
        <section id="final" className="final">
          <div aria-hidden="true" className="final-bg" />
          <div className="final-shade" />
          <div className="wrap final-in">
            <div className="eyebrow">A grande final · Entrada gratuita</div>
            <div className="disp final-data">21<span className="red">.</span>03</div>
            <div className="final-sub">Domingo, 2027 · Ribeirão Preto · Local a ser anunciado</div>
            <div className="final-sub2">5 finalistas ao vivo · Júri técnico escolhe a vencedora</div>
            <div className="duo">
              <article className="pcard">
                <img src={`${IMG}/ze-do-rock.jpg`} alt="Zé do Rock com o microfone no palco" style={{ objectPosition: "center 30%" }} />
                <div className="pcard-txt">
                  <div className="eyebrow">Apresentação</div>
                  <div className="disp pcard-nome">Zé do Rock</div>
                  <p>Comanda a grande final e chama as 5 bandas ao palco.</p>
                </div>
              </article>
              <article className="pcard">
                <img src={`${IMG}/epicco.jpg`} alt="Vocalista do Épicco no palco" style={{ objectPosition: "center 22%" }} />
                <div className="pcard-txt">
                  <div className="eyebrow">Show de encerramento*</div>
                  <div className="disp pcard-nome">Épicco</div>
                  <p>Big band de 9 integrantes de Ribeirão Preto que mistura soul, R&amp;B, blues e rock com brasilidade. Já abriu o show da banda Kiss em Ribeirão Preto. 75 minutos de show depois das finalistas.</p>
                  <p className="nota">*A banda de encerramento pode mudar.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* REALIZAÇÃO / PARCERIA / APOIO */}
        <section className="logos">
          <div className="logos-in">
            {logos.map((l) => (
              <div key={l.titulo} className="logo-col">
                <div className="logo-t">{l.titulo}</div>
                <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.alt} no Instagram`} className="logo-a">
                  <img src={l.src} alt={l.alt} className={l.cls} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* PATROCÍNIO */}
        <section id="patrocinio" className="patro">
          <div className="wrap patro-in">
            <div className="eyebrow">Para marcas · Patrocínios até 15/12/2026</div>
            <h2 className="disp h2-disp">Sua marca <span className="red">no volume máximo.</span></h2>
            <p className="lead">Rádio, Instagram da Kiss FM e presença na grande final, de janeiro a março de 2027. Baixe a apresentação com todas as informações para patrocinadores.</p>
            <a href={PROPOSTA} download className="btn"><DownloadIcon />Baixar apresentação para patrocinadores (PDF)</a>

            <div id="contato-patrocinio" className="contato">
              <div className="contato-l">
                <div className="disp contato-h">Vamos <span className="red">conversar.</span></div>
                <p className="lead sm">Deixe seus dados e a equipe da Rock Ribeirão entra em contato para montar a melhor participação da sua marca.</p>
                <div className="contato-nome">Rock Ribeirão Produções</div>
                <a href={`https://wa.me/${WHATSAPP_DIGITS}`} target="_blank" rel="noopener noreferrer" className="contato-zap">WhatsApp {WHATSAPP_LABEL}</a>
                <a href={`mailto:${EMAIL}`} className="contato-mail">{EMAIL}</a>
              </div>
              <div className="contato-r">
                {!enviado ? (
                  <form aria-label="Contato para patrocínio" className="form form-2" onSubmit={enviarPatrocinio}>
                    <div className="fld"><label htmlFor="p-empresa">Empresa</label><input id="p-empresa" name="empresa" className="inp" type="text" required /></div>
                    <div className="fld"><label htmlFor="p-nome">Seu nome</label><input id="p-nome" name="nome" className="inp" type="text" required /></div>
                    <div className="fld"><label htmlFor="p-email">E-mail</label><input id="p-email" name="email" className="inp" type="email" /></div>
                    <div className="fld"><label htmlFor="p-tel">Telefone</label><input id="p-tel" name="telefone" className="inp" type="tel" required /></div>
                    <div className="full"><button type="submit" className="btn w100">Quero patrocinar</button></div>
                  </form>
                ) : (
                  <div role="status" className="ok">
                    <div className="disp ok-h">Recebido!</div>
                    <p className="lead sm">Abrimos o WhatsApp da Rock Ribeirão com os seus dados. É só enviar a mensagem que a equipe responde em até 1 dia útil.</p>
                    <button type="button" className="btn btn-light" onClick={() => setEnviado(false)}>Enviar outro contato</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="foot">
        <div className="wrap foot-in">
          <div className="disp foot-big">Rock Rising</div>
          <div className="foot-row">
            <div className="foot-txt">Rock Ribeirão Produções · Ribeirão Preto</div>
            <nav aria-label="Rodapé" className="foot-nav">
              <a href={REGULAMENTO} download>Regulamento (PDF)</a>
              <a href="https://www.instagram.com/rockribeirao/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.rrs{font-family:'Poppins',sans-serif;color:#fff;background:#0a0a0a;overflow-x:hidden;min-height:100vh}
.rrs *{box-sizing:border-box}
.rrs a{color:#ff4d63}.rrs a:hover{color:#ff8090}
.rrs .wrap{max-width:1280px;margin:0 auto;padding-left:24px;padding-right:24px}
.rrs .disp{font-family:'Anton','Poppins',sans-serif;text-transform:uppercase;letter-spacing:.5px;line-height:.86;font-weight:400}
.rrs .txt-stroke{color:transparent;-webkit-text-stroke:2px #fff}
.rrs .txt-stroke-red{color:transparent;-webkit-text-stroke:2px #ff4d63}
.rrs .red{color:#e8173a}.rrs .white{color:#fff}
.rrs .eyebrow{font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#ff4d63}
.rrs .lead{margin:0 0 28px;font-size:16px;line-height:1.7;color:#bdbdbd;max-width:560px}
.rrs .lead.sm{font-size:15px;margin-bottom:20px}
.rrs .h2-disp{margin:14px 0 22px;font-size:clamp(54px,7vw,100px)}
.rrs .h2-sans{margin:20px 0 18px;font-weight:800;font-size:clamp(30px,3.6vw,48px);line-height:1.1}
.rrs .sec{padding-top:120px;padding-bottom:110px}
.rrs .split{display:flex;flex-wrap:wrap;gap:56px;align-items:center}
.rrs .split-top{align-items:flex-start}
.rrs .col{flex:1 1 400px;min-width:0}

/* botões */
.rrs .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 30px;background:#e8173a;color:#fff;font-family:inherit;font-weight:800;font-size:14px;letter-spacing:1.6px;text-transform:uppercase;border:none;border-radius:2px;cursor:pointer;text-decoration:none;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)}
.rrs .btn:hover{background:#ff2e50;color:#fff}
.rrs .btn-light{background:#fff;color:#0a0a0a}.rrs .btn-light:hover{background:#ffd2d9;color:#0a0a0a}
.rrs .btn-dark{background:#0a0a0a;color:#fff}.rrs .btn-dark:hover{background:#222;color:#fff}
.rrs .btn-off,.rrs .btn-off:hover{background:#4a1520;color:#e0b3bb;cursor:not-allowed}
.rrs .w100{width:100%}

/* menu (igual ao do site) */
.rrs .head{position:sticky;top:0;z-index:50;background:#08030f;border-bottom:1px solid #2a1050}
.rrs .head-in{padding-top:16px;padding-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.rrs .head-logo img{height:56px;width:auto;display:block}
.rrs .nav{display:flex;align-items:center;gap:28px;font-family:'Roboto',sans-serif;font-size:14px;font-weight:500}
.rrs .nav a{color:#cc2200;text-decoration:none;letter-spacing:.3px}
.rrs .nav a:hover{opacity:.8;color:#cc2200}
.rrs .pill{border-radius:20px;padding:4px 12px;font-size:12px !important}
.rrs .nav .pill-tnr{color:#b090e0;border:.5px solid #6030b0}
.rrs .nav .pill-hw{color:#ff8c00;border:.5px solid #ff8c00}
.rrs .nav .pill-on{color:#fff;background:#cc2200;border:.5px solid #cc2200}
.rrs .menubtn{display:none;background:transparent;border:none;color:#cc2200;padding:8px;cursor:pointer;min-width:44px;min-height:44px;align-items:center;justify-content:center}
.rrs .mnav{display:flex;flex-direction:column;border-top:1px solid #2a1050;background:#08030f;font-family:'Roboto',sans-serif;font-size:16px;font-weight:500}
.rrs .mnav a{color:#cc2200;text-decoration:none;padding:14px 24px}
.rrs .mnav .mnav-on{color:#fff;background:#1a0a0a;border-left:3px solid #cc2200}
@media (max-width:1000px){.rrs .nav{display:none}.rrs .menubtn{display:inline-flex}}
@media (min-width:1001px){.rrs .mnav{display:none}}

/* hero */
.rrs .hero{position:relative;min-height:92vh;background:url(${IMG}/palco.jpg) 65% center/cover}
.rrs .hero-shade1{position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,6,6,.92) 0%,rgba(6,6,6,.72) 45%,rgba(6,6,6,.15) 100%)}
.rrs .hero-shade2{position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,10,10,.9) 0%,rgba(10,10,10,0) 35%)}
.rrs .hero-in{position:relative;padding-top:clamp(70px,10vw,130px);padding-bottom:150px;display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.rrs .kicker{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase}
.rrs .live{width:10px;height:10px;border-radius:50%;background:#e8173a;flex:none;animation:rrs-pulse 1.4s ease-in-out infinite}
.rrs .hero-title{display:flex;flex-wrap:wrap;align-items:flex-end;gap:12px clamp(20px,3vw,44px)}
.rrs .hero-title h1{margin:0;font-size:clamp(96px,19vw,260px)}
.rrs .hero-title h1 span{display:block}
.rrs .hero-kiss{display:block;margin-bottom:clamp(6px,1.2vw,18px)}
.rrs .hero-kiss img{width:clamp(90px,11vw,170px);height:auto;display:block}
.rrs .hero-lead{margin:6px 0 0;max-width:600px;font-size:clamp(17px,1.6vw,21px);line-height:1.55;color:#ececec;font-weight:300}
.rrs .hero-lead b{font-weight:700}
.rrs .cd{margin-top:22px;display:flex;flex-direction:column;gap:12px}
.rrs .cd .eyebrow{font-size:12px}
.rrs .cd-row{display:flex;flex-wrap:wrap;gap:10px}
.rrs .cd-box{min-width:92px;background:rgba(10,10,10,.75);border:1px solid #3a3a3a;padding:12px 14px;text-align:center}
.rrs .cd-v{font-size:52px;line-height:1}
.rrs .cd-r{font-size:11px;letter-spacing:2px;color:#bdbdbd;text-transform:uppercase;margin-top:6px}
.rrs .hero-ctas{display:flex;flex-wrap:wrap;gap:14px;margin-top:22px}
.rrs .hero-cut{position:absolute;left:0;right:0;bottom:-1px;height:90px;background:#0a0a0a;clip-path:polygon(0 100%,100% 0,100% 100%)}
.rrs .hero-cut-red{position:absolute;left:0;right:0;bottom:-1px;height:96px;background:#e8173a;clip-path:polygon(0 94%,100% 0,100% 6%,0 100%)}

/* faixa */
.rrs .marquee{background:#e8173a;overflow:hidden;transform:rotate(-1.5deg);margin:26px -20px 0;border-top:3px solid #0a0a0a;border-bottom:3px solid #0a0a0a}
.rrs .track{display:flex;width:max-content;animation:rrs-marquee 28s linear infinite}
.rrs .mq-item{font-size:34px;padding:14px 22px;white-space:nowrap;line-height:1}
.rrs .mq-sep{color:#0a0a0a;padding-left:44px}
@keyframes rrs-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rrs-pulse{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion:reduce){.rrs .track,.rrs .live{animation:none}}

/* prêmio */
.rrs .big-ghost{font-size:clamp(70px,10vw,140px)}
.rrs .stats{display:flex;flex-wrap:wrap;gap:34px}
.rrs .stat-v{font-size:64px;color:#e8173a;line-height:1}
.rrs .stat-r{font-size:13px;color:#bdbdbd;letter-spacing:1.5px;text-transform:uppercase;margin-top:6px}
.rrs .fz-card{margin-top:36px;display:flex;flex-wrap:wrap;background:#141414;border-left:5px solid #e8173a;max-width:560px}
.rrs .fz-foto{width:160px;height:160px;object-fit:cover;object-position:center 20%;display:block;flex:none}
.rrs .fz-txt{flex:1 1 220px;padding:18px 22px;display:flex;flex-direction:column;justify-content:center;gap:4px}
.rrs .fz-txt .eyebrow{font-size:12px;letter-spacing:2.5px}
.rrs .fz-nome{font-size:34px;line-height:1}
.rrs .fz-sub{display:flex;align-items:center;gap:10px;margin-top:8px;font-size:14px;color:#cfcfcf}
.rrs .fz-sub img{width:36px;height:36px;object-fit:contain;flex:none}
.rrs .premio-img{position:relative}
.rrs .premio-frame{position:absolute;inset:22px -22px -22px 22px;border:3px solid #e8173a}
.rrs .premio-img img{position:relative;display:block;aspect-ratio:4/3;width:100%;object-fit:cover;clip-path:polygon(0 0,100% 0,100% 88%,88% 100%,0 100%)}

/* como funciona */
.rrs .como{position:relative;background:#111}
.rrs .como-cut{height:70px;background:#0a0a0a;clip-path:polygon(0 0,100% 0,0 100%)}
.rrs .como-in{padding-top:50px;padding-bottom:110px}
.rrs .como .h2-disp{margin-bottom:56px}
.rrs .passos{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2px;background:#2a2a2a}
.rrs .passo{background:#111;padding:36px 30px 40px}
.rrs .passo-n{font-size:110px;line-height:.9}
.rrs .passo h3{margin:22px 0 10px;font-size:24px;font-weight:800;text-transform:uppercase;letter-spacing:.5px}
.rrs .passo p{margin:0;font-size:15px;line-height:1.7;color:#bdbdbd}

/* inscrição */
.rrs .ensaio{aspect-ratio:4/3;width:100%;object-fit:cover;object-position:center 40%;display:block;clip-path:polygon(0 0,100% 0,100% 100%,12% 100%,0 88%)}
.rrs .insc-box{flex:1.2 1 440px;background:#141414;border-top:5px solid #e8173a;padding:38px 32px}
.rrs .insc-title{font-size:48px;margin-bottom:20px}
.rrs .form{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.rrs .form-2{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.rrs .fld{display:flex;flex-direction:column;gap:7px}
.rrs .fld label{font-size:13px;font-weight:600;color:#e2e2e2}
.rrs .full{grid-column:1 / -1}
.rrs .inp{width:100%;background:#111;border:1px solid #3a3a3a;color:#fff;font-family:inherit;font-size:15px;padding:13px 14px;border-radius:2px;min-height:50px}
.rrs .inp:focus{outline:2px solid #e8173a;outline-offset:1px;border-color:#e8173a}
.rrs .lst{margin:26px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px}
.rrs .lst li{display:flex;gap:12px;font-size:14px;color:#d6d6d6;line-height:1.5}
.rrs .lst li > span:last-child{flex:1}
.rrs .sq{flex:none;width:9px;height:9px;background:#e8173a;margin-top:6px}

/* cronograma */
.rrs .crono{background:#e8173a;color:#0a0a0a}
.rrs .crono-in{padding-top:90px;padding-bottom:100px}
.rrs .crono-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px;margin:0 0 50px}
.rrs .crono-h{margin:0;color:#0a0a0a}
.rrs .etapas{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));border-top:4px solid #0a0a0a}
.rrs .etapa{padding:26px 22px 10px 0}
.rrs .etapa-dot{width:18px;height:18px;background:#0a0a0a;margin:-37px 0 22px}
.rrs .etapa-d{font-size:66px;line-height:.95}
.rrs .etapa-t{margin-top:12px;font-weight:800;font-size:17px;text-transform:uppercase;letter-spacing:1px}
.rrs .etapa p{margin:8px 0 0;font-size:15px;line-height:1.55;color:#1a0005}

/* final */
.rrs .final{position:relative}
.rrs .final-bg{position:absolute;inset:0;background:url(${IMG}/plateia.jpg) center/cover}
.rrs .final-shade{position:absolute;inset:0;background:rgba(8,8,8,.6)}
.rrs .final-in{position:relative;padding-top:130px;padding-bottom:120px}
.rrs .final-data{margin:16px 0 8px;font-size:clamp(90px,15vw,210px)}
.rrs .final-sub{font-size:clamp(18px,2vw,24px);font-weight:300;color:#ececec}
.rrs .final-sub2{margin-top:10px;font-size:16px;color:#d6d6d6}
.rrs .duo{margin-top:56px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.rrs .pcard{background:rgba(12,12,12,.94);border-top:5px solid #e8173a;display:flex;flex-direction:column}
.rrs .pcard img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.rrs .pcard-txt{padding:26px 28px 30px;display:flex;flex-direction:column;gap:8px}
.rrs .pcard-txt .eyebrow{font-size:12px;letter-spacing:2.5px}
.rrs .pcard-nome{font-size:56px;line-height:1}
.rrs .pcard-txt p{margin:4px 0 0;font-size:15px;line-height:1.6;color:#cfcfcf}
.rrs .pcard-txt .nota{font-size:12px;color:#8a8a8a}

/* logos */
.rrs .logos{background:#0a0a0a;border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f}
.rrs .logos-in{max-width:1000px;margin:0 auto;padding:70px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;text-align:center}
.rrs .logo-col{display:flex;flex-direction:column;align-items:center;gap:20px}
.rrs .logo-t{font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#9a9a9a}
.rrs .logo-a{height:140px;display:flex;align-items:center;justify-content:center}
.rrs .lg-rr{max-height:140px;max-width:180px;object-fit:contain;display:block}
.rrs .lg-kiss{width:128px;height:128px;object-fit:contain;display:block}
.rrs .lg-fz{width:112px;height:112px;object-fit:contain;display:block}

/* patrocínio */
.rrs .patro{background:#111}
.rrs .patro-in{padding-top:110px;padding-bottom:110px}
.rrs .contato{margin-top:64px;background:#0a0a0a;border:1px solid #2a2a2a;padding:40px 34px;display:flex;flex-wrap:wrap;gap:44px}
.rrs .contato-l{flex:1 1 280px;min-width:0}
.rrs .contato-r{flex:1.5 1 380px;min-width:0}
.rrs .contato-h{font-size:52px;margin-bottom:14px}
.rrs .contato-nome{font-weight:700;font-size:16px}
.rrs .contato-zap{display:inline-block;margin-top:10px;font-size:18px;font-weight:700}
.rrs .contato-mail{display:block;margin-top:6px;font-size:16px;font-weight:600}
.rrs .ok{padding:30px 0}
.rrs .ok-h{font-size:52px;color:#e8173a;margin-bottom:14px}

/* rodapé */
.rrs .foot-in{padding-top:60px;padding-bottom:40px}
.rrs .foot-big{font-size:clamp(70px,13vw,180px);color:#161616;line-height:.85}
.rrs .foot-row{margin-top:30px;display:flex;flex-wrap:wrap;gap:24px;justify-content:space-between;align-items:center;border-top:1px solid #222;padding-top:26px}
.rrs .foot-txt{font-size:13px;color:#9a9a9a}
.rrs .foot-nav{display:flex;flex-wrap:wrap;gap:22px;font-size:14px}

@media (max-width:600px){
  .rrs .insc-box{padding:30px 22px}
  .rrs .contato{padding:30px 22px}
  .rrs .insc-title{font-size:40px}
  .rrs .duo{grid-template-columns:1fr}
}
`;
