import React, { useState } from 'react';
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
      {/* Grid Layout for All Screen Sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-[500px] flex flex-col">
    <div className="relative h-52 overflow-hidden">
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
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-1">
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Consulta</p>
            <p className="text-xl font-bold text-gray-800">
              R$ {psychologist.price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Experiência</p>
            <p className="text-sm font-semibold text-gray-700">
              {psychologist.detailedInfo.experience}
            </p>
          </div>
        </div>
        
        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Ver Perfil Completo
        </button>
      </div>
    </div>
  </div>
);

export default PsychologistList;