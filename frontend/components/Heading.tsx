const Heading = ({
  title,
  paragraph
}: {
  title: string;
  paragraph: string;
}) => {
  return (
    <>
      <div
        className="w-full max-w-3xl mx-auto text-center"        
      >
        <h2 className="mb-4 text-3xl font-bold leading-tight! text-secondary-foreground dark:text-foreground sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p className="text-base leading-relaxed! text-muted-foreground dark:text-muted-foreground md:text-lg">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default Heading;
