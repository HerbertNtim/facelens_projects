import Link from "next/link";

export default function Home() {
  return (
    <main className="wrapper bg-red-500 h-screen w-full overflow-hidden">
      <section className="bg-green-500 h-full w-full">
        <div className="bg-blue-500 h-full w-full flex items-center justify-between">
          {/*  LEFT */}
          <div className="bg-yellow-500 h-full w-full">
            <div className="h-full flex flex-col justify-center mx-8 bg-pink-400">
              <h1 className="text-2xl sm:text-4xl font-sans font-normal trackig-wide leading-[-8] sm:leading-[-6] text-white bg-red-300 pt-32">
                Meet FaceLens — the simple way to showcase computer vision and facial analysis projects.
              </h1>

              <Link href="/projects" className="my-8 w-fit text-xl font-sans font-normal px-6 py-3 bg-cta text-white rounded-md hover:bg-cta/90 transition-colors">
                Explore Projects
              </Link>
            </div>
          </div>

          {/*  RIGHT */}
          <div className="bg-purple-500 h-full w-full hidden sm:block">RIGHT</div>
        </div>
      </section>
    </main>
  );
}
