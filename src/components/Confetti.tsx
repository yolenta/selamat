'use client';
import { useEffect } from 'react';


export default function Confetti({ fireOnMount = true }: { fireOnMount?: boolean }) {
useEffect(() => {
let cancelled = false;
const run = async () => {
const confetti = (await import('canvas-confetti')).default;
if (!cancelled && fireOnMount) {
confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
setTimeout(() => confetti({ particleCount: 120, angle: 60, spread: 55, origin: { x: 0 } }), 180);
setTimeout(() => confetti({ particleCount: 120, angle: 120, spread: 55, origin: { x: 1 } }), 280);
}
};
run();
return () => { cancelled = true; };
}, [fireOnMount]);
return null;
}