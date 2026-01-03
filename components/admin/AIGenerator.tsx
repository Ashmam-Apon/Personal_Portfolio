import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { generateContent } from '../../services/geminiService';
import { Button } from '../ui/Button';

interface AIGeneratorProps {
  context: string;
  onGenerate: (text: string) => void;
  label?: string;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ context, onGenerate, label = "Improve with AI" }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    const result = await generateContent(
      "Rewrite, improve, or generate content for this section.",
      context
    );
    onGenerate(result);
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleGenerate}
      isLoading={loading}
      type="button"
      className="gap-2 text-xs uppercase tracking-wider"
    >
      <Sparkles size={14} />
      {label}
    </Button>
  );
};
