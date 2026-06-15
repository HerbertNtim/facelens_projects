import { JSX } from "react";
import Link from "next/link";

const SingleFeature = ({ title, icon, description, slug }: { title: string, icon: JSX.Element, description: string, slug: string}) => {

  return (
    <div className="w-full">
      <Link href={`/projects/${slug}`} className="group block rounded-lg transition-shadow hover:shadow-lg focus:shadow-lg">
        <div className="p-6 bg-white/60 dark:bg-slate-900/60 rounded-lg">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-slate-800 text-blue-400 dark:bg-slate-700">
            {icon}
          </div>

          <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SingleFeature;
