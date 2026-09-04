import { motion } from 'framer-motion';

// Mock data matching the new backend schema
const MOCK_PROJECTS = [
  {
    _id: '1',
    name: 'Inventory Website',
    description: 'A fully responsive inventory management platform with product filtering, cart functionality, and secure checkout.',
    technologies: ['React', 'Node.js'],
    gradientFrom: '#7c3aed', // violet-600
    gradientTo: '#c084fc',   // purple-400
    icon: '🛒',
    github: '#',
    liveUrl: '#'
  },
  {
    _id: '2',
    name: 'Ai Task Management App',
    description: 'A drag-and-drop task management application with user authentication and real-time updates.',
    technologies: ['React', 'TypeScript', 'JS'],
    gradientFrom: '#4f46e5', // indigo-600
    gradientTo: '#818cf8',   // indigo-400
    icon: '📋',
    github: '#',
    liveUrl: '#'
  },
  {
    _id: '3',
    name: 'Phoenix Blog',
    description: 'A responsive travel blog with dynamic content loading, search functionality, and interactive maps.',
    technologies: ['React', 'JSON', 'CSS'],
    gradientFrom: '#6366f1', // indigo-500
    gradientTo: '#a5b4fc',   // indigo-300
    icon: '🌐',
    github: '#',
    liveUrl: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-darkBg relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-textPrimary mb-6">My Projects</h2>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROJECTS.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-charcoal rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Top Gradient Area with Icon */}
              <div 
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(to bottom right, ${project.gradientFrom}, ${project.gradientTo})` }}
              >
                {/* Subtle floating particles in the gradient */}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-white/30 rounded-full w-1 h-1"
                    style={{
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                  />
                ))}
                
                <span className="text-6xl text-white group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </span>
              </div>

              {/* Bottom Info Area */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-textPrimary mb-3">{project.name}</h3>
                <p className="text-textSecondary text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-white/5 text-textMuted text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-auto">
                  <a 
                    href={project.liveUrl}
                    className="flex-1 py-3 bg-accent text-white text-center rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    View Project
                  </a>
                  <a 
                    href={project.github}
                    className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg text-textPrimary hover:bg-white/10 transition-colors"
                  >
                    {/* Simple GitHub Icon */}
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
