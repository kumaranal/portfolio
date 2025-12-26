import { ExternalLink, Car, Network, TreeDeciduous, HeartPulse, Building2, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  icon: LucideIcon;
  url?: string;
  gradient: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Incentive Management System',
    description: "An application using which FIAT AUTOMOBILE's sales team managing their offers, discounts & made strategies of sales & discounts.",
    icon: Car,
    gradient: 'from-blue-500 to-cyan-400',
    tags: ['Enterprise', 'Sales', 'Analytics'],
  },
  {
    title: 'Optical Fiber Management System',
    description: 'An application using which COMCAST CORPORATION is managing & maintaining (installation, health check etc.) of their optical fiber cable network.',
    icon: Network,
    gradient: 'from-orange-500 to-amber-400',
    tags: ['Telecom', 'Network', 'Maintenance'],
  },
  {
    title: 'Golf Course Management System',
    description: 'An application using which golf courses are managing & maintains their golf course area (pond, grass, trees, flag etc.).',
    icon: TreeDeciduous,
    url: 'https://turfassistant.com/',
    gradient: 'from-green-500 to-emerald-400',
    tags: ['Sports', 'Management', 'IoT'],
  },
  {
    title: 'Healthcare App for EKG Review',
    description: 'An application using which patients share their EKG through the app, & institutional doctors review and send back feedback through the application.',
    icon: HeartPulse,
    url: 'https://readmyrhythm.com/',
    gradient: 'from-red-500 to-rose-400',
    tags: ['Healthcare', 'Telemedicine', 'Mobile'],
  },
  {
    title: 'Real-estate Rent Management System',
    description: 'A comprehensive platform for managing rental properties, tenant relationships, and payment processing for real estate businesses.',
    icon: Building2,
    url: 'https://affco-dev.vercel.app/',
    gradient: 'from-purple-500 to-pink-400',
    tags: ['Real Estate', 'Payments', 'SaaS'],
  },
  {
    title: 'Sports Edu-Tech Management System',
    description: 'An educational technology platform designed for sports training, coaching management, and athlete development tracking.',
    icon: GraduationCap,
    url: 'https://elevatedev.vercel.app/',
    gradient: 'from-indigo-500 to-violet-400',
    tags: ['EdTech', 'Sports', 'Training'],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of projects I've worked on throughout my professional career.
            Each project represents unique challenges and solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />
              
              <div className="relative glass-card p-6 rounded-2xl h-full flex flex-col transition-all duration-500 group-hover:translate-y-[-2px]">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Website</span>
                    <span className="w-0 group-hover/link:w-2 overflow-hidden transition-all duration-300">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
