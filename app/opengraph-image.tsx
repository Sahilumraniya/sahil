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
                    backgroundColor: '#050505',
                    position: 'relative',
                    fontFamily: 'sans-serif', // Satori defaults, or load a custom font if needed
                }}
            >
                {/* --- BACKGROUND FX --- */}

                {/* Mesh Gradient (Northern Lights) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                        filter: 'blur(60px)',
                        opacity: 0.8,
                    }}
                />

                {/* Technical Grid Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                        opacity: 0.5,
                    }}
                />

                {/* Vignette */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, transparent 40%, #050505 100%)',
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
                    {/* Status Pill */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '8px 20px',
                            borderRadius: '99px',
                            marginBottom: '20px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#4ade80',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #4ade80',
                            }}
                        />
                        <div
                            style={{
                                color: '#cbd5e1',
                                fontSize: '16px',
                                fontWeight: 500,
                                letterSpacing: '0.02em',
                            }}
                        >
                            Available for new projects
                        </div>
                    </div>

                    {/* Hero Title */}
                    <div
                        style={{
                            fontSize: '96px',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            color: 'white',
                            marginBottom: '12px',
                            display: 'flex',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #fff 40%, #a78bfa 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Sahil Umraniya
                        </span>
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: '24px',
                            color: '#94a3b8',
                            marginBottom: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'monospace',
                        }}
                    >
                        &lt;FullStack <span style={{ color: '#a78bfa', marginLeft: 6 }}>Engineer</span> /&gt;
                        <span style={{ margin: '0 12px', color: '#64748b' }}>•</span>
                        &lt;System <span style={{ color: '#38bdf8', marginLeft: 6 }}>Architect</span> /&gt;
                    </div>

                    {/* CTA Highlight Box */}
                    <div
                        style={{
                            marginBottom: '35px',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '24px 50px',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '24px',
                                color: '#94a3b8',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                marginBottom: '6px',
                            }}
                        >
                            Have an idea? Let&apos;s connect &amp;
                        </div>
                        <div
                            style={{
                                fontSize: '44px',
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1,
                                background: 'linear-gradient(90deg, #e2e8f0, #ffffff)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                textShadow: '0 10px 30px rgba(255,255,255,0.1)',
                            }}
                        >
                            Build your Next-Gen Project
                        </div>
                    </div>

                    {/* Tech Dock */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            background: 'rgba(10, 10, 10, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '16px 32px',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)',
                        }}
                    >
                        {/* Item 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(97, 218, 251, 0.3)', color: '#61DAFB' }}>
                                ⚛
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Next.js</div>
                        </div>

                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />

                        {/* Item 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(104, 160, 99, 0.3)', color: '#68a063' }}>
                                N
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Node.js</div>
                        </div>

                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />

                        {/* Item 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(167, 139, 250, 0.3)', color: '#a78bfa' }}>
                                AI
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>GenAI</div>
                        </div>

                        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />

                        {/* Item 4 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(244, 114, 182, 0.3)', color: '#f472b6' }}>
                                ☁
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Cloud</div>
                        </div>
                    </div>
                </div>

                {/* Footer URL */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        color: '#475569',
                        fontSize: '16px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'monospace',
                    }}
                >
                    sahilumraniya.dev
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}