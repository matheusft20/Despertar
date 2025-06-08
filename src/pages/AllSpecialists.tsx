import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FilterSection from '../components/FilterSection';
import PsychologistGrid from '../components/PsychologistGrid';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const AllSpecialists: React.FC = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    specialty: 'Todas especialidades',
    isOnlineOnly: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-12 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Nossos Especialistas
          </h1>
          <p className="mt-4 text-xl text-indigo-100 text-center">
            Encontre o profissional ideal para sua jornada
          </p>
        </div>
      </div>
      <FilterSection onFilterChange={setFilters} />
      <PsychologistGrid filters={filters} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AllSpecialists;
