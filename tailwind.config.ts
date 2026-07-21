import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'about-us': "url('/images/bradcomed-banner.png')", // Replace with your image path
        'premium-radial':
          "radial-gradient(1200px 600px at 50% -10%, rgba(99,102,241,0.16), transparent 60%), radial-gradient(900px 500px at 100% 0%, rgba(147,51,234,0.12), transparent 55%)",
        'premium-accent': "linear-gradient(135deg, #6366F1 0%, #9333EA 100%)",
        'premium-gold': "linear-gradient(135deg, #E6C767 0%, #D4AF37 100%)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4338CA",
        },
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#E6C767",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        success: {
          DEFAULT: "#28A744",
          light: "#008234",
        },
        // NOTE: "dark" is only ever used as a text color (text-dark*), so these
        // are flipped to light tones for the premium-dark theme.
        dark: {
          DEFAULT: "#E7E9F2",
          secondary: "#AAB6D2",
          deep: "#F2F3F8",
          gray: "#9AA2B4",
          deepSlate: "#B4BCCC",
        },
        // "white.DEFAULT" stays #fff because it is also used as text-white.
        // The *background* usages (bg-white) are darkened in premium-dark.css.
        // The slate family below is background-only, so darkened here directly.
        white: {
          DEFAULT: "#fff",
          lightSlate: "#0F1119",
          softSlate: "#12141D",
          softGray: "#12141D",
          cloudy: "#171A26",
          frosted: "#1D2130",
          midGray: "#8793A7",
        },
        info: {
          DEFAULT: "#003B95",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
} satisfies Config;
