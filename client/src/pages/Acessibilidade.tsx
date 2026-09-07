import { ArrowLeft } from "lucide-react";

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#0a0415", color: "#efe6fb", fontFamily: "inherit" },
  nav: { display: "flex", alignItems: "center", padding: "20px 24px", borderBottom: "0.5px solid #2a1050" },
  back: { display: "flex", alignItems: "center", gap: 6, color: "#a190c4", textDecoration: "none", fontSize: 14 },
  hero: { width: "100%", maxHeight: 420, objectFit: "cover", objectPosition: "center 30%", display: "block" },
  wrap: { maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" },
  h1: { fontSize: 32, color: "#cc2200", marginBottom: 8, fontWeight: 700 },
  updated: { fontSize: 13, color: "#a190c4", marginBottom: 32 },
  h2: { fontSize: 20, color: "#e0c0ff", marginTop: 36, marginBottom: 12, fontWeight: 700 },
  p: { fontSize: 15, lineHeight: 1.7, color: "#d8cdea", marginBottom: 14 },
  ul: { marginBottom: 14, paddingLeft: 20 },
  li: { fontSize: 15, lineHeight: 1.7, color: "#d8cdea", marginBottom: 8 },
  box: { background: "#12071f", border: "0.5px solid #3a1a60", borderRadius: 8, padding: "20px 24px", marginTop: 32 },
  mail: { color: "#a190c4", textDecoration: "underline" },
};

export default function Acessibilidade() {
  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <a href="/" style={s.back}><ArrowLeft size={16} /> Voltar ao início</a>
      </nav>

      <img
        src={`${BASE}/acessibilidade-hero.jpg`}
        alt="Ilustração de um grupo diverso de pessoas, incluindo uma pessoa usando cadeira de rodas e uma pessoa com bengala guia, reunidas lado a lado em frente ao palco de um show, sob luzes roxas e azuis"
        style={s.hero}
      />

      <main style={s.wrap}>
        <h1 style={s.h1}>Declaração de Acessibilidade</h1>
        <p style={s.updated}>Última revisão: setembro de 2026</p>

        <p style={s.p}>
          A Rock Ribeirão Produções está comprometida em tornar o site do Festival Todos no Rock
          e seus demais canais digitais acessíveis ao maior número possível de pessoas, incluindo
          pessoas com deficiência visual, auditiva, motora ou cognitiva. Este compromisso segue as
          diretrizes internacionais <strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines),
          nível AA, como referência de boas práticas.
        </p>
        <p style={s.p}>
          Esta declaração não afirma conformidade total ou certificação — é um registro transparente
          do que já foi implementado e do que continua em melhoria contínua.
        </p>

        <h2 style={s.h2}>O que já foi implementado</h2>
        <ul style={s.ul}>
          <li style={s.li}>Contraste de cores revisado em todo o site, atendendo à proporção mínima de 4,5:1 recomendada pela WCAG para textos.</li>
          <li style={s.li}>Texto alternativo (<code>alt</code>) em todas as imagens informativas, para leitores de tela.</li>
          <li style={s.li}>Idioma da página declarado corretamente (português do Brasil), para pronúncia correta por leitores de tela.</li>
          <li style={s.li}>Zoom e ampliação de texto liberados — nenhuma trava impede o uso de zoom do navegador.</li>
          <li style={s.li}>Estrutura de navegação por teclado em todos os links, botões e formulários.</li>
          <li style={s.li}>Campos de formulário com rótulos acessíveis, identificáveis por leitores de tela.</li>
          <li style={s.li}>Marcação semântica de cabeçalho, conteúdo principal e rodapé, facilitando a navegação por regiões.</li>
        </ul>

        <h2 style={s.h2}>O que estamos em processo de melhorar</h2>
        <ul style={s.ul}>
          <li style={s.li}>Legendas e audiodescrição em conteúdos em vídeo produzidos para o festival.</li>
          <li style={s.li}>Revisões periódicas de contraste conforme novos conteúdos e seções são adicionados ao site.</li>
        </ul>

        <h2 style={s.h2}>Encontrou um problema?</h2>
        <p style={s.p}>
          Se você encontrar alguma barreira de acessibilidade neste site, queremos saber. Entre em
          contato descrevendo o problema, a página onde ocorreu e, se possível, o navegador ou leitor
          de tela utilizado.
        </p>
        <div style={s.box}>
          <p style={{ ...s.p, marginBottom: 0 }}>
            📧 <a href="mailto:sac@rockribeirao.com.br" style={s.mail}>sac@rockribeirao.com.br</a>
          </p>
        </div>
      </main>
    </div>
  );
}
