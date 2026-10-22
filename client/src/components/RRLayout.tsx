import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { SiteMenuDesktop, SiteMenuMobile, PAGE_COLOR, type MenuSection, type PageKey } from "@/components/SiteMenu";
import { projetos, projetoHref } from "@/data/projetos";
import "@/styles/rr.css";

const onFestivalDomain = () =>
  typeof window !== "undefined" && ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);

/** Link para uma página do rockribeirao.com.br (absoluto quando estamos no todosnorock.com.br). */
export const rrHref = (path: string) => (onFestivalDomain() ? `https://www.rockribeirao.com.br${path}` : path);

export function RRHeader({ current = "rr", sections, logoHref }: { current?: PageKey; sections: MenuSection[]; logoHref?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="hd">
      <div className="wrap hd-row">
        <a href={logoHref ?? rrHref("/")} aria-label="Rock Ribeirão, início" className="shrink-0">
          <img src="/Logo%20do%20header.png" alt="Rock Ribeirão" style={{ height: 56, width: "auto", objectFit: "contain", display: "block" }} />
        </a>
        <SiteMenuDesktop current={current} sections={sections} className="hidden min-[1700px]:flex" />
        <button type="button" className="min-[1700px]:hidden" style={{ color: PAGE_COLOR[current], background: "none", border: 0, padding: 8, cursor: "pointer" }}
          aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      {open && (
        <div className="min-[1700px]:hidden"><SiteMenuMobile current={current} sections={sections} onNavigate={() => setOpen(false)} rowClassName="wrap" padX={24} /></div>
      )}
    </header>
  );
}

export function RRFooter({ extra }: { extra?: ReactNode }) {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div>
            <h3>Rock Ribeirão</h3>
            <ul>
              <li><a href={rrHref("/")}>Início</a></li>
              <li><a href={rrHref("/#ingressos")}>Ingressos</a></li>
              <li><a href={rrHref("/#patrocine")}>Como patrocinar</a></li>
              <li><a href={rrHref("/#contato")}>Contato</a></li>
            </ul>
          </div>
          <div>
            <h3>Projetos</h3>
            <ul>{projetos.map((p) => <li key={p.slug}><a href={projetoHref(p.slug)}>{p.name}</a></li>)}</ul>
          </div>
          <div>
            <h3>Hard Rock Cafe</h3>
            <ul>
              <li><a href={rrHref("/hardrock")}>Agenda e história</a></li>
              <li><a href={rrHref("/halloween")}>Halloween</a></li>
              <li><a href={rrHref("/hardrockweekend")}>Hard Rock Weekend</a></li>
            </ul>
            <h3 style={{ marginTop: 24 }}>Festivais</h3>
            <ul>
              <li><a href={rrHref("/rockrising")}>Rock Rising</a></li>
              <li><a href="https://todosnorock.com.br">Todos no Rock</a></li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="mailto:sac@rockribeirao.com.br">sac@rockribeirao.com.br</a></li>
              <li><a href="https://wa.me/551631850610">WhatsApp (16) 3185-0610</a></li>
              <li><a href="https://www.instagram.com/rockribeirao/">Instagram</a></li>
              <li><a href={rrHref("/acessibilidade")}>Declaração de Acessibilidade</a></li>
            </ul>
          </div>
        </div>
        {extra}
        <div className="ft-base"><span>Rock Ribeirão Produções · RST Soluções Ltda. · CNPJ 48.549.855/0001-00</span><span>Ribeirão Preto, SP</span></div>
      </div>
    </footer>
  );
}

export function DownloadIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>
  );
}

/** Formulário de contato (enviado pelo Formspree já usado no site). */
export function ContactForm({ subject, cityField = false, cta = "Enviar mensagem" }: { subject: string; cityField?: boolean; cta?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const data = new FormData(e.currentTarget);
      data.append("_subject", subject);
      const r = await fetch("https://formspree.io/f/xnjodyqw", { method: "POST", body: data, headers: { Accept: "application/json" } });
      setState(r.ok ? "ok" : "error");
      if (r.ok) e.currentTarget.reset();
    } catch { setState("error"); }
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="field">Nome<input name="nome" type="text" autoComplete="name" required /></label>
      <label className="field">Empresa ou prefeitura<input name="empresa" type="text" autoComplete="organization" /></label>
      <label className="field">WhatsApp<input name="whatsapp" type="tel" autoComplete="tel" required /></label>
      <label className="field">E-mail<input name="email" type="email" autoComplete="email" /></label>
      {cityField ? (
        <label className="field">Cidade de interesse<input name="cidade" type="text" /></label>
      ) : (
        <label className="field">Assunto<select name="assunto"><option>Patrocinar um projeto</option><option>Contratar um show</option><option>Elaborar um projeto cultural</option></select></label>
      )}
      <button type="submit" className="btn btn-red" style={{ alignSelf: "flex-start" }} disabled={state === "sending"}>{state === "sending" ? "Enviando…" : cta}</button>
      <p role="status" aria-live="polite" style={{ fontWeight: 700 }}>
        {state === "ok" && "Mensagem enviada. Respondemos em breve."}
        {state === "error" && "Não foi possível enviar. Tente pelo WhatsApp (16) 3185-0610."}
      </p>
    </form>
  );
}
