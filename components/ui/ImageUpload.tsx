import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from './Button';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "Image" }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      if (file.size > 800000) { // Limit to ~800KB to prevent localStorage issues
        setError("File is too large (max 800KB). Please use an external URL or compress the image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border dark:border-gray-600 shrink-0 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button"
              onClick={() => onChange('')}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        <div className="flex-1 space-y-2">
           <div className="relative flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                    <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Max 800KB (Local Storage)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
           </div>
           
           <div className="flex items-center gap-2">
             <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
             <span className="text-xs text-gray-500">OR URL</span>
             <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
           </div>

           <input 
             type="text" 
             placeholder="https://example.com/image.jpg"
             className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             value={value}
             onChange={(e) => onChange(e.target.value)}
           />
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
