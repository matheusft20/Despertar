import React, { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { psychologists } from '../data/psychologists';
import SpecialistModal from './SpecialistModal';

interface PsychologistListProps {
  filters: {
    searchTerm: string;
    specialty: string;
    isOnlineOnly: boolean;
  };
  limit?: number;
}

const PsychologistList: React.FC<PsychologistListProps> = ({
  filters,
  limit,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  let filteredPsychologists = psychologists.filter((psychologist) => {
    const matchesSearch = psychologist.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesSpecialty =
      filters.specialty === 'Todas especialidades' ||
      psychologist.specialty.includes(filters.specialty);
    const matchesOnline =
      !filters.isOnlineOnly || psychologist.badges.includes('Online');

    return matchesSearch && matchesSpecialty && matchesOnline;
  });

  if (limit) {
    filteredPsychologists = filteredPsychologists.slice(0, limit);
  }

  // Calculate total slides for mobile carousel
  const cardWidth = 250; // Approximate card width including gap
  const totalSlides = Math.max(0, filteredPsychologists.length - 1);

  const scrollToSlide = (slideIndex: number) => {
    if (carouselRef.current) {
      const scrollAmount = slideIndex * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentSlide(slideIndex);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentSlide >= totalSlides ? 0 : currentSlide + 1;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide <= 0 ? totalSlides : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  // Auto-play functionality
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying) {
        nextSlide();
      }
    }, 4000);
  };

  useEffect(() => {
    if (isAutoPlaying && filteredPsychologists.length > 1) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAutoPlaying, filteredPsychologists.length]);

  // Handle scroll events to update current slide indicator
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(Math.min(newSlide, totalSlides));
    }
  };

  const handleContactClick = (specialist: any) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre os pacotes de consulta com ${specialist.name}. Especialidade: ${specialist.specialty}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPsychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onViewProfile={() => {
              setSelectedSpecialist(psychologist);
              setIsModalOpen(true);
            }}
            onUserInteraction={handleUserInteraction}
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="relative md:hidden">
        {/* Navigation Buttons */}
        {filteredPsychologists.length > 1 && (
          <>
         
          </>
        )}

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onScroll={handleScroll}
          onTouchStart={handleUserInteraction}
        >
          {filteredPsychologists.map((psychologist) => (
            <div
              key={psychologist.id}
              className="flex-none w-[280px] sm:w-[320px] snap-start"
            >
              <PsychologistCard
                psychologist={psychologist}
                onViewProfile={() => {
                  setSelectedSpecialist(psychologist);
                  setIsModalOpen(true);
                }}
                onUserInteraction={handleUserInteraction}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {filteredPsychologists.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleUserInteraction();
                  scrollToSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {isAutoPlaying && filteredPsychologists.length > 1 && (
          <div className="flex justify-center mt-2">
            
          </div>
        )}
      </div>

      {/* Specialist Modal */}
      <SpecialistModal
        specialist={selectedSpecialist}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContactClick={() =>
          selectedSpecialist && handleContactClick(selectedSpecialist)
        }
      />
    </div>
  );
};

const PsychologistCard: React.FC<{
  psychologist: any;
  onViewProfile: () => void;
  onUserInteraction: () => void;
}> = ({ psychologist, onViewProfile, onUserInteraction }) => (
  <div 
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-[520px] flex flex-col relative"
    onMouseEnter={onUserInteraction}
    onClick={onUserInteraction}
  >
    {/* Promotional Badge */}
    <div className="absolute top-3 left-3 z-10">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
        🔥 OFERTA ESPECIAL
      </div>
    </div>

    <div className="relative h-48 overflow-hidden">
      <img
        src={psychologist.image}
        alt={psychologist.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-sm">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm font-semibold text-gray-700">{psychologist.rating}</span>
      </div>
    </div>
    
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
          {psychologist.name}
        </h3>
        <p className="text-indigo-600 font-semibold text-sm">
          {psychologist.specialty}
        </p>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {psychologist.badges.map((badge: string, index: number) => (
          <span
            key={index}
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              badge === 'Online'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : badge === 'Primeira consulta grátis'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4 leading-relaxed">
        {psychologist.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100">
        {/* Promotional Pricing */}
        <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 line-through">De R$ {psychologist.price}</p>
              <p className="text-xl font-bold text-green-600">R$ 120</p>
              <p className="text-xs text-green-700 font-medium">Valor promocional</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-bounce">
                -33%
              </span>
              <p className="text-xs text-gray-500 mt-1">{psychologist.detailedInfo.experience}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          🎯 Agendar Consulta Promocional
        </button>
      </div>
    </div>
  </div>
);

export default PsychologistList;