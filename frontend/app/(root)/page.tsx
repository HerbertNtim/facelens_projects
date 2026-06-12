import HeroBackground from "@/components/HeroBackground";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col bg-(--bg-light) dark:bg-(--bg-dark)">
      <section className="relative h-screen z-10 overflow-hidden pb-16 pt-30 md:pb-30 md:pt-37.5 xl:pb-40 xl:pt-45 2xl:pb-50 2xl:pt-52.5">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-200 text-center py-8 sm:py-12 lg:py-16">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Explore the World Through Faces{" "}
                </h1>
                <p className="mb-12 text-base leading-relaxed! text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  Facelens is an open portfolio of computer vision projects — built by developers, researchers, and creators pushing the boundaries of facial recognition, detection, and analysis.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/projects"
                    className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Explore Projects
                  </Link>
                  <Link
                    href="/github"
                    className="inline-block rounded-xs bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
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
