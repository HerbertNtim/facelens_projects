import Heading from '@/components/Heading';
import SingleFeature from '@/components/ProjectCard';
import { projects } from '@/lib/constants';

const Projects = () => {
  return (
    <main className='page py-16 md:py-20 lg:py-28'>
      <div className='container'>
        <Heading 
          title="Our Projects" 
          paragraph="Explore our latest projects and see how we're pushing the boundaries of what's possible."
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <SingleFeature 
                key={project.slug} 
                title={project.title} 
                icon={project.icon} 
                description={project.description} 
                slug={project.slug}
              />
            ))}
          </div>
      </div>
    </main>
  )
}

export default Projects
