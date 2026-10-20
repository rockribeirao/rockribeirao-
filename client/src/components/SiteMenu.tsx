import type { CSSProperties } from "react";

// Menu padrão das páginas do site.
// Regra: primeiro as seções da página atual, na cor dela; depois as outras
// páginas, sempre na mesma ordem e cada uma na sua cor.
//   Rock Ribeirão = vermelho · Todos no Rock = lilás · Halloween = laranja · Hard Rock Weekend = rosa · Rock Rising = branco

export type PageKey = "rr" | "tnr" | "hw" | "rise" | "hrw";

export const PAGE_COLOR: Record<PageKey, string> = {
  rr: "#e8411f",
  tnr: "#b090e0",
  hw: "#ff8c00",
  rise: "#ffffff",
  hrw: "#ff5caa",
};

const PAGE_LABEL: Record<PageKey, string> = {
  rr: "Rock Ribeirão",
  tnr: "Todos no Rock",
  hw: "Halloween",
  rise: "Rock Rising",
  hrw: "Hard Rock Weekend",
};

const ORDER: PageKey[] = ["rr", "tnr", "hw", "hrw", "rise"];

// Halloween sai dos menus sozinho depois da última noite (31/10/2026).
const HALLOWEEN_END = new Date("2026-11-01T06:00:00-03:00").getTime();

// Hard Rock Weekend sai dos menus sozinho depois da última noite (21/11/2026).
const HRW_END = new Date("2026-11-22T06:00:00-03:00").getTime();

export type MenuSection = { href: string; label: string };

function onFestivalDomain() {
  return typeof window !== "undefined" && ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);
}

function pageHref(key: PageKey): string {
  // No todosnorock.com.br os links internos precisam ser absolutos.
  const base = onFestivalDomain() ? "https://www.rockribeirao.com.br" : "";
  switch (key) {
    case "rr": return base ? base : "/";
    case "tnr": return "https://todosnorock.com.br";
    case "hw": return `${base}/halloween`;
    case "rise": return `${base}/rockrising`;
    case "hrw": return `${base}/hardrockweekend`;
  }
}

function otherPages(current: PageKey): PageKey[] {
  return ORDER.filter((k) => k !== current && (k !== "hw" || Date.now() < HALLOWEEN_END) && (k !== "hrw" || Date.now() < HRW_END));
}

const label: CSSProperties = { textTransform: "uppercase", letterSpacing: ".06em", textDecoration: "none", whiteSpace: "nowrap" };

/** Menu do computador: seções em texto, outras páginas em pílula. */
export function SiteMenuDesktop({ current, sections, className = "", fontSize = 14 }: { current: PageKey; sections: MenuSection[]; className?: string; fontSize?: number }) {
  const color = PAGE_COLOR[current];
  return (
    // display (flex/hidden) vem da className de cada página, para respeitar o ponto em que o menu vira botão no celular.
    <nav className={className} aria-label="Menu do site" style={{ alignItems: "center", gap: 20, flexWrap: "nowrap" }}>
      {sections.map((s) => (
        <a key={s.href} href={s.href} style={{ ...label, color, fontSize }} className="hover:opacity-80 transition">{s.label}</a>
      ))}
      <span aria-hidden="true" style={{ width: 1, height: 18, background: "#3a2a55", margin: "0 2px" }} />
      {otherPages(current).map((k) => (
        <a key={k} href={pageHref(k)} style={{ ...label, color: PAGE_COLOR[k], fontSize: fontSize - 2, border: `1px solid ${PAGE_COLOR[k]}`, borderRadius: 20, padding: "4px 12px" }} className="hover:opacity-80 transition">{PAGE_LABEL[k]}</a>
      ))}
    </nav>
  );
}

/** Menu do celular: "Nesta página" e "Outras páginas". */
export function SiteMenuMobile({ current, sections, onNavigate, rowClassName = "", padX = 20 }: { current: PageKey; sections: MenuSection[]; onNavigate?: () => void; rowClassName?: string; padX?: number }) {
  const color = PAGE_COLOR[current];
  const head: CSSProperties = { fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#8f86a0", padding: `12px ${padX}px 4px` };
  const row: CSSProperties = { ...label, display: "block", fontSize: 16, fontWeight: 700, padding: `11px ${padX}px` };
  return (
    <nav aria-label="Menu do site (celular)" onClick={onNavigate} style={{ display: "flex", flexDirection: "column", background: "#08030f", borderTop: "1px solid #2a1050", borderBottom: "1px solid #2a1050", paddingBottom: 8 }}>
      <div style={head} className={rowClassName}>Nesta página</div>
      {sections.map((s) => (
        <a key={s.href} href={s.href} style={{ ...row, color }} className={rowClassName}>{s.label}</a>
      ))}
      <div style={{ height: 1, background: "#2a1050", margin: `8px ${padX}px` }} />
      <div style={head} className={rowClassName}>Outras páginas</div>
      {otherPages(current).map((k) => (
        <a key={k} href={pageHref(k)} style={{ ...row, color: PAGE_COLOR[k] }} className={rowClassName}>{PAGE_LABEL[k]}</a>
      ))}
    </nav>
  );
}
