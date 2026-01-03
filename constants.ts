import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Alex Morgan",
    title: "Senior Full Stack Developer",
    bio: "I craft robust, scalable, and aesthetically pleasing digital experiences. With over 8 years of industry experience, I specialize in React, Node.js, and cloud architectures. I believe in clean code and user-centric design.",
    email: "hello@alexmorgan.dev",
    avatarUrl: "https://picsum.photos/id/64/400/400",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  heroSlides: [
    {
      id: "1",
      title: "Building Digital Excellence",
      subtitle: "Transforming ideas into powerful web applications.",
      imageUrl: "https://picsum.photos/id/180/1920/1080",
      ctaText: "View My Work",
      ctaLink: "#projects"
    },
    {
      id: "2",
      title: "Modern UI/UX Design",
      subtitle: "Creating intuitive interfaces that users love.",
      imageUrl: "https://picsum.photos/id/1/1920/1080",
      ctaText: "Contact Me",
      ctaLink: "#contact"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "E-Commerce Dashboard",
      category: "Web App",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
      imageUrl: "https://picsum.photos/id/119/800/600",
      link: "#"
    },
    {
      id: "p2",
      title: "FinTech Mobile App",
      category: "Mobile Design",
      description: "UI/UX design for a next-generation banking application focusing on security and ease of use.",
      imageUrl: "https://picsum.photos/id/20/800/600",
      link: "#"
    },
    {
      id: "p3",
      title: "Travel Blog Platform",
      category: "Content Management",
      description: "A headless CMS integration for a high-traffic travel blog with automated SEO optimization.",
      imageUrl: "https://picsum.photos/id/48/800/600",
      link: "#"
    }
  ],
  services: [
    {
      id: "s1",
      title: "Web Development",
      description: "Full-cycle web development using the latest React stack.",
      icon: "Code"
    },
    {
      id: "s2",
      title: "UI/UX Design",
      description: "Wireframing, prototyping, and high-fidelity interface design.",
      icon: "Palette"
    },
    {
      id: "s3",
      title: "Technical Consulting",
      description: "Architecture review, performance optimization, and tech strategy.",
      icon: "Terminal"
    }
  ],
  achievements: [
    {
      id: "a1",
      title: "Best Developer Award",
      organization: "TechConf 2023",
      date: "2023",
      description: "Recognized for outstanding contributions to open source community."
    },
    {
      id: "a2",
      title: "Certified Cloud Architect",
      organization: "AWS",
      date: "2022",
      description: "Professional certification for designing distributed systems on AWS."
    }
  ]
};

export const ICONS_LIST = ['Code', 'Palette', 'Terminal', 'Globe', 'Smartphone', 'Database', 'Cpu', 'Zap', 'Award', 'Star'];
