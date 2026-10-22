import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

// Menu único do site. É o mesmo em todas as páginas (rockribeirao.com.br e todosnorock.com.br):
// cada página leva para todas as outras. A página atual aparece marcada na cor dela.
// Para incluir uma página nova no menu, acrescente um item em PAGES.

export type PageKey = "rr" | "hr" | "proj" | "tnr" | "rise" | "hw" | "hrw" | "contato";

export const PAGE_COLOR: Record<PageKey, string> = {
  rr: "#ff5533",
  hr: "#ffd23f",
  proj: "#5dcaa5",
  tnr: "#b9a4f0",
  rise: "#ffffff",
  hw: "#ff8c1a",
  hrw: "#ff5fa2",
  contato: "#ff5533",
};

// Halloween e Hard Rock Weekend saem do menu sozinhos depois da última noite.
const HALLOWEEN_END = new Date("2026-11-01T06:00:00-03:00").getTime();
const HRW_END = new Date("2026-11-22T06:00:00-03:00").getTime();

// Lista leve dos projetos (os textos completos ficam em data/projetos.ts).
const PROJETOS: [string, string][] = [
  ["todos-no-rock", "Festival Todos no Rock"],
  ["todos-no-samba", "Festival Todos no Samba"],
  ["todos-no-sertanejo", "Festival Todos no Sertanejo"],
  ["acustico-br-rock-banda", "Acústico BR Rock Banda"],
  ["rock-simphony", "Rock Simphony"],
  ["estacao-do-samba", "Estação do Samba"],
  ["especial-de-natal", "Especial de Natal"],
  ["agrocult", "AgroCult"],
  ["raizes-da-cerveja", "Raízes da Cerveja"],
];

const onFestivalDomain = () =>
  typeof window !== "undefined" && ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);

/** Link para o rockribeirao.com.br (absoluto quando estamos no todosnorock.com.br). */
const rr = (path: string) => (onFestivalDomain() ? `https://www.rockribeirao.com.br${path}` : path);
const projHref = (slug: string) =>
  slug === "todos-no-rock" ? (onFestivalDomain() ? "/" : "https://todosnorock.com.br") : rr(`/projetos/${slug}`);

type Item = { key: PageKey; label: string; href: () => string; until?: number };
const PAGES: Item[] = [
  { key: "rr", label: "Início", href: () => rr("/") },
  { key: "hr", label: "Hard Rock", href: () => rr("/hardrock") },
  { key: "proj", label: "Projetos", href: () => rr("/#projetos") },
  { key: "tnr", label: "Todos no Rock", href: () => (onFestivalDomain() ? "/" : "https://todosnorock.com.br") },
  { key: "rise", label: "Rock Rising", href: () => rr("/rockrising") },
  { key: "hw", label: "Halloween", href: () => rr("/halloween"), until: HALLOWEEN_END },
  { key: "hrw", label: "Hard Rock Weekend", href: () => rr("/hardrockweekend"), until: HRW_END },
  { key: "contato", label: "Contato", href: () => rr("/#contato") },
];


// "Contato" leva ao formulário da própria página, quando ela tem um (marcado com data-contato).
// Nas páginas sem formulário, segue o link normal para o formulário da página inicial.
function goToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = document.querySelector<HTMLElement>("[data-contato]");
  if (!el) return;
  e.preventDefault();
  // Espera o menu do celular fechar (ele muda a altura do topo) antes de rolar.
  // Rola direto e corrige uma vez depois, caso fotos carregando no caminho mudem a altura da página.
  window.setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
  window.setTimeout(() => el.scrollIntoView({ block: "start" }), 700);
  if (el.id) history.replaceState(null, "", `#${el.id}`);
}

const CSS = `
.sitehd{position:sticky;top:0;z-index:60;background:#000;border-bottom:1px solid #262626;font-family:"Archivo",system-ui,sans-serif;font-stretch:100%;-webkit-font-smoothing:antialiased}
.sitehd *{box-sizing:border-box}
.sitehd .sh-row{max-width:1240px;margin:0 auto;padding:0 24px;height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.sitehd .sh-logo{display:block;flex-shrink:0;line-height:0}
.sitehd .sh-logo img{height:54px;width:auto;display:block}
.sitehd .sh-nav{display:flex;align-items:center;gap:22px;margin:0;padding:0;list-style:none}
.sitehd .sh-nav li{position:relative;margin:0}
.sitehd a.sh-link,.sitehd button.sh-link{display:inline-flex;align-items:center;gap:4px;font:inherit;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;text-decoration:none;color:#e6e6e6;background:none;border:0;padding:8px 0;cursor:pointer;border-bottom:2px solid transparent}
.sitehd a.sh-link:hover,.sitehd button.sh-link:hover{color:var(--c)}
.sitehd .sh-on{color:var(--c) !important;border-bottom-color:var(--c) !important}
.sitehd .sh-drop{position:absolute;top:100%;left:-20px;min-width:300px;background:#000;border:1px solid #333;padding:8px 0;margin:0;list-style:none;box-shadow:0 16px 40px rgba(0,0,0,.6)}
.sitehd .sh-drop a{display:block;padding:10px 20px;color:#e6e6e6;text-decoration:none;font-size:15px;font-weight:600;white-space:nowrap}
.sitehd .sh-drop a:hover,.sitehd .sh-drop a[aria-current]{color:#5dcaa5;background:#111}
.sitehd .sh-drop .sh-all{border-top:1px solid #262626;margin-top:6px;padding-top:14px;color:#5dcaa5}
.sitehd .sh-burger{display:none;background:none;border:0;padding:8px;cursor:pointer;color:#fff;line-height:0}
.sitehd .sh-mob{display:none}
.sitehd .sh-mob a{display:block;padding:12px 24px;color:#e6e6e6;text-decoration:none;font-size:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.sitehd .sh-mob a.sh-sub{text-transform:none;letter-spacing:0;font-weight:600;font-size:15px;padding:9px 24px 9px 40px;color:#bdbdbd}
.sitehd .sh-mob a.sh-on{border-bottom:0;border-left:4px solid var(--c);padding-left:20px}
.sitehd .sh-mob a.sh-sub.sh-on{padding-left:36px}
@media (max-width:1199px){
  .sitehd .sh-nav{display:none}
  .sitehd .sh-burger{display:block}
  .sitehd .sh-mob{display:block;border-top:1px solid #262626;padding:8px 0 16px;max-height:calc(100vh - 76px);overflow-y:auto}
  .sitehd .sh-row{height:68px}
  .sitehd .sh-logo img{height:42px}
}
@media (prefers-reduced-motion:reduce){.sitehd *{transition:none !important}}
`;

/** Cabeçalho padrão de todas as páginas. `project` marca o projeto atual na lista de projetos. */
export function SiteHeader({ current, project, logoHref }: { current?: PageKey; project?: string; logoHref?: string }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const items = PAGES.filter((p) => !p.until || Date.now() < p.until);

  useEffect(() => {
    if (!drop) return;
    const onDoc = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrop(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [drop]);

  const style = (k: PageKey) => ({ ["--c" as string]: PAGE_COLOR[k] }) as React.CSSProperties;
  const isOn = (k: PageKey) => k === current || (k === "tnr" && project === "todos-no-rock");

  return (
    <header className="sitehd">
      <style>{CSS}</style>
      <div className="sh-row">
        <a href={logoHref ?? rr("/")} className="sh-logo" aria-label="Rock Ribeirão Produções, início">
          <img src="/site/logo-header-rr.png" alt="Rock Ribeirão Produções" />
        </a>
        <nav aria-label="Menu do site">
          <ul className="sh-nav">
            {items.map((p) =>
              p.key === "proj" ? (
                <li key={p.key} ref={dropRef} onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                  <button type="button" className={`sh-link${isOn("proj") ? " sh-on" : ""}`} style={style("proj")} aria-expanded={drop} onClick={() => setDrop((d) => !d)}>
                    Projetos <ChevronDown size={14} aria-hidden="true" />
                  </button>
                  {drop && (
                    <ul className="sh-drop" style={{ marginTop: 0 }}>
                      {PROJETOS.map(([slug, name]) => (
                        <li key={slug}><a href={projHref(slug)} aria-current={project === slug ? "page" : undefined}>{name}</a></li>
                      ))}
                      <li><a className="sh-all" href={p.href()}>Ver todos os projetos</a></li>
                    </ul>
                  )}
                </li>
              ) : (
                <li key={p.key}>
                  <a href={p.href()} onClick={p.key === "contato" ? goToContact : undefined} className={`sh-link${isOn(p.key) ? " sh-on" : ""}`} style={style(p.key)} aria-current={isOn(p.key) ? "page" : undefined}>{p.label}</a>
                </li>
              )
            )}
          </ul>
        </nav>
        <button type="button" className="sh-burger" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <nav className="sh-mob" aria-label="Menu do site (celular)" onClick={() => setOpen(false)}>
          {items.map((p) => (
            <div key={p.key}>
              <a href={p.href()} onClick={p.key === "contato" ? goToContact : undefined} className={isOn(p.key) && p.key !== "proj" ? "sh-on" : undefined} style={style(p.key)}>{p.label}</a>
              {p.key === "proj" && PROJETOS.map(([slug, name]) => (
                <a key={slug} href={projHref(slug)} className={`sh-sub${project === slug ? " sh-on" : ""}`} style={style("proj")}>{name}</a>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
