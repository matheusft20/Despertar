import React, { useRef, useState } from 'react';
import { Star } from 'lucide-react';
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

  const handleContactClick = (specialist: any) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre os pacotes de consulta com ${specialist.name}. Especialidade: ${specialist.specialty}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
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
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="relative md:hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
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
              />
            </div>
          ))}
        </div>
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
}> = ({ psychologist, onViewProfile }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-[480px] flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img
        src={psychologist.image}
        alt={psychologist.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm font-medium text-gray-700">{psychologist.rating}</span>
      </div>
    </div>
    
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
          {psychologist.name}
        </h3>
        <p className="text-indigo-600 font-medium text-sm">
          {psychologist.specialty}
        </p>
      </div>
      
      <div className="mb-3 flex flex-wrap gap-1.5">
        {psychologist.badges.map((badge: string, index: number) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              badge === 'Online'
                ? 'bg-green-100 text-green-700'
                : badge === 'Primeira consulta grátis'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
        {psychologist.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-500">Valor da consulta</p>
            <p className="text-lg font-bold text-gray-800">
              R$ {psychologist.price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Experiência</p>
            <p className="text-sm font-medium text-gray-700">
              {psychologist.detailedInfo.experience}
            </p>
          </div>
        </div>
        
        <button
          onClick={onViewProfile}
          className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Ver Perfil Completo
        </button>
      </div>
    </div>
  </div>
);

export default PsychologistList;