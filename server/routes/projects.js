import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

const INITIAL_PROJECTS = [
  {
    name: 'E-commerce App with AI',
    description: 'An e-commerce web application exploring the integration of artificial intelligence into online shopping experiences.',
    technologies: ['JavaScript', 'AI', 'E-commerce', 'Web Development'],
    github: 'https://github.com/Awoyelevictor/E-commerce-App-with-AI',
    liveUrl: '',
    gradientFrom: '#6366f1',
    gradientTo: '#a855f7',
    icon: '🧠',
    featured: true,
    order: 1
  },
  {
    name: 'Health Management System',
    description: 'A web-based health management application designed to organize health-related information and workflows.',
    technologies: ['React.js', 'Tailwind CSS'],
    github: 'https://github.com/Awoyelevictor/hms',
    liveUrl: '',
    gradientFrom: '#10b981',
    gradientTo: '#059669',
    icon: '🏥',
    featured: true,
    order: 2
  },
  {
    name: 'Inventory Management System',
    description: 'A web application for managing products, inventory records, and stock-related operations.',
    technologies: ['React.js', 'JavaScript', 'Web Development'],
    github: 'https://github.com/Awoyelevictor/inventory',
    liveUrl: '',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    icon: '📦',
    featured: true,
    order: 3
  },
  {
    name: '3D Website',
    description: 'A modern interactive 3D web experience focused on immersive visual design and frontend development.',
    technologies: ['JavaScript', 'Web Development', '3D'],
    github: 'https://github.com/Awoyelevictor/3dwebsite',
    liveUrl: '',
    gradientFrom: '#ec4899',
    gradientTo: '#8b5cf6',
    icon: '✨',
    featured: true,
    order: 4
  },
  {
    name: 'Terminal Portfolio',
    description: 'A unique terminal-inspired portfolio experience designed around a command-line interface.',
    technologies: ['JavaScript', 'Terminal UI', 'Web Development'],
    github: 'https://github.com/Awoyelevictor/terminal-portfolio',
    liveUrl: '',
    gradientFrom: '#64748b',
    gradientTo: '#334155',
    icon: '💻',
    featured: true,
    order: 5
  },
  {
    name: 'TaskWise',
    description: 'A productivity-focused web application for organizing and managing tasks.',
    technologies: ['JavaScript', 'Web Development'],
    github: 'https://github.com/Awoyelevictor/taskwise',
    liveUrl: '',
    gradientFrom: '#8b5cf6',
    gradientTo: '#6366f1',
    icon: '⚡',
    featured: false,
    order: 6
  },
  {
    name: 'Weather App',
    description: 'A weather application that provides users with weather information through a simple web interface.',
    technologies: ['JavaScript', 'API', 'Web Development'],
    github: 'https://github.com/Awoyelevictor/weather4two',
    liveUrl: '',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    icon: '🌦️',
    featured: false,
    order: 7
  },
  {
    name: 'Steps Tracker',
    description: 'A web application for tracking walking activity and visualizing movement-related information.',
    technologies: ['JavaScript', 'Web Development', 'Maps'],
    github: 'https://github.com/Awoyelevictor/steps-tracker-app',
    liveUrl: '',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    icon: '🌐',
    featured: false,
    order: 8
  }
];

// GET all projects (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(INITIAL_PROJECTS);
    }
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// CREATE new project
router.post('/', async (req, res) => {
  try {
    const { name, description, technologies, github, liveUrl, gradientFrom, gradientTo, icon, featured } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newProject = new Project({
      name,
      description,
      technologies: Array.isArray(technologies) ? technologies : (technologies || '').split(',').map(t => t.trim()).filter(Boolean),
      github: github || '#',
      liveUrl: liveUrl || '',
      gradientFrom: gradientFrom || '#6366f1',
      gradientTo: gradientTo || '#a855f7',
      icon: icon || '💻',
      featured: Boolean(featured)
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// UPDATE project
router.put('/:id', async (req, res) => {
  try {
    const { name, description, technologies, github, liveUrl, gradientFrom, gradientTo, icon, featured } = req.body;
    
    const formattedTech = Array.isArray(technologies) 
      ? technologies 
      : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(Boolean) : undefined);

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(formattedTech && { technologies: formattedTech }),
      ...(github !== undefined && { github }),
      ...(liveUrl !== undefined && { liveUrl }),
      ...(gradientFrom && { gradientFrom }),
      ...(gradientTo && { gradientTo }),
      ...(icon && { icon }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
    };

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
