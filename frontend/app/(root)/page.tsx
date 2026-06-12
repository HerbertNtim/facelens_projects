import HeroBackground from "@/components/HeroBackground";
import Link from "next/link";

const Home = () => {
  return (
    <main className="page">
      <section className="page-section">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-200 text-center px-4 py-8 sm:py-12 lg:py-16">
                <h1 className="page-title">
                  Explore the World Through Faces{" "}
                </h1>
                <p className="page-description">
                  Facelens is an open portfolio of computer vision projects — built by developers, researchers, and creators pushing the boundaries of facial recognition, detection, and analysis.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/projects"
                    className="btn-primary"
                  >
                    Explore Projects
                  </Link>
                  <Link
                    href="/github"
                    className="btn-secondary"
                  >
                    Contribute on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeroBackground />
      </section>


    </main>
  );
};

export default Home;
