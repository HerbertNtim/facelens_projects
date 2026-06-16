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
                  Gender Prediction Machine Learning Application{" "}
                </h1>
                <p className="page-description">
                  Upload an image to make prediction on gender (Male | Female)
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/gender"
                    className="btn-primary"
                  >
                    Give it a Try
                  </Link>
                  <Link
                    href="/github"
                    className="btn-secondary"
                  >
                    Check The ML Repo
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
