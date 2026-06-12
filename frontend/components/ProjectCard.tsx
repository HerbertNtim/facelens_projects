import { JSX } from "react";

const SingleFeature = ({ title, icon, description }: { title: string, icon: JSX.Element, description: string}) => {

  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="bg-blue-200 text-primary mb-10 flex h-17.5 w-17.5 items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
          {title}
        </h3>
        <p className="text-body-color pr-2.5 text-base leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
