import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  name: { type: String, default: 'Awoyele Victor Ayomide' },
  role: { type: String, default: 'Computer Science Student & Full-Stack Web Developer' },
  bio: { 
    type: String, 
    default: 'I am a Computer Science student and web developer passionate about building practical, modern, and user-focused digital solutions. I enjoy turning ideas into functional web applications and exploring how AI can solve real-world problems.' 
  },
  profileImage: { type: String, default: '/profile.png' },
  location: { type: String, default: 'Nigeria' },
  email: { type: String, default: 'awoyeleemma1@gmail.com' },
  
  specialization: { 
    type: [String], 
    default: [
      'Web Development',
      'Frontend Development',
      'Full-Stack Development',
      'Artificial Intelligence',
      'Software Engineering'
    ] 
  },
  
  technologies: {
    type: Object,
    default: {
      frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend: ['Node.js', 'Express.js', 'Laravel'],
      database: ['MongoDB', 'MySQL'],
      tools: ['Git', 'GitHub', 'Vercel', 'Render', 'Figma'],
      ai: ['Google Gemini', 'Large Language Models', 'AI-assisted Applications']
    }
  },

  experience: {
    role: { type: String, default: 'Web Development Intern' },
    focus: {
      type: [String],
      default: [
        'Frontend Development',
        'React.js',
        'Responsive UI Development',
        'Git & GitHub',
        'Team Collaboration',
        'Web Application Development'
      ]
    }
  },

  careerGoals: {
    type: [String],
    default: [
      'Become a highly skilled full-stack developer',
      'Build impactful software products',
      'Explore AI and intelligent applications',
      'Solve real-world problems through technology',
      'Build scalable web applications'
    ]
  },
  
  socials: {
    github: { type: String, default: 'https://github.com/Awoyelevictor' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    phone: { type: String, default: '' },
  }
}, { timestamps: true });

export default mongoose.model('SiteContent', siteContentSchema);
