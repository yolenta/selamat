import { ImageResponse } from 'next/og';


export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const to = searchParams.get('to') ?? 'Sayang';
const msg = searchParams.get('msg') ?? 'Selamat ulang tahun!';


return new ImageResponse(
(
<div
style={{
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
background: 'linear-gradient(135deg,#fff0f6,#f3e8ff)'
}}
>
<div
style={{
fontSize: 56,
lineHeight: 1.2,
fontFamily: 'serif',
width: 1000,
color: '#0f172a',
textAlign: 'center',
}}
>
<div style={{ fontSize: 24, letterSpacing: 6, color: '#64748b', textTransform: 'uppercase' }}>Untuk</div>
<div style={{ fontWeight: 700, marginTop: 8 }}>{to}</div>
<div style={{ fontSize: 28, marginTop: 16, color: '#334155' }}>{msg}</div>
</div>
</div>
),
{ ...size }
);
}