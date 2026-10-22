// Vercel Edge Middleware
//
// WhatsApp, Facebook, Twitter, etc. read the <title> and <meta og:...> tags
// straight from the raw HTML response — they don't run JavaScript, so the
// client-side title/favicon swap in TodosNoRock.tsx has no effect on them.
//
// Both todosnorock.com.br and rockribeirao.com.br serve the exact same
// index.html (see vercel.json rewrites), so this middleware rewrites that
// HTML on the fly, per request, based on the Host header — before it's
// sent back to the browser or crawler.

export const config = {
  // Only run on document requests, skip static assets/api routes.
  matcher: "/((?!api|assets|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|json|txt|xml)$).*)",
};

const FESTIVAL_HOSTS = ["todosnorock.com.br", "www.todosnorock.com.br"];

const FESTIVAL_OG_IMAGE =
  "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public/tnr-og-image-share.jpg";


// Link preview (title, description, image) for a page of rockribeirao.com.br.
async function withPreview(response: Response, title: string, desc: string, img: string, url: string) {
  let page = await response.text();
  page = page.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  page = page.replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/gi, "");
  page = page.replace(/<meta[^>]+name="description"[^>]*>\s*/gi, "");
  page = page.replace(/<\/head>/i, `
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
  </head>`);
  return new Response(page, { status: response.status, headers: response.headers });
}

const SITE = "https://www.rockribeirao.com.br";

// Páginas dos projetos: nome e descrição usados na prévia do link.
const PROJETOS: Record<string, [string, string]> = {
  "todos-no-rock": ["Festival Todos no Rock", "Rock autoral em praça pública, com bandas, oficinas e estrutura de festival grande. Gratuito e acessível. Lei Rouanet e ProAC aprovados."],
  "todos-no-samba": ["Festival Todos no Samba", "Um dia de samba em praça pública, com grupos da região, oficinas e uma vitrine da economia criativa local. Lei Rouanet aprovada."],
  "todos-no-sertanejo": ["Festival Todos no Sertanejo", "As raízes e as vertentes da música sertaneja em praça pública, com bandas regionais, oficinas e vitrine da economia criativa. Lei Rouanet aprovada."],
  "acustico-br-rock-banda": ["Acústico BR Rock Banda", "Os grandes clássicos do rock nacional em formato acústico com banda, com participação especial de Fernando Quesada. Lei Rouanet e ProAC aprovados."],
  "rock-simphony": ["Rock Simphony", "Banda de rock e orquestra no mesmo palco: clássicos do rock nacional e internacional em arranjos sinfônicos inéditos. ProAC aprovado."],
  "estacao-do-samba": ["Estação do Samba", "Domingos de roda de samba, com mestres de percussão, grupo anfitrião e convidados, além de oficinas abertas ao público. Lei Rouanet aprovada."],
  "especial-de-natal": ["Especial de Natal", "Dez dias de Natal na praça: música, teatro, dança, cenografia iluminada e show de abertura com artista nacional. Lei Rouanet aprovada."],
  "agrocult": ["AgroCult", "Agro, cultura e identidade nacional: concerto sinfônico, exposição fotográfica e simpósio sobre a cultura do campo. Lei Rouanet, Artigo 18."],
  "raizes-da-cerveja": ["Raízes da Cerveja", "Programa paulista de formação e patrimônio da cultura cervejeira: exposição, apresentações artísticas, palestras e oficinas. Lei Rouanet aprovada."],
};

export default async function middleware(request: Request) {
  const host = request.headers.get("host") || "";
  const isFestivalDomain = FESTIVAL_HOSTS.includes(host);

  const response = await fetch(request);
  const contentType = response.headers.get("content-type") || "";

  // Halloween page on rockribeirao.com.br gets its own link preview.
  const pathname = new URL(request.url).pathname.replace(/\/+$/, "");
  if (!isFestivalDomain && pathname === "/halloween" && contentType.includes("text/html")) {
    let page = await response.text();
    const title = "Halloween no Hard Rock Cafe Ribeirão Preto — 30 e 31/10";
    const desc = "Duas noites de rock no Hard Rock Cafe Ribeirão Preto: Lithium com Dri Santana (30/10) e Caaru (31/10), com concurso de fantasias.";
    const img = "https://www.rockribeirao.com.br/halloween/halloween-share.jpg";
    page = page.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
    page = page.replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/gi, "");
    // Speed for ad traffic: skip what this page doesn't use (site fonts, Instagram
    // widget, unconfigured analytics) and start the hero image and fonts right away.
    page = page.replace(/<link[^>]+fonts\.googleapis\.com\/css2[^>]*>\s*/gi, "");
    page = page.replace(/<script[^>]+behold\.so[^>]*><\/script>\s*/gi, "");
    page = page.replace(/<script[^>]*%VITE_ANALYTICS_ENDPOINT%[\s\S]*?<\/script>\s*/gi, "");
    page = page.replace(/<\/head>/i, `
    <style>html,body{background:#0f0b14}</style>
    <link rel="preload" as="image" type="image/webp" href="/halloween/halloween-hero-mobile.webp" media="(max-width:700px)" fetchpriority="high" />
    <link rel="preload" as="image" type="image/webp" href="/halloween/halloween-hero-desktop.webp" media="(min-width:701px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/halloween/logo-hardrock.png" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="634" />
    <meta property="og:url" content="https://www.rockribeirao.com.br/halloween" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
  </head>`);
    return new Response(page, { status: response.status, headers: response.headers });
  }

  // Rock Rising page on rockribeirao.com.br gets its own link preview.
  if (!isFestivalDomain && pathname === "/rockrising" && contentType.includes("text/html")) {
    let page = await response.text();
    const title = "Rock Rising 2027 — Festival de novos talentos do rock";
    const desc = "Inscrições a partir de 15/01/2027. Votação popular no site e grande final em Ribeirão Preto em 21/03. Realização Rock Ribeirão Produções, parceria Kiss FM 105.3.";
    const img = "https://www.rockribeirao.com.br/rockrising/rockrising-share.jpg";
    page = page.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
    page = page.replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/gi, "");
    page = page.replace(/<\/head>/i, `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://www.rockribeirao.com.br/rockrising" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
  </head>`);
    return new Response(page, { status: response.status, headers: response.headers });
  }

  // Hard Rock Weekend page on rockribeirao.com.br gets its own link preview.
  if (!isFestivalDomain && pathname === "/hardrockweekend" && contentType.includes("text/html")) {
    let page = await response.text();
    const title = "Hard Rock Weekend — 3 noites de rock no feriadão | Hard Rock Cafe Ribeirão Preto";
    const desc = "19/11 Tributo Guns N' Roses, 20/11 Lost80s feat. Kiko Shred e 21/11 Radio Show feat. Nando Fernandes. Shows a partir das 21h. Ingressos no Sympla.";
    const img = "https://www.rockribeirao.com.br/hardrockweekend/hardrockweekend-share.jpg";
    page = page.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
    page = page.replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/gi, "");
    page = page.replace(/<\/head>/i, `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://www.rockribeirao.com.br/hardrockweekend" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
  </head>`);
    return new Response(page, { status: response.status, headers: response.headers });
  }

  // Página do Hard Rock e páginas dos projetos: prévia própria do link.
  if (!isFestivalDomain && contentType.includes("text/html")) {
    if (pathname === "/hardrock") {
      return withPreview(response, "Rock Ribeirão no Hard Rock Cafe Ribeirão Preto — agenda e história",
        "Próximos shows com ingresso no Sympla e a história de mais de 180 shows e mais de 55 mil pessoas no Hard Rock Cafe Ribeirão Preto.",
        `${SITE}/site/share-hardrock.jpg`, `${SITE}/hardrock`);
    }
    const m = pathname.match(/^\/projetos\/([a-z0-9-]+)$/);
    if (m && PROJETOS[m[1]]) {
      const [name, desc] = PROJETOS[m[1]];
      return withPreview(response, `${name} | Rock Ribeirão Produções`, desc,
        `${SITE}/projetos/${m[1]}/share.jpg`, `${SITE}/projetos/${m[1]}`);
    }
  }

  // Only touch actual HTML documents, pass everything else through untouched.
  if (!isFestivalDomain || !contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();

  // <title>
  html = html.replace(
    /<title>.*?<\/title>/i,
    "<title>Festival Todos no Rock — Sertãozinho 2026</title>"
  );

  // favicon
  html = html.replace(
    /<link rel="icon"[^>]*>/i,
    '<link rel="icon" type="image/x-icon" href="/favicon-todosnorock.ico" />'
  );

  // Open Graph / Twitter card tags used by WhatsApp, Facebook, Twitter link previews.
  // Remove any existing og:/twitter: tags first, then inject the festival's own set
  // right before </head>, so we don't end up with duplicates from the base HTML.
  html = html.replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/gi, "");

  const festivalMetaTags = `
    <meta property="og:title" content="Festival Todos no Rock — Sertãozinho 2026" />
    <meta property="og:description" content="Festival gratuito de rock em Sertãozinho, 26 de setembro de 2026. Viabilizado pela Lei Federal de Incentivo à Cultura (Lei Rouanet)." />
    <meta property="og:image" content="${FESTIVAL_OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Festival Todos no Rock — Sertãozinho" />
    <meta property="og:url" content="https://todosnorock.com.br" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Festival Todos no Rock — Sertãozinho 2026" />
    <meta name="twitter:description" content="Festival gratuito de rock em Sertãozinho, 26 de setembro de 2026." />
    <meta name="twitter:image" content="${FESTIVAL_OG_IMAGE}" />
  </head>`;

  html = html.replace(/<\/head>/i, festivalMetaTags);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
}
