import { useEffect } from "react";
import { RRHeader, RRFooter } from "@/components/RRLayout";

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

export default function Acessibilidade() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Declaração de Acessibilidade | Rock Ribeirão";
    return () => { document.title = prev; };
  }, []);

  const H2 = { fontSize: "clamp(36px, 4vw, 52px)", marginTop: 24 };

  return (
    <div className="rr">
      <RRHeader />
      <main>
        <section className="ev-hero">
          <div className="ev-hero-txt s-purple">
            <p className="kick" style={{ color: "#b9a4f0" }}>Última revisão: setembro de 2026</p>
            <h1 className="disp ev-h1">Declaração de Acessibilidade</h1>
            <p className="lede" style={{ color: "#ece6fb" }}>Rock ao vivo para todo mundo, também aqui no site.</p>
          </div>
          <img className="ev-hero-img" src={`${BASE}/acessibilidade-hero.jpg`}
            alt="Ilustração de um grupo diverso de pessoas, incluindo uma pessoa usando cadeira de rodas e uma pessoa com bengala guia, reunidas lado a lado em frente ao palco de um show, sob luzes roxas e azuis"
            style={{ objectPosition: "center 30%" }} />
        </section>

        <section className="s s-black">
          <div className="wrap" style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: 20 }}>
            <p className="lede">
              A Rock Ribeirão Produções está comprometida em tornar o site do Festival Todos no Rock
              e seus demais canais digitais acessíveis ao maior número possível de pessoas, incluindo
              pessoas com deficiência visual, auditiva, motora ou cognitiva. Este compromisso segue as
              diretrizes internacionais <strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines),
              nível AA, como referência de boas práticas.
            </p>
            <p className="body muted">
              Esta declaração não afirma conformidade total ou certificação — é um registro transparente
              do que já foi implementado e do que continua em melhoria contínua.
            </p>

            <h2 className="disp" style={H2}>O que já foi implementado</h2>
            <ul className="ev-perks">
              <li>Contraste de cores revisado em todo o site, atendendo à proporção mínima de 4,5:1 recomendada pela WCAG para textos.</li>
              <li>Texto alternativo (<code>alt</code>) em todas as imagens informativas, para leitores de tela.</li>
              <li>Idioma da página declarado corretamente (português do Brasil), para pronúncia correta por leitores de tela.</li>
              <li>Zoom e ampliação de texto liberados — nenhuma trava impede o uso de zoom do navegador.</li>
              <li>Estrutura de navegação por teclado em todos os links, botões e formulários.</li>
              <li>Campos de formulário com rótulos acessíveis, identificáveis por leitores de tela.</li>
              <li>Marcação semântica de cabeçalho, conteúdo principal e rodapé, facilitando a navegação por regiões.</li>
            </ul>

            <h2 className="disp" style={H2}>O que estamos em processo de melhorar</h2>
            <ul className="ev-perks">
              <li>Legendas e audiodescrição em conteúdos em vídeo produzidos para o festival.</li>
              <li>Revisões periódicas de contraste conforme novos conteúdos e seções são adicionados ao site.</li>
            </ul>
          </div>
        </section>

        <section className="s s-yellow">
          <div className="wrap" style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Encontrou um problema?</h2>
            <p className="lede" style={{ fontWeight: 500 }}>
              Se você encontrar alguma barreira de acessibilidade neste site, queremos saber. Entre em
              contato descrevendo o problema, a página onde ocorreu e, se possível, o navegador ou leitor
              de tela utilizado.
            </p>
            <a className="btn btn-ink" href="mailto:sac@rockribeirao.com.br" style={{ alignSelf: "flex-start" }}>sac@rockribeirao.com.br</a>
          </div>
        </section>
      </main>
      <RRFooter />
    </div>
  );
}
