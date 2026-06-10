import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="wrapper container">
      <section className="wrapper flex ">
        <div className="hero-copy">
          <h1 className="hero-title">
            Meet Facelens <span></span> Your Gateway to Stunning Web Experiences
          </h1>
          <div className="hero-cta-group">
            <Button asChild variant="hero" size="lg">
              <Link href="/projects">
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <Image
              src="/images/hero_image.jpg"
              alt="FaceLens hero background"
              fill
              className="hero-image"
              priority
            />
            <div className="hero-image-overlay" />
          </div>
        </div>
      </section>
    </main>
  );
}
