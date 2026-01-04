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
            // ImageResponse JSX element
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #111827, #000000)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div style={{ fontSize: 90, fontWeight: 'bold', marginBottom: 20 }}>
                    Sahil Umraniya
                </div>
                <div style={{ fontSize: 40, color: '#9CA3AF' }}>
                    Full Stack Engineer
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}