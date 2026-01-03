import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AppData, Profile, Project, HeroSlide, Service, Achievement, Notification } from '../types';
import { INITIAL_DATA } from '../constants';

interface ContentContextType {
  data: AppData;
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateServices: (services: Service[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem('folio_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      console.error("Failed to load data", e);
      return INITIAL_DATA;
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('folio_data', JSON.stringify(data));
    } catch (e) {
      addNotification("Storage limit reached! Changes may not be saved.", "error");
    }
  }, [data]);

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateProfile = (updates: Partial<Profile>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
    addNotification("Profile updated successfully", "success");
  };

  const updateHeroSlides = (slides: HeroSlide[]) => {
    setData(prev => ({ ...prev, heroSlides: slides }));
    addNotification("Slideshow updated", "success");
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID()
    };
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    addNotification("Project added", "success");
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
    addNotification("Project updated", "success");
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    addNotification("Project deleted", "info");
  };

  const updateServices = (services: Service[]) => {
    setData(prev => ({ ...prev, services }));
    addNotification("Services updated", "success");
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setData(prev => ({ ...prev, achievements }));
    addNotification("Achievements updated", "success");
  };

  const resetToDefaults = () => {
    if(confirm("Are you sure? All custom changes will be lost.")) {
      setData(INITIAL_DATA);
      addNotification("Reset to defaults", "info");
    }
  };

  return (
    <ContentContext.Provider value={{
      data,
      notifications,
      addNotification,
      removeNotification,
      updateProfile,
      updateHeroSlides,
      addProject,
      updateProject,
      deleteProject,
      updateServices,
      updateAchievements,
      resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
