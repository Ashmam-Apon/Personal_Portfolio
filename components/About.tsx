import React from 'react';
import { useContent } from '../context/ContentContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';

export const About: React.FC = () => {
  const { data } = useContent();
  const { profile, services } = data;

  // Helper to dynamically render icons from string names
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={32} className="text-primary-600" /> : <Icons.Box size={32} />;
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary-600 rounded-2xl rotate-6 opacity-20"></div>
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="relative w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white dark:border-gray-800" 
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {profile.name}
            </h2>
            <p className="text-xl text-primary-600 font-medium mb-6">{profile.title}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {profile.bio}
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              {profile.socials.github && (
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:text-primary-600 transition-colors dark:text-gray-300">
                  <Github size={20} />
                </a>
              )}
              {profile.socials.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:text-primary-600 transition-colors dark:text-gray-300">
                  <Linkedin size={20} />
                </a>
              )}
              {profile.socials.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:text-primary-600 transition-colors dark:text-gray-300">
                  <Twitter size={20} />
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:text-primary-600 transition-colors dark:text-gray-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Services/Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-500 transition-all">
              <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg inline-block">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
