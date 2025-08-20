import { Heart, Sparkles } from "lucide-react";
import ShareBar from "@/components/ShareBar";
import Confetti from "@/components/Confetti";
import Image from "next/image";

const THEMES = {
rose: {
wrapper: "from-rose-50 to-pink-50",
border: "border-rose-200",
accent: "text-rose-600",
glow: "shadow-glow",
},
violet: {
wrapper: "from-violet-50 to-pink-50",
border: "border-violet-200",
accent: "text-violet-600",
glow: "shadow-glow",
},
sky: {
wrapper: "from-sky-50 to-cyan-50",
border: "border-sky-200",
accent: "text-sky-600",
glow: "shadow-glow",
},
} as const;


type PageProps = {
searchParams?: Record<string, string | string[] | undefined>;
};


export default function Page({ searchParams = {} }: PageProps) {
const to = decodeURIComponent((searchParams.to as string) ?? "Sayang");
const from = decodeURIComponent((searchParams.from as string) ?? "Aku");
const msg = decodeURIComponent(
(searchParams.msg as string) ?? "Selamat ulang tahun! Sehat, bahagia, dan makin disayang."
);
const themeKey = ((searchParams.theme as string) ?? "rose") as keyof typeof THEMES;
const theme = THEMES[themeKey] ?? THEMES.rose;


return (
<main className={`min-h-screen w-full bg-gradient-to-br ${theme.wrapper} flex items-center justify-center py-10 px-4`}>
{/* konfeti sekali saat load */}
<Confetti />


<div className={`relative max-w-xl w-full bg-white/80 backdrop-blur-md card-shadow rounded-3xl border ${theme.border} p-8`}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2">
<div className="h-16 w-16 rounded-full bg-white/90 border border-pink-100 flex items-center justify-center">
<Heart className={`h-8 w-8 ${theme.accent}`} />
</div>
</div>


<div className="text-center mt-6">
<p className="font-sans uppercase tracking-widest text-xs text-slate-500">Untuk</p>
<h1 className="font-display text-4xl md:text-5xl mt-1">{to}</h1>
</div>


<p className="mt-6 text-lg leading-relaxed text-slate-700 text-center">
{msg}
</p>


<div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
<Sparkles className={"h-4 w-4"} />
<span>Dikirim dengan cinta dari</span>
<span className={`font-medium ${theme.accent}`}>{from}</span>
</div>


<div className="mt-8 flex flex-col items-center gap-4">
<ShareBar to={to} from={from} msg={msg} />
<div className="text-xs text-slate-400">
Tip: Ubah parameter URL <code>?to=...&from=...&msg=...&theme=rose|violet|sky</code>
</div>
</div>


<div className="mt-8 flex justify-center">
<Image src="/love.svg" alt="love" width={120} height={120} priority />
{/* <Image src="/love.svg" alt="love" width={120} height={120} priority /> */}
</div>
</div>
</main>
);
}