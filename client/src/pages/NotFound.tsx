import { RRHeader, RRFooter } from "@/components/RRLayout";

const FESTIVAL_HOSTS = ["todosnorock.com.br", "www.todosnorock.com.br"];

export default function NotFound() {
  const isFestivalDomain = typeof window !== "undefined" && FESTIVAL_HOSTS.includes(window.location.hostname);

  return (
    <div className="rr">
      <RRHeader />
      <main>
        <section className="s s-red" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 22, width: "100%" }}>
            <p className="disp" style={{ fontSize: "clamp(120px, 20vw, 260px)" }}>404</p>
            <h1 className="disp" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>Página não encontrada</h1>
            <p className="lede">A página que você procura não existe. Ela pode ter sido movida ou removida.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn-ink" href="/">{isFestivalDomain ? "Voltar ao início do festival" : "Voltar ao início"}</a>
              {!isFestivalDomain && <a className="btn btn-line" href="/#projetos">Ver os projetos</a>}
            </div>
          </div>
        </section>
      </main>
      <RRFooter />
    </div>
  );
}
