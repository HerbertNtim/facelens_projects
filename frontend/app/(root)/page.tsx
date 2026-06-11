import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="wrapper container">
      <section className="hero-section">
        <div className="hero-inner">
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
          <div className="hero-image-frame">
            <Image
              src="/images/image_3-removebg-preview.png"
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
