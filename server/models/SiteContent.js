import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  name: { type: String, default: 'Awoyele Victor Ayomide' },
  role: { type: String, default: 'Computer Science Student & Full-Stack Web Developer' },
  bio: { 
    type: String, 
    default: 'I’m Awoyele Victor Ayomide, a Computer Science student and software developer passionate about building practical, modern digital solutions.' 
  },
  profileImage: { type: String, default: '/profile.png' },
  location: { type: String, default: 'Nigeria, Osogbo & Remote' },
  email: { type: String, default: 'awoyeleemma1@gmail.com' },
  phone: { type: String, default: '+2347017304536' },
  whatsapp: { type: String, default: 'https://wa.me/2347017304536' },

  about: {
    type: Object,
    default: {
      paragraphs: [
        "I’m Awoyele Victor Ayomide, a Computer Science student and software developer passionate about building practical, modern digital solutions.",
        "My main focus is frontend development, where I work with technologies like React.js, JavaScript, Tailwind CSS, and modern web APIs to create responsive and user-friendly experiences. I also enjoy working with Node.js, Laravel, MongoDB, MySQL, and REST APIs to understand and build complete systems beyond the interface.",
        "I’m particularly interested in Artificial Intelligence, Natural Language Processing, and Cybersecurity. I enjoy exploring how AI can solve real-world problems and how secure, intelligent systems can make technology more accessible and useful.",
        "I believe good software should not only look good — it should solve a real problem, work reliably, and be built with purpose. I’m constantly learning, experimenting with new technologies, and turning ideas into working projects."
      ],
      currentFocus: "Building, learning, experimenting, and preparing for the next level of my journey in software engineering, AI, and cybersecurity.",
      faveMusic: {
        title: "My Fave",
        description: "A little window into my taste — the songs I keep coming back to while coding, building, thinking, or just vibing.",
        playlistUrl: "https://open.spotify.com/playlist/2yiM4AjKi0kROd1S4QOuAI"
      },
      faveGame: {
        title: "Blood Strike",
        description: "Fast-paced matches, chaotic gunfights, and just enough “one more game” energy to destroy a perfectly good sleep schedule. 😭🎮"
      }
    }
  },
  
  specialization: { 
    type: [String], 
    default: [
      'Web Development',
      'Frontend Development',
      'Full-Stack Development',
      'Artificial Intelligence',
      'Cybersecurity & Systems'
    ] 
  },
  
  technologies: {
    type: Object,
    default: {
      frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend: ['Node.js', 'Express.js', 'Laravel', 'REST APIs'],
      database: ['MongoDB', 'MySQL'],
      tools: ['Git', 'GitHub', 'Vercel', 'Render', 'Figma'],
      ai: ['Google Gemini', 'Large Language Models', 'NLP & AI Applications']
    }
  },

  experience: {
    role: { type: String, default: 'Web Development & Software Engineering' },
    focus: {
      type: [String],
      default: [
        'Frontend Development (React.js)',
        'Backend & RESTful APIs',
        'Database Design (MongoDB, MySQL)',
        'Responsive UI & Tailwind CSS',
        'AI & Intelligent Interfaces',
        'Cybersecurity Best Practices'
      ]
    }
  },

  careerGoals: {
    type: [String],
    default: [
      'Build purposeful, scalable modern software products',
      'Excel in Frontend, AI & Secure System Engineering',
      'Create responsive, delightful user experiences',
      'Solve impactful real-world challenges through tech'
    ]
  },
  
  socials: {
    github: { type: String, default: 'https://github.com/Awoyelevictor' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: 'https://wa.me/2347017304536' },
    phone: { type: String, default: '+2347017304536' },
  }
}, { timestamps: true });

export default mongoose.model('SiteContent', siteContentSchema);
