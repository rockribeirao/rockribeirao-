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
  "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public/tnr-og-image.jpg.jpg";

export default async function middleware(request: Request) {
  const host = request.headers.get("host") || "";
  const isFestivalDomain = FESTIVAL_HOSTS.includes(host);

  const response = await fetch(request);
  const contentType = response.headers.get("content-type") || "";

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
    <meta property="og:image:width" content="1424" />
    <meta property="og:image:height" content="752" />
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
