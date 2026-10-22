// Agenda de shows da Rock Ribeirão.
// Para adicionar um show: inclua um objeto em upcomingShows (id único!).
// - image: cartaz 4:5 (card na página do Hard Rock)
// - bannerImage: banner 1600x838 (entra sozinho no carrossel da Home)
// - link: Sympla (botão "Comprar ingresso"); carouselLink: destino do banner, se for diferente
// O show sai da agenda e vai para o histórico no dia seguinte à data.

export const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

export interface Show {
  id: number;
  name: string;
  subtitle?: string;
  subtitleColor?: string;
  date: string;
  month: string;
  time: string;
  venue: string;
  realized?: boolean;
  partnership?: boolean;
  partnerName?: string;
  hotelPartner?: string;
  link?: string;
  linkLabel?: string;
  carouselLink?: string;
  image?: string;
  bannerImage?: string;
  free?: boolean;
  hideFreeBadge?: boolean;
}

export const upcomingShows: Show[] = [
  { id: 37, name: "DECK 66", subtitle: "ROCK DE PESO", date: "03/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/deck66-rock-de-peso-no-hard-rock-cafe-ribeirao-preto/3432663", image: `${BASE}/Deck%2066.jpeg` },
  { id: 38, name: "U2 COVER RIBEIRÃO", subtitle: "JOGO DO BRASIL + SHOW", date: "13/06", month: "Junho", time: "22h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/jogo-do-brasil-e-u2-cover-ribeirao-no-hard-rock-cafe-ribeirao/3432680", image: `${BASE}/U2.jpeg` },
  { id: 39, name: "FAIXA ADICIONAL", subtitle: "FLASHBACK", date: "19/06", month: "Junho", time: "20h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/jogo-do-brasil-e-faixa-adicional-flashback-no-hard-rock-cafe-ribeirao/3432705", image: `${BASE}/Faixa%20Adicional.jpeg` },
  { id: 40, name: "JACK TEQUILA", subtitle: "POP ROCK NACIONAL", date: "20/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/jack-tequila-os-hits-do-pop-rock-nacional-no-hard-rock-cafe-rp/3442280", image: `${BASE}/JT-Jun.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 41, name: "PARADISE", subtitle: "POP ROCK", date: "26/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/paradise-pop-rock-eletrizante-no-hard-rock-cafe-ribeirao-preto/3442288", image: `${BASE}/Paradise-Jun.jpeg` },
  { id: 42, name: "BLACK JACK", subtitle: "A ENERGIA DO HARD ROCK", date: "27/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/black-jack-a-energia-do-hard-rock-no-hard-rock-cafe-ribeirao/3442174", image: `${BASE}/BJ-Jun.jpeg`, partnership: true, partnerName: "Matiz Hotel Vilabom" },
  { id: 43, name: "LIVE BY NIGHT", date: "03/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/live-by-night-no-hard-rock-cafe-ribeirao-preto/3469487", image: `${BASE}/Live%20By%20NIght202607.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 44, name: "BLAYMORPHED", subtitle: "TRIBUTO PEARL JAM", date: "04/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/blaymorphed-a-voz-de-eddie-vedder-no-hard-rock-cafe-ribeirao/3469786", image: `${BASE}/Blay202607.jpeg`, partnership: true, partnerName: "North Star" },
  { id: 45, name: "HARD STAFF", subtitle: "CLASSIC ROCK", date: "10/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/hardstuff-classic-rock-no-hard-rock-cafe-ribeirao-preto/3469430", image: `${BASE}/Hard%20Staff202607.jpeg` },
  { id: 52, name: "MR DAM", subtitle: "ESPECIAL QUEEN", date: "11/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/mr-dam-especial-queen-no-hard-rock-cafe-ribeirao-preto/3490022", image: `${BASE}/MrDam20260711.png` },
  { id: 46, name: "RAMONES", subtitle: "BANDA TEENAGE LOBOTOMY", date: "12/07", month: "Julho", time: "19h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/teenage-lobotomy-dia-mundial-do-rock-no-hard-rock-cafe-ribeirao/3469799", image: `${BASE}/Ramones202607.jpeg`, partnership: true, partnerName: "North Star" },
  { id: 47, name: "CAARU", subtitle: "ROCK XAMÂNICO", date: "17/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/caaru-rock-xamanico-no-hard-rock-cafe-ribeirao-preto/3469532", image: `${BASE}/Caaru202607.jpeg` },
  { id: 48, name: "AURAH", date: "18/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/aurah-rock-hits-no-hard-rock-cafe-ribeirao-preto/3469549", image: `${BASE}/Aurah202607.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 49, name: "BLACK DOG", subtitle: "TRIBUTO LED ZEPPELIN - ATRAÇÃO INTERNACIONAL", date: "24/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/black-dog-tributo-led-zeppelin-no-hard-rock-cafe-ribeirao-preto/3469712", image: `${BASE}/Black%20Dog202607.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 50, name: "OS VIRGENS", date: "25/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/os-virgens-uma-viagem-musical-no-hard-rock-cafe-ribeirao-preto/3469816", image: `${BASE}/Os%20virgens202607.jpeg` },
  { id: 51, name: "MACH 5", date: "31/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/mach5-os-classicos-do-pop-rock-no-hard-rock-cafe-ribeirao/3469728", image: `${BASE}/MACH20260731.jpeg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 58, name: "SCHOOL OF ROCK", subtitle: "ESPECIAL JOÃO ROCK 2026", date: "02/08", month: "Agosto", time: "12h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/school-of-rock-especial-joao-rock-2026-no-hard-rock-cafe-ribeirao-preto/3512450", image: `${BASE}/SOR20260802.jpeg` },
  { id: 53, name: "WHISKEY RIVER", date: "01/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/whiskey-river-no-hard-rock-cafe-ribeirao-preto/3504573", image: `${BASE}/Whiskey%20River%2020260801.jpeg` },
  { id: 54, name: "ROCKERS23", subtitle: "ESPECIAL ROLLING STONES E BARÃO VERMELHO", date: "08/08", month: "Agosto", time: "21h30", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/rockers23-especial-rolling-stones-e-barao-vermelho-no-hard-rock-cafe-ribeirao/3504683", image: `${BASE}/Rockers23%2020260808.jpeg`, partnership: true, partnerName: "North Star", hotelPartner: "Hotel Transamerica" },
  { id: 55, name: "U2 COVER RIBEIRÃO", subtitle: "ONE NIGHT OF U2", date: "15/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/u2-cover-ribeirao-one-night-of-u2-no-hard-rock-cafe-ribeirao/3504601", image: `${BASE}/U2%20Cover%20Ribeirao%2020260815.jpeg` },
  { id: 56, name: "PARADISE", subtitle: "POP ROCK", date: "28/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/paradise-coldplay-imagine-dragons-e-mais-no-hard-rock-cafe-rp/3504631", image: `${BASE}/Paradise%2020260828.jpeg` },
  { id: 57, name: "MANCHESTER", subtitle: "OASIS COVER", date: "29/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/manchester-oasis-cover-o-maior-tributo-ao-oasis-no-hrc-ribeirao/3504705", image: `${BASE}/Manchester%20Oasis%2020260829.jpeg`, partnership: true, partnerName: "North Star", hotelPartner: "Hotel JP" },
  { id: 59, name: "MAD HOUDINI", subtitle: "ESPECIAL DURAN DURAN E A-HA", date: "05/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/mad-houdini-especial-duran-duran-e-a-ha-no-hard-rock-cafe-ribeirao/3541489", image: `${BASE}/MadHoudini%2020260905.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 60, name: "OS VIRGENS", subtitle: "SHOW ACÚSTICO", date: "11/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/os-virgens-show-acustico-no-hard-rock-cafe-ribeirao-preto/3541514", image: `${BASE}/Os%20Virgens%2020260911.jpeg` },
  { id: 65, name: "CREEDENCE 4EVER", subtitle: "TRIBUTO CREEDENCE CLEARWATER REVIVAL", date: "12/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/creedence-4ever-tributo-creedence-clearwater-revival-no-hard-rock-cafe-ribeirao-preto/3571530", image: `${BASE}/Creedence4Ever%2020260912.jpg`, partnership: true, partnerName: "North Star" },
  { id: 61, name: "DIRTY JACK", subtitle: "TRIBUTO AC/DC", date: "25/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/dirty-jack-tributo-acdc-no-hard-rock-cafe-ribeirao-preto/3541500", image: `${BASE}/DirtyJack%2020260925.jpeg`, bannerImage: `${BASE}/DirtyJack-banner%2020260925.jpg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 66, name: "POP MIND", subtitle: "HITS DO POP ROCK", date: "02/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/pop-mind-hits-do-pop-rock-no-hard-rock-cafe-ribeirao-preto/3575880", image: `${BASE}/PopMind%2020261002.jpg`, bannerImage: `${BASE}/PopMind-banner%2020261002.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 67, name: "JACK FAST", subtitle: "DE VOLTA AO HARD ROCK CAFE", date: "03/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/jack-fast-de-volta-ao-hard-rock-cafe-ribeirao-preto/3575885", image: `${BASE}/JackFast%2020261003.jpg`, bannerImage: `${BASE}/JackFast-banner%2020261003.jpeg`, partnership: true, partnerName: "Hotel JP" },
  { id: 68, name: "OÁZ", subtitle: "", date: "09/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/oAz-no-hard-rock-cafe-ribeirao-preto/3575893", image: `${BASE}/Oaz%2020261009.jpg`, bannerImage: `${BASE}/Oaz-banner%2020261009.jpg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 69, name: "U2 COVER RIBEIRÃO", subtitle: "TRIBUTO U2", date: "10/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/u2-cover-ribeirao-one-night-of-u2-no-hard-rock-cafe-ribeirao/3576564", image: `${BASE}/U2CoverRibeirao%2020261010.jpg`, bannerImage: `${BASE}/U2CoverRibeirao-banner%2020261010.jpg` },
  { id: 70, name: "CHILDREN OF THE BEAST", subtitle: "TRIBUTO IRON MAIDEN", date: "16/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/children-of-the-beast-o-tributo-oficial-do-iron-maiden-no-hrc-ribeirao/3576580", image: `${BASE}/ChildrenOfTheBeast%2020261016.jpg`, bannerImage: `${BASE}/ChildrenOfTheBeast-banner%2020261016.jpg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 71, name: "RENATO QUASE RUSSO", subtitle: "TRIBUTO LEGIÃO URBANA — ESPECIAL 30 ANOS RENATO RUSSO", subtitleColor: "#d4a017", date: "17/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/tributo-legiao-urbana-por-renato-quase-russo-no-hard-rock-cafe-ribeirao-preto/3576573", image: `${BASE}/RenatoQuaseRusso%2020261017.jpg`, bannerImage: `${BASE}/RenatoQuaseRusso-banner%2020261017.jpg`, partnership: true, partnerName: "Matiz Hotel" },
  { id: 72, name: "AURAH", subtitle: "POP ROCK", date: "23/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/aurah-rock-hits-no-hard-rock-cafe-ribeirao-preto/3576598", image: `${BASE}/Aurah%2020261023.jpg`, bannerImage: `${BASE}/Aurah-banner%2020261023.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 73, name: "LITHIUM", subtitle: "ESPECIAL HALLOWEEN", subtitleColor: "#ff8c00", date: "30/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/lithium-com-dri-santana-no-hard-rock-cafe-ribeirao-preto/3576546", image: `${BASE}/Lithium%2020261030.jpg`, bannerImage: `${BASE}/Lithium-banner%2020261030.jpg`, carouselLink: "/halloween" },
  { id: 74, name: "CAARU", subtitle: "ROCK XAMÂNICO — ESPECIAL HALLOWEEN", subtitleColor: "#ff8c00", date: "31/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/caaru-rock-xamanico-no-hard-rock-cafe-ribeirao-preto/3576589", image: `${BASE}/Caaru%2020261031.jpg`, bannerImage: `${BASE}/Caaru-banner%2020261031.jpg`, partnership: true, partnerName: "Transamerica", carouselLink: "/halloween" },
  { id: 131, name: "LIVE BY NIGHT", subtitle: "FITA K7 — ESPECIAL ANOS 80", date: "06/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/fita-k7--especial-anos-80-com-live-by-night-no-hard-rock-cafe-ribeirao-preto/3626120", image: `${BASE}/LiveByNight%2020261106.jpg`, bannerImage: `${BASE}/LiveByNight-banner%2020261106.jpg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 132, name: "SEATTLE NIGHTS", subtitle: "NIRVANA ACÚSTICO E CLÁSSICOS DO GRUNGE", date: "07/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/seattle-nights--nirvana-acustico-e-classicos-do-grunge-no-hard-rock-cafe-ribeirao-preto/3625284", image: `${BASE}/SeattleNights%2020261107.jpg`, bannerImage: `${BASE}/SeattleNights-banner%2020261107.jpg`, partnership: true, partnerName: "North Star", hotelPartner: "Matiz Hotel Vilabom" },
  { id: 133, name: "PAUL & FRIENDS", subtitle: "ABERTURA DO BEAT TRIO", date: "13/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/paul--friends-com-abertura-do-beat-trio-no-hard-rock-cafe-ribeirao-preto/3625307", image: `${BASE}/PaulFriends%2020261113.jpg`, bannerImage: `${BASE}/PaulFriends-banner%2020261113.jpg`, partnership: true, partnerName: "North Star", hotelPartner: "Hotel JP" },
  { id: 134, name: "ROTOR", subtitle: "TRIBUTO BON JOVI — GIN SHEWOLF NIGHT'S", date: "14/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/gin-shewolf-night-----tributo-bon-jovi-com-rotor-no-hard-rock-cafe-ribeirao/3626153", image: `${BASE}/Rotor%2020261114.jpg`, bannerImage: `${BASE}/Rotor-banner%2020261114.jpg`, partnership: true, partnerName: "Transamerica" },
  { id: 135, name: "GUNS COVER BRAZIL", subtitle: "HARD ROCK WEEKEND — TRIBUTO GUNS N' ROSES", date: "19/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/hard-rock-weekend--tributo-guns-n-roses-com-guns-cover-brazil-no-hard-rock-cafe-ribeirao-preto/3626191", image: `${BASE}/GunsCoverBrazil%2020261119.jpg`, bannerImage: `${BASE}/GunsCoverBrazil-banner%2020261119.jpg`, partnership: true, partnerName: "Matiz Hotel Vilabom" },
  { id: 136, name: "LOST80S", subtitle: "HARD ROCK WEEKEND — FEAT. KIKO SHRED — GLAM ROCK ESPECIAL ANOS 80", date: "20/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/hard-rock-weekend--lost80s-feat-kiko-shred-glam-rock-especial-anos-80-no-hard-rock-cafe-ribeirao/3626203", image: `${BASE}/Lost80s%2020261120.jpg`, bannerImage: `${BASE}/Lost80s-banner%2020261120.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 137, name: "RADIO SHOW", subtitle: "HARD ROCK WEEKEND — FEAT. NANDO FERNANDES", date: "21/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/hard-rock-weekend--radio-show-feat-nando-fernandes-classicos-do-rock-no-hard-rock-cafe-ribeirao/3626225", image: `${BASE}/RadioShow%2020261121.jpg`, bannerImage: `${BASE}/RadioShow-banner%2020261121.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 138, name: "SUPERNOVA", subtitle: "DO ROCK IN RIO AO HARD ROCK", date: "28/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/supernova-do-rock-in-rio-ao-hard-rock-cafe-ribeirao-preto/3626253", image: `${BASE}/Supernova%2020261128.jpg`, bannerImage: `${BASE}/Supernova-banner%2020261128.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 62, name: "FESTIVAL TODOS NO ROCK", subtitle: "SCHOOL OF ROCK, ROTOR, DIRTY JACK, O ÉPICCO E SANTÍSSIMA TRINDADE", date: "26/09", month: "Setembro", time: "13h", venue: "Sertãozinho", image: `${BASE}/TodosNoRock-card%2020260926.jpg`, bannerImage: `${BASE}/TodosNoRock-banner%2020260926.jpg`, link: "https://www.sympla.com.br/evento/todos-no-rock-marquesa-open-bar/3569023", linkLabel: "COMPRAR CAMAROTE", carouselLink: "https://www.sympla.com.br/evento/todos-no-rock-marquesa-open-bar/3569023", free: true, hideFreeBadge: true },
  { id: 63, name: "DYNAMITE", subtitle: "TRIBUTO SCORPIONS", date: "26/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/dynamite-tributo-scorpions-no-hard-rock-cafe-ribeirao-preto/3541522", image: `${BASE}/Dynamite%2020260926.jpeg`, bannerImage: `${BASE}/Dynamite-banner%2020260926.jpg`, partnership: true, partnerName: "Hotel JP" },
];

export const realizedShows2026: Show[] = [
  { id: 101, name: "DIRTY JACK", subtitle: "AC/DC & WHITESNAKE COVER BRASIL", date: "16/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 102, name: "AURAH", date: "17/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 103, name: "PRI BORGES", subtitle: "ESPECIAL JANIS JOPLIN", date: "23/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 104, name: "JACK FAST", date: "24/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 105, name: "GUNS N' ROSES COVER BRAZIL", date: "30/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 106, name: "MID SEASON SHOW", subtitle: "SCHOOL OF ROCK", date: "31/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 107, name: "BETO BRUNO & STARS FROM SCHOOL OF ROCK", date: "07/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 108, name: "MOJOBOX", date: "13/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 109, name: "BANDA 365", date: "15/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 110, name: "VIOLÕES EM FÚRIA", date: "22/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 111, name: "NIRVANA COVER BRASIL", date: "28/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 112, name: "CREEDENCE 4EVER", date: "07/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 113, name: "FENÍCIA", subtitle: "ESPECIAL DIA DAS MULHERES", date: "08/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 114, name: "MR. DAM", subtitle: "ESPECIAL QUEEN", date: "14/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 115, name: "NIRVANA COVER BRASIL", date: "29/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 116, name: "POP MIND", subtitle: "HITS DO POP ROCK", date: "02/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 117, name: "AURAH", date: "04/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 118, name: "ROTOR", subtitle: "ESPECIAL BON JOVI", date: "17/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 119, name: "U2 COVER RIBEIRÃO", date: "18/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 120, name: "PARADISE", subtitle: "TRIBUTO COLDPLAY E IMAGINE DRAGONS", date: "24/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 121, name: "MAMA PUNCH", subtitle: "KNOCKOUT HITS", date: "02/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 122, name: "AEROGUNS", subtitle: "GUNS N' ROSES + AEROSMITH", date: "08/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 123, name: "ECHOS", subtitle: "PINK FLOYD EXPERIENCE", date: "09/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 124, name: "CAVEIRAS ROCK", subtitle: "ROCK NACIONAL ANOS 80", date: "14/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 125, name: "ELTON JOHN ROCKET MAN EXPERIENCE", date: "15/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 126, name: "SPINE SHIVER", subtitle: "SOUTHERN ROCK EXPERIENCE", date: "16/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 127, name: "SCHOOL OF ROCK", subtitle: "MID SEASON", date: "24/05", month: "Maio", time: "12h", venue: "Hard Rock Cafe", realized: true },
  { id: 128, name: "RENATO QUASE RUSSO", subtitle: "TRIBUTO AO LEGIÃO URBANA", date: "30/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 129, name: "ROTOR", subtitle: "ESPECIAL BON JOVI", date: "06/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 130, name: "SCHOOL OF ROCK", subtitle: "SHOW DE TEMPORADA", date: "14/06", month: "Junho", time: "12h", venue: "Vila Dionísio", realized: true },
];

export const galleryPhotos = [
  { src: `${BASE}/Guns%20Cover%20Brasil.jpg`, alt: "Guns N Roses Cover Brasil" },
  { src: `${BASE}/Luana%20Camarah.jpg`, alt: "Luana Camarah" },
  { src: `${BASE}/Ozzmozzy.jpg`, alt: "Ozzmozzy" },
  { src: `${BASE}/U2%20Cover%20Ribeir%C3%A3o.jpg`, alt: "U2 Cover Ribeirão" },
  { src: `${BASE}/Manchester%20Oasis.jpg`, alt: "Manchester Oasis" },
  { src: `${BASE}/Viol%C3%B5es%20em%20F%C3%BAria.jpg`, alt: "Violões em Fúria" },
  { src: `${BASE}/Nirvana%20Cover%20Brasil.jpg`, alt: "Nirvana Cover Brasil" },
  { src: `${BASE}/Malvada.jpg`, alt: "Malvada" },
  { src: `${BASE}/Coldplayers.jpg`, alt: "Coldplayers" },
  { src: `${BASE}/365.jpg`, alt: "Banda 365" },
  { src: `${BASE}/Beto%20Bruno.jpg`, alt: "Beto Bruno" },
  { src: `${BASE}/Caaru.jpg`, alt: "Caaru" },
  { src: `${BASE}/Creedence%204Ever.jpg`, alt: "Creedence 4Ever" },
  { src: `${BASE}/Os%20Virgens.jpg`, alt: "Os Virgens" },
  { src: `${BASE}/The%20Four%20Horsemen.jpg`, alt: "The Four Horsemen" },
];

export const parseDate = (dateStr: string) => {
  const [day, month] = dateStr.split("/").map(Number);
  return { day, month };
};

export const isShowPassed = (dateStr: string) => {
  const showDate = parseDate(dateStr);
  const today = new Date();
  const showYear = 2026;
  if (today.getFullYear() > showYear) return true;
  if (today.getFullYear() < showYear) return false;
  const m = today.getMonth() + 1;
  if (m > showDate.month) return true;
  if (m < showDate.month) return false;
  return today.getDate() > showDate.day;
};

const byDate = (a: Show, b: Show) => {
  const da = parseDate(a.date), db = parseDate(b.date);
  return da.month !== db.month ? da.month - db.month : da.day - db.day;
};

/** Shows à venda, em ordem de data. */
export const getFutureShows = () =>
  upcomingShows.filter((s) => !isShowPassed(s.date) && (s.link || s.free)).sort(byDate);

/** Shows já realizados no Hard Rock Cafe, do mais recente para o mais antigo. */
export const getPastHardRockShows = () => {
  const passed = upcomingShows.filter((s) => isShowPassed(s.date));
  return [...realizedShows2026, ...passed]
    .filter((s) => s.venue === "Hard Rock Cafe")
    .sort(byDate)
    .reverse();
};

export const MONTH_ABBR = ["", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
export const WEEKDAY = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const weekday = (dateStr: string) => {
  const { day, month } = parseDate(dateStr);
  return WEEKDAY[new Date(2026, month - 1, day).getDay()];
};
