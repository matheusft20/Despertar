import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  onFilterChange: (filters: {
    searchTerm: string;
    specialty: string;
    isOnlineOnly: boolean;
  }) => void;
}

const specialties = [
  "Todas especialidades",
  "Ansiedade",
  "Depressão",
  "Terapia Infantil",
  "Relacionamento",
  "Trauma",
  "Desenvolvimento Pessoal"
];

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);
  const [isOnlineOnly, setIsOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (
    newSearchTerm?: string,
    newSpecialty?: string,
    newIsOnlineOnly?: boolean
  ) => {
    const updatedSearchTerm = newSearchTerm !== undefined ? newSearchTerm : searchTerm;
    const updatedSpecialty = newSpecialty !== undefined ? newSpecialty : selectedSpecialty;
    const updatedIsOnlineOnly = newIsOnlineOnly !== undefined ? newIsOnlineOnly : isOnlineOnly;

    onFilterChange({
      searchTerm: updatedSearchTerm,
      specialty: updatedSpecialty,
      isOnlineOnly: updatedIsOnlineOnly,
    });
  };

  return (
    <section id="specialists" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Nossos Especialistas</h2>
          <p className="mt-4 text-xl text-gray-600">Encontre o profissional que melhor se adapta às suas necessidades</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search by name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Buscar por nome do psicólogo"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange(e.target.value);
                }}
              />
            </div>
            
            {/* Specialty dropdown */}
            <div className="relative">
              <button
                type="button"
                className="relative w-full bg-white border border-gray-300 rounded-lg py-3 pl-4 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="block truncate">{selectedSpecialty}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                  {specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-indigo-50"
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setIsDropdownOpen(false);
                        handleFilterChange(undefined, specialty);
                      }}
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Online toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isOnlineOnly}
                    onChange={() => {
                      setIsOnlineOnly(!isOnlineOnly);
                      handleFilterChange(undefined, undefined, !isOnlineOnly);
                    }}
                  />
                  <div className={`block w-14 h-8 rounded-full ${isOnlineOnly ? 'bg-indigo-600' : 'bg-gray-300'} transition-colors duration-200`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 transform ${isOnlineOnly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <div className="ml-3 text-gray-700">Somente atendimento online</div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;