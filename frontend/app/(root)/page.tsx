import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="wrapper container">
      <section className="wrapper flex gap-8 sm:gap-12 items-center">
        {/* LEFT */}
        <div className="hero-text">
          <h1 className="hero-title">
            Meet Facelens <span>—</span> Your Gateway to Stunning Web
            Experiences
          </h1>
          <Link href="/projects" className="hero-cta-primary">
            Explore Projects
          </Link>
        </div>
        {/* RIGHT */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <Image
              src="/images/hero_image.jpg"
              alt="FaceLens hero background"
              fill
              className="hero-image"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
