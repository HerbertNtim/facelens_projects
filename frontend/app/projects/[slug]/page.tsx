import Heading from '@/components/Heading';
import { projects } from '@/lib/constants';
import Link from 'next/link';

interface Props {
  params: { slug: string }
}

export default function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="page py-16">
        <div className="container">
          <Heading title="Project not found" paragraph="We couldn't find that project." />
          <p className="mt-8"><Link href="/projects" className="text-cta">Back to projects</Link></p>
        </div>
      </main>
    );
  }

  return (
    <main className="page py-16">
      <div className="container">
        <Heading title={project.title} paragraph={project.description} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg bg-white/60 dark:bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Overview</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div className="rounded-lg bg-white/60 dark:bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Live Preview</h3>
            <p className="text-muted-foreground">A placeholder area for demos or screenshots during development.</p>
            <div className="mt-4 h-40 rounded-md bg-slate-800" />
          </div>
        </div>

        <p className="mt-8"><Link href="/projects" className="text-cta">Back to projects</Link></p>
      </div>
    </main>
  );
}
