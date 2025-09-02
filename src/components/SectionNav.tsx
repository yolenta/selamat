'use client';
import { useEffect, useState } from 'react';


export default function SectionNav({ ids = ["s1", "s2", "s3"] as const }: { ids?: readonly string[] }) {
const [active, setActive] = useState(ids[0]);


useEffect(() => {
const obs = new IntersectionObserver(
(entries) => {
entries.forEach((e) => {
if (e.isIntersecting) setActive((e.target as HTMLElement).id);
});
},
{ root: null, threshold: 0.6 }
);


ids.forEach((id) => {
const el = document.getElementById(id);
if (el) obs.observe(el);
});


return () => obs.disconnect();
}, [ids]);


return (
<nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
{ids.map((id) => (
<a
key={id}
href={`#${id}`}
aria-label={`Ke bagian ${id}`}
className={`h-3 w-3 rounded-full ring-1 ring-slate-300 transition-all ${active === id ? 'bg-slate-900 scale-110' : 'bg-white/70 hover:bg-white'}`}
/>
))}
</nav>
);
}