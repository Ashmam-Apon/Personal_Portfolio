import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const { data } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + data.heroSlides.length) % data.heroSlides.length);

  if (data.heroSlides.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      {data.heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight animate-fade-in-up">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
              {slide.subtitle}
            </p>
            <Button
              variant="primary"
              size="lg"
              className="animate-fade-in-up delay-200"
              onClick={() => {
                const element = document.querySelector(slide.ctaLink);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {slide.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}

      {/* Controls */}
      {data.heroSlides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {data.heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
