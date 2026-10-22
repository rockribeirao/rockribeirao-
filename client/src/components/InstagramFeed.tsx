import { useEffect } from "react";
import { Instagram } from "lucide-react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "feed-id": string }, HTMLElement>;
    }
  }
}

/** Grade de postagens do Instagram (widget Behold). O feed é criado em behold.so, uma conta do Instagram por feed. */
export function InstagramFeed({ feedId, handle, text }: { feedId: string; handle: string; text: string }) {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
  }, []);
  return (
    <section id="instagram" className="s s-black rule-top" style={{ textAlign: "center" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <h2 className="disp" style={{ fontSize: "clamp(40px, 4.4vw, 64px)" }}>@{handle}</h2>
        <p className="muted">{text}</p>
        <div style={{ width: "100%" }}><behold-widget feed-id={feedId}></behold-widget></div>
        <a className="btn btn-red" href={`https://www.instagram.com/${handle}/`} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Seguir no Instagram</a>
      </div>
    </section>
  );
}
