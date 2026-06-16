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
                  <Link href="/gender" className="btn-primary">
                    Give it a Try
                  </Link>
                  <Link href="/github" className="btn-secondary">
                    Check The ML Repo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeroBackground />
      </section>

      <section className="py-8 md:py-10 lg:py-12">
        <div className="mb-16">
          <div className="workflow-section">
            <div className='text-center mb-12'>
              <h2 className="text-2xl sm:text-6xl font-semibold mb-2 text-foreground">How It Works</h2>
              <p className="my-6 text-muted-foreground">
                This application uses a machine learning model to predict the
                gender of a person in an uploaded image. The model is run on a
                backend service that analyzes facial features and returns a
                probabilistic prediction for Male or Female.
              </p>
            </div>
            <div className="workflow-panel">
              <div className="workflow-grid">
                <div className="workflow-card">
                  <div className="workflow-badge">1</div>
                  <h3 className="workflow-title">Upload an Image</h3>
                  <p className="workflow-text">
                    Choose a clear, frontal face image from your device.
                  </p>
                </div>

                <div className="workflow-card">
                  <div className="workflow-badge">2</div>
                  <h3 className="workflow-title">ML Analysis</h3>
                  <p className="workflow-text">
                    The backend runs a trained model to analyze facial features
                    and determine a gender probability.
                  </p>
                </div>

                <div className="workflow-card">
                  <div className="workflow-badge">3</div>
                  <h3 className="workflow-title">Show Results</h3>
                  <p className="workflow-text">
                    Results are returned with confidence scores and a visual
                    indicator of the predicted gender.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/gender" className="btn-primary">
              Give it a Try
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
