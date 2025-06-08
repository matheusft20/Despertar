import React, { useState } from 'react';
import { Star, MapPin, Clock, Video } from 'lucide-react';
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

      {/* Mobile Grid */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredPsychologists.map((psychologist) => (
          <MobilePsychologistCard
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
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <div className="relative">
      <img
        src={psychologist.image}
        alt={psychologist.name}
        className="h-48 sm:h-56 w-full object-cover"
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

const MobilePsychologistCard: React.FC<{
  psychologist: any;
  onViewProfile: () => void;
}> = ({ psychologist, onViewProfile }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="flex">
      {/* Image Section */}
      <div className="w-28 h-32 flex-shrink-0">
        <img
          src={psychologist.image}
          alt={psychologist.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {psychologist.name}
              </h3>
              <p className="text-sm font-medium text-indigo-600 mt-0.5">
                {psychologist.specialty}
              </p>
            </div>
            <div className="flex items-center ml-2 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {psychologist.rating}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {psychologist.badges.map((badge: string, index: number) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                  badge === 'Online'
                    ? 'bg-emerald-100 text-emerald-700'
                    : badge === 'Presencial'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {badge === 'Online' && <Video className="w-3 h-3 mr-1" />}
                {badge === 'Presencial' && <MapPin className="w-3 h-3 mr-1" />}
                {badge}
              </span>
            ))}
          </div>

          {/* Experience Info */}
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Clock className="w-3 h-3 mr-1" />
            <span>{psychologist.detailedInfo.experience} de experiência</span>
            <span className="mx-2">•</span>
            <span>{psychologist.detailedInfo.patientCount}+ pacientes</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">A partir de</p>
            <p className="text-lg font-bold text-gray-900">
              R$ {psychologist.price}
            </p>
          </div>
          <button
            onClick={onViewProfile}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PsychologistList;