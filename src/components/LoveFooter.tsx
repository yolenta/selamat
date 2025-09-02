import { Heart } from 'lucide-react';


export default function LoveFooter({ love, from }: { love: string; from: string }) {
return (
<footer id="s4" className="min-h-[60vh] snap-start py-16 px-6 bg-white">
<div className="mx-auto max-w-3xl text-center">
<Heart className="mx-auto h-10 w-10 text-rose-500" />
<h2 className="font-display text-3xl mt-3">#COSMadeForJELIS</h2>
<p className="mt-6 text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">{love}</p>
<p className="mt-6 text-slate-500">— <span className="text-rose-600 font-medium">{from}</span></p>
</div>
</footer>
);
}