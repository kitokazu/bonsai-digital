import { ImageResponse } from "next/og";

export const alt = "Bonsai Digital, a Japan-based digital studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens from app/globals.css, resolved to hex for satori
const cream = "#f9f7f2"; // --background: 40 30% 97%
const ink = "#21282c"; // --foreground: 200 15% 15%
const sage = "#437059"; // --primary: 150 25% 35%

const wordmark = "Bonsai Digital";
const tagline = "DIGITAL STUDIO · TOKYO, JAPAN";

async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font: ${family}`);
}

export default async function Image() {
  const [cormorant, inter] = await Promise.all([
    loadGoogleFont("Cormorant Garamond:wght@600", wordmark),
    loadGoogleFont("Inter:wght@500", tagline),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cream,
        }}
      >
        <div
          style={{
            width: 56,
            height: 3,
            backgroundColor: sage,
            marginBottom: 44,
          }}
        />
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: 116,
            fontWeight: 600,
            color: ink,
            lineHeight: 1,
          }}
        >
          {wordmark}
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 24,
            fontWeight: 500,
            color: sage,
            letterSpacing: 8,
            marginTop: 48,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorant,
          weight: 600,
          style: "normal",
        },
        {
          name: "Inter",
          data: inter,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
