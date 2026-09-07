import { AlertCircle, Home } from "lucide-react";

const FESTIVAL_HOSTS = ["todosnorock.com.br", "www.todosnorock.com.br"];

export default function NotFound() {
  const isFestivalDomain =
    typeof window !== "undefined" && FESTIVAL_HOSTS.includes(window.location.hostname);

  const accent = isFestivalDomain ? "#b98af0" : "#cc2200";
  const buttonText = isFestivalDomain ? "#140e20" : "#ffffff";
  const bg = isFestivalDomain ? "#0a0415" : "#06020e";
  const cardBg = isFestivalDomain ? "#140e20" : "#0a0415";
  const border = isFestivalDomain ? "#3a2c52" : "#2a1050";
  const muted = "#a190c4";
  const homeHref = "/";
  const homeLabel = isFestivalDomain ? "Voltar ao início do festival" : "Voltar ao início";

  return (
    <div style={{
      minHeight: "100vh", width: "100%", display: "flex", alignItems: "center",
      justifyContent: "center", background: bg, padding: 20,
    }}>
      <div style={{
        width: "100%", maxWidth: 480, background: cardBg, border: `0.5px solid ${border}`,
        borderRadius: 16, padding: "48px 32px", textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <AlertCircle size={56} color={accent} strokeWidth={1.5} />
        </div>

        <h1 style={{ fontSize: 56, fontWeight: 700, color: accent, marginBottom: 4, lineHeight: 1 }}>404</h1>

        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#efe6fb", marginBottom: 16 }}>
          Página não encontrada
        </h2>

        <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginBottom: 32 }}>
          A página que você procura não existe.
          <br />
          Ela pode ter sido movida ou removida.
        </p>

        <a
          href={homeHref}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: accent, color: buttonText, padding: "12px 24px",
            borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15,
          }}
        >
          <Home size={16} /> {homeLabel}
        </a>
      </div>
    </div>
  );
}
