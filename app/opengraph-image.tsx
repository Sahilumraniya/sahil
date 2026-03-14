import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Sahil Umraniya | Full Stack Engineer'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#020617',
                    position: 'relative',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* --- BACKGROUND FX --- */}

                {/* Aurora Mesh Gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        width: '120%',
                        height: '120%',
                        background: `
                            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
                            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 10% 90%, rgba(16, 185, 129, 0.1) 0%, transparent 40%)
                        `,
                        opacity: 1,
                    }}
                />

                {/* Engineering Grid */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Subtle Scanlines */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.02) 50%)',
                        backgroundSize: '100% 4px',
                    }}
                />

                {/* --- MAIN CONTENT --- */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                    }}
                >
                    {/* Status Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '6px 16px',
                            borderRadius: '99px',
                            marginBottom: '32px',
                        }}
                    >
                        <div
                            style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#10b981',
                                borderRadius: '50%',
                                boxShadow: '0 0 12px #10b981',
                            }}
                        />
                        <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Engineer_Status: Available
                        </div>
                    </div>

                    {/* Name with Gradient */}
                    <div
                        style={{
                            fontSize: '110px',
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: '-0.05em',
                            display: 'flex',
                            marginBottom: '16px',
                        }}
                    >
                        <span
                            style={{
                                background: 'linear-gradient(to bottom right, #ffffff 30%, #a78bfa 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Sahil Umraniya
                        </span>
                    </div>

                    {/* Role / Tagline */}
                    <div
                        style={{
                            fontSize: '28px',
                            fontWeight: 400,
                            color: '#64748b',
                            marginBottom: '48px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ color: '#cbd5e1' }}>Full Stack Engineer</span>
                        <span style={{ color: '#334155' }}>|</span>
                        <span style={{ color: '#cbd5e1' }}>UI/UX Architect</span>
                        <span style={{ color: '#334155' }}>|</span>
                        <span style={{ color: '#cbd5e1' }}>AI Enthusiast</span>
                    </div>

                    {/* Premium Dock */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '40px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '24px 48px',
                            borderRadius: '32px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '32px', opacity: 0.9 }}>⚛️</div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next.js</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.05)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '32px', opacity: 0.9 }}>🛠️</div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FullStack</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.05)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '32px', opacity: 0.9 }}>🧠</div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Gen_AI</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.05)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '32px', opacity: 0.9 }}>⚡</div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vercel</div>
                        </div>
                    </div>
                </div>

                {/* Footer Brand */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <div style={{ width: '20px', height: '2px', background: '#a78bfa', opacity: 0.5 }} />
                    <div style={{ color: '#475569', fontSize: '16px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        sahilumraniya.dev
                    </div>
                    <div style={{ width: '20px', height: '2px', background: '#a78bfa', opacity: 0.5 }} />
                </div>

                {/* Corner Decoration */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '30px',
                        width: '100px',
                        height: '100px',
                        backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}