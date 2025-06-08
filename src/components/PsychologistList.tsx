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
              className="flex-none w-[calc(100vw-48px)] sm:w-[340px] snap-start"
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

        {/* Navigation Buttons */}
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
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <div className="relative">
      <img
        src={psychologist.image}
        alt={psychologist.name}
        className="h-50 sm:h-56 w-full object-cover"
      />
    </div>
    <div className="p-4 sm:p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1">
          {psychologist.name}
        </h3>
        <div className="flex items-center shrink-0 ml-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-gray-600">{psychologist.rating}</span>
        </div>
      </div>
      <p className="text-indigo-600 font-medium text-sm sm:text-base">
        {psychologist.specialty}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {psychologist.badges.map((badge: string, index: number) => (
          <span
            key={index}
            className={`px-2 py-0.5 text-xs rounded-full ${
              badge === 'Online'
                ? 'bg-green-100 text-green-800'
                : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-2">
        {psychologist.description}
      </p>
      <div className="mt-4 sm:mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">Valor da consulta</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            R$ {psychologist.price}
          </p>
        </div>
        <button
          onClick={onViewProfile}
          className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Ver Perfil
        </button>
      </div>
    </div>
  </div>
);

export default PsychologistList;
