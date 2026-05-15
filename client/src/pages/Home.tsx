import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Mail, Instagram, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  link?: string;
  image?: string;
  free?: boolean;
  hideFreeBadge?: boolean;
}

// Shows Próximos (Abril a Novembro 2026)
const upcomingShows: Show[] = [
  { id: 1, name: "POP MIND", subtitle: "HITS DO POP ROCK", date: "02/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/popmind--hits-do-pop-rock-no-hard-rock-cafe-ribeirao-preto/3329441", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/POPMINDFEED_5eec3c30.jpeg" },
  { id: 2, name: "AURAH", date: "04/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/aurah-no-hard-rock-cafe-ribeirao-preto/3334603", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/AURAHFEED_4a873758.jpeg" },
  { id: 2.5, name: "ROTOR", subtitle: "ESPECIAL BON JOVI", date: "17/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/banda-rotor---especial-bon-jovi/3345135", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/ROTOR_ab45f6da.jpeg" },
  { id: 2.7, name: "PARADISE", subtitle: "TRIBUTO COLDPLAY E IMAGINE DRAGONS", date: "24/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/paradise---tributo-coldplay-e-imagine-dragons/3354295", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/PARADISE_1211055b.jpeg" },
  { id: 3, name: "U2 COVER RIBEIRÃO", subtitle: "U2", date: "18/04", month: "Abril", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/u2-cover-ribeirao-no-hard-rock-cafe-ribeirao-preto/3354803", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/U2FEED_6f7ce8b1.jpeg" },
  { id: 4, name: "ROCK STORY", subtitle: "A HISTÓRIA DO ROCK ATRAVÉS DOS CLÁSSICOS", date: "23/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/rock-story-no-hard-rock-cafe-ribeirao-preto/3318557", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/ROCKSTORYFEED_ccd0f385.jpeg" },
  { id: 5, name: "MAMA PUNCH", subtitle: "KNOCKOUT HITS", date: "02/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/mama-punch--knockout-hits-no-hard-rock-cafe-ribeirao-preto/3368218", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/MAMAPUNCHFEED_f8868596.jpeg" },
  { id: 5.3, name: "AEROGUNS", subtitle: "CRAZY + NIGHTRAIN EM UMA SÓ BANDA", date: "08/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/aeroguns--guns-n-roses--aerosmith-no-hard-rock-cafe-ribeirao-preto/3387488", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/WhatsAppImage2026-04-15at08.56.54_9f4ee701.jpeg" },
  { id: 5.5, name: "SCHOOL OF ROCK", subtitle: "MID SEASON", date: "24/05", month: "Maio", time: "12h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/school-of-rock-ao-vivo-no-hard-rock-cafe-mid-season/3378939", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/MIDSEASONFEED(1600x838px)(PostparaInstagram(45))_20260409_140842_0000_f1d13c89.jpg" },
  { id: 6, name: "ECHOS", subtitle: "PINK FLOYD EXPERIENCE", date: "09/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/pink-floyd-live-experience-com-echoes-no-hard-rock-cafe-ribeirao-preto/3385843", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/IMG-20260413-WA0066_6f84584e.jpg", partnership: true, partnerName: "North Star" },
  { id: 6.3, name: "CAVEIRAS ROCK", subtitle: "ROCK NACIONAL ANOS 80", date: "14/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/royal-enfield-apresenta-caveiras-rock--rock-nacional-anos-80-no-hard-rock-cafe-ribeirao-preto/3393137", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Caveiras_44745995.jpeg" },
  { id: 6.5, name: "ELTON JOHN ROCKET MAN EXPERIENCE", subtitle: "DANILO TEORO", date: "15/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/elton-john-the-rocket-man-experience-por-danilo-teoro-no-hard-rock-cafe-ribeirao-preto/3393029", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Elton_d294e742.jpeg" },
  { id: 7, name: "SPINE SHIVER", subtitle: "SOUTHERN ROCK EXPERIENCE", date: "16/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/spine-shiver--southern-rock-experience-no-hard-rock-cafe-ribeirao-preto/3386369", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/WhatsAppImage2026-04-13at18.27.08_11a9755a.jpeg" },
  { id: 8, name: "MID SEASON SHOW", subtitle: "SCHOOL OF ROCK", date: "28/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe" },
  { id: 9, name: "RENATO QUASE RUSSO", subtitle: "TRIBUTO AO LEGIÃO URBANA", date: "30/05", month: "Maio", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/renato-quase-russo--legiao-urbana-no-hard-rock-cafe-ribeirao-preto/3388108", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/WhatsAppImage2026-04-15at12.11.50_8a413653.jpeg" },
  { id: 10, name: "ROTOR", subtitle: "ESPECIAL BON JOVI", date: "06/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe", link: "https://www.sympla.com.br/evento/banda-rotor-tributo-bon-jovi-no-hard-rock-cafe-ribeirao-preto/3426720", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/WhatsAppImage2026-05-14at15.52.28_393362a0.jpeg" },
  { id: 11, name: "FESTIVAL TODOS NO ROCK", subtitle: "LINKIN PARK COVER RIBEIRÃO, TREN, SANTÍSSIMA TRINDADE E DJ ROD MAC", date: "08/08", month: "Agosto", time: "15h", venue: "Sertãozinho", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/WhatsAppImage2026-05-05at17.08.09_a399d913.jpeg", free: true, hideFreeBadge: true },
  { id: 12, name: "SCHOOL OF ROCK", subtitle: "SHOW DE TEMPORADA", date: "14/06", month: "Junho", time: "12h", venue: "Vila Dionísio", link: "https://www.sympla.com.br/evento/school-of-rock-ao-vivo-no-vila-dionisio-show-de-temporada/3381889", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/ShowdeTemporada-Feed_19a48af4.png" },
  { id: 13, name: "U2 COVER RIBEIRÃO", date: "20/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 14, name: "DYNAMITE", subtitle: "SCORPIONS COVER", date: "26/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 15, name: "BLACK JACK", date: "27/06", month: "Junho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 16, name: "MACH 5", date: "04/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 17, name: "LUANA CAMARAH", subtitle: "ABERTURA: FERNANDO QUESADA", date: "11/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 18, name: "AURAH", date: "17/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 19, name: "KISS COVER BRAZIL & BANDA SHERLOCK", date: "18/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 20, name: "LED ZEPPELIN EXPERIENCE", subtitle: "CHILE", date: "24/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe" },
  { id: 21, name: "BLAYMORPHED", subtitle: "PEARL JAM COVER", date: "25/07", month: "Julho", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 22, name: "OZZMOZZY", subtitle: "OZZY COVER", date: "01/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 23, name: "ROCKER 23", date: "08/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 24, name: "U2 COVER RIBEIRÃO", date: "15/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe" },
  { id: 25, name: "CAARU", date: "22/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe" },
  { id: 26, name: "MANCHESTER", subtitle: "OASIS COVER", date: "29/08", month: "Agosto", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 27, name: "MOJOBOX", date: "12/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 28, name: "PURPLE BRAZIL TRIBUTE", subtitle: "DEEP PURPLE", date: "19/09", month: "Setembro", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 29, name: "JACK FAST", date: "03/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 30, name: "U2 COVER RIBEIRÃO", date: "10/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 31, name: "BLACK DOG", subtitle: "LED ZEPPELIN EXPERIENCE", date: "24/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 32, name: "CAARU", date: "31/10", month: "Outubro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 33, name: "NIRVANA COVER BRASIL", date: "07/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe", partnership: true, partnerName: "North Star" },
  { id: 34, name: "ROTOR", date: "14/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 35, name: "MOVE OVER", date: "20/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe" },
  { id: 36, name: "RADIO SHOW", date: "21/11", month: "Novembro", time: "21h", venue: "Hard Rock Cafe" },
];

// Shows Realizados 2026 (Janeiro a Março)
const realizedShows2026: Show[] = [
  { id: 1, name: "DIRTY JACK", subtitle: "AC/DC & WHITESNAKE COVER BRASIL", date: "16/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 2, name: "AURAH", date: "17/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 3, name: "PRI BORGES", subtitle: "ESPECIAL JANIS JOPLIN", date: "23/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 4, name: "JACK FAST", date: "24/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 5, name: "GUNS N' ROSES COVER BRAZIL", date: "30/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 6, name: "MID SEASON SHOW", subtitle: "SCHOOL OF ROCK", date: "31/01", month: "Janeiro", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 7, name: "BETO BRUNO & STARS FROM SCHOOL OF ROCK", subtitle: "NORTH STAR", date: "07/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 8, name: "MOJOBOX", subtitle: "NORTH STAR", date: "13/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 9, name: "BANDA 365", subtitle: "NORTH STAR", date: "15/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 10, name: "VIOLÕES EM FÚRIA", subtitle: "NORTH STAR", date: "22/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 12, name: "NIRVANA COVER BRASIL", subtitle: "NORTH STAR", date: "28/02", month: "Fevereiro", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 14, name: "CREEDENCE 4EVER", subtitle: "NORTH STAR", date: "07/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
  { id: 15, name: "FENÍCIA", subtitle: "ESPECIAL DIA DAS MULHERES", date: "08/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 16, name: "MR. DAM", subtitle: "ESPECIAL QUEEN", date: "14/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true },
  { id: 17, name: "NIRVANA COVER BRASIL", subtitle: "NORTH STAR", date: "29/03", month: "Março", time: "21h", venue: "Hard Rock Cafe", realized: true, partnership: true, partnerName: "North Star Concerts" },
];

// Prova Social - Shows que já passaram
// Artistas da North Star Concerts
const northStarArtists = new Set([
  "BETO BRUNO & STARS FROM SCHOOL OF ROCK",
  "MOJOBOX",
  "BANDA 365",
  "VIOLÕES EM FÚRIA",
  "NIRVANA COVER BRASIL",
  "CREEDENCE 4EVER",
  "THE NIROS",
  "RELIVE",
  "PURPLE BRAZIL TRIBUTE (DEEP PURPLE)",
  "PAUL MCCARTNEY TRIBUTE",
  "OLD CROW",
  "MANCHESTER (OASIS COVER)",
  "LUANA CAMARAH",
  "JOHN CAMPBELL – ARE YOU EXPERIENCED?",
  "HEY JUDE (THE BEATLES TRIBUTE)",
  "FEVER (AEROSMITH COVER)",
  "COLDPLAYERS (COLDPLAY COVER)",
  "MALVADA",
]);

const proofOfWork = [
  "5 MINUTOS",
  "AURAH",
  "BALANCE",
  "BANDA 365",
  "BETO BRUNO & STARS FROM SCHOOL OF ROCK",
  "BIG HEADS",
  "BLUES ON THE ROCK",
  "CAARU",
  "CHAVALA",
  "CHILDREN OF THE BEAST",
  "COLDPLAYERS",
  "CREEDENCE 4EVER",
  "DAMA DE FERRO",
  "DECK 66",
  "DIA MUNDIAL DO ROCK DA KISS FM",
  "DIRTY JACK",
  "DOMA",
  "DYNAMITE",
  "EDU TRINNES & AEROSMITH CRAZY COVER",
  "EVANESCENCE EXPERIENCE",
  "FAIXA ADICIONAL",
  "FENÍCIA",
  "FEVER",
  "GUNS N' ROSES COVER BRAZIL",
  "HEY JUDE",
  "JACK FAST",
  "JOHN CAMPBELL – ARE YOU EXPERIENCED?",
  "KILOTONES",
  "KISS ROCK FESTIVAL",
  "LED ZEPPELIN EXPERIENCE",
  "LOST 80'S",
  "LUANA CAMARAH",
  "MAD HOUDINI",
  "MALVADA",
  "MANCHESTER",
  "MARIA ORFINA",
  "MASTER OF REALITY",
  "MAXINOVA",
  "MIEX",
  "MOJOBOX",
  "MONROE",
  "MR. DAM",
  "NIRVANA COVER BRASIL",
  "OLD CROW",
  "OPERA QUEEN",
  "OZZMOZZY",
  "PARADISE",
  "PAUL MCCARTNEY TRIBUTE",
  "PEPPER HEAD",
  "PLAYLIST",
  "PRI BORGES",
  "PURPLE BRAZIL TRIBUTE",
  "RADIO DRIVE",
  "RELIVE",
  "REPRISE INÉDITA",
  "ROCKSAURO",
  "ROTOR",
  "SCHOOL OF ROCK",
  "THE NIROS",
  "TREN",
  "TRI REVIEW",
  "U2 COVER RIBEIRÃO",
  "UNDERGROUND FEST",
  "UNIDADE 2",
  "VIOLÕES EM FÚRIA",
  "WHISKEY RIVER",
];

// Galeria de Fotos
const galleryPhotos = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Banda-AURAH-no-Hard-Rock-11-10_3abfd135.jpeg", alt: "Banda AURAH" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/GunsnRosesCoverBrazil_52b2c3dd.jpg", alt: "Guns N Roses Cover" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Ozzmozzy-no-Hard-Rock-1-min-2048x1366_36880fdf.jpg", alt: "Ozzmozzy" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Tributo-ao-Metallica-coloca-Hard-Rock-no-clima-do-Halloween-72-2048x1365_508a9c63.jpg", alt: "Metallica Tribute" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Luana-Camarah-no-Hard-Rock_9d307782.jpg", alt: "Luana Camarah" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Violoes-em-Furia-no-Hard-Rock-22-02-2025_a99a1f9b.jpg", alt: "Violões em Fúria" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/U2CoverRibeirão_20179b11.webp", alt: "U2 Cover" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Ozzmozzy-no-Hard-Rock-11-min-scaled_e00ae031.webp", alt: "Ozzmozzy Show" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/EduTrinnes&ThiagoRinnaldinoHardRock_ff7fb5a0.webp", alt: "Edu Trinnes" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Beto-Bruno-no-Hard-Rock-em-23-08-25-13-min-scaled_5a5c6f2d.webp", alt: "Beto Bruno" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/GunsnRosesCoverBrazil2_d0b58918.webp", alt: "Guns N Roses" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Violoes-em-Furia-no-Hard-Rock-_c8773375.webp", alt: "Violões em Fúria 2" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Todos");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, insira seu email");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      
      const response = await fetch(
        "https://formspree.io/f/xnjodyqw",
        {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        }
      );
      
      if (response.ok) {
        toast.success("Email registrado com sucesso!");
        setEmail("");
      } else {
        toast.error("Erro ao registrar email");
      }
    } catch (error) {
      toast.error("Erro ao registrar email. Tente novamente.");
      console.error(error);
    }
  };

  // Funcao para converter data DD/MM para comparacao
  const parseDate = (dateStr: string) => {
    const [day, month] = dateStr.split("/").map(Number);
    return { day, month };
  };
  
  // Verificar se um show já passou
  const isShowPassed = (dateStr: string) => {
    const showDate = parseDate(dateStr);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // getMonth() retorna 0-11
    const currentYear = today.getFullYear();
    
    // Assumindo que todos os shows são em 2026
    const showYear = 2026;
    
    if (currentYear > showYear) return true;
    if (currentYear < showYear) return false;
    
    if (currentMonth > showDate.month) return true;
    if (currentMonth < showDate.month) return false;
    
    return currentDay > showDate.day;
  };
  
  // Separar shows em próximos e realizados
  const futureShows = upcomingShows.filter(show => !isShowPassed(show.date) && (show.link || show.free));
  const passedShows = upcomingShows.filter(show => isShowPassed(show.date));
  
  // Combinar shows realizados com shows que passaram da lista de próximos
  const allRealizedShows = [...realizedShows2026, ...passedShows];
  
  const showsWithTickets = futureShows;
  
  // Obter meses com shows disponiveis
  const availableMonths = new Set(showsWithTickets.map(show => show.month));
  const allMonths = ["Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro"];
  const months = ["Todos", ...allMonths.filter(m => availableMonths.has(m))];
  
  // Ordenar por data
  const sortedShows = [...showsWithTickets].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    if (dateA.month !== dateB.month) return dateA.month - dateB.month;
    return dateA.day - dateB.day;
  });
  
  const filteredShows = selectedMonth === "Todos" ? sortedShows : sortedShows.filter(show => show.month === selectedMonth);
  const finalShows = selectedMonth === "Todos" ? sortedShows : filteredShows.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.day - dateB.day;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/LOGOCABECA_1b2ef8ec.png"
              alt="Rock Ribeirão"
              className="h-16 w-auto object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 font-heading text-sm">
            <a href="#shows" className="text-primary hover:text-red-700 transition">PRÓXIMOS</a>
            <a href="#proof" className="text-primary hover:text-red-700 transition">CREDIBILIDADE</a>
            <a href="#gallery" className="text-primary hover:text-red-700 transition">GALERIA</a>
            <a href="#about" className="text-primary hover:text-red-700 transition">SOBRE</a>
            <a href="#contact" className="text-primary hover:text-red-700 transition">CONTATO</a>
          </nav>
        </div>
      </header>

      {/* ========== HERO SECTION - OTIMIZADO PARA CONVERSÃO ========== */}
      <section className="relative py-40 overflow-hidden" style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/fundo_ec58258b.webp'), linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(220,38,38,0.4) 50%, rgba(0,0,0,0.85) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000"
      }}>
        <div className="container relative z-10 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663433848442/RA9zFqFvaxS54sdTqfZAdD/Designsemnome_1edd7884.webp"
              alt="Rock Ribeirão Logo"
              className="h-32 md:h-40 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="font-display text-6xl md:text-7xl text-primary mb-6 leading-tight">
            OS MAIORES SHOWS DE ROCK DE RIBEIRÃO PRETO
          </h1>
          <p className="font-heading text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Ingressos para shows no Hard Rock Cafe e principais palcos da cidade
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <Button
              onClick={() => document.getElementById("shows")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary hover:bg-red-700 text-white font-heading text-lg px-10 py-7 h-auto rounded-none"
            >
              VER PRÓXIMOS SHOWS <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a
              href="https://www.sympla.com.br/produtor/rockribeirao"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-heading text-lg px-10 py-5 transition"
            >
              COMPRAR INGRESSOS
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-8">
            ⭐ Experiências musicais autênticas em Ribeirão Preto e região
          </p>
        </div>
      </section>

      {/* ========== PRÓXIMOS SHOWS - PRIMEIRA SEÇÃO APÓS HERO ========== */}
      <section id="shows" className="py-24 border-t-4 border-primary" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7))",
        backgroundColor: "#000"
      }}>
        <div className="container">
          <div className="mb-16">
            <h2 className="font-display text-6xl text-primary mb-4">PRÓXIMOS SHOWS</h2>
            <p className="text-gray-300 text-lg">Garanta seu ingresso antes de esgotar</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-700 mt-4" />
          </div>

          <div className="mb-12 flex gap-3 overflow-x-auto pb-4">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-6 py-3 font-heading text-sm whitespace-nowrap transition rounded-none ${
                  selectedMonth === month
                    ? "bg-primary text-white"
                    : "bg-background border border-border text-primary hover:border-primary"
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalShows.map((show) => (
              <div
                key={show.id}
                className="group relative overflow-hidden bg-background border-2 border-primary hover:border-red-700 transition-all flex flex-col h-full"
              >
                {show.image && (
                  <div className="w-full h-80 bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src={show.image}
                      alt={show.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg text-primary mb-1 leading-tight">{show.name}</h3>
                        {show.subtitle && (
                          <p className="font-heading text-xs text-muted-foreground">{show.subtitle}</p>
                        )}
                      </div>
                       <div className="flex flex-col gap-1">
                         {show.free && !show.hideFreeBadge && (
                           <span className="text-xs font-heading bg-green-500/20 text-green-400 px-2 py-1 whitespace-nowrap rounded">
                             GRATUITO
                           </span>
                         )}
                        {show.partnership && (
                          <span className="text-xs font-heading bg-primary/20 text-primary px-2 py-1 whitespace-nowrap">
                            {show.partnerName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm font-body">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-bold">{show.date} • {show.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{show.venue}</span>
                      </div>
                    </div>
                  </div>
                  {show.link && (
                    <a
                      href={show.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full bg-primary hover:bg-red-700 text-white font-heading py-3 px-4 text-center transition text-lg font-bold"
                    >
                      COMPRAR INGRESSO
                    </a>
                  )}
                   {show.free && !show.link && (
                     <div className="mt-6 w-full bg-green-500/20 border border-green-500 text-green-400 font-heading py-3 px-4 text-center text-lg font-bold rounded">
                       EVENTO GRATUITO
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROVA SOCIAL ========== */}
      <section id="proof" className="py-20 border-t-4 border-primary bg-background/50">
        <div className="container">
          <div className="mb-12">
            <h2 className="font-display text-5xl text-primary mb-4">SHOWS QUE JÁ PASSARAM POR AQUI</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-700" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from(new Set([...proofOfWork, ...allRealizedShows.map(s => s.name.toUpperCase())])).sort().map((show, idx) => (
              <div key={idx} className="flex flex-col items-start gap-1 p-3 bg-background border border-border min-w-0">
                <div className="flex items-center gap-2 w-full min-w-0">
                  <Star className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-heading text-sm truncate">{show}</span>
                </div>
                {northStarArtists.has(show) && (
                  <span className="text-xs font-heading bg-primary/20 text-primary px-1 py-0.5 whitespace-nowrap rounded">North Star</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GALERIA ========== */}
      <section id="gallery" className="py-20 border-t-4 border-primary" style={{
        backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(220,38,38,0.2) 50%, rgba(0,0,0,0.9) 100%)",
        backgroundColor: "#000"
      }}>
        <div className="container">
          <div className="mb-12">
            <h2 className="font-display text-5xl text-primary mb-4">GALERIA</h2>
            <p className="text-gray-300">Crédito: Rafael Cautella</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-700 mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="group relative overflow-hidden aspect-square cursor-pointer">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LEAD CAPTURE ========== */}
      <section className="py-20 border-t-4 border-primary bg-background/50">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl text-primary mb-4">RECEBA ANTES OS PRÓXIMOS SHOWS</h2>
            <p className="text-gray-300 text-lg">Inscreva-se na newsletter e fique por dentro de todas as novidades</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-3 px-4 text-base"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-red-700 text-white font-heading py-3 px-8 transition text-lg font-bold whitespace-nowrap"
            >
              QUERO RECEBER
            </button>
          </form>
        </div>
      </section>

      {/* ========== SOBRE ========== */}
      <section id="about" className="py-20 border-t-4 border-primary" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7))",
        backgroundColor: "#000"
      }}>
        <div className="container max-w-3xl">
          <h2 className="font-display text-5xl text-primary mb-8">SOBRE NÓS</h2>
          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              Produzimos os principais shows de rock em Ribeirão Preto, conectando o público aos grandes clássicos ao vivo.
            </p>
            <p>
              <strong className="text-primary">Em parceria com a North Star Concerts.</strong>
            </p>
            <p>
              <strong className="text-primary">Com presença de marcas como</strong> Kiss FM 105.3 – Ribeirão Preto, School of Rock Ribeirão Preto, Viva Mídia e Dritto Mídia Out of Home.
            </p>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL - FORÇAR CONVERSÃO ========== */}
      <section className="py-20 border-t-4 border-primary bg-primary/10">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-primary mb-8">GARANTA SEU INGRESSO ANTES DE ESGOTAR</h2>
          <Button
            onClick={() => document.getElementById("shows")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary hover:bg-red-700 text-white font-heading text-xl px-12 py-8 h-auto rounded-none"
          >
            VER TODOS OS SHOWS <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer id="contact" className="border-t border-border bg-background/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="font-display text-2xl text-primary mb-4">CONTATO</h3>
              <a href="mailto:sac@rockribeirao.com.br" className="text-gray-300 hover:text-primary transition flex items-center gap-2">
                <Mail className="w-4 h-4" />
                sac@rockribeirao.com.br
              </a>
            </div>
            <div>
              <h3 className="font-display text-2xl text-primary mb-4">REDES SOCIAIS</h3>
              <a href="https://instagram.com/rockribeirao" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                @rockribeirao
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Rock Ribeirão Produções. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
