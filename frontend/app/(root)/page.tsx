
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center gap-12 px-5 py-16 md:flex-row md:items-center md:gap-24">
        <div className="w-full max-w-xl">
          <span className="inline-flex rounded-full bg-cta/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cta">
            AI vision for modern brands
          </span>
          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Create immersive facial storytelling with the boldest AI visuals.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            FaceLens helps you capture attention through dynamic imagery, responsive layouts, and intelligent branding that shines in both light and dark themes.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-4 text-base font-semibold text-cta-foreground shadow-lg shadow-cta/20 transition hover:bg-cta/90"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition hover:bg-muted/70 dark:hover:bg-input/70"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-black/5 md:max-w-2xl">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/hero_image.jpg"
              alt="FaceLens hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent dark:from-background/95" />
          </div>
        </div>
      </section>
    </main>
  );
}
