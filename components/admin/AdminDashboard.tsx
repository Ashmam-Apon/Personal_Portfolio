import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useContent } from '../../context/ContentContext';
import { Button } from '../ui/Button';
import { AIGenerator } from './AIGenerator';
import { Modal } from '../ui/Modal';
import { ImageUpload } from '../ui/ImageUpload';
import { Project, HeroSlide, Service, Profile, Achievement } from '../../types';
import { ICONS_LIST } from '../../constants';
import { Trash2, Edit2, Plus, Save, RotateCcw, GripVertical } from 'lucide-react';

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  aiContext?: string;
  onAI?: (t: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, children, aiContext, onAI }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {aiContext && onAI && <AIGenerator context={aiContext} onGenerate={onAI} />}
    </div>
    {children}
  </div>
);

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    data, 
    updateProfile, 
    updateHeroSlides, 
    addProject, 
    updateProject, 
    deleteProject, 
    updateServices,
    updateAchievements
  } = useContent();

  // --- Sub-components for Editors (Defined internally to share 'data' easily but separated for render logic) ---

  // 1. Profile Editor
  const ProfileEditor = () => {
    const [formData, setFormData] = useState<Profile>(data.profile);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => { setFormData(data.profile); setIsDirty(false); }, [data.profile]);

    const handleChange = (key: keyof Profile | string, value: any) => {
      setFormData(prev => {
        if (key.startsWith('socials.')) {
           const socialKey = key.split('.')[1];
           return { ...prev, socials: { ...prev.socials, [socialKey]: value } };
        }
        return { ...prev, [key]: value };
      });
      setIsDirty(true);
    };

    const handleSave = () => {
      updateProfile(formData);
      setIsDirty(false);
    };

    return (
      <div className="space-y-6 max-w-3xl animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Edit Profile</h2>
          <Button onClick={handleSave} disabled={!isDirty} className="gap-2">
            <Save size={18} /> Save Changes
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
             <div className="md:col-span-1">
                <ImageUpload value={formData.avatarUrl} onChange={(v) => handleChange('avatarUrl', v)} label="Profile Picture" />
             </div>
             <div className="md:col-span-2 space-y-4">
               <InputGroup label="Full Name">
                 <input className="input-field" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
               </InputGroup>
               <InputGroup label="Job Title" aiContext="Generate a professional job title" onAI={t => handleChange('title', t)}>
                 <input className="input-field" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
               </InputGroup>
               <InputGroup label="Email">
                 <input className="input-field" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
               </InputGroup>
             </div>
          </div>

          <InputGroup label="Bio" aiContext={`Rewrite this bio to be more engaging: ${formData.bio}`} onAI={t => handleChange('bio', t)}>
            <textarea rows={5} className="input-field" value={formData.bio} onChange={e => handleChange('bio', e.target.value)} />
          </InputGroup>

          <div className="grid md:grid-cols-3 gap-4">
            <InputGroup label="GitHub URL">
               <input className="input-field" value={formData.socials.github || ''} onChange={e => handleChange('socials.github', e.target.value)} />
            </InputGroup>
            <InputGroup label="LinkedIn URL">
               <input className="input-field" value={formData.socials.linkedin || ''} onChange={e => handleChange('socials.linkedin', e.target.value)} />
            </InputGroup>
            <InputGroup label="Twitter URL">
               <input className="input-field" value={formData.socials.twitter || ''} onChange={e => handleChange('socials.twitter', e.target.value)} />
            </InputGroup>
          </div>
        </div>
      </div>
    );
  };

  // 2. Projects Editor
  const ProjectsEditor = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Project>>({});

    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingItem.id) {
        updateProject(editingItem.id, editingItem);
      } else {
        addProject(editingItem as Project);
      }
      setModalOpen(false);
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
          <Button onClick={() => { setEditingItem({}); setModalOpen(true); }} className="gap-2">
            <Plus size={18} /> Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map(p => (
            <div key={p.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden relative">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button size="sm" variant="secondary" onClick={() => { setEditingItem(p); setModalOpen(true); }}><Edit2 size={16}/></Button>
                   <Button size="sm" variant="danger" onClick={() => deleteProject(p.id)}><Trash2 size={16}/></Button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-primary-600 font-bold uppercase mb-1">{p.category}</div>
                <h3 className="font-bold dark:text-white truncate">{p.title}</h3>
                <p className="text-sm text-gray-500 truncate mt-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingItem.id ? "Edit Project" : "New Project"}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <InputGroup label="Title">
                  <input required className="input-field" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
               </InputGroup>
               <InputGroup label="Category">
                  <input required className="input-field" value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} />
               </InputGroup>
            </div>
            <InputGroup label="Description" aiContext={`Project: ${editingItem.title}. Write a short description.`} onAI={t => setEditingItem({...editingItem, description: t})}>
               <textarea required rows={3} className="input-field" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
            </InputGroup>
            <ImageUpload value={editingItem.imageUrl || ''} onChange={v => setEditingItem({...editingItem, imageUrl: v})} label="Project Image" />
            <InputGroup label="External Link">
               <input className="input-field" value={editingItem.link || ''} onChange={e => setEditingItem({...editingItem, link: e.target.value})} />
            </InputGroup>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit">Save Project</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // 3. Services Editor (List Editor Pattern)
  const ServicesEditor = () => {
    const [items, setItems] = useState<Service[]>(data.services);
    
    // Sync local state when global data changes (e.g. initial load)
    useEffect(() => setItems(data.services), [data.services]);

    const handleItemChange = (index: number, field: keyof Service, value: string) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      setItems(newItems);
    };

    const handleSave = () => {
      updateServices(items);
    };

    const handleDelete = (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      // We can auto-save on delete or require manual save. Manual is safer.
    };

    return (
       <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Services</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setItems([...items, { id: crypto.randomUUID(), title: 'New Service', description: 'Description', icon: 'Code' }])}>
              <Plus size={18} className="mr-2" /> Add Service
            </Button>
            <Button onClick={handleSave} className="gap-2"><Save size={18} /> Save Changes</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 flex gap-4 items-start group">
               <div className="mt-1">
                 <select 
                   className="input-field p-2"
                   value={item.icon}
                   onChange={e => handleItemChange(index, 'icon', e.target.value)}
                 >
                   {ICONS_LIST.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                 </select>
               </div>
               <div className="flex-1 space-y-2">
                 <input 
                   className="input-field font-bold"
                   value={item.title}
                   onChange={e => handleItemChange(index, 'title', e.target.value)}
                   placeholder="Service Title"
                 />
                 <div className="relative">
                    <textarea 
                      className="input-field text-sm"
                      rows={2}
                      value={item.description}
                      onChange={e => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Service Description"
                    />
                    <div className="absolute top-1 right-1">
                       <AIGenerator context={`Service: ${item.title}. Describe it briefly.`} onGenerate={t => handleItemChange(index, 'description', t)} label="AI" />
                    </div>
                 </div>
               </div>
               <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={20}/></button>
            </div>
          ))}
        </div>
       </div>
    );
  };

  // 4. Hero Slides Editor
  const HeroEditor = () => {
    const [slides, setSlides] = useState<HeroSlide[]>(data.heroSlides);
    useEffect(() => setSlides(data.heroSlides), [data.heroSlides]);

    const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
      const newSlides = [...slides];
      newSlides[index] = { ...newSlides[index], [field]: value };
      setSlides(newSlides);
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Hero Slides</h2>
          <div className="flex gap-2">
             <Button variant="outline" onClick={() => setSlides([...slides, { id: crypto.randomUUID(), title: 'New Slide', subtitle: 'Subtitle', imageUrl: 'https://picsum.photos/1920/1080', ctaText: 'Action', ctaLink: '#contact' }])}>
                <Plus size={18} /> Add Slide
             </Button>
             <Button onClick={() => updateHeroSlides(slides)} className="gap-2"><Save size={18} /> Save Changes</Button>
          </div>
        </div>
        <div className="space-y-8">
           {slides.map((slide, index) => (
             <div key={slide.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700 relative">
                <div className="absolute top-4 right-4 z-10">
                   <button onClick={() => setSlides(slides.filter((_, i) => i !== index))} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={20}/></button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <InputGroup label="Title">
                        <input className="input-field" value={slide.title} onChange={e => updateSlide(index, 'title', e.target.value)} />
                      </InputGroup>
                      <InputGroup label="Subtitle" aiContext={`Subtitle for hero: ${slide.title}`} onAI={t => updateSlide(index, 'subtitle', t)}>
                        <textarea rows={2} className="input-field" value={slide.subtitle} onChange={e => updateSlide(index, 'subtitle', e.target.value)} />
                      </InputGroup>
                      <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="CTA Text">
                           <input className="input-field" value={slide.ctaText} onChange={e => updateSlide(index, 'ctaText', e.target.value)} />
                        </InputGroup>
                        <InputGroup label="CTA Link">
                           <input className="input-field" value={slide.ctaLink} onChange={e => updateSlide(index, 'ctaLink', e.target.value)} />
                        </InputGroup>
                      </div>
                   </div>
                   <div>
                      <ImageUpload value={slide.imageUrl} onChange={v => updateSlide(index, 'imageUrl', v)} label="Background Image" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // 5. Achievements Editor
  const AchievementsEditor = () => {
    const [items, setItems] = useState<Achievement[]>(data.achievements);
    useEffect(() => setItems(data.achievements), [data.achievements]);

    const handleChange = (index: number, field: keyof Achievement, value: string) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      setItems(newItems);
    };

    return (
      <div className="space-y-6 animate-fade-in">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">Achievements</h2>
            <div className="flex gap-2">
               <Button variant="outline" onClick={() => setItems([...items, { id: crypto.randomUUID(), title: 'New Award', organization: 'Org', date: '2024', description: 'Description' }])}>
                  <Plus size={18} /> Add
               </Button>
               <Button onClick={() => updateAchievements(items)} className="gap-2"><Save size={18} /> Save</Button>
            </div>
         </div>
         <div className="space-y-4">
            {items.map((item, index) => (
               <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 flex flex-col md:flex-row gap-4 items-start relative">
                  <div className="flex-1 grid md:grid-cols-2 gap-4 w-full">
                     <div className="space-y-3">
                        <input className="input-field font-bold" value={item.title} onChange={e => handleChange(index, 'title', e.target.value)} placeholder="Title" />
                        <div className="flex gap-2">
                           <input className="input-field text-sm" value={item.organization} onChange={e => handleChange(index, 'organization', e.target.value)} placeholder="Organization" />
                           <input className="input-field text-sm w-24" value={item.date} onChange={e => handleChange(index, 'date', e.target.value)} placeholder="Date" />
                        </div>
                     </div>
                     <div className="relative">
                        <textarea className="input-field h-full text-sm" value={item.description} onChange={e => handleChange(index, 'description', e.target.value)} placeholder="Description" />
                        <button onClick={() => setItems(items.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 md:top-2 md:right-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  };

  // --- Main Render ---

  // CSS injection for inputs
  const styles = `
    .input-field {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      background-color: transparent;
      transition: all 0.2s;
    }
    .dark .input-field {
      border-color: #4b5563;
      color: white;
    }
    .dark .input-field:focus {
      border-color: #3b82f6;
      background-color: #1f2937;
    }
    .input-field:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `;

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout}>
      <style>{styles}</style>
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
           <h1 className="text-3xl font-bold dark:text-white">Dashboard Overview</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Projects', value: data.projects.length, icon: 'Briefcase' },
                { label: 'Services', value: data.services.length, icon: 'Settings' },
                { label: 'Awards', value: data.achievements.length, icon: 'Award' },
                { label: 'Slides', value: data.heroSlides.length, icon: 'Layers' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
                   <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                   <p className="text-3xl font-bold dark:text-white mt-2">{stat.value}</p>
                </div>
              ))}
           </div>
           <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Quick Tips</h3>
              <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                 <li>Use the "AI" button to quickly generate descriptions.</li>
                 <li>Upload images directly or paste URLs. Large images are automatically rejected to save space.</li>
                 <li>Remember to click "Save Changes" after editing lists.</li>
              </ul>
           </div>
        </div>
      )}
      {activeTab === 'profile' && <ProfileEditor />}
      {activeTab === 'projects' && <ProjectsEditor />}
      {activeTab === 'services' && <ServicesEditor />}
      {activeTab === 'hero' && <HeroEditor />}
      {activeTab === 'achievements' && <AchievementsEditor />}
    </AdminLayout>
  );
};
