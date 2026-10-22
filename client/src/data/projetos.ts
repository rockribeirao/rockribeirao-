// Projetos culturais aprovados (Lei Rouanet e ProAC) apresentados no site.
// Regra: nunca citar a cidade/local de execução — ela é definida com o patrocinador.
// Imagens e PDF de cada projeto ficam em client/public/projetos/<slug>/.

export type Law = { label: string; kind: "rouanet" | "proac" | "free" | "info" };
export type Projeto = {
  slug: string;
  group: "festivais" | "shows" | "formacao";
  name: string;
  shortName: string;
  billName: string;
  card: string;
  tagline: string;
  aboutTitle: string;
  about: string;
  facts: { v: string; k: string }[];
  items: { t: string; d: string }[];
  laws: Law[];
  lawText: string;
  alts: { capa: string; a: string; b: string };
};

export const GROUPS = {
  festivais: { title: "Festivais", label: "Festivais Todos no…" },
  shows: { title: "Shows e espetáculos", label: "Shows e espetáculos" },
  formacao: { title: "Formação e patrimônio", label: "Formação e patrimônio" },
} as const;

export const projetos: Projeto[] = [
  {
    slug: "todos-no-rock", group: "festivais",
    name: "Festival Todos no Rock", shortName: "Todos no Rock", billName: "Todos no Rock",
    card: "Festival gratuito de rock autoral, com bandas, oficinas e estrutura profissional de palco, som e luz.",
    tagline: "Rock autoral em praça pública, com bandas, oficinas e estrutura de festival grande. Gratuito e acessível.",
    aboutTitle: "Rock para todo mundo",
    about: "O Festival Todos no Rock leva bandas de rock a praças e espaços públicos, com estrutura profissional de palco, som e iluminação. Além dos shows, o festival promove oficinas e encontros com artistas, incentiva a música independente e forma novas plateias.",
    facts: [{ v: "Gratuito", k: "entrada franca, em espaço público" }, { v: "Autoral", k: "bandas independentes de rock" }, { v: "Oficinas", k: "e encontros com artistas" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Shows", d: "Bandas de rock autoral, com destaque para a cena independente." }, { t: "Oficinas", d: "Ações formativas para músicos, técnicos e novos produtores." }, { t: "Estrutura", d: "Palco, som e iluminação profissionais, com equipe técnica completa." }, { t: "Acessibilidade", d: "Acessibilidade física e comunicacional para pessoas com deficiência." }],
    laws: [{ label: "Lei Rouanet · PRONAC 262753", kind: "rouanet" }, { label: "ProAC ICMS · 35057", kind: "proac" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte pode ser feito pela Lei Rouanet (Imposto de Renda) ou pelo ProAC (ICMS), conforme o imposto da sua empresa.",
    alts: { capa: "Banda de rock em palco de festival com o público de braços erguidos", a: "Oficina de guitarra para jovens", b: "Intérprete de Libras ao lado do palco" },
  },
  {
    slug: "todos-no-samba", group: "festivais",
    name: "Festival Todos no Samba", shortName: "Todos no Samba", billName: "Todos no Samba",
    card: "Festival gratuito de samba com grupos da região, oficinas e vitrine da economia criativa.",
    tagline: "Um dia de samba em praça pública, com grupos da região, oficinas e uma vitrine da economia criativa local.",
    aboutTitle: "O samba na praça",
    about: "O Festival Todos no Samba difunde o samba como expressão autêntica da cultura brasileira. Reúne grupos de samba da região, ações formativas para músicos e produtores e uma vitrine para empreendedores locais, com acesso gratuito e acessibilidade.",
    facts: [{ v: "4", k: "grupos de samba" }, { v: "1 dia", k: "de festival" }, { v: "10", k: "expositores na vitrine criativa" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Shows", d: "Quatro grupos de samba da região, com apresentações de 90 a 120 minutos." }, { t: "Vitrine criativa", d: "Até 10 expositores de artesanato, gastronomia e moda, sem cobrança de taxas." }, { t: "Oficinas", d: "“Montando seu grupo musical” e “Primeiros passos na produção cultural independente”." }, { t: "Acessibilidade e registro", d: "Libras, legendas e área PCD. Minidocumentário e clipes para as redes." }],
    laws: [{ label: "Lei Rouanet · PRONAC 2511129", kind: "rouanet" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pela Lei Rouanet, com parte do Imposto de Renda devido da sua empresa.",
    alts: { capa: "Grupo de samba se apresentando em palco ao ar livre ao pôr do sol", a: "Mãos tocando pandeiro e tamborim", b: "Vitrine de economia criativa com artesãos locais" },
  },
  {
    slug: "todos-no-sertanejo", group: "festivais",
    name: "Festival Todos no Sertanejo", shortName: "Todos no Sertanejo", billName: "Todos no Sertanejo",
    card: "As raízes e vertentes da música sertaneja, com bandas regionais, oficinas e vitrine criativa.",
    tagline: "As raízes e as vertentes da música sertaneja em praça pública, com bandas regionais, oficinas e vitrine da economia criativa.",
    aboutTitle: "Das raízes ao palco",
    about: "O Festival Todos no Sertanejo celebra a música sertaneja e suas expressões regionais. São dois dias de programação gratuita: um dedicado à formação e outro ao palco, com bandas regionais, vitrine para empreendedores locais e difusão audiovisual acessível.",
    facts: [{ v: "4", k: "bandas regionais" }, { v: "2 dias", k: "um de formação e um de shows" }, { v: "Ao ar livre", k: "formato de festival" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Shows", d: "Quatro bandas regionais passeando pelas vertentes da música sertaneja." }, { t: "Oficinas", d: "Um dia de formação para músicos, técnicos e novos produtores culturais." }, { t: "Vitrine criativa", d: "Espaço para empreendedores locais de artesanato, gastronomia e moda." }, { t: "Acessibilidade e registro", d: "Recursos de acessibilidade e conteúdo audiovisual acessível para as redes." }],
    laws: [{ label: "Lei Rouanet · PRONAC 2511130", kind: "rouanet" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pela Lei Rouanet, com parte do Imposto de Renda devido da sua empresa.",
    alts: { capa: "Dupla sertaneja em palco ao ar livre com público cantando", a: "Viola caipira sendo tocada no palco", b: "Oficina de viola para jovens músicos" },
  },
  {
    slug: "acustico-br-rock-banda", group: "shows",
    name: "Acústico BR Rock Banda", shortName: "Acústico BR", billName: "Acústico BR Rock Banda",
    card: "Clássicos do rock nacional em formato acústico, com participação de Fernando Quesada.",
    tagline: "Os grandes clássicos do rock nacional em formato acústico com banda, com participação especial de Fernando Quesada.",
    aboutTitle: "O rock brasileiro, de perto",
    about: "Um espetáculo intimista que relê clássicos do rock nacional com violão, contrabaixo acústico, percussão orgânica e vozes em harmonia. Além dos shows, o projeto leva oficinas, rodas de conversa e mediação artística, com atenção especial à juventude e às cidades do interior.",
    facts: [{ v: "5", k: "apresentações gratuitas" }, { v: "4.000", k: "pessoas de público previsto" }, { v: "Acústico", k: "formato com banda" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Shows", d: "Clássicos do rock brasileiro com arranjos originais em formato acústico." }, { t: "Fernando Quesada", d: "Participação especial de uma referência do rock nacional." }, { t: "Oficinas e conversas", d: "Oficinas, rodas de conversa e mediação artística com o público." }, { t: "Conteúdo digital", d: "Registro dos shows e conteúdo acessível para as redes." }],
    laws: [{ label: "Lei Rouanet · PRONAC 2511197", kind: "rouanet" }, { label: "ProAC ICMS · 55393", kind: "proac" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte pode ser feito pela Lei Rouanet (Imposto de Renda) ou pelo ProAC (ICMS), conforme o imposto da sua empresa. Projeto em parceria com a North Star Concerts.",
    alts: { capa: "Banda acústica sentada em banquinhos diante do público", a: "Violão e cajón no palco", b: "Roda de conversa entre músicos e público" },
  },
  {
    slug: "rock-simphony", group: "shows",
    name: "Rock Simphony", shortName: "Rock Simphony", billName: "Rock Simphony",
    card: "Banda de rock e orquestra no mesmo palco, com arranjos sinfônicos inéditos.",
    tagline: "Banda de rock e orquestra no mesmo palco: clássicos do rock nacional e internacional em arranjos sinfônicos inéditos.",
    aboutTitle: "Quando o rock encontra a orquestra",
    about: "O Rock Simphony une a energia de uma banda de rock, liderada por Fernando Quesada, à formação orquestral. O repertório traz clássicos do rock e do pop rock nacional e internacional com arranjos sinfônicos inéditos, além de composições autorais.",
    facts: [{ v: "3", k: "apresentações gratuitas" }, { v: "Banda + orquestra", k: "no mesmo palco" }, { v: "Inéditos", k: "arranjos sinfônicos" }, { v: "Libras", k: "em todas as apresentações" }],
    items: [{ t: "Banda de rock", d: "Liderada por Fernando Quesada, referência do rock nacional." }, { t: "Orquestra", d: "Formação sinfônica adaptada a cada apresentação." }, { t: "Repertório", d: "Clássicos nacionais e internacionais, mais composições autorais." }, { t: "Acessibilidade", d: "Interpretação em Libras em todas as apresentações." }],
    laws: [{ label: "ProAC ICMS · 56192", kind: "proac" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pelo ProAC, com parte do ICMS devido da sua empresa. Projeto em parceria com a North Star Concerts.",
    alts: { capa: "Banda de rock tocando à frente de uma orquestra sinfônica", a: "Arco de violino ao lado de guitarra elétrica", b: "Maestro regendo orquestra com bateria ao fundo" },
  },
  {
    slug: "estacao-do-samba", group: "shows",
    name: "Estação do Samba", shortName: "Estação do Samba", billName: "Estação do Samba",
    card: "Temporada mensal de rodas de samba aos domingos, com oficinas de percussão e canto.",
    tagline: "Domingos de roda de samba, com mestres de percussão, grupo anfitrião e convidados, além de oficinas abertas ao público.",
    aboutTitle: "Todo mês tem samba",
    about: "A Estação do Samba é uma temporada de edições mensais, sempre aos domingos, com curadoria das vertentes do samba: raiz, partido-alto, samba-rock, enredo e contemporâneo. Cada edição junta roda de samba, oficinas e encontros com artistas e pesquisadores.",
    facts: [{ v: "9", k: "edições mensais" }, { v: "Domingos", k: "dia fixo da roda" }, { v: "5", k: "vertentes do samba" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Roda de samba", d: "Mestres de percussão, grupo anfitrião local e convidado regional ou nacional." }, { t: "Oficinas", d: "Percussão (surdo, repique, tamborim), canto coletivo e história do samba." }, { t: "Rodas de conversa", d: "Encontros com artistas e pesquisadores sobre repertório e memória." }, { t: "Ensaio aberto", d: "O público acompanha o processo criativo antes do show principal." }],
    laws: [{ label: "Lei Rouanet · PRONAC 2511333", kind: "rouanet" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pela Lei Rouanet, com parte do Imposto de Renda devido da sua empresa.",
    alts: { capa: "Roda de samba de domingo em pátio de antiga estação", a: "Mestre de percussão ensinando jovens a tocar surdo", b: "Sambista cantando na roda" },
  },
  {
    slug: "especial-de-natal", group: "shows",
    name: "Especial de Natal", shortName: "Especial de Natal", billName: "Especial de Natal",
    card: "Dias de programação natalina gratuita, com show de abertura de artista nacional.",
    tagline: "Dez dias de Natal na praça: música, teatro, dança, cenografia iluminada e show de abertura com artista nacional.",
    aboutTitle: "O Natal da cidade inteira",
    about: "O Especial de Natal transforma um espaço público em um grande cenário natalino, com programação artística gratuita durante dez dias. O ponto alto é o show de abertura com um artista nacional convidado, acompanhado por um grupo local, unindo cultura popular e profissional.",
    facts: [{ v: "10 dias", k: "de programação gratuita" }, { v: "1", k: "show de abertura com artista nacional" }, { v: "4", k: "linguagens: música, teatro, dança e intervenções" }, { v: "Livre", k: "classificação indicativa" }],
    items: [{ t: "Show de abertura", d: "Artista nacional convidado, acompanhado por um grupo local." }, { t: "Teatro, dança e música", d: "Apresentações e intervenções artísticas com tema natalino." }, { t: "Cenografia", d: "Iluminação e decoração natalina que viram ponto de encontro da cidade." }, { t: "Praça gastronômica e oficinas", d: "Empreendedores locais, atividades para crianças, oficinas e transmissões digitais." }],
    laws: [{ label: "Lei Rouanet · PRONAC 2511030", kind: "rouanet" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pela Lei Rouanet, com parte do Imposto de Renda devido da sua empresa.",
    alts: { capa: "Praça decorada para o Natal com árvore iluminada e famílias", a: "Crianças assistindo a uma peça de Natal", b: "Praça gastronômica com empreendedores locais" },
  },
  {
    slug: "agrocult", group: "formacao",
    name: "AgroCult", shortName: "AgroCult", billName: "AgroCult",
    card: "Concerto sinfônico, exposição e simpósio sobre a cultura do campo na identidade brasileira.",
    tagline: "Agro, cultura e identidade nacional: concerto sinfônico, exposição fotográfica e simpósio sobre a cultura do campo.",
    aboutTitle: "O campo no palco",
    about: "O AgroCult celebra a contribuição do agronegócio para a formação da identidade brasileira, unindo música, artes visuais e reflexão. São dois dias com concerto sinfônico temático, exposição de fotos de famílias do agro e um simpósio cultural com rodas de conversa.",
    facts: [{ v: "2 dias", k: "de evento" }, { v: "1.000+", k: "pessoas de público previsto" }, { v: "12", k: "painéis na exposição fotográfica" }, { v: "4", k: "rodas de conversa no simpósio" }],
    items: [{ t: "Concerto sinfônico", d: "Orquestra e solistas líricos, com repertório e narrativa sobre a cultura do campo." }, { t: "Exposição fotográfica", d: "12 painéis em acrílico com imagens e histórias de famílias do agro." }, { t: "Simpósio cultural", d: "Rodas de conversa sobre agro, cultura, identidade e desenvolvimento regional." }, { t: "Acesso e registro", d: "Entrada gratuita, Libras, espaço acessível e registro audiovisual completo." }],
    laws: [{ label: "Lei Rouanet · PRONAC 262630", kind: "rouanet" }, { label: "Artigo 18: 100% dedutível", kind: "info" }, { label: "Gratuito", kind: "free" }],
    lawText: "Projeto enquadrado no Artigo 18 da Lei Rouanet: a empresa patrocinadora pode abater 100% do valor aportado do Imposto de Renda devido, dentro do limite de 4%.",
    alts: { capa: "Orquestra se apresentando ao ar livre diante de plantações ao pôr do sol", a: "Exposição fotográfica com retratos de famílias do campo", b: "Roda de conversa em simpósio cultural" },
  },
  {
    slug: "raizes-da-cerveja", group: "formacao",
    name: "Raízes da Cerveja", shortName: "Raízes da Cerveja", billName: "Raízes da Cerveja",
    card: "Exposição, shows e oficinas sobre a história e os saberes da cultura cervejeira paulista.",
    tagline: "Programa paulista de formação e patrimônio da cultura cervejeira: exposição, apresentações artísticas, palestras e oficinas.",
    aboutTitle: "A história que está no copo",
    about: "O Raízes da Cerveja valoriza a cultura cervejeira paulista como patrimônio cultural imaterial: as tradições da imigração, os saberes artesanais e sua presença na identidade de São Paulo. Reúne pesquisadores, mestres de saberes, artistas e o público em uma programação gratuita.",
    facts: [{ v: "Exposição", k: "histórico-cultural com acervo e audiovisual" }, { v: "Shows", k: "e intervenções artísticas" }, { v: "Oficinas", k: "palestras, seminários e mesas-redondas" }, { v: "Libras", k: "audiodescrição e legendagem" }],
    items: [{ t: "Exposição", d: "Documentos, fotografias, objetos e audiovisual sobre a evolução da cultura cervejeira paulista." }, { t: "Apresentações artísticas", d: "Música, performances e intervenções inspiradas nas tradições cervejeiras." }, { t: "Formação", d: "Palestras, seminários e oficinas sobre história, patrimônio, gastronomia e empreendedorismo." }, { t: "Memória", d: "Registro fotográfico e audiovisual disponibilizado gratuitamente em plataformas digitais." }],
    laws: [{ label: "Lei Rouanet · PRONAC 269178", kind: "rouanet" }, { label: "Gratuito", kind: "free" }],
    lawText: "O aporte é feito pela Lei Rouanet, com parte do Imposto de Renda devido da sua empresa. Projeto com afinidade natural para cervejarias, distribuidoras e marcas de gastronomia.",
    alts: { capa: "Exposição sobre a história da cerveja com tachos de cobre e fotos antigas", a: "Mãos de cervejeiro artesanal com cevada e lúpulo", b: "Apresentação musical em festival cervejeiro" },
  },
];

export const CONTRAPARTIDAS = [
  "Marca em todo o material de divulgação",
  "Rádio, mídia indoor, out of home e outdoor",
  "Posts impulsionados nas redes sociais",
  "Marca no telão e no vídeo institucional",
  "Menção do apresentador no palco",
  "Espaço no evento para ativação da marca",
  "Escolha da cidade e da data junto com a produção",
  "Relatório final com fotos, vídeos, público e alcance",
];

const onFestivalDomain = () =>
  typeof window !== "undefined" && ["todosnorock.com.br", "www.todosnorock.com.br"].includes(window.location.hostname);

/** Link da página do projeto (o Todos no Rock tem domínio próprio). */
export const projetoHref = (slug: string) => {
  if (slug === "todos-no-rock") return onFestivalDomain() ? "/" : "https://todosnorock.com.br";
  return `${onFestivalDomain() ? "https://www.rockribeirao.com.br" : ""}/projetos/${slug}`;
};

export const projetoAsset = (slug: string, file: string) => `/projetos/${slug}/${file}`;
export const pdfName = (slug: string) => `Apresentacao-${slug}.pdf`;
