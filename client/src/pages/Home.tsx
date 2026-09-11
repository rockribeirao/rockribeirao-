import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Mail, Instagram, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BASE = "https://raw.githubusercontent.com/rockribeirao/rockribeirao-/main/client/public";

interface Show {
  id: number;
  name: string;
  subtitle?: string;
  date: string;
  month: string;
  time: string;
  venue: string;
  realized?: boolean;
  partnership?: boolean;
  partnerName?: string;
  hotelPartner?: string;
  link?: string;
  image?: string;
  free?: boolean;
  hideFreeBadge?: boolean;
}

const upcomingShows: Show[] = [
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
  { id: 61, name: "DIRTY JACK", subtitle: "TRIBUTO AC/DC", date: "25/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/dirty-jack-tributo-acdc-no-hard-rock-cafe-ribeirao-preto/3541500", image: `${BASE}/DirtyJack%2020260925.jpeg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 66, name: "POP MIND", subtitle: "HITS DO POP ROCK", date: "02/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/pop-mind-hits-do-pop-rock-no-hard-rock-cafe-ribeirao-preto/3575880", image: `${BASE}/PopMind%2020261002.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 67, name: "JACK FAST", subtitle: "DE VOLTA AO HARD ROCK CAFE", date: "03/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/jack-fast-de-volta-ao-hard-rock-cafe-ribeirao-preto/3575885", image: `${BASE}/JackFast%2020261003.jpg`, partnership: true, partnerName: "Hotel JP" },
  { id: 68, name: "OÁZ", subtitle: "", date: "09/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/oAz-no-hard-rock-cafe-ribeirao-preto/3575893", image: `${BASE}/Oaz%2020261009.jpg`, partnership: true, partnerName: "Taiwan Hotel" },
  { id: 62, name: "FESTIVAL TODOS NO ROCK", subtitle: "SCHOOL OF ROCK, ROTOR, DIRTY JACK, O ÉPICCO E SANTÍSSIMA TRINDADE", date: "26/09", month: "Setembro", time: "13h", venue: "Sertãozinho", image: `${BASE}/Todos%20no%20Rock%2020260926.png`, free: true, hideFreeBadge: true },
  { id: 63, name: "DYNAMITE", subtitle: "TRIBUTO SCORPIONS", date: "26/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/dynamite-tributo-scorpions-no-hard-rock-cafe-ribeirao-preto/3541522", image: `${BASE}/Dynamite%2020260926.jpeg`, partnership: true, partnerName: "Hotel JP" },
];

const realizedShows2026: Show[] = [
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

const northStarArtists = new Set([
  "BETO BRUNO & STARS FROM SCHOOL OF ROCK", "MOJOBOX", "BANDA 365", "VIOLÕES EM FÚRIA",
  "NIRVANA COVER BRASIL", "CREEDENCE 4EVER", "THE NIROS", "RELIVE", "PURPLE BRAZIL TRIBUTE",
  "PAUL MCCARTNEY TRIBUTE", "OLD CROW", "MANCHESTER (OASIS COVER)", "LUANA CAMARAH",
  "JOHN CAMPBELL – ARE YOU EXPERIENCED?", "HEY JUDE", "FEVER", "COLDPLAYERS", "MALVADA",
  "ECHOS", "OZZMOZZY", "BLAYMORPHED",
]);

const proofOfWork = [
  "5 MINUTOS", "AEROGUNS", "AURAH", "BALANCE", "BANDA 365",
  "BETO BRUNO & STARS FROM SCHOOL OF ROCK", "BIG HEADS", "BLACK JACK",
  "BLUES ON THE ROCK", "BLAYMORPHED", "CAARU", "CAVEIRAS ROCK", "CHAVALA",
  "CHILDREN OF THE BEAST", "COLDPLAYERS", "CREEDENCE 4EVER", "DAMA DE FERRO",
  "DECK 66", "DIA MUNDIAL DO ROCK DA KISS FM", "DIRTY JACK", "DOMA", "DYNAMITE",
  "ECHOS", "EDU TRINNES & AEROSMITH CRAZY COVER", "ELTON JOHN ROCKET MAN EXPERIENCE",
  "EVANESCENCE EXPERIENCE", "FAIXA ADICIONAL", "FENÍCIA", "FEVER",
  "GUNS N' ROSES COVER BRAZIL", "HARD STAFF", "HEY JUDE", "JACK FAST", "JACK TEQUILA",
  "JOHN CAMPBELL – ARE YOU EXPERIENCED?", "KILOTONES", "KISS ROCK FESTIVAL",
  "LED ZEPPELIN EXPERIENCE", "LIVE BY NIGHT", "LOST 80'S", "LUANA CAMARAH",
  "MAD HOUDINI", "MALVADA", "MAMA PUNCH", "MANCHESTER", "MARIA ORFINA",
  "MASTER OF REALITY", "MAXINOVA", "MIEX", "MOJOBOX", "MONROE", "MR. DAM", "MR DAM",
  "NIRVANA COVER BRASIL", "OLD CROW", "OPERA QUEEN", "OS VIRGENS", "OZZMOZZY",
  "PARADISE", "PAUL MCCARTNEY TRIBUTE", "PEPPER HEAD", "PLAYLIST", "POP MIND",
  "PRI BORGES", "PURPLE BRAZIL TRIBUTE", "RADIO DRIVE", "RAMONES", "RELIVE",
  "RENATO QUASE RUSSO", "REPRISE INÉDITA", "ROCK STORY", "ROCKERS23", "ROCKSAURO",
  "ROTOR", "SCHOOL OF ROCK", "SPINE SHIVER", "THE NIROS", "TREN", "TRI REVIEW",
  "U2 COVER RIBEIRÃO", "UNDERGROUND FEST", "UNIDADE 2", "VIOLÕES EM FÚRIA", "WHISKEY RIVER",
];

const galleryPhotos = [
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

export default function Home() {
  const [email, setEmail] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Todos");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Por favor, insira seu email"); return; }
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await fetch("https://formspree.io/f/xnjodyqw", {
        method: "POST", body: formData, headers: { "Accept": "application/json" },
      });
      if (response.ok) { toast.success("Email registrado com sucesso!"); setEmail(""); }
      else { toast.error("Erro ao registrar email"); }
    } catch (error) { toast.error("Erro ao registrar email. Tente novamente."); console.error(error); }
  };

  const parseDate = (dateStr: string) => {
    const [day, month] = dateStr.split("/").map(Number);
    return { day, month };
  };

  const isShowPassed = (dateStr: string) => {
    const showDate = parseDate(dateStr);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const showYear = 2026;
    if (currentYear > showYear) return true;
    if (currentYear < showYear) return false;
    if (currentMonth > showDate.month) return true;
    if (currentMonth < showDate.month) return false;
    return currentDay > showDate.day;
  };

  const futureShows = upcomingShows.filter(show => !isShowPassed(show.date) && (show.link || show.free));
  const passedShows = upcomingShows.filter(show => isShowPassed(show.date));
  const allRealizedShows = [...realizedShows2026, ...passedShows];

  const availableMonths = new Set(futureShows.map(show => show.month));
  const allMonths = ["Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro"];
  const months = ["Todos", ...allMonths.filter(m => availableMonths.has(m))];

  const sortedShows = [...futureShows].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    if (dateA.month !== dateB.month) return dateA.month - dateB.month;
    return dateA.day - dateB.day;
  });

  const finalShows = selectedMonth === "Todos"
    ? sortedShows
    : sortedShows.filter(show => show.month === selectedMonth).sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA.day - dateB.day;
      });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#06020e" }}>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "#08030f", borderColor: "#2a1050" }}>
        <div className="container flex items-center justify-between py-4">
          <img src={`${BASE}/Logo%20do%20header.png`} alt="Rock Ribeirão" className="h-16 w-auto object-contain" />
          <nav className="hidden md:flex items-center gap-8 font-heading text-sm">
            <a href="#shows" style={{ color: "#cc2200" }} className="hover:opacity-80 transition">PRÓXIMOS</a>
            <a href="#proof" style={{ color: "#cc2200" }} className="hover:opacity-80 transition">CREDIBILIDADE</a>
            <a href="#gallery" style={{ color: "#cc2200" }} className="hover:opacity-80 transition">GALERIA</a>
            <a href="https://todosnorock.com.br" style={{ color: "#b090e0", border: "0.5px solid #6030b0", padding: "4px 12px", borderRadius: 20, fontSize: 12 }} className="hover:opacity-80 transition">TODOS NO ROCK</a>
            <a href="#about" style={{ color: "#cc2200" }} className="hover:opacity-80 transition">SOBRE</a>
            <a href="#contact" style={{ color: "#cc2200" }} className="hover:opacity-80 transition">CONTATO</a>
          </nav>
        </div>
      </header>

      <main>
      {/* Hero */}
      <section className="relative py-40 overflow-hidden" style={{
        backgroundImage: `linear-gradient(135deg, rgba(6,2,14,0.78) 0%, rgba(40,0,80,0.55) 50%, rgba(6,2,14,0.82) 100%), url(${BASE}/rr-hero-bg.jpg.jpg)`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div className="container relative z-10 text-center">
          <div className="mb-8 flex justify-center">
            <img src={`${BASE}/Logo%20do%20hero.png`} alt="Rock Ribeirão Logo" className="h-32 md:h-40 object-contain drop-shadow-lg" />
          </div>
          <h1 className="font-display text-6xl md:text-7xl mb-6 leading-tight" style={{ color: "#ff3311" }}>
            OS MAIORES SHOWS DE ROCK DE RIBEIRÃO PRETO
          </h1>
          <p className="font-heading text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Os maiores nomes do rock passam por aqui
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <Button onClick={() => document.getElementById("shows")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white font-heading text-lg px-10 py-7 h-auto rounded-none"
              style={{ background: "#cc2200" }}>
              VER PRÓXIMOS SHOWS <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a href="https://www.sympla.com.br/produtor/rockribeirao" target="_blank" rel="noopener noreferrer"
              className="font-heading text-lg px-10 py-5 transition"
              style={{ border: "2px solid #cc2200", color: "#ff6644" }}>
              COMPRAR INGRESSOS
            </a>
          </div>
          <p className="text-sm mt-8" style={{ color: "#a190c4" }}>⭐ Experiências musicais autênticas em Ribeirão Preto e região</p>
        </div>
      </section>

      {/* FESTIVAL DESTAQUE */}
      <section style={{ background: "#12071f", borderTop: "2px solid #6030b0", borderBottom: "2px solid #6030b0", padding: "1.5rem" }}>
        <div className="container">
          <p style={{ fontSize: 10, letterSpacing: "0.1em", color: "#a190c4", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 24, height: "0.5px", background: "#a190c4" }}></span>
            FESTIVAL
            <span style={{ display: "inline-block", width: 24, height: "0.5px", background: "#a190c4" }}></span>
          </p>
          <div style={{ background: "#1a0a2e", border: "0.5px solid #6030b0", borderRadius: 12, overflow: "hidden", display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: 180, flexShrink: 0, overflow: "hidden" }}>
              <img src={`${BASE}/Todos%20no%20Rock%2020260926.png`} alt="Festival Todos no Rock" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 180 }} />
            </div>
            <div style={{ padding: "1.25rem", flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.1em", color: "#a190c4", marginBottom: 6 }}>O MINISTÉRIO DA CULTURA APRESENTA</p>
              <h3 style={{ fontSize: 20, fontWeight: 500, color: "#e0c0ff", marginBottom: 10 }}>Festival Todos no Rock</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "#8060a0" }}>📅 26 de setembro de 2026</span>
                <span style={{ fontSize: 13, color: "#8060a0" }}>🕐 A partir das 13h</span>
                <span style={{ fontSize: 13, color: "#8060a0" }}>📍 Sertãozinho — SP · Em frente à Cervejaria Marquesa</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "0.5px solid #0F6E56", color: "#5DCAA5", background: "#04342C" }}>Entrada gratuita</span>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "0.5px solid #a190c4", color: "#b090e0", background: "#12071f" }}>Lei Rouanet</span>
              </div>
              <a href="https://todosnorock.com.br" style={{ display: "inline-block", background: "#6030b0", color: "#f0e0ff", fontSize: 13, fontWeight: 500, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>
                Ver o festival completo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Shows */}
      <section id="shows" className="py-24" style={{ background: "linear-gradient(to bottom, #0a0020, #06020e)" }}>
        <div className="container">
          <div className="mb-16">
            <h2 className="font-display text-6xl mb-4" style={{ color: "#cc2200" }}>PRÓXIMOS SHOWS</h2>
            <p style={{ color: "#9070c0" }} className="text-lg">Garanta seu ingresso antes de esgotar</p>
            <div className="w-24 h-1 mt-4" style={{ background: "linear-gradient(to right, #cc2200, #6030b0)" }} />
          </div>
          <div className="mb-12 flex gap-3 overflow-x-auto pb-4">
            {months.map((month) => (
              <button key={month} onClick={() => setSelectedMonth(month)}
                aria-pressed={selectedMonth === month}
                className="px-6 py-3 font-heading text-sm whitespace-nowrap transition rounded-none"
                style={{
                  background: selectedMonth === month ? "#cc2200" : "#1a0a2e",
                  color: selectedMonth === month ? "#fff" : "#b090e0",
                  border: selectedMonth === month ? "none" : "0.5px solid #a190c4",
                }}>
                {month}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalShows.map((show) => (
              <div key={show.id} className="group relative overflow-hidden flex flex-col h-full"
                style={{ background: "#1a0a2e", border: "0.5px solid #a190c4", borderRadius: 8, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#cc2200")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#a190c4")}>
                {show.image && (
                  <div className="w-full h-80 flex items-center justify-center overflow-hidden" style={{ background: "#12071f" }}>
                    <img src={show.image} alt={show.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg mb-1 leading-tight" style={{ color: "#cc2200" }}>{show.name}</h3>
                        {show.subtitle && <p className="font-heading text-xs" style={{ color: "#a190c4" }}>{show.subtitle}</p>}
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        {show.free && !show.hideFreeBadge && (
                          <span className="text-xs font-heading px-2 py-1 whitespace-nowrap rounded" style={{ background: "rgba(93,202,165,0.15)", color: "#5DCAA5" }}>GRATUITO</span>
                        )}
                        {show.partnership && (
                          <span className="text-xs font-heading px-2 py-1 whitespace-nowrap" style={{ background: "rgba(96,48,176,0.2)", color: "#b090e0" }}>{show.partnerName}</span>
                        )}
                        {show.hotelPartner && (
                          <span className="text-xs font-heading px-2 py-1 whitespace-nowrap" style={{ background: "rgba(234,179,8,0.15)", color: "#d4a017" }}>{show.hotelPartner}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: "#cc2200" }} />
                        <span className="font-bold" style={{ color: "#e0c0ff" }}>{show.date} • {show.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#cc2200" }} />
                        <span style={{ color: "#9070c0" }}>{show.venue}</span>
                      </div>
                    </div>
                  </div>
                  {show.link && (
                    <a href={show.link} target="_blank" rel="noopener noreferrer"
                      className="mt-6 w-full text-white font-heading py-3 px-4 text-center transition text-lg font-bold"
                      style={{ background: "#cc2200", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#aa1800")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#cc2200")}>
                      COMPRAR INGRESSO
                    </a>
                  )}
                  {show.free && !show.link && (
                    <div className="mt-6 w-full font-heading py-3 px-4 text-center text-lg font-bold rounded"
                      style={{ background: "rgba(93,202,165,0.15)", border: "1px solid #5DCAA5", color: "#5DCAA5" }}>
                      EVENTO GRATUITO
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section id="proof" className="py-20" style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050" }}>
        <div className="container">
          <div className="mb-12">
            <h2 className="font-display text-5xl mb-4" style={{ color: "#cc2200" }}>SHOWS QUE JÁ PASSARAM POR AQUI</h2>
            <div className="w-24 h-1" style={{ background: "linear-gradient(to right, #cc2200, #6030b0)" }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from(new Set([...proofOfWork, ...allRealizedShows.map(s => s.name.toUpperCase())])).sort().map((show, idx) => (
              <div key={idx} className="flex flex-col items-start gap-1 p-3 min-w-0"
                style={{ background: "#12071f", border: "0.5px solid #2a1050" }}>
                <div className="flex items-center gap-2 w-full min-w-0">
                  <Star className="w-5 h-5 flex-shrink-0" style={{ color: "#cc2200" }} />
                  <span className="font-heading text-sm truncate" style={{ color: "#c0a0e0" }}>{show}</span>
                </div>
                {northStarArtists.has(show) && (
                  <span className="text-xs font-heading px-1 py-0.5 whitespace-nowrap rounded"
                    style={{ background: "rgba(96,48,176,0.2)", color: "#b090e0" }}>North Star</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="gallery" className="py-20" style={{
        background: "linear-gradient(135deg, #06020e 0%, #1a0030 50%, #06020e 100%)",
        borderTop: "0.5px solid #2a1050"
      }}>
        <div className="container">
          <div className="mb-12">
            <h2 className="font-display text-5xl mb-4" style={{ color: "#cc2200" }}>GALERIA</h2>
            <p style={{ color: "#a190c4" }}>Crédito: Rafael Cautella</p>
            <div className="w-24 h-1 mt-4" style={{ background: "linear-gradient(to right, #cc2200, #6030b0)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="group relative overflow-hidden aspect-square cursor-pointer">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 transition-colors" style={{ background: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050" }}>
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl mb-4" style={{ color: "#cc2200" }}>RECEBA ANTES OS PRÓXIMOS SHOWS</h2>
            <p style={{ color: "#a190c4" }} className="text-lg">Inscreva-se na newsletter e fique por dentro de todas as novidades</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3">
            <Input type="email" placeholder="Seu email" aria-label="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 py-3 px-4 text-base" />
            <button type="submit" className="text-white font-heading py-3 px-8 transition text-lg font-bold whitespace-nowrap"
              style={{ background: "#cc2200" }}>
              QUERO RECEBER
            </button>
          </form>
        </div>
      </section>

      {/* Sobre */}
      <section id="about" className="py-20" style={{ background: "linear-gradient(to bottom, #0a0020, #06020e)", borderTop: "0.5px solid #2a1050" }}>
        <div className="container max-w-3xl">
          <h2 className="font-display text-5xl mb-8" style={{ color: "#cc2200" }}>SOBRE NÓS</h2>
          <div className="space-y-6 text-lg" style={{ color: "#9070c0" }}>
            <p>Produzimos os principais shows de rock em Ribeirão Preto, conectando o público aos grandes clássicos ao vivo.</p>
            <p><strong style={{ color: "#b090e0" }}>Em parceria com a North Star Concerts.</strong></p>
            <p><strong style={{ color: "#b090e0" }}>Com presença de marcas como</strong> Kiss FM 105.3 – Ribeirão Preto, School of Rock Ribeirão Preto, Viva Mídia e Dritto Mídia Out of Home.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20" style={{ background: "rgba(96,48,176,0.1)", borderTop: "0.5px solid #a190c4" }}>
        <div className="container text-center">
          <h2 className="font-display text-5xl mb-8" style={{ color: "#cc2200" }}>GARANTA SEU INGRESSO ANTES DE ESGOTAR</h2>
          <Button onClick={() => document.getElementById("shows")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white font-heading text-xl px-12 py-8 h-auto rounded-none"
            style={{ background: "#cc2200" }}>
            VER TODOS OS SHOWS <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* PARCEIROS */}
      <section style={{ background: "#0a0415", borderTop: "0.5px solid #2a1050", padding: "3rem 1.5rem" }}>
        <div className="container">
          <p style={{ fontSize: 11, color: "#a190c4", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24, textAlign: "center" }}>Parceiros e apoiadores</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center" }}>
            {[
              { src: `${BASE}/kiss.png`, alt: "Kiss FM 105.3" },
              { src: `${BASE}/school.png`, alt: "School of Rock Ribeirão Preto" },
              { src: `${BASE}/dritto.png`, alt: "Dritto Mídia Out of Home" },
              { src: `${BASE}/viva-midia.png`, alt: "Viva Mídia" },
              { src: `${BASE}/north-star.png`, alt: "North Star Concerts" },
            ].map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} style={{ height: 40, maxWidth: 140, objectFit: "contain", opacity: 0.85 }} />
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="py-12" style={{ background: "#06020e", borderTop: "0.5px solid #1a0a2e" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="font-display text-2xl mb-4" style={{ color: "#cc2200" }}>CONTATO</h3>
              <a href="mailto:sac@rockribeirao.com.br" className="transition flex items-center gap-2" style={{ color: "#a190c4" }}>
                <Mail className="w-4 h-4" /> sac@rockribeirao.com.br
              </a>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4" style={{ color: "#cc2200" }}>REDES SOCIAIS</h3>
              <a href="https://instagram.com/rockribeirao" target="_blank" rel="noopener noreferrer"
                className="transition flex items-center gap-2" style={{ color: "#a190c4" }}>
                <Instagram className="w-4 h-4" /> @rockribeirao
              </a>
            </div>
          </div>
          <div className="pt-8 text-center text-sm" style={{ borderTop: "0.5px solid #1a0a2e", color: "#a190c4" }}>
            <p>© 2026 Rock Ribeirão Produções. Todos os direitos reservados.</p>
            <p className="mt-1">CNPJ: 48.549.855/0001-00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
