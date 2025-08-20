'use client';
import { Share2, Copy, Send } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';


export default function ShareBar({ to, from, msg }: { to: string; from: string; msg: string }) {
const [copied, setCopied] = useState(false);
const url = useMemo(() => {
const u = new URL(window.location.href);
u.searchParams.set('to', to);
u.searchParams.set('from', from);
u.searchParams.set('msg', msg);
return u.toString();
}, [to, from, msg]);


const share = useCallback(async () => {
if (navigator.share) {
try {
await navigator.share({
title: `Untuk ${to}`,
text: msg,
url,
});
} catch { /* user canceled */ }
} else {
window.open(`https://wa.me/?text=${encodeURIComponent(msg + '\n' + url)}`, '_blank');
}
}, [to, msg, url]);


const copy = useCallback(async () => {
try {
await navigator.clipboard.writeText(url);
setCopied(true);
setTimeout(() => setCopied(false), 1500);
} catch {}
}, [url]);


return (
<div className="flex flex-wrap items-center justify-center gap-3">
<button
onClick={share}
className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm hover:bg-white active:scale-[0.99]"
>
<Share2 className="h-4 w-4" /> Bagikan
</button>
<a
href={`https://wa.me/?text=${encodeURIComponent(msg + '\n' + url)}`}
target="_blank" rel="noreferrer"
className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm hover:bg-green-100"
>
<Send className="h-4 w-4" /> WhatsApp
</a>
<button
onClick={copy}
className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm hover:bg-white"
>
<Copy className="h-4 w-4" /> {copied ? 'Tersalin!' : 'Salin Link'}
</button>
</div>
);
}