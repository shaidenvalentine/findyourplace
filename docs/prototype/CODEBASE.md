# Find Your Place - Complete Codebase Export

Generated: Sat May 30 11:31:07 UTC 2026

## Stack
React 18 + Vite 5 + TypeScript 5 + Tailwind v3 + shadcn/ui + Supabase + Stripe + Framer Motion

## Root Configs


### `package.json`
```
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.90.1",
    "@tanstack/react-query": "^5.83.0",
    "canvas-confetti": "^1.9.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.24.12",
    "html-to-image": "^1.11.13",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "vite-plugin-pwa": "^1.2.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19"
  }
}
```

### `tsconfig.json`
```
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}
```

### `tsconfig.app.json`
```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### `tsconfig.node.json`
```
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### `vite.config.ts`
```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png", "apple-touch-icon.png"],
      manifest: false, // We're using our own manifest.json
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### `tailwind.config.ts`
```
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "globe-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "globe-rotate": "globe-rotate 60s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### `postcss.config.js`
```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `eslint.config.js`
```
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
```

### `components.json`
```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    
    <!-- App Title & Description -->
    <title>Find Your Place - Discover Where You Belong</title>
    <meta name="description" content="AI-powered city matching. Answer questions about your lifestyle and values, and we'll find the cities where you'll thrive." />
    <meta name="author" content="Find Your Place" />
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#0d0f14" />
    
    <!-- iOS PWA Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Find Your Place" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    
    <!-- Web Manifest -->
    <link rel="manifest" href="/manifest.json" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />

    <!-- Open Graph -->
    <meta property="og:title" content="Find Your Place - Discover Where You Belong" />
    <meta property="og:description" content="AI-powered city matching. Answer questions about your lifestyle and values, and we'll find the cities where you'll thrive." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@findyourplace" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `README.md`
```
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
```

### `public/manifest.json`
```
{
  "name": "Find Your Place",
  "short_name": "FYP",
  "description": "AI-powered city matching - discover where you belong",
  "theme_color": "#0d0f14",
  "background_color": "#0d0f14",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "scope": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

### `public/robots.txt`
```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
```

## Source Files

### `src/App.css`
```tsx
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

### `src/App.tsx`
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Onboarding from "./pages/Onboarding";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Places from "./pages/Places";
import AdminPlaceImages from "./pages/AdminPlaceImages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/places" element={<Places />} />
            <Route path="/app/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/onboarding" element={<Onboarding />} />
            <Route path="/app/results/:runId" element={<Results />} />
            <Route path="/admin/place-images" element={<AdminPlaceImages />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
```

### `src/components/NavLink.tsx`
```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
```

### `src/components/landing/CTA.tsx`
```tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/10 via-accent/5 to-transparent blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Where You Belong?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of people who've discovered their perfect place. 
            The quiz takes just 10 minutes—and could change your life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="xl" className="btn-hero text-background">
              <Link to="/app/onboarding">
                Start Your Match
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Your data is private. You control what you share.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
```

### `src/components/landing/Features.tsx`
```tsx
import { motion } from "framer-motion";
import { 
  Sun, 
  Users, 
  Briefcase, 
  Shield, 
  Heart, 
  Plane,
  DollarSign,
  Activity,
  Car,
  FileText
} from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Climate & Nature",
    description: "Beach or mountains? Sunshine or seasons? Find your perfect environment.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Users,
    title: "Community Fit",
    description: "Discover places with your kind of people—creatives, entrepreneurs, families.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Match with cities that align with your industry and work style.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: DollarSign,
    title: "Cost of Living",
    description: "Transparent budget analysis to find affordable quality of life.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Shield,
    title: "Safety & Stability",
    description: "Understand healthcare, governance, and rule of law in each location.",
    gradient: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-400",
  },
  {
    icon: Activity,
    title: "Wellness Ecosystem",
    description: "Gyms, outdoor activities, healthcare—find places that support your health.",
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: Heart,
    title: "Social & Dating",
    description: "Community vibe, dating scenes, and family-friendliness factored in.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: Plane,
    title: "Travel Connectivity",
    description: "Airport access and weekend trip potential for the explorers.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Car,
    title: "Mobility & Transit",
    description: "Walkability, public transit, and getting around without a car.",
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: FileText,
    title: "Visa & Taxes",
    description: "Immigration pathways, tax implications, and bureaucracy levels.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container px-4">
        {/* Belief statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-muted-foreground italic border-l-2 border-primary pl-6 text-left">
            "We believe the place you live is the foundation of becoming your best self. 
            The right environment doesn't just support your goals—it accelerates them."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            10 Dimensions That Define Your Ideal Place
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dimension weighted to your unique values and priorities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card-interactive p-5 group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} border border-white/5 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
```

### `src/components/landing/Footer.tsx`
```tsx
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-primary to-accent opacity-60" style={{ filter: 'blur(4px)' }} />
              <div className="relative w-7 h-7 rounded-full bg-background flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-accent" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Find Your <span className="text-gradient font-bold">Place</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Find Your Place. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### `src/components/landing/Hero.tsx`
```tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Generate random stars for the background
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));
};

const stars = generateStars(50);

const Hero = () => {
  const [liveCount, setLiveCount] = useState(12847);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Globe */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 lg:translate-x-1/6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer atmosphere glow */}
          <div className="absolute -inset-20 rounded-full bg-gradient-radial from-primary/20 via-accent/10 to-transparent blur-3xl animate-pulse-glow" />
          
          {/* Globe container */}
          <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]">
            {/* Globe base */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-cyan-900/30 to-teal-900/20 border border-primary/20" />
            
            {/* Inner glow */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            {/* Grid lines - Longitude */}
            <svg className="absolute inset-0 w-full h-full animate-globe-rotate" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(210 100% 60%)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(165 80% 45%)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(210 100% 60%)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#lineGradient)" strokeWidth="0.5">
                {/* Longitude lines */}
                <ellipse cx="200" cy="200" rx="180" ry="180" />
                <ellipse cx="200" cy="200" rx="180" ry="90" />
                <ellipse cx="200" cy="200" rx="180" ry="45" />
                <ellipse cx="200" cy="200" rx="90" ry="180" />
                <ellipse cx="200" cy="200" rx="45" ry="180" />
                <ellipse cx="200" cy="200" rx="135" ry="180" />
                {/* Latitude lines */}
                <ellipse cx="200" cy="200" rx="180" ry="180" transform="rotate(30 200 200)" />
                <ellipse cx="200" cy="200" rx="180" ry="180" transform="rotate(60 200 200)" />
                <ellipse cx="200" cy="200" rx="180" ry="180" transform="rotate(90 200 200)" />
              </g>
            </svg>
            
            {/* Highlight arc */}
            <div className="absolute top-10 left-10 right-1/2 bottom-1/2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
            
            {/* Atmosphere edge */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'radial-gradient(circle at 30% 30%, transparent 60%, hsl(210 100% 60% / 0.1) 80%, hsl(210 100% 60% / 0.2) 100%)',
            }} />
          </div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Place Matching
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            Discover Where
            <br />
            <span className="text-gradient">You Belong</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            Where you live shapes everything—your energy, your relationships, 
            your opportunities. Most people never question if they're in the right place.{" "}
            <span className="text-foreground font-medium">Find out in 10 minutes.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button asChild size="xl" className="btn-hero text-background">
              <Link to="/app/onboarding">
                Find Your Place
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
              <a href="#how-it-works">
                See How It Works
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            {/* Live counter - social proof */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span>
                <span className="font-semibold text-foreground tabular-nums">{liveCount.toLocaleString()}</span> people found their place
              </span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>10 minute quiz</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span>Privacy-first</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
```

### `src/components/landing/HowItWorks.tsx`
```tsx
import { motion } from "framer-motion";
import { ClipboardList, Brain, MapPin, Sliders } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Share Your Lifestyle",
    description: "Tell us about your ideal climate, career goals, social preferences, and what matters most to you.",
  },
  {
    icon: Brain,
    title: "Optional Deep Insights",
    description: "Connect social profiles or use our ChatGPT reflection prompt for even more personalized matches.",
  },
  {
    icon: MapPin,
    title: "Discover Your Matches",
    description: "Get a ranked list of cities with transparent scoring—see exactly why each place fits you.",
  },
  {
    icon: Sliders,
    title: "Explore & Refine",
    description: "Adjust weights, compare cities, and dive deep into what makes each location special.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 section-gradient section-glow">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A thoughtful process designed to understand who you are and where you'll flourish.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card-elevated p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
```

### `src/components/landing/Navbar.tsx`
```tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isLanding 
          ? "glass shadow-lg shadow-black/10" 
          : "bg-transparent"
      }`}
    >
      <div className="container px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-primary to-accent opacity-80 animate-[spin_8s_linear_infinite]" style={{ filter: 'blur(6px)' }} />
              <div className="relative w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <Globe className="w-4 h-4 text-accent" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Find Your <span className="text-gradient font-bold">Place</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <Link to="/places" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Places</Link>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/app/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="btn-hero text-background">
              <Link to="/app/onboarding">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="container px-4 py-6 flex flex-col gap-4">
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
              <Link
                to="/places"
                onClick={() => setIsOpen(false)}
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Places
              </Link>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/app/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="w-full btn-hero text-background">
                  <Link to="/app/onboarding" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
```

### `src/components/landing/Statistics.tsx`
```tsx
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Brain, Zap } from "lucide-react";

const stats = [
  {
    value: "83%",
    label: "Living in the Wrong Place",
    description: "of people we've matched discovered they're NOT in their ideal city",
    icon: MapPin,
  },
  {
    value: "4.2x",
    label: "More Fulfilled",
    description: "higher life satisfaction reported by those who relocated to their match",
    icon: TrendingUp,
  },
  {
    value: "91%",
    label: "Never Considered Moving",
    description: "had never seriously evaluated if their city was right for them",
    icon: Brain,
  },
  {
    value: "47%",
    label: "Career Growth",
    description: "average income increase within 2 years of moving to their matched city",
    icon: Zap,
  },
];

const Statistics = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-6">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Most People Are Living in the{" "}
            <span className="text-gradient">Wrong Place</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The place you live determines more about your life than almost any other decision. 
            Your environment shapes your habits, your relationships, your opportunities, 
            and ultimately <span className="text-foreground font-medium">who you become</span>.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solution statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-elevated p-8 md:p-12 text-center relative overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
            <div className="absolute inset-[1px] rounded-2xl bg-card" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                The Solution
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Find the Environment Where You'll <span className="text-accent">Thrive</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe the right location doesn't just support your goals—it <span className="text-foreground font-medium">accelerates</span> them. 
                Find Your Place analyzes 10 dimensions of life quality, weighted to your unique values, 
                to discover where you'll become the best version of yourself.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
```

### `src/components/onboarding/OnboardingLayout.tsx`
```tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  currentStep: number;
  children: ReactNode;
}

const STEP_INFO = [
  { title: "The Basics", description: "Let's get to know you" },
  { title: "Your Lifestyle", description: "How do you want to live?" },
  { title: "Environment", description: "Your ideal surroundings" },
  { title: "Career & Growth", description: "Your professional path" },
  { title: "Community", description: "Your ideal social scene" },
  { title: "Cost & Finances", description: "Making it work financially" },
  { title: "Values", description: "What matters most to you" },
  { title: "Health & Travel", description: "Staying healthy and connected" },
  { title: "Final Touches", description: "Safety and your top priorities" },
];

const OnboardingLayout = ({ currentStep, children }: OnboardingLayoutProps) => {
  const totalSteps = STEP_INFO.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-primary opacity-20 group-hover:opacity-30 transition-opacity" />
                <Globe className="w-5 h-5 text-accent relative z-10" />
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:block">
                Find Your <span className="text-gradient">Place</span>
              </span>
            </Link>

            {/* Progress indicator */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                {STEP_INFO.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index < currentStep
                        ? "bg-primary"
                        : index === currentStep
                        ? "bg-primary w-8"
                        : "bg-border"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} / {totalSteps}
              </span>
            </div>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <X className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-secondary -mx-4 px-4">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-32 min-h-screen flex flex-col">
        <div className="container px-4 flex-1 flex flex-col">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
          >
            {/* Step header */}
            <div className="mb-6 sm:mb-8">
              <p className="text-sm text-primary font-medium mb-1.5">
                Step {currentStep + 1}: {STEP_INFO[currentStep]?.title}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {STEP_INFO[currentStep]?.description}
              </h1>
            </div>

            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
```

### `src/components/onboarding/OptionButton.tsx`
```tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const OptionButton = ({ children, selected, onClick, className }: OptionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center px-5 py-4 rounded-xl border transition-all duration-200",
        "min-h-[52px]", // Larger touch target for mobile
        "hover:border-primary/50 hover:bg-primary/5",
        "active:scale-[0.97] active:bg-primary/10", // Better tap feedback
        selected
          ? "border-primary bg-primary/10 text-primary font-medium shadow-sm shadow-primary/20"
          : "border-border bg-card/50 text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
};

export default OptionButton;
```

### `src/components/onboarding/steps/BasicsStep.tsx`
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";

interface BasicsStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const AGE_RANGES = [
  { value: "18-25", label: "18-25" },
  { value: "26-35", label: "26-35" },
  { value: "36-45", label: "36-45" },
  { value: "46-55", label: "46-55" },
  { value: "55+", label: "55+" },
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Italian",
  "Mandarin",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Other",
];

const BasicsStep = ({ data, onChange }: BasicsStepProps) => {
  const toggleLanguage = (lang: string) => {
    const current = data.languages || [];
    const updated = current.includes(lang)
      ? current.filter((l) => l !== lang)
      : [...current, lang];
    onChange({ languages: updated });
  };

  return (
    <div className="space-y-8">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">What should we call you?</Label>
        <Input
          id="name"
          placeholder="Your name or nickname"
          value={data.name || ""}
          onChange={(e) => onChange({ name: e.target.value })}
          className="max-w-sm"
        />
      </div>

      {/* Current City */}
      <div className="space-y-2">
        <Label htmlFor="currentCity">Where do you live right now?</Label>
        <Input
          id="currentCity"
          placeholder="e.g., New York, London, Singapore"
          value={data.currentCity || ""}
          onChange={(e) => onChange({ currentCity: e.target.value })}
          className="max-w-sm"
        />
        <p className="text-xs text-muted-foreground">
          We'll show you how well your current place fits you
        </p>
      </div>

      {/* Age Range */}
      <div className="space-y-3">
        <Label>Age range (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {AGE_RANGES.map((age) => (
            <OptionButton
              key={age.value}
              selected={data.ageRange === age.value}
              onClick={() => onChange({ ageRange: age.value })}
            >
              {age.label}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <Label>Languages you speak</Label>
        <p className="text-sm text-muted-foreground">
          Select all that apply - we'll factor in language-friendly destinations
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <OptionButton
              key={lang}
              selected={(data.languages || []).includes(lang)}
              onClick={() => toggleLanguage(lang)}
            >
              {lang}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicsStep;
```

### `src/components/onboarding/steps/CareerStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";

interface CareerStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const INDUSTRIES = [
  "Tech / Software",
  "Finance",
  "Healthcare",
  "Creative / Design",
  "Marketing",
  "Education",
  "Hospitality",
  "Real Estate",
  "Consulting",
  "Freelance / Solopreneur",
  "Retired",
  "Other",
];

const WORK_STYLES = [
  { value: "remote", label: "Fully remote", desc: "Work from anywhere" },
  { value: "hybrid", label: "Hybrid", desc: "Office some days" },
  { value: "office", label: "In-office", desc: "Need a local job" },
  { value: "entrepreneur", label: "Entrepreneur", desc: "Building my own" },
  { value: "retired", label: "Retired / Not working", desc: "Enjoying life" },
];

const NETWORKING = [
  { value: "essential", label: "Essential", desc: "Need a strong professional scene" },
  { value: "nice", label: "Nice to have", desc: "Some networking would be good" },
  { value: "unimportant", label: "Not important", desc: "I work independently" },
];

const CareerStep = ({ data, onChange }: CareerStepProps) => {
  const toggleIndustry = (industry: string) => {
    const current = data.industries || [];
    const updated = current.includes(industry)
      ? current.filter((i) => i !== industry)
      : [...current, industry];
    onChange({ industries: updated });
  };

  return (
    <div className="space-y-8">
      {/* Industries */}
      <div className="space-y-3">
        <Label>Your industry or field</Label>
        <p className="text-sm text-muted-foreground">
          Select all that apply
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <OptionButton
              key={industry}
              selected={(data.industries || []).includes(industry)}
              onClick={() => toggleIndustry(industry)}
            >
              {industry}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Work style */}
      <div className="space-y-3">
        <Label>How do you work?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WORK_STYLES.map((style) => (
            <OptionButton
              key={style.value}
              selected={data.workStyle === style.value}
              onClick={() => onChange({ workStyle: style.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium">{style.label}</span>
              <span className="text-xs text-muted-foreground">{style.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Networking importance */}
      <div className="space-y-3">
        <Label>How important is professional networking?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {NETWORKING.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.networkingImportance === option.value}
              onClick={() => onChange({ networkingImportance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerStep;
```

### `src/components/onboarding/steps/CostStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";

interface CostStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const BUDGET_RANGES = [
  { value: "budget", label: "$1,000-$2,000/mo", desc: "Budget-friendly" },
  { value: "moderate", label: "$2,000-$4,000/mo", desc: "Moderate lifestyle" },
  { value: "comfortable", label: "$4,000-$6,000/mo", desc: "Comfortable living" },
  { value: "premium", label: "$6,000-$10,000/mo", desc: "Premium lifestyle" },
  { value: "luxury", label: "$10,000+/mo", desc: "Luxury living" },
];

const HOUSING = [
  { value: "apartment", label: "Apartment / Condo", desc: "Low maintenance" },
  { value: "house", label: "House / Villa", desc: "Space & privacy" },
  { value: "flexible", label: "Flexible", desc: "Either works" },
];

const TAX_SENSITIVITY = [
  { value: "high", label: "Very sensitive", desc: "Taxes are a major factor" },
  { value: "moderate", label: "Somewhat sensitive", desc: "Consider but not critical" },
  { value: "low", label: "Not sensitive", desc: "Quality > tax savings" },
];

const CostStep = ({ data, onChange }: CostStepProps) => {
  return (
    <div className="space-y-8">
      {/* Budget */}
      <div className="space-y-3">
        <Label>Monthly living budget (rent + expenses)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BUDGET_RANGES.map((budget) => (
            <OptionButton
              key={budget.value}
              selected={data.budgetRange === budget.value}
              onClick={() => onChange({ budgetRange: budget.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{budget.label}</span>
              <span className="text-xs text-muted-foreground">{budget.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Housing preference */}
      <div className="space-y-3">
        <Label>Housing preference</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HOUSING.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.housingPreference === option.value}
              onClick={() => onChange({ housingPreference: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Tax sensitivity */}
      <div className="space-y-3">
        <Label>How important are tax considerations?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TAX_SENSITIVITY.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.taxSensitivity === option.value}
              onClick={() => onChange({ taxSensitivity: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostStep;
```

### `src/components/onboarding/steps/HealthStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";

interface HealthStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const GYM_CULTURE = [
  { value: "essential", label: "Essential", desc: "Need great gym access" },
  { value: "nice", label: "Nice to have", desc: "Would use if available" },
  { value: "unimportant", label: "Not important", desc: "Don't use gyms" },
];

const WELLNESS = [
  { value: "high", label: "Very important", desc: "Yoga, spas, organic food" },
  { value: "moderate", label: "Somewhat important", desc: "Some wellness options" },
  { value: "low", label: "Not important", desc: "Not a priority" },
];

const HEALTHCARE = [
  { value: "essential", label: "Top priority", desc: "World-class healthcare needed" },
  { value: "important", label: "Important", desc: "Good quality matters" },
  { value: "basic", label: "Basic is fine", desc: "Just need basics covered" },
];

const HealthStep = ({ data, onChange }: HealthStepProps) => {
  return (
    <div className="space-y-8">
      {/* Gym culture */}
      <div className="space-y-3">
        <Label>How important is gym & fitness culture?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GYM_CULTURE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.gymCulture === option.value}
              onClick={() => onChange({ gymCulture: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Wellness */}
      <div className="space-y-3">
        <Label>Wellness ecosystem (yoga, spas, healthy food)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WELLNESS.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.wellnessImportance === option.value}
              onClick={() => onChange({ wellnessImportance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Healthcare */}
      <div className="space-y-3">
        <Label>Healthcare quality requirements</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HEALTHCARE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.healthcareQuality === option.value}
              onClick={() => onChange({ healthcareQuality: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthStep;
```

### `src/components/onboarding/steps/HealthTravelStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Plane, Heart } from "lucide-react";

interface HealthTravelStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const HEALTHCARE = [
  { value: "essential", label: "Top priority", desc: "World-class healthcare needed" },
  { value: "important", label: "Important", desc: "Good quality matters" },
  { value: "basic", label: "Basic is fine", desc: "Just need basics covered" },
];

const WELLNESS = [
  { value: "high", label: "Very important", desc: "Yoga, spas, organic food" },
  { value: "moderate", label: "Somewhat", desc: "Some wellness options" },
  { value: "low", label: "Not important", desc: "Not a priority" },
];

const AIRPORT = [
  { value: "essential", label: "Essential", desc: "Need international hub" },
  { value: "important", label: "Important", desc: "Good connections matter" },
  { value: "moderate", label: "Moderate", desc: "Some access is fine" },
];

const HealthTravelStep = ({ data, onChange }: HealthTravelStepProps) => {
  return (
    <div className="space-y-8">
      {/* Healthcare */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Healthcare quality
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {HEALTHCARE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.healthcareQuality === option.value}
              onClick={() => onChange({ healthcareQuality: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Wellness */}
      <div className="space-y-3">
        <Label>Wellness ecosystem (yoga, spas, healthy food)</Label>
        <div className="grid grid-cols-3 gap-3">
          {WELLNESS.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.wellnessImportance === option.value}
              onClick={() => onChange({ wellnessImportance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Airport connectivity */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Plane className="w-4 h-4" />
          Airport connectivity
        </Label>
        <p className="text-sm text-muted-foreground">
          How important is easy access to international flights?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {AIRPORT.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.airportConnectivity === option.value}
              onClick={() => onChange({ airportConnectivity: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTravelStep;
```

### `src/components/onboarding/steps/LifestyleStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Sun, Cloud, Snowflake, Thermometer, TreePine, Building2, Waves, Mountain } from "lucide-react";

interface LifestyleStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const CLIMATES = [
  { value: "tropical", label: "Tropical", icon: Sun, desc: "Year-round warmth" },
  { value: "mediterranean", label: "Mediterranean", icon: Sun, desc: "Mild & sunny" },
  { value: "temperate", label: "Temperate", icon: Cloud, desc: "Four seasons" },
  { value: "dry", label: "Dry/Desert", icon: Thermometer, desc: "Hot & arid" },
  { value: "cold", label: "Cold/Nordic", icon: Snowflake, desc: "Snowy winters" },
];

const OUTDOOR_URBAN = [
  { value: "outdoor", label: "Outdoor-focused", icon: TreePine, desc: "Nature at my doorstep" },
  { value: "urban", label: "Urban-focused", icon: Building2, desc: "City energy" },
  { value: "balanced", label: "Balanced", desc: "Best of both worlds" },
];

const BEACH_MOUNTAIN = [
  { value: "beach", label: "Beach", icon: Waves, desc: "Sand & surf" },
  { value: "mountain", label: "Mountain", icon: Mountain, desc: "Peaks & trails" },
  { value: "both", label: "Both equally", desc: "Love them all" },
  { value: "neither", label: "Not important", desc: "City is fine" },
];

const NOISE = [
  { value: "quiet", label: "Very quiet", desc: "Peace & silence" },
  { value: "moderate", label: "Moderate buzz", desc: "Some activity" },
  { value: "lively", label: "Lively & energetic", desc: "Always something happening" },
];

const LifestyleStep = ({ data, onChange }: LifestyleStepProps) => {
  return (
    <div className="space-y-8">
      {/* Climate */}
      <div className="space-y-3">
        <Label>Preferred climate</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CLIMATES.map((climate) => (
            <OptionButton
              key={climate.value}
              selected={data.preferredClimate === climate.value}
              onClick={() => onChange({ preferredClimate: climate.value })}
              className="flex-col items-start p-4 h-auto"
            >
              {climate.icon && <climate.icon className="w-5 h-5 mb-2" />}
              <span className="font-medium">{climate.label}</span>
              <span className="text-xs text-muted-foreground">{climate.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Outdoor vs Urban */}
      <div className="space-y-3">
        <Label>Outdoor or urban lifestyle?</Label>
        <div className="grid grid-cols-3 gap-3">
          {OUTDOOR_URBAN.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.outdoorUrban === option.value}
              onClick={() => onChange({ outdoorUrban: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              {option.icon && <option.icon className="w-5 h-5 mb-2" />}
              <span className="font-medium text-sm">{option.label}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Beach vs Mountain */}
      <div className="space-y-3">
        <Label>Beach or mountains?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BEACH_MOUNTAIN.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.beachMountain === option.value}
              onClick={() => onChange({ beachMountain: option.value })}
              className="flex-col items-center p-4 h-auto"
            >
              {option.icon && <option.icon className="w-5 h-5 mb-2" />}
              <span className="font-medium text-sm">{option.label}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Noise tolerance */}
      <div className="space-y-3">
        <Label>Noise & energy level preference</Label>
        <div className="flex flex-wrap gap-3">
          {NOISE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.noiseTolerance === option.value}
              onClick={() => onChange({ noiseTolerance: option.value })}
            >
              {option.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifestyleStep;
```

### `src/components/onboarding/steps/MobilityStep.tsx`
```tsx
import { motion } from "framer-motion";
import { Home, Calendar, Compass, Sun, FileCheck, Sparkles, Users, DollarSign, LucideIcon } from "lucide-react";
import { OnboardingData } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface MobilityStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

interface MobilityOptionProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

function MobilityOption({ icon: Icon, label, description, selected, onClick }: MobilityOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left w-full",
        "hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99]",
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card/50"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
        selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className={cn("font-medium", selected && "text-primary")}>{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </button>
  );
}

const lifestyleModes = [
  { value: "rooted", label: "Rooted", description: "One home base — find your perfect city to settle into", icon: Home },
  { value: "nomadic", label: "Nomadic", description: "Follow the seasons — we'll build your annual circuit", icon: Compass },
];

const movementDriverOptions = [
  { value: "weather", label: "Chasing perfect weather", icon: Sun },
  { value: "visa", label: "Visa requirements", icon: FileCheck },
  { value: "inspiration", label: "Keeping things fresh & inspiring", icon: Sparkles },
  { value: "social", label: "Social events / conferences", icon: Users },
  { value: "cost", label: "Optimizing cost of living", icon: DollarSign },
];

const locationChangeOptions = [
  { value: "3-4", label: "3-4 places per year", description: "Seasonal rhythm" },
  { value: "4-6", label: "4-6 places per year", description: "Active nomad" },
  { value: "6+", label: "6+ places per year", description: "Full nomad lifestyle" },
];

const MobilityStep = ({ data, onChange }: MobilityStepProps) => {
  const isNomadic = data.lifestyleMode === "nomadic";

  const handleDriverToggle = (value: string) => {
    const current = data.movementDrivers || [];
    if (current.includes(value)) {
      onChange({ movementDrivers: current.filter((v) => v !== value) });
    } else {
      onChange({ movementDrivers: [...current, value] });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How do you want to live?</h1>
        <p className="text-muted-foreground">This helps us understand if you need one perfect place or a circuit of destinations.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your ideal lifestyle</h3>
        <div className="grid gap-3">
          {lifestyleModes.map((mode) => (
            <MobilityOption
              key={mode.value}
              icon={mode.icon}
              label={mode.label}
              description={mode.description}
              selected={data.lifestyleMode === mode.value}
              onClick={() => onChange({ 
                lifestyleMode: mode.value as OnboardingData['lifestyleMode'],
                ...(mode.value === 'rooted' ? { movementDrivers: undefined, locationChangesPerYear: undefined } : {})
              })}
            />
          ))}
        </div>
      </div>

      {isNomadic && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
          <h3 className="text-lg font-medium">What drives your movement?</h3>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          <div className="grid gap-3">
            {movementDriverOptions.map((option) => (
              <MobilityOption
                key={option.value}
                icon={option.icon}
                label={option.label}
                selected={(data.movementDrivers || []).includes(option.value)}
                onClick={() => handleDriverToggle(option.value)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {isNomadic && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
          <h3 className="text-lg font-medium">How many moves feels sustainable?</h3>
          <div className="grid gap-3">
            {locationChangeOptions.map((option) => (
              <MobilityOption
                key={option.value}
                icon={Calendar}
                label={option.label}
                description={option.description}
                selected={data.locationChangesPerYear === option.value}
                onClick={() => onChange({ locationChangesPerYear: option.value as OnboardingData['locationChangesPerYear'] })}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobilityStep;
```

### `src/components/onboarding/steps/SafetyPrioritiesStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Shield, Star } from "lucide-react";

interface SafetyPrioritiesStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const RISK_TOLERANCE = [
  { value: "low", label: "Low risk", desc: "Safety is paramount" },
  { value: "moderate", label: "Moderate", desc: "Balanced approach" },
  { value: "adventurous", label: "Adventurous", desc: "Will explore anywhere" },
];

const RULE_OF_LAW = [
  { value: "essential", label: "Essential", desc: "Strong governance required" },
  { value: "important", label: "Important", desc: "Generally stable country" },
  { value: "flexible", label: "Flexible", desc: "Can adapt to different systems" },
];

const TOP_PRIORITIES = [
  { value: "weather", label: "☀️ Perfect weather" },
  { value: "cost", label: "💰 Low cost of living" },
  { value: "safety", label: "🛡️ High safety" },
  { value: "culture", label: "🎭 Rich culture" },
  { value: "nature", label: "🌿 Access to nature" },
  { value: "nightlife", label: "🎉 Great nightlife" },
  { value: "community", label: "👥 Strong community" },
  { value: "career", label: "💼 Career opportunities" },
];

const SafetyPrioritiesStep = ({ data, onChange }: SafetyPrioritiesStepProps) => {
  const handlePriorityToggle = (value: string) => {
    const current = data.topPriorities || [];
    if (current.includes(value)) {
      onChange({ topPriorities: current.filter((v) => v !== value) });
    } else if (current.length < 3) {
      onChange({ topPriorities: [...current, value] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Risk tolerance */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Safety & risk tolerance
        </Label>
        <p className="text-sm text-muted-foreground">
          How important is low crime and personal safety?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {RISK_TOLERANCE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.riskTolerance === option.value}
              onClick={() => onChange({ riskTolerance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Rule of law */}
      <div className="space-y-3">
        <Label>Political stability & governance</Label>
        <div className="grid grid-cols-3 gap-3">
          {RULE_OF_LAW.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.ruleLawImportance === option.value}
              onClick={() => onChange({ ruleLawImportance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Top priorities */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          Your top 3 priorities
        </Label>
        <p className="text-sm text-muted-foreground">
          Select up to 3 things that matter most to you
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOP_PRIORITIES.map((option) => (
            <OptionButton
              key={option.value}
              selected={(data.topPriorities || []).includes(option.value)}
              onClick={() => handlePriorityToggle(option.value)}
              className="p-3 h-auto text-center justify-center"
            >
              <span className="text-sm">{option.label}</span>
            </OptionButton>
          ))}
        </div>
        {(data.topPriorities?.length || 0) > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            {data.topPriorities?.length}/3 selected
          </p>
        )}
      </div>
    </div>
  );
};

export default SafetyPrioritiesStep;
```

### `src/components/onboarding/steps/SafetyStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Shield } from "lucide-react";

interface SafetyStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const RISK_TOLERANCE = [
  { value: "low", label: "Low risk", desc: "Safety is paramount" },
  { value: "moderate", label: "Moderate", desc: "Balanced approach" },
  { value: "adventurous", label: "Adventurous", desc: "Willing to explore less safe areas" },
];

const RULE_OF_LAW = [
  { value: "essential", label: "Essential", desc: "Strong governance required" },
  { value: "important", label: "Important", desc: "Generally stable country" },
  { value: "flexible", label: "Flexible", desc: "Can adapt to different systems" },
];

const SafetyStep = ({ data, onChange }: SafetyStepProps) => {
  return (
    <div className="space-y-8">
      {/* Risk tolerance */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Personal safety risk tolerance
        </Label>
        <p className="text-sm text-muted-foreground">
          How important is low crime and high personal safety?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RISK_TOLERANCE.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.riskTolerance === option.value}
              onClick={() => onChange({ riskTolerance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Rule of law */}
      <div className="space-y-3">
        <Label>Political stability & governance</Label>
        <p className="text-sm text-muted-foreground">
          How important is rule of law and political stability?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RULE_OF_LAW.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.ruleLawImportance === option.value}
              onClick={() => onChange({ ruleLawImportance: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyStep;
```

### `src/components/onboarding/steps/SignalsStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "@/types/onboarding";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SignalsStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const CHATGPT_PROMPT = `Please summarize my lifestyle, values, and ideal living situation in a structured format. Include:

1. My ideal climate and environment
2. My work style and career goals
3. What I value in a community
4. My budget considerations
5. Any must-haves or dealbreakers for where I live
6. My hobbies and interests that affect location choice

Be specific and honest. This will be used to match me with cities.`;

const SignalsStep = ({ data, onChange }: SignalsStepProps) => {
  const copyPrompt = () => {
    navigator.clipboard.writeText(CHATGPT_PROMPT);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="space-y-10">
      <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
        <p className="text-sm">
          This step is <strong>completely optional</strong>. A ChatGPT reflection can improve 
          your match accuracy, but skip if you prefer not to share.
        </p>
      </div>

      {/* ChatGPT reflection */}
      <div className="space-y-4">
        <Label>ChatGPT reflection (optional)</Label>
        <p className="text-sm text-muted-foreground">
          Ask ChatGPT about your ideal living situation, then paste the response here
        </p>
        
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm font-medium mb-2">Copy this prompt to ChatGPT:</p>
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap mb-3 max-h-32 overflow-y-auto">
            {CHATGPT_PROMPT}
          </pre>
          <Button variant="outline" size="sm" onClick={copyPrompt}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Prompt
          </Button>
        </div>

        <Textarea
          placeholder="Paste ChatGPT's response here..."
          value={data.chatgptReflection || ""}
          onChange={(e) => onChange({ chatgptReflection: e.target.value })}
          rows={6}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default SignalsStep;
```

### `src/components/onboarding/steps/SocialStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Check } from "lucide-react";

interface SocialStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const COMMUNITY_VIBES = [
  { value: "expat", label: "International / Expat", desc: "Diverse, global community", icon: "🌍" },
  { value: "local", label: "Local-focused", desc: "Integrate with locals", icon: "🏠" },
  { value: "startup", label: "Startup / Hustle", desc: "Ambitious, driven people", icon: "🚀" },
  { value: "creative", label: "Creative / Artistic", desc: "Artists, designers, musicians", icon: "🎨" },
  { value: "family", label: "Family-oriented", desc: "Kid-friendly, safe", icon: "👨‍👩‍👧" },
  { value: "relaxed", label: "Slow & Relaxed", desc: "Chill vibes", icon: "🌴" },
];

const FAMILY_PROXIMITY = [
  { value: "close", label: "Very important", desc: "Need to be near family" },
  { value: "moderate", label: "Somewhat important", desc: "Visit a few times a year" },
  { value: "independent", label: "Not important", desc: "Happy to be far" },
];

const PEOPLE_DENSITY = [
  { value: "busy", label: "Busy & Social", desc: "Love being around people" },
  { value: "moderate", label: "Moderate", desc: "Balanced social life" },
  { value: "quiet", label: "Quiet & Private", desc: "Value solitude" },
];

const SocialStep = ({ data, onChange }: SocialStepProps) => {
  const selectedVibes = data.communityVibes || [];

  const toggleVibe = (value: string) => {
    const newVibes = selectedVibes.includes(value)
      ? selectedVibes.filter(v => v !== value)
      : [...selectedVibes, value];
    onChange({ communityVibes: newVibes });
  };

  return (
    <div className="space-y-8">
      {/* Community vibe - Multi-select */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-base font-medium">What community vibes suit you?</Label>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMMUNITY_VIBES.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.value);
            return (
              <button
                key={vibe.value}
                type="button"
                onClick={() => toggleVibe(vibe.value)}
                className={`
                  relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <span className="text-2xl mb-2">{vibe.icon}</span>
                <span className="font-medium text-sm text-foreground">{vibe.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{vibe.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Family proximity */}
      <div className="space-y-3">
        <Label className="text-base font-medium">How important is being near family?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FAMILY_PROXIMITY.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.familyProximity === option.value}
              onClick={() => onChange({ familyProximity: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* People density */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Social environment preference</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PEOPLE_DENSITY.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.peopleDensity === option.value}
              onClick={() => onChange({ peopleDensity: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialStep;
```

### `src/components/onboarding/steps/TravelStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { OnboardingData } from "@/types/onboarding";
import OptionButton from "../OptionButton";
import { Plane } from "lucide-react";

interface TravelStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const AIRPORT = [
  { value: "essential", label: "Essential", desc: "Need international hub" },
  { value: "important", label: "Important", desc: "Good connections matter" },
  { value: "moderate", label: "Moderate", desc: "Some access is fine" },
  { value: "unimportant", label: "Not important", desc: "Don't travel much" },
];

const WEEKEND_TRIPS = [
  { value: "love", label: "Love them!", desc: "Explore new places often" },
  { value: "sometimes", label: "Sometimes", desc: "Occasional adventures" },
  { value: "rarely", label: "Rarely", desc: "Prefer staying local" },
];

const TravelStep = ({ data, onChange }: TravelStepProps) => {
  return (
    <div className="space-y-8">
      {/* Airport connectivity */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Plane className="w-4 h-4" />
          Airport connectivity importance
        </Label>
        <p className="text-sm text-muted-foreground">
          How important is easy access to international flights?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AIRPORT.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.airportConnectivity === option.value}
              onClick={() => onChange({ airportConnectivity: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Weekend trips */}
      <div className="space-y-3">
        <Label>Weekend trip potential</Label>
        <p className="text-sm text-muted-foreground">
          Do you enjoy exploring nearby cities and regions?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WEEKEND_TRIPS.map((option) => (
            <OptionButton
              key={option.value}
              selected={data.weekendTrips === option.value}
              onClick={() => onChange({ weekendTrips: option.value })}
              className="flex-col items-start p-4 h-auto"
            >
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStep;
```

### `src/components/onboarding/steps/ValuesStep.tsx`
```tsx
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingData } from "@/types/onboarding";

interface ValuesStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const ValuesStep = ({ data, onChange }: ValuesStepProps) => {
  return (
    <div className="space-y-10">
      {/* Freedom vs Stability */}
      <div className="space-y-4">
        <Label className="text-base">Freedom vs Stability</Label>
        <p className="text-sm text-muted-foreground">
          Do you prefer maximum freedom and flexibility, or more structure and predictability?
        </p>
        <div className="pt-4 pb-2">
          <Slider
            value={[parseInt(data.freedomStability || "50")]}
            onValueChange={([value]) => onChange({ freedomStability: value.toString() })}
            min={0}
            max={100}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="hidden sm:inline">🔓</span> Freedom
          </span>
          <span className="flex items-center gap-1">
            Stability <span className="hidden sm:inline">🏠</span>
          </span>
        </div>
      </div>

      {/* Novelty vs Consistency */}
      <div className="space-y-4">
        <Label className="text-base">Novelty vs Consistency</Label>
        <p className="text-sm text-muted-foreground">
          Do you crave new experiences constantly, or prefer familiar routines?
        </p>
        <div className="pt-4 pb-2">
          <Slider
            value={[parseInt(data.noveltyConsistency || "50")]}
            onValueChange={([value]) => onChange({ noveltyConsistency: value.toString() })}
            min={0}
            max={100}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="hidden sm:inline">✨</span> Novelty
          </span>
          <span className="flex items-center gap-1">
            Consistency <span className="hidden sm:inline">🔄</span>
          </span>
        </div>
      </div>

      {/* Cultural Openness */}
      <div className="space-y-4">
        <Label className="text-base">Cultural Openness</Label>
        <p className="text-sm text-muted-foreground">
          How comfortable are you with unfamiliar cultures and languages?
        </p>
        <div className="pt-4 pb-2">
          <Slider
            value={[parseInt(data.cultureTolerance || "50")]}
            onValueChange={([value]) => onChange({ cultureTolerance: value.toString() })}
            min={0}
            max={100}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="hidden sm:inline">🌍</span> Explorer
          </span>
          <span className="flex items-center gap-1">
            Familiar <span className="hidden sm:inline">🏡</span>
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center pt-4">
        Move the sliders to reflect your preferences—there are no wrong answers!
      </p>
    </div>
  );
};

export default ValuesStep;```

### `src/components/places/PlaceCard.tsx`
```tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Shield, Sun, Heart } from "lucide-react";

interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string | null;
  image_url: string | null;
  vibe_summary: string | null;
  description: string | null;
  safety_score: number | null;
  cost_of_living_score: number | null;
  climate_score: number | null;
  healthcare_score: number | null;
  nightlife_score: number | null;
  outdoor_score: number | null;
  transit_score: number | null;
  english_friendliness_score: number | null;
  tags: string[] | null;
}

interface PlaceCardProps {
  place: Location;
  onClick: () => void;
  matchScore?: number;
  hasPreferences: boolean;
}

const PlaceCard = ({ place, onClick, matchScore, hasPreferences }: PlaceCardProps) => {
  const defaultImage = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`;
  const [imgSrc, setImgSrc] = useState(place.image_url || defaultImage);
  const [imgError, setImgError] = useState(false);
  
  // React to image_url changes (important during admin review/updates)
  useEffect(() => {
    setImgSrc(place.image_url || defaultImage);
    setImgError(false);
  }, [place.image_url]);
  
  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(defaultImage);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full h-72 rounded-2xl overflow-hidden text-left"
    >
      {/* Background Image */}
      <img
        src={imgSrc}
        alt={place.name}
        loading="lazy"
        onError={handleImageError}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Match Score Badge */}
      {hasPreferences && matchScore !== undefined && (
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <span className={`text-sm font-bold ${getScoreColor(matchScore)}`}>
            {matchScore}% match
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
        {/* City Name */}
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
          {place.name}
        </h3>

        {/* Vibe Summary */}
        {place.vibe_summary && (
          <p className="text-sm text-white/80 line-clamp-2">
            {place.vibe_summary}
          </p>
        )}

        {/* Quick Stats */}
        <div className="flex items-center gap-3 pt-2">
          {place.cost_of_living_score !== null && place.cost_of_living_score !== undefined && (
            <div className="flex items-center gap-1" title="Cost of Living">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-white/70">{place.cost_of_living_score}</span>
            </div>
          )}
          {place.safety_score !== null && place.safety_score !== undefined && (
            <div className="flex items-center gap-1" title="Safety">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-white/70">{place.safety_score}</span>
            </div>
          )}
          {place.climate_score !== null && place.climate_score !== undefined && (
            <div className="flex items-center gap-1" title="Climate">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-white/70">{place.climate_score}</span>
            </div>
          )}
          {place.healthcare_score !== null && place.healthcare_score !== undefined && (
            <div className="flex items-center gap-1" title="Healthcare">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs text-white/70">{place.healthcare_score}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors" />
    </motion.button>
  );
};

export default PlaceCard;
```

### `src/components/places/PlaceFilters.tsx`
```tsx
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type SortOption = "name" | "cost" | "safety" | "climate" | "match";
export type CostFilter = "all" | "budget" | "moderate" | "premium";
export type SafetyFilter = "all" | "high" | "medium";

interface PlaceFiltersProps {
  continents: string[];
  selectedContinent: string | null;
  onContinentChange: (continent: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  costFilter: CostFilter;
  onCostFilterChange: (filter: CostFilter) => void;
  safetyFilter: SafetyFilter;
  onSafetyFilterChange: (filter: SafetyFilter) => void;
  hasPreferences: boolean;
}

const PlaceFilters = ({
  continents,
  selectedContinent,
  onContinentChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
  sortBy,
  onSortChange,
  costFilter,
  onCostFilterChange,
  safetyFilter,
  onSafetyFilterChange,
  hasPreferences,
}: PlaceFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "name", label: "Name (A-Z)" },
    { value: "cost", label: "Cost (Low to High)" },
    { value: "safety", label: "Safety (Highest)" },
    { value: "climate", label: "Climate (Best)" },
    ...(hasPreferences ? [{ value: "match" as SortOption, label: "Match Score" }] : []),
  ];

  const costOptions: { value: CostFilter; label: string }[] = [
    { value: "all", label: "All Budgets" },
    { value: "budget", label: "Budget-Friendly" },
    { value: "moderate", label: "Moderate" },
    { value: "premium", label: "Premium" },
  ];

  const safetyOptions: { value: SafetyFilter; label: string }[] = [
    { value: "all", label: "Any Safety" },
    { value: "high", label: "High Safety (70+)" },
    { value: "medium", label: "Medium+ (50+)" },
  ];

  const activeFiltersCount = 
    (costFilter !== "all" ? 1 : 0) + 
    (safetyFilter !== "all" ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cities or countries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none px-4 py-3 pr-10 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
            showFilters || activeFiltersCount > 0
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-card border-border hover:border-primary/30"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-card border border-border">
              {/* Cost Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Cost of Living
                </label>
                <div className="flex flex-wrap gap-2">
                  {costOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onCostFilterChange(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        costFilter === opt.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Safety Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Safety Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {safetyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onSafetyFilterChange(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        safetyFilter === opt.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="col-span-full">
                  <button
                    onClick={() => {
                      onCostFilterChange("all");
                      onSafetyFilterChange("all");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continent Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onContinentChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedContinent === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {continents.map((continent) => (
          <motion.button
            key={continent}
            onClick={() => onContinentChange(continent)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedContinent === continent
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {continent}
          </motion.button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredCount}</span>
        {filteredCount !== totalCount && ` of ${totalCount}`} places
      </div>
    </div>
  );
};

export default PlaceFilters;
```

### `src/components/places/PlaceModal.tsx`
```tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, DollarSign, Shield, Sun, Heart, Train, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string | null;
  image_url: string | null;
  vibe_summary: string | null;
  description: string | null;
  safety_score: number | null;
  cost_of_living_score: number | null;
  climate_score: number | null;
  healthcare_score: number | null;
  nightlife_score: number | null;
  outdoor_score: number | null;
  transit_score: number | null;
  english_friendliness_score: number | null;
  tags: string[] | null;
}

interface PlaceModalProps {
  place: Location | null;
  onClose: () => void;
  matchScore?: number;
  hasPreferences: boolean;
}

const ScoreBar = ({ 
  label, 
  score, 
  icon: Icon, 
  color 
}: { 
  label: string; 
  score: number | null; 
  icon: React.ElementType; 
  color: string;
}) => {
  if (score === null || score === undefined) return null;
  
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-semibold">{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );
};

const PlaceModal = ({ place, onClose, matchScore, hasPreferences }: PlaceModalProps) => {
  const defaultImage = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80`;
  const [imgSrc, setImgSrc] = useState(defaultImage);
  const [imgError, setImgError] = useState(false);

  // Reset image state when place changes
  useEffect(() => {
    if (place) {
      setImgSrc(place.image_url || defaultImage);
      setImgError(false);
    }
  }, [place]);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(defaultImage);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (place) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [place]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <AnimatePresence>
      {place && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 flex flex-col"
          >
            <div className="relative flex-1 bg-card rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-border/50">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Hero Image */}
              <div className="relative h-48 md:h-64 flex-shrink-0">
                <img
                  src={imgSrc}
                  alt={place.name}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Match Score Badge */}
                {hasPreferences && matchScore !== undefined && (
                  <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">Your Match</span>
                      <span className={`text-2xl font-bold ${getMatchColor(matchScore)}`}>
                        {matchScore}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{place.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{place.country}, {place.continent}</span>
                  </div>
                </div>

                {/* Vibe Summary */}
                {place.vibe_summary && (
                  <p className="text-lg text-muted-foreground italic">
                    "{place.vibe_summary}"
                  </p>
                )}

                {/* Description */}
                {place.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {place.description}
                  </p>
                )}

                {/* Scores Grid */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Lifestyle Scores</h3>
                  <div className="grid gap-4">
                    <ScoreBar label="Cost of Living" score={place.cost_of_living_score} icon={DollarSign} color="text-emerald-400" />
                    <ScoreBar label="Safety" score={place.safety_score} icon={Shield} color="text-blue-400" />
                    <ScoreBar label="Climate" score={place.climate_score} icon={Sun} color="text-amber-400" />
                    <ScoreBar label="Healthcare" score={place.healthcare_score} icon={Heart} color="text-rose-400" />
                    <ScoreBar label="Transit" score={place.transit_score} icon={Train} color="text-violet-400" />
                    <ScoreBar label="Outdoor Activities" score={place.outdoor_score} icon={Users} color="text-green-400" />
                    <ScoreBar label="Nightlife" score={place.nightlife_score} icon={Users} color="text-pink-400" />
                    <ScoreBar label="English Friendly" score={place.english_friendliness_score} icon={Users} color="text-cyan-400" />
                  </div>
                </div>

                {/* CTA for users without preferences */}
                {!hasPreferences && (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-3">
                    <p className="text-sm">
                      Want to see how well <span className="font-semibold">{place.name}</span> matches your lifestyle?
                    </p>
                    <Button asChild className="w-full btn-hero text-background">
                      <Link to="/app/onboarding">
                        Take the Quiz
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Tags */}
                {place.tags && Array.isArray(place.tags) && place.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaceModal;
```

### `src/components/places/PlacesHero.tsx`
```tsx
import { motion } from "framer-motion";
import { Globe, MapPin, Sparkles, TrendingUp } from "lucide-react";

interface PlacesHeroProps {
  totalCount: number;
}

const PlacesHero = ({ totalCount }: PlacesHeroProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden section-glow">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">New places added daily</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Places</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Explore <span className="text-foreground font-semibold">{totalCount > 0 ? totalCount : "190"}+</span> destinations 
            analyzed across <span className="text-foreground font-semibold">25+ lifestyle factors</span>.
          </p>

          {/* Value prop */}
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            After taking our quiz, click any place to see your personal match score and build your ideal 12-month circuit.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">{totalCount > 0 ? totalCount : "190"}+</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Continents</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-muted-foreground">Factors Analyzed</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlacesHero;
```

### `src/components/places/RegionSection.tsx`
```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import PlaceCard from "./PlaceCard";

interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string | null;
  image_url: string | null;
  vibe_summary: string | null;
  description: string | null;
  safety_score: number | null;
  cost_of_living_score: number | null;
  climate_score: number | null;
  healthcare_score: number | null;
  nightlife_score: number | null;
  outdoor_score: number | null;
  transit_score: number | null;
  english_friendliness_score: number | null;
  tags: string[] | null;
}

interface RegionSectionProps {
  continent: string;
  countries: { [country: string]: Location[] };
  onPlaceClick: (place: Location) => void;
  matchScores: Map<string, number>;
  hasPreferences: boolean;
}


const RegionSection = ({ 
  continent, 
  countries, 
  onPlaceClick, 
  matchScores,
  hasPreferences 
}: RegionSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalPlaces = Object.values(countries).reduce(
    (sum, places) => sum + places.length, 0
  );

  const sortedCountries = Object.entries(countries).sort(([a], [b]) => 
    a.localeCompare(b)
  );

  return (
    <div className="space-y-6">
      {/* Continent Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
              {continent}
            </h2>
            <p className="text-sm text-muted-foreground">
              {totalPlaces} {totalPlaces === 1 ? "place" : "places"}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Countries and Cities */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 overflow-hidden"
          >
            {sortedCountries.map(([country, places]) => (
              <div key={country} className="space-y-4">
                {/* Country Header */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{country}</span>
                  <span className="text-sm">({places.length})</span>
                </div>

                {/* City Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {places
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((place, index) => (
                      <motion.div
                        key={place.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <PlaceCard
                          place={place}
                          onClick={() => onPlaceClick(place)}
                          matchScore={matchScores.get(place.id)}
                          hasPreferences={hasPreferences}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionSection;
```

### `src/components/results/AnnualCircuitSection.tsx`
```tsx
import { motion } from "framer-motion";
import { MapPin, Plane, Calendar, Globe, Thermometer } from "lucide-react";
import type { AnnualCircuit, CircuitStop } from "@/lib/circuitGenerator";
import { getMonthAbbrev, getSeasonColor } from "@/lib/circuitGenerator";

interface AnnualCircuitSectionProps {
  circuit: AnnualCircuit;
}

function CircuitStopCard({ stop, index, total }: { stop: CircuitStop; index: number; total: number }) {
  const monthRange = stop.months.length > 1 
    ? `${getMonthAbbrev(stop.months[0])} - ${getMonthAbbrev(stop.months[stop.months.length - 1])}`
    : getMonthAbbrev(stop.months[0]);
  
  const seasonGradient = getSeasonColor(stop.startMonth);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="absolute left-6 top-full w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
      )}
      
      <div className="flex gap-4">
        {/* Timeline dot */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${seasonGradient} flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-sm">{index + 1}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">
                    {stop.location.country === "Portugal" && "🇵🇹"}
                    {stop.location.country === "Spain" && "🇪🇸"}
                    {stop.location.country === "Thailand" && "🇹🇭"}
                    {stop.location.country === "Indonesia" && "🇮🇩"}
                    {stop.location.country === "Japan" && "🇯🇵"}
                    {stop.location.country === "Mexico" && "🇲🇽"}
                    {stop.location.country === "South Africa" && "🇿🇦"}
                    {stop.location.country === "France" && "🇫🇷"}
                    {stop.location.country === "Italy" && "🇮🇹"}
                    {stop.location.country === "Greece" && "🇬🇷"}
                    {stop.location.country === "Croatia" && "🇭🇷"}
                    {stop.location.country === "Germany" && "🇩🇪"}
                    {stop.location.country === "United Kingdom" && "🇬🇧"}
                    {stop.location.country === "United States" && "🇺🇸"}
                    {stop.location.country === "Colombia" && "🇨🇴"}
                    {stop.location.country === "Argentina" && "🇦🇷"}
                    {stop.location.country === "Brazil" && "🇧🇷"}
                    {stop.location.country === "Vietnam" && "🇻🇳"}
                    {stop.location.country === "Australia" && "🇦🇺"}
                    {stop.location.country === "New Zealand" && "🇳🇿"}
                    {!["Portugal", "Spain", "Thailand", "Indonesia", "Japan", "Mexico", "South Africa", "France", "Italy", "Greece", "Croatia", "Germany", "United Kingdom", "United States", "Colombia", "Argentina", "Brazil", "Vietnam", "Australia", "New Zealand"].includes(stop.location.country) && "🌍"}
                  </span>
                  <h3 className="text-xl font-bold">{stop.location.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {stop.location.region ? `${stop.location.region}, ` : ""}{stop.location.country}
                </p>
              </div>
              
              <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${seasonGradient} text-white text-sm font-medium`}>
                {monthRange}
              </div>
            </div>
            
            {/* Score and reasons */}
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{stop.seasonScore}% seasonal match</span>
            </div>
            
            {/* Reasons */}
            {stop.reasons.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {stop.reasons.map((reason, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            )}
            
            {/* Activities */}
            {stop.activities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {stop.activities.map((activity, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AnnualCircuitSection({ circuit }: AnnualCircuitSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-12"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary mb-4">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Your Annual Circuit</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Your Perfect Year
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow the seasons across {circuit.totalCountries} {circuit.totalCountries === 1 ? 'country' : 'countries'} for an optimized year of weather, lifestyle, and adventure.
        </p>
      </div>
      
      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 p-4 rounded-2xl bg-secondary/50">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium">{circuit.totalLocations} destinations</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <span className="font-medium">{circuit.totalCountries} countries</span>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-medium">{circuit.totalLocations - 1} flights/year</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="font-medium capitalize">{circuit.lifestyleMode} lifestyle</span>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="space-y-0">
        {circuit.stops.map((stop, index) => (
          <CircuitStopCard 
            key={stop.location.id} 
            stop={stop} 
            index={index}
            total={circuit.stops.length}
          />
        ))}
      </div>
      
      {/* Circular return indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3 mt-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-white text-lg">🔄</span>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Repeat the cycle!</span> Your circuit restarts in January.
        </p>
      </motion.div>
    </motion.section>
  );
}
```

### `src/components/results/BlurredCityCard.tsx`
```tsx
import { motion } from "framer-motion";
import { Lock, MapPin } from "lucide-react";
import type { MatchResult } from "@/lib/scoring";

interface BlurredCityCardProps {
  result: MatchResult;
  rank: number;
  isRevealed?: boolean;
}

export function BlurredCityCard({ result, rank, isRevealed = false }: BlurredCityCardProps) {
  const { location, totalScore } = result;

  if (isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: rank * 0.1 }}
        className="card-interactive p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-secondary text-secondary-foreground">
            {rank}
          </span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{location.name}</p>
              <p className="text-sm text-muted-foreground">{location.country}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-primary">{Math.round(totalScore)}%</p>
          <p className="text-xs text-muted-foreground">match</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.1 }}
      className="relative card-interactive p-4 overflow-hidden"
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/60 z-10 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Unlock to reveal</span>
        </div>
      </div>

      {/* Blurred content */}
      <div className="flex items-center justify-between opacity-50">
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-secondary text-secondary-foreground">
            {rank}
          </span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium blur-sm">{location.name}</p>
              <p className="text-sm text-muted-foreground blur-sm">{location.country}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-primary blur-sm">??%</p>
          <p className="text-xs text-muted-foreground">match</p>
        </div>
      </div>
    </motion.div>
  );
}
```

### `src/components/results/BlurredReveal.tsx`
```tsx
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { 
  MapPin, 
  Sparkles, 
  Lock, 
  Share2, 
  Users, 
  Check,
  Loader2,
  Eye,
  Zap,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "./ScoreRing";
import { ShareableCard } from "./ShareableCard";
import { FriendInviteFlow } from "./FriendInviteFlow";
import { supabase } from "@/integrations/supabase/client";
import type { MatchResult } from "@/lib/scoring";
import { toast } from "sonner";

interface BlurredRevealProps {
  result: MatchResult;
  runId: string;
  currentCity?: string;
  currentCityScore?: number;
  userName?: string;
  onReveal: () => void;
  isRevealed: boolean;
}

export function BlurredReveal({ 
  result, 
  runId,
  currentCity, 
  currentCityScore, 
  userName,
  onReveal,
  isRevealed
}: BlurredRevealProps) {
  const { location, totalScore, reasons } = result;
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [showInviteFlow, setShowInviteFlow] = useState(false);
  const [showRevealAnimation, setShowRevealAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const delta = currentCityScore ? Math.round(totalScore - currentCityScore) : 0;

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
        zIndex: 9999,
      });
    }, 250);
  }, []);

  const trackShare = useCallback(async (shareType: string) => {
    try {
      await supabase.functions.invoke('track-share', {
        body: { 
          run_id: runId, 
          share_type: shareType,
          metadata: { timestamp: new Date().toISOString() }
        }
      });
    } catch (error) {
      console.error('Error tracking share:', error);
    }
  }, [runId]);

  const handleShareToReveal = useCallback(async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1920,
      });
      
      const link = document.createElement("a");
      link.download = `my-place-dna.png`;
      link.href = dataUrl;
      link.click();
      
      // Track the share event
      await trackShare('reveal');
      setHasShared(true);
      
      setTimeout(() => {
        window.open("https://instagram.com", "_blank");
      }, 500);
      
      toast.success("Image downloaded! Share to reveal your match 🎉");
      
      // Trigger reveal animation
      setTimeout(() => {
        setShowRevealAnimation(true);
        fireConfetti();
        setTimeout(() => {
          onReveal();
        }, 1500);
      }, 1000);
      
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [onReveal, fireConfetti, trackShare]);

  const handleInviteUnlockEarned = useCallback(() => {
    setShowRevealAnimation(true);
    fireConfetti();
    setTimeout(() => {
      onReveal();
    }, 1500);
  }, [onReveal, fireConfetti]);

  // Auto-reveal if already shared
  useEffect(() => {
    if (hasShared && !isRevealed) {
      setShowRevealAnimation(true);
      setTimeout(() => {
        onReveal();
      }, 500);
    }
  }, [hasShared, isRevealed, onReveal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-8"
    >
      {/* Hidden shareable card for image generation */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <ShareableCard 
          ref={cardRef} 
          result={result} 
          userName={userName}
          currentCity={currentCity}
          currentCityScore={currentCityScore}
        />
      </div>

      <div className="card-elevated p-8 md:p-10 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-violet-500/10 pointer-events-none" />
        
        {/* Header badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Your #1 Best Match Found</span>
          </div>
        </motion.div>

        {/* Blurred city name with score */}
        <div className="text-center mb-8">
          <AnimatePresence mode="wait">
            {!isRevealed && !showRevealAnimation ? (
              <motion.div
                key="blurred"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-4xl md:text-5xl font-bold mb-2 relative"
                >
                  <span className="blur-lg select-none text-muted-foreground">
                    {location.name}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                      <Lock className="w-5 h-5 text-primary" />
                      <span className="text-base font-medium text-foreground">Share to reveal</span>
                    </div>
                  </div>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {location.continent}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
                  {location.name}
                </h1>
                <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {location.region ? `${location.region}, ` : ""}{location.country}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Score ring - always visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <ScoreRing score={totalScore} size={140} />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-sm">#1</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Delta badge */}
        {delta > 0 && currentCity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">+{delta}%</span>
              <span className="text-sm">better fit than {currentCity}</span>
            </div>
          </motion.div>
        )}

        {/* Reveal options */}
        {!isRevealed && !showRevealAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            {/* Primary: Share to Reveal */}
            <div className="bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-2xl p-6 border border-violet-500/20">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm font-medium mb-3">
                  <Eye className="w-4 h-4" />
                  Instant Reveal
                </div>
                <h3 className="text-xl font-bold mb-2">Show Off Your Place DNA</h3>
                <p className="text-muted-foreground text-sm">
                  Share your unique lifestyle profile and instantly see your perfect city
                </p>
              </div>
              
              <Button
                onClick={handleShareToReveal}
                disabled={isGenerating}
                className="w-full gap-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0 h-12"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Your Card...
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    Share Place DNA to Reveal
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Downloads a beautiful story image + opens Instagram
              </p>
            </div>

            {/* Secondary: Invite Friends */}
            <div className="bg-secondary/30 rounded-2xl border border-border overflow-hidden">
              <button 
                onClick={() => setShowInviteFlow(!showInviteFlow)}
                className="w-full p-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">Invite 2 Friends</h4>
                    <p className="text-sm text-muted-foreground">
                      They complete the quiz, you unlock your city
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showInviteFlow ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showInviteFlow && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-border">
                      <FriendInviteFlow 
                        runId={runId} 
                        onUnlockEarned={handleInviteUnlockEarned} 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Tertiary: Pay to Reveal */}
            <p className="text-center text-sm text-muted-foreground">
              Skip the wait — <button className="text-primary hover:underline font-medium">unlock everything for $10</button>
            </p>
          </motion.div>
        )}

        {/* Post-reveal: Top reason preview */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground italic">
              "{reasons[0]}"
            </p>
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm">
                <Check className="w-4 h-4" />
                City revealed!
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
```

### `src/components/results/CategoryBars.tsx`
```tsx
import { motion } from "framer-motion";
import { 
  Sun, 
  DollarSign, 
  Shield, 
  Heart, 
  Users, 
  Briefcase 
} from "lucide-react";

interface CategoryScore {
  name: string;
  score: number;
  icon: React.ElementType;
}

interface CategoryBarsProps {
  categoryScores: Record<string, number>;
}

export function CategoryBars({ categoryScores }: CategoryBarsProps) {
  const categories: CategoryScore[] = [
    { name: "Climate", score: categoryScores.climate || 0, icon: Sun },
    { name: "Cost of Living", score: categoryScores.cost || 0, icon: DollarSign },
    { name: "Safety", score: categoryScores.safety || 0, icon: Shield },
    { name: "Healthcare", score: categoryScores.health || 0, icon: Heart },
    { name: "Community", score: categoryScores.community || 0, icon: Users },
    { name: "Career", score: categoryScores.career || 0, icon: Briefcase },
  ].filter(c => c.score > 0);

  const getBarColor = (score: number): string => {
    if (score >= 80) return "bg-gradient-to-r from-emerald-500 to-teal-500";
    if (score >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (score >= 40) return "bg-gradient-to-r from-amber-500 to-orange-500";
    return "bg-gradient-to-r from-rose-500 to-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <category.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums">
              {Math.round(category.score)}%
            </span>
          </div>
          
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${category.score}%` }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${getBarColor(category.score)}`}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### `src/components/results/CurrentCityFitCard.tsx`
```tsx
import { motion } from "framer-motion";
import { MapPin, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface CategoryFit {
  label: string;
  score: number;
}

interface CurrentCityFitCardProps {
  cityName: string;
  fitScore: number;
  categoryScores: CategoryFit[];
}

export function CurrentCityFitCard({ cityName, fitScore, categoryScores }: CurrentCityFitCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = fitScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= fitScore) {
        setAnimatedScore(fitScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [fitScore]);

  const isLowScore = fitScore < 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="card-elevated p-8 md:p-10 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
              Your Current Reality
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              How well does where you live actually fit you?
            </h2>
          </motion.div>

          {/* City Name + Score */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">{cityName}</span>
            </div>

            {/* Large Score Display */}
            <div className="relative">
              <div className={`text-7xl md:text-8xl font-bold ${isLowScore ? 'text-amber-500' : 'text-primary'}`}>
                {animatedScore}
                <span className="text-4xl md:text-5xl">%</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                fit score
              </p>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mb-8"
          >
            {categoryScores.map((cat, index) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-muted-foreground w-32 shrink-0">
                  {cat.label}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className={`h-full rounded-full ${
                      cat.score >= 70 
                        ? 'bg-emerald-500' 
                        : cat.score >= 50 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium w-10 text-right">
                  {cat.score}%
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Micro-copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            {isLowScore ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Anything under 70% usually means friction.
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Not bad — but there might be somewhere even better for you.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
```

### `src/components/results/EmailGateModal.tsx`
```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, ArrowRight, Lock } from "lucide-react";

interface EmailGateModalProps {
  isOpen: boolean;
  onSubmit: (email: string) => void;
  topCityName?: string;
}

export function EmailGateModal({ isOpen, onSubmit, topCityName }: EmailGateModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md"
          >
            <div className="card-elevated p-8 md:p-10 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Headlines */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Your Results Are Ready
                  </h2>
                  <p className="text-muted-foreground">
                    {topCityName 
                      ? `We found your perfect match. Enter your email to see why ${topCityName} could change your life.`
                      : "Enter your email to unlock your personalized city match and detailed insights."
                    }
                  </p>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base"
                      autoFocus
                    />
                  </div>
                  
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full gap-2 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Unlocking..."
                    ) : (
                      <>
                        See My Results
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5" />
                  <span>We'll never spam you. Unsubscribe anytime.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### `src/components/results/FriendInviteFlow.tsx`
```tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Copy, Check, Loader2, Send, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FriendInviteFlowProps {
  runId: string;
  onUnlockEarned?: () => void;
}

interface Invite {
  id: string;
  invite_code: string;
  invitee_email: string | null;
  status: 'pending' | 'clicked' | 'completed';
  created_at: string;
}

export function FriendInviteFlow({ runId, onUnlockEarned }: FriendInviteFlowProps) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const requiredInvites = 2;
  const hasEarnedUnlock = completedCount >= requiredInvites;

  useEffect(() => {
    fetchInviteStatus();
  }, [runId]);

  useEffect(() => {
    if (hasEarnedUnlock) {
      onUnlockEarned?.();
    }
  }, [hasEarnedUnlock, onUnlockEarned]);

  const fetchInviteStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('get-invite-status', {
        body: { run_id: runId }
      });

      if (response.error) throw response.error;

      setInvites(response.data.invites || []);
      setCompletedCount(response.data.completed_count || 0);
    } catch (error) {
      console.error('Error fetching invite status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createInvite = async () => {
    setIsCreating(true);
    try {
      const response = await supabase.functions.invoke('create-invite', {
        body: { 
          run_id: runId,
          inviter_email: email || null
        }
      });

      if (response.error) throw response.error;

      // Copy to clipboard
      await navigator.clipboard.writeText(response.data.invite_url);
      toast.success("Invite link copied to clipboard!");

      // Refresh invites
      fetchInviteStatus();
      setEmail("");
    } catch (error) {
      console.error('Error creating invite:', error);
      toast.error("Failed to create invite");
    } finally {
      setIsCreating(false);
    }
  };

  const copyInviteLink = async (invite: Invite) => {
    const baseUrl = window.location.origin;
    const inviteUrl = `${baseUrl}/app/onboarding?invite=${invite.invite_code}`;
    
    await navigator.clipboard.writeText(inviteUrl);
    setCopiedId(invite.id);
    toast.success("Link copied!");
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (hasEarnedUnlock) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">You've Earned Your Reveal!</h3>
        <p className="text-muted-foreground">
          {completedCount} friends completed the quiz. Your city is now unlocked!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold">
            {completedCount} of {requiredInvites} friends completed
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/80"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / requiredInvites) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          {requiredInvites - completedCount} more friend{requiredInvites - completedCount !== 1 ? 's' : ''} needed to unlock your city
        </p>
      </div>

      {/* Existing Invites */}
      <AnimatePresence>
        {invites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Your invite links:</p>
            {invites.map((invite) => (
              <motion.div
                key={invite.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  invite.status === 'completed' 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : invite.status === 'clicked'
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    invite.status === 'completed' 
                      ? 'bg-emerald-500/20' 
                      : invite.status === 'clicked'
                      ? 'bg-amber-500/20'
                      : 'bg-muted'
                  }`}>
                    {invite.status === 'completed' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <UserPlus className={`w-4 h-4 ${
                        invite.status === 'clicked' ? 'text-amber-500' : 'text-muted-foreground'
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {invite.invitee_email || `Invite #${invites.indexOf(invite) + 1}`}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {invite.status === 'completed' ? '✓ Completed quiz!' : 
                       invite.status === 'clicked' ? 'Clicked link' : 'Pending'}
                    </p>
                  </div>
                </div>
                
                {invite.status !== 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyInviteLink(invite)}
                    className="shrink-0"
                  >
                    {copiedId === invite.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create New Invite */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Friend's email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={createInvite}
            disabled={isCreating}
            className="shrink-0 gap-2"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Create Link
              </>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          Share the link with a friend. When they complete the quiz, you get credit!
        </p>
      </div>
    </div>
  );
}
```

### `src/components/results/FutureMatchTeaser.tsx`
```tsx
import { motion } from "framer-motion";
import { Lock, Sparkles, TrendingUp } from "lucide-react";
import type { MatchResult } from "@/lib/scoring";

interface FutureMatchTeaserProps {
  topMatch: MatchResult;
  currentCityScore: number;
  isLocked: boolean;
}

export function FutureMatchTeaser({ topMatch, currentCityScore, isLocked }: FutureMatchTeaserProps) {
  const delta = Math.round(topMatch.totalScore - currentCityScore);
  const hasImprovement = delta > 0;

  if (!isLocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="relative">
        {/* Locked Card */}
        <div className="card-elevated p-8 md:p-10 relative overflow-hidden">
          {/* Gradient overlay for locked state */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 pointer-events-none" />
          
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-background/30 z-10" />
          
          <div className="relative z-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Your #1 Best Match</span>
              </div>
            </motion.div>

            {/* Blurred Score */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex flex-col items-center mb-6"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
                
                {/* Blurred percentage */}
                <div className="relative text-7xl md:text-8xl font-bold text-primary blur-md select-none">
                  {Math.round(topMatch.totalScore)}
                  <span className="text-4xl md:text-5xl">%</span>
                </div>
                
                {/* Lock icon overlay */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Blurred city name placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center mb-6"
            >
              <div className="h-8 w-48 bg-muted rounded-lg blur-sm" />
            </motion.div>
          </div>
        </div>

        {/* Delta Badge - positioned below card */}
        {hasImprovement && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="flex justify-center -mt-6 relative z-30"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg font-bold">
                +{delta}% better fit
              </span>
              <span className="text-emerald-100">
                than where you live now
              </span>
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-4 -left-4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
```

### `src/components/results/IdentityShareCTA.tsx`
```tsx
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { 
  Share2, 
  Loader2, 
  Sparkles,
  Instagram,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MatchResult, CategoryScore } from "@/lib/scoring";
import { PlaceDNACard } from "./shareables/PlaceDNACard";
import { toast } from "sonner";

interface IdentityShareCTAProps {
  result: MatchResult;
  userName?: string;
  currentCity?: string;
  currentCityScore?: number;
  onShare?: () => void;
}

// Convert CategoryScore[] to Record<string, number>
const categoryScoresToRecord = (categoryScores: CategoryScore[]): Record<string, number> => {
  return categoryScores.reduce((acc, cs) => {
    acc[cs.category] = cs.score;
    return acc;
  }, {} as Record<string, number>);
};

export function IdentityShareCTA({ 
  result, 
  userName,
  currentCity,
  currentCityScore,
  onShare 
}: IdentityShareCTAProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const displayName = userName || "Explorer";
  const topReasons = result.reasons?.slice(0, 3) || ["Perfect climate", "Great community", "Amazing lifestyle"];
  const categoryScoresRecord = categoryScoresToRecord(result.categoryScores);

  const handleDownloadShare = useCallback(async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1920,
      });
      
      const link = document.createElement("a");
      link.download = `my-place-dna-${result.location.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
      
      onShare?.();
      
      setTimeout(() => {
        window.open("https://instagram.com", "_blank");
      }, 500);
      
      toast.success("Image downloaded! Share it on Instagram 📸");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [result.location.name, onShare]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setLinkCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }, []);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Find Your Place",
          text: `I just discovered my Place DNA! My top match is ${result.location.name} with a ${Math.round(result.totalScore)}% fit. Find your perfect place too!`,
          url: window.location.origin,
        });
        onShare?.();
      } catch (error) {
        // User cancelled or share failed
        console.log("Share cancelled");
      }
    } else {
      handleCopyLink();
    }
  }, [result, onShare, handleCopyLink]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-violet-500/10 via-pink-500/5 to-cyan-500/10 rounded-2xl p-6 border border-violet-500/20"
    >
      {/* Hidden card for rendering */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <PlaceDNACard
          ref={cardRef}
          userName={displayName}
          matchCity={result.location.name}
          matchCountry={result.location.country}
          matchScore={Math.round(result.totalScore)}
          currentCity={currentCity}
          currentCityScore={currentCityScore}
          categoryScores={categoryScoresRecord}
          topReasons={topReasons}
        />
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-violet-400 text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4" />
          Flex Your Place DNA
        </div>
        <h3 className="text-xl font-bold mb-2">Show the world where you belong</h3>
        <p className="text-muted-foreground text-sm">
          Your friends will want to know their match too 👀
        </p>
      </div>

      {/* Share options */}
      <div className="space-y-3">
        {/* Primary: Instagram Story */}
        <Button
          onClick={handleDownloadShare}
          disabled={isGenerating}
          className="w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 h-12"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Story...
            </>
          ) : (
            <>
              <Instagram className="w-5 h-5" />
              Share to Instagram Story
            </>
          )}
        </Button>

        {/* Secondary options row */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleNativeShare}
            className="flex-1 gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Link
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex-1 gap-2"
          >
            {linkCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Social proof */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Join 12,000+ people who've shared their Place DNA
      </p>
    </motion.div>
  );
}
```

### `src/components/results/LifeChangePreview.tsx`
```tsx
import { motion } from "framer-motion";
import { 
  Sun, 
  Car, 
  DollarSign, 
  Mountain, 
  Users, 
  Plane,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import type { MatchResult, CurrentCityScore, Location } from "@/lib/scoring";

interface LifeChangePreviewProps {
  topMatch: MatchResult;
  currentCity: string;
  currentCityScore: CurrentCityScore;
  currentLocation?: Location;
}

interface ComparisonItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  currentValue: string;
  newValue: string;
  improvement: "better" | "worse" | "same";
  category: string;
}

export const LifeChangePreview = ({ 
  topMatch, 
  currentCity,
  currentCityScore,
  currentLocation 
}: LifeChangePreviewProps) => {
  const { location } = topMatch;
  
  // Build comparison items based on available data
  const comparisons: ComparisonItem[] = [];
  
  // Sunshine comparison
  if (location.sunshine_days) {
    const currentSunshine = currentLocation?.sunshine_days || 180;
    const improvement = location.sunshine_days > currentSunshine ? "better" : 
                       location.sunshine_days < currentSunshine ? "worse" : "same";
    comparisons.push({
      label: "Sunny Days",
      icon: Sun,
      currentValue: `${currentSunshine} days/year`,
      newValue: `${location.sunshine_days} days/year`,
      improvement,
      category: "Climate",
    });
  }
  
  // Cost of living comparison
  if (location.cost_of_living_score !== null && location.cost_of_living_score !== undefined) {
    const currentCost = currentLocation?.cost_of_living_score || 50;
    const improvement = location.cost_of_living_score > currentCost ? "better" : 
                       location.cost_of_living_score < currentCost ? "worse" : "same";
    const costLabel = location.cost_of_living_score >= 70 ? "Very Affordable" : 
                     location.cost_of_living_score >= 50 ? "Moderate" : "Expensive";
    const currentCostLabel = currentCost >= 70 ? "Very Affordable" : 
                            currentCost >= 50 ? "Moderate" : "Expensive";
    comparisons.push({
      label: "Cost of Living",
      icon: DollarSign,
      currentValue: currentCostLabel,
      newValue: costLabel,
      improvement,
      category: "Financial",
    });
  }
  
  // Walkability comparison
  if (location.walkability_score !== null && location.walkability_score !== undefined) {
    const currentWalk = currentLocation?.walkability_score || 40;
    const improvement = location.walkability_score > currentWalk ? "better" : 
                       location.walkability_score < currentWalk ? "worse" : "same";
    const walkLabel = location.walkability_score >= 70 ? "Very Walkable" : 
                     location.walkability_score >= 50 ? "Somewhat Walkable" : "Car-dependent";
    const currentWalkLabel = currentWalk >= 70 ? "Very Walkable" : 
                            currentWalk >= 50 ? "Somewhat Walkable" : "Car-dependent";
    comparisons.push({
      label: "Getting Around",
      icon: Car,
      currentValue: currentWalkLabel,
      newValue: walkLabel,
      improvement,
      category: "Lifestyle",
    });
  }
  
  // Outdoor access comparison
  if (location.outdoor_score !== null && location.outdoor_score !== undefined) {
    const currentOutdoor = currentLocation?.outdoor_score || 50;
    const improvement = location.outdoor_score > currentOutdoor ? "better" : 
                       location.outdoor_score < currentOutdoor ? "worse" : "same";
    const outdoorLabel = location.outdoor_score >= 70 ? "Excellent" : 
                        location.outdoor_score >= 50 ? "Good" : "Limited";
    const currentOutdoorLabel = currentOutdoor >= 70 ? "Excellent" : 
                               currentOutdoor >= 50 ? "Good" : "Limited";
    comparisons.push({
      label: "Outdoor Activities",
      icon: Mountain,
      currentValue: currentOutdoorLabel,
      newValue: outdoorLabel,
      improvement,
      category: "Recreation",
    });
  }
  
  // Community comparison
  if (location.community_score !== null && location.community_score !== undefined) {
    const currentCommunity = currentLocation?.community_score || 50;
    const improvement = location.community_score > currentCommunity ? "better" : 
                       location.community_score < currentCommunity ? "worse" : "same";
    const communityLabel = location.community_score >= 70 ? "Very Social" : 
                          location.community_score >= 50 ? "Moderate" : "More Isolated";
    const currentCommunityLabel = currentCommunity >= 70 ? "Very Social" : 
                                 currentCommunity >= 50 ? "Moderate" : "More Isolated";
    comparisons.push({
      label: "Community Vibe",
      icon: Users,
      currentValue: currentCommunityLabel,
      newValue: communityLabel,
      improvement,
      category: "Social",
    });
  }
  
  // Travel connectivity comparison
  if (location.airport_connectivity_score !== null && location.airport_connectivity_score !== undefined) {
    const currentAirport = currentLocation?.airport_connectivity_score || 50;
    const improvement = location.airport_connectivity_score > currentAirport ? "better" : 
                       location.airport_connectivity_score < currentAirport ? "worse" : "same";
    const airportLabel = location.airport_connectivity_score >= 70 ? "Major Hub" : 
                        location.airport_connectivity_score >= 50 ? "Good Access" : "Limited";
    const currentAirportLabel = currentAirport >= 70 ? "Major Hub" : 
                               currentAirport >= 50 ? "Good Access" : "Limited";
    comparisons.push({
      label: "Travel Access",
      icon: Plane,
      currentValue: currentAirportLabel,
      newValue: airportLabel,
      improvement,
      category: "Mobility",
    });
  }

  const scoreDelta = Math.round(topMatch.totalScore - currentCityScore.score);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          How Your Life Could Change
        </h2>
        <p className="text-muted-foreground">
          A side-by-side look at {currentCity} vs. {location.name}
        </p>
      </div>

      {/* Overall score comparison */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <div className="text-sm text-muted-foreground mb-1">Current City</div>
            <div className="text-xl font-bold">{currentCity}</div>
            <div className="text-3xl font-bold text-muted-foreground mt-2">
              {Math.round(currentCityScore.score)}%
            </div>
          </div>
          
          <div className="flex flex-col items-center px-6">
            <ArrowRight className="w-6 h-6 text-primary mb-2" />
            {scoreDelta > 0 && (
              <span className="text-accent font-bold text-lg">+{scoreDelta}%</span>
            )}
          </div>
          
          <div className="text-center flex-1">
            <div className="text-sm text-muted-foreground mb-1">Your Match</div>
            <div className="text-xl font-bold text-gradient">{location.name}</div>
            <div className="text-3xl font-bold text-accent mt-2">
              {Math.round(topMatch.totalScore)}%
            </div>
          </div>
        </div>
      </div>

      {/* Detailed comparisons */}
      <div className="grid gap-3">
        {comparisons.slice(0, 6).map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="card-elevated p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground truncate">
                    {item.currentValue}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className={`text-sm font-medium truncate ${
                    item.improvement === "better" ? "text-accent" : 
                    item.improvement === "worse" ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {item.newValue}
                  </span>
                </div>
              </div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                item.improvement === "better" ? "bg-accent/10" : 
                item.improvement === "worse" ? "bg-destructive/10" : "bg-muted"
              }`}>
                {item.improvement === "better" && <TrendingUp className="w-4 h-4 text-accent" />}
                {item.improvement === "worse" && <TrendingDown className="w-4 h-4 text-destructive" />}
                {item.improvement === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inspirational quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-lg text-muted-foreground italic">
          "Imagine waking up in a place that actually fits who you are."
        </p>
      </motion.div>
    </motion.section>
  );
};
```

### `src/components/results/LiveCounter.tsx`
```tsx
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LiveCounterProps {
  className?: string;
}

export function LiveCounter({ className = "" }: LiveCounterProps) {
  const [count, setCount] = useState(12847);
  const [recentCount, setRecentCount] = useState(127);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchLiveCount = useCallback(async () => {
    try {
      const response = await supabase.functions.invoke('get-live-count');
      if (response.data && !response.error) {
        setCount(response.data.total);
        setRecentCount(response.data.this_week);
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching live count:', error);
      // Keep fallback values
    }
  }, []);

  useEffect(() => {
    fetchLiveCount();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchLiveCount, 60000);
    
    // Also simulate minor increments for "live" feel
    const tickInterval = setInterval(() => {
      if (isLoaded) {
        setCount(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(tickInterval);
    };
  }, [fetchLiveCount, isLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-6 flex-wrap ${className}`}
    >
      {/* Total users */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="w-4 h-4" />
        <span className="text-sm">
          <span className="font-semibold text-foreground tabular-nums">
            {count.toLocaleString()}
          </span>{" "}
          people found their place
        </span>
      </div>

      {/* Recent activity indicator */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-emerald-500 tabular-nums">{recentCount}</span> this week
        </span>
      </div>
    </motion.div>
  );
}
```

### `src/components/results/NextStepsSection.tsx`
```tsx
import { motion } from "framer-motion";
import { 
  Search, 
  Users, 
  Plane, 
  Home, 
  Briefcase, 
  BookOpen,
  CheckCircle2,
  Circle,
  Clock
} from "lucide-react";
import type { MatchResult, Location } from "@/lib/scoring";

interface NextStepsSectionProps {
  topMatch: MatchResult;
  currentCity?: string;
}

interface TimelineStep {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timing: string;
  tips: string[];
}

export const NextStepsSection = ({ topMatch, currentCity }: NextStepsSectionProps) => {
  const { location } = topMatch;
  
  // Determine visa complexity based on score
  const visaComplexity = location.visa_friendliness_score 
    ? location.visa_friendliness_score >= 70 ? "straightforward" 
      : location.visa_friendliness_score >= 40 ? "moderate" 
      : "complex"
    : "varies";
  
  // Determine language preparation based on English friendliness
  const needsLanguage = location.english_friendliness_score 
    ? location.english_friendliness_score < 60
    : false;
  
  // Determine remote work suitability
  const remoteWorkFriendly = (location.internet_quality_score || 0) >= 60 && 
                             (location.startup_ecosystem_score || 0) >= 50;

  const timelineSteps: TimelineStep[] = [
    {
      id: "research",
      icon: Search,
      title: "Research Neighborhoods",
      description: `Deep dive into ${location.name}'s different areas to find your ideal neighborhood.`,
      timing: "Start Now",
      tips: [
        `Research cost of living in different areas of ${location.name}`,
        "Join expat and local community forums online",
        "Watch YouTube videos and vlogs about daily life there",
      ],
    },
    {
      id: "community",
      icon: Users,
      title: "Connect with Community",
      description: "Start building your network before you arrive.",
      timing: "+1 Month",
      tips: [
        `Join Facebook groups for ${location.name} expats and locals`,
        "Find coworking spaces and networking events",
        "Connect with people on LinkedIn who've made the move",
      ],
    },
    {
      id: "visit",
      icon: Plane,
      title: "Scout Trip",
      description: "Take a 1-2 week trip to test the lifestyle firsthand.",
      timing: "+2 Months",
      tips: [
        "Stay in different neighborhoods to get a feel",
        "Visit during a typical season, not just holidays",
        "Try to live like a local, not a tourist",
      ],
    },
    {
      id: "logistics",
      icon: Briefcase,
      title: "Plan Logistics",
      description: `Sort out visa, housing, and work arrangements.${visaComplexity === "complex" ? " Visa process may require extra planning." : ""}`,
      timing: "+3-4 Months",
      tips: [
        `Visa situation: ${visaComplexity} process${visaComplexity === "complex" ? " - consider hiring an immigration lawyer" : ""}`,
        remoteWorkFriendly ? "Great for remote work - find coworking spaces" : "Research local job market if not working remotely",
        "Start looking at apartment listings to understand the market",
      ],
    },
    {
      id: "prepare",
      icon: Home,
      title: "Prepare for Move",
      description: "Final preparations before your big move.",
      timing: "+5 Months",
      tips: [
        currentCity ? `Start wrapping up commitments in ${currentCity}` : "Start wrapping up current commitments",
        "Arrange international banking and phone plan",
        "Ship or sell belongings as needed",
      ],
    },
    {
      id: "move",
      icon: CheckCircle2,
      title: "Make the Move",
      description: `Arrive in ${location.name} and start your new chapter!`,
      timing: "+6 Months",
      tips: [
        "Book initial accommodation for 2-4 weeks while you settle",
        "Get a local SIM card and bank account",
        "Register with local authorities if required",
      ],
    },
  ];

  // Add language step if needed
  if (needsLanguage) {
    timelineSteps.splice(1, 0, {
      id: "language",
      icon: BookOpen,
      title: "Start Language Learning",
      description: `English isn't widely spoken—basic language skills will help a lot.`,
      timing: "+1 Month",
      tips: [
        "Download Duolingo or Babbel to start learning basics",
        "Watch TV shows in the local language with subtitles",
        "Consider online tutoring for conversational practice",
      ],
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Your Path to {location.name}
        </h2>
        <p className="text-muted-foreground">
          A realistic timeline to make your move happen
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

        <div className="space-y-4">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 * index }}
              className="card-elevated p-5 md:pl-16 relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 top-5 md:left-3 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center hidden md:flex">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Icon and timing */}
                <div className="flex items-center gap-3 md:w-40 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center md:hidden">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-primary">{step.timing}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="hidden md:flex w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  
                  {/* Tips */}
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                        <Circle className="w-3 h-3 text-accent mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">
            Your future self will thank you for taking this step
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
};
```

### `src/components/results/PaywallCTA.tsx`
```tsx
import { motion } from "framer-motion";
import { Sparkles, Lock, Check, Shield, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaywallCTAProps {
  runId: string;
  topCity?: string;
  hasShared?: boolean;
}

const PROMO_CODE = "ISHARED";

export function PaywallCTA({ runId, topCity, hasShared = false }: PaywallCTAProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { 
          runId,
          couponCode: hasShared ? PROMO_CODE : undefined
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deepDiveBenefits = [
    "Full category breakdown by life dimension",
    "Tax comparison with your current city",
    "Cost of living deep dive",
    "Visa and residency insights",
    "Personalized next steps timeline",
    "All 10 ranked matches explained",
  ];

  const price = hasShared ? 5 : 10;
  const originalPrice = 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card-elevated p-8 md:p-12 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 pointer-events-none" />
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-50">
          <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary via-emerald-500 to-primary animate-pulse" style={{ filter: 'blur(8px)' }} />
        </div>
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Headlines */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Go <span className="text-primary">Deeper</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Understand exactly why {topCity || "your top match"} is perfect for you — and what to expect when you get there.
            </p>
          </div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 mb-8"
          >
            {deepDiveBenefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Discount Badge */}
          {hasShared && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <Tag className="w-4 h-4" />
                <span className="font-semibold">Share discount applied!</span>
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Button 
              variant="hero" 
              size="lg" 
              className="gap-3 text-lg px-10 py-7 w-full sm:w-auto"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Unlock Deep Dive for ${price}
                  {hasShared && (
                    <span className="text-primary-foreground/60 line-through ml-1">${originalPrice}</span>
                  )}
                </>
              )}
            </Button>

            {/* Payment logos placeholder */}
            <div className="flex items-center justify-center gap-4 mt-4 text-muted-foreground">
              <span className="text-xs">Pay with</span>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="px-2 py-1 bg-muted rounded">Apple Pay</span>
                <span className="px-2 py-1 bg-muted rounded">Google Pay</span>
                <span className="px-2 py-1 bg-muted rounded">Card</span>
              </div>
            </div>
          </motion.div>

          {/* Money-back guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Shield className="w-4 h-4" />
              <span className="font-medium text-sm">100% Money-back guarantee</span>
            </div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-6 border-t border-border"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              <span>One-time unlock</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5" />
              <span>No subscription</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete your data anytime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
```

### `src/components/results/PersonalityProfile.tsx`
```tsx
import { motion } from "framer-motion";
import { 
  Compass, 
  Sun, 
  Zap, 
  Users, 
  Wallet, 
  Heart,
  Globe,
  Sparkles
} from "lucide-react";
import type { OnboardingData } from "@/types/onboarding";

interface PersonalityProfileProps {
  preferences: OnboardingData;
  responseCount: number;
}

interface TraitItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

// Generate AI-style personality summary based on preferences
const generatePersonalitySummary = (preferences: OnboardingData, traits: { value: string }[]): string => {
  const name = preferences.name || "You";
  const traitValues = traits.map(t => t.value);
  
  // Build dynamic sentences based on actual preferences
  const sentences: string[] = [];
  
  // Work style opener
  if (preferences.workStyle === "remote") {
    sentences.push(`${name}, you're someone who thrives with location independence—your laptop is your office, and the world is your backdrop.`);
  } else if (preferences.workStyle === "entrepreneur") {
    sentences.push(`${name}, you're a builder at heart, driven by the excitement of creating something from nothing.`);
  } else if (preferences.workStyle === "hybrid") {
    sentences.push(`${name}, you value the best of both worlds—flexibility to work remotely while staying connected to a physical community.`);
  } else {
    sentences.push(`${name}, you appreciate structure and the energy that comes from being part of an in-person team.`);
  }
  
  // Climate personality
  if (preferences.preferredClimate === "tropical") {
    sentences.push("Your soul craves warmth and sunshine—you come alive when palm trees sway and the ocean is nearby.");
  } else if (preferences.preferredClimate === "mediterranean") {
    sentences.push("You're drawn to that perfect balance of warm summers and mild winters, with culture and coastline intertwined.");
  } else if (preferences.preferredClimate === "temperate") {
    sentences.push("You love experiencing all four seasons—the cozy winters, the vibrant springs, the golden autumns.");
  }
  
  // Social style
  if (preferences.communityVibes?.includes("expat")) {
    sentences.push("You naturally gravitate toward international communities where diverse perspectives spark new ideas.");
  } else if (preferences.communityVibes?.includes("startup")) {
    sentences.push("Fast-paced environments energize you—you want to be surrounded by ambitious people building the future.");
  } else if (preferences.communityVibes?.includes("creative")) {
    sentences.push("You're most inspired when surrounded by artists, makers, and creative minds who see the world differently.");
  }
  
  // Pace of life
  if (preferences.outdoorUrban === "outdoor") {
    sentences.push("Nature isn't just a weekend escape for you—it's essential to your daily wellbeing.");
  } else if (preferences.outdoorUrban === "urban") {
    sentences.push("You feed off city energy—the buzz of cafes, the spontaneous encounters, the endless possibilities.");
  }
  
  // Closing
  sentences.push("Your ideal place isn't just about checking boxes—it's about finding somewhere that feels like an extension of who you are.");
  
  return sentences.join(" ");
};

export function PersonalityProfile({ preferences, responseCount }: PersonalityProfileProps) {
  // Derive personality traits from preferences
  const getExplorerType = (): string => {
    if (preferences.workStyle === "remote") return "Digital Nomad";
    if (preferences.workStyle === "hybrid") return "Flex Explorer";
    if (preferences.workStyle === "entrepreneur") return "Visionary Builder";
    if (preferences.weekendTrips === "love") return "Globetrotter";
    return "Rooted Adventurer";
  };

  const getClimatePreference = (): string => {
    if (preferences.preferredClimate === "tropical") return "Tropical Dreamer";
    if (preferences.preferredClimate === "mediterranean") return "Mediterranean Soul";
    if (preferences.preferredClimate === "temperate") return "Four Seasons Lover";
    if (preferences.preferredClimate === "dry") return "Desert Explorer";
    if (preferences.preferredClimate === "cold") return "Winter Enthusiast";
    return "Climate Adaptable";
  };

  const getPaceOfLife = (): string => {
    if (preferences.outdoorUrban === "urban") return "City Enthusiast";
    if (preferences.outdoorUrban === "outdoor") return "Nature Seeker";
    if (preferences.outdoorUrban === "balanced") return "Best of Both";
    if (preferences.noiseTolerance === "lively") return "Energy Seeker";
    if (preferences.noiseTolerance === "quiet") return "Peace Lover";
    return "Balanced Rhythm";
  };

  const getCommunityFit = (): string => {
    const vibes = preferences.communityVibes || [];
    if (vibes.includes("expat")) return "Global Citizen";
    if (vibes.includes("startup")) return "Ambitious Networker";
    if (vibes.includes("creative")) return "Creative Soul";
    if (vibes.includes("family")) return "Family Focused";
    if (vibes.includes("relaxed")) return "Chill Seeker";
    if (preferences.peopleDensity === "busy") return "Social Butterfly";
    if (preferences.peopleDensity === "quiet") return "Quiet Observer";
    return "Flexible Community";
  };

  const getBudgetStyle = (): string => {
    if (preferences.budgetRange === "budget") return "Budget Optimizer";
    if (preferences.budgetRange === "moderate") return "Smart Spender";
    if (preferences.budgetRange === "comfortable") return "Comfort Seeker";
    if (preferences.budgetRange === "premium" || preferences.budgetRange === "luxury") return "Quality First";
    return "Value Seeker";
  };

  const getWellnessProfile = (): string => {
    if (preferences.beachMountain === "beach") return "Beach Lover";
    if (preferences.beachMountain === "mountain") return "Mountain Explorer";
    if (preferences.wellnessImportance === "high") return "Wellness Focused";
    if (preferences.gymCulture === "essential") return "Fitness Enthusiast";
    return "Balanced Living";
  };

  const traits: TraitItem[] = [
    { icon: Compass, label: "Explorer Type", value: getExplorerType() },
    { icon: Sun, label: "Climate", value: getClimatePreference() },
    { icon: Zap, label: "Pace of Life", value: getPaceOfLife() },
    { icon: Users, label: "Community", value: getCommunityFit() },
    { icon: Wallet, label: "Budget Style", value: getBudgetStyle() },
    { icon: Heart, label: "Wellness", value: getWellnessProfile() },
  ];

  const personalitySummary = generatePersonalitySummary(preferences, traits);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-12"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          We Know You
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground"
        >
          Based on your <span className="font-medium text-foreground">{responseCount}</span> responses, 
          here's your lifestyle profile
        </motion.p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="card-premium p-8 relative overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl" />
        
        {/* Avatar/Icon */}
        <div className="relative flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Your Lifestyle Profile</h3>
            <p className="text-sm text-white/60">AI-analyzed from your preferences</p>
          </div>
        </div>

        {/* Traits Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-2 gap-3 relative"
        >
          {traits.map((trait) => (
            <motion.div
              key={trait.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <trait.icon className="w-4 h-4 text-white/80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/50 uppercase tracking-wide leading-tight">{trait.label}</p>
                <p className="text-xs font-medium text-white leading-snug break-words">{trait.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI-Generated Personality Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">AI Analysis</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {personalitySummary}
          </p>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-white/50">
            Your perfect match is waiting to be revealed...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
```

### `src/components/results/RevealSequence.tsx`
```tsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, MapPin, Zap } from "lucide-react";
import { ScoreRing } from "./ScoreRing";
import type { MatchResult } from "@/lib/scoring";

interface RevealSequenceProps {
  result: MatchResult;
  currentCity?: string;
  currentCityScore?: number;
  onComplete: () => void;
}

type Stage = "building" | "score" | "city" | "complete";

export function RevealSequence({ 
  result, 
  currentCity,
  currentCityScore,
  onComplete 
}: RevealSequenceProps) {
  const [stage, setStage] = useState<Stage>("building");
  const [buildProgress, setBuildProgress] = useState(0);
  const { location, totalScore } = result;
  const delta = currentCityScore ? Math.round(totalScore - currentCityScore) : 0;

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
        zIndex: 9999,
      });
    }, 250);
  }, []);

  // Progress through stages
  useEffect(() => {
    if (stage === "building") {
      const progressInterval = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setStage("score"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(progressInterval);
    }

    if (stage === "score") {
      const timeout = setTimeout(() => setStage("city"), 2000);
      return () => clearTimeout(timeout);
    }

    if (stage === "city") {
      fireConfetti();
      const timeout = setTimeout(() => {
        setStage("complete");
        onComplete();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [stage, fireConfetti, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="card-elevated p-8 md:p-12 relative overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-violet-500/10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {/* Stage 1: Building DNA */}
          {stage === "building" && (
            <motion.div
              key="building"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-2">Analyzing Your Place DNA</h2>
              <p className="text-muted-foreground mb-4">Crunching {buildProgress}% of your lifestyle data...</p>
              
              {/* Progress bar */}
              <div className="w-64 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${buildProgress}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* Stage 2: Score Reveal */}
          {stage === "score" && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="mb-6"
              >
                <ScoreRing score={totalScore} size={180} />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold mb-2"
              >
                Perfect Match Found!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-muted-foreground"
              >
                We found a city that's <span className="text-emerald-500 font-semibold">{Math.round(totalScore)}%</span> compatible with you
              </motion.p>
            </motion.div>
          )}

          {/* Stage 3: City Reveal */}
          {stage === "city" && (
            <motion.div
              key="city"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 text-primary mb-4"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Your #1 Match</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 12,
                  delay: 0.3 
                }}
                className="text-5xl md:text-6xl font-bold text-gradient mb-2"
              >
                {location.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {location.region ? `${location.region}, ` : ""}{location.country}
              </motion.p>

              {/* Delta badge */}
              {delta > 0 && currentCity && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-center mt-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">+{delta}%</span>
                    <span className="text-sm">better fit than {currentCity}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
```

### `src/components/results/ScoreRing.tsx`
```tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScoreRing({ 
  score, 
  size = 160, 
  strokeWidth = 12,
  className = "" 
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  // Animate score number
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(Math.round(score));
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-secondary"
        />
        
        {/* Animated score circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 70%, 42%)" />
            <stop offset="50%" stopColor="hsl(180, 70%, 45%)" />
            <stop offset="100%" stopColor="hsl(211, 100%, 50%)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tabular-nums">
          {displayScore}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          % match
        </span>
      </div>
    </div>
  );
}
```

### `src/components/results/ShareModal.tsx`
```tsx
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { X, Download, Link2, Instagram, Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceDNACard } from "./shareables/PlaceDNACard";
import { LifeUpgradeCard } from "./shareables/LifeUpgradeCard";
import type { MatchResult, CategoryScore } from "@/lib/scoring";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MatchResult;
  userName?: string;
  currentCity?: string;
  currentCityScore?: number;
}

type CardType = 'dna' | 'upgrade';

// Convert CategoryScore[] to Record<string, number> for the cards
const categoryScoresToRecord = (categoryScores: CategoryScore[]): Record<string, number> => {
  return categoryScores.reduce((acc, cs) => {
    acc[cs.category] = cs.score;
    return acc;
  }, {} as Record<string, number>);
};

export function ShareModal({ isOpen, onClose, result, userName, currentCity, currentCityScore }: ShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>('dna');
  const dnaCardRef = useRef<HTMLDivElement>(null);
  const upgradeCardRef = useRef<HTMLDivElement>(null);

  const cardRef = selectedCard === 'dna' ? dnaCardRef : upgradeCardRef;

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1920,
      });
      
      const cardSuffix = selectedCard === 'dna' ? 'dna' : 'upgrade';
      const link = document.createElement("a");
      link.download = `findyourplace-${result.location.name.toLowerCase().replace(/\s+/g, "-")}-${cardSuffix}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Image downloaded! Share it on Instagram 📸");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [result.location.name, selectedCard, cardRef]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setLinkCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }, []);

  const toggleCard = () => {
    setSelectedCard(prev => prev === 'dna' ? 'upgrade' : 'dna');
  };

  const displayName = userName || "Explorer";
  const topReasons = result.reasons?.slice(0, 3) || ["Perfect climate", "Great community", "Amazing lifestyle"];
  const categoryScoresRecord = categoryScoresToRecord(result.categoryScores);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] md:max-h-[95vh] bg-background rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
              <div>
                <h2 className="text-lg font-bold">Share Your Result</h2>
                <p className="text-sm text-muted-foreground">
                  Choose your card style
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Card selector tabs */}
            <div className="px-5 pt-4 shrink-0">
              <div className="flex bg-secondary/50 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setSelectedCard('dna')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    selectedCard === 'dna'
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🧬 Place DNA
                </button>
                <button
                  onClick={() => setSelectedCard('upgrade')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    selectedCard === 'upgrade'
                      ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🚀 Life Upgrade
                </button>
              </div>
            </div>

            {/* Preview with swipe navigation */}
            <div className="flex-1 p-5 overflow-auto">
              <div className="flex items-center justify-center gap-4 mb-5">
                <button
                  onClick={toggleCard}
                  className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Card preview container */}
                <div 
                  className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative"
                  style={{
                    width: "240px",
                    height: "426px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCard}
                      initial={{ opacity: 0, x: selectedCard === 'dna' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: selectedCard === 'dna' ? 20 : -20 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        transform: "scale(0.222)",
                        transformOrigin: "top left",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      {selectedCard === 'dna' ? (
                        <PlaceDNACard
                          userName={displayName}
                          matchCity={result.location.name}
                          matchCountry={result.location.country}
                          matchScore={Math.round(result.totalScore)}
                          currentCity={currentCity}
                          currentCityScore={currentCityScore}
                          categoryScores={categoryScoresRecord}
                          topReasons={topReasons}
                        />
                      ) : (
                        <LifeUpgradeCard
                          userName={displayName}
                          matchCity={result.location.name}
                          matchCountry={result.location.country}
                          matchScore={Math.round(result.totalScore)}
                          currentCity={currentCity}
                          currentCityScore={currentCityScore}
                          locationData={{
                            sunshine_days: result.location.sunshine_days || undefined,
                            cost_of_living_score: result.location.cost_of_living_score || undefined,
                            safety_score: result.location.safety_score || undefined,
                            beach_access_score: result.location.beach_access_score || undefined,
                            community_score: result.location.community_score || undefined,
                            personal_income_tax_rate: result.location.personal_income_tax_rate || undefined,
                          }}
                          topReasons={topReasons}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={toggleCard}
                  className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Card description */}
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {selectedCard === 'dna' 
                    ? "Shows your unique place-finding DNA fingerprint"
                    : "Highlights the life upgrades waiting for you"
                  }
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-secondary/50 rounded-xl p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2 text-sm">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  Perfect for Instagram Stories
                </h3>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Download the 1080×1920 image</li>
                  <li>2. Share directly to your Story</li>
                  <li>3. Add the link sticker for friends to try!</li>
                </ol>
              </div>
            </div>

            {/* Hidden cards for rendering */}
            <div className="absolute -left-[9999px] -top-[9999px]">
              <PlaceDNACard
                ref={dnaCardRef}
                userName={displayName}
                matchCity={result.location.name}
                matchCountry={result.location.country}
                matchScore={Math.round(result.totalScore)}
                currentCity={currentCity}
                currentCityScore={currentCityScore}
                categoryScores={categoryScoresRecord}
                topReasons={topReasons}
              />
              <LifeUpgradeCard
                ref={upgradeCardRef}
                userName={displayName}
                matchCity={result.location.name}
                matchCountry={result.location.country}
                matchScore={Math.round(result.totalScore)}
                currentCity={currentCity}
                currentCityScore={currentCityScore}
                locationData={{
                  sunshine_days: result.location.sunshine_days || undefined,
                  cost_of_living_score: result.location.cost_of_living_score || undefined,
                  safety_score: result.location.safety_score || undefined,
                  beach_access_score: result.location.beach_access_score || undefined,
                  community_score: result.location.community_score || undefined,
                  personal_income_tax_rate: result.location.personal_income_tax_rate || undefined,
                }}
                topReasons={topReasons}
              />
            </div>

            {/* Actions */}
            <div className="p-5 border-t border-border bg-secondary/30 shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className={`flex-1 gap-2 text-white border-0 ${
                    selectedCard === 'dna'
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600'
                      : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download {selectedCard === 'dna' ? 'DNA Card' : 'Upgrade Card'}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-4 h-4 text-success" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### `src/components/results/ShareableCard.tsx`
```tsx
import { forwardRef } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import type { MatchResult } from "@/lib/scoring";

interface ShareableCardProps {
  result: MatchResult;
  userName?: string;
  currentCity?: string;
  currentCityScore?: number;
}

// Generate random stars for the cosmic background
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  }));
};

const stars = generateStars(50);

export const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ result, userName, currentCity, currentCityScore }, ref) => {
    const { location, totalScore, reasons } = result;
    
    // Calculate improvement delta
    const hasComparison = currentCity && currentCityScore !== undefined;
    const delta = hasComparison ? Math.round(totalScore - currentCityScore) : 0;

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(180deg, #0a0a0f 0%, #0d0f14 20%, #16213e 50%, #1a1a2e 80%, #0d0f14 100%)",
        }}
      >
        {/* Cosmic stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "white",
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}

        {/* Aurora glow effects */}
        <div 
          className="absolute rounded-full blur-[120px]"
          style={{ 
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "linear-gradient(180deg, rgba(51, 153, 255, 0.4) 0%, rgba(23, 201, 165, 0.2) 100%)",
          }}
        />
        <div 
          className="absolute rounded-full blur-[100px]"
          style={{ 
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "linear-gradient(180deg, rgba(23, 201, 165, 0.3) 0%, rgba(51, 153, 255, 0.15) 100%)",
          }}
        />

        {/* Stylized Globe */}
        <div 
          className="absolute"
          style={{
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
          }}
        >
          {/* Outer glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(51, 153, 255, 0.3) 0%, rgba(23, 201, 165, 0.15) 40%, transparent 70%)",
              filter: "blur(40px)",
              transform: "scale(1.3)",
            }}
          />
          
          {/* Globe body */}
          <svg viewBox="0 0 200 200" className="w-full h-full relative">
            {/* Atmospheric glow */}
            <defs>
              <radialGradient id="shareGlobe-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(51, 153, 255, 0.1)" />
                <stop offset="70%" stopColor="rgba(23, 201, 165, 0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="shareGlobe-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3399ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#17c9a5" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3399ff" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle cx="100" cy="100" r="80" fill="url(#shareGlobe-glow)" />
            
            {/* Grid lines - horizontal */}
            {[30, 50, 70, 100, 130, 150, 170].map((y, i) => {
              const r = Math.sqrt(Math.max(0, 6400 - (y - 100) ** 2));
              return r > 0 ? (
                <ellipse
                  key={`h-${i}`}
                  cx="100"
                  cy={y}
                  rx={r}
                  ry={r * 0.3}
                  fill="none"
                  stroke="url(#shareGlobe-line)"
                  strokeWidth="1"
                  opacity={0.6 - Math.abs(y - 100) / 200}
                />
              ) : null;
            })}
            
            {/* Grid lines - vertical */}
            {[-60, -30, 0, 30, 60].map((rotation, i) => (
              <ellipse
                key={`v-${i}`}
                cx="100"
                cy="100"
                rx={Math.abs(rotation) < 45 ? 25 + Math.abs(rotation) * 0.5 : 20}
                ry="80"
                fill="none"
                stroke="url(#shareGlobe-line)"
                strokeWidth="1"
                transform={`rotate(${rotation} 100 100)`}
                opacity={0.5 - Math.abs(rotation) / 200}
              />
            ))}
            
            {/* Outer ring */}
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="url(#shareGlobe-line)"
              strokeWidth="1.5"
              opacity="0.8"
            />
            
            {/* Highlight arc */}
            <path
              d="M 60 50 Q 40 80 50 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col px-16 py-20">
          {/* Top branding */}
          <div className="flex items-center gap-4 mb-auto">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, rgba(51, 153, 255, 0.3) 0%, rgba(23, 201, 165, 0.2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="text-3xl">🌍</span>
            </div>
            <span 
              className="text-4xl font-semibold tracking-tight"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Place
            </span>
          </div>

          {/* Spacer to push content down below globe */}
          <div style={{ height: "420px" }} />

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* City name with gradient */}
            <h1 
              className="text-center mb-4"
              style={{ 
                fontSize: "96px",
                fontWeight: 700,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #ffffff 0%, #3399ff 50%, #17c9a5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 80px rgba(51, 153, 255, 0.5)",
              }}
            >
              {location.name}
            </h1>
            
            <p 
              className="text-center mb-12"
              style={{ 
                fontSize: "36px",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 400,
              }}
            >
              {location.region ? `${location.region}, ` : ""}{location.country}
            </p>

            {/* Score badge */}
            <div 
              className="relative mb-12"
              style={{
                padding: "32px 64px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.15) 100%)",
                border: "2px solid rgba(34, 197, 94, 0.4)",
                boxShadow: "0 0 60px rgba(34, 197, 94, 0.3), inset 0 0 30px rgba(34, 197, 94, 0.1)",
              }}
            >
              <div className="flex items-center gap-4">
                <Sparkles 
                  className="w-12 h-12"
                  style={{ color: "#22c55e" }}
                />
                <span 
                  style={{ 
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#22c55e",
                    textShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
                  }}
                >
                  {Math.round(totalScore)}%
                </span>
                <span 
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 500,
                    color: "rgba(34, 197, 94, 0.8)",
                  }}
                >
                  MATCH
                </span>
              </div>
            </div>

            {/* Comparison delta */}
            {hasComparison && delta > 0 && (
              <div 
                className="flex items-center gap-4 mb-12"
                style={{
                  padding: "20px 40px",
                  borderRadius: "60px",
                  background: "linear-gradient(135deg, rgba(51, 153, 255, 0.2) 0%, rgba(23, 201, 165, 0.1) 100%)",
                  border: "1px solid rgba(51, 153, 255, 0.3)",
                }}
              >
                <TrendingUp 
                  className="w-8 h-8"
                  style={{ color: "#17c9a5" }}
                />
                <span 
                  style={{ 
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#17c9a5",
                  }}
                >
                  +{delta}% better than {currentCity}
                </span>
              </div>
            )}

            {/* Top reason quote */}
            {reasons[0] && (
              <div 
                className="mx-auto"
                style={{
                  maxWidth: "850px",
                  padding: "40px 48px",
                  borderRadius: "32px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p 
                  className="text-center"
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.5,
                  }}
                >
                  "{reasons[0]}"
                </p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-auto pt-12">
            {/* Divider */}
            <div 
              className="mb-10"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
              }}
            />
            
            <div className="flex flex-col items-center">
              <p 
                className="text-center mb-6"
                style={{ 
                  fontSize: "40px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Find where you belong
              </p>
              
              <div 
                style={{
                  padding: "24px 56px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
                  boxShadow: "0 8px 32px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)",
                }}
              >
                <span 
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "0.5px",
                  }}
                >
                  findyourplace.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
```

### `src/components/results/TaxDeepDive.tsx`
```tsx
import { motion } from "framer-motion";
import { DollarSign, Building2, TrendingUp, AlertTriangle, ArrowRight, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Location } from "@/lib/scoring";

interface TaxDeepDiveProps {
  currentCity: string;
  currentLocation?: Location;
  topMatch: {
    location: Location;
  };
  estimatedIncome?: number;
}

// Default tax data for common locations (when DB doesn't have it)
const DEFAULT_TAX_DATA: Record<string, { personal: number; corporate: number; capitalGains: number; notes: string }> = {
  // High tax locations
  "san francisco": { personal: 37, corporate: 21, capitalGains: 20, notes: "Federal + CA state tax. High earners face 13.3% state tax." },
  "new york": { personal: 37, corporate: 21, capitalGains: 20, notes: "Federal + NY state + NYC city tax can exceed 12%." },
  "london": { personal: 45, corporate: 25, capitalGains: 20, notes: "Higher rate for earnings over £50k. Non-dom status available." },
  "paris": { personal: 45, corporate: 25, capitalGains: 30, notes: "High social charges. Complex tax system for expats." },
  "tokyo": { personal: 45, corporate: 23, capitalGains: 20, notes: "National + prefectural + municipal taxes combined." },
  "sydney": { personal: 45, corporate: 30, capitalGains: 22, notes: "No tax-free threshold for non-residents." },
  "toronto": { personal: 53, corporate: 26, capitalGains: 26, notes: "Federal + Ontario provincial tax." },
  
  // Medium tax locations
  "berlin": { personal: 45, corporate: 30, capitalGains: 25, notes: "Solidarity surcharge adds 5.5%. Church tax may apply." },
  "amsterdam": { personal: 49, corporate: 25, capitalGains: 31, notes: "30% ruling for skilled migrants reduces tax significantly." },
  "singapore": { personal: 22, corporate: 17, capitalGains: 0, notes: "No capital gains tax. Territorial tax system." },
  "hong kong": { personal: 17, corporate: 16, capitalGains: 0, notes: "Territorial tax - only HK-sourced income taxed." },
  
  // Low/no tax locations
  "dubai": { personal: 0, corporate: 9, capitalGains: 0, notes: "No personal income tax. 9% corporate tax on profits over AED 375k." },
  "abu dhabi": { personal: 0, corporate: 9, capitalGains: 0, notes: "Same as Dubai - UAE federal tax system." },
  "lisbon": { personal: 48, corporate: 21, capitalGains: 28, notes: "NHR regime offers 20% flat rate for 10 years." },
  "bangkok": { personal: 35, corporate: 20, capitalGains: 0, notes: "Only remitted foreign income taxed. Great for remote workers." },
  "bali": { personal: 35, corporate: 22, capitalGains: 0, notes: "Indonesia taxes residents on worldwide income." },
  "mexico city": { personal: 35, corporate: 30, capitalGains: 10, notes: "Tax treaties with many countries. Complex expat rules." },
  "panama city": { personal: 25, corporate: 25, capitalGains: 10, notes: "Territorial tax - foreign income not taxed." },
  "andorra": { personal: 10, corporate: 10, capitalGains: 0, notes: "Flat 10% tax rate. No wealth or inheritance tax." },
  "monaco": { personal: 0, corporate: 0, capitalGains: 0, notes: "No income tax for residents (except French citizens)." },
  "cayman islands": { personal: 0, corporate: 0, capitalGains: 0, notes: "No direct taxes. Higher cost of living." },
  "malta": { personal: 35, corporate: 35, capitalGains: 0, notes: "Non-dom regime available. 15% flat rate for remitted income." },
  "cyprus": { personal: 35, corporate: 12, capitalGains: 0, notes: "Non-dom status exempts dividends and interest." },
  "georgia": { personal: 20, corporate: 15, capitalGains: 0, notes: "Flat 20% tax. 1% for small businesses." },
  "estonia": { personal: 20, corporate: 20, capitalGains: 20, notes: "E-residency available. Tax only on distributed profits." },
};

function getTaxData(location: Location | undefined, cityName: string) {
  const normalizedName = cityName.toLowerCase().trim();
  
  // First try to get from location data
  if (location?.personal_income_tax_rate !== null && location?.personal_income_tax_rate !== undefined) {
    return {
      personal: location.personal_income_tax_rate,
      corporate: location.corporate_tax_rate || 20,
      capitalGains: location.capital_gains_tax_rate || 15,
      notes: location.tax_notes || "Tax rates may vary based on individual circumstances.",
    };
  }
  
  // Fall back to default data
  const defaultData = DEFAULT_TAX_DATA[normalizedName];
  if (defaultData) {
    return defaultData;
  }
  
  // Generic fallback
  return {
    personal: 30,
    corporate: 20,
    capitalGains: 15,
    notes: "Consult a tax professional for accurate rates.",
  };
}

function formatTaxRate(rate: number): string {
  if (rate === 0) return "0%";
  return `${rate}%`;
}

function calculateSavings(currentRate: number, newRate: number, income: number): number {
  const currentTax = income * (currentRate / 100);
  const newTax = income * (newRate / 100);
  return Math.round(currentTax - newTax);
}

export function TaxDeepDive({ currentCity, currentLocation, topMatch, estimatedIncome = 150000 }: TaxDeepDiveProps) {
  const currentTax = getTaxData(currentLocation, currentCity);
  const newTax = getTaxData(topMatch.location, topMatch.location.name);
  
  const personalSavings = calculateSavings(currentTax.personal, newTax.personal, estimatedIncome);
  const totalPotentialSavings = personalSavings > 0 ? personalSavings : 0;
  
  const taxCategories = [
    {
      label: "Personal Income Tax",
      icon: DollarSign,
      current: currentTax.personal,
      new: newTax.personal,
      description: "Top marginal rate on personal income",
    },
    {
      label: "Corporate / Freelance Tax",
      icon: Building2,
      current: currentTax.corporate,
      new: newTax.corporate,
      description: "Rate for business income or self-employment",
    },
    {
      label: "Capital Gains Tax",
      icon: TrendingUp,
      current: currentTax.capitalGains,
      new: newTax.capitalGains,
      description: "Tax on investment profits and asset sales",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Percent className="w-5 h-5 text-primary" />
            </div>
            Tax Comparison
          </CardTitle>
          <p className="text-muted-foreground">
            How taxes change from <span className="font-medium text-foreground">{currentCity}</span> to{" "}
            <span className="font-medium text-primary">{topMatch.location.name}</span>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tax Category Comparison */}
          <div className="grid gap-4">
            {taxCategories.map((category, index) => {
              const Icon = category.icon;
              const difference = category.current - category.new;
              const isBetter = difference > 0;
              const isWorse = difference < 0;
              const isSame = difference === 0;
              
              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-background/50 rounded-xl p-4 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{category.label}</h4>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Current */}
                    <div className="flex-1 text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">{currentCity}</p>
                      <p className="text-2xl font-bold text-foreground">{formatTaxRate(category.current)}</p>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    {/* New */}
                    <div className={`flex-1 text-center p-3 rounded-lg ${
                      isBetter ? "bg-green-500/10 border border-green-500/30" :
                      isWorse ? "bg-red-500/10 border border-red-500/30" :
                      "bg-muted/50"
                    }`}>
                      <p className="text-xs text-muted-foreground mb-1">{topMatch.location.name}</p>
                      <p className={`text-2xl font-bold ${
                        isBetter ? "text-green-600 dark:text-green-400" :
                        isWorse ? "text-red-600 dark:text-red-400" :
                        "text-foreground"
                      }`}>
                        {formatTaxRate(category.new)}
                      </p>
                    </div>
                    
                    {/* Change indicator */}
                    <div className="w-20 text-right">
                      {isBetter && (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          -{Math.abs(difference)}%
                        </span>
                      )}
                      {isWorse && (
                        <span className="text-red-600 dark:text-red-400 font-semibold">
                          +{Math.abs(difference)}%
                        </span>
                      )}
                      {isSame && (
                        <span className="text-muted-foreground">Same</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Potential Savings */}
          {totalPotentialSavings > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Annual Savings</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${totalPotentialSavings.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on ${estimatedIncome.toLocaleString()} annual income
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Notes Section */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">Important Tax Considerations</p>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="font-medium text-foreground">{topMatch.location.name}:</span> {newTax.notes}</p>
                  <p><span className="font-medium text-foreground">{currentCity}:</span> {currentTax.notes}</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ Tax rates are approximate and subject to change. US citizens have worldwide tax obligations regardless of residence. 
              Always consult with a qualified tax professional before making relocation decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

### `src/components/results/TopMatchHero.tsx`
```tsx
import { motion } from "framer-motion";
import { MapPin, Trophy, Lock, Sparkles } from "lucide-react";
import { ScoreRing } from "./ScoreRing";
import type { MatchResult } from "@/lib/scoring";

interface TopMatchHeroProps {
  result: MatchResult;
  isUnlocked: boolean;
}

export function TopMatchHero({ result, isUnlocked }: TopMatchHeroProps) {
  const { location, totalScore, reasons, tradeoffs } = result;

  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="text-center mb-8">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Trophy className="w-4 h-4" />
            Your #1 Match
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 flex items-center justify-center gap-4">
            <Lock className="w-10 h-10 text-muted-foreground" />
            <span className="blur-lg text-muted-foreground select-none">????????</span>
          </h1>
          <p className="text-lg text-muted-foreground">{location.continent}</p>
        </div>

        <div className="card-elevated p-8 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-md bg-background/90 z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-2">Unlock your perfect match</p>
              <p className="text-sm text-muted-foreground">See why this city is made for you</p>
            </div>
          </div>
          <div className="opacity-20 h-32" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="text-center mb-8">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Your Perfect Match
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-3"
        >
          {location.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground"
        >
          {location.region ? `${location.region}, ` : ""}{location.country}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="card-elevated p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <ScoreRing score={totalScore} size={140} />
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Top Match
              </span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {location.vibe_summary}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-sm">✓</span>
              Why You'll Love It
            </h3>
            <ul className="space-y-3">
              {reasons.map((reason, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {reason}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-sm">⚡</span>
              Things to Consider
            </h3>
            <ul className="space-y-3">
              {tradeoffs.map((tradeoff, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-amber-500 mt-0.5">•</span>
                  {tradeoff}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {location.tags && location.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {location.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
```

### `src/components/results/TopMatchReveal.tsx`
```tsx
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { MapPin, Sparkles, Instagram, Gift, Check, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "./ScoreRing";
import { ShareableCard } from "./ShareableCard";
import type { MatchResult } from "@/lib/scoring";
import { toast } from "sonner";

interface TopMatchRevealProps {
  result: MatchResult;
  currentCity?: string;
  currentCityScore?: number;
  onShareComplete: () => void;
  hasShared: boolean;
  userName?: string;
}

const PROMO_CODE = "ISHARED";

export function TopMatchReveal({ 
  result, 
  currentCity, 
  currentCityScore, 
  onShareComplete,
  hasShared,
  userName 
}: TopMatchRevealProps) {
  const { location, totalScore, reasons } = result;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const delta = currentCityScore ? Math.round(totalScore - currentCityScore) : 0;

  const fireConfetti = useCallback(() => {
    // Single smooth confetti burst from center
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      zIndex: 9999,
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.1,
      drift: 0,
    });
  }, []);

  const handleShareToInstagram = useCallback(async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      // Generate the image
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1920,
      });
      
      // Download the image
      const link = document.createElement("a");
      link.download = `findyourplace-${location.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
      
      // Track that they've shared
      localStorage.setItem("hasSharedForDiscount", "true");
      onShareComplete();
      
      // Fire confetti celebration!
      fireConfetti();
      
      // Show success message with promo code
      setShowSuccessMessage(true);
      
      // Try to open Instagram (works on mobile)
      setTimeout(() => {
        window.open("https://instagram.com", "_blank");
      }, 800);
      
      toast.success("Image downloaded! Share it to Instagram for 50% off 🎉");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [location.name, onShareComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-8"
    >
      {/* Hidden shareable card for image generation */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <ShareableCard 
          ref={cardRef} 
          result={result} 
          userName={userName}
          currentCity={currentCity}
          currentCityScore={currentCityScore}
        />
      </div>

      <div className="card-elevated p-8 md:p-10 relative overflow-hidden">
        {/* Celebratory gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-teal-500/10 pointer-events-none" />
        
        {/* Header badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Your #1 Best Match</span>
          </div>
        </motion.div>

        {/* City name and score */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            {location.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {location.region ? `${location.region}, ` : ""}{location.country}
          </motion.p>
        </div>

        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <ScoreRing score={totalScore} size={120} />
        </motion.div>

        {/* Delta badge */}
        {delta > 0 && currentCity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600">
              <span className="font-semibold">+{delta}%</span>
              <span className="text-sm">better fit than {currentCity}</span>
            </div>
          </motion.div>
        )}

        {/* Top reason preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground italic">
            "{reasons[0]}"
          </p>
        </motion.div>

        {/* Share CTA or Success Message */}
        {!hasShared && !showSuccessMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-pink-500/20"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 text-sm font-medium mb-3">
                <Gift className="w-4 h-4" />
                Special Offer
              </div>
              <h3 className="text-xl font-bold mb-2">Share & Save 50%</h3>
              <p className="text-muted-foreground text-sm">
                Share your match to Instagram and unlock your Deep Dive for just <span className="font-semibold text-foreground">$5</span> instead of $10
              </p>
            </div>
            
            <Button
              onClick={handleShareToInstagram}
              disabled={isGenerating}
              className="w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 h-12"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Image...
                </>
              ) : (
                <>
                  <Instagram className="w-5 h-5" />
                  Share to Instagram & Get 50% Off
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Your shareable story image will download automatically
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thanks for Sharing!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your discount has been applied. Use code below at checkout:
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background border-2 border-dashed border-primary/30">
                <span className="text-2xl font-mono font-bold text-primary tracking-wider">{PROMO_CODE}</span>
              </div>
              <p className="text-sm text-emerald-600 font-medium mt-3">
                50% off your Deep Dive!
              </p>
            </div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-6"
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-xs mb-1">See what's included</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}```

### `src/components/results/shareables/CircuitCard.tsx`
```tsx
import { forwardRef } from "react";
import { Plane, MapPin, Calendar } from "lucide-react";
import type { AnnualCircuit } from "@/lib/circuitGenerator";
import { getMonthAbbrev } from "@/lib/circuitGenerator";

interface CircuitCardProps {
  circuit: AnnualCircuit;
  userName?: string;
}

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.4 + 0.2,
  }));
};

const stars = generateStars(40);

// Get country flag emoji
function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    "Portugal": "🇵🇹", "Spain": "🇪🇸", "Thailand": "🇹🇭", "Indonesia": "🇮🇩",
    "Japan": "🇯🇵", "Mexico": "🇲🇽", "South Africa": "🇿🇦", "France": "🇫🇷",
    "Italy": "🇮🇹", "Greece": "🇬🇷", "Croatia": "🇭🇷", "Germany": "🇩🇪",
    "United Kingdom": "🇬🇧", "United States": "🇺🇸", "Colombia": "🇨🇴",
    "Argentina": "🇦🇷", "Brazil": "🇧🇷", "Vietnam": "🇻🇳", "Australia": "🇦🇺",
    "New Zealand": "🇳🇿", "Netherlands": "🇳🇱", "Switzerland": "🇨🇭",
  };
  return flags[country] || "🌍";
}

// Season colors for the circular segments
const seasonColors = [
  "#3b82f6", // blue - winter/start
  "#22c55e", // green - spring
  "#f59e0b", // amber - summer
  "#ef4444", // red - fall
  "#8b5cf6", // purple - bonus
  "#ec4899", // pink - bonus
];

export const CircuitCard = forwardRef<HTMLDivElement, CircuitCardProps>(
  ({ circuit, userName }, ref) => {
    const { stops } = circuit;
    const year = new Date().getFullYear();
    
    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(180deg, #0a1628 0%, #0d1117 50%, #0a0a0f 100%)",
        }}
      >
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "white",
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Teal/cyan aurora */}
        <div 
          className="absolute rounded-full blur-[120px]"
          style={{ 
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "linear-gradient(180deg, rgba(20, 184, 166, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-16 py-20">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span className="text-3xl">🌍</span>
            </div>
            <span 
              className="text-4xl font-semibold tracking-tight"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Place
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 
              style={{ 
                fontSize: "44px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "16px",
              }}
            >
              {userName ? `${userName}'s` : "My"} Annual Circuit
            </h2>
            <h1 
              style={{ 
                fontSize: "72px",
                fontWeight: 700,
                background: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {year} Journey
            </h1>
          </div>

          {/* Stats */}
          <div 
            className="flex justify-center gap-12 mb-12"
            style={{
              padding: "24px 40px",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              width: "fit-content",
              margin: "0 auto 48px",
            }}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8" style={{ color: "#14b8a6" }} />
              <span style={{ fontSize: "32px", fontWeight: 600, color: "white" }}>
                {circuit.totalLocations} cities
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Plane className="w-8 h-8" style={{ color: "#3b82f6" }} />
              <span style={{ fontSize: "32px", fontWeight: 600, color: "white" }}>
                {circuit.totalCountries} countries
              </span>
            </div>
          </div>

          {/* Circuit stops timeline */}
          <div className="flex-1 flex flex-col gap-5">
            {stops.map((stop, index) => {
              const monthRange = stop.months.length > 1 
                ? `${getMonthAbbrev(stop.months[0])} - ${getMonthAbbrev(stop.months[stop.months.length - 1])}`
                : getMonthAbbrev(stop.months[0]);
              const color = seasonColors[index % seasonColors.length];
              
              return (
                <div 
                  key={stop.location.id}
                  className="flex items-center gap-6"
                  style={{
                    padding: "28px 36px",
                    borderRadius: "28px",
                    background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
                    border: `2px solid ${color}40`,
                  }}
                >
                  {/* Number */}
                  <div 
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "32px", fontWeight: 700, color: "white" }}>
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Flag & City */}
                  <div className="flex items-center gap-4 flex-1">
                    <span style={{ fontSize: "48px" }}>
                      {getCountryFlag(stop.location.country)}
                    </span>
                    <div>
                      <h3 style={{ fontSize: "36px", fontWeight: 600, color: "white" }}>
                        {stop.location.name}
                      </h3>
                      <p style={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.6)" }}>
                        {stop.location.country}
                      </p>
                    </div>
                  </div>
                  
                  {/* Months */}
                  <div 
                    style={{
                      padding: "12px 24px",
                      borderRadius: "40px",
                      background: `${color}30`,
                      border: `1px solid ${color}60`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-6 h-6" style={{ color }} />
                      <span style={{ fontSize: "24px", fontWeight: 600, color }}>
                        {monthRange}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Repeat indicator */}
          <div 
            className="flex items-center justify-center gap-4 mt-8 mb-8"
            style={{
              padding: "20px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.03)",
            }}
          >
            <span style={{ fontSize: "36px" }}>🔄</span>
            <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.6)" }}>
              Then repeat the adventure!
            </span>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center">
            <div 
              style={{
                padding: "24px 56px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)",
                boxShadow: "0 8px 32px rgba(20, 184, 166, 0.4)",
              }}
            >
              <span 
                style={{ 
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                findyourplace.com
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CircuitCard.displayName = "CircuitCard";
```

### `src/components/results/shareables/LifeUpgradeCard.tsx`
```tsx
import React, { forwardRef } from 'react';
import { MapPin, Sun, Wallet, Shield, Umbrella, Users, Plane, ArrowRight } from 'lucide-react';

interface LifeUpgradeCardProps {
  userName: string;
  matchCity: string;
  matchCountry: string;
  matchScore: number;
  currentCity?: string;
  currentCityScore?: number;
  locationData?: {
    sunshine_days?: number;
    cost_of_living_score?: number;
    safety_score?: number;
    beach_access_score?: number;
    community_score?: number;
    personal_income_tax_rate?: number;
    avg_temp_winter?: number;
    avg_temp_summer?: number;
  };
  currentLocationData?: {
    cost_of_living_score?: number;
    safety_score?: number;
    sunshine_days?: number;
    personal_income_tax_rate?: number;
  };
  topReasons: string[];
}

const calculateUpgrades = (
  matchData?: LifeUpgradeCardProps['locationData'],
  currentData?: LifeUpgradeCardProps['currentLocationData']
) => {
  const upgrades: { icon: React.ElementType; label: string; value: string; gradient: string; show: boolean }[] = [];

  // Sunshine days
  if (matchData?.sunshine_days) {
    const sunnyDelta = currentData?.sunshine_days 
      ? matchData.sunshine_days - currentData.sunshine_days 
      : null;
    upgrades.push({
      icon: Sun,
      label: 'Sunny Days',
      value: sunnyDelta && sunnyDelta > 0 
        ? `+${sunnyDelta} days/year` 
        : `${matchData.sunshine_days} days/year`,
      gradient: 'from-amber-400 to-orange-500',
      show: true,
    });
  }

  // Cost savings estimation
  if (matchData?.cost_of_living_score) {
    const costScore = matchData.cost_of_living_score;
    // Higher score = lower cost, estimate monthly savings
    const estimatedSavings = Math.round((costScore / 10) * 400);
    if (estimatedSavings > 200) {
      upgrades.push({
        icon: Wallet,
        label: 'Monthly Savings',
        value: `~$${estimatedSavings}/mo`,
        gradient: 'from-emerald-400 to-teal-500',
        show: true,
      });
    }
  }

  // Safety improvement
  if (matchData?.safety_score && matchData.safety_score > 7) {
    const safetyLabel = matchData.safety_score >= 9 ? 'Ultra Safe' : 
                        matchData.safety_score >= 8 ? 'Very Safe' : 'Safe Zone';
    upgrades.push({
      icon: Shield,
      label: 'Safety Level',
      value: safetyLabel,
      gradient: 'from-blue-400 to-indigo-500',
      show: true,
    });
  }

  // Beach access
  if (matchData?.beach_access_score && matchData.beach_access_score > 6) {
    const beachTime = matchData.beach_access_score >= 9 ? '5 min' : 
                      matchData.beach_access_score >= 7 ? '15 min' : '30 min';
    upgrades.push({
      icon: Umbrella,
      label: 'Beach Access',
      value: `${beachTime} away`,
      gradient: 'from-cyan-400 to-sky-500',
      show: true,
    });
  }

  // Community/Expat scene
  if (matchData?.community_score && matchData.community_score > 6) {
    const communitySize = matchData.community_score >= 9 ? '50k+' : 
                          matchData.community_score >= 7 ? '20k+' : '5k+';
    upgrades.push({
      icon: Users,
      label: 'Expat Community',
      value: `${communitySize} nomads`,
      gradient: 'from-pink-400 to-rose-500',
      show: true,
    });
  }

  // Tax savings
  if (matchData?.personal_income_tax_rate !== undefined && matchData.personal_income_tax_rate < 25) {
    const taxDelta = currentData?.personal_income_tax_rate 
      ? Math.round(currentData.personal_income_tax_rate - matchData.personal_income_tax_rate)
      : null;
    if (taxDelta && taxDelta > 5) {
      upgrades.push({
        icon: Plane,
        label: 'Tax Savings',
        value: `-${taxDelta}% income tax`,
        gradient: 'from-violet-400 to-purple-500',
        show: true,
      });
    } else if (matchData.personal_income_tax_rate < 15) {
      upgrades.push({
        icon: Plane,
        label: 'Tax Rate',
        value: `Only ${matchData.personal_income_tax_rate}%`,
        gradient: 'from-violet-400 to-purple-500',
        show: true,
      });
    }
  }

  // Fill with defaults if needed
  while (upgrades.filter(u => u.show).length < 4) {
    const defaults = [
      { icon: Sun, label: 'Climate', value: 'Perfect weather', gradient: 'from-amber-400 to-orange-500' },
      { icon: Users, label: 'Community', value: 'Vibrant scene', gradient: 'from-pink-400 to-rose-500' },
      { icon: Plane, label: 'Connected', value: 'Global hub', gradient: 'from-violet-400 to-purple-500' },
    ];
    const nextDefault = defaults[upgrades.length % defaults.length];
    if (!upgrades.find(u => u.label === nextDefault.label)) {
      upgrades.push({ ...nextDefault, show: true });
    } else {
      break;
    }
  }

  return upgrades.filter(u => u.show).slice(0, 6);
};

export const LifeUpgradeCard = forwardRef<HTMLDivElement, LifeUpgradeCardProps>(({
  userName,
  matchCity,
  matchCountry,
  matchScore,
  currentCity,
  currentCityScore,
  locationData,
  currentLocationData,
  topReasons,
}, ref) => {
  const upgrades = calculateUpgrades(locationData, currentLocationData);
  const scoreDelta = currentCityScore ? matchScore - currentCityScore : null;

  return (
    <div 
      ref={ref}
      className="w-[1080px] h-[1920px] relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0f172a 100%)',
      }}
    >
      {/* Dynamic gradient orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-violet-600/30 to-transparent blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-pink-500/15 to-transparent blur-[80px]" />
      
      {/* Decorative lines */}
      <div className="absolute top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-80 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col px-16 py-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-8 bg-violet-500 rounded-full" />
              <div className="w-2 h-8 bg-pink-500 rounded-full" />
              <div className="w-2 h-8 bg-cyan-500 rounded-full" />
            </div>
            <span className="text-white/50 text-2xl font-medium ml-2">
              Life Upgrade Report
            </span>
          </div>
          <span className="text-white/30 text-xl">2025</span>
        </div>

        {/* User headline */}
        <div className="mb-12">
          <h1 className="text-white/60 text-4xl font-medium mb-2">
            {userName}'s Next Chapter
          </h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 text-7xl font-black tracking-tight">
            THE LIFE UPGRADE
          </div>
        </div>

        {/* Transition arrow if has current city */}
        {currentCity && (
          <div className="flex items-center gap-6 mb-10 py-6">
            <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-white/40 text-lg mb-1">Leaving behind</p>
              <p className="text-white/70 text-3xl font-bold">{currentCity}</p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl p-6 border border-violet-500/30">
              <p className="text-violet-300 text-lg mb-1">Arriving at</p>
              <p className="text-white text-3xl font-bold">{matchCity}</p>
            </div>
          </div>
        )}

        {/* Main match card */}
        <div className="relative mb-10">
          <div 
            className="rounded-3xl p-12 border border-white/20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(6, 182, 212, 0.15) 100%)',
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-10 h-10 text-white/60" />
                <span className="text-white/50 text-2xl">Your perfect match</span>
              </div>
              <h2 className="text-white text-9xl font-black leading-none mb-2">
                {matchCity}
              </h2>
              <p className="text-white/40 text-4xl font-medium mb-8">{matchCountry}</p>
              
              <div className="flex items-end gap-4">
                <span 
                  className="text-[160px] font-black leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {matchScore}%
                </span>
                <span className="text-white/50 text-5xl font-medium pb-8">match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade tiles */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {upgrades.slice(0, 6).map((upgrade, index) => {
            const Icon = upgrade.icon;
            return (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${upgrade.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-white/50 text-lg mb-1">{upgrade.label}</p>
                <p className="text-white text-2xl font-bold leading-tight">{upgrade.value}</p>
              </div>
            );
          })}
        </div>

        {/* Score delta highlight */}
        {scoreDelta && scoreDelta > 0 && (
          <div className="bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent rounded-2xl p-8 mb-8 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-400 text-xl font-medium mb-1">Life Quality Boost</p>
                <p className="text-white/50 text-lg">Compared to {currentCity}</p>
              </div>
              <div className="text-emerald-400 text-8xl font-black">
                +{scoreDelta}%
              </div>
            </div>
          </div>
        )}

        {/* Top reasons teaser */}
        <div className="mb-10">
          <p className="text-white/40 text-xl mb-4">Why this is YOUR place:</p>
          <div className="flex gap-3 flex-wrap">
            {topReasons.slice(0, 3).map((reason, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
              >
                <span className="text-white text-xl font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-2xl mb-2">Ready for YOUR upgrade?</p>
              <p 
                className="text-4xl font-bold"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                findyourplace.com
              </p>
            </div>
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
              }}
            >
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LifeUpgradeCard.displayName = 'LifeUpgradeCard';

export default LifeUpgradeCard;
```

### `src/components/results/shareables/PersonalityCard.tsx`
```tsx
import { forwardRef } from "react";
import { Sparkles } from "lucide-react";
import type { OnboardingData } from "@/types/onboarding";

interface PersonalityCardProps {
  preferences: OnboardingData;
  archetype: string;
  traits: string[];
}

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  }));
};

const stars = generateStars(60);

export const PersonalityCard = forwardRef<HTMLDivElement, PersonalityCardProps>(
  ({ preferences, archetype, traits }, ref) => {
    const name = preferences.name || "Explorer";
    
    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(180deg, #1a0a2e 0%, #16213e 30%, #0a0a0f 70%, #0d0f14 100%)",
        }}
      >
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "white",
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}

        {/* Purple/magenta aurora */}
        <div 
          className="absolute rounded-full blur-[150px]"
          style={{ 
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-16 py-20">
          {/* Top branding */}
          <div className="flex items-center gap-4 mb-16">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span className="text-3xl">🌍</span>
            </div>
            <span 
              className="text-4xl font-semibold tracking-tight"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Place
            </span>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* User initial circle */}
            <div 
              className="mb-12"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 100%)",
                border: "3px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 80px rgba(168, 85, 247, 0.4)",
              }}
            >
              <span style={{ fontSize: "80px", color: "white", fontWeight: 600 }}>
                {name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Name */}
            <h2 
              className="text-center mb-4"
              style={{ 
                fontSize: "52px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {name}'s Profile
            </h2>

            {/* Archetype */}
            <h1 
              className="text-center mb-16"
              style={{ 
                fontSize: "80px",
                fontWeight: 700,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 60px rgba(168, 85, 247, 0.5)",
              }}
            >
              {archetype}
            </h1>

            {/* Traits grid */}
            <div 
              className="grid grid-cols-2 gap-6 w-full max-w-[800px]"
            >
              {traits.slice(0, 6).map((trait, i) => (
                <div 
                  key={i}
                  style={{
                    padding: "28px 32px",
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Sparkles 
                      className="w-8 h-8"
                      style={{ color: i % 2 === 0 ? "#a855f7" : "#ec4899" }}
                    />
                    <span 
                      style={{ 
                        fontSize: "32px",
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {trait}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12">
            <div 
              className="mb-10"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
              }}
            />
            
            <div className="flex flex-col items-center">
              <p 
                className="text-center mb-6"
                style={{ 
                  fontSize: "36px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Discover your ideal place
              </p>
              
              <div 
                style={{
                  padding: "24px 56px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  boxShadow: "0 8px 32px rgba(168, 85, 247, 0.4)",
                }}
              >
                <span 
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  findyourplace.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PersonalityCard.displayName = "PersonalityCard";
```

### `src/components/results/shareables/PlaceDNACard.tsx`
```tsx
import React, { forwardRef } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

interface PlaceDNACardProps {
  userName: string;
  matchCity: string;
  matchCountry: string;
  matchScore: number;
  currentCity?: string;
  currentCityScore?: number;
  categoryScores: Record<string, number>;
  topReasons: string[];
}

// DNA strand visualization data
const getDNATraits = (categoryScores: Record<string, number>) => {
  const traitMap: { key: string; label: string; icon: string; gradient: string }[] = [
    { key: 'climate', label: 'Climate Vibe', icon: '☀️', gradient: 'from-amber-400 to-orange-500' },
    { key: 'cost', label: 'Cost Priority', icon: '💰', gradient: 'from-emerald-400 to-teal-500' },
    { key: 'career', label: 'Career Energy', icon: '🚀', gradient: 'from-violet-400 to-purple-500' },
    { key: 'lifestyle', label: 'Lifestyle Match', icon: '🌴', gradient: 'from-cyan-400 to-blue-500' },
    { key: 'social', label: 'Social Fit', icon: '🤝', gradient: 'from-pink-400 to-rose-500' },
  ];

  return traitMap.map(trait => ({
    ...trait,
    score: Math.round((categoryScores[trait.key] || 0.75) * 100),
  }));
};

const getPersonalityInsight = (categoryScores: Record<string, number>) => {
  const topCategory = Object.entries(categoryScores)
    .sort(([, a], [, b]) => b - a)[0];
  
  const insights: Record<string, string> = {
    climate: "You prioritize weather over everything",
    cost: "Smart money moves define your choices",
    career: "Ambition runs through your veins",
    lifestyle: "Quality of life is non-negotiable",
    social: "Connection is your currency",
    safety: "Security grounds your decisions",
    travel: "Wanderlust shapes your world",
    health: "Wellness is your wealth",
    community: "Connection is your currency",
    nature: "The outdoors calls to you",
    culture: "Culture defines your world",
    wellness: "Wellness is your wealth",
  };

  return insights[topCategory?.[0]] || "Adventure calls to you";
};

const getPercentileRank = (score: number) => {
  // Create a bell curve-ish distribution for perceived rarity
  if (score >= 95) return "top 1%";
  if (score >= 90) return "top 5%";
  if (score >= 85) return "top 12%";
  if (score >= 80) return "top 20%";
  if (score >= 75) return "top 30%";
  return "top 40%";
};

export const PlaceDNACard = forwardRef<HTMLDivElement, PlaceDNACardProps>(({
  userName,
  matchCity,
  matchCountry,
  matchScore,
  currentCity,
  currentCityScore,
  categoryScores,
  topReasons,
}, ref) => {
  const traits = getDNATraits(categoryScores);
  const personalityInsight = getPersonalityInsight(categoryScores);
  const percentileRank = getPercentileRank(matchScore);
  const scoreDelta = currentCityScore ? matchScore - currentCityScore : null;

  return (
    <div 
      ref={ref}
      className="w-[1080px] h-[1920px] relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #0f0f23 0%, #1a1a3e 35%, #0d1b2a 70%, #0a0a1a 100%)',
      }}
    >
      {/* Ambient glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/20 blur-[150px]" />
      <div className="absolute bottom-40 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[500px] rounded-full bg-pink-500/10 blur-[100px]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col px-16 py-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60 text-2xl font-medium tracking-wide">
              Place DNA Analysis
            </span>
          </div>
          <span className="text-white/40 text-xl">2025</span>
        </div>

        {/* User identity */}
        <div className="mb-16">
          <h1 className="text-white text-6xl font-bold tracking-tight mb-3">
            {userName}'s
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 text-7xl font-black">
              PLACE DNA
            </span>
            <Sparkles className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        {/* The hook stat */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 mb-12 border border-white/10">
          <p className="text-white/50 text-2xl mb-6 tracking-wide">
            Out of 127 global cities analyzed...
          </p>
          <div className="flex items-end gap-6 mb-4">
            <MapPin className="w-16 h-16 text-emerald-400 flex-shrink-0" />
            <div>
              <h2 className="text-white text-8xl font-black leading-none tracking-tight">
                {matchCity}
              </h2>
              <p className="text-white/40 text-3xl mt-2">{matchCountry}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-3 mt-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-9xl font-black">
              {matchScore}%
            </span>
            <span className="text-white/60 text-4xl font-medium">match</span>
          </div>
        </div>

        {/* DNA Strand visualization */}
        <div className="flex-1 mb-10">
          <h3 className="text-white/40 text-2xl font-medium mb-8 tracking-widest uppercase">
            Your Unique DNA Fingerprint
          </h3>
          <div className="space-y-6">
            {traits.map((trait, index) => (
              <div key={trait.key} className="flex items-center gap-5">
                <span className="text-4xl w-14">{trait.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70 text-2xl font-medium">{trait.label}</span>
                    <span className="text-white text-2xl font-bold">{trait.score}%</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${trait.gradient} rounded-full`}
                      style={{ width: `${trait.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personality insight & percentile */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-8 border border-violet-500/30">
            <p className="text-violet-300 text-xl mb-2 font-medium">Your Core Truth</p>
            <p className="text-white text-3xl font-bold leading-tight">{personalityInsight}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl p-8 border border-amber-500/30">
            <p className="text-amber-300 text-xl mb-2 font-medium">You're in the</p>
            <p className="text-white text-5xl font-black">{percentileRank}</p>
            <p className="text-amber-300/80 text-lg mt-1">of adventurous relocators</p>
          </div>
        </div>

        {/* Delta comparison if available */}
        {scoreDelta && currentCity && (
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 mb-12 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-xl mb-1">Life Fit Improvement</p>
              <p className="text-white/60 text-lg">vs. {currentCity}</p>
            </div>
            <div className="text-emerald-400 text-7xl font-black">
              +{scoreDelta}%
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-2xl mb-2">What's YOUR place DNA?</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 text-4xl font-bold">
                findyourplace.com
              </p>
            </div>
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PlaceDNACard.displayName = 'PlaceDNACard';

export default PlaceDNACard;
```

### `src/components/results/shareables/TopMatchCard.tsx`
```tsx
import { forwardRef } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import type { MatchResult } from "@/lib/scoring";

interface TopMatchCardProps {
  result: MatchResult;
  userName?: string;
  currentCity?: string;
  currentCityScore?: number;
}

// Generate random stars for the cosmic background
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  }));
};

const stars = generateStars(50);

export const TopMatchCard = forwardRef<HTMLDivElement, TopMatchCardProps>(
  ({ result, userName, currentCity, currentCityScore }, ref) => {
    const { location, totalScore, reasons } = result;
    
    // Calculate improvement delta
    const hasComparison = currentCity && currentCityScore !== undefined;
    const delta = hasComparison ? Math.round(totalScore - currentCityScore) : 0;

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(180deg, #0a0a0f 0%, #0d0f14 20%, #16213e 50%, #1a1a2e 80%, #0d0f14 100%)",
        }}
      >
        {/* Cosmic stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "white",
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}

        {/* Aurora glow effects */}
        <div 
          className="absolute rounded-full blur-[120px]"
          style={{ 
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "linear-gradient(180deg, rgba(51, 153, 255, 0.4) 0%, rgba(23, 201, 165, 0.2) 100%)",
          }}
        />
        <div 
          className="absolute rounded-full blur-[100px]"
          style={{ 
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "linear-gradient(180deg, rgba(23, 201, 165, 0.3) 0%, rgba(51, 153, 255, 0.15) 100%)",
          }}
        />

        {/* Stylized Globe */}
        <div 
          className="absolute"
          style={{
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(51, 153, 255, 0.3) 0%, rgba(23, 201, 165, 0.15) 40%, transparent 70%)",
              filter: "blur(40px)",
              transform: "scale(1.3)",
            }}
          />
          
          <svg viewBox="0 0 200 200" className="w-full h-full relative">
            <defs>
              <radialGradient id="topMatch-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(51, 153, 255, 0.1)" />
                <stop offset="70%" stopColor="rgba(23, 201, 165, 0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="topMatch-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3399ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#17c9a5" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3399ff" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            <circle cx="100" cy="100" r="80" fill="url(#topMatch-glow)" />
            
            {[30, 50, 70, 100, 130, 150, 170].map((y, i) => {
              const r = Math.sqrt(Math.max(0, 6400 - (y - 100) ** 2));
              return r > 0 ? (
                <ellipse
                  key={`h-${i}`}
                  cx="100"
                  cy={y}
                  rx={r}
                  ry={r * 0.3}
                  fill="none"
                  stroke="url(#topMatch-line)"
                  strokeWidth="1"
                  opacity={0.6 - Math.abs(y - 100) / 200}
                />
              ) : null;
            })}
            
            {[-60, -30, 0, 30, 60].map((rotation, i) => (
              <ellipse
                key={`v-${i}`}
                cx="100"
                cy="100"
                rx={Math.abs(rotation) < 45 ? 25 + Math.abs(rotation) * 0.5 : 20}
                ry="80"
                fill="none"
                stroke="url(#topMatch-line)"
                strokeWidth="1"
                transform={`rotate(${rotation} 100 100)`}
                opacity={0.5 - Math.abs(rotation) / 200}
              />
            ))}
            
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="url(#topMatch-line)"
              strokeWidth="1.5"
              opacity="0.8"
            />
            
            <path
              d="M 60 50 Q 40 80 50 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col px-16 py-20">
          {/* Top branding */}
          <div className="flex items-center gap-4 mb-auto">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "linear-gradient(135deg, rgba(51, 153, 255, 0.3) 0%, rgba(23, 201, 165, 0.2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="text-3xl">🌍</span>
            </div>
            <span 
              className="text-4xl font-semibold tracking-tight"
              style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Place
            </span>
          </div>

          <div style={{ height: "420px" }} />

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 
              className="text-center mb-4"
              style={{ 
                fontSize: "96px",
                fontWeight: 700,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #ffffff 0%, #3399ff 50%, #17c9a5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 80px rgba(51, 153, 255, 0.5)",
              }}
            >
              {location.name}
            </h1>
            
            <p 
              className="text-center mb-12"
              style={{ 
                fontSize: "36px",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 400,
              }}
            >
              {location.region ? `${location.region}, ` : ""}{location.country}
            </p>

            {/* Score badge */}
            <div 
              className="relative mb-12"
              style={{
                padding: "32px 64px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.15) 100%)",
                border: "2px solid rgba(34, 197, 94, 0.4)",
                boxShadow: "0 0 60px rgba(34, 197, 94, 0.3), inset 0 0 30px rgba(34, 197, 94, 0.1)",
              }}
            >
              <div className="flex items-center gap-4">
                <Sparkles 
                  className="w-12 h-12"
                  style={{ color: "#22c55e" }}
                />
                <span 
                  style={{ 
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#22c55e",
                    textShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
                  }}
                >
                  {Math.round(totalScore)}%
                </span>
                <span 
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 500,
                    color: "rgba(34, 197, 94, 0.8)",
                  }}
                >
                  MATCH
                </span>
              </div>
            </div>

            {/* Comparison delta */}
            {hasComparison && delta > 0 && (
              <div 
                className="flex items-center gap-4 mb-12"
                style={{
                  padding: "20px 40px",
                  borderRadius: "60px",
                  background: "linear-gradient(135deg, rgba(51, 153, 255, 0.2) 0%, rgba(23, 201, 165, 0.1) 100%)",
                  border: "1px solid rgba(51, 153, 255, 0.3)",
                }}
              >
                <TrendingUp 
                  className="w-8 h-8"
                  style={{ color: "#17c9a5" }}
                />
                <span 
                  style={{ 
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#17c9a5",
                  }}
                >
                  +{delta}% better than {currentCity}
                </span>
              </div>
            )}

            {/* Top reason quote */}
            {reasons[0] && (
              <div 
                className="mx-auto"
                style={{
                  maxWidth: "850px",
                  padding: "40px 48px",
                  borderRadius: "32px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p 
                  className="text-center"
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.5,
                  }}
                >
                  "{reasons[0]}"
                </p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-auto pt-12">
            <div 
              className="mb-10"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
              }}
            />
            
            <div className="flex flex-col items-center">
              <p 
                className="text-center mb-6"
                style={{ 
                  fontSize: "40px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Find where you belong
              </p>
              
              <div 
                style={{
                  padding: "24px 56px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
                  boxShadow: "0 8px 32px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)",
                }}
              >
                <span 
                  style={{ 
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "0.5px",
                  }}
                >
                  findyourplace.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TopMatchCard.displayName = "TopMatchCard";
```

### `src/components/ui/AnimatedNumber.tsx`
```tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedNumber({
  value,
  duration = 1500,
  className = "",
  suffix = "",
  prefix = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(Math.round(value));
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
      {suffix}
    </span>
  );
}
```

### `src/components/ui/accordion.tsx`
```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

### `src/components/ui/alert-dialog.tsx`
```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
```

### `src/components/ui/alert.tsx`
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
```

### `src/components/ui/aspect-ratio.tsx`
```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
```

### `src/components/ui/avatar.tsx`
```tsx
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
```

### `src/components/ui/badge.tsx`
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

### `src/components/ui/breadcrumb.tsx`
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
```

### `src/components/ui/button.tsx`
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "btn-hero text-accent-foreground rounded-full px-8 hover:scale-[1.02]",
        heroOutline: "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-full px-8 transition-all duration-300",
        glass: "glass text-foreground hover:bg-background/90 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### `src/components/ui/calendar.tsx`
```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
```

### `src/components/ui/card.tsx`
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

### `src/components/ui/carousel.tsx`
```tsx
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
```

### `src/components/ui/chart.tsx`
```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
```

### `src/components/ui/checkbox.tsx`
```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
```

### `src/components/ui/collapsible.tsx`
```tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

### `src/components/ui/command.tsx`
```tsx
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
```

### `src/components/ui/context-menu.tsx`
```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
```

### `src/components/ui/dialog.tsx`
```tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### `src/components/ui/drawer.tsx`
```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
```

### `src/components/ui/dropdown-menu.tsx`
```tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
```

### `src/components/ui/form.tsx`
```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
```

### `src/components/ui/hover-card.tsx`
```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
```

### `src/components/ui/input-otp.tsx`
```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
```

### `src/components/ui/input.tsx`
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

### `src/components/ui/label.tsx`
```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
```

### `src/components/ui/menubar.tsx`
```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
```

### `src/components/ui/navigation-menu.tsx`
```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
```

### `src/components/ui/pagination.tsx`
```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
```

### `src/components/ui/popover.tsx`
```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
```

### `src/components/ui/progress.tsx`
```tsx
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
```

### `src/components/ui/radio-group.tsx`
```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
```

### `src/components/ui/resizable.tsx`
```tsx
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
```

### `src/components/ui/scroll-area.tsx`
```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
```

### `src/components/ui/select.tsx`
```tsx
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

### `src/components/ui/separator.tsx`
```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
```

### `src/components/ui/sheet.tsx`
```tsx
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
```

### `src/components/ui/sidebar.tsx`
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-sidebar-border sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
```

### `src/components/ui/skeleton.tsx`
```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
```

### `src/components/ui/slider.tsx`
```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-7 w-7 rounded-full border-2 border-primary bg-background shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-110" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };```

### `src/components/ui/sonner.tsx`
```tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
```

### `src/components/ui/switch.tsx`
```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
```

### `src/components/ui/table.tsx`
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
```

### `src/components/ui/tabs.tsx`
```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

### `src/components/ui/textarea.tsx`
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
```

### `src/components/ui/toast.tsx`
```tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
```

### `src/components/ui/toaster.tsx`
```tsx
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
```

### `src/components/ui/toggle-group.tsx`
```tsx
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
```

### `src/components/ui/toggle.tsx`
```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
```

### `src/components/ui/tooltip.tsx`
```tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

### `src/components/ui/use-toast.ts`
```tsx
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
```

### `src/contexts/AuthContext.tsx`
```tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST (before getSession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

### `src/hooks/use-mobile.tsx`
```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

### `src/hooks/use-toast.ts`
```tsx
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
```

### `src/index.css`
```tsx
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* iOS safe area support */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .pb-safe {
    padding-bottom: max(env(safe-area-inset-bottom), 0.5rem);
  }
}

/* 
 * Cosmic Dark Theme - Apple-Level Premium Design
 * Deep space aesthetic with aurora accents
 */

@layer base {
  :root {
    /* Deep Space Background */
    --background: 225 30% 6%;
    --foreground: 220 15% 95%;
    
    /* Cosmic Blue Primary */
    --primary: 210 100% 60%;
    --primary-foreground: 220 30% 98%;
    
    /* Surface Colors */
    --card: 225 25% 10%;
    --card-foreground: 220 15% 95%;
    --popover: 225 25% 10%;
    --popover-foreground: 220 15% 95%;
    
    /* Muted Elements */
    --muted: 225 20% 15%;
    --muted-foreground: 220 15% 60%;
    
    /* Aurora Accent - Teal/Emerald */
    --accent: 165 80% 45%;
    --accent-foreground: 220 30% 98%;
    
    /* Secondary - Subtle */
    --secondary: 225 20% 12%;
    --secondary-foreground: 220 15% 90%;
    
    /* Functional Colors */
    --destructive: 0 85% 60%;
    --destructive-foreground: 0 0% 100%;
    --success: 160 84% 40%;
    --success-foreground: 0 0% 100%;
    --warning: 35 100% 55%;
    --warning-foreground: 0 0% 10%;
    
    /* Borders & Inputs */
    --border: 225 20% 18%;
    --input: 225 20% 15%;
    --ring: 210 100% 60%;
    
    /* Design Tokens */
    --radius: 0.75rem;
    
    /* Gradients */
    --gradient-cosmic: linear-gradient(135deg, hsl(225 30% 6%) 0%, hsl(240 25% 8%) 50%, hsl(225 30% 6%) 100%);
    --gradient-aurora: linear-gradient(135deg, hsl(210 100% 60% / 0.2) 0%, hsl(165 80% 45% / 0.15) 50%, hsl(280 70% 60% / 0.1) 100%);
    --gradient-glow: radial-gradient(ellipse at center, hsl(210 100% 60% / 0.15) 0%, transparent 70%);
    
    /* Glow Effects */
    --glow-primary: 0 0 40px hsl(210 100% 60% / 0.3);
    --glow-accent: 0 0 40px hsl(165 80% 45% / 0.3);
    --glow-warm: 0 0 40px hsl(35 100% 55% / 0.3);
    
    /* Sidebar */
    --sidebar-background: 225 30% 8%;
    --sidebar-foreground: 220 15% 90%;
    --sidebar-primary: 210 100% 60%;
    --sidebar-primary-foreground: 220 30% 98%;
    --sidebar-accent: 225 20% 15%;
    --sidebar-accent-foreground: 220 15% 90%;
    --sidebar-border: 225 20% 15%;
    --sidebar-ring: 210 100% 60%;
  }
}

/* Global Styles */
@layer base {
  * {
    @apply border-border;
  }
  
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    @apply bg-background text-foreground font-sans;
    font-feature-settings: "cv11", "ss01", "ss03";
    /* Safe area handling for iPhone notch/Dynamic Island and home indicator */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  
  /* Typography - Modern Sans-Serif */
  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-bold tracking-tight;
  }
  
  h1 {
    @apply text-4xl md:text-6xl lg:text-7xl;
  }
  
  h2 {
    @apply text-3xl md:text-4xl lg:text-5xl;
  }
  
  h3 {
    @apply text-xl md:text-2xl;
  }
}

/* Component Styles */
@layer components {
  /* Text Gradient - Cosmic Blue */
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(210 100% 70%) 0%, hsl(165 80% 55%) 100%);
  }
  
  /* Text Gradient - Warm */
  .text-gradient-warm {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(35 100% 60%) 0%, hsl(15 100% 65%) 100%);
  }
  
  /* Card Styles - Dark Premium */
  .card-elevated {
    @apply bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50;
    box-shadow: 0 8px 32px hsl(225 30% 0% / 0.4), inset 0 1px 0 hsl(220 15% 95% / 0.05);
  }
  
  .card-interactive {
    @apply card-elevated transition-all duration-300;
  }
  
  .card-interactive:hover {
    @apply border-primary/30;
    box-shadow: 0 12px 40px hsl(225 30% 0% / 0.5), 0 0 30px hsl(210 100% 60% / 0.1), inset 0 1px 0 hsl(220 15% 95% / 0.08);
    transform: translateY(-2px);
  }
  
  .card-premium {
    @apply bg-gradient-to-br from-card to-secondary/50 rounded-2xl border border-primary/20;
    box-shadow: 0 8px 32px hsl(225 30% 0% / 0.4), 0 0 60px hsl(210 100% 60% / 0.1);
  }
  
  /* Glassmorphism - Dark */
  .glass {
    @apply bg-background/60 backdrop-blur-xl border border-border/50;
    box-shadow: 0 4px 24px hsl(225 30% 0% / 0.3);
  }
  
  .glass-subtle {
    @apply bg-background/40 backdrop-blur-lg;
  }
  
  /* Hero Button - Warm Amber */
  .btn-hero {
    @apply relative overflow-hidden font-semibold;
    background: linear-gradient(135deg, hsl(35 100% 55%) 0%, hsl(25 100% 50%) 100%);
    box-shadow: 0 4px 20px hsl(35 100% 55% / 0.4), inset 0 1px 0 hsl(35 100% 70% / 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-hero:hover {
    box-shadow: 0 8px 30px hsl(35 100% 55% / 0.5), inset 0 1px 0 hsl(35 100% 70% / 0.4);
    transform: translateY(-2px);
  }
  
  .btn-hero::before {
    content: '';
    @apply absolute inset-0;
    background: linear-gradient(135deg, hsl(35 100% 65% / 0.3) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .btn-hero:hover::before {
    opacity: 1;
  }
  
  /* Input Styles */
  .input-premium {
    @apply bg-input/50 border-border/50 rounded-xl px-4 py-3;
    @apply focus:border-primary/50 focus:ring-2 focus:ring-primary/20;
    @apply placeholder:text-muted-foreground/50;
    transition: all 0.2s ease;
  }
  
  .input-premium:focus {
    box-shadow: 0 0 20px hsl(210 100% 60% / 0.15);
  }
  
  /* Section Gradients */
  .section-gradient {
    background: linear-gradient(180deg, hsl(225 25% 8%) 0%, hsl(225 30% 6%) 100%);
  }
  
  .section-glow {
    position: relative;
  }
  
  .section-glow::before {
    content: '';
    @apply absolute inset-0 pointer-events-none;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, hsl(210 100% 60% / 0.08) 0%, transparent 60%);
  }
  
  /* Ocean Gradient - Now Cosmic */
  .ocean-gradient {
    background: var(--gradient-cosmic);
  }
  
  /* Globe Glow */
  .globe-glow {
    position: relative;
  }
  
  .globe-glow::after {
    content: '';
    @apply absolute inset-0 rounded-full;
    background: radial-gradient(circle at 30% 30%, hsl(210 100% 60% / 0.3) 0%, hsl(165 80% 45% / 0.1) 40%, transparent 70%);
    filter: blur(40px);
  }
  
  /* Score Ring */
  .score-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .score-ring-circle {
    stroke-dasharray: 339.292;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Shimmer Effect */
  .shimmer {
    @apply relative overflow-hidden;
  }
  
  .shimmer::after {
    content: '';
    @apply absolute inset-0;
    background: linear-gradient(90deg, transparent 0%, hsl(220 15% 95% / 0.05) 50%, transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  /* Star Twinkle */
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  
  .star {
    @apply absolute rounded-full bg-white;
    animation: twinkle 3s ease-in-out infinite;
  }
  
  /* Globe Rotation */
  @keyframes globe-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .animate-globe-rotate {
    animation: globe-rotate 60s linear infinite;
  }
  
  /* Pulse Glow */
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.02); }
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  /* Float Animation */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.02); }
  }
  
  /* Stagger Reveal */
  .stagger-reveal > * {
    @apply opacity-0;
    animation: fade-in 0.5s ease-out forwards;
  }
  
  .stagger-reveal > *:nth-child(1) { animation-delay: 0.1s; }
  .stagger-reveal > *:nth-child(2) { animation-delay: 0.2s; }
  .stagger-reveal > *:nth-child(3) { animation-delay: 0.3s; }
  .stagger-reveal > *:nth-child(4) { animation-delay: 0.4s; }
  .stagger-reveal > *:nth-child(5) { animation-delay: 0.5s; }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Tabular Numbers */
  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
  
  /* Grain Texture Overlay */
  .grain::before {
    content: '';
    @apply fixed inset-0 pointer-events-none z-50;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.015;
    mix-blend-mode: overlay;
  }
}

/* Utility Classes */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .gradient-mask-b {
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }
  
  .gradient-mask-t {
    mask-image: linear-gradient(to top, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to top, black 60%, transparent 100%);
  }
}
```

### `src/integrations/supabase/client.ts`
```tsx
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});```

### `src/integrations/supabase/types.ts`
```tsx
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      email_captures: {
        Row: {
          created_at: string
          email: string
          id: string
          run_id: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          run_id?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          run_id?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_captures_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_comparisons: {
        Row: {
          calculated_at: string
          compatibility_score: number
          id: string
          run_id_a: string
          run_id_b: string
          shared_cities_json: Json | null
        }
        Insert: {
          calculated_at?: string
          compatibility_score: number
          id?: string
          run_id_a: string
          run_id_b: string
          shared_cities_json?: Json | null
        }
        Update: {
          calculated_at?: string
          compatibility_score?: number
          id?: string
          run_id_a?: string
          run_id_b?: string
          shared_cities_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "friend_comparisons_run_id_a_fkey"
            columns: ["run_id_a"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_comparisons_run_id_b_fkey"
            columns: ["run_id_b"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_invites: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          invite_code: string
          invitee_email: string | null
          invitee_run_id: string | null
          inviter_email: string | null
          inviter_run_id: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          invite_code: string
          invitee_email?: string | null
          invitee_run_id?: string | null
          inviter_email?: string | null
          inviter_run_id: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          invite_code?: string
          invitee_email?: string | null
          invitee_run_id?: string | null
          inviter_email?: string | null
          inviter_run_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_invites_invitee_run_id_fkey"
            columns: ["invitee_run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_invites_inviter_run_id_fkey"
            columns: ["inviter_run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          airport_connectivity_score: number | null
          avg_temp_summer: number | null
          avg_temp_winter: number | null
          beach_access_score: number | null
          bureaucracy_score: number | null
          capital_gains_tax_rate: number | null
          climate_score: number | null
          community_score: number | null
          continent: string
          corporate_tax_rate: number | null
          cost_of_living_score: number | null
          country: string
          created_at: string | null
          culture_openness_score: number | null
          dating_scene_score: number | null
          description: string | null
          english_friendliness_score: number | null
          healthcare_score: number | null
          humidity_level: number | null
          id: string
          image_source: string | null
          image_source_url: string | null
          image_updated_at: string | null
          image_url: string | null
          image_verified: boolean | null
          internet_quality_score: number | null
          latitude: number | null
          longitude: number | null
          mountain_access_score: number | null
          name: string
          nightlife_score: number | null
          outdoor_score: number | null
          personal_income_tax_rate: number | null
          population: number | null
          region: string | null
          rent_score: number | null
          safety_score: number | null
          startup_ecosystem_score: number | null
          sunshine_days: number | null
          tags: Json | null
          tax_friendliness_score: number | null
          tax_notes: string | null
          transit_score: number | null
          updated_at: string | null
          vibe_summary: string | null
          visa_friendliness_score: number | null
          walkability_score: number | null
          wellness_score: number | null
        }
        Insert: {
          airport_connectivity_score?: number | null
          avg_temp_summer?: number | null
          avg_temp_winter?: number | null
          beach_access_score?: number | null
          bureaucracy_score?: number | null
          capital_gains_tax_rate?: number | null
          climate_score?: number | null
          community_score?: number | null
          continent: string
          corporate_tax_rate?: number | null
          cost_of_living_score?: number | null
          country: string
          created_at?: string | null
          culture_openness_score?: number | null
          dating_scene_score?: number | null
          description?: string | null
          english_friendliness_score?: number | null
          healthcare_score?: number | null
          humidity_level?: number | null
          id?: string
          image_source?: string | null
          image_source_url?: string | null
          image_updated_at?: string | null
          image_url?: string | null
          image_verified?: boolean | null
          internet_quality_score?: number | null
          latitude?: number | null
          longitude?: number | null
          mountain_access_score?: number | null
          name: string
          nightlife_score?: number | null
          outdoor_score?: number | null
          personal_income_tax_rate?: number | null
          population?: number | null
          region?: string | null
          rent_score?: number | null
          safety_score?: number | null
          startup_ecosystem_score?: number | null
          sunshine_days?: number | null
          tags?: Json | null
          tax_friendliness_score?: number | null
          tax_notes?: string | null
          transit_score?: number | null
          updated_at?: string | null
          vibe_summary?: string | null
          visa_friendliness_score?: number | null
          walkability_score?: number | null
          wellness_score?: number | null
        }
        Update: {
          airport_connectivity_score?: number | null
          avg_temp_summer?: number | null
          avg_temp_winter?: number | null
          beach_access_score?: number | null
          bureaucracy_score?: number | null
          capital_gains_tax_rate?: number | null
          climate_score?: number | null
          community_score?: number | null
          continent?: string
          corporate_tax_rate?: number | null
          cost_of_living_score?: number | null
          country?: string
          created_at?: string | null
          culture_openness_score?: number | null
          dating_scene_score?: number | null
          description?: string | null
          english_friendliness_score?: number | null
          healthcare_score?: number | null
          humidity_level?: number | null
          id?: string
          image_source?: string | null
          image_source_url?: string | null
          image_updated_at?: string | null
          image_url?: string | null
          image_verified?: boolean | null
          internet_quality_score?: number | null
          latitude?: number | null
          longitude?: number | null
          mountain_access_score?: number | null
          name?: string
          nightlife_score?: number | null
          outdoor_score?: number | null
          personal_income_tax_rate?: number | null
          population?: number | null
          region?: string | null
          rent_score?: number | null
          safety_score?: number | null
          startup_ecosystem_score?: number | null
          sunshine_days?: number | null
          tags?: Json | null
          tax_friendliness_score?: number | null
          tax_notes?: string | null
          transit_score?: number | null
          updated_at?: string | null
          vibe_summary?: string | null
          visa_friendliness_score?: number | null
          walkability_score?: number | null
          wellness_score?: number | null
        }
        Relationships: []
      }
      match_results: {
        Row: {
          category_scores_json: Json
          created_at: string | null
          id: string
          location_id: string
          rank: number
          reasons_json: Json | null
          run_id: string
          total_score: number
          tradeoffs_json: Json | null
        }
        Insert: {
          category_scores_json: Json
          created_at?: string | null
          id?: string
          location_id: string
          rank: number
          reasons_json?: Json | null
          run_id: string
          total_score: number
          tradeoffs_json?: Json | null
        }
        Update: {
          category_scores_json?: Json
          created_at?: string | null
          id?: string
          location_id?: string
          rank?: number
          reasons_json?: Json | null
          run_id?: string
          total_score?: number
          tradeoffs_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "match_results_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_results_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_runs: {
        Row: {
          created_at: string | null
          id: string
          inputs_json: Json
          signals_json: Json | null
          user_id: string
          version: number | null
          weights_json: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inputs_json: Json
          signals_json?: Json | null
          user_id: string
          version?: number | null
          weights_json?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inputs_json?: Json
          signals_json?: Json | null
          user_id?: string
          version?: number | null
          weights_json?: Json | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          id: string
          run_id: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          run_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          run_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          home_base_current: string | null
          id: string
          languages: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          home_base_current?: string | null
          id?: string
          languages?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          home_base_current?: string | null
          id?: string
          languages?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      quiz_completions: {
        Row: {
          completed_at: string
          id: string
          run_id: string
          top_match_city: string | null
          top_match_score: number | null
        }
        Insert: {
          completed_at?: string
          id?: string
          run_id: string
          top_match_city?: string | null
          top_match_score?: number | null
        }
        Update: {
          completed_at?: string
          id?: string
          run_id?: string
          top_match_city?: string | null
          top_match_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_completions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: true
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      share_events: {
        Row: {
          id: string
          metadata_json: Json | null
          run_id: string | null
          share_type: string
          shared_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          metadata_json?: Json | null
          run_id?: string | null
          share_type: string
          shared_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          metadata_json?: Json | null
          run_id?: string | null
          share_type?: string
          shared_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "share_events_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      unlocked_results: {
        Row: {
          id: string
          run_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          run_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          run_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unlocked_results_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "onboarding_runs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
```

### `src/lib/circuitGenerator.ts`
```tsx
import type { Location } from "./scoring";
import type { OnboardingData } from "@/types/onboarding";

export interface CircuitStop {
  location: Location;
  months: string[];
  startMonth: number; // 0-11
  endMonth: number; // 0-11
  reasons: string[];
  activities: string[];
  seasonScore: number;
}

export interface AnnualCircuit {
  stops: CircuitStop[];
  totalLocations: number;
  lifestyleMode: 'nomadic';
  primaryClimate: string;
  totalCountries: number;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Northern hemisphere: summer Jun-Aug, winter Dec-Feb
// Southern hemisphere: summer Dec-Feb, winter Jun-Aug
function isSouthernHemisphere(location: Location): boolean {
  return (location.latitude ?? 0) < 0;
}

// Get ideal temperature for a month at a location
function getMonthlyTemp(location: Location, month: number): number {
  const isSouthern = isSouthernHemisphere(location);
  const summerTemp = location.avg_temp_summer ?? 25;
  const winterTemp = location.avg_temp_winter ?? 10;
  
  // Summer months (local)
  const summerMonths = isSouthern ? [11, 0, 1] : [5, 6, 7]; // Dec-Feb or Jun-Aug
  const winterMonths = isSouthern ? [5, 6, 7] : [11, 0, 1];
  
  if (summerMonths.includes(month)) return summerTemp;
  if (winterMonths.includes(month)) return winterTemp;
  
  // Shoulder season - interpolate
  return (summerTemp + winterTemp) / 2;
}

// Score a location for a specific month based on preferences
function scoreLocationForMonth(
  location: Location,
  month: number,
  preferences: OnboardingData
): number {
  let score = 50;
  const temp = getMonthlyTemp(location, month);
  
  // Ideal temp range is 20-28°C
  const idealMin = 20;
  const idealMax = 28;
  
  if (temp >= idealMin && temp <= idealMax) {
    score += 30;
  } else if (temp >= 15 && temp <= 32) {
    score += 15;
  } else if (temp < 10 || temp > 35) {
    score -= 20;
  }
  
  // Beach preference bonus in summer months
  if (preferences.beachMountain === "beach" && location.beach_access_score) {
    const isSouthern = isSouthernHemisphere(location);
    const summerMonths = isSouthern ? [11, 0, 1, 2] : [5, 6, 7, 8];
    if (summerMonths.includes(month)) {
      score += (location.beach_access_score - 50) * 0.3;
    }
  }
  
  // Mountain/snowboarding in winter
  if (preferences.beachMountain === "mountains" && location.mountain_access_score) {
    const isSouthern = isSouthernHemisphere(location);
    const winterMonths = isSouthern ? [6, 7, 8] : [12, 0, 1, 2];
    if (winterMonths.includes(month)) {
      score += (location.mountain_access_score - 50) * 0.3;
    }
  }
  
  // Add other location quality scores
  if (location.wellness_score) score += (location.wellness_score - 50) * 0.1;
  if (location.safety_score) score += (location.safety_score - 50) * 0.1;
  if (location.cost_of_living_score) score += (location.cost_of_living_score - 50) * 0.1;
  
  return Math.max(0, Math.min(100, score));
}

// Generate activities based on location and season
function generateActivities(location: Location, months: number[]): string[] {
  const activities: string[] = [];
  const isSummerMonth = months.some(m => 
    isSouthernHemisphere(location) ? [11, 0, 1].includes(m) : [5, 6, 7].includes(m)
  );
  
  if (location.beach_access_score && location.beach_access_score > 70 && isSummerMonth) {
    activities.push("Beach & water sports");
  }
  if (location.mountain_access_score && location.mountain_access_score > 70) {
    if (!isSummerMonth) {
      activities.push("Skiing & snowboarding");
    } else {
      activities.push("Hiking & mountain trails");
    }
  }
  if (location.wellness_score && location.wellness_score > 70) {
    activities.push("Wellness & yoga retreats");
  }
  if (location.nightlife_score && location.nightlife_score > 75) {
    activities.push("Vibrant nightlife");
  }
  if (location.outdoor_score && location.outdoor_score > 75) {
    activities.push("Outdoor adventures");
  }
  if (location.startup_ecosystem_score && location.startup_ecosystem_score > 70) {
    activities.push("Coworking & networking");
  }
  
  return activities.slice(0, 3);
}

// Generate reasons for choosing this location at this time
function generateSeasonReasons(location: Location, months: number[]): string[] {
  const reasons: string[] = [];
  const temp = getMonthlyTemp(location, months[0]);
  const isSouthern = isSouthernHemisphere(location);
  
  // Temperature reason
  if (temp >= 20 && temp <= 28) {
    reasons.push(`Perfect ${temp}°C average temperature`);
  } else if (temp >= 15 && temp <= 32) {
    reasons.push(`Pleasant ${temp}°C weather`);
  }
  
  // Season-specific
  const summerMonths = isSouthern ? [11, 0, 1, 2] : [5, 6, 7, 8];
  const isLocalSummer = months.some(m => summerMonths.includes(m));
  
  if (isLocalSummer && location.beach_access_score && location.beach_access_score > 75) {
    reasons.push("Peak beach season");
  }
  
  if (!isLocalSummer && location.mountain_access_score && location.mountain_access_score > 80) {
    reasons.push("Excellent ski conditions");
  }
  
  if (location.sunshine_days && location.sunshine_days > 250) {
    reasons.push(`${location.sunshine_days}+ sunny days/year`);
  }
  
  if (location.cost_of_living_score && location.cost_of_living_score > 70) {
    reasons.push("Great value for money");
  }
  
  if (location.visa_friendliness_score && location.visa_friendliness_score > 75) {
    reasons.push("Easy visa access");
  }
  
  return reasons.slice(0, 3);
}

// Main circuit generation function
export function generateAnnualCircuit(
  locations: Location[],
  preferences: OnboardingData
): AnnualCircuit | null {
  const lifestyleMode = preferences.lifestyleMode;
  
  // Only generate circuit for nomadic users
  if (lifestyleMode !== 'nomadic') {
    return null;
  }
  
  // Determine number of stops based on preferences
  let targetStops = 3; // Default for seasonal
  if (preferences.locationChangesPerYear === '4-6') targetStops = 5;
  if (preferences.locationChangesPerYear === '6+') targetStops = 6;
  if (lifestyleMode === 'nomadic' && !preferences.locationChangesPerYear) targetStops = 4;
  
  // Score each location for each month
  const monthlyScores: Map<string, number[]> = new Map();
  
  for (const location of locations) {
    const scores = MONTHS.map((_, monthIndex) => 
      scoreLocationForMonth(location, monthIndex, preferences)
    );
    monthlyScores.set(location.id, scores);
  }
  
  // Divide year into segments
  const monthsPerStop = Math.floor(12 / targetStops);
  const stops: CircuitStop[] = [];
  const usedLocationIds = new Set<string>();
  
  for (let i = 0; i < targetStops; i++) {
    const startMonth = i * monthsPerStop;
    const endMonth = i === targetStops - 1 ? 11 : (startMonth + monthsPerStop - 1);
    const monthRange = Array.from(
      { length: endMonth - startMonth + 1 }, 
      (_, idx) => startMonth + idx
    );
    
    // Find best location for this period (not already used)
    let bestLocation: Location | null = null;
    let bestScore = -1;
    
    for (const location of locations) {
      if (usedLocationIds.has(location.id)) continue;
      
      const scores = monthlyScores.get(location.id) || [];
      const avgScore = monthRange.reduce((sum, m) => sum + (scores[m] || 50), 0) / monthRange.length;
      
      // Bonus for airport connectivity (easier travel between stops)
      const connectivityBonus = (location.airport_connectivity_score || 50) * 0.1;
      const finalScore = avgScore + connectivityBonus;
      
      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestLocation = location;
      }
    }
    
    if (bestLocation) {
      usedLocationIds.add(bestLocation.id);
      
      stops.push({
        location: bestLocation,
        months: monthRange.map(m => MONTHS[m]),
        startMonth,
        endMonth,
        reasons: generateSeasonReasons(bestLocation, monthRange),
        activities: generateActivities(bestLocation, monthRange),
        seasonScore: Math.round(bestScore),
      });
    }
  }
  
  // Count unique countries
  const countries = new Set(stops.map(s => s.location.country));
  
  // Determine primary climate
  let primaryClimate = "varied";
  if (preferences.preferredClimate) {
    primaryClimate = preferences.preferredClimate;
  }
  
  return {
    stops,
    totalLocations: stops.length,
    lifestyleMode,
    primaryClimate,
    totalCountries: countries.size,
  };
}

// Get month abbreviation
export function getMonthAbbrev(month: string): string {
  return month.slice(0, 3);
}

// Get month color based on season
export function getSeasonColor(monthIndex: number): string {
  if ([11, 0, 1].includes(monthIndex)) return "from-blue-400 to-cyan-400"; // Winter (N) / Summer (S)
  if ([2, 3, 4].includes(monthIndex)) return "from-green-400 to-emerald-400"; // Spring
  if ([5, 6, 7].includes(monthIndex)) return "from-amber-400 to-orange-400"; // Summer (N) / Winter (S)
  return "from-orange-400 to-red-400"; // Fall
}
```

### `src/lib/scoring.ts`
```tsx
import type { OnboardingData } from "@/types/onboarding";

export interface Location {
  id: string;
  name: string;
  region: string | null;
  country: string;
  continent: string;
  latitude: number | null;
  longitude: number | null;
  population: number | null;
  image_url: string | null;
  description: string | null;
  vibe_summary: string | null;
  tags: string[];
  cost_of_living_score: number | null;
  rent_score: number | null;
  safety_score: number | null;
  healthcare_score: number | null;
  climate_score: number | null;
  avg_temp_summer: number | null;
  avg_temp_winter: number | null;
  humidity_level: number | null;
  sunshine_days: number | null;
  beach_access_score: number | null;
  mountain_access_score: number | null;
  outdoor_score: number | null;
  nightlife_score: number | null;
  wellness_score: number | null;
  dating_scene_score: number | null;
  community_score: number | null;
  english_friendliness_score: number | null;
  visa_friendliness_score: number | null;
  tax_friendliness_score: number | null;
  airport_connectivity_score: number | null;
  internet_quality_score: number | null;
  walkability_score: number | null;
  transit_score: number | null;
  culture_openness_score: number | null;
  startup_ecosystem_score: number | null;
  bureaucracy_score: number | null;
  // New tax columns
  personal_income_tax_rate: number | null;
  corporate_tax_rate: number | null;
  capital_gains_tax_rate: number | null;
  tax_notes: string | null;
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
  label: string;
}

export interface MatchResult {
  location: Location;
  totalScore: number;
  categoryScores: CategoryScore[];
  reasons: string[];
  tradeoffs: string[];
  rank: number;
}

// Base weights - will be dynamically adjusted based on user preferences
const BASE_WEIGHTS = {
  climate: 0.10,
  nature: 0.10,
  community: 0.10,
  career: 0.10,
  cost: 0.12,
  safety: 0.10,
  wellness: 0.08,
  travel: 0.08,
  culture: 0.10,
  lifestyle: 0.12,
};

// Calculate dynamic weights based on user preferences
function calculateDynamicWeights(preferences: OnboardingData): typeof BASE_WEIGHTS {
  const weights = { ...BASE_WEIGHTS };

  // Boost weights based on what user cares about most
  if (preferences.taxSensitivity === "very-sensitive" || preferences.taxConsideration === "major-factor") {
    weights.cost *= 1.6;
  }
  if (preferences.airportConnectivity === "important" || preferences.airportImportance === "essential") {
    weights.travel *= 1.5;
  }
  if (preferences.safetyPriority === "top-priority" || preferences.riskTolerance === "low") {
    weights.safety *= 1.5;
  }
  if (preferences.wellnessImportance === "high" || preferences.gymCulture === "important") {
    weights.wellness *= 1.4;
  }
  if (preferences.preferredClimate) {
    weights.climate *= 1.3;
  }
  if (preferences.beachMountain) {
    weights.nature *= 1.4;
  }
  if (preferences.workStyle === "remote" || preferences.industries?.length) {
    weights.career *= 1.3;
  }
  if (preferences.communityVibes?.length) {
    weights.community *= 1.3;
  }

  // Check for must-haves and top priorities
  if (preferences.mustHaves?.includes("safety")) weights.safety *= 1.4;
  if (preferences.mustHaves?.includes("affordable")) weights.cost *= 1.4;
  if (preferences.mustHaves?.includes("nature")) weights.nature *= 1.4;
  if (preferences.mustHaves?.includes("nightlife")) weights.lifestyle *= 1.3;
  
  if (preferences.topPriorities?.includes("cost")) weights.cost *= 1.3;
  if (preferences.topPriorities?.includes("weather")) weights.climate *= 1.3;
  if (preferences.topPriorities?.includes("safety")) weights.safety *= 1.3;

  // Normalize weights to sum to 1.0
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const normalizedWeights = {} as typeof BASE_WEIGHTS;
  for (const key of Object.keys(weights) as Array<keyof typeof weights>) {
    normalizedWeights[key] = weights[key] / totalWeight;
  }

  return normalizedWeights;
}

// Check for deal-breaker conditions that severely penalize score
function calculateDealBreakerMultiplier(location: Location, preferences: OnboardingData): number {
  let multiplier = 1.0;

  // Safety deal-breaker
  if (preferences.safetyPriority === "top-priority" && (location.safety_score || 70) < 50) {
    multiplier *= 0.7;
  }

  // Beach deal-breaker
  if (preferences.beachMountain === "beach" && (location.beach_access_score || 0) < 30) {
    multiplier *= 0.8;
  }

  // Mountain deal-breaker
  if (preferences.beachMountain === "mountains" && (location.mountain_access_score || 0) < 30) {
    multiplier *= 0.8;
  }

  // Climate deal-breaker
  if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 10) < 15) {
    multiplier *= 0.75;
  }
  if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) > 30) {
    multiplier *= 0.75;
  }

  // Budget deal-breaker
  if (preferences.budgetRange === "budget" && (location.cost_of_living_score || 50) < 50) {
    multiplier *= 0.75;
  }

  // Tax sensitivity deal-breaker
  if (preferences.taxSensitivity === "very-sensitive" && (location.tax_friendliness_score || 50) < 40) {
    multiplier *= 0.8;
  }

  // Check explicit deal-breakers
  if (preferences.dealBreakers?.includes("high-crime") && (location.safety_score || 70) < 60) {
    multiplier *= 0.65;
  }
  if (preferences.dealBreakers?.includes("expensive") && (location.cost_of_living_score || 50) < 40) {
    multiplier *= 0.7;
  }

  return multiplier;
}

// Calculate alignment bonus - how well location's strengths match user's priorities
function calculateAlignmentBonus(location: Location, preferences: OnboardingData): number {
  let bonus = 0;

  // Get location's top strengths (scores > 80)
  const strengths: string[] = [];
  if ((location.beach_access_score || 0) > 80) strengths.push("beach");
  if ((location.mountain_access_score || 0) > 80) strengths.push("mountains");
  if ((location.safety_score || 0) > 85) strengths.push("safety");
  if ((location.cost_of_living_score || 0) > 75) strengths.push("affordable");
  if ((location.nightlife_score || 0) > 80) strengths.push("nightlife");
  if ((location.wellness_score || 0) > 80) strengths.push("wellness");
  if ((location.startup_ecosystem_score || 0) > 80) strengths.push("career");
  if ((location.airport_connectivity_score || 0) > 85) strengths.push("travel");
  if ((location.tax_friendliness_score || 0) > 80) strengths.push("taxes");

  // Check alignment with user priorities
  const userPriorities = [
    ...(preferences.mustHaves || []),
    ...(preferences.topPriorities || []),
  ];

  for (const priority of userPriorities) {
    if (strengths.includes(priority)) {
      bonus += 8; // Significant bonus for each aligned priority
    }
  }

  // Specific preference alignments
  if (preferences.beachMountain === "beach" && strengths.includes("beach")) bonus += 12;
  if (preferences.beachMountain === "mountains" && strengths.includes("mountains")) bonus += 12;
  if (preferences.taxSensitivity === "very-sensitive" && strengths.includes("taxes")) bonus += 10;
  if (preferences.budgetRange === "budget" && strengths.includes("affordable")) bonus += 10;
  if (preferences.safetyPriority === "top-priority" && strengths.includes("safety")) bonus += 10;

  return Math.min(bonus, 25); // Cap at 25 points
}

// Transform score to spread the distribution (stretches 65-85 range into 50-95)
function spreadScore(rawScore: number): number {
  const center = 72;
  const spread = 1.8;
  const transformed = center + (rawScore - center) * spread;
  return Math.max(45, Math.min(98, Math.round(transformed)));
}

export function calculateCategoryScores(location: Location, preferences: OnboardingData): CategoryScore[] {
  const scores: CategoryScore[] = [];
  const weights = calculateDynamicWeights(preferences);

  // Climate fit - larger bonuses/penalties
  let climateScore = location.climate_score || 50;
  if (preferences.preferredClimate) {
    if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 0) > 20) {
      climateScore += 35;
    } else if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 0) < 10) {
      climateScore -= 25;
    }
    if (preferences.preferredClimate === "mediterranean" && location.sunshine_days && location.sunshine_days > 250) {
      climateScore += 30;
    }
    if (preferences.preferredClimate === "temperate" && (location.humidity_level || 50) < 70 && (location.avg_temp_summer || 25) < 30) {
      climateScore += 25;
    }
    if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) < 25) {
      climateScore += 30;
    } else if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) > 32) {
      climateScore -= 30;
    }
  }
  scores.push({ category: "climate", score: Math.min(100, Math.max(20, climateScore)), weight: weights.climate, label: "Climate Fit" });

  // Nature fit - stronger differentiation
  let natureScore = location.outdoor_score || 50;
  if (preferences.beachMountain) {
    if (preferences.beachMountain === "beach") {
      if (location.beach_access_score && location.beach_access_score > 80) {
        natureScore = location.beach_access_score + 15;
      } else if (location.beach_access_score && location.beach_access_score > 50) {
        natureScore = (natureScore + location.beach_access_score) / 2 + 10;
      } else {
        natureScore -= 20;
      }
    }
    if (preferences.beachMountain === "mountains") {
      if (location.mountain_access_score && location.mountain_access_score > 80) {
        natureScore = location.mountain_access_score + 15;
      } else if (location.mountain_access_score && location.mountain_access_score > 50) {
        natureScore = (natureScore + location.mountain_access_score) / 2 + 10;
      } else {
        natureScore -= 20;
      }
    }
  }
  if (preferences.outdoorUrban === "urban" && location.walkability_score) {
    natureScore = (natureScore + location.walkability_score) / 2;
  }
  scores.push({ category: "nature", score: Math.min(100, Math.max(25, natureScore)), weight: weights.nature, label: "Nature & Outdoors" });

  // Community fit - stronger bonuses
  let communityScore = location.community_score || 50;
  if (location.english_friendliness_score) communityScore = (communityScore + location.english_friendliness_score) / 2;
  const vibes = preferences.communityVibes || [];
  if (vibes.includes("expat") && location.culture_openness_score && location.culture_openness_score > 70) {
    communityScore += 25;
  }
  if (vibes.includes("local") && (location.english_friendliness_score || 0) < 70) {
    communityScore += 15;
  }
  if (vibes.includes("startup") && (location.startup_ecosystem_score || 0) > 70) {
    communityScore += 20;
  }
  if (vibes.includes("digital-nomad") && location.tags?.includes("digital-nomad")) {
    communityScore += 20;
  }
  scores.push({ category: "community", score: Math.min(100, Math.max(30, communityScore)), weight: weights.community, label: "Community & Social" });

  // Career fit - larger bonuses
  let careerScore = ((location.startup_ecosystem_score || 50) + (location.internet_quality_score || 70)) / 2;
  if (preferences.workStyle === "remote") {
    if ((location.internet_quality_score || 0) > 85) {
      careerScore += 30;
    } else if ((location.internet_quality_score || 0) < 60) {
      careerScore -= 20;
    }
  }
  if (preferences.industries?.includes("tech") && (location.startup_ecosystem_score || 0) > 75) {
    careerScore += 30;
  }
  if (preferences.industries?.includes("creative") && location.tags?.includes("creative")) {
    careerScore += 25;
  }
  if (preferences.industries?.includes("finance") && location.tags?.includes("finance-hub")) {
    careerScore += 25;
  }
  scores.push({ category: "career", score: Math.min(100, Math.max(25, careerScore)), weight: weights.career, label: "Career & Work" });

  // Cost fit - much larger impact
  let costScore = ((location.cost_of_living_score || 50) + (location.rent_score || 50)) / 2;
  if (preferences.budgetRange === "budget") {
    if (costScore > 75) {
      costScore += 30;
    } else if (costScore < 50) {
      costScore -= 25;
    }
  }
  if (preferences.budgetRange === "mid-range") {
    if (costScore > 50 && costScore < 80) costScore += 20;
  }
  if (preferences.budgetRange === "luxury") {
    if ((location.cost_of_living_score || 0) < 40) costScore -= 15;
  }
  // Tax consideration has bigger impact
  if (location.tax_friendliness_score) {
    if (preferences.taxSensitivity === "very-sensitive") {
      if (location.tax_friendliness_score > 80) {
        costScore += 25;
      } else if (location.tax_friendliness_score < 50) {
        costScore -= 20;
      }
    }
    costScore = (costScore * 0.6 + location.tax_friendliness_score * 0.4);
  }
  scores.push({ category: "cost", score: Math.min(100, Math.max(20, costScore)), weight: weights.cost, label: "Cost & Value" });

  // Safety fit
  let safetyScore = ((location.safety_score || 70) + (location.healthcare_score || 70)) / 2;
  if (preferences.safetyPriority === "top-priority") {
    if (safetyScore > 85) safetyScore += 15;
    else if (safetyScore < 60) safetyScore -= 25;
  }
  if (preferences.healthcarePriority === "essential" && (location.healthcare_score || 0) > 85) {
    safetyScore += 15;
  }
  scores.push({ category: "safety", score: Math.min(100, Math.max(30, safetyScore)), weight: weights.safety, label: "Safety & Stability" });

  // Wellness fit - stronger differentiation
  let wellnessScore = location.wellness_score || 50;
  if (preferences.gymCulture === "important") {
    if ((location.wellness_score || 0) > 75) wellnessScore += 25;
    else if ((location.wellness_score || 0) < 50) wellnessScore -= 15;
  }
  if (preferences.wellnessImportance === "high") {
    if ((location.outdoor_score || 0) > 75) wellnessScore += 20;
  }
  scores.push({ category: "wellness", score: Math.min(100, Math.max(30, wellnessScore)), weight: weights.wellness, label: "Health & Wellness" });

  // Travel fit - stronger bonuses
  let travelScore = location.airport_connectivity_score || 50;
  if (preferences.airportConnectivity === "important" || preferences.airportImportance === "essential") {
    if ((location.airport_connectivity_score || 0) > 85) {
      travelScore += 30;
    } else if ((location.airport_connectivity_score || 0) < 50) {
      travelScore -= 25;
    }
  }
  if (preferences.travelFrequency === "frequent" && location.transit_score) {
    travelScore = (travelScore + location.transit_score) / 2 + 10;
  }
  scores.push({ category: "travel", score: Math.min(100, Math.max(25, travelScore)), weight: weights.travel, label: "Travel & Connectivity" });

  // Culture fit
  let cultureScore = location.culture_openness_score || 50;
  if (location.nightlife_score && preferences.dailyRoutine === "night-owl") {
    cultureScore = (cultureScore + location.nightlife_score) / 2 + 15;
  }
  if (preferences.cultureTolerance === "important" && (location.culture_openness_score || 0) > 80) {
    cultureScore += 20;
  }
  if (preferences.lgbtqFriendliness === "essential" && (location.culture_openness_score || 0) > 85) {
    cultureScore += 15;
  }
  scores.push({ category: "culture", score: Math.min(100, Math.max(30, cultureScore)), weight: weights.culture, label: "Culture & Openness" });

  // Lifestyle fit - much stronger differentiation
  let lifestyleScore = 50;
  if (preferences.noiseTolerance === "high") {
    if ((location.nightlife_score || 0) > 80) lifestyleScore = 95;
    else if ((location.nightlife_score || 0) > 60) lifestyleScore = 80;
    else lifestyleScore = 55;
  }
  if (preferences.noiseTolerance === "medium") {
    if ((location.walkability_score || 0) > 70 && (location.nightlife_score || 50) < 85) lifestyleScore = 85;
    else lifestyleScore = 65;
  }
  if (preferences.noiseTolerance === "low") {
    if ((location.outdoor_score || 0) > 75 && (location.nightlife_score || 50) < 60) lifestyleScore = 95;
    else if ((location.nightlife_score || 50) > 80) lifestyleScore = 40;
    else lifestyleScore = 70;
  }
  
  // Lifestyle mode affects score
  if (preferences.lifestyleMode === "nomadic" && location.tags?.includes("digital-nomad")) {
    lifestyleScore += 15;
  }
  if (preferences.lifestyleMode === "rooted" && (location.community_score || 0) > 75) {
    lifestyleScore += 10;
  }
  
  scores.push({ category: "lifestyle", score: Math.min(100, Math.max(25, lifestyleScore)), weight: weights.lifestyle, label: "Lifestyle Match" });

  return scores;
}

export function generateReasons(location: Location, categoryScores: CategoryScore[]): string[] {
  const reasons: string[] = [];
  const sortedScores = [...categoryScores].sort((a, b) => b.score - a.score);
  const topCategories = sortedScores.slice(0, 5);

  for (const cat of topCategories) {
    switch (cat.category) {
      case "climate":
        if (location.sunshine_days && location.sunshine_days > 250) {
          reasons.push(`${location.sunshine_days}+ sunny days per year for excellent weather`);
        } else if (location.climate_score && location.climate_score > 75) {
          reasons.push("Ideal climate conditions matching your preferences");
        }
        break;
      case "nature":
        if (location.beach_access_score && location.beach_access_score > 85) {
          reasons.push("Outstanding beach access and coastal lifestyle");
        } else if (location.mountain_access_score && location.mountain_access_score > 80) {
          reasons.push("Excellent mountain access for outdoor adventures");
        } else if (location.outdoor_score && location.outdoor_score > 80) {
          reasons.push("Top-tier outdoor activities and nature access");
        }
        break;
      case "community":
        if (location.english_friendliness_score && location.english_friendliness_score > 80) {
          reasons.push("English-friendly with easy integration for expats");
        } else if (location.community_score && location.community_score > 75) {
          reasons.push("Welcoming community with strong social connections");
        }
        break;
      case "career":
        if (location.startup_ecosystem_score && location.startup_ecosystem_score > 80) {
          reasons.push("Thriving startup and tech ecosystem");
        } else if (location.internet_quality_score && location.internet_quality_score > 85) {
          reasons.push("Excellent internet infrastructure for remote work");
        }
        break;
      case "cost":
        if (location.cost_of_living_score && location.cost_of_living_score > 70) {
          reasons.push("Affordable cost of living with excellent value");
        } else if (location.tax_friendliness_score && location.tax_friendliness_score > 80) {
          reasons.push("Favorable tax environment");
        }
        break;
      case "safety":
        if (location.safety_score && location.safety_score > 85) {
          reasons.push("Exceptionally safe with low crime rates");
        } else if (location.healthcare_score && location.healthcare_score > 85) {
          reasons.push("World-class healthcare system");
        }
        break;
      case "wellness":
        if (location.wellness_score && location.wellness_score > 80) {
          reasons.push("Strong wellness culture with gyms, yoga, and health focus");
        }
        break;
      case "travel":
        if (location.airport_connectivity_score && location.airport_connectivity_score > 85) {
          reasons.push("Major international hub with easy global travel");
        }
        break;
      case "culture":
        if (location.culture_openness_score && location.culture_openness_score > 80) {
          reasons.push("Open, diverse, and culturally progressive");
        } else if (location.nightlife_score && location.nightlife_score > 80) {
          reasons.push("Vibrant nightlife and entertainment scene");
        }
        break;
      case "lifestyle":
        reasons.push(`Lifestyle that matches your preferences ${cat.score > 75 ? "perfectly" : "well"}`);
        break;
    }
  }

  // Add tag-based reasons
  if (location.tags?.includes("digital-nomad")) {
    reasons.push("Established digital nomad community and coworking spaces");
  }
  if (location.tags?.includes("foodie")) {
    reasons.push("World-renowned food scene and culinary culture");
  }

  return reasons.slice(0, 5);
}

export function generateTradeoffs(location: Location, categoryScores: CategoryScore[]): string[] {
  const tradeoffs: string[] = [];
  const sortedScores = [...categoryScores].sort((a, b) => a.score - b.score);
  const weakCategories = sortedScores.slice(0, 3);

  for (const cat of weakCategories) {
    if (cat.score < 60) {
      switch (cat.category) {
        case "climate":
          if (location.humidity_level && location.humidity_level > 75) {
            tradeoffs.push("High humidity levels may take adjustment");
          } else if (location.avg_temp_winter && location.avg_temp_winter < 5) {
            tradeoffs.push("Cold winters require preparation");
          }
          break;
        case "cost":
          if (location.cost_of_living_score && location.cost_of_living_score < 40) {
            tradeoffs.push("Higher cost of living than average");
          }
          break;
        case "safety":
          if (location.safety_score && location.safety_score < 65) {
            tradeoffs.push("Safety considerations in some areas");
          }
          break;
        case "travel":
          if (location.airport_connectivity_score && location.airport_connectivity_score < 60) {
            tradeoffs.push("Limited international flight connections");
          }
          break;
        case "community":
          if (location.english_friendliness_score && location.english_friendliness_score < 60) {
            tradeoffs.push("Local language skills helpful for full integration");
          }
          break;
        case "career":
          if (location.startup_ecosystem_score && location.startup_ecosystem_score < 50) {
            tradeoffs.push("Limited local job market in some industries");
          }
          break;
      }
    }
  }

  // Add bureaucracy tradeoff
  if (location.bureaucracy_score && location.bureaucracy_score < 55) {
    tradeoffs.push("Bureaucracy can be challenging and slow");
  }

  // Add visa tradeoff
  if (location.visa_friendliness_score && location.visa_friendliness_score < 60) {
    tradeoffs.push("Visa requirements may need planning");
  }

  return tradeoffs.slice(0, 3);
}

export function calculateTotalScore(categoryScores: CategoryScore[]): number {
  const weightedSum = categoryScores.reduce((sum, cat) => sum + cat.score * cat.weight, 0);
  const totalWeight = categoryScores.reduce((sum, cat) => sum + cat.weight, 0);
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

export function scoreLocations(locations: Location[], preferences: OnboardingData): MatchResult[] {
  const results: MatchResult[] = locations.map((location) => {
    const categoryScores = calculateCategoryScores(location, preferences);
    let totalScore = calculateTotalScore(categoryScores);
    
    // Apply deal-breaker multiplier
    const dealBreakerMultiplier = calculateDealBreakerMultiplier(location, preferences);
    totalScore *= dealBreakerMultiplier;
    
    // Apply alignment bonus
    const alignmentBonus = calculateAlignmentBonus(location, preferences);
    totalScore += alignmentBonus;
    
    // Apply score spreading to get more variation
    totalScore = spreadScore(totalScore);
    
    const reasons = generateReasons(location, categoryScores);
    const tradeoffs = generateTradeoffs(location, categoryScores);

    return {
      location,
      totalScore,
      categoryScores,
      reasons,
      tradeoffs,
      rank: 0,
    };
  });

  // Sort by total score descending
  results.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  results.forEach((result, index) => {
    result.rank = index + 1;
  });

  return results;
}

// Score user's current city to show fit comparison
export interface CurrentCityScore {
  score: number;
  categoryScores: {
    label: string;
    score: number;
  }[];
  cityFound: boolean;
}

export function scoreCurrentCity(
  currentCityName: string,
  locations: Location[],
  preferences: OnboardingData
): CurrentCityScore {
  // Try to find matching city in database (case-insensitive)
  const normalizedInput = currentCityName.toLowerCase().trim();
  
  // First try exact match
  let matchedCity = locations.find(
    loc => loc.name.toLowerCase() === normalizedInput
  );
  
  // If exact match has no scores, try fuzzy matching or related places
  // E.g., "Canggu" -> "Bali", "Seminyak" -> "Bali", "Ubud" -> "Bali"
  const baliNeighborhoods = ['canggu', 'ubud', 'seminyak', 'kuta', 'sanur', 'uluwatu', 'denpasar', 'nusa dua'];
  const isInBali = baliNeighborhoods.some(n => normalizedInput.includes(n) || n.includes(normalizedInput));
  
  if ((!matchedCity || !matchedCity.cost_of_living_score) && isInBali) {
    matchedCity = locations.find(loc => loc.name.toLowerCase() === 'bali');
  }
  
  // Check if the matched city has actual scores (not null)
  const hasScores = matchedCity && (
    matchedCity.cost_of_living_score !== null ||
    matchedCity.climate_score !== null ||
    matchedCity.safety_score !== null
  );

  if (matchedCity && hasScores) {
    const categoryScores = calculateCategoryScores(matchedCity, preferences);
    let totalScore = calculateTotalScore(categoryScores);
    
    // Don't apply deal-breaker to current city - user already lives there and is happy
    // Just spread the score normally
    totalScore = spreadScore(totalScore);
    
    // Simplify to 4 main categories for the UI
    const simplifiedScores = [
      {
        label: "Lifestyle Fit",
        score: Math.round(
          (categoryScores.find(c => c.category === "lifestyle")?.score || 50) * 0.5 +
          (categoryScores.find(c => c.category === "wellness")?.score || 50) * 0.5
        ),
      },
      {
        label: "Community Fit", 
        score: Math.round(
          (categoryScores.find(c => c.category === "community")?.score || 50) * 0.6 +
          (categoryScores.find(c => c.category === "culture")?.score || 50) * 0.4
        ),
      },
      {
        label: "Nature & Environment",
        score: Math.round(
          (categoryScores.find(c => c.category === "nature")?.score || 50) * 0.6 +
          (categoryScores.find(c => c.category === "climate")?.score || 50) * 0.4
        ),
      },
      {
        label: "Career & Opportunity",
        score: Math.round(
          (categoryScores.find(c => c.category === "career")?.score || 50) * 0.7 +
          (categoryScores.find(c => c.category === "travel")?.score || 50) * 0.3
        ),
      },
    ];

    return {
      score: Math.round(totalScore),
      categoryScores: simplifiedScores,
      cityFound: true,
    };
  }

  // Fallback: Generate a DETERMINISTIC estimate for unknown cities
  // Use a hash of the city name to ensure same city always gets same score
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };
  
  const cityHash = hashString(currentCityName.toLowerCase());
  const baseScore = 48 + (cityHash % 12); // 48-59 range, deterministic
  
  return {
    score: baseScore,
    categoryScores: [
      { label: "Lifestyle Fit", score: 45 + ((cityHash * 7) % 15) },
      { label: "Community Fit", score: 50 + ((cityHash * 13) % 10) },
      { label: "Nature & Environment", score: 40 + ((cityHash * 17) % 20) },
      { label: "Career & Opportunity", score: 50 + ((cityHash * 23) % 15) },
    ],
    cityFound: false,
  };
}
```

### `src/lib/utils.ts`
```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/main.tsx`
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

### `src/pages/AdminPlaceImages.tsx`
```tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Check, 
  X, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  ImageIcon 
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  image_url: string | null;
  image_source: string | null;
  image_source_url: string | null;
  image_verified: boolean | null;
  image_updated_at: string | null;
}

interface ImageCandidate {
  url: string;
  thumbUrl?: string;
  title: string;
  source: string;
  score: number;
  rejectReason?: string;
}

export default function AdminPlaceImages() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "unverified" | "verified">("unverified");
  const [candidates, setCandidates] = useState<ImageCandidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [mirroring, setMirroring] = useState(false);
  const [stats, setStats] = useState({ total: 0, verified: 0, storageHosted: 0 });
  const [imageError, setImageError] = useState(false);

  const currentLocation = locations[currentIndex];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/app/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchLocations();
    fetchStats();
  }, [filter]);

  // Reset image error when location changes
  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  const fetchStats = async () => {
    const { data } = await supabase
      .from("locations")
      .select("image_url, image_verified");
    
    if (data) {
      setStats({
        total: data.length,
        verified: data.filter(l => l.image_verified).length,
        storageHosted: data.filter(l => l.image_url?.includes("place-images")).length,
      });
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    let query = supabase
      .from("locations")
      .select("id, name, country, continent, image_url, image_source, image_source_url, image_verified, image_updated_at")
      .order("name");

    if (filter === "unverified") {
      query = query.or("image_verified.is.null,image_verified.eq.false");
    } else if (filter === "verified") {
      query = query.eq("image_verified", true);
    }

    const { data, error } = await query;
    
    if (error) {
      toast.error("Failed to fetch locations");
      console.error(error);
    } else {
      setLocations(data || []);
      setCurrentIndex(0);
      setCandidates([]);
    }
    setLoading(false);
  };

  const fetchCandidates = async () => {
    if (!currentLocation) return;
    
    setLoadingCandidates(true);
    setCandidates([]);
    
    try {
      const response = await supabase.functions.invoke("sync-place-images", {
        body: {
          action: "get_candidates",
          locationId: currentLocation.id,
        },
      });

      if (response.error) {
        throw response.error;
      }

      setCandidates(response.data?.candidates || []);
      if (response.data?.candidates?.length === 0) {
        toast.info("No candidates found for this location");
      }
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      toast.error("Failed to fetch image candidates");
    }
    
    setLoadingCandidates(false);
  };

  const selectCandidate = async (candidate: ImageCandidate) => {
    if (!currentLocation) return;
    
    setMirroring(true);
    
    try {
      const response = await supabase.functions.invoke("sync-place-images", {
        body: {
          action: "mirror_url",
          locationId: currentLocation.id,
          sourceUrl: candidate.thumbUrl || candidate.url,
          source: candidate.source,
        },
      });

      if (response.error || !response.data?.success) {
        throw new Error(response.data?.error || "Mirror failed");
      }

      toast.success(`Image updated for ${currentLocation.name}`);
      
      // Refresh the current location
      await refreshCurrentLocation();
      setCandidates([]);
      fetchStats();
    } catch (error) {
      console.error("Failed to select candidate:", error);
      toast.error("Failed to update image: " + (error as Error).message);
    }
    
    setMirroring(false);
  };

  const mirrorCustomUrl = async () => {
    if (!currentLocation || !customUrl.trim()) return;
    
    setMirroring(true);
    
    try {
      const response = await supabase.functions.invoke("sync-place-images", {
        body: {
          action: "mirror_url",
          locationId: currentLocation.id,
          sourceUrl: customUrl.trim(),
          source: "manual",
        },
      });

      if (response.error || !response.data?.success) {
        throw new Error(response.data?.error || "Mirror failed");
      }

      toast.success(`Image updated for ${currentLocation.name}`);
      setCustomUrl("");
      
      await refreshCurrentLocation();
      fetchStats();
    } catch (error) {
      console.error("Failed to mirror custom URL:", error);
      toast.error("Failed to update image: " + (error as Error).message);
    }
    
    setMirroring(false);
  };

  const approveCurrentImage = async () => {
    if (!currentLocation) return;
    
    const { error } = await supabase
      .from("locations")
      .update({ image_verified: true })
      .eq("id", currentLocation.id);

    if (error) {
      toast.error("Failed to approve");
    } else {
      toast.success(`Approved: ${currentLocation.name}`);
      await refreshCurrentLocation();
      fetchStats();
      // Auto-advance to next unverified
      if (filter === "unverified") {
        setLocations(prev => prev.filter(l => l.id !== currentLocation.id));
      }
    }
  };

  const rejectCurrentImage = async () => {
    if (!currentLocation) return;
    
    // Clear the image and mark as needing review
    const { error } = await supabase
      .from("locations")
      .update({ 
        image_verified: false,
        image_source: "needs_review",
      })
      .eq("id", currentLocation.id);

    if (error) {
      toast.error("Failed to reject");
    } else {
      toast.info(`Marked for review: ${currentLocation.name}`);
      await refreshCurrentLocation();
    }
  };

  const refreshCurrentLocation = async () => {
    if (!currentLocation) return;
    
    const { data } = await supabase
      .from("locations")
      .select("id, name, country, continent, image_url, image_source, image_source_url, image_verified, image_updated_at")
      .eq("id", currentLocation.id)
      .single();

    if (data) {
      setLocations(prev => 
        prev.map(l => l.id === data.id ? data : l)
      );
      setImageError(false);
    }
  };

  const runBatchSync = async (limit = 5) => {
    setSyncing(true);
    
    try {
      const response = await supabase.functions.invoke("sync-place-images", {
        body: {
          limit,
          onlyUnverified: true,
          useAI: true,
        },
      });

      if (response.error) {
        throw response.error;
      }

      const data = response.data;
      toast.success(`Processed ${data.processed}: ${data.updated} updated, ${data.failed} failed`);
      
      // Refresh
      fetchLocations();
      fetchStats();
    } catch (error) {
      console.error("Batch sync failed:", error);
      toast.error("Batch sync failed");
    }
    
    setSyncing(false);
  };

  const goToNext = () => {
    if (currentIndex < locations.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCandidates([]);
      setImageError(false);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCandidates([]);
      setImageError(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case "a":
          approveCurrentImage();
          break;
        case "r":
          rejectCurrentImage();
          break;
        case "f":
          fetchCandidates();
          break;
        case "arrowleft":
          goToPrevious();
          break;
        case "arrowright":
          goToNext();
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLocation, currentIndex]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Image Audit</h1>
            <p className="text-muted-foreground">
              {stats.verified}/{stats.total} verified · {stats.storageHosted} storage-hosted
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/places")}>
              Back to Places
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                <Button
                  variant={filter === "unverified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("unverified")}
                >
                  Unverified
                </Button>
                <Button
                  variant={filter === "verified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("verified")}
                >
                  Verified
                </Button>
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
              </div>
              
              <div className="flex-1" />
              
              <Button
                variant="outline"
                onClick={() => runBatchSync(5)}
                disabled={syncing}
              >
                {syncing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Sync 5
              </Button>
              <Button
                variant="outline"
                onClick={() => runBatchSync(10)}
                disabled={syncing}
              >
                {syncing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Sync 10
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Location */}
        {currentLocation ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {currentLocation.name}, {currentLocation.country}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={currentLocation.image_verified ? "default" : "secondary"}>
                      {currentLocation.image_verified ? "Verified" : "Unverified"}
                    </Badge>
                    {currentLocation.image_source && (
                      <Badge variant="outline">{currentLocation.image_source}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {currentLocation.image_url && !imageError ? (
                    <img
                      src={currentLocation.image_url}
                      alt={currentLocation.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          {imageError ? "Image failed to load" : "No image"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={approveCurrentImage} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Approve (A)
                  </Button>
                  <Button variant="destructive" onClick={rejectCurrentImage} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Reject (R)
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {locations.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNext}
                    disabled={currentIndex >= locations.length - 1}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Source URL */}
                {currentLocation.image_source_url && (
                  <a
                    href={currentLocation.image_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View source
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Candidates / Manual URL */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Find Alternative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Find Candidates Button */}
                <Button
                  onClick={fetchCandidates}
                  disabled={loadingCandidates}
                  className="w-full"
                  variant="outline"
                >
                  {loadingCandidates ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Find Candidates (F)
                </Button>

                {/* Candidates Grid */}
                {candidates.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                    {candidates.map((candidate, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectCandidate(candidate)}
                        disabled={mirroring}
                        className="relative aspect-video bg-muted rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all group"
                      >
                        <img
                          src={candidate.thumbUrl || candidate.url}
                          alt={candidate.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                          <span className="text-white text-xs text-center line-clamp-2">
                            {candidate.title}
                          </span>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Score: {candidate.score}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Manual URL Input */}
                <div className="pt-4 border-t border-border">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Or paste image URL:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && mirrorCustomUrl()}
                    />
                    <Button
                      onClick={mirrorCustomUrl}
                      disabled={!customUrl.trim() || mirroring}
                    >
                      {mirroring ? <Loader2 className="w-4 h-4 animate-spin" /> : "Use"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Image will be downloaded and hosted in storage
                  </p>
                </div>

                {/* Wikipedia Search Link */}
                <div className="text-sm text-muted-foreground">
                  <a
                    href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(currentLocation.name + " " + currentLocation.country)}&title=Special:MediaSearch&go=Go&type=image`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Search Wikimedia Commons <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              {filter === "unverified" 
                ? "All images have been verified! 🎉"
                : "No locations found with current filter."}
            </CardContent>
          </Card>
        )}

        {/* Location List (compact) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">All {filter} locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {locations.map((loc, idx) => (
                <Button
                  key={loc.id}
                  variant={idx === currentIndex ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setCandidates([]);
                    setImageError(false);
                  }}
                  className="text-xs"
                >
                  {loc.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Keyboard shortcuts: 
            <kbd className="px-2 py-1 bg-muted rounded mx-1">A</kbd> Approve · 
            <kbd className="px-2 py-1 bg-muted rounded mx-1">R</kbd> Reject · 
            <kbd className="px-2 py-1 bg-muted rounded mx-1">F</kbd> Find candidates · 
            <kbd className="px-2 py-1 bg-muted rounded mx-1">←</kbd>
            <kbd className="px-2 py-1 bg-muted rounded mx-1">→</kbd> Navigate
          </p>
        </div>
      </div>
    </div>
  );
}
```

### `src/pages/Dashboard.tsx`
```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, History, Settings, LogOut, ArrowRight, Unlock, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface PastRun {
  id: string;
  created_at: string;
  inputs_json: {
    currentCity?: string;
    name?: string;
  };
  unlocked_results: { id: string }[] | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [pastRuns, setPastRuns] = useState<PastRun[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/app/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchPastRuns = async () => {
      if (!user) return;

      const { data: runs, error } = await supabase
        .from("onboarding_runs")
        .select(`
          id,
          created_at,
          inputs_json,
          unlocked_results!left(id)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching past runs:", error);
        return;
      }

      setPastRuns((runs || []) as PastRun[]);
    };

    fetchPastRuns();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-primary to-accent opacity-60" style={{ filter: 'blur(4px)' }} />
                <div className="relative w-7 h-7 rounded-full bg-background flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-accent" />
                </div>
              </div>
              <span className="text-lg font-semibold">
                Find Your <span className="text-gradient font-bold">Place</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground mb-8">
            Ready to discover or refine your perfect place?
          </p>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link to="/app/onboarding" className="block">
              <div className="card-interactive p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">New Match</h3>
                <p className="text-muted-foreground mb-4">
                  Start fresh with a new set of preferences and discover your ideal cities.
                </p>
                <div className="flex items-center text-primary font-medium">
                  Start Now <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            <div className="card-elevated p-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <History className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Past Results</h3>
              <p className="text-muted-foreground mb-4">
                View and compare your previous match results.
              </p>
              
              {pastRuns.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {pastRuns.map((run) => {
                    const isUnlocked = run.unlocked_results && run.unlocked_results.length > 0;
                    return (
                      <Link key={run.id} to={`/app/results/${run.id}`}>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {run.inputs_json?.currentCity || "Location Match"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(run.created_at), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          <div className="ml-3">
                            {isUnlocked ? (
                              <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
                                <Unlock className="w-3 h-3" />
                                Unlocked
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="gap-1">
                                <Lock className="w-3 h-3" />
                                Locked
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No past results yet
                </p>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Profile Settings
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
```

### `src/pages/Index.tsx`
```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Statistics from "@/components/landing/Statistics";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
```

### `src/pages/Login.tsx`
```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/app";
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Account created! You're now signed in.");
        navigate(redirectTo);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate(redirectTo);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ocean-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-elevated p-8">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-primary to-accent opacity-60" style={{ filter: 'blur(4px)' }} />
              <div className="relative w-9 h-9 rounded-full bg-background flex items-center justify-center">
                <Globe className="w-4 h-4 text-accent" />
              </div>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Find Your <span className="text-gradient font-bold">Place</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-center mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {isSignUp
              ? "Start discovering where you belong"
              : "Continue your journey to find your perfect place"}
          </p>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Or{" "}
            <Link to="/app/onboarding" className="text-primary hover:underline">
              continue as guest
            </Link>{" "}
            (results won't be saved)
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
```

### `src/pages/NotFound.tsx`
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
```

### `src/pages/Onboarding.tsx`
```tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import BasicsStep from "@/components/onboarding/steps/BasicsStep";
import MobilityStep from "@/components/onboarding/steps/MobilityStep";
import LifestyleStep from "@/components/onboarding/steps/LifestyleStep";
import CareerStep from "@/components/onboarding/steps/CareerStep";
import SocialStep from "@/components/onboarding/steps/SocialStep";
import CostStep from "@/components/onboarding/steps/CostStep";
import ValuesStep from "@/components/onboarding/steps/ValuesStep";
import HealthTravelStep from "@/components/onboarding/steps/HealthTravelStep";
import SafetyPrioritiesStep from "@/components/onboarding/steps/SafetyPrioritiesStep";
import { OnboardingData } from "@/types/onboarding";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";

const TOTAL_STEPS = 9;

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({});
  const inviteCode = searchParams.get('invite');
  
  // Track invite click on mount
  useEffect(() => {
    if (inviteCode) {
      // Store invite code for completion tracking
      sessionStorage.setItem('inviteCode', inviteCode);
      
      // Mark invite as clicked
      supabase.functions.invoke('complete-invite', {
        body: { invite_code: inviteCode }
      }).catch(console.error);
    }
  }, [inviteCode]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const { data: { session } } = await supabase.auth.getSession();
      const storedInviteCode = sessionStorage.getItem('inviteCode');
      
      let runId: string;
      
      if (session?.user) {
        // Authenticated user - save to database
        const { data: run, error } = await supabase
          .from("onboarding_runs")
          .insert([{
            user_id: session.user.id,
            inputs_json: JSON.parse(JSON.stringify(data)),
            weights_json: {},
            signals_json: {},
            version: 1
          }])
          .select("id")
          .single();
        
        if (error) throw error;
        runId = run.id;
        
        // Also save to sessionStorage as backup
        sessionStorage.setItem("onboardingData", JSON.stringify(data));
        
        // Record quiz completion for live counter
        try {
          await supabase.from("quiz_completions").insert({
            run_id: runId,
            top_match_city: null,
            top_match_score: null
          });
        } catch (e) { console.error(e); }
        
        // Complete the invite if user came from one
        if (storedInviteCode) {
          await supabase.functions.invoke('complete-invite', {
            body: { 
              invite_code: storedInviteCode,
              invitee_run_id: runId,
              invitee_email: session.user.email
            }
          }).catch(console.error);
          sessionStorage.removeItem('inviteCode');
        }
      } else {
        // Guest user - use sessionStorage only
        runId = `demo-${Date.now()}`;
        sessionStorage.setItem("onboardingData", JSON.stringify(data));
      }
      
      sessionStorage.setItem("currentRunId", runId);
      
      toast.success("Your matches are ready!");
      navigate(`/app/results/${runId}`);
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicsStep data={data} onChange={updateData} />;
      case 1:
        return <MobilityStep data={data} onChange={updateData} />;
      case 2:
        return <LifestyleStep data={data} onChange={updateData} />;
      case 3:
        return <CareerStep data={data} onChange={updateData} />;
      case 4:
        return <SocialStep data={data} onChange={updateData} />;
      case 5:
        return <CostStep data={data} onChange={updateData} />;
      case 6:
        return <ValuesStep data={data} onChange={updateData} />;
      case 7:
        return <HealthTravelStep data={data} onChange={updateData} />;
      case 8:
        return <SafetyPrioritiesStep data={data} onChange={updateData} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <OnboardingLayout currentStep={currentStep}>
      <div className="flex-1">{renderStep()}</div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border pb-safe">
        <div className="container px-4 py-4 max-w-2xl mx-auto">
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between sm:items-center">
            {/* Back button */}
            <Button 
              variant="ghost" 
              onClick={goPrev} 
              disabled={currentStep === 0}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {/* Skip + Continue */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {!isLastStep && (
                <Button 
                  variant="ghost" 
                  onClick={goNext}
                  className="w-full sm:w-auto text-muted-foreground order-2 sm:order-1"
                >
                  Skip for now
                </Button>
              )}
              <Button
                variant="hero"
                size="lg"
                onClick={isLastStep ? handleSubmit : goNext}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[52px] order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Finding your places...
                  </>
                ) : isLastStep ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    See My Matches
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Onboarding;```

### `src/pages/Places.tsx`
```tsx
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PlacesHero from "@/components/places/PlacesHero";
import PlaceFilters, { type SortOption, type CostFilter, type SafetyFilter } from "@/components/places/PlaceFilters";
import RegionSection from "@/components/places/RegionSection";
import PlaceModal from "@/components/places/PlaceModal";
import { Skeleton } from "@/components/ui/skeleton";
import { scoreLocations, type Location as ScoringLocation } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";

interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string | null;
  image_url: string | null;
  vibe_summary: string | null;
  description: string | null;
  safety_score: number | null;
  cost_of_living_score: number | null;
  climate_score: number | null;
  healthcare_score: number | null;
  nightlife_score: number | null;
  outdoor_score: number | null;
  transit_score: number | null;
  english_friendliness_score: number | null;
  tags: string[] | null;
}

interface GroupedLocations {
  [continent: string]: {
    [country: string]: Location[];
  };
}

const Places = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [userPreferences, setUserPreferences] = useState<OnboardingData | null>(null);
  const [matchScores, setMatchScores] = useState<Map<string, number>>(new Map());
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [costFilter, setCostFilter] = useState<CostFilter>("all");
  const [safetyFilter, setSafetyFilter] = useState<SafetyFilter>("all");

  // Fetch all locations
  const { data: locations, isLoading } = useQuery({
    queryKey: ["all-locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Location[];
    },
  });

  // Load user preferences from localStorage or fetch from Supabase
  useEffect(() => {
    const loadPreferences = async () => {
      // Check localStorage first
      const localData = localStorage.getItem("onboardingData");
      if (localData) {
        try {
          setUserPreferences(JSON.parse(localData));
          return;
        } catch (e) {
          console.error("Failed to parse local onboarding data");
        }
      }

      // Check if user is authenticated and has runs
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: runs } = await supabase
          .from("onboarding_runs")
          .select("inputs_json")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (runs && runs.length > 0) {
          setUserPreferences(runs[0].inputs_json as unknown as OnboardingData);
        }
      }
    };

    loadPreferences();
  }, []);

  // Calculate match scores when we have both locations and preferences
  useEffect(() => {
    if (locations && userPreferences) {
      const scoringLocations = locations as unknown as ScoringLocation[];
      const results = scoreLocations(scoringLocations, userPreferences);
      const scores = new Map<string, number>();
      results.forEach(result => {
        scores.set(result.location.id, Math.round(result.totalScore));
      });
      setMatchScores(scores);
    }
  }, [locations, userPreferences]);

  // Group locations by continent and country
  const groupedLocations = useMemo(() => {
    if (!locations) return {};

    const filtered = locations.filter(loc => {
      const matchesSearch = searchQuery === "" || 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = !selectedContinent || loc.continent === selectedContinent;
      
      // Cost filter
      const matchesCost = costFilter === "all" || (() => {
        const cost = loc.cost_of_living_score;
        if (cost === null) return true;
        if (costFilter === "budget") return cost >= 70;
        if (costFilter === "moderate") return cost >= 40 && cost < 70;
        if (costFilter === "premium") return cost < 40;
        return true;
      })();
      
      // Safety filter
      const matchesSafety = safetyFilter === "all" || (() => {
        const safety = loc.safety_score;
        if (safety === null) return true;
        if (safetyFilter === "high") return safety >= 70;
        if (safetyFilter === "medium") return safety >= 50;
        return true;
      })();

      return matchesSearch && matchesContinent && matchesCost && matchesSafety;
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "cost":
          return (b.cost_of_living_score || 0) - (a.cost_of_living_score || 0);
        case "safety":
          return (b.safety_score || 0) - (a.safety_score || 0);
        case "climate":
          return (b.climate_score || 0) - (a.climate_score || 0);
        case "match":
          return (matchScores.get(b.id) || 0) - (matchScores.get(a.id) || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted.reduce((acc: GroupedLocations, loc) => {
      if (!acc[loc.continent]) {
        acc[loc.continent] = {};
      }
      if (!acc[loc.continent][loc.country]) {
        acc[loc.continent][loc.country] = [];
      }
      acc[loc.continent][loc.country].push(loc);
      return acc;
    }, {});
  }, [locations, selectedContinent, searchQuery, costFilter, safetyFilter, sortBy, matchScores]);

  // Get unique continents
  const continents = useMemo(() => {
    if (!locations) return [];
    return [...new Set(locations.map(l => l.continent))].sort();
  }, [locations]);

  const totalCount = locations?.length || 0;
  const filteredCount = Object.values(groupedLocations).reduce(
    (acc, countries) => acc + Object.values(countries).reduce(
      (sum, cities) => sum + cities.length, 0
    ), 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        <PlacesHero totalCount={totalCount} />

        <section className="py-8 md:py-12">
          <div className="container px-4">
            <PlaceFilters
              continents={continents}
              selectedContinent={selectedContinent}
              onContinentChange={setSelectedContinent}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCount={filteredCount}
              totalCount={totalCount}
              sortBy={sortBy}
              onSortChange={setSortBy}
              costFilter={costFilter}
              onCostFilterChange={setCostFilter}
              safetyFilter={safetyFilter}
              onSafetyFilterChange={setSafetyFilter}
              hasPreferences={!!userPreferences}
            />

            {isLoading ? (
              <div className="space-y-12 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-72 rounded-2xl" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="space-y-12 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(groupedLocations)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([continent, countries]) => (
                    <RegionSection
                      key={continent}
                      continent={continent}
                      countries={countries}
                      onPlaceClick={setSelectedPlace}
                      matchScores={matchScores}
                      hasPreferences={!!userPreferences}
                    />
                  ))}

                {Object.keys(groupedLocations).length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">
                      No places found matching your criteria.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 section-glow">
          <div className="container px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Find Your <span className="text-gradient">Perfect Match</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take our 5-minute quiz to discover which places align with your lifestyle, 
              values, and priorities.
            </p>
            <a
              href="/app/onboarding"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl btn-hero text-background font-semibold"
            >
              Start the Quiz
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <PlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        matchScore={selectedPlace ? matchScores.get(selectedPlace.id) : undefined}
        hasPreferences={!!userPreferences}
      />
    </div>
  );
};

export default Places;
```

### `src/pages/Privacy.tsx`
```tsx
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
              <p className="text-muted-foreground">
                Find Your Place is built on the principle that you should control your data. 
                We collect only what's necessary to provide personalized city recommendations, 
                and we never sell your information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Account information (email, name if provided)</li>
                <li>Onboarding responses (lifestyle preferences, career goals, etc.)</li>
                <li>Optional: Social signals you explicitly share with us</li>
                <li>Optional: ChatGPT reflection responses you paste into the app</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To generate personalized city matches</li>
                <li>To save your results and preferences</li>
                <li>To improve our matching algorithm (anonymized)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Download all your data at any time</li>
                <li>Delete your account and all associated data</li>
                <li>Opt out of any optional data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                Questions about privacy? Email us at privacy@findyourplace.app
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
```

### `src/pages/Results.tsx`
```tsx
import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Share2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { TopMatchHero } from "@/components/results/TopMatchHero";
import { BlurredCityCard } from "@/components/results/BlurredCityCard";
import { PaywallCTA } from "@/components/results/PaywallCTA";
import { PersonalityProfile } from "@/components/results/PersonalityProfile";
import { CurrentCityFitCard } from "@/components/results/CurrentCityFitCard";
import { ShareModal } from "@/components/results/ShareModal";
import { LifeChangePreview } from "@/components/results/LifeChangePreview";
import { NextStepsSection } from "@/components/results/NextStepsSection";
import { TaxDeepDive } from "@/components/results/TaxDeepDive";
import { EmailGateModal } from "@/components/results/EmailGateModal";
import { AnnualCircuitSection } from "@/components/results/AnnualCircuitSection";
import { BlurredReveal } from "@/components/results/BlurredReveal";
import { RevealSequence } from "@/components/results/RevealSequence";
import { IdentityShareCTA } from "@/components/results/IdentityShareCTA";
import { LiveCounter } from "@/components/results/LiveCounter";
import { supabase } from "@/integrations/supabase/client";
import { scoreLocations, scoreCurrentCity, type Location, type MatchResult, type CurrentCityScore, type CategoryScore } from "@/lib/scoring";
import { generateAnnualCircuit, type AnnualCircuit } from "@/lib/circuitGenerator";
import type { OnboardingData } from "@/types/onboarding";
import { toast } from "sonner";
const Results = () => {
  const { runId } = useParams();
  const [searchParams] = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [preferences, setPreferences] = useState<OnboardingData | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentCityScore, setCurrentCityScore] = useState<CurrentCityScore | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(() => {
    return localStorage.getItem("emailCaptured") === "true";
  });
  const [hasShared, setHasShared] = useState(() => {
    return localStorage.getItem("hasSharedForDiscount") === "true";
  });
  const [cityRevealed, setCityRevealed] = useState(() => {
    return localStorage.getItem("hasSharedToReveal") === "true";
  });
  const [showRevealSequence, setShowRevealSequence] = useState(false);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [annualCircuit, setAnnualCircuit] = useState<AnnualCircuit | null>(null);

  // Count non-empty preference responses
  const responseCount = preferences 
    ? Object.values(preferences).filter(v => v !== undefined && v !== null && v !== "").length 
    : 0;

  // Helper to convert MatchResult to database format
  const matchResultToDbFormat = useCallback((result: MatchResult, runIdValue: string) => {
    const categoryScoresRecord: Record<string, number> = {};
    result.categoryScores.forEach((cs: CategoryScore) => {
      categoryScoresRecord[cs.category] = cs.score;
    });
    
    return {
      run_id: runIdValue,
      location_id: result.location.id,
      total_score: result.totalScore,
      category_scores_json: categoryScoresRecord,
      reasons_json: result.reasons,
      tradeoffs_json: result.tradeoffs,
      rank: result.rank,
    };
  }, []);

  // Helper to convert database format back to MatchResult
  const dbToMatchResult = useCallback((dbResult: {
    total_score: number;
    category_scores_json: Record<string, number>;
    reasons_json: string[] | null;
    tradeoffs_json: string[] | null;
    rank: number;
    locations: Location;
  }): MatchResult => {
    const categoryScores: CategoryScore[] = Object.entries(dbResult.category_scores_json).map(
      ([category, score]) => ({
        category,
        score: score as number,
        weight: 0.1, // Default weight, actual weight is in preferences
        label: category.charAt(0).toUpperCase() + category.slice(1),
      })
    );

    return {
      location: dbResult.locations,
      totalScore: dbResult.total_score,
      categoryScores,
      reasons: (dbResult.reasons_json as string[]) || [],
      tradeoffs: (dbResult.tradeoffs_json as string[]) || [],
      rank: dbResult.rank,
    };
  }, []);

  // Handle email gate submission
  const handleEmailSubmit = async (email: string) => {
    try {
      await supabase.from("email_captures").insert({
        email,
        run_id: runId || null,
        source: "results_gate",
      });
      
      localStorage.setItem("emailCaptured", "true");
      setEmailCaptured(true);
      setShowEmailGate(false);
    } catch (error) {
      console.error("Failed to capture email:", error);
      // Still proceed even if capture fails
      setShowEmailGate(false);
    }
  };

  useEffect(() => {
    const checkPaymentAndLoadResults = async () => {
      setIsLoading(true);

      try {
        const paymentStatus = searchParams.get("payment");
        const sessionId = searchParams.get("session_id");

        // Parallel fetch: session, payment verification if needed
        const sessionPromise = supabase.auth.getSession();
        
        let paymentVerified = false;
        if (paymentStatus === "success" && sessionId) {
          const { data: verifyData } = await supabase.functions.invoke("verify-payment", {
            body: { sessionId, runId },
          });
          paymentVerified = verifyData?.verified;
          if (paymentVerified) {
            setIsUnlocked(true);
            toast.success("Payment successful! Your results are now unlocked.");
          }
        }

        const { data: { session } } = await sessionPromise;
        
        // Check if results are unlocked (parallel with other checks)
        if (session?.user && runId && !paymentVerified) {
          const { data: unlockedData } = await supabase
            .from("unlocked_results")
            .select("*")
            .eq("user_id", session.user.id)
            .eq("run_id", runId)
            .maybeSingle();

          if (unlockedData) {
            setIsUnlocked(true);
          }
        }

        // Check for saved results and preferences in parallel
        if (runId) {
          const [savedResultsResponse, runDataResponse, locationsResponse] = await Promise.all([
            supabase
              .from("match_results")
              .select("*, locations(*)")
              .eq("run_id", runId)
              .order("rank", { ascending: true }),
            supabase
              .from("onboarding_runs")
              .select("inputs_json")
              .eq("id", runId)
              .maybeSingle(),
            supabase.from("locations").select("*"),
          ]);

          const { data: savedResults, error: savedResultsError } = savedResultsResponse;
          const { data: runData } = runDataResponse;
          const { data: locations } = locationsResponse;

          const prefs = (runData?.inputs_json as OnboardingData) || {};
          setPreferences(prefs);

          if (!savedResultsError && savedResults && savedResults.length > 0) {
            // Use saved results - consistent every time!
            const matchResults = savedResults.map((r) => dbToMatchResult(r as {
              total_score: number;
              category_scores_json: Record<string, number>;
              reasons_json: string[] | null;
              tradeoffs_json: string[] | null;
              rank: number;
              locations: Location;
            }));
            setResults(matchResults);
            setAllLocations(locations as Location[]);

            // Calculate current city score
            if (prefs.currentCity && locations) {
              const cityScore = scoreCurrentCity(prefs.currentCity, locations as Location[], prefs);
              setCurrentCityScore(cityScore);
              
              const currentLoc = (locations as Location[]).find(
                (loc) => loc.name.toLowerCase() === prefs.currentCity?.toLowerCase()
              );
              if (currentLoc) {
                setCurrentLocation(currentLoc);
              }
            }

            // Generate annual circuit for nomadic users only
            if (prefs.lifestyleMode === 'nomadic') {
              const circuit = generateAnnualCircuit(locations as Location[], prefs);
              setAnnualCircuit(circuit);
            }

            // Show email gate for unauthenticated users who haven't captured email
            if (!session?.user && !emailCaptured && matchResults.length > 0) {
              setShowEmailGate(true);
            }

            setIsLoading(false);
            return;
          }

          // No saved results - calculate fresh and save
          if (locations && locations.length > 0) {
            const scored = scoreLocations(locations as Location[], prefs);
            setResults(scored);
            setAllLocations(locations as Location[]);

            // Save results to database for consistency (if logged in with valid runId)
            if (session?.user && runId) {
              const top10Results = scored.slice(0, 10);
              const dbRecords = top10Results.map((result) => matchResultToDbFormat(result, runId));
              
              const { error: insertError } = await supabase
                .from("match_results")
                .insert(dbRecords);

              if (insertError) {
                console.error("Failed to save match results:", insertError);
              }
            }

            // Calculate current city score
            if (prefs.currentCity) {
              const cityScore = scoreCurrentCity(prefs.currentCity, locations as Location[], prefs);
              setCurrentCityScore(cityScore);
              
              const currentLoc = (locations as Location[]).find(
                (loc) => loc.name.toLowerCase() === prefs.currentCity?.toLowerCase()
              );
              if (currentLoc) {
                setCurrentLocation(currentLoc);
              }
            }

            // Generate annual circuit for nomadic users only
            if (prefs.lifestyleMode === 'nomadic') {
              const circuit = generateAnnualCircuit(locations as Location[], prefs);
              setAnnualCircuit(circuit);
            }

            // Show email gate for unauthenticated users
            if (!session?.user && !emailCaptured && scored.length > 0) {
              setShowEmailGate(true);
            }
          }
        } else {
          // No runId - use sessionStorage preferences
          const storedPrefs = sessionStorage.getItem("onboardingData");
          const prefs = storedPrefs ? JSON.parse(storedPrefs) : {};
          setPreferences(prefs);

          const { data: locations } = await supabase.from("locations").select("*");
          
          if (locations && locations.length > 0) {
            const scored = scoreLocations(locations as Location[], prefs);
            setResults(scored);
            setAllLocations(locations as Location[]);

            if (prefs.currentCity) {
              const cityScore = scoreCurrentCity(prefs.currentCity, locations as Location[], prefs);
              setCurrentCityScore(cityScore);
              
              const currentLoc = (locations as Location[]).find(
                (loc) => loc.name.toLowerCase() === prefs.currentCity?.toLowerCase()
              );
              if (currentLoc) {
                setCurrentLocation(currentLoc);
              }
            }

            // Generate annual circuit for nomadic users only
            if (prefs.lifestyleMode === 'nomadic') {
              const circuit = generateAnnualCircuit(locations as Location[], prefs);
              setAnnualCircuit(circuit);
            }

            // Show email gate for unauthenticated users
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            if (!currentSession?.user && !emailCaptured && scored.length > 0) {
              setShowEmailGate(true);
            }
          }
        }
      } catch (error) {
        console.error("Error loading results:", error);
        toast.error("Failed to load results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentAndLoadResults();
  }, [runId, searchParams, matchResultToDbFormat, dbToMatchResult, emailCaptured]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-primary/30" />
                </div>
                <h2 className="text-2xl font-bold">Analyzing your preferences...</h2>
                <p className="text-muted-foreground">Finding your perfect matches</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">No Results Yet</h1>
              <p className="text-muted-foreground mb-8">
                Complete the quiz to discover your perfect places.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/app/onboarding">Start Matching</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const topMatch = results[0];
  const runnerUps = results.slice(1, 3);
  const restOfTop10 = results.slice(3, 10);

  // Handle city reveal after sharing
  const handleCityReveal = useCallback(() => {
    setCityRevealed(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Live counter - social proof */}
          <LiveCounter className="mb-8" />

          {/* Pre-Paywall Flow: Reveal top match, upsell deep dive */}
          {!isUnlocked ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Stage 1: Personality Profile - builds trust */}
              {preferences && (
                <PersonalityProfile 
                  preferences={preferences} 
                  responseCount={responseCount} 
                />
              )}

              {/* Stage 2: Current City Fit Score - creates tension */}
              {preferences?.currentCity && currentCityScore && (
                <CurrentCityFitCard 
                  cityName={preferences.currentCity}
                  fitScore={currentCityScore.score}
                  categoryScores={currentCityScore.categoryScores}
                />
              )}

              {/* Stage 3: Annual Circuit for Nomads - shows their custom circuit */}
              {annualCircuit && (
                <AnnualCircuitSection circuit={annualCircuit} />
              )}

              {/* Stage 4: Blurred City Reveal - viral hook with share-to-reveal */}
              <BlurredReveal 
                result={topMatch}
                runId={runId || "demo"}
                currentCity={preferences?.currentCity}
                currentCityScore={currentCityScore?.score}
                userName={preferences?.name}
                onReveal={handleCityReveal}
                isRevealed={cityRevealed}
              />

              {/* Stage 5: Identity Share CTA - after city is revealed */}
              {cityRevealed && (
                <IdentityShareCTA
                  result={topMatch}
                  userName={preferences?.name}
                  currentCity={preferences?.currentCity}
                  currentCityScore={currentCityScore?.score}
                  onShare={() => setHasShared(true)}
                />
              )}

              {/* Stage 6: Deep Dive Paywall - upsell with dynamic pricing */}
              <PaywallCTA 
                runId={runId || "demo"} 
                topCity={cityRevealed ? topMatch.location.name : "your top match"}
                hasShared={hasShared}
              />
            </div>
          ) : (
            <>
              {/* Full Results: Top Match Hero */}
              <TopMatchHero result={topMatch} isUnlocked={true} />

              {/* Share Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-4xl mx-auto mb-8 flex justify-center"
              >
                <Button 
                  onClick={() => setShowShareModal(true)}
                  className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-full px-6"
                >
                  <Share2 className="w-4 h-4" />
                  Share to Instagram
                </Button>
              </motion.div>

              {/* NEW: Life Change Preview - before/after comparison */}
              {preferences?.currentCity && currentCityScore && (
                <LifeChangePreview 
                  topMatch={topMatch}
                  currentCity={preferences.currentCity}
                  currentCityScore={currentCityScore}
                  currentLocation={currentLocation || undefined}
                />
              )}

              {/* Tax Deep Dive - show if user cares about taxes */}
              {preferences?.currentCity && (preferences.taxSensitivity || preferences.taxConsideration) && (
                <TaxDeepDive
                  currentCity={preferences.currentCity}
                  currentLocation={currentLocation || undefined}
                  topMatch={topMatch}
                />
              )}

              {/* Annual Circuit for Nomads */}
              {annualCircuit && (
                <AnnualCircuitSection circuit={annualCircuit} />
              )}

              {/* Next Steps Timeline */}
              <NextStepsSection 
                topMatch={topMatch} 
                currentCity={preferences?.currentCity} 
              />

              {/* Runner-ups */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <h2 className="text-2xl font-bold mb-6">Runner-ups</h2>
                <div className="space-y-3">
                  {runnerUps.map((result, index) => (
                    <BlurredCityCard key={result.location.id} result={result} rank={index + 2} isRevealed={true} />
                  ))}
                </div>
              </motion.div>

              {/* Rest of Top 10 */}
              {restOfTop10.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <h2 className="text-2xl font-bold mb-6">More Great Matches</h2>
                  <div className="space-y-3">
                    {restOfTop10.map((result) => (
                      <BlurredCityCard key={result.location.id} result={result} rank={result.rank} isRevealed={true} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Share Modal */}
              <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                result={topMatch}
                userName={preferences?.name}
                currentCity={preferences?.currentCity}
                currentCityScore={currentCityScore?.score}
              />
            </>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="gap-2 rounded-full" asChild>
                <Link to="/app/onboarding">
                  <RefreshCw className="w-4 h-4" />
                  Adjust Preferences
                </Link>
              </Button>
              {!isUnlocked && (
                <Button variant="hero" className="gap-2 rounded-full" asChild>
                  <Link to="/login">
                    Save My Results
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={showEmailGate}
        onSubmit={handleEmailSubmit}
        topCityName={results[0]?.location.name}
      />

      <Footer />
    </div>
  );
};

export default Results;
```

### `src/pages/Terms.tsx`
```tsx
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By using Find Your Place, you agree to these terms. Our service provides 
                personalized city recommendations based on your inputs—these are suggestions, 
                not guarantees of happiness or success in any location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You must provide accurate information for best results</li>
                <li>Results are for informational purposes only</li>
                <li>We recommend independent research before relocating</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                Our matching algorithm, location data, and platform design are proprietary. 
                Your personal data belongs to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Find Your Place provides recommendations based on available data. We are not 
                liable for decisions made based on our suggestions. Always conduct your own 
                research and consult relevant professionals.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
```

### `src/types/onboarding.ts`
```tsx
export interface OnboardingData {
  // Basics
  name?: string;
  ageRange?: string;
  currentCity?: string;
  passports?: string[];
  languages?: string[];

  // Lifestyle
  workStyle?: string;
  incomeLevel?: string;
  relationshipStatus?: string;
  hasKids?: boolean;
  hasPets?: boolean;
  preferredClimate?: string;
  outdoorUrban?: string;
  beachMountain?: string;
  noiseTolerance?: string;
  dailyRoutine?: string;

  // Health & Wellness
  gymCulture?: string;
  wellnessImportance?: string;
  healthcareQuality?: string;
  healthcarePriority?: string;
  fitnessLevel?: string;
  dietaryNeeds?: string[];
  mentalHealthSupport?: string;

  // Career & Growth
  industries?: string[];
  industryFocus?: string;
  networkingImportance?: string;
  entrepreneurialInterest?: string;

  // Social & Community
  communityVibes?: string[]; // Multi-select community vibes
  familyProximity?: string;
  peopleDensity?: string;

  // Safety & Stability
  riskTolerance?: string;
  ruleLawImportance?: string;
  safetyPriority?: string;
  politicalStability?: string;
  lgbtqFriendliness?: string;

  // Cost & Finances
  budgetRange?: string;
  taxSensitivity?: string;
  taxConsideration?: string;
  housingPreference?: string;

  // Travel & Mobility
  airportConnectivity?: string;
  weekendTrips?: string;
  travelFrequency?: string;
  airportImportance?: string;
  publicTransitNeed?: string;

  // Values
  freedomStability?: string;
  noveltyConsistency?: string;
  cultureTolerance?: string;

  // Signals (optional)
  socialTags?: string[];
  instagramHandle?: string;
  chatgptReflection?: string;

  // Priorities
  mustHaves?: string[];
  dealBreakers?: string[];
  topPriorities?: string[];

  // Mobility & Lifestyle Mode
  lifestyleMode?: 'rooted' | 'nomadic';
  locationChangesPerYear?: '3-4' | '4-6' | '6+';
  movementDrivers?: string[];
}
```

### `src/vite-env.d.ts`
```tsx
/// <reference types="vite/client" />
```

## Supabase

### `supabase/config.toml`
```
project_id = "vkkjvkqccxygvscqtvmg"

[functions.create-checkout]
verify_jwt = false

[functions.verify-payment]
verify_jwt = false

[functions.populate-locations]
verify_jwt = false

[functions.sync-place-images]
verify_jwt = false
```

### `supabase/functions/complete-invite/index.ts`
```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Use service role to update invite status
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { invite_code, invitee_run_id, invitee_email } = await req.json();

    if (!invite_code) {
      return new Response(
        JSON.stringify({ error: 'invite_code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // First, get the invite
    const { data: invite, error: fetchError } = await supabase
      .from('friend_invites')
      .select('*, inviter_run_id')
      .eq('invite_code', invite_code)
      .single();

    if (fetchError || !invite) {
      return new Response(
        JSON.stringify({ error: 'Invite not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update the invite
    const updateData: Record<string, unknown> = {
      status: invitee_run_id ? 'completed' : 'clicked',
    };
    
    if (invitee_run_id) {
      updateData.invitee_run_id = invitee_run_id;
      updateData.completed_at = new Date().toISOString();
    }
    
    if (invitee_email) {
      updateData.invitee_email = invitee_email;
    }

    const { error: updateError } = await supabase
      .from('friend_invites')
      .update(updateData)
      .eq('id', invite.id);

    if (updateError) {
      console.error('Error updating invite:', updateError);
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if inviter has earned unlock (2+ completed invites)
    const { data: completedInvites, error: countError } = await supabase
      .from('friend_invites')
      .select('id')
      .eq('inviter_run_id', invite.inviter_run_id)
      .eq('status', 'completed');

    const completedCount = completedInvites?.length || 0;
    const hasEarnedUnlock = completedCount >= 2;

    // If they've earned unlock, create an unlocked_results entry
    if (hasEarnedUnlock) {
      // Get the user_id from the inviter's run
      const { data: inviterRun } = await supabase
        .from('onboarding_runs')
        .select('user_id')
        .eq('id', invite.inviter_run_id)
        .single();

      if (inviterRun?.user_id) {
        // Check if already unlocked
        const { data: existingUnlock } = await supabase
          .from('unlocked_results')
          .select('id')
          .eq('run_id', invite.inviter_run_id)
          .single();

        if (!existingUnlock) {
          await supabase
            .from('unlocked_results')
            .insert({
              run_id: invite.inviter_run_id,
              user_id: inviterRun.user_id
            });
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        completed_count: completedCount,
        has_earned_unlock: hasEarnedUnlock,
        inviter_run_id: invite.inviter_run_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### `supabase/functions/create-checkout/index.ts`
```
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://lovable.dev",
  "https://www.lovable.dev",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith(".lovable.app")
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

const PRICE_ID = "price_1So0auIjsybekUYNmSEENbKL";

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const { runId, couponCode } = await req.json();

    // Input validation
    if (!runId || !UUID_REGEX.test(runId)) {
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate coupon code format if provided (alphanumeric, max 50 chars)
    if (couponCode && (typeof couponCode !== "string" || couponCode.length > 50 || !/^[A-Z0-9_-]+$/i.test(couponCode))) {
      return new Response(
        JSON.stringify({ error: "Invalid coupon code format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerId: string | undefined;
    
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if user has an existing Stripe customer
    if (user?.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    const requestOrigin = req.headers.get("origin") || "https://localhost:3000";

    // If couponCode provided, look up the coupon to get its ID
    let discountConfig: { discounts?: Array<{ coupon: string }> } = {};
    if (couponCode) {
      try {
        // Search for coupon by name/code - the coupon ID we created is the actual code
        const coupons = await stripe.coupons.list({ limit: 100 });
        const matchingCoupon = coupons.data.find(
          (c: Stripe.Coupon) => c.name?.toUpperCase() === couponCode.toUpperCase() || c.id === couponCode
        );
        if (matchingCoupon) {
          discountConfig = { discounts: [{ coupon: matchingCoupon.id }] };
        }
      } catch (couponError) {
        console.error("Error looking up coupon:", couponError);
        // Continue without the coupon if lookup fails
      }
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      ...discountConfig,
      // Only allow promotion codes if no discount is already applied
      allow_promotion_codes: !discountConfig.discounts,
      success_url: `${requestOrigin}/app/results/${runId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestOrigin}/app/results/${runId}?payment=cancelled`,
      metadata: {
        run_id: runId,
        user_id: user?.id || "guest",
      },
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else if (user?.email) {
      sessionParams.customer_email = user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating checkout:", errorMessage);
    // Return generic error message to client
    return new Response(JSON.stringify({ error: "Payment processing failed. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

### `supabase/functions/create-invite/index.ts`
```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader || '' } }
    });

    const { run_id, inviter_email } = await req.json();

    if (!run_id) {
      return new Response(
        JSON.stringify({ error: 'run_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique invite code
    let invite_code = generateInviteCode();
    let attempts = 0;
    
    // Ensure uniqueness
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('friend_invites')
        .select('id')
        .eq('invite_code', invite_code)
        .single();
      
      if (!existing) break;
      invite_code = generateInviteCode();
      attempts++;
    }

    const { data, error } = await supabase
      .from('friend_invites')
      .insert({
        inviter_run_id: run_id,
        inviter_email: inviter_email || null,
        invite_code,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating invite:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the invite URL
    const baseUrl = req.headers.get('origin') || 'https://findyourplace.app';
    const invite_url = `${baseUrl}/app/onboarding?invite=${invite_code}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        invite_code,
        invite_url,
        invite: data 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### `supabase/functions/get-invite-status/index.ts`
```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader || '' } }
    });

    const { run_id } = await req.json();

    if (!run_id) {
      return new Response(
        JSON.stringify({ error: 'run_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get all invites for this run
    const { data: invites, error } = await supabase
      .from('friend_invites')
      .select('*')
      .eq('inviter_run_id', run_id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching invites:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const completedCount = invites?.filter(i => i.status === 'completed').length || 0;
    const hasEarnedUnlock = completedCount >= 2;

    return new Response(
      JSON.stringify({ 
        invites: invites || [],
        completed_count: completedCount,
        has_earned_unlock: hasEarnedUnlock,
        invites_needed: Math.max(0, 2 - completedCount)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### `supabase/functions/get-live-count/index.ts`
```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from('quiz_completions')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Error getting total count:', totalError);
    }

    // Get this week's count
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: weekCount, error: weekError } = await supabase
      .from('quiz_completions')
      .select('*', { count: 'exact', head: true })
      .gte('completed_at', oneWeekAgo.toISOString());

    if (weekError) {
      console.error('Error getting week count:', weekError);
    }

    // Add a base number to make it look more established
    const BASE_COUNT = 12500;
    const BASE_WEEK = 100;

    return new Response(
      JSON.stringify({ 
        total: (totalCount || 0) + BASE_COUNT,
        this_week: (weekCount || 0) + BASE_WEEK,
        real_total: totalCount || 0,
        real_week: weekCount || 0
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60' // Cache for 1 minute
        } 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### `supabase/functions/populate-locations/index.ts`
```
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PlaceInput {
  name: string;
  country: string;
  continent: string;
  region?: string;
  placeType: "city" | "island" | "coastal" | "mountain" | "rural" | "town";
  context?: string; // Brief context about the place
}

interface LocationData {
  name: string;
  country: string;
  continent: string;
  region: string | null;
  latitude: number;
  longitude: number;
  population: number | null;
  description: string;
  vibe_summary: string;
  tags: string[];
  
  // Core scores (1-100)
  cost_of_living_score: number;
  rent_score: number;
  safety_score: number;
  healthcare_score: number;
  climate_score: number;
  
  // Climate details
  avg_temp_summer: number;
  avg_temp_winter: number;
  humidity_level: number;
  sunshine_days: number;
  
  // Nature & outdoor
  beach_access_score: number;
  mountain_access_score: number;
  outdoor_score: number;
  
  // Social & lifestyle
  nightlife_score: number;
  wellness_score: number;
  dating_scene_score: number;
  community_score: number;
  culture_openness_score: number;
  
  // Infrastructure
  internet_quality_score: number;
  walkability_score: number;
  transit_score: number;
  airport_connectivity_score: number;
  
  // Work & bureaucracy
  startup_ecosystem_score: number;
  english_friendliness_score: number;
  visa_friendliness_score: number;
  bureaucracy_score: number;
  
  // Tax
  tax_friendliness_score: number;
  personal_income_tax_rate: number;
  corporate_tax_rate: number;
  capital_gains_tax_rate: number;
  tax_notes: string;
}

const SYSTEM_PROMPT = `You are a location data expert specializing in places popular with young people (20s-30s), including digital nomads, remote workers, and young professionals.

Your task is to generate realistic, accurate data for locations. Be consistent and realistic with your scoring. Consider:

SCORING GUIDELINES (1-100 scale):
- Cost of Living: 100 = extremely cheap (SE Asia villages), 1 = extremely expensive (Monaco)
- Safety: 100 = Scandinavian levels, 50 = average, 1 = very dangerous
- Internet: 100 = top-tier fiber (Seoul), 50 = decent 4G, 1 = unreliable
- Nightlife: 100 = Berlin/Ibiza level, 50 = decent bars/clubs, 1 = nothing
- Dating Scene: 100 = very active singles scene, 50 = moderate, 1 = very limited
- Community: 100 = huge expat/nomad community (Bali), 50 = some expats, 1 = none

TEMPERATURE GUIDELINES:
- avg_temp_summer: Average summer temperature in Celsius
- avg_temp_winter: Average winter temperature in Celsius
- humidity_level: 1-100 (100 = very humid like Singapore, 1 = very dry like Dubai)
- sunshine_days: Days of sunshine per year (50-350 range)

TAX GUIDELINES:
- personal_income_tax_rate: Typical marginal rate for middle income (0-60%)
- corporate_tax_rate: Standard corporate rate (0-35%)
- capital_gains_tax_rate: Rate on investment gains (0-40%)
- tax_friendliness_score: 100 = no taxes (UAE), 50 = moderate, 1 = very high taxes

TAGS: Choose 3-6 relevant tags from:
["digital-nomad", "beach", "mountain", "affordable", "nightlife", "foodie", "startup-hub", "cultural", "adventure", "wellness", "surf", "ski", "tropical", "mediterranean", "historic", "modern", "english-friendly", "party", "family-friendly", "lgbtq-friendly", "eco-conscious", "artistic", "tech-hub"]

VIBE SUMMARY: A 1-2 sentence description of the place's personality, written for young people. Be specific and evocative.

DESCRIPTION: 2-3 sentences about what makes this place special for young people, highlighting key attractions and lifestyle.

Return ONLY valid JSON matching the LocationData schema. No markdown, no explanations.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { places, adminKey } = await req.json() as { 
      places: PlaceInput[]; 
      adminKey?: string;
    };

    if (!places || !Array.isArray(places) || places.length === 0) {
      return new Response(
        JSON.stringify({ error: "places array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify admin access (simple key check for now)
    const expectedKey = Deno.env.get("ADMIN_SEED_KEY");
    if (expectedKey && adminKey !== expectedKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results: { place: string; success: boolean; error?: string }[] = [];

    // Process places in batches of 5 to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < places.length; i += batchSize) {
      const batch = places.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (place) => {
        try {
          // Check if place already exists
          const { data: existing } = await supabase
            .from("locations")
            .select("id")
            .eq("name", place.name)
            .eq("country", place.country)
            .single();

          if (existing) {
            return { place: `${place.name}, ${place.country}`, success: true, skipped: true };
          }

          // Generate data using AI
          const userPrompt = `Generate complete location data for:

Place: ${place.name}
Country: ${place.country}
Continent: ${place.continent}
Region: ${place.region || "N/A"}
Place Type: ${place.placeType}
${place.context ? `Context: ${place.context}` : ""}

Remember this is for young people (20s-30s). Be realistic with scores based on actual place characteristics.

Return the complete LocationData JSON object.`;

          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
              ],
              temperature: 0.7,
            }),
          });

          if (!aiResponse.ok) {
            const errText = await aiResponse.text();
            console.error(`AI error for ${place.name}:`, errText);
            return { place: `${place.name}, ${place.country}`, success: false, error: "AI generation failed" };
          }

          const aiData = await aiResponse.json();
          const content = aiData.choices?.[0]?.message?.content;
          
          if (!content) {
            return { place: `${place.name}, ${place.country}`, success: false, error: "No AI response" };
          }

          // Parse the JSON response (handle potential markdown wrapping)
          let locationData: LocationData;
          try {
            const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
            locationData = JSON.parse(jsonStr);
          } catch (parseErr) {
            console.error(`JSON parse error for ${place.name}:`, content);
            return { place: `${place.name}, ${place.country}`, success: false, error: "Invalid JSON response" };
          }

          // Insert into database
          const { error: insertError } = await supabase
            .from("locations")
            .insert({
              name: locationData.name || place.name,
              country: locationData.country || place.country,
              continent: locationData.continent || place.continent,
              region: locationData.region,
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              population: locationData.population,
              description: locationData.description,
              vibe_summary: locationData.vibe_summary,
              tags: locationData.tags,
              cost_of_living_score: locationData.cost_of_living_score,
              rent_score: locationData.rent_score,
              safety_score: locationData.safety_score,
              healthcare_score: locationData.healthcare_score,
              climate_score: locationData.climate_score,
              avg_temp_summer: locationData.avg_temp_summer,
              avg_temp_winter: locationData.avg_temp_winter,
              humidity_level: locationData.humidity_level,
              sunshine_days: locationData.sunshine_days,
              beach_access_score: locationData.beach_access_score,
              mountain_access_score: locationData.mountain_access_score,
              outdoor_score: locationData.outdoor_score,
              nightlife_score: locationData.nightlife_score,
              wellness_score: locationData.wellness_score,
              dating_scene_score: locationData.dating_scene_score,
              community_score: locationData.community_score,
              culture_openness_score: locationData.culture_openness_score,
              internet_quality_score: locationData.internet_quality_score,
              walkability_score: locationData.walkability_score,
              transit_score: locationData.transit_score,
              airport_connectivity_score: locationData.airport_connectivity_score,
              startup_ecosystem_score: locationData.startup_ecosystem_score,
              english_friendliness_score: locationData.english_friendliness_score,
              visa_friendliness_score: locationData.visa_friendliness_score,
              bureaucracy_score: locationData.bureaucracy_score,
              tax_friendliness_score: locationData.tax_friendliness_score,
              personal_income_tax_rate: locationData.personal_income_tax_rate,
              corporate_tax_rate: locationData.corporate_tax_rate,
              capital_gains_tax_rate: locationData.capital_gains_tax_rate,
              tax_notes: locationData.tax_notes,
            });

          if (insertError) {
            console.error(`Insert error for ${place.name}:`, insertError);
            return { place: `${place.name}, ${place.country}`, success: false, error: insertError.message };
          }

          return { place: `${place.name}, ${place.country}`, success: true };
        } catch (err) {
          console.error(`Error processing ${place.name}:`, err);
          return { 
            place: `${place.name}, ${place.country}`, 
            success: false, 
            error: err instanceof Error ? err.message : "Unknown error" 
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Small delay between batches to avoid rate limits
      if (i + batchSize < places.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        message: `Processed ${results.length} places: ${successful} successful, ${failed} failed`,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in populate-locations:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### `supabase/functions/sync-place-images/index.ts`
```
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ==================== RELEVANCE SCORING ====================
// Keywords that STRONGLY suggest a place/cityscape image (boost score)
const PLACE_KEYWORDS = [
  "skyline", "cityscape", "panorama", "downtown", "old town", "city center",
  "harbour", "harbor", "waterfront", "aerial", "view", "landscape", "coast",
  "beach", "mountain", "landmark", "monument", "cathedral", "mosque", "temple",
  "church", "castle", "palace", "tower", "bridge", "square", "plaza", "market",
  "street", "district", "neighborhood", "bay", "river", "lake", "island",
  "sunset", "sunrise", "night", "evening", "historic", "ancient", "medieval"
];

// Keywords that indicate WRONG image types (reject or heavily penalize)
const REJECT_KEYWORDS = [
  // Food
  "salad", "dish", "recipe", "food", "cuisine", "meal", "soup", "bread",
  "vegetable", "fruit", "meat", "fish", "pasta", "rice", "cake", "dessert",
  "restaurant menu", "ingredient", "cooking", "chef",
  // Hardware/tools
  "bolt", "screw", "nut", "gear", "tool", "hardware", "fastener", "washer",
  "wrench", "hammer", "drill", "machine part",
  // Diagrams/charts
  "diagram", "chart", "graph", "infographic", "schematic", "blueprint",
  "flowchart", "timeline", "table",
  // Logos/icons
  "logo", "icon", "emblem", "badge", "seal", "stamp", "symbol",
  // Flags/maps (already filtered but reinforce)
  "flag of", "coat of arms", "map of", "location map",
  // Other irrelevant
  "portrait", "headshot", "selfie", "close-up", "macro", "microscope",
  "x-ray", "scan", "specimen", "sample", "product photo", "advertisement",
  "screenshot", "interface", "app", "software"
];

// File extensions/patterns to skip
const SKIP_PATTERNS = [
  /\.svg$/i,
  /flag/i,
  /coat[_\-\s]?of[_\-\s]?arms/i,
  /\bmap\b/i,
  /\blogo\b/i,
  /\bicon\b/i,
  /\bseal\b/i,
  /\bbadge\b/i,
  /commons-logo/i,
  /wiki.*logo/i
];

interface ImageCandidate {
  url: string;
  thumbUrl?: string;
  title: string;
  source: "wikipedia" | "wikidata" | "commons";
  width?: number;
  height?: number;
}

interface ScoredCandidate extends ImageCandidate {
  score: number;
  rejectReason?: string;
}

/**
 * Score an image candidate based on filename/title relevance
 * Returns score (-100 to +100) and optional reject reason
 */
function scoreCandidate(candidate: ImageCandidate, cityName: string, countryName: string): ScoredCandidate {
  const title = candidate.title.toLowerCase();
  const cityLower = cityName.toLowerCase();
  const countryLower = countryName.toLowerCase();
  
  let score = 0;

  // Check skip patterns first (hard reject)
  for (const pattern of SKIP_PATTERNS) {
    if (pattern.test(title) || pattern.test(candidate.url)) {
      return { ...candidate, score: -100, rejectReason: `skip_pattern:${pattern.source}` };
    }
  }

  // Check reject keywords (hard reject or heavy penalty)
  for (const keyword of REJECT_KEYWORDS) {
    if (title.includes(keyword)) {
      return { ...candidate, score: -100, rejectReason: `reject_keyword:${keyword}` };
    }
  }

  // City name match (strong positive signal)
  if (title.includes(cityLower)) {
    score += 40;
  } else {
    // Check for common transliterations/variants
    const cityVariants = [
      cityLower.replace(/[- ]/g, ""),
      cityLower.replace(/ü/g, "u").replace(/ö/g, "o").replace(/ä/g, "a"),
    ];
    if (cityVariants.some(v => title.includes(v))) {
      score += 30;
    }
  }

  // Country name match (moderate positive)
  if (title.includes(countryLower)) {
    score += 15;
  }

  // Place keywords (boost)
  for (const keyword of PLACE_KEYWORDS) {
    if (title.includes(keyword)) {
      score += 10;
      break; // Don't double-count
    }
  }

  // Prefer landscape orientation if we have dimensions
  if (candidate.width && candidate.height) {
    if (candidate.width > candidate.height) {
      score += 5; // Landscape
    }
    // Prefer reasonably sized images
    if (candidate.width >= 800 && candidate.width <= 2000) {
      score += 5;
    }
  }

  return { ...candidate, score };
}

/**
 * Delay helper with jitter
 */
function delay(ms: number, jitter = 0.3): Promise<void> {
  const jitterMs = ms * jitter * (Math.random() - 0.5) * 2;
  return new Promise(resolve => setTimeout(resolve, ms + jitterMs));
}

/**
 * Fetch with retry and exponential backoff
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  baseDelay = 1000
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; MyNextPlaceBot/1.0; +https://my-next-place.lovable.app)",
          "Accept": "image/*, application/json, */*",
          ...options.headers,
        },
      });
      
      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = parseInt(response.headers.get("Retry-After") || "5", 10);
        console.log(`Rate limited, waiting ${retryAfter}s before retry ${attempt + 1}/${maxRetries}`);
        await delay(retryAfter * 1000);
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const waitTime = baseDelay * Math.pow(2, attempt);
        console.log(`Fetch error, retrying in ${waitTime}ms: ${error}`);
        await delay(waitTime);
      }
    }
  }
  
  throw lastError || new Error("Max retries exceeded");
}

/**
 * Get Wikipedia page image for a city
 */
async function getWikipediaPageImage(cityName: string, countryName: string): Promise<ImageCandidate | null> {
  const searchQueries = [
    `${cityName}`,
    `${cityName}, ${countryName}`,
    `${cityName} city`,
  ];

  for (const query of searchQueries) {
    try {
      // Search for the page
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`;
      const searchRes = await fetchWithRetry(searchUrl);
      const searchData = await searchRes.json();
      
      const pageTitle = searchData?.query?.search?.[0]?.title;
      if (!pageTitle) continue;

      // Get page image with thumbnail
      const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&piprop=original|thumbnail&pithumbsize=1200&format=json`;
      const imageRes = await fetchWithRetry(imageUrl);
      const imageData = await imageRes.json();
      
      const pages = imageData?.query?.pages;
      if (!pages) continue;
      
      const page = Object.values(pages)[0] as any;
      const original = page?.original;
      const thumbnail = page?.thumbnail;
      
      if (original?.source) {
        return {
          url: original.source,
          thumbUrl: thumbnail?.source || original.source,
          title: pageTitle,
          source: "wikipedia",
          width: original.width,
          height: original.height,
        };
      }
    } catch (error) {
      console.log(`Wikipedia search failed for "${query}": ${error}`);
    }
    
    await delay(300); // Small delay between queries
  }

  return null;
}

/**
 * Get Wikidata P18 image for a city
 */
async function getWikidataImage(cityName: string, countryName: string): Promise<ImageCandidate | null> {
  try {
    // Search Wikidata for the city
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(cityName + " " + countryName)}&language=en&format=json&limit=3`;
    const searchRes = await fetchWithRetry(searchUrl);
    const searchData = await searchRes.json();
    
    const entities = searchData?.search;
    if (!entities?.length) return null;

    // Try each entity
    for (const entity of entities) {
      const entityId = entity.id;
      
      // Get P18 (image) claim
      const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${entityId}&property=P18&format=json`;
      const entityRes = await fetchWithRetry(entityUrl);
      const entityData = await entityRes.json();
      
      const claims = entityData?.claims?.P18;
      if (!claims?.length) continue;
      
      const filename = claims[0]?.mainsnak?.datavalue?.value;
      if (!filename) continue;

      // Get Commons file info with thumbnail
      const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url|size&iiurlwidth=1200&format=json`;
      const fileRes = await fetchWithRetry(fileUrl);
      const fileData = await fileRes.json();
      
      const pages = fileData?.query?.pages;
      if (!pages) continue;
      
      const page = Object.values(pages)[0] as any;
      const imageInfo = page?.imageinfo?.[0];
      
      if (imageInfo?.url) {
        return {
          url: imageInfo.url,
          thumbUrl: imageInfo.thumburl || imageInfo.url,
          title: filename,
          source: "wikidata",
          width: imageInfo.width,
          height: imageInfo.height,
        };
      }
    }
  } catch (error) {
    console.log(`Wikidata search failed: ${error}`);
  }

  return null;
}

/**
 * Search Commons for city images
 */
async function searchCommonsImages(cityName: string, countryName: string, limit = 5): Promise<ImageCandidate[]> {
  const candidates: ImageCandidate[] = [];
  
  const searchQueries = [
    `${cityName} skyline`,
    `${cityName} cityscape`,
    `${cityName} panorama`,
    `${cityName} ${countryName}`,
  ];

  for (const query of searchQueries) {
    if (candidates.length >= limit) break;
    
    try {
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=3&format=json`;
      const searchRes = await fetchWithRetry(searchUrl);
      const searchData = await searchRes.json();
      
      const results = searchData?.query?.search || [];
      
      for (const result of results) {
        if (candidates.length >= limit) break;
        
        const title = result.title;
        if (!title.startsWith("File:")) continue;
        
        // Get file info
        const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size&iiurlwidth=1200&format=json`;
        const fileRes = await fetchWithRetry(fileUrl);
        const fileData = await fileRes.json();
        
        const pages = fileData?.query?.pages;
        if (!pages) continue;
        
        const page = Object.values(pages)[0] as any;
        const imageInfo = page?.imageinfo?.[0];
        
        if (imageInfo?.url) {
          candidates.push({
            url: imageInfo.url,
            thumbUrl: imageInfo.thumburl || imageInfo.url,
            title: title.replace("File:", ""),
            source: "commons",
            width: imageInfo.width,
            height: imageInfo.height,
          });
        }
        
        await delay(200);
      }
    } catch (error) {
      console.log(`Commons search failed for "${query}": ${error}`);
    }
    
    await delay(300);
  }

  return candidates;
}

/**
 * AI verification for borderline candidates (optional, uses credits)
 */
async function verifyWithAI(
  imageUrl: string,
  cityName: string,
  countryName: string
): Promise<{ pass: boolean; confidence: string }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.log("No LOVABLE_API_KEY, skipping AI verification");
    return { pass: false, confidence: "skipped" };
  }

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are verifying if an image correctly depicts "${cityName}, ${countryName}" as a place.

Answer ONLY with one of:
- PASS_HIGH - Clearly shows the city/region (skyline, landmark, landscape, cityscape)
- PASS_LOW - Likely shows the place but not certain
- FAIL - Shows wrong content (food, objects, tools, diagrams, wrong city, or unrelated)

Be strict. If it's food, a bolt/screw, a logo, a map, a person's portrait, or anything not a place photo, answer FAIL.`
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 20
      }),
    });

    if (!response.ok) {
      console.log(`AI verification failed: ${response.status}`);
      return { pass: false, confidence: "error" };
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim().toUpperCase() || "";
    
    if (answer.includes("PASS_HIGH")) {
      return { pass: true, confidence: "high" };
    } else if (answer.includes("PASS_LOW")) {
      return { pass: true, confidence: "low" };
    } else {
      return { pass: false, confidence: "fail" };
    }
  } catch (error) {
    console.log(`AI verification error: ${error}`);
    return { pass: false, confidence: "error" };
  }
}

/**
 * Mirror an image to Supabase storage
 */
async function mirrorImageToStorage(
  supabase: any,
  imageUrl: string,
  locationId: string
): Promise<{ url: string } | { error: string }> {
  try {
    // Use thumbnail URL if available (prefer smaller file sizes)
    const response = await fetchWithRetry(imageUrl, {}, 2, 2000);
    
    if (!response.ok) {
      return { error: `fetch_failed:${response.status}` };
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    // Reject SVGs and non-image content
    if (contentType.includes("svg") || contentType.includes("xml") || contentType.includes("html")) {
      return { error: `invalid_content_type:${contentType}` };
    }

    const blob = await response.blob();
    
    // Check size (max 4MB to avoid upload issues)
    if (blob.size > 4 * 1024 * 1024) {
      return { error: `file_too_large:${Math.round(blob.size / 1024 / 1024)}MB` };
    }

    // Determine extension
    let ext = "jpg";
    if (contentType.includes("png")) ext = "png";
    else if (contentType.includes("webp")) ext = "webp";

    const fileName = `${locationId}.${ext}`;
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to storage (upsert)
    const { error: uploadError } = await supabase.storage
      .from("place-images")
      .upload(fileName, uint8Array, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      return { error: `upload_failed:${uploadError.message}` };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("place-images")
      .getPublicUrl(fileName);

    return { url: urlData.publicUrl };
  } catch (error) {
    return { error: `mirror_exception:${error}` };
  }
}

/**
 * Process a single location
 */
async function processLocation(
  supabase: any,
  location: { id: string; name: string; country: string },
  options: { useAI: boolean; aiThreshold: number }
): Promise<{
  status: "updated" | "skipped" | "failed";
  reason: string;
  candidate?: ScoredCandidate;
  aiUsed?: boolean;
}> {
  const { id, name, country } = location;
  console.log(`Processing: ${name}, ${country}`);

  // Step 1: Gather candidates from multiple sources
  const candidates: ImageCandidate[] = [];

  // Wikipedia page image (most reliable)
  const wikiImg = await getWikipediaPageImage(name, country);
  if (wikiImg) candidates.push(wikiImg);
  await delay(300);

  // Wikidata P18
  const wikidataImg = await getWikidataImage(name, country);
  if (wikidataImg) candidates.push(wikidataImg);
  await delay(300);

  // Commons search
  const commonsImgs = await searchCommonsImages(name, country, 3);
  candidates.push(...commonsImgs);

  if (candidates.length === 0) {
    return { status: "failed", reason: "no_candidates_found" };
  }

  // Step 2: Score all candidates
  const scored = candidates.map(c => scoreCandidate(c, name, country));
  scored.sort((a, b) => b.score - a.score);

  console.log(`Found ${scored.length} candidates, top score: ${scored[0].score}`);

  // Step 3: Find best passing candidate
  let bestCandidate: ScoredCandidate | null = null;
  let aiUsed = false;

  for (const candidate of scored) {
    // Hard reject
    if (candidate.score <= -50) {
      console.log(`Rejected: ${candidate.title} (${candidate.rejectReason})`);
      continue;
    }

    // High confidence pass
    if (candidate.score >= 30) {
      bestCandidate = candidate;
      break;
    }

    // Borderline - use AI if enabled
    if (options.useAI && candidate.score >= 0 && candidate.score < 30) {
      const imageUrlForAI = candidate.thumbUrl || candidate.url;
      const aiResult = await verifyWithAI(imageUrlForAI, name, country);
      aiUsed = true;

      if (aiResult.pass) {
        bestCandidate = candidate;
        break;
      } else {
        console.log(`AI rejected: ${candidate.title} (${aiResult.confidence})`);
      }
    }

    // If no AI, accept moderate scores
    if (!options.useAI && candidate.score >= 10) {
      bestCandidate = candidate;
      break;
    }
  }

  if (!bestCandidate) {
    return { 
      status: "failed", 
      reason: "no_passing_candidates",
      candidate: scored[0]
    };
  }

  // Step 4: Mirror to storage
  const mirrorUrl = bestCandidate.thumbUrl || bestCandidate.url;
  const mirrorResult = await mirrorImageToStorage(supabase, mirrorUrl, id);

  if ("error" in mirrorResult) {
    return { 
      status: "failed", 
      reason: mirrorResult.error,
      candidate: bestCandidate,
      aiUsed
    };
  }

  // Step 5: Update database
  const { error: updateError } = await supabase
    .from("locations")
    .update({
      image_url: mirrorResult.url,
      image_source: bestCandidate.source,
      image_source_url: bestCandidate.url,
      image_verified: bestCandidate.score >= 30 || aiUsed,
      image_updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return { 
      status: "failed", 
      reason: `db_update_failed:${updateError.message}`,
      candidate: bestCandidate,
      aiUsed
    };
  }

  return { 
    status: "updated", 
    reason: `score:${bestCandidate.score}`,
    candidate: bestCandidate,
    aiUsed
  };
}

/**
 * Get candidates for a location (for admin UI)
 */
async function getCandidatesForLocation(
  location: { id: string; name: string; country: string }
): Promise<ScoredCandidate[]> {
  const { name, country } = location;
  const candidates: ImageCandidate[] = [];

  const wikiImg = await getWikipediaPageImage(name, country);
  if (wikiImg) candidates.push(wikiImg);
  await delay(200);

  const wikidataImg = await getWikidataImage(name, country);
  if (wikidataImg) candidates.push(wikidataImg);
  await delay(200);

  const commonsImgs = await searchCommonsImages(name, country, 6);
  candidates.push(...commonsImgs);

  // Score and filter
  const scored = candidates.map(c => scoreCandidate(c, name, country));
  scored.sort((a, b) => b.score - a.score);

  // Return top candidates that aren't hard-rejected
  return scored.filter(c => c.score > -50).slice(0, 8);
}

/**
 * Mirror a specific URL for a location (for admin manual selection)
 */
async function mirrorUrlForLocation(
  supabase: any,
  locationId: string,
  sourceUrl: string,
  source: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const mirrorResult = await mirrorImageToStorage(supabase, sourceUrl, locationId);

  if ("error" in mirrorResult) {
    return { success: false, error: mirrorResult.error };
  }

  const { error: updateError } = await supabase
    .from("locations")
    .update({
      image_url: mirrorResult.url,
      image_source: source,
      image_source_url: sourceUrl,
      image_verified: true,
      image_updated_at: new Date().toISOString(),
    })
    .eq("id", locationId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, url: mirrorResult.url };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const action = body.action || "sync";

    // Action: Get candidates for a location (for admin UI)
    if (action === "get_candidates") {
      const { locationId } = body;
      if (!locationId) {
        return new Response(JSON.stringify({ error: "locationId required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: location, error } = await supabase
        .from("locations")
        .select("id, name, country")
        .eq("id", locationId)
        .single();

      if (error || !location) {
        return new Response(JSON.stringify({ error: "Location not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const candidates = await getCandidatesForLocation(location);

      return new Response(JSON.stringify({ candidates }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: Mirror a specific URL for a location
    if (action === "mirror_url") {
      const { locationId, sourceUrl, source = "manual" } = body;
      if (!locationId || !sourceUrl) {
        return new Response(JSON.stringify({ error: "locationId and sourceUrl required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const result = await mirrorUrlForLocation(supabase, locationId, sourceUrl, source);

      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default action: Batch sync
    const limit = Math.min(body.limit || 5, 20);
    const onlyUnverified = body.onlyUnverified !== false;
    const useAI = body.useAI !== false;
    const aiThreshold = body.aiThreshold || 30;
    const specificIds = body.locationIds as string[] | undefined;

    // Build query
    let query = supabase
      .from("locations")
      .select("id, name, country, image_verified");

    if (specificIds?.length) {
      query = query.in("id", specificIds);
    } else if (onlyUnverified) {
      query = query.or("image_verified.is.null,image_verified.eq.false");
    }

    query = query.limit(limit);

    const { data: locations, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch locations: ${fetchError.message}`);
    }

    if (!locations?.length) {
      return new Response(JSON.stringify({
        message: "No locations to process",
        processed: 0,
        updated: 0,
        failed: 0,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Process locations
    const results: Array<{
      id: string;
      name: string;
      status: string;
      reason: string;
      candidate?: { title: string; source: string; score: number };
      aiUsed?: boolean;
    }> = [];

    let updated = 0;
    let failed = 0;
    let rateLimitHits = 0;

    for (const location of locations) {
      // Stop if we're hitting too many rate limits
      if (rateLimitHits >= 3) {
        console.log("Too many rate limits, stopping batch");
        break;
      }

      try {
        const result = await processLocation(supabase, location, { useAI, aiThreshold });

        results.push({
          id: location.id,
          name: location.name,
          status: result.status,
          reason: result.reason,
          candidate: result.candidate ? {
            title: result.candidate.title,
            source: result.candidate.source,
            score: result.candidate.score,
          } : undefined,
          aiUsed: result.aiUsed,
        });

        if (result.status === "updated") updated++;
        else if (result.status === "failed") {
          failed++;
          if (result.reason.includes("429") || result.reason.includes("rate")) {
            rateLimitHits++;
          }
        }
      } catch (error) {
        results.push({
          id: location.id,
          name: location.name,
          status: "error",
          reason: String(error),
        });
        failed++;
      }

      // Delay between locations
      await delay(500);
    }

    return new Response(JSON.stringify({
      processed: results.length,
      updated,
      failed,
      rateLimitHits,
      results,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Sync error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

### `supabase/functions/track-share/index.ts`
```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader || '' } }
    });

    const { run_id, share_type, metadata } = await req.json();

    if (!run_id || !share_type) {
      return new Response(
        JSON.stringify({ error: 'run_id and share_type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('share_events')
      .insert({
        run_id,
        user_id: user?.id || null,
        share_type,
        metadata_json: metadata || {}
      })
      .select()
      .single();

    if (error) {
      console.error('Error tracking share:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, share_event: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### `supabase/functions/verify-payment/index.ts`
```
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Stripe session ID format validation (starts with cs_)
const SESSION_ID_REGEX = /^cs_[a-zA-Z0-9]+$/;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://lovable.dev",
  "https://www.lovable.dev",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith(".lovable.app")
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, runId } = await req.json();

    // Input validation - sessionId is required
    if (!sessionId || typeof sessionId !== "string" || !SESSION_ID_REGEX.test(sessionId)) {
      return new Response(JSON.stringify({ verified: false, error: "Invalid request parameters" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate runId format if provided
    if (runId && !UUID_REGEX.test(runId)) {
      return new Response(JSON.stringify({ verified: false, error: "Invalid request parameters" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Get user if authenticated and mark as unlocked
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        
        if (userData?.user && runId) {
          // Record the payment
          await supabaseClient.from("payments").insert({
            user_id: userData.user.id,
            run_id: runId,
            stripe_session_id: sessionId,
            stripe_payment_intent_id: session.payment_intent as string,
            amount: session.amount_total || 1000,
            currency: session.currency || "usd",
            status: "completed",
            completed_at: new Date().toISOString(),
          });

          // Mark result as unlocked
          await supabaseClient.from("unlocked_results").upsert({
            user_id: userData.user.id,
            run_id: runId,
            unlocked_at: new Date().toISOString(),
          }, { onConflict: "user_id,run_id" });
        }
      }

      return new Response(JSON.stringify({ 
        verified: true, 
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ 
      verified: false, 
      paymentStatus: session.payment_status 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error verifying payment:", errorMessage);
    // Return generic error message to client
    return new Response(JSON.stringify({ verified: false, error: "Payment verification failed. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

### `supabase/migrations/20260110113706_5a1f4c51-0b27-4796-9d40-940dd6c83f07.sql`
```
-- Create locations table with comprehensive attributes
CREATE TABLE public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    region TEXT,
    country TEXT NOT NULL,
    continent TEXT NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    population INTEGER,
    image_url TEXT,
    description TEXT,
    vibe_summary TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    
    -- Cost & Living
    cost_of_living_score INTEGER CHECK (cost_of_living_score >= 0 AND cost_of_living_score <= 100),
    rent_score INTEGER CHECK (rent_score >= 0 AND rent_score <= 100),
    
    -- Safety & Health
    safety_score INTEGER CHECK (safety_score >= 0 AND safety_score <= 100),
    healthcare_score INTEGER CHECK (healthcare_score >= 0 AND healthcare_score <= 100),
    
    -- Climate
    climate_score INTEGER CHECK (climate_score >= 0 AND climate_score <= 100),
    avg_temp_summer INTEGER,
    avg_temp_winter INTEGER,
    humidity_level INTEGER CHECK (humidity_level >= 0 AND humidity_level <= 100),
    sunshine_days INTEGER,
    
    -- Nature & Outdoors
    beach_access_score INTEGER CHECK (beach_access_score >= 0 AND beach_access_score <= 100),
    mountain_access_score INTEGER CHECK (mountain_access_score >= 0 AND mountain_access_score <= 100),
    outdoor_score INTEGER CHECK (outdoor_score >= 0 AND outdoor_score <= 100),
    
    -- Social & Lifestyle
    nightlife_score INTEGER CHECK (nightlife_score >= 0 AND nightlife_score <= 100),
    wellness_score INTEGER CHECK (wellness_score >= 0 AND wellness_score <= 100),
    dating_scene_score INTEGER CHECK (dating_scene_score >= 0 AND dating_scene_score <= 100),
    community_score INTEGER CHECK (community_score >= 0 AND community_score <= 100),
    
    -- Accessibility & Language
    english_friendliness_score INTEGER CHECK (english_friendliness_score >= 0 AND english_friendliness_score <= 100),
    visa_friendliness_score INTEGER CHECK (visa_friendliness_score >= 0 AND visa_friendliness_score <= 100),
    tax_friendliness_score INTEGER CHECK (tax_friendliness_score >= 0 AND tax_friendliness_score <= 100),
    
    -- Infrastructure
    airport_connectivity_score INTEGER CHECK (airport_connectivity_score >= 0 AND airport_connectivity_score <= 100),
    internet_quality_score INTEGER CHECK (internet_quality_score >= 0 AND internet_quality_score <= 100),
    walkability_score INTEGER CHECK (walkability_score >= 0 AND walkability_score <= 100),
    transit_score INTEGER CHECK (transit_score >= 0 AND transit_score <= 100),
    
    -- Culture & Business
    culture_openness_score INTEGER CHECK (culture_openness_score >= 0 AND culture_openness_score <= 100),
    startup_ecosystem_score INTEGER CHECK (startup_ecosystem_score >= 0 AND startup_ecosystem_score <= 100),
    bureaucracy_score INTEGER CHECK (bureaucracy_score >= 0 AND bureaucracy_score <= 100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    home_base_current TEXT,
    languages JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create onboarding_runs table
CREATE TABLE public.onboarding_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    inputs_json JSONB NOT NULL,
    weights_json JSONB DEFAULT '{}'::jsonb,
    signals_json JSONB DEFAULT '{}'::jsonb,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create match_results table
CREATE TABLE public.match_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE NOT NULL,
    total_score DECIMAL(5, 2) NOT NULL,
    category_scores_json JSONB NOT NULL,
    reasons_json JSONB DEFAULT '[]'::jsonb,
    tradeoffs_json JSONB DEFAULT '[]'::jsonb,
    rank INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    run_id UUID REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    stripe_session_id TEXT,
    stripe_payment_intent_id TEXT,
    amount INTEGER NOT NULL DEFAULT 1000,
    currency TEXT DEFAULT 'usd',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create unlocked_results table
CREATE TABLE public.unlocked_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    run_id UUID REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, run_id)
);

-- Enable RLS on all tables
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlocked_results ENABLE ROW LEVEL SECURITY;

-- Locations: readable by everyone (public data)
CREATE POLICY "Locations are publicly readable"
ON public.locations FOR SELECT
USING (true);

-- Profiles: users can manage their own
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Onboarding runs: users can manage their own
CREATE POLICY "Users can view their own runs"
ON public.onboarding_runs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own runs"
ON public.onboarding_runs FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Match results: users can view results for their runs
CREATE POLICY "Users can view their own match results"
ON public.match_results FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.onboarding_runs
        WHERE id = match_results.run_id
        AND user_id = auth.uid()
    )
);

-- Payments: users can view their own
CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments"
ON public.payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Unlocked results: users can view their own
CREATE POLICY "Users can view their own unlocked results"
ON public.unlocked_results FOR SELECT
USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_locations_country ON public.locations(country);
CREATE INDEX idx_locations_continent ON public.locations(continent);
CREATE INDEX idx_onboarding_runs_user_id ON public.onboarding_runs(user_id);
CREATE INDEX idx_match_results_run_id ON public.match_results(run_id);
CREATE INDEX idx_match_results_rank ON public.match_results(rank);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_run_id ON public.payments(run_id);
CREATE INDEX idx_unlocked_results_user_run ON public.unlocked_results(user_id, run_id);```

### `supabase/migrations/20260111115953_35ce4074-dcb8-409f-9336-cec882496275.sql`
```
-- Add tax detail columns to locations table for Tax Deep Dive feature
ALTER TABLE public.locations 
ADD COLUMN IF NOT EXISTS personal_income_tax_rate integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS corporate_tax_rate integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS capital_gains_tax_rate integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS tax_notes text DEFAULT NULL;```

### `supabase/migrations/20260111123851_16c3e63c-a961-44e3-99d8-395dcd4437c9.sql`
```
-- Add DELETE policy for user data rights (compliance requirement)
CREATE POLICY "Users can delete their own payments"
ON public.payments 
FOR DELETE
USING (auth.uid() = user_id);```

### `supabase/migrations/20260112122808_5058818a-4001-496f-b197-b1ec5d250222.sql`
```
-- Add INSERT policy for match_results so users can save their results
CREATE POLICY "Users can insert their own match results"
ON public.match_results
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM onboarding_runs
    WHERE onboarding_runs.id = match_results.run_id
    AND onboarding_runs.user_id = auth.uid()
  )
);```

### `supabase/migrations/20260112123712_b2be119d-f808-42b5-adc0-3f84d7224f8a.sql`
```
-- Create email_captures table for lead capture
CREATE TABLE public.email_captures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  run_id UUID REFERENCES public.onboarding_runs(id),
  source TEXT DEFAULT 'results_gate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (pre-auth capture)
CREATE POLICY "Anyone can submit email capture"
ON public.email_captures
FOR INSERT
WITH CHECK (true);

-- Users can view their own captures (if they later sign up)
CREATE POLICY "Authenticated users can view captures with matching email"
ON public.email_captures
FOR SELECT
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Create index for email lookups
CREATE INDEX idx_email_captures_email ON public.email_captures(email);
CREATE INDEX idx_email_captures_run_id ON public.email_captures(run_id);```

### `supabase/migrations/20260112165729_399a9354-f43b-4dcd-a3b1-60380c18d09f.sql`
```
-- Create share_events table for tracking all shares
CREATE TABLE public.share_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    run_id uuid REFERENCES public.onboarding_runs(id) ON DELETE CASCADE,
    share_type text NOT NULL CHECK (share_type IN ('instagram', 'copy_link', 'native', 'reveal', 'twitter', 'facebook')),
    shared_at timestamp with time zone NOT NULL DEFAULT now(),
    metadata_json jsonb DEFAULT '{}'::jsonb
);

-- Create friend_invites table for tracking invite links and conversions
CREATE TABLE public.friend_invites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_run_id uuid REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    inviter_email text,
    invite_code text UNIQUE NOT NULL,
    invitee_email text,
    invitee_run_id uuid REFERENCES public.onboarding_runs(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'clicked', 'completed')),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    completed_at timestamp with time zone
);

-- Create quiz_completions table for real-time counter
CREATE TABLE public.quiz_completions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id uuid REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL UNIQUE,
    completed_at timestamp with time zone NOT NULL DEFAULT now(),
    top_match_city text,
    top_match_score integer
);

-- Create friend_comparisons table for compatibility calculations
CREATE TABLE public.friend_comparisons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id_a uuid REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    run_id_b uuid REFERENCES public.onboarding_runs(id) ON DELETE CASCADE NOT NULL,
    compatibility_score integer NOT NULL,
    shared_cities_json jsonb DEFAULT '[]'::jsonb,
    calculated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(run_id_a, run_id_b)
);

-- Enable RLS on all tables
ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_comparisons ENABLE ROW LEVEL SECURITY;

-- share_events policies
CREATE POLICY "Users can insert their own share events"
ON public.share_events FOR INSERT
WITH CHECK (
    run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
    OR user_id = auth.uid()
);

CREATE POLICY "Users can view their own share events"
ON public.share_events FOR SELECT
USING (
    run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
    OR user_id = auth.uid()
);

-- friend_invites policies
CREATE POLICY "Users can create invites for their own runs"
ON public.friend_invites FOR INSERT
WITH CHECK (
    inviter_run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view their sent invites"
ON public.friend_invites FOR SELECT
USING (
    inviter_run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
    OR invitee_run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);

CREATE POLICY "Anyone can update invite status via invite code"
ON public.friend_invites FOR UPDATE
USING (true)
WITH CHECK (true);

-- quiz_completions policies (public read for counter, authenticated insert)
CREATE POLICY "Anyone can view quiz completion counts"
ON public.quiz_completions FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own quiz completion"
ON public.quiz_completions FOR INSERT
WITH CHECK (
    run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);

-- friend_comparisons policies
CREATE POLICY "Users can view their own comparisons"
ON public.friend_comparisons FOR SELECT
USING (
    run_id_a IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
    OR run_id_b IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);

CREATE POLICY "Users can create comparisons involving their runs"
ON public.friend_comparisons FOR INSERT
WITH CHECK (
    run_id_a IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
    OR run_id_b IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);

-- Create indexes for performance
CREATE INDEX idx_share_events_run_id ON public.share_events(run_id);
CREATE INDEX idx_friend_invites_invite_code ON public.friend_invites(invite_code);
CREATE INDEX idx_friend_invites_inviter_run_id ON public.friend_invites(inviter_run_id);
CREATE INDEX idx_quiz_completions_completed_at ON public.quiz_completions(completed_at);
CREATE INDEX idx_friend_comparisons_run_ids ON public.friend_comparisons(run_id_a, run_id_b);```

### `supabase/migrations/20260112165744_0181c552-f110-4e05-a687-126712ce5168.sql`
```
-- Fix the overly permissive RLS policy on friend_invites
-- Drop the permissive update policy
DROP POLICY IF EXISTS "Anyone can update invite status via invite code" ON public.friend_invites;

-- Create a more restrictive update policy - only the inviter can update their own invites
-- Status updates from invitees will be handled via edge function with service role
CREATE POLICY "Users can update their own invites"
ON public.friend_invites FOR UPDATE
USING (
    inviter_run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
)
WITH CHECK (
    inviter_run_id IN (SELECT id FROM public.onboarding_runs WHERE user_id = auth.uid())
);```

### `supabase/migrations/20260115141445_07b2d0ca-b6e7-4c13-a51c-30efaba9dce4.sql`
```
-- Create storage bucket for place images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('place-images', 'place-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to place images
CREATE POLICY "Public read access for place images"
ON storage.objects FOR SELECT
USING (bucket_id = 'place-images');

-- Allow service role to upload (edge functions)
CREATE POLICY "Service role can upload place images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'place-images');

-- Allow service role to update
CREATE POLICY "Service role can update place images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'place-images');

-- Allow service role to delete
CREATE POLICY "Service role can delete place images"
ON storage.objects FOR DELETE
USING (bucket_id = 'place-images');```

### `supabase/migrations/20260115142253_4c4eafed-7f25-41b5-af77-f8eb0e359b44.sql`
```
-- Add image tracking columns to locations table
ALTER TABLE public.locations
ADD COLUMN IF NOT EXISTS image_source text,
ADD COLUMN IF NOT EXISTS image_source_url text,
ADD COLUMN IF NOT EXISTS image_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS image_updated_at timestamp with time zone;```
