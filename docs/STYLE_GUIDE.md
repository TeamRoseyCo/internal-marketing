# Rosey Co Style Guide

## Design System: Refined Dark Luxury

### Brand Colors (HSL) - Red & Green Palette
```css
/* Primary Colors */
--brand-rose: hsl(0 75% 50%)         /* True red - primary */
--brand-green: hsl(130 65% 45%)      /* Leaf green - primary */

/* Secondary/Accent Colors */
--brand-crimson: hsl(355 70% 45%)    /* Deep crimson */
--brand-burgundy: hsl(350 65% 32%)   /* Dark burgundy */
--brand-scarlet: hsl(8 80% 55%)      /* Warm scarlet highlight */
--brand-forest: hsl(140 50% 30%)     /* Dark forest */
```

### Typography
- **Headlines (h1, h2, h3):** Fraunces (serif) - `font-serif`
- **Body text:** DM Sans (sans-serif) - `font-sans`
- **Headline sizes:**
  - h1: `text-5xl md:text-6xl lg:text-7xl xl:text-8xl`
  - h2: `text-4xl md:text-5xl lg:text-6xl`
  - Subheadings: `text-xl md:text-2xl`

### Gradient Text Classes
```jsx
// Hero gradient (rose red → crimson)
<span className="gradient-text">Text</span>

// Accent gradient (crimson → green)
<span className="gradient-accent-text">Text</span>
```

---

## Framer Motion Animation Patterns

### Animation Variants (import these)
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
```

### Standard Section Animation
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  transition={{ duration: 0.7 }}
>
```

### Staggered List Animation
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={staggerItem}
      transition={{ duration: 0.5 }}
    >
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

### Hero Entry Animation (sequential delays)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.1 }}
>
```

### Animated Counter Component
```tsx
function AnimatedCounter({ value, suffix = "", duration = 2 }: {
  value: number;
  suffix?: string;
  duration?: number
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
```

---

## Component Patterns

### Badge (above headlines)
```tsx
<motion.span
  className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Global Marketing Agency
</motion.span>
```

### Primary Button (CTA)
```tsx
<Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
  <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
    Get Your Free Strategy Call
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
  </Link>
</Button>
```

### Secondary Button (Outline/Ghost Glass)
```tsx
<Button asChild variant="outline" size="lg" className="btn-ghost-glass text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
  <Link href="/results" className="flex items-center gap-2">
    See Our Results
    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
  </Link>
</Button>
```

### Section Header (centered)
```tsx
<motion.div
  className="text-center mb-16 md:mb-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  transition={{ duration: 0.7 }}
>
  <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
    How We Help Your Business{" "}
    <span className="gradient-accent-text">Grow</span>
  </h2>
  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
    Description text here.
  </p>
</motion.div>
```

### Service Cards (with color variants)
```tsx
// Data structure
const services = [
  {
    icon: TrendingUp,
    title: "SEO Services",
    description: "...",
    href: "/services/seo",
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 50%)",
    iconBg: "hsl(130 65% 50% / 0.15)",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "...",
    href: "/services/social-media",
    cardClass: "service-card service-card-forest",
    iconColor: "hsl(140 50% 35%)",
    iconBg: "hsl(140 50% 35% / 0.15)",
  },
  {
    icon: Target,
    title: "Paid Ads",
    description: "...",
    href: "/services/paid-ads",
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 55%)",
    iconBg: "hsl(0 75% 55% / 0.15)",
  },
  {
    icon: Palette,
    title: "Website Design",
    description: "...",
    href: "/services/website-design",
    cardClass: "service-card service-card-burgundy",
    iconColor: "hsl(350 65% 38%)",
    iconBg: "hsl(350 65% 38% / 0.15)",
  },
];

// Card component
<Link href={service.href} className="block group h-full">
  <div className={`${service.cardClass} p-7 md:p-8 h-full`}>
    <div
      className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
      style={{
        backgroundColor: service.iconBg,
        border: `1px solid ${service.iconColor}30`,
      }}
    >
      <Icon className="w-7 h-7" style={{ color: service.iconColor }} />
    </div>
    <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
      {service.title}
    </h3>
    <p className="text-base text-muted-foreground leading-relaxed">
      {service.description}
    </p>
  </div>
</Link>
```

### Glassmorphism Card (FAQ style)
```tsx
<div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500">
  <div className="bg-card/60 backdrop-blur-xl rounded-2xl border-0 overflow-hidden relative">
    {/* Subtle top highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    {/* Content */}
  </div>
</div>
```

### Floating Stats Badge (hidden on mobile)
```tsx
<motion.div
  className="hidden md:block absolute -bottom-6 -right-8 lg:-right-12 bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl p-5 shadow-lg"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.9, duration: 0.6 }}
>
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
      <TrendingUp className="w-6 h-6 text-green-500" />
    </div>
    <div>
      <p className="text-3xl font-bold">21x</p>
      <p className="text-sm text-muted-foreground">Avg. ROAS</p>
    </div>
  </div>
</motion.div>
```

### Checklist with Icons
```tsx
<motion.ul className="space-y-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {points.map((point, index) => (
    <motion.li key={index} className="flex items-start gap-4" variants={staggerItem} transition={{ duration: 0.5 }}>
      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3.5 h-3.5 text-primary" />
      </span>
      <span className="text-lg text-foreground/90">{point}</span>
    </motion.li>
  ))}
</motion.ul>
```

---

## Section Layout Patterns

### Standard Section Padding
```tsx
<section className="py-24 md:py-32">
  <div className="container">
    {/* content */}
  </div>
</section>
```

### Hero Section (with particles)
```tsx
<section className="relative overflow-hidden">
  <FloatingParticles variant="luxury" count={40} />
  <div className="container py-16 md:py-24 lg:py-32 relative z-10">
    {/* content */}
  </div>
</section>
```

### CTA Section (with background glows)
```tsx
<section className="py-24 md:py-32 relative overflow-hidden">
  {/* Background glow effects */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
      style={{
        background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)",
      }}
    />
  </div>
  <div className="container relative z-10">
    {/* content */}
  </div>
</section>
```

### Two-Column Layout
```tsx
<div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
  <motion.div className="text-center lg:text-left">
    {/* Left content */}
  </motion.div>
  <motion.div className="relative">
    {/* Right content (visual) */}
  </motion.div>
</div>
```

### Stats Grid
```tsx
<motion.div
  className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {stats.map((stat, index) => (
    <motion.div key={index} className="text-center" variants={staggerItem}>
      <p className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
    </motion.div>
  ))}
</motion.div>
```

---

## Responsive Patterns

### Button Responsive Sizing
```tsx
className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
```

### Icon Responsive Sizing
```tsx
className="w-4 h-4 sm:w-5 sm:h-5"
```

### Grid Responsive
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
```

### Hidden on Mobile
```tsx
className="hidden md:block"  // Show only on md+
className="md:hidden"        // Hide on md+
```

### Center on Mobile, Left on Desktop
```tsx
className="text-center lg:text-left"
className="flex justify-center lg:justify-start"
```

---

## CSS Custom Classes Reference

| Class | Purpose |
|-------|---------|
| `btn-hero` | Primary CTA button with gradient + glow |
| `btn-ghost-glass` | Glassmorphism ghost button (green accent) |
| `gradient-text` | Rose→Crimson gradient text |
| `gradient-accent-text` | Crimson→Green gradient text |
| `service-card` | Base service card style |
| `service-card-green` | Green-accented service card (SEO) |
| `service-card-forest` | Forest green-accented service card (Social Media) |
| `service-card-rose` | Rose red-accented service card (Paid Ads) |
| `service-card-burgundy` | Burgundy-accented service card (Website Design) |
| `tech-card` | Tech/feature card with top highlight |
| `glass-card` | Glassmorphism card |
| `bg-page-gradient` | Page-wide ambient gradient background |
| `shadow-glow` | Rose red glow shadow |
| `shadow-brand` | Crimson glow shadow |
| `shadow-green` | Green glow shadow |
| `text-brand-rose` | Rose red text color |
| `text-brand-green` | Green text color |
| `text-brand-crimson` | Crimson text color |
| `text-brand-burgundy` | Burgundy text color |
| `text-brand-scarlet` | Scarlet text color |
| `text-glow-rose` | Rose red text glow |
| `text-glow-green` | Green text glow |

---

## File Structure for Pages

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, /* other icons */ } from "lucide-react";
import { Button } from "@/components/ui/button";
// Import other components as needed

// Animation variants
const fadeInUp = { /* ... */ };
const staggerContainer = { /* ... */ };
const staggerItem = { /* ... */ };

// Page data
const pageData = { /* ... */ };

export default function PageName() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* ... */}
      </section>

      {/* Content Sections */}
      <section className="py-24 md:py-32">
        {/* ... */}
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* ... */}
      </section>
    </>
  );
}
```

---

## Checklist for Page Updates

- [ ] Add `"use client"` if using Framer Motion
- [ ] Import Framer Motion: `motion`, `useInView` if needed
- [ ] Add animation variants (fadeInUp, staggerContainer, staggerItem)
- [ ] Update section padding to `py-24 md:py-32`
- [ ] Add motion wrappers with `whileInView` animations
- [ ] Update buttons to use `btn-hero` and `btn-ghost-glass` patterns
- [ ] Add gradient text to key headline words
- [ ] Ensure responsive text sizes and padding
- [ ] Add badges above main headlines where appropriate
- [ ] Use glassmorphism patterns for cards
- [ ] Hide mobile-problematic elements with `hidden md:block`
- [ ] Use red/green color palette only (no magenta/cyan/purple)
