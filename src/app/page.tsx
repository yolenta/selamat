import Confetti from "@/components/Confetti";
import SectionNav from "@/components/SectionNav";
import MusicPlayer from "@/components/MusicPlayer";
import Image from "next/image";
import LoveFooter from "@/components/LoveFooter";

// Tipe aman untuk searchParams (Next.js App Router)
type SP = Record<string, string | string[] | undefined>;

export default function Page({ searchParams }: { searchParams?: SP }) {
  const sp = searchParams ?? {};

  // Ambil satu nilai aman (handle string[] dan undefined)
  const pick = (key: string, fallback: string) => {
    const v = sp[key];
    const s = Array.isArray(v) ? v[0] : v;
    return decodeURIComponent(s ?? fallback);
  };

  const to = pick("to", "Cosmas");
  const from = pick("from", "Jelistina");
  const shortMsg = pick("msg", "Happy Birthday Sayang! Semoga sehat, bahagia, dan semua harapan kamu tercapai.");
  const letter = pick(
    "letter",
    "Sayang,\nTerima kasih sudah jadi rumah terhangat untukku. Di umur yang baru ini, semoga kamu kian berani bermimpi dan bahagia di setiap langkah. Aku selalu di sini, mendukungmu.\nDengan cinta,\n"
  );
  const love = pick("love", "12 September 2025");

  const photo1 = pick("photo1", "/cosmas.jpg");
  const photo2 = pick("photo2", "/bersama.jpg");

  // gallery bisa dikirim sebagai CSV atau banyak nilai
  const galleryRaw = sp.gallery;
  const galleryStr = Array.isArray(galleryRaw) ? galleryRaw.join(",") : (galleryRaw ?? "");
  const gallery = galleryStr
    ? galleryStr.split(",").map((x) => decodeURIComponent(x.trim())).filter(Boolean)
    : ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg", "/gallery/5.jpg", "/gallery/6.JPG", "/gallery/7.jpeg", "/gallery/8.jpg", "/gallery/9.jpg", "/gallery/10.jpg"];


type SP = Record<string, string | string[] | undefined>;
const boolFrom = (v: string | string[] | undefined) => {
  const s = Array.isArray(v) ? v[0] : v;
  return /^(1|true|yes|on)$/i.test(s ?? "");
};

// ...
// Musik: jika hanya 1 track → autoplay ON by default dan loop OFF
const musicRaw = sp.music;
const musicStr = Array.isArray(musicRaw) ? musicRaw.join(",") : (musicRaw ?? "");
const tracks = musicStr ? musicStr.split(",") : ["/music/kubahagiakauterlahirdidunia.mp3"]; // default satu lagu
const playlist = tracks.map((src) => ({
  src: decodeURIComponent(src.trim()),
  title: src.split("/").pop()?.replace(/\.[^/.]+$/, "")?.replace(/[-_]/g, " ") || "Track",
}));
const isSingle = playlist.length === 1;
const autoPlay = isSingle ? true : boolFrom(sp.autoplay);
const loop = isSingle ? false : boolFrom(sp.loop);

return (
<main className="relative">
{/* Nav titik di sisi kanan */}
<SectionNav ids={["s1", "s2", "s3"]} />


{/* SECTION 1: Ucapan Happy Birthday + foto yang berulang tahun */}
<section id="s1" className="min-h-screen snap-start flex items-center justify-center py-16 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
<Confetti />
<div className="max-w-4xl w-full">
<div className="text-center">
<p className="uppercase tracking-widest text-xs text-slate-500">Untuk</p>
<h1 className="font-display text-5xl md:text-6xl mt-2">{to}</h1>
<p className="mt-4 text-lg md:text-xl text-slate-700">{shortMsg}</p>
</div>


<div className="mt-10 flex justify-center">
<div className="relative h-56 w-56 md:h-64 md:w-64 rounded-full overflow-hidden ring-4 ring-white/80 shadow-xl">
<Image src={photo1} alt={`Foto ${to}`} fill className="object-cover"/>
</div>
</div>


<div className="mt-10 text-center text-sm text-slate-500">
Gulir ke bawah untuk lanjut ↓
</div>
</div>
</section>


{/* SECTION 2: Surat + foto bersama */}
<section id="s2" className="min-h-screen snap-start flex items-center py-16 px-6 bg-white">
<div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2">
<div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md">
<h2 className="font-display text-3xl">Untuk {to}</h2>
<p className="mt-3 text-slate-500 text-sm">Dari <span className="font-medium text-rose-600">{from}</span></p>
<p className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-700">{letter}
{from}</p>
<div className="mt-6">
</div>
</div>
<div className="relative h-80 md:h-auto md:min-h-[28rem] rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-lg">
<Image src={photo2} alt={`Foto bersama ${to} & ${from}`} fill className="object-cover"/>
</div>
</div>
</section>


{/* SECTION 3: Galeri foto kebersamaan */}
<section id="s3" className="min-h-screen snap-start py-16 px-6 bg-gradient-to-br from-sky-50 to-cyan-50">
<div className="mx-auto max-w-6xl">
<h2 className="font-display text-3xl text-center">Foto-Foto Kebersamaan</h2>
<p className="mt-2 text-center text-slate-600">Kenangan manis kita</p>


<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
{gallery.map((src, i) => (
<div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/70 border border-slate-100 shadow-md">
<Image src={src} alt={`Galeri ${i+1}`} fill className="object-cover" />
</div>
))}
</div>


<div className="mt-10 flex justify-center">
{/* SECTION 4: Footer Ungkapan Cinta */}
<LoveFooter love={love} from={from} />
    
<MusicPlayer playlist={playlist} autoPlay={autoPlay} loop={loop} showNext={!isSingle} />
</div>
</div>
</section>
</main>
);
}